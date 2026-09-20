#!/usr/bin/env node
/* Sunum önizlemesi ve taşma kontrolü.
 *
 * uret.js --onizleme DIR ile kaydedilen slayt kutularını (metin, şekil, resim, tablo)
 * aynı inç ölçüleriyle HTML'de yeniden çizer (100 px = 1 inç), her slaytı PNG'ye alır
 * ve metin kutularının taşıp taşmadığını raporlar. Yazı tipleri Calibri/Cambria ile
 * aynı ölçülerdeki Carlito/Caladea; sunucuda PowerPoint olmadan yerleşim doğrulaması için.
 *
 *   NODE_PATH=$(npm root -g) node sunum/onizleme.js --girdi /tmp/onizleme [--konu kirilma] [--ekran]
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const argv = process.argv.slice(2);
function arg(name, def) { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : def; }
const DIR = path.resolve(arg("--girdi", "/tmp/dersler-onizleme"));
const ONLY = arg("--konu", null);
const SHOTS = argv.includes("--ekran");
const PX = 100; /* px / inç */

const FONT = { Calibri: "Carlito, Calibri, sans-serif", Cambria: "Caladea, Cambria, serif", "Courier New": "'Liberation Mono', 'Courier New', monospace" };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pt = v => (v * PX) / 72;
const col = (c, t) => c ? (t ? `rgba(${parseInt(c.slice(0, 2), 16)},${parseInt(c.slice(2, 4), 16)},${parseInt(c.slice(4, 6), 16)},${1 - t / 100})` : "#" + c) : "transparent";

function shape(type, o) {
  let st = `left:${o.x * PX}px;top:${o.y * PX}px;width:${o.w * PX}px;height:${Math.max(0, o.h * PX)}px;`;
  const fill = o.fill || {};
  if (fill.type !== "none" && fill.color) st += `background:${col(fill.color, fill.transparency)};`;
  const line = o.line || {};
  if (type === "line") {
    st += `height:0;border-top:${Math.max(1, pt(line.width || 1))}px ${line.dashType === "dash" ? "dashed" : "solid"} ${col(line.color || "000000", line.transparency)};`;
  } else if (line.type !== "none" && line.color) {
    st += `border:${Math.max(1, pt(line.width || 1))}px solid ${col(line.color, line.transparency)};`;
  }
  if (type === "roundRect") st += `border-radius:${(o.rectRadius == null ? 0.1 : o.rectRadius) * PX}px;`;
  if (type === "ellipse") st += "border-radius:50%;";
  return `<div class="sh" style="${st}"></div>`;
}

function runSpan(r, base) {
  const o = r.options || {};
  let st = "";
  if (o.bold) st += "font-weight:700;";
  if (o.italic) st += "font-style:italic;";
  if (o.color) st += `color:#${o.color};`;
  if (o.fontFace) st += `font-family:${FONT[o.fontFace] || o.fontFace};`;
  if (o.fontSize) st += `font-size:${pt(o.fontSize)}px;`;
  if (o.charSpacing) st += `letter-spacing:${pt(o.charSpacing)}px;`;
  const tag = o.subscript ? "sub" : (o.superscript ? "sup" : "span");
  return `<${tag} style="${st}">${esc(r.text).replace(/\n/g, "<br>")}</${tag}>`;
}

function text(t, o) {
  o = o || {};
  const w = o.w * PX, h = o.h * PX;
  const fam = FONT[o.fontFace] || o.fontFace || FONT.Calibri;
  const size = pt(o.fontSize || 18);
  const m = o.margin == null ? [3.6, 7.2, 3.6, 7.2] : (Array.isArray(o.margin) ? o.margin : [o.margin, o.margin, o.margin, o.margin]);
  const pad = m.map(v => pt(v) + "px").join(" ");
  const va = o.valign === "middle" ? "center" : (o.valign === "bottom" ? "flex-end" : "flex-start");
  const lhm = o.lineSpacingMultiple || 1.0;
  let st = `left:${o.x * PX}px;top:${o.y * PX}px;width:${w}px;height:${h}px;padding:${pad};font-family:${fam};font-size:${size}px;` +
    `color:#${o.color || "000000"};text-align:${o.align || "left"};justify-content:${va};line-height:${1.2 * lhm};` +
    (o.bold ? "font-weight:700;" : "") + (o.italic ? "font-style:italic;" : "") + (o.charSpacing ? `letter-spacing:${pt(o.charSpacing)}px;` : "");
  let inner = "";
  if (Array.isArray(t)) {
    /* paragraflara böl: breakLine sonrası yeni paragraf */
    const paras = [[]];
    t.forEach((r, i) => { paras[paras.length - 1].push(r); if ((r.options || {}).breakLine && i < t.length - 1) paras.push([]); });
    let num = 0;
    inner = paras.map(p => {
      const first = (p[0] && p[0].options) || {};
      const spans = p.map(r => runSpan(r)).join("");
      const after = first.paraSpaceAfter ? `margin-bottom:${pt(first.paraSpaceAfter)}px;` : "";
      if (first.bullet) {
        const b = first.bullet === true ? {} : first.bullet;
        const indent = pt(b.indent || 27);
        let mark;
        if (b.type === "number") { num++; mark = num + "."; } else mark = b.code ? String.fromCharCode(parseInt(b.code, 16)) : "•";
        return `<div class="li" style="padding-left:${indent}px;${after}"><span class="bu" style="width:${indent}px">${mark}</span>${spans}</div>`;
      }
      return `<div class="pp" style="${after}">${spans}</div>`;
    }).join("");
  } else {
    inner = `<div class="pp">${esc(t).replace(/\n/g, "<br>")}</div>`;
  }
  return `<div class="tx" style="${st}" data-snippet="${esc((Array.isArray(t) ? t.map(r => r.text).join("") : t).slice(0, 60))}">${inner}</div>`;
}

function image(o) {
  return `<img class="im" src="file://${o.path}" style="left:${o.x * PX}px;top:${o.y * PX}px;width:${o.w * PX}px;height:${o.h * PX}px">`;
}

function table(rows, o) {
  const colW = o.colW || rows[0].map(() => o.w / rows[0].length);
  const rowH = o.rowH || [];
  const bc = (o.border && o.border.color) || "cccccc";
  let html = `<table class="tb" style="left:${o.x * PX}px;top:${o.y * PX}px;width:${o.w * PX}px;font-family:${FONT[o.fontFace] || FONT.Calibri};font-size:${pt(o.fontSize || 12)}px;color:#${o.color || "000000"};border-color:#${bc}"><colgroup>` +
    colW.map(c => `<col style="width:${c * PX}px">`).join("") + "</colgroup>";
  rows.forEach((r, i) => {
    html += `<tr style="height:${(rowH[i] || 0.3) * PX}px">` + r.map(c => {
      const co = c.options || {};
      const m = co.margin == null ? [3.6, 7.2, 3.6, 7.2] : (Array.isArray(co.margin) ? co.margin : [co.margin, co.margin, co.margin, co.margin]);
      const st = `padding:${m.map(v => pt(v) + "px").join(" ")};` + (co.bold ? "font-weight:700;" : "") + (co.color ? `color:#${co.color};` : "") +
        (co.fontSize ? `font-size:${pt(co.fontSize)}px;` : "") + (co.fill && co.fill.color ? `background:#${co.fill.color};` : "") +
        `vertical-align:${co.valign === "middle" ? "middle" : "top"};border:1px solid #${bc};`;
      return `<td style="${st}"><div class="tx cell" data-snippet="${esc(String(c.text).slice(0, 40))}">${esc(c.text)}</div></td>`;
    }).join("") + "</tr>";
  });
  return html + "</table>";
}

function render(deck) {
  const slides = deck.slides.map((s, i) => {
    const items = s.items.map(it => {
      if (it.m === "addShape") return shape(it.a, it.b);
      if (it.m === "addText") return text(it.a, it.b);
      if (it.m === "addImage") return image(it.a);
      if (it.m === "addTable") return table(it.a, it.b);
      return "";
    }).join("\n");
    return `<section class="slide" id="s${i + 1}" style="background:#${s.bg || "FFFFFF"}"><span class="no">${i + 1}</span>${items}</section>`;
  }).join("\n");
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>${esc(deck.title)} — önizleme</title>
<link href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&family=Caladea:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  body{margin:0;background:#666;font-family:Carlito,sans-serif}
  .slide{position:relative;width:${13.333 * PX}px;height:${7.5 * PX}px;margin:24px auto;overflow:visible;box-shadow:0 10px 40px rgba(0,0,0,.4)}
  .slide .no{position:absolute;right:-40px;top:0;color:#fff;font-size:14px}
  .sh,.tx,.im,.tb{position:absolute;box-sizing:border-box}
  .tx{display:flex;flex-direction:column;overflow:visible;word-wrap:break-word}
  .tx.cell{position:static;display:block}
  .pp,.li{position:relative}
  .li .bu{position:absolute;left:0;top:0;text-align:left}
  .im{object-fit:fill}
  .tb{border-collapse:collapse;table-layout:fixed}
  .tb td{overflow:hidden}
  sub,sup{font-size:.7em;line-height:0}
  .over{outline:3px solid #ff2d55;outline-offset:2px}
</style></head><body>${slides}</body></html>`;
}

(async () => {
  let files = fs.readdirSync(DIR).filter(f => f.endsWith(".json"));
  if (ONLY) files = files.filter(f => f === ONLY + ".json");
  if (!files.length) throw new Error("önizleme verisi yok: " + DIR);
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 900, deviceScaleFactor: 1 });
  let totalIssues = 0;
  for (const f of files) {
    const deck = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    const html = render(deck);
    const out = path.join(DIR, deck.slug + ".html");
    fs.writeFileSync(out, html);
    await page.goto("file://" + out, { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 300));
    const issues = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll(".slide").forEach((sl, si) => {
        const sr = sl.getBoundingClientRect();
        sl.querySelectorAll(".tx").forEach(el => {
          const isCell = el.classList.contains("cell");
          const overV = el.scrollHeight > el.clientHeight + 3;
          const overH = el.scrollWidth > el.clientWidth + 3;
          const r = el.getBoundingClientRect();
          const outside = !isCell && (r.bottom > sr.bottom + 1 || r.right > sr.right + 1);
          if ((overV && !isCell) || overH || outside) {
            el.classList.add("over");
            out.push({ slide: si + 1, kind: overV ? "taşma-dikey" : (overH ? "taşma-yatay" : "slayt-dışı"),
              by: Math.round(Math.max(el.scrollHeight - el.clientHeight, el.scrollWidth - el.clientWidth)),
              text: el.dataset.snippet });
          }
        });
        /* tablo: satırın gerçek yüksekliği planlanandan fazla mı */
        sl.querySelectorAll(".tb").forEach(tb => {
          const r = tb.getBoundingClientRect();
          const planned = [...tb.querySelectorAll("tr")].reduce((a, tr) => a + parseFloat(tr.style.height), 0);
          if (r.height > planned + 6) out.push({ slide: si + 1, kind: "tablo-uzadı", by: Math.round(r.height - planned), text: tb.querySelector("td").textContent.slice(0, 40) });
        });
      });
      return out;
    });
    totalIssues += issues.length;
    console.log((deck.slug + ":").padEnd(24), deck.slides.length, "slayt,", issues.length ? issues.length + " sorun" : "temiz");
    issues.forEach(i => console.log("   ", "slayt", String(i.slide).padStart(2), i.kind, "+" + i.by + "px", "·", i.text));
    if (SHOTS) {
      const dir = path.join(DIR, deck.slug);
      fs.mkdirSync(dir, { recursive: true });
      const n = deck.slides.length;
      for (let i = 1; i <= n; i++) {
        const el = await page.$("#s" + i);
        await el.screenshot({ path: path.join(dir, String(i).padStart(2, "0") + ".png") });
      }
    }
  }
  await browser.close();
  console.log(totalIssues ? totalIssues + " sorun" : "tümü temiz");
  process.exit(totalIssues ? 2 : 0);
})().catch(e => { console.error(e); process.exit(1); });
