#!/usr/bin/env node
/* Deney denetimi: on sekiz konu sayfasının etkileşimli deneylerini gerçek bir
 * tarayıcıda çalıştırır ve bozulmaları sayar.
 *
 * Sayfalar diskten, sahte bir kaynak altında sunulur (https://dersler.test);
 * kapıya, parolaya ya da çalışan bir sunucuya gerek yoktur, arka planda süreç
 * kalmaz. Her sayfa için taze bir tarayıcı açılır.
 *
 *   NODE_PATH=$(npm root -g) node denetim/deney.js                      # 18 konu
 *   NODE_PATH=$(npm root -g) node denetim/deney.js --konu kirilma       # tek konu
 *   NODE_PATH=$(npm root -g) node denetim/deney.js --kok /tmp/kopya     # başka bir dist kopyası
 *   NODE_PATH=$(npm root -g) node denetim/deney.js --ekran /tmp/denetim # 1280 ve 390 px görüntüler
 *
 * Denetlenenler (her biri sıfır olmalı; değilse çıkış kodu 1):
 *   hata        sayfa hatası ya da konsol hatası (dış yazı tipi istekleri hariç)
 *   boş         ilk çizimde hiç piksel çizmemiş tuval
 *   taşma       390 px genişlikte yatay taşma (px)
 *   sıfırlama   yalnızca yükseklik değişince yeniden kurulan tuval (mobil adres çubuğu)
 *   ekran dışı  bütün deneyler başlatılıp sayfa sonuna inildiğinde 2 sn'de çizilen kare
 *   takılma     25 ms'yi aşan tek bir kare (animasyon döngüsündeki iş)
 *
 * "deney" sütunu başlatılan / tuvalli bölüm sayısıdır. Birincil düğmesi olmayan
 * bölüm (kaydırıcı ya da sürüklemeyle çizilen sahne) başlatılmaz; ilk çizimi,
 * taşması ve yeniden kurulması yine denetlenir.
 *
 * --ekran ile her deneyin tuvali, birincil düğmesine basıldıktan ~2 sn sonra iki
 * genişlikte PNG olarak kaydedilir; her genişlik için bir de hepsini bir arada
 * gösteren pano (pano-1280.png, pano-390.png) çıkar. Çekimden önce yapışkan
 * başlık, "↑" düğmesi ve "İçeriğe geç" bağlantısı gizlenir (yer kaplamaları
 * korunur, yerleşim değişmez); yoksa öğe görüntüsünde tuvalin üstüne binerler.
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const argv = process.argv.slice(2);
function arg(name, def) { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : def; }
const KOK = path.resolve(arg("--kok", path.join(__dirname, "..", "dist")));
const TEK = arg("--konu", null);
const EKRAN = arg("--ekran", null);
const KAYNAK = "https://dersler.test";
const TIP = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json",
};
/* yönetici gibi: her konu açık, kilit yok — deneylerin kendisi sınanıyor */
const DURUM = { rol: "yonetici", ad: "Yönetici", kod: null, konular: [], indirilebilir: [], toplu: true, herkeseAcik: [], sebep: null, onizleme: null };
const TAKILMA_MS = 25;
const dur = (ms) => new Promise((r) => setTimeout(r, ms));

const sayfalar = fs.readdirSync(KOK)
  .filter((f) => f.endsWith(".html") && f !== "index.html" && f !== "404.html")
  .map((f) => f.slice(0, -5))
  .filter((ad) => !TEK || ad === TEK)
  .sort();
if (!sayfalar.length) { console.error("Konu sayfası bulunamadı: " + KOK + (TEK ? " / " + TEK : "")); process.exit(2); }
if (EKRAN) for (const g of ["1280", "390"]) fs.mkdirSync(path.join(EKRAN, g), { recursive: true });

/* ---- sayfa kurulumu: diskten sun, sayaçları yerleştir ---- */

async function sayfaAc(tarayici) {
  const s = await tarayici.newPage();
  s.hatalar = [];
  s.on("pageerror", (e) => s.hatalar.push(e.message));
  s.on("console", (m) => { if (m.type() === "error" && !/fonts\.g|ERR_(FAILED|NAME|INTERNET|CONNECTION)/.test(m.text())) s.hatalar.push(m.text()); });
  await s.setRequestInterception(true);
  s.on("request", (r) => {
    const u = new URL(r.url());
    if (u.origin !== KAYNAK) return r.continue();
    if (u.pathname === "/durum") return r.respond({ status: 200, contentType: "application/json", body: JSON.stringify(DURUM) });
    const yol = path.join(KOK, decodeURIComponent(u.pathname));
    if (!yol.startsWith(KOK) || !fs.existsSync(yol)) return r.respond({ status: 404, body: "" });
    r.respond({ status: 200, contentType: TIP[path.extname(yol)] || "application/octet-stream", body: fs.readFileSync(yol) });
  });
  await s.evaluateOnNewDocument(() => {
    const O = (window.__denetim = { kare: 0, ms: 0, enKotu: 0, sifirlama: 0 });
    const asil = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = function (cb) {
      return asil(function (ts) {
        const t0 = performance.now();
        try { cb(ts); } finally {
          const d = performance.now() - t0;
          O.kare++; O.ms += d; if (d > O.enKotu) O.enKotu = d;
        }
      });
    };
    const g = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "width");
    Object.defineProperty(HTMLCanvasElement.prototype, "width", {
      configurable: true, get: g.get, set(v) { O.sifirlama++; g.set.call(this, v); },
    });
  });
  return s;
}

const sifirla = (s) => s.evaluate(() => { const O = window.__denetim; O.kare = 0; O.ms = 0; O.enKotu = 0; O.sifirlama = 0; });
const oku = (s) => s.evaluate(() => ({ ...window.__denetim }));
const bolumler = (s) => s.evaluate(() =>
  [...document.querySelectorAll("section")].filter((b) => b.id && b.querySelector("canvas")).map((b) => b.id));

/* bölümün birincil düğmesi: hayalet olmayan ilk .button (Bırak, Başlat, Döndür…) */
function baslat(s, id) {
  return s.evaluate((id) => {
    const b = document.getElementById(id);
    b.scrollIntoView({ block: "center" });
    const d = [...b.querySelectorAll("button.button")].find((x) => !x.classList.contains("ghost") && !x.disabled && x.offsetParent);
    if (d) d.click();
    return Boolean(d);
  }, id);
}

/* yapışkan/sabit öğeler öğe görüntüsüne girmesin; visibility yerleşimi bozmaz */
const GIZLE = ".site-header, .to-top, .skip { visibility: hidden !important; }";

async function tuvalleriCek(s, ad, id, genislik) {
  const tuvaller = await s.$$(`#${id} canvas`);
  for (let i = 0; i < tuvaller.length; i++) {
    await s.evaluate((el) => el.scrollIntoView({ block: "center" }), tuvaller[i]);
    await tuvaller[i].screenshot({ path: path.join(EKRAN, genislik, `${ad}--${id}${tuvaller.length > 1 ? "-" + i : ""}.png`) }).catch(() => {});
  }
}

/* ---- bir sayfanın denetimi ---- */

async function denetle(ad) {
  const tarayici = await puppeteer.launch({ headless: true, protocolTimeout: 120000, args: ["--no-sandbox"] });
  const k = { ad, hata: [], bos: [], tasma: 0, sifirlama: 0, ekranDisi: 0, enKotu: 0, deney: 0, baslayan: 0 };
  try {
    const s = await sayfaAc(tarayici);
    await s.setViewport({ width: 1280, height: 900 });
    await s.goto(`${KAYNAK}/${ad}.html`, { waitUntil: "networkidle2", timeout: 60000 });
    if (EKRAN) await s.addStyleTag({ content: GIZLE });
    await dur(600);

    k.bos = await s.evaluate(() => [...document.querySelectorAll("canvas")].filter((c) => {
      try {
        const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
        for (let i = 3; i < d.length; i += 4 * 13) if (d[i] > 0) return false;
        return true;
      } catch (e) { return false; }
    }).map((c) => c.id || "(adsız)"));

    /* her deneyi görünürken başlat; kare maliyetini ölç */
    const ids = await bolumler(s);
    for (const id of ids) {
      if (await baslat(s, id)) k.baslayan++;
      await dur(300);
      await sifirla(s);
      await dur(1200);
      const o = await oku(s);
      k.enKotu = Math.max(k.enKotu, o.enKotu);
      k.deney++;
      if (EKRAN) { await dur(500); await tuvalleriCek(s, ad, id, "1280"); }
    }

    /* hepsi başlatıldı; hiçbir deney bölümünün görünmediği sayfa sonunda iş olmamalı */
    await s.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await dur(900);
    await sifirla(s);
    await dur(2000);
    k.ekranDisi = (await oku(s)).kare;

    /* mobil: yatay taşma, sonra adres çubuğu gibi yalnızca yükseklik değişimi */
    await s.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await dur(900);
    k.tasma = Math.max(0, await s.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));
    await sifirla(s);
    await s.setViewport({ width: 390, height: 780, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await dur(700);
    k.sifirlama = (await oku(s)).sifirlama;

    if (EKRAN) {
      await s.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
      await s.goto(`${KAYNAK}/${ad}.html`, { waitUntil: "networkidle2", timeout: 60000 });
      await s.addStyleTag({ content: GIZLE });
      await dur(500);
      for (const id of ids) {
        await baslat(s, id);
        await dur(2000);
        await tuvalleriCek(s, ad, id, "390");
      }
    }
    k.hata = [...new Set(s.hatalar)];
  } catch (e) {
    k.hata.push("denetim yarım kaldı: " + e.message.split("\n")[0]);
  } finally {
    await tarayici.close().catch(() => {});
  }
  return k;
}

/* ---- pano: görüntüleri tek resimde ızgaraya diz ---- */

async function pano(genislik) {
  const dizin = path.join(EKRAN, genislik);
  const dosyalar = fs.readdirSync(dizin).filter((f) => f.endsWith(".png")).sort();
  if (!dosyalar.length) return;
  const kutular = dosyalar.map((f) =>
    `<figure><img src="data:image/png;base64,${fs.readFileSync(path.join(dizin, f)).toString("base64")}"><figcaption>${f.slice(0, -4)}</figcaption></figure>`).join("");
  const tarayici = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const s = await tarayici.newPage();
  /* alçak görünüm: tam sayfa görüntü içerik kadar uzar, altında boşluk kalmaz */
  await s.setViewport({ width: 1600, height: 200 });
  await s.setContent(`<style>body{margin:8px;font:12px sans-serif;background:#ddd}main{display:grid;grid-template-columns:repeat(${genislik === "390" ? 5 : 4},1fr);gap:8px}figure{margin:0;background:#fff;padding:4px}img{width:100%;display:block}figcaption{padding:2px 0 0}</style><main>${kutular}</main>`);
  await s.screenshot({ path: path.join(EKRAN, `pano-${genislik}.png`), fullPage: true });
  await tarayici.close();
}

/* ---- rapor ---- */

(async () => {
  console.log(`kök: ${KOK}\n`);
  console.log(`${"konu".padEnd(22)} ${"deney".padStart(5)} ${"hata".padStart(5)} ${"boş".padStart(4)} ${"taşma".padStart(6)} ${"sıfırlama".padStart(10)} ${"ekran dışı".padStart(11)} ${"en kötü kare".padStart(13)}`);
  let sorun = 0;
  for (const ad of sayfalar) {
    const k = await denetle(ad);
    const kotu = k.hata.length || k.bos.length || k.tasma || k.sifirlama || k.ekranDisi || k.enKotu > TAKILMA_MS;
    if (kotu) sorun++;
    console.log(`${(kotu ? "✗ " : "  ") + ad.padEnd(20)} ${(k.baslayan + "/" + k.deney).padStart(5)}${String(k.hata.length).padStart(5)} ${String(k.bos.length).padStart(4)} ${String(k.tasma).padStart(6)} ${String(k.sifirlama).padStart(10)} ${String(k.ekranDisi).padStart(11)} ${(k.enKotu.toFixed(1) + " ms").padStart(13)}`);
    for (const h of k.hata) console.log(`      hata: ${h}`);
    if (k.bos.length) console.log(`      boş tuval: ${k.bos.join(", ")}`);
  }
  if (EKRAN) {
    await pano("1280");
    await pano("390");
    console.log(`\ngörüntüler: ${EKRAN}/1280, ${EKRAN}/390 · panolar: pano-1280.png, pano-390.png`);
  }
  console.log(sorun ? `\n${sorun} sayfada sorun var.` : `\n${sayfalar.length} sayfa temiz.`);
  process.exit(sorun ? 1 : 0);
})();
