#!/usr/bin/env node
/* Konu anlatımı modalının yapısını denetler (dört basamak, Kısaca, Düşün, zorluklu örnekler,
 * illüstrasyonlar, çipler, çizim taşmaları) ve modalın 390 px'te yatay taşıp taşmadığına bakar.
 *
 *   NODE_PATH=$(npm root -g) node denetim/anlatim.js                  # dist'teki 18 konu
 *   NODE_PATH=$(npm root -g) node denetim/anlatim.js kirilma mercekler
 *   NODE_PATH=$(npm root -g) node denetim/anlatim.js --kok /tmp/kopya  # dist'in bir kopyası
 *
 * Kurallar README'deki "Konu anlatımının yapısı" bölümündedir. Çıkış kodu: hata varsa 1. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const argv = process.argv.slice(2);
const ki = argv.indexOf("--kok");
const KOK = ki > -1 ? path.resolve(argv[ki + 1]) : path.resolve(__dirname, "..", "dist");
let slugs = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--kok");
if (!slugs.length) slugs = fs.readdirSync(KOK).filter(f => /\.html$/.test(f) && !/^(index|404)\.html$/.test(f)).map(f => f.replace(/\.html$/, "")).sort();

function sayfaIci() {
  const H = [], U = [];
  const hata = m => H.push(m), uyari = m => U.push(m);
  const body = document.getElementById("konu-body");
  const kids = [...body.children];
  const izinli = el => {
    const t = el.tagName.toLowerCase(), c = el.getAttribute("class") || "";
    if (t === "svg") return /figdefs/.test(c);
    if (["p", "h3", "h4", "ul", "ol", "table", "details"].includes(t)) return true;
    if (t === "div") return /^(formula|callout( warn)?|basamak)$/.test(c);
    if (t === "figure") return /^(fig|foto)$/.test(c);
    return false;
  };
  kids.forEach(el => { if (!izinli(el)) hata("izin verilmeyen blok: <" + el.tagName.toLowerCase() + " class=\"" + (el.getAttribute("class") || "") + "\">"); });
  body.querySelectorAll("[style]").forEach(el => hata("satır içi style: " + el.tagName));

  /* sıra: lead-in, giriş fotoğrafı, basamak 1 ... */
  const li = kids.findIndex(el => el.matches("p.lead-in"));
  if (li < 0) hata("lead-in yok");
  const ilkFoto = kids[li + 1];
  if (!ilkFoto || !ilkFoto.matches("figure.foto")) hata("lead-in'in hemen ardından giriş görseli (figure.foto) gelmeli");

  /* basamaklar */
  const bands = kids.filter(el => el.matches("div.basamak"));
  const nums = bands.map(b => b.dataset.basamak);
  if (nums.join(",") !== "1,2,3,4") hata("basamaklar 1,2,3,4 sırasıyla birer kez olmalı; bulunan: " + nums.join(","));
  bands.forEach(b => {
    if (!b.querySelector(":scope > b") || !b.querySelector(":scope > span")) hata("basamak " + b.dataset.basamak + ": <b>ad</b> ve <span>açıklama</span> gerekli");
    const ad = (b.querySelector(":scope > b") || {}).textContent || "";
    const beklenen = { 1: "Temel", 2: "Orta", 3: "İleri", 4: "Pekiştir" }[b.dataset.basamak];
    if (ad.trim() !== beklenen) hata("basamak " + b.dataset.basamak + " adı '" + beklenen + "' olmalı, bulunan: '" + ad.trim() + "'");
  });
  if (bands[0] && kids.indexOf(bands[0]) > kids.findIndex(el => el.tagName === "H3") && kids.findIndex(el => el.tagName === "H3") > -1) hata("ilk h3'ten önce basamak 1 gelmeli");

  /* bölümleri kur */
  const bolumler = []; let cur = null, bas = 0;
  kids.forEach(el => {
    if (el.matches("div.basamak")) { bas = +el.dataset.basamak; cur = null; return; }
    if (el.tagName === "H3") { cur = { h: el, bas, blok: [] }; bolumler.push(cur); return; }
    if (cur) cur.blok.push(el);
  });
  const say = b => bolumler.filter(x => x.bas === b).length;
  const [s1, s2, s3, s4] = [1, 2, 3, 4].map(say);
  if (s1 < 3) hata("Temel basamakta en az 3 bölüm olmalı (" + s1 + ")");
  if (s2 < 3) hata("Orta basamakta en az 3 bölüm olmalı (" + s2 + ")");
  if (s3 < 2) hata("İleri basamakta en az 2 bölüm olmalı (" + s3 + ")");
  if (s4 !== 2) hata("Pekiştir basamağında tam 2 bölüm olmalı: Çözümlü örnekler + Sık yapılan hatalar (" + s4 + ")");
  const top = bolumler.length;
  if (top < 11 || top > 16) hata("toplam bölüm 11–16 arası olmalı (" + top + ")");

  /* kimlikler ve çipler */
  bolumler.forEach((b, i) => { if (b.h.id !== "k" + (i + 1)) hata("h3 kimliği k" + (i + 1) + " olmalı: " + b.h.id + " — " + b.h.textContent.trim()); });
  const chips = [...document.querySelectorAll("#konu .chips button")];
  if (chips.length !== top) hata("çip sayısı (" + chips.length + ") bölüm sayısına (" + top + ") eşit olmalı");
  chips.forEach((c, i) => {
    const b = bolumler[i];
    if (!b) return;
    if (c.dataset.goto !== b.h.id) hata("çip " + (i + 1) + " data-goto=" + c.dataset.goto + ", beklenen " + b.h.id);
    if (c.dataset.basamak !== String(b.bas)) hata("çip " + (i + 1) + " data-basamak=" + c.dataset.basamak + ", beklenen " + b.bas);
    if (c.textContent.trim().length > 26) uyari("çip etiketi uzun: " + c.textContent.trim());
  });

  /* her öğretici bölüm "Kısaca" ile biter */
  bolumler.filter(b => b.bas < 4).forEach(b => {
    const k = b.blok.filter(el => el.matches("p.kisaca"));
    if (k.length !== 1) hata("bölüm '" + b.h.textContent.trim() + "': tam bir p.kisaca olmalı (" + k.length + ")");
    else {
      const f = k[0].firstElementChild;
      if (!f || f.tagName !== "B" || f.textContent.trim() !== "Kısaca:") hata("p.kisaca '<b>Kısaca:</b>' ile başlamalı: " + b.h.textContent.trim());
      const son = b.blok.filter(el => !el.matches("figure, details.dusun")).pop();
      if (son !== k[0]) uyari("p.kisaca bölümün son metin bloğu değil: " + b.h.textContent.trim());
      if (k[0].textContent.length > 330) uyari("Kısaca uzun (" + k[0].textContent.length + " kr): " + b.h.textContent.trim());
    }
    const w = b.blok.filter(el => el.tagName !== "FIGURE").map(el => el.textContent).join(" ").split(/\s+/).filter(Boolean).length;
    if (w < 110) uyari("bölüm kısa (" + w + " sözcük): " + b.h.textContent.trim());
  });
  if (body.querySelectorAll("p.kisaca").length !== bolumler.filter(b => b.bas < 4).length) hata("p.kisaca yalnızca basamak 1–3 bölümlerinde olmalı");

  /* düşün soruları */
  const dusun = [...body.querySelectorAll(":scope > details.dusun")];
  if (dusun.length < 4) hata("en az 4 details.dusun olmalı (" + dusun.length + ")");
  [1, 2, 3].forEach(n => { if (!bolumler.some(b => b.bas === n && b.blok.some(el => el.matches("details.dusun")))) hata("basamak " + n + " içinde en az bir Düşün sorusu olmalı"); });
  dusun.forEach(d => {
    const s = d.querySelector("summary");
    if (!s || !/^Düşün: .+\?$/.test(s.textContent.trim())) hata("dusun summary 'Düşün: …?' biçiminde olmalı: " + (s ? s.textContent.trim() : "(yok)"));
    if (!d.querySelector(":scope > p")) hata("dusun cevabı <p> içinde olmalı");
  });

  /* çözümlü örnekler */
  const orn = bolumler.find(b => /Çözümlü örnekler/.test(b.h.textContent));
  const hat = bolumler.find(b => /Sık yapılan hatalar/.test(b.h.textContent));
  if (!orn || orn.bas !== 4) hata("'Çözümlü örnekler' bölümü basamak 4'te olmalı");
  if (!hat || hat.bas !== 4) hata("'Sık yapılan hatalar' bölümü basamak 4'te olmalı");
  if (orn) {
    const ex = orn.blok.filter(el => el.matches("details:not(.dusun)"));
    if (ex.length < 6) hata("en az 6 çözümlü örnek olmalı (" + ex.length + ")");
    const sira = { kolay: 1, orta: 2, zor: 3 }; let onceki = 0; const n = { kolay: 0, orta: 0, zor: 0 };
    ex.forEach((d, i) => {
      const s = d.querySelector("summary"), z = s && s.dataset.zorluk;
      if (!sira[z]) { hata("örnek " + (i + 1) + ": summary data-zorluk kolay|orta|zor olmalı"); return; }
      n[z]++;
      if (sira[z] < onceki) hata("örnekler kolaydan zora sıralı olmalı: örnek " + (i + 1) + " (" + z + ")");
      onceki = sira[z];
      if (!new RegExp("^Örnek " + (i + 1) + " — .+").test(s.textContent.trim())) hata("summary 'Örnek " + (i + 1) + " — başlık' biçiminde olmalı: " + s.textContent.trim());
      if (!d.querySelector(":scope > ol.steps")) hata("örnek " + (i + 1) + ": ol.steps yok");
      if (d.querySelector(":scope > ol.steps") && d.querySelector(":scope > ol.steps").children.length > 6) uyari("örnek " + (i + 1) + ": 6'dan çok adım (slaytta sıkışır)");
    });
    Object.keys(n).forEach(k => { if (n[k] < 2) hata("en az 2 '" + k + "' örnek olmalı (" + n[k] + ")"); });
    if (orn.blok.some(el => el.matches("details.dusun, p.kisaca"))) hata("Çözümlü örnekler bölümünde dusun/kisaca olmamalı");
  }
  if (hat) {
    const ul = hat.blok.find(el => el.tagName === "UL");
    if (!ul) hata("hatalar bölümünde ul yok");
    else {
      if (ul.children.length < 6 || ul.children.length > 8) hata("6–8 sık hata olmalı (" + ul.children.length + ")");
      [...ul.children].forEach((li, i) => { const f = li.firstElementChild; if (!f || f.tagName !== "STRONG" || li.firstChild !== f) hata("hata " + (i + 1) + " <strong>iddia</strong> ile başlamalı"); });
    }
    const son = kids[kids.length - 1];
    if (!son.matches("div.callout") || !/^Kendini sına/.test(son.textContent.trim())) hata("en sonda 'Kendini sına' callout'u olmalı");
  }

  /* görseller */
  const fotolar = [...body.querySelectorAll("figure.foto")];
  const slug = location.pathname.split("/").pop().replace(/\.html$/, "");
  const beklenen = ["giris", "gunluk", "uygulama"].map(a => "gorsel/" + slug + "-" + a + ".webp");
  if (fotolar.length !== 3) hata("tam 3 figure.foto olmalı (" + fotolar.length + ")");
  fotolar.forEach((f, i) => {
    const img = f.querySelector(":scope > img"), cap = f.querySelector(":scope > figcaption");
    if (!img) { hata("foto " + (i + 1) + ": img yok"); return; }
    /* adresler önbellek kırmak için ?v=N taşıyabilir (görsel değişince N artırılır) */
    const src = img.getAttribute("src") || "", surum = (src.match(/\?v=\d+$/) || [""])[0];
    if (src !== beklenen[i] + surum) hata("foto " + (i + 1) + " src " + beklenen[i] + "[?v=N] olmalı: " + src);
    const ss = img.getAttribute("srcset") || "";
    if (ss !== beklenen[i].replace(".webp", "-800.webp") + surum + " 800w, " + beklenen[i] + surum + " 1536w") hata("foto " + (i + 1) + ": srcset kalıbı yanlış (src ile aynı sürüm olmalı)");
    if (img.getAttribute("sizes") !== "(max-width: 760px) 100vw, 884px") hata("foto " + (i + 1) + ": sizes yanlış");
    ["alt", "width", "height", "loading", "decoding"].forEach(a => { if (!img.getAttribute(a)) hata("foto " + (i + 1) + ": " + a + " yok"); });
    if (img.getAttribute("width") !== "1536" || img.getAttribute("height") !== "1024") hata("foto " + (i + 1) + ": width=1536 height=1024 olmalı");
    if (img.getAttribute("loading") !== "lazy" || img.getAttribute("decoding") !== "async") hata("foto " + (i + 1) + ": loading=lazy decoding=async olmalı");
    if ((img.getAttribute("alt") || "").length < 40) hata("foto " + (i + 1) + ": alt metni açıklayıcı olmalı");
    if (!cap || cap.textContent.trim().length < 80) hata("foto " + (i + 1) + ": figcaption en az 80 karakter olmalı");
  });
  const fotoBas = fotolar.map(f => { const b = bolumler.find(x => x.blok.includes(f)); return b ? b.bas : 0; });
  if (fotolar[1] && fotoBas[1] !== 1) hata("günlük görsel (2. foto) basamak 1'de olmalı");
  if (fotolar[2] && fotoBas[2] !== 3) hata("uygulama görseli (3. foto) basamak 3'te olmalı");

  /* SVG çizimler: taşma ve marker */
  const svgs = [...body.querySelectorAll("figure.fig > svg")];
  svgs.forEach((svg, i) => {
    const vb = svg.viewBox.baseVal;
    if (!svg.getAttribute("aria-label")) hata("çizim " + (i + 1) + ": aria-label yok");
    if (!svg.closest("figure").querySelector("figcaption")) hata("çizim " + (i + 1) + ": figcaption yok");
    svg.querySelectorAll("text, rect, circle, ellipse, path, line, polygon, polyline").forEach(el => {
      if (el.closest("defs, marker")) return;
      let bb; try { bb = el.getBBox(); } catch (e) { return; }
      if (el.getAttribute("transform")) return;
      const pad = el.tagName === "text" ? 4 : 2; /* metnin em kutusu mürekkepten ~0,2 em büyük */
      if (bb.x < vb.x - pad || bb.y < vb.y - pad || bb.x + bb.width > vb.x + vb.width + pad || bb.y + bb.height > vb.y + vb.height + pad)
        hata("çizim " + (i + 1) + " taşma: <" + el.tagName + "> " + (el.textContent || el.getAttribute("d") || "").slice(0, 40) +
          " bbox=" + [bb.x, bb.y, bb.width, bb.height].map(v => Math.round(v)).join(","));
    });
    svg.querySelectorAll("path[marker-end], path[marker-start]").forEach(p => {
      if ((p.getAttribute("d").match(/[Mm]/g) || []).length > 1) hata("çizim " + (i + 1) + ": çoklu alt-yollu path'te marker (tek ok çıkar)");
    });
    /* metin çakışması: aynı svg'de kesişen text kutuları */
    const T = [...svg.querySelectorAll("text")].filter(t => !t.getAttribute("transform")).map(t => ({ t, b: t.getBBox() }));
    for (let a = 0; a < T.length; a++) for (let c = a + 1; c < T.length; c++) {
      const A = T[a].b, B = T[c].b;
      const ox = Math.min(A.x + A.width, B.x + B.width) - Math.max(A.x, B.x), oy = Math.min(A.y + A.height, B.y + B.height) - Math.max(A.y, B.y);
      if (ox > 2 && oy > 7) uyari("çizim " + (i + 1) + ": metinler çakışıyor: '" + T[a].t.textContent + "' / '" + T[c].t.textContent + "'");
    }
  });

  /* benzersiz kimlikler */
  const ids = [...document.querySelectorAll("[id]")].map(e => e.id);
  ids.filter((v, i) => ids.indexOf(v) !== i).forEach(v => hata("yinelenen id: " + v));

  const metin = kids.filter(el => !el.matches("svg, figure")).map(el => el.textContent).join(" ");
  const kelime = metin.split(/\s+/).filter(Boolean).length;
  const ozet = { bolum: top, basamak: [s1, s2, s3, s4].join("/"), kelime, cizim: svgs.length, foto: fotolar.length,
    dusun: dusun.length, ornek: orn ? orn.blok.filter(el => el.matches("details:not(.dusun)")).length : 0,
    lesson: (document.querySelector(".lesson-card p") || {}).textContent };
  return { H, U, ozet };
}

(async () => {
  const b = await puppeteer.launch({ args: ["--no-sandbox"] });
  let kotu = 0;
  for (const slug of slugs) {
    const dosya = path.join(KOK, slug + ".html");
    const html = fs.readFileSync(dosya, "utf8");
    const p = await b.newPage();
    const konsol = [];
    p.on("pageerror", e => konsol.push("pageerror: " + e.message));
    await p.goto("file://" + dosya, { waitUntil: "load" });
    await p.evaluate(() => { const d = document.getElementById("konu"); d.showModal ? d.showModal() : d.setAttribute("open", ""); });
    const r = await p.evaluate(sayfaIci);
    /* 390 px: modal gövdesi yatay taşmamalı (tablolar dahil) */
    await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await p.evaluate(() => { const d = document.getElementById("konu"); if (!d.open) d.showModal(); });
    await new Promise(res => setTimeout(res, 200));
    const tasma = await p.evaluate(() => { const m = document.getElementById("konu-body"); return m.scrollWidth - m.clientWidth; });
    if (tasma > 1) r.H.push("390 px'te modal gövdesi " + tasma + " px yatay taşıyor");
    await p.close();
    ["giris", "gunluk", "uygulama"].forEach(ad => {
      ["", "-800"].forEach(ek => {
        const g = path.join(KOK, "gorsel", slug + "-" + ad + ek + ".webp");
        if (!fs.existsSync(g)) r.H.push("görsel dosyası yok: gorsel/" + path.basename(g));
      });
    });
    const m = html.match(/id="konu-body">([\s\S]*?)<\/dialog>/);
    r.ozet.kelime = m ? m[1].replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<figcaption>[\s\S]*?<\/figcaption>/g, "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0;
    konsol.forEach(k => r.H.push(k));
    const o = r.ozet;
    console.log((r.H.length ? "✗ " : "✓ ") + slug.padEnd(21) + ` bölüm ${o.bolum} (${o.basamak}) · ${o.kelime} sözcük · çizim ${o.cizim} · foto ${o.foto} · düşün ${o.dusun} · örnek ${o.ornek}`);
    r.H.forEach(x => console.log("    HATA  " + x));
    r.U.forEach(x => console.log("    uyarı " + x));
    if (r.H.length) kotu++;
  }
  await b.close();
  process.exit(kotu ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
