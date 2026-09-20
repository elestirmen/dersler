#!/usr/bin/env node
/* Ortak stili dist/ içindeki sayfalara yazar.
 *   node stil/uygula.js            → 18 konu sayfası + index.html
 * Yalnızca <style>…</style> bloğunu değiştirir; başka bir şeye dokunmaz. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const konu = fs.readFileSync(path.join(__dirname, "konu.css"), "utf8").replace(/\s+$/, "");
const ana = fs.readFileSync(path.join(__dirname, "anasayfa.css"), "utf8").replace(/\s+$/, "");

/* ana sayfa: konu.css'in genel bölümleri + anasayfa.css */
function bolum(ad) {
  const re = new RegExp("      /\\* ================= " + ad.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
    " ================= \\*/[\\s\\S]*?(?=\\n      /\\* ================= |$)");
  const m = konu.match(re);
  if (!m) throw new Error("konu.css içinde bölüm yok: " + ad);
  return m[0].replace(/\s+$/, "") + "\n\n";
}
const GENEL = ["tema belirteçleri", "temel", "tema geçişi", "üst bar", "ortak", "giriş", "bölümler",
               "belirme", "başa dön", "alt bilgi", "duyarlılık"];
const anaCss = GENEL.map(bolum).join("").replace(/\s+$/, "") + "\n\n" + ana;

function yaz(dosya, css) {
  const p = path.join(DIST, dosya);
  const html = fs.readFileSync(p, "utf8");
  const yeni = html.replace(/<style>[\s\S]*?<\/style>/, () => "<style>\n" + css + "\n    </style>");
  if (yeni === html) { console.log("  = " + dosya + " (değişmedi)"); return; }
  fs.writeFileSync(p, yeni);
  console.log("  ✓ " + dosya);
}

const sayfalar = fs.readdirSync(DIST).filter(f => /\.html$/.test(f) && f !== "index.html" && f !== "404.html");
console.log("konu sayfaları (" + sayfalar.length + "):");
sayfalar.forEach(f => yaz(f, konu));
console.log("ana sayfa:");
yaz("index.html", anaCss);
