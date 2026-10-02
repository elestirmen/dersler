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
    if (t === "div") return /^(formula|callout( warn)?|basamak|hatirla)$/.test(c);
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

  /* önce hatırlayalım: basamak 1 bandının hemen ardından, 3–6 madde */
  const hat1 = kids.filter(el => el.matches("div.hatirla"));
  if (hat1.length !== 1) hata("tam bir div.hatirla (Önce hatırlayalım) olmalı (" + hat1.length + ")");
  else {
    const h = hat1[0];
    if (kids[kids.indexOf(bands[0]) + 1] !== h) hata("div.hatirla basamak 1 bandının hemen ardından gelmeli");
    const b0 = h.querySelector(":scope > b"), ul0 = h.querySelector(":scope > ul");
    if (!b0 || b0.textContent.trim() !== "Önce hatırlayalım") hata("div.hatirla '<b>Önce hatırlayalım</b>' ile başlamalı");
    if (!ul0 || ul0.children.length < 3 || ul0.children.length > 6) hata("div.hatirla içinde 3–6 maddelik ul olmalı");
    else [...ul0.children].forEach((li, i) => { const f = li.firstElementChild; if (!f || f.tagName !== "STRONG" || li.firstChild !== f) hata("hatırla maddesi " + (i + 1) + " <strong>terim:</strong> ile başlamalı"); });
  }
  /* formüldeki harfler: basamak 2'de en az bir semboller tablosu, önünde h4 */
  const semb = [...body.querySelectorAll(":scope > table.semboller")];
  if (!semb.length) hata("basamak 2'de en az bir table.tbl.semboller (Sembol | Anlamı | Birimi) olmalı");
  semb.forEach((t, i) => {
    const bb = bolumler.find(x => x.blok.includes(t));
    if (!bb || bb.bas !== 2) hata("semboller tablosu " + (i + 1) + " basamak 2'de olmalı");
    const bas_ = [...t.rows[0].cells].map(c => c.textContent.trim()).join("|");
    if (bas_ !== "Sembol|Anlamı|Birimi") hata("semboller tablosu " + (i + 1) + " başlığı 'Sembol | Anlamı | Birimi' olmalı: " + bas_);
    if (t.rows.length > 7) uyari("semboller tablosu " + (i + 1) + " 6 satırdan uzun");
    const once = t.previousElementSibling;
    if (!once || once.tagName !== "H4") hata("semboller tablosunun önünde bir h4 başlık olmalı");
  });

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

  /* basamak sekmeleri (modal) ve sayfanın üç adımı */
  const tabs = [...document.querySelectorAll("#konu .basamaklar button")];
  if (tabs.map(t => t.dataset.bas).join("") !== "1234") hata("modalda dört basamak sekmesi (data-bas 1–4) olmalı");
  const chipsBox = document.querySelector("#konu .chips");
  if (!chipsBox || chipsBox.dataset.aktif !== "1") hata('.chips başlangıçta data-aktif="1" taşımalı');
  const adimlar = [...document.querySelectorAll(".hero .adimlar [data-step]")].map(a => a.dataset.step).join(",");
  if (adimlar !== "oku,dene,sina") hata("girişteki adım kartı oku, dene, sina adımlarını taşımalı: " + adimlar);
  const ustBar = [...document.querySelectorAll(".header-nav .step[data-step]")].map(a => a.dataset.step).join(",");
  if (ustBar !== "oku,dene,sina") hata("üst bar üç adımı taşımalı: " + ustBar);
  const dene = document.querySelector('.adimlar [data-step="dene"]');
  if (dene && !document.querySelector(dene.getAttribute("href"))) hata("Dene adımının hedefi yok: " + dene.getAttribute("href"));
  if (document.querySelector(".facts, .lesson-card, .hero-card:not(.yol)")) hata("girişte eski formül çipleri ya da anlatım kartı kalmış");
  if (!document.querySelector(".formuller .formula-list")) hata("katlanır formül kutusu (details.formuller) yok");

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
    /* her öğretici bölümde konuyu anlatan en az bir SVG çizim (fotoğraf sayılmaz) */
    if (!b.blok.some(el => el.matches("figure.fig"))) hata("bölüm '" + b.h.textContent.trim() + "': açıklayıcı çizim (figure.fig) yok");
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
    const ex = orn.blok.filter(el => el.matches("details:not(.dusun):not(.alistirma)"));
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
      const ver = d.querySelector(":scope > p.verilen"), ist = d.querySelector(":scope > p.istenen");
      if (!ver || !/^Verilenler:/.test(ver.textContent.trim()) || ver.firstElementChild.tagName !== "B") hata("örnek " + (i + 1) + ": '<p class=\"verilen\"><b>Verilenler:</b> …</p>' yok");
      if (!ist || !/^İstenen:/.test(ist.textContent.trim()) || ist.firstElementChild.tagName !== "B") hata("örnek " + (i + 1) + ": '<p class=\"istenen\"><b>İstenen:</b> …</p>' yok");
      const ad = [...d.children];
      /* durum çizimi: İstenen'den hemen sonra, adımlardan önce, tam bir tane */
      const df = d.querySelectorAll(":scope > figure.fig");
      if (df.length !== 1) hata("örnek " + (i + 1) + ": tam bir durum çizimi (figure.fig) olmalı (" + df.length + ")");
      else if (ist && df[0].previousElementSibling !== ist) hata("örnek " + (i + 1) + ": durum çizimi İstenen satırının hemen ardından gelmeli");
      if (ver && ist && !(ad.indexOf(ver) < ad.indexOf(ist) && ad.indexOf(ist) < ad.indexOf(d.querySelector(":scope > ol.steps")))) hata("örnek " + (i + 1) + ": sıra soru → verilen → istenen → adımlar olmalı");
      if (d.querySelector(":scope > ol.steps") && d.querySelector(":scope > ol.steps").children.length > 6) uyari("örnek " + (i + 1) + ": 6'dan çok adım (slaytta sıkışır)");
    });
    Object.keys(n).forEach(k => { if (n[k] < 2) hata("en az 2 '" + k + "' örnek olmalı (" + n[k] + ")"); });
    if (orn.blok.some(el => el.matches("details.dusun, p.kisaca"))) hata("Çözümlü örnekler bölümünde dusun/kisaca olmamalı");
    /* sıra sende: örneklerden sonra, 'Sıra sende' h4 başlığı altında 4–5 alıştırma, kolaydan zora */
    const al = orn.blok.filter(el => el.matches("details.alistirma"));
    if (al.length < 4 || al.length > 5) hata("4–5 'Sıra sende' alıştırması (details.alistirma) olmalı (" + al.length + ")");
    const sonEx = ex[ex.length - 1], h4s = orn.blok.find(el => el.tagName === "H4" && el.textContent.trim() === "Sıra sende");
    if (!h4s) hata("alıştırmaların önünde '<h4>Sıra sende</h4>' olmalı");
    else if (sonEx && orn.blok.indexOf(h4s) < orn.blok.indexOf(sonEx)) hata("'Sıra sende' bütün örneklerden sonra gelmeli");
    let onc = 0; const nz = { kolay: 0, orta: 0, zor: 0 };
    al.forEach((d, i) => {
      const s = d.querySelector("summary"), z = s && s.dataset.zorluk;
      if (!sira[z]) { hata("alıştırma " + (i + 1) + ": summary data-zorluk kolay|orta|zor olmalı"); return; }
      nz[z]++;
      if (sira[z] < onc) hata("alıştırmalar kolaydan zora sıralı olmalı: " + (i + 1));
      onc = sira[z];
      if (!new RegExp("^Sıra sende " + (i + 1) + ": .+").test(s.textContent.trim())) hata("alıştırma summary 'Sıra sende " + (i + 1) + ": …' biçiminde olmalı: " + s.textContent.trim());
      const c = d.querySelector(":scope > p");
      if (!c || !/^Cevap:/.test(c.textContent.trim())) hata("alıştırma " + (i + 1) + ": cevap '<p><b>Cevap:</b> …</p>' ile başlamalı");
      if (s.textContent.length > 230) uyari("alıştırma " + (i + 1) + " sorusu uzun (" + s.textContent.length + " kr)");
    });
    if (!nz.kolay || !nz.zor) hata("alıştırmalarda en az bir kolay ve bir zor olmalı");
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

  /* görseller: giris (girişte), gunluk (basamak 1), uygulama (basamak 3); isteğe bağlı ek1–ek3 (basamak 1–3) */
  const fotolar = [...body.querySelectorAll("figure.foto")];
  const slug = location.pathname.split("/").pop().replace(/\.html$/, "");
  const adlar = fotolar.map(f => { const i = f.querySelector(":scope > img"); const m = i && (i.getAttribute("src") || "").match(/^gorsel\/(.+)-(giris|gunluk|uygulama|ek[1-3])\.webp(\?v=\d+)?$/); return m && m[1] === slug ? m[2] : null; });
  ["giris", "gunluk", "uygulama"].forEach(a => { if (adlar.filter(x => x === a).length !== 1) hata("tam bir '" + a + "' görseli olmalı"); });
  if (adlar.filter(x => x && x.startsWith("ek")).length > 3) hata("en çok 3 ek görsel olabilir");
  if (ilkFoto && adlar[fotolar.indexOf(ilkFoto)] !== "giris") hata("lead-in'in ardındaki görsel 'giris' olmalı");
  fotolar.forEach((f, i) => {
    const img = f.querySelector(":scope > img"), cap = f.querySelector(":scope > figcaption");
    if (!img) { hata("foto " + (i + 1) + ": img yok"); return; }
    const ad = adlar[i];
    if (!ad) { hata("foto " + (i + 1) + ": src 'gorsel/" + slug + "-<giris|gunluk|uygulama|ekN>.webp[?v=N]' olmalı: " + img.getAttribute("src")); return; }
    const kok = "gorsel/" + slug + "-" + ad + ".webp";
    /* adresler önbellek kırmak için ?v=N taşıyabilir (görsel değişince N artırılır) */
    const src = img.getAttribute("src") || "", surum = (src.match(/\?v=\d+$/) || [""])[0];
    const ss = img.getAttribute("srcset") || "";
    if (ss !== kok.replace(".webp", "-800.webp") + surum + " 800w, " + kok + surum + " 1536w") hata("foto " + ad + ": srcset kalıbı yanlış (src ile aynı sürüm olmalı)");
    if (img.getAttribute("sizes") !== "(max-width: 760px) 100vw, 884px") hata("foto " + ad + ": sizes yanlış");
    ["alt", "width", "height", "loading", "decoding"].forEach(x => { if (!img.getAttribute(x)) hata("foto " + ad + ": " + x + " yok"); });
    if (img.getAttribute("width") !== "1536" || img.getAttribute("height") !== "1024") hata("foto " + ad + ": width=1536 height=1024 olmalı");
    if (img.getAttribute("loading") !== "lazy" || img.getAttribute("decoding") !== "async") hata("foto " + ad + ": loading=lazy decoding=async olmalı");
    if ((img.getAttribute("alt") || "").length < 40) hata("foto " + ad + ": alt metni açıklayıcı olmalı");
    if (!cap || cap.textContent.trim().length < 80) hata("foto " + ad + ": figcaption en az 80 karakter olmalı");
    const bb = bolumler.find(x => x.blok.includes(f));
    if (ad === "gunluk" && (!bb || bb.bas !== 1)) hata("günlük görsel basamak 1'de olmalı");
    if (ad === "uygulama" && (!bb || bb.bas !== 3)) hata("uygulama görseli basamak 3'te olmalı");
    if (ad.startsWith("ek") && (!bb || bb.bas > 3)) hata("ek görsel " + ad + " basamak 1–3'teki bir bölümde olmalı");
  });

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
    dusun: dusun.length, ornek: orn ? orn.blok.filter(el => el.matches("details:not(.dusun):not(.alistirma)")).length : 0,
    alistirma: body.querySelectorAll("details.alistirma").length,
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
    console.log((r.H.length ? "✗ " : "✓ ") + slug.padEnd(21) + ` bölüm ${o.bolum} (${o.basamak}) · ${o.kelime} sözcük · çizim ${o.cizim} · foto ${o.foto} · düşün ${o.dusun} · örnek ${o.ornek} · alıştırma ${o.alistirma}`);
    r.H.forEach(x => console.log("    HATA  " + x));
    r.U.forEach(x => console.log("    uyarı " + x));
    if (r.H.length) kotu++;
  }
  await b.close();
  process.exit(kotu ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
