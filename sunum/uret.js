#!/usr/bin/env node
/* Konu anlatımından sunum üretir.
 *
 * Her konu sayfasının "Konu anlatımı" modalı tek kaynaktır: dokuz bölüm başlığı,
 * paragraflar, formül kutuları, tablolar, çizimler, çözümlü örnekler ve sık
 * yapılan hatalar aynen slaytlara taşınır; konuşmacı notu anlatımın kendisidir.
 *
 *   NODE_PATH=$(npm root -g) node sunum/uret.js                 # 18 konu → dist/sunum
 *   NODE_PATH=$(npm root -g) node sunum/uret.js --konu kirilma  # tek konu
 *   NODE_PATH=$(npm root -g) node sunum/uret.js --cikti /tmp/x --onizleme /tmp/x/onizleme
 *
 * Gerekenler (küresel): pptxgenjs, puppeteer (çizimleri PNG'ye çevirir ve modalı okur).
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const pptxgen = require("pptxgenjs");
const puppeteer = require("puppeteer");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, H, M } = T;
const CW = W - M * 2;

/* ---------------------------------------------------------------- ayarlar */
const argv = process.argv.slice(2);
function arg(name, def) { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : def; }
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const OUT = path.resolve(arg("--cikti", path.join(DIST, "sunum")));
const PREVIEW = arg("--onizleme", null) ? path.resolve(arg("--onizleme")) : null;
const ONLY = arg("--konu", null);
const FIGDIR = path.resolve(arg("--sekiller", path.join(os.tmpdir(), "dersler-sekiller")));
const SITE = "dersler.perinet.org";

const TONES = [C.blue, C.violet, C.lime, C.amber, C.blue, C.violet, C.lime, C.amber, C.rose];

/* ------------------------------------------------------- metin ölçüleri */
/* Calibri için kaba ölçü: karakter/inç ve satır yüksekliği (inç). Sarma payı dahil. */
function cpi(size, bold) { return (72 / (size * (bold ? 0.5 : 0.47))) * 0.9; }
function lh(size, mult) { return (size * 1.2 * (mult || 1.15)) / 72; }
function lines(text, w, size, bold) {
  const parts = String(text).split("\n");
  return parts.reduce((n, t) => n + Math.max(1, Math.ceil(t.length / (w * cpi(size, bold)))), 0);
}
function textH(text, w, size, bold, mult) { return lines(text, w, size, bold) * lh(size, mult); }
function plain(runs) { return runs.map(r => r.t).join(""); }

/* modal koşuları → pptxgenjs koşuları */
function toRuns(runs, o) {
  o = o || {};
  return runs.map(r => {
    const opt = {};
    if (r.b) { opt.bold = true; opt.color = o.boldColor || C.ink; }
    if (r.i) opt.italic = true;
    if (r.sub) opt.subscript = true;
    if (r.sup) opt.superscript = true;
    if (r.mono) { opt.fontFace = F.mono; opt.color = o.monoColor || C.blue; }
    return { text: r.t, options: opt };
  });
}

/* paragrafı cümlelere ayırır (biçimlendirme korunur); slaytta her cümle bir madde olur */
function sentences(runs) {
  const text = plain(runs);
  const re = /(?<=[.!?…])\s+(?=[A-ZÇĞİÖŞÜ0-9“"(])/g;
  const starts = []; let m;
  while ((m = re.exec(text))) starts.push([m.index, m.index + m[0].length]);
  if (!starts.length) return [runs];
  const out = []; let cur = [], si = 0, idx = 0;
  runs.forEach(r => {
    let t = r.t, local = idx;
    while (t.length) {
      const next = si < starts.length ? starts[si] : null;
      if (next && next[0] >= local && next[0] < local + t.length) {
        const piece = t.slice(0, next[0] - local);
        if (piece) cur.push(Object.assign({}, r, { t: piece }));
        out.push(cur); cur = [];
        const skip = Math.min(t.length, next[1] - local);
        t = t.slice(skip); local += skip; si++;
      } else { cur.push(Object.assign({}, r, { t })); local += t.length; t = ""; }
    }
    idx += r.t.length;
  });
  if (cur.length) out.push(cur);
  return out.filter(s => plain(s).trim().length);
}
function paraItems(b) {
  if (!b._items) {
    const sents = sentences(b.runs);
    b._items = sents.length >= 2 ? sents.map(rs => ({ runs: rs, text: plain(rs) })) : null;
  }
  return b._items;
}

/* liste → tek metin kutusu; her madde ayrı paragraf */
function listRuns(items, numbered, o) {
  const out = [];
  items.forEach((it, i) => {
    const rs = toRuns(it.runs, o);
    if (!rs.length) rs.push({ text: it.text, options: {} });
    rs[0].options.bullet = numbered ? { type: "number", indent: 18 } : { code: "25AA", indent: 16 };
    rs[0].options.paraSpaceAfter = 5;
    rs[rs.length - 1].options.breakLine = i < items.length - 1;
    out.push(...rs);
  });
  return out;
}

/* --------------------------------------------------------- blok yüksekliği */
const BODY = 13;
function formulaRows(codes, w) {
  const rows = [[]]; let x = 0;
  codes.forEach(c => {
    const bw = Math.min(w, c.length * 0.108 + 0.5);
    if (x + bw > w && rows[rows.length - 1].length) { rows.push([]); x = 0; }
    rows[rows.length - 1].push({ text: c, w: bw });
    x += bw + 0.12;
  });
  return rows;
}
function tableRowH(row, colW, size) {
  let n = 1;
  row.forEach((cell, j) => { n = Math.max(n, lines(cell.text, colW[j] - 0.2, size, cell.head || j === 0)); });
  return n * lh(size, 1.05) + 0.16;
}
function tableCols(rows, w) {
  const cols = rows[0].length;
  const need = new Array(cols).fill(0);
  rows.forEach(r => r.forEach((c, j) => { need[j] = Math.max(need[j], Math.min(c.text.length, 40)); }));
  const sum = need.reduce((a, b) => a + b, 0) || 1;
  const min = 1.1;
  let colW = need.map(n => Math.max(min, (n / sum) * w));
  const total = colW.reduce((a, b) => a + b, 0);
  colW = colW.map(c => (c / total) * w);
  return colW;
}
function blockH(b, w, size) {
  size = size || BODY;
  switch (b.type) {
    case "p": {
      const items = paraItems(b);
      if (items) return items.reduce((h, it) => h + textH(it.text, w - 0.3, size) + 0.07, 0) + 0.12;
      return textH(b.text, w, size) + 0.14;
    }
    case "h4": return 0.38;
    case "ul": case "ol":
      return b.items.reduce((h, it) => h + textH(it.text, w - 0.3, size) + 0.07, 0) + 0.12;
    case "formula": return formulaRows(b.codes, w).length * 0.62 + 0.06;
    case "callout": return textH(b.text, w - 0.62, size - 1) + 0.44 + 0.12;
    case "table": {
      const colW = tableCols(b.rows, w);
      return b.rows.reduce((h, r) => h + tableRowH(r, colW, 12), 0) + 0.14;
    }
    default: return 0;
  }
}

/* ------------------------------------------------------------- çizimler */
function drawBlock(s, b, x, y, w, tone, size) {
  size = size || BODY;
  const h = blockH(b, w, size);
  if (b.type === "p") {
    const items = paraItems(b);
    if (items) {
      s.addText(listRuns(items, false), { x, y, w, h: h - 0.12, fontFace: F.body, fontSize: size, color: C.muted,
        lineSpacingMultiple: 1.15, valign: "top", isTextBox: true, margin: 0 });
    } else {
      s.addText(toRuns(b.runs), { x, y, w, h: h - 0.14, fontFace: F.body, fontSize: size, color: C.muted,
        lineSpacingMultiple: 1.15, valign: "top", isTextBox: true, margin: 0 });
    }
  } else if (b.type === "h4") {
    s.addText(b.text, { x, y: y + 0.04, w, h: 0.3, fontFace: F.body, fontSize: size + 0.5, bold: true, color: C.blue,
      valign: "middle", isTextBox: true, margin: 0 });
  } else if (b.type === "ul" || b.type === "ol") {
    s.addText(listRuns(b.items, b.type === "ol"), { x, y, w, h: h - 0.12, fontFace: F.body, fontSize: size,
      color: C.muted, lineSpacingMultiple: 1.15, valign: "top", isTextBox: true, margin: 0 });
  } else if (b.type === "formula") {
    let yy = y;
    formulaRows(b.codes, w).forEach(row => {
      let xx = x;
      row.forEach(c => { T.formula(s, c.text, { x: xx, y: yy, w: c.w, h: 0.5, size: 13 }); xx += c.w + 0.12; });
      yy += 0.62;
    });
  } else if (b.type === "callout") {
    const ch = h - 0.12;
    s.addShape("roundRect", { x, y, w, h: ch, rectRadius: 0.12, fill: { color: C.white },
      line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
    s.addShape("rect", { x: x + 0.02, y: y + 0.16, w: 0.05, h: ch - 0.32,
      fill: { color: b.warn ? C.amber : C.lime }, line: { type: "none" } });
    s.addText(toRuns(b.runs), { x: x + 0.3, y: y + 0.12, w: w - 0.5, h: ch - 0.24, fontFace: F.body, fontSize: size - 1,
      color: C.muted, lineSpacingMultiple: 1.12, valign: "middle", isTextBox: true, margin: 0 });
  } else if (b.type === "table") {
    const colW = tableCols(b.rows, w);
    const rowH = b.rows.map(r => tableRowH(r, colW, 12));
    const rows = b.rows.map((r, i) => r.map((c, j) => ({
      text: c.text,
      options: {
        bold: c.head || j === 0,
        color: c.head ? C.dim : (j === 0 ? C.ink : C.muted),
        fontSize: c.head ? 10.5 : 12,
        fill: { color: c.head ? C.softer : (i % 2 ? C.white : "FBFCFE") },
        valign: "middle",
        margin: [3, 6, 3, 6]
      }
    })));
    s.addTable(rows, { x, y, w, colW, rowH, fontFace: F.body, fontSize: 12, color: C.muted,
      border: { type: "solid", pt: 0.75, color: C.line }, autoPage: false });
  }
  return h;
}

/* çizim kartı: PNG + alt yazı; kullanılan yüksekliği döndürür */
function drawFigure(s, fig, x, y, w, maxH) {
  const pad = 0.2;
  const iw = w - pad * 2;
  const capSize = 10.5;
  const capH = fig.captionText ? textH(fig.captionText, iw, capSize, false, 1.12) + 0.14 : 0;
  let ih = iw / fig.ratio;
  const maxImg = Math.min(3.7, Math.max(1.6, maxH - capH - pad * 2 - 0.1));
  let drawW = iw;
  if (ih > maxImg) { ih = maxImg; drawW = ih * fig.ratio; }
  const h = ih + capH + pad * 2 + (capH ? 0.08 : 0);
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.16, fill: { color: C.white },
    line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
  s.addImage({ path: fig.png, x: x + pad + (iw - drawW) / 2, y: y + pad, w: drawW, h: ih });
  if (capH) {
    s.addShape("line", { x: x + pad, y: y + pad + ih + 0.1, w: iw, h: 0, line: { color: C.line, width: 0.75, dashType: "dash" } });
    s.addText(toRuns(fig.caption, { boldColor: C.muted }), { x: x + pad, y: y + pad + ih + 0.16, w: iw, h: capH - 0.08,
      fontFace: F.body, fontSize: capSize, color: C.dim, lineSpacingMultiple: 1.12, valign: "top", isTextBox: true, margin: 0 });
  }
  return h;
}

/* -------------------------------------------------------------- slaytlar */
const TOP = 1.62, BOTTOM = 6.72;

function chapterSlides(p, ctx, no, ch) {
  const tone = TONES[(no - 1) % TONES.length];
  const figs = ch.blocks.filter(b => b.type === "fig");
  const content = ch.blocks.filter(b => b.type !== "fig" && b.type !== "example" && !(b.type === "callout" && /^Kendini sına/.test(b.text)));
  const hasFig = figs.length > 0;
  const avail = BOTTOM - TOP;

  /* içerik kısaysa yazı büyür, çizim genişler; uzunsa 13 pt ve sayfalama */
  const candidates = hasFig
    ? [{ size: 16, colW: 6.0 }, { size: 15, colW: 6.4 }, { size: 14, colW: 6.9 }, { size: 13, colW: 7.3 },
       { size: 12.5, colW: 7.6 }, { size: 12, colW: 7.9 }]
    : [{ size: 16, colW: 9.2 }, { size: 15, colW: 9.5 }, { size: 14, colW: 9.7 }, { size: 13, colW: 9.7 },
       { size: 12.5, colW: 9.7 }, { size: 12, colW: 9.7 }];
  let pick = null;
  for (const c of candidates) {
    const total = content.reduce((h, b) => h + blockH(b, c.colW, c.size), 0);
    if (total <= avail * (c.size >= 15 ? 0.92 : 1)) { pick = c; break; }
  }

  /* sayfalar: [{blocks, colW, fig}] — tek sayfaya sığmazsa dengeli ikiye böl, çizim ilk sayfada */
  let pages;
  if (pick) {
    pages = [{ blocks: content, colW: pick.colW, size: pick.size, fig: hasFig }];
  } else {
    const size = 13, colFig = hasFig ? 7.3 : 9.7, colFull = 9.7;
    let best = null;
    for (let k = 1; k < content.length; k++) {
      const h1 = content.slice(0, k).reduce((h, b) => h + blockH(b, colFig, size), 0);
      const h2 = content.slice(k).reduce((h, b) => h + blockH(b, colFull, size), 0);
      if (h1 <= avail && h2 <= avail) {
        const score = Math.abs(h1 - h2);
        if (!best || score < best.score) best = { k, score };
      }
    }
    if (best) {
      pages = [{ blocks: content.slice(0, best.k), colW: colFig, size, fig: hasFig },
               { blocks: content.slice(best.k), colW: colFull, size, fig: false }];
    } else {
      /* üç ya da daha fazla sayfa: sırayla doldur */
      pages = [{ blocks: [], colW: colFig, size, fig: hasFig }]; let y = 0;
      content.forEach(b => {
        const cur = pages[pages.length - 1];
        const h = blockH(b, cur.colW, size);
        if (y + h > avail && cur.blocks.length) { pages.push({ blocks: [], colW: colFull, size, fig: false }); y = 0; }
        pages[pages.length - 1].blocks.push(b); y += h;
      });
    }
  }

  pages.forEach((pg, pi) => {
    const { blocks, colW, size } = pg;
    const figX = M + colW + 0.32, figW = W - M - figX;
    const s = T.light(p);
    T.head(s, no, ch.title + (pi ? " · devam" : ""), tone);
    let yy = TOP;
    blocks.forEach(b => { yy += drawBlock(s, b, M, yy, colW, tone, size); });
    if (pg.fig) {
      let fy = TOP;
      figs.forEach((f, i) => {
        if (i > 0 && fy > BOTTOM - 2.2) return; /* sığmayan ikinci çizim atlanır */
        fy += drawFigure(s, f, figX, fy, figW, BOTTOM - fy) + 0.18;
      });
    }
    ctx.page++;
    T.footer(s, ctx.foot, ctx.page);
    const notes = [ch.title, ""].concat(blocks.map(b => b.type === "table" ? b.rows.map(r => r.map(c => c.text).join(" | ")).join("\n") :
      (b.type === "ul" || b.type === "ol") ? b.items.map(it => "• " + it.text).join("\n") :
      b.type === "formula" ? b.codes.join("   ") : b.text)).concat(pi === 0 ? figs.map(f => "Çizim: " + f.captionText) : []);
    s.addNotes(notes.filter(Boolean).join("\n\n"));
  });
}

function exampleSlide(p, ctx, no, ex, i, total, intro) {
  const tone = TONES[(no - 1) % TONES.length];
  const s = T.light(p);
  T.head(s, no, "Çözümlü örnek " + (i + 1) + " / " + total, tone);
  const sub = ex.title.replace(/^Örnek\s*\d+\s*[—–-]\s*/u, "");
  T.lede(s, sub + (intro ? "  ·  " + intro : ""));

  const top = 1.78, h = BOTTOM - top;
  /* soru kartı */
  const qw = 4.7;
  T.card(s, { x: M, y: top, w: qw, h, fill: C.softer });
  s.addText("SORU", { x: M + 0.32, y: top + 0.24, w: 3, h: 0.28, fontFace: F.body, fontSize: 10.5, bold: true,
    color: tone, charSpacing: 2, isTextBox: true, margin: 0 });
  const qText = ex.intro.map(b => b.text).join("\n");
  let qSize = 16;
  while (qSize > 11 && textH(qText, qw - 0.64, qSize) > h - 1.6) qSize -= 0.5;
  const qRuns = [];
  ex.intro.forEach((b, k) => { const rs = toRuns(b.runs); if (rs.length) { rs[rs.length - 1].options.breakLine = k < ex.intro.length - 1; qRuns.push(...rs); } });
  const qh = textH(qText, qw - 0.64, qSize) + 0.1;
  s.addText(qRuns, { x: M + 0.32, y: top + 0.6, w: qw - 0.64, h: qh, fontFace: F.body, fontSize: qSize, color: C.ink,
    lineSpacingMultiple: 1.18, valign: "top", isTextBox: true, margin: 0 });
  if (ex.outro.length) {
    const oText = ex.outro.map(b => b.text).join("\n");
    const oy = top + 0.7 + qh + 0.15;
    const oh = Math.min(h - (oy - top) - 0.3, textH(oText, qw - 0.64, 11.5) + 0.36);
    if (oh > 0.5) {
      s.addText("NOT", { x: M + 0.32, y: oy, w: 3, h: 0.24, fontFace: F.body, fontSize: 9.5, bold: true, color: C.dim,
        charSpacing: 2, isTextBox: true, margin: 0 });
      const oRuns = []; ex.outro.forEach((b, k) => { const rs = toRuns(b.runs, { boldColor: C.ink }); if (rs.length) { rs[rs.length - 1].options.breakLine = k < ex.outro.length - 1; oRuns.push(...rs); } });
      s.addText(oRuns, { x: M + 0.32, y: oy + 0.28, w: qw - 0.64, h: oh - 0.3, fontFace: F.body, fontSize: 11.5, color: C.muted,
        lineSpacingMultiple: 1.12, valign: "top", isTextBox: true, margin: 0 });
    }
  }

  /* çözüm adımları */
  const sx = M + qw + 0.3, sw = W - M - sx;
  const n = ex.steps.length, gap = 0.16;
  const textW = sw - 1.05;
  const budget = h - (n - 1) * gap;
  let size = 16, need = [];
  for (;;) {
    need = ex.steps.map(st => Math.max(0.62, textH(st.text, textW, size, false, 1.12) + 0.34));
    if (need.reduce((a, b) => a + b, 0) <= budget || size <= 10.5) break;
    size -= 0.5;
  }
  /* kalan boşluğu kartlara orantılı dağıt */
  const f = budget / need.reduce((a, b) => a + b, 0);
  const hs = need.map(v => v * Math.min(f, 2.2));
  const extra = (budget - hs.reduce((a, b) => a + b, 0)) / n;
  let y = top;
  ex.steps.forEach((st, k) => {
    const sh = hs[k] + extra;
    T.card(s, { x: sx, y, w: sw, h: sh });
    B.rozet(s, k + 1, sx + 0.26, y + (sh - 0.42) / 2, 0.42, tone);
    s.addText(toRuns(st.runs), { x: sx + 0.85, y: y + 0.06, w: textW, h: sh - 0.12, fontFace: F.body, fontSize: size,
      color: C.muted, lineSpacingMultiple: 1.12, valign: "middle", isTextBox: true, margin: 0 });
    y += sh + gap;
  });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes([ex.title, "", qText, "", ex.steps.map((st, k) => (k + 1) + ". " + st.text).join("\n")]
    .concat(ex.outro.length ? ["", ex.outro.map(b => b.text).join("\n")] : []).join("\n"));
}

function mistakesSlide(p, ctx, no, ch) {
  const list = ch.blocks.find(b => b.type === "ul");
  const s = T.light(p);
  T.head(s, no, ch.title, C.rose);
  const intro = ch.blocks.find(b => b.type === "p" && !/^Kendini sına/.test(b.text));
  T.lede(s, intro ? intro.text : "Sınavda puan kaybettiren klasikler ve doğrusu.");
  const items = list ? list.items : [];
  const n = items.length, cols = 2, rows = Math.ceil(n / cols);
  const top = 1.78, gap = 0.16, cw = (CW - 0.24) / 2;
  const ch_ = (BOTTOM - top - (rows - 1) * gap) / rows;
  const split = it => {
    /* baştaki kalın koşular iddia, kalanı açıklama */
    let k = 0; while (k < it.runs.length && (it.runs[k].b || !it.runs[k].t.trim())) k++;
    const claim = it.runs.slice(0, k), expl = it.runs.slice(k);
    if (!claim.length) { claim.push(it.runs[0]); expl.splice(0, 1); }
    return { claim, expl };
  };
  let claimSize = 15, explSize = 14;
  while (claimSize > 11.5 && items.some(it => {
    const { claim, expl } = split(it);
    return 0.13 + textH(plain(claim), cw - 0.95, claimSize, true) + 0.12 + textH(plain(expl), cw - 0.86, explSize) + 0.16 > ch_;
  })) { claimSize -= 0.5; explSize -= 0.5; }
  items.forEach((it, i) => {
    const { claim, expl } = split(it);
    const col = i % cols, row = Math.floor(i / cols);
    const x = M + col * (cw + 0.24), y = top + row * (ch_ + gap);
    T.card(s, { x, y, w: cw, h: ch_, fill: C.white });
    const claimText = plain(claim).replace(/^[“"]|[”"]$/g, "");
    const claimH = textH(claimText, cw - 0.95, claimSize, true) + 0.06;
    s.addShape("roundRect", { x: x + 0.22, y: y + 0.16, w: 0.3, h: 0.3, rectRadius: 0.08, fill: { color: "FBE9EE" }, line: { type: "none" } });
    s.addText("✗", { x: x + 0.22, y: y + 0.16, w: 0.3, h: 0.3, align: "center", valign: "middle", fontFace: F.body,
      fontSize: 12.5, bold: true, color: C.rose, isTextBox: true, margin: 0 });
    s.addText(toRuns(claim.map(r => Object.assign({}, r, { b: true }))), { x: x + 0.64, y: y + 0.13, w: cw - 0.86, h: claimH,
      fontFace: F.body, fontSize: claimSize, color: C.ink, lineSpacingMultiple: 1.08, valign: "top", isTextBox: true, margin: 0 });
    const ey = y + 0.13 + claimH + 0.06;
    s.addShape("roundRect", { x: x + 0.22, y: ey + 0.02, w: 0.3, h: 0.3, rectRadius: 0.08, fill: { color: "EAF7DC" }, line: { type: "none" } });
    s.addText("✓", { x: x + 0.22, y: ey + 0.02, w: 0.3, h: 0.3, align: "center", valign: "middle", fontFace: F.body,
      fontSize: 12.5, bold: true, color: C.lime, isTextBox: true, margin: 0 });
    s.addText(toRuns(expl, { boldColor: C.ink }), { x: x + 0.64, y: ey, w: cw - 0.86, h: Math.max(0.3, ch_ - (ey - y) - 0.12),
      fontFace: F.body, fontSize: explSize, color: C.muted, lineSpacingMultiple: 1.08, valign: "top", isTextBox: true, margin: 0 });
  });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes([ch.title, ""].concat(items.map(it => "• " + it.text)).join("\n"));
}

/* açılış sorusu: konu anlatımının giriş bloğu, büyük puntoyla */
function openingSlide(p, ctx, d) {
  if (!d.leadInRuns || !d.leadInRuns.length) return;
  const s = T.light(p);
  T.head(s, "?", "Başlarken", C.violet);
  T.lede(s, "Konuya günlük bir soruyla giriyoruz.");
  const x = M + 0.6, w = CW - 1.2, y = 2.0, h = 4.3;
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.22, fill: { color: C.white },
    line: { color: "CFC8F5", width: 0.75 }, shadow: T.shadow({}) });
  s.addShape("rect", { x: x + 0.04, y: y + 0.5, w: 0.07, h: h - 1.0, fill: { color: C.violet }, line: { type: "none" } });
  let size = 22;
  while (size > 15 && textH(d.leadIn, w - 1.4, size, false, 1.3) > h - 0.9) size -= 1;
  s.addText(toRuns(d.leadInRuns, { boldColor: C.violet }), { x: x + 0.7, y: y + 0.4, w: w - 1.4, h: h - 0.8,
    fontFace: F.head, fontSize: size, color: C.ink, lineSpacingMultiple: 1.3, valign: "middle", isTextBox: true, margin: 0 });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Açılış sorusu — sınıfa sorup birkaç cevap alın, sonra konuya geçin.\n\n" + d.leadIn);
}

function outlineSlide(p, ctx, d) {
  const s = T.light(p);
  T.head(s, "≡", "Bu derste", C.blue);
  T.lede(s, "Konu anlatımının dokuz başlığı, sırasıyla.");
  const cw = 3.71, chh = 1.42, gx = 0.4, gy = 0.2, top = 1.72;
  d.chapters.forEach((ch, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (cw + gx), y = top + row * (chh + gy);
    T.card(s, { x, y, w: cw, h: chh });
    B.rozet(s, i + 1, x + 0.26, y + 0.24, 0.4, TONES[i % TONES.length]);
    s.addText(ch.title, { x: x + 0.8, y: y + 0.2, w: cw - 1.0, h: 0.48, fontFace: F.body, fontSize: 14, bold: true,
      color: C.ink, valign: "middle", isTextBox: true, margin: 0 });
    const nEx = ch.blocks.filter(b => b.type === "example").length;
    const nErr = /hata/i.test(ch.title) ? ((ch.blocks.find(b => b.type === "ul") || { items: [] }).items.length) : 0;
    const desc = nEx ? nEx + " çözümlü örnek, adım adım; g ve yaklaşık değerler anlatımla aynı." :
      nErr ? nErr + " yaygın yanılgı ve her birinin doğrusu." : firstSentence(ch, 92);
    s.addText(desc, { x: x + 0.28, y: y + 0.74, w: cw - 0.52, h: chh - 0.8, fontFace: F.body, fontSize: 10.5,
      color: C.muted, lineSpacingMultiple: 1.1, valign: "top", isTextBox: true, margin: 0 });
  });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Bu derste:\n" + d.chapters.map((c, i) => (i + 1) + ". " + c.title).join("\n"));
}

function firstSentence(ch, max) {
  const b = ch.blocks.find(x => x.type === "p" && x.text.length > 20) || ch.blocks.find(x => x.type === "ul") || null;
  let t = b ? (b.type === "ul" ? b.items[0].text : b.text) : "";
  const m = t.match(/^[^.!?]*[.!?]/);
  if (m && m[0].length >= 40) t = m[0];
  if (t.length > max) t = t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
  return t;
}

function summarySlide(p, ctx, d) {
  const s = T.dark(p);
  s.addShape("rect", { x: M + 0.25, y: 1.25, w: 0.06, h: 0.6, fill: { color: C.limeBright }, line: { type: "none" } });
  s.addText("Özetle", { x: M + 0.5, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40, bold: true, color: C.white,
    isTextBox: true, margin: 0, charSpacing: -1 });
  /* sol: aklında kalsın */
  s.addText("AKLINDA KALSIN", { x: M + 0.25, y: 2.25, w: 5, h: 0.3, fontFace: F.body, fontSize: 10.5, bold: true,
    color: "8D97B5", charSpacing: 2, isTextBox: true, margin: 0 });
  d.facts.forEach((f, i) => {
    const y = 2.68 + i * 0.86;
    s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y, w: 0.6, h: 0.5, fontFace: F.head, fontSize: 18, bold: true,
      color: C.limeBright, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(toRuns(f.runs, { boldColor: C.white }), { x: M + 0.9, y, w: 4.9, h: 0.5, fontFace: F.body, fontSize: 15,
      color: "C3CEE8", valign: "middle", isTextBox: true, margin: 0 });
  });
  /* sağ: temel bağıntılar */
  const rx = 7.05, rw = W - M - rx;
  s.addText("TEMEL BAĞINTILAR", { x: rx, y: 2.25, w: 5, h: 0.3, fontFace: F.body, fontSize: 10.5, bold: true,
    color: "8D97B5", charSpacing: 2, isTextBox: true, margin: 0 });
  d.formulas.forEach((f, i) => {
    const y = 2.62 + i * 0.9;
    s.addShape("roundRect", { x: rx, y, w: rw, h: 0.76, rectRadius: 0.1, fill: { color: C.inkSoft },
      line: { color: "2C3860", width: 0.75 } });
    const cw = Math.min(rw - 2.4, Math.max(1.6, f.code.length * 0.115 + 0.3));
    s.addText(f.code, { x: rx + 0.22, y, w: cw, h: 0.76, fontFace: F.mono, fontSize: 13.5, bold: true, color: C.limeBright,
      valign: "middle", isTextBox: true, margin: 0 });
    s.addText(f.note, { x: rx + 0.3 + cw, y, w: rw - cw - 0.5, h: 0.76, fontFace: F.body, fontSize: 12, color: "AEBBD6",
      valign: "middle", align: "right", isTextBox: true, margin: 0 });
  });
  /* bağlantı ve sıradaki konu */
  s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1, fill: { color: C.inkSoft },
    line: { color: "2C3860", width: 0.75 } });
  s.addText([{ text: "Etkileşimli deneyler, canlı grafikler ve hızlı test:  ", options: { color: "AEBBD6" } },
    { text: SITE + "/" + d.slug + ".html", options: { color: C.limeBright, bold: true } }],
    { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13, isTextBox: true, margin: 0 });
  if (d.next) {
    s.addText([{ text: "SIRADAKİ KONU  ", options: { color: "8D97B5", bold: true, charSpacing: 2, fontSize: 10 } },
      { text: d.next, options: { color: C.white, bold: true } }],
      { x: 6.4, y: 1.18, w: W - M - 6.4, h: 0.5, align: "right", valign: "middle", fontFace: F.body, fontSize: 13,
        isTextBox: true, margin: 0 });
  }
  s.addNotes("Özet: " + d.facts.map(f => f.text).join(" · ") + "\n" + d.formulas.map(f => f.code + " — " + f.note).join("\n"));
}

/* ------------------------------------------------------------ deste kur */
function buildDeck(d) {
  const p = new pptxgen();
  T.deck(p, d.title + " — Dersler", "Fizik · " + d.unit);
  const ctx = { page: 1, foot: SITE + "/" + d.slug + ".html" };
  const rec = PREVIEW ? recordSlides(p) : null;

  /* kapak */
  let formul = d.formulas.map(f => f.code);
  while (formul.join("   ·   ").length > 66 && formul.length > 1) formul = formul.slice(0, -1);
  B.kapak(p, {
    ust: (d.unit + " · Konu " + d.topicNo).toLocaleUpperCase("tr-TR"),
    baslik: d.title,
    lede: d.lead,
    ledeSize: d.lead.length > 250 ? 13.5 : (d.lead.length > 200 ? 14.5 : 15.5),
    formul: formul.join("   ·   "),
    link: ctx.foot,
    not: d.leadIn || d.lead
  });

  openingSlide(p, ctx, d);
  outlineSlide(p, ctx, d);

  d.chapters.forEach((ch, i) => {
    const no = i + 1;
    const examples = ch.blocks.filter(b => b.type === "example");
    if (examples.length) {
      const intro = (ch.blocks.find(b => b.type === "p") || {}).text || "";
      examples.forEach((ex, k) => exampleSlide(p, ctx, no, ex, k, examples.length, intro));
    } else if (/hata/i.test(ch.title) && ch.blocks.some(b => b.type === "ul")) {
      mistakesSlide(p, ctx, no, ch);
    } else {
      chapterSlides(p, ctx, no, ch);
    }
  });

  summarySlide(p, ctx, d);
  return { p, rec };
}

/* --------------------------------------------------- önizleme kaydı (QA) */
function recordSlides(p) {
  const slides = [];
  const orig = p.addSlide.bind(p);
  p.addSlide = function () {
    const s = orig();
    const r = { slide: s, items: [] };
    /* pptxgenjs seçenek nesnelerini yerinde EMU'ya çevirir; kayıt çağrıdan önce kopyalanır */
    const clone = v => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
    ["addText", "addShape", "addImage", "addTable"].forEach(m => {
      const f = s[m].bind(s);
      s[m] = function (a, b) { r.items.push({ m, a: clone(a), b: clone(b) }); return f(a, b); };
    });
    slides.push(r);
    return s;
  };
  return slides;
}

/* ------------------------------------------------------ modalı oku (DOM) */
function extractInPage() {
  const q = s => document.querySelector(s);
  const txt = el => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");
  function runs(el) {
    const out = [];
    (function walk(node, st) {
      node.childNodes.forEach(n => {
        if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, " "); if (t) out.push(Object.assign({ t }, st)); }
        else if (n.nodeType === 1) {
          const tag = n.tagName.toLowerCase(), s2 = Object.assign({}, st);
          if (tag === "br") { out.push({ t: "\n" }); return; }
          if (tag === "b" || tag === "strong") s2.b = true;
          if (tag === "em" || tag === "i") s2.i = true;
          if (tag === "sub") s2.sub = true;
          if (tag === "sup") s2.sup = true;
          if (tag === "code") s2.mono = true;
          if (tag === "p" && out.length && out[out.length - 1].t !== "\n") out.push({ t: "\n" });
          walk(n, s2);
        }
      });
    })(el, {});
    /* uçlardaki boşlukları ve tekrar eden boşlukları temizle */
    const merged = [];
    out.forEach(r => {
      const last = merged[merged.length - 1];
      if (last && last.b === r.b && last.i === r.i && last.sub === r.sub && last.sup === r.sup && last.mono === r.mono) last.t += r.t;
      else merged.push(Object.assign({}, r));
    });
    if (merged.length) { merged[0].t = merged[0].t.replace(/^\s+/, ""); merged[merged.length - 1].t = merged[merged.length - 1].t.replace(/\s+$/, ""); }
    return merged.filter(r => r.t.length);
  }
  const body = q("#konu-body");
  const chapters = []; let cur = null; const intro = []; let figIndex = 0;
  [...body.children].forEach(el => {
    const tag = el.tagName.toLowerCase(), cls = el.getAttribute("class") || "";
    if (tag === "h3") { cur = { id: el.id, title: txt(el), blocks: [] }; chapters.push(cur); return; }
    if (tag === "svg") return;
    const target = cur ? cur.blocks : intro;
    if (tag === "p" && /lead-in/.test(cls)) target.push({ type: "leadin", runs: runs(el), text: txt(el) });
    else if (tag === "p") target.push({ type: "p", runs: runs(el), text: txt(el) });
    else if (tag === "h4") target.push({ type: "h4", text: txt(el) });
    else if (tag === "ul" || tag === "ol") target.push({ type: tag, items: [...el.children].map(li => ({ runs: runs(li), text: txt(li) })) });
    else if (tag === "div" && /formula/.test(cls)) target.push({ type: "formula", codes: [...el.querySelectorAll("code")].map(txt) });
    else if (tag === "div" && /callout/.test(cls)) target.push({ type: "callout", warn: /warn/.test(cls), runs: runs(el), text: txt(el) });
    else if (tag === "table") target.push({ type: "table", rows: [...el.rows].map(r => [...r.cells].map(c => ({ text: txt(c), head: c.tagName === "TH" }))) });
    else if (tag === "details") {
      const ex = { type: "example", title: txt(el.querySelector("summary")), intro: [], steps: [], outro: [] };
      let seenList = false;
      [...el.children].forEach(k => {
        const kt = k.tagName.toLowerCase();
        if (kt === "summary") return;
        if (kt === "ol" || kt === "ul") { seenList = true; ex.steps.push(...[...k.children].map(li => ({ runs: runs(li), text: txt(li) }))); }
        else if (kt === "div" && /formula/.test(k.getAttribute("class") || "")) { (seenList ? ex.outro : ex.intro).push({ runs: [{ t: [...k.querySelectorAll("code")].map(txt).join("   "), mono: true }], text: [...k.querySelectorAll("code")].map(txt).join("   ") }); }
        else (seenList ? ex.outro : ex.intro).push({ runs: runs(k), text: txt(k) });
      });
      target.push(ex);
    }
    else if (tag === "figure") {
      const svg = el.querySelector("svg"), cap = el.querySelector("figcaption");
      target.push({ type: "fig", index: figIndex++, caption: cap ? runs(cap) : [], captionText: txt(cap), aria: svg ? svg.getAttribute("aria-label") : "" });
    }
    else target.push({ type: "p", runs: runs(el), text: txt(el) });
  });
  const eyebrow = q(".hero .eyebrow");
  const leadIn = intro.find(b => b.type === "leadin");
  return {
    title: txt(q("#konu-title")),
    unit: txt(eyebrow.querySelector("a")),
    unitId: (eyebrow.querySelector("a").getAttribute("href").split("#")[1] || ""),
    topicNo: (txt(eyebrow).match(/Konu\s+(\d+)/) || [, "01"])[1],
    lead: txt(q(".hero .lead")),
    facts: [...document.querySelectorAll(".facts li")].map(li => ({ runs: runs(li), text: txt(li) })),
    formulas: [...document.querySelectorAll(".formula-list li")].map(li => ({ code: txt(li.querySelector("code")), note: txt(li.querySelector("span")) })),
    chips: [...document.querySelectorAll(".chips button")].map(txt),
    leadIn: leadIn ? leadIn.text : "",
    leadInRuns: leadIn ? leadIn.runs : [],
    next: txt(q(".topic-nav .next b")),
    chapters
  };
}

async function readTopic(page, slug) {
  await page.goto("file://" + path.join(DIST, slug + ".html"), { waitUntil: "networkidle0", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  const d = await page.evaluate(extractInPage);
  d.slug = slug;

  /* çizimleri PNG'ye çevir (açık tema, saydam zemin, 2×) */
  await page.addStyleTag({ content: `
    * { animation: none !important; transition: none !important; }
    dialog { position: static !important; display: block !important; width: 1000px !important; max-height: none !important;
             border: 0 !important; box-shadow: none !important; }
    .modal-body { overflow: visible !important; }
    body::before { display: none !important; }` });
  await page.evaluate(() => { document.getElementById("konu").setAttribute("open", ""); });
  const svgs = await page.$$("#konu-body figure.fig > svg");
  const figs = [];
  d.chapters.forEach(ch => ch.blocks.forEach(b => { if (b.type === "fig") figs.push(b); }));
  for (let i = 0; i < svgs.length && i < figs.length; i++) {
    const box = await svgs[i].boundingBox();
    const png = path.join(FIGDIR, slug + "-" + String(i + 1).padStart(2, "0") + ".png");
    await svgs[i].screenshot({ path: png, omitBackground: true });
    figs[i].png = png;
    figs[i].ratio = box.width / box.height;
  }
  return d;
}

/* ---------------------------------------------------------------- akış */
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(FIGDIR, { recursive: true });
  if (PREVIEW) fs.mkdirSync(PREVIEW, { recursive: true });

  let slugs = fs.readdirSync(DIST).filter(f => /\.html$/.test(f) && !/^(index|404)\.html$/.test(f)).map(f => f.replace(/\.html$/, "")).sort();
  if (ONLY) slugs = slugs.filter(s => s === ONLY);
  if (!slugs.length) throw new Error("konu bulunamadı");

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  for (const slug of slugs) {
    const d = await readTopic(page, slug);
    const { p, rec } = buildDeck(d);
    const out = path.join(OUT, slug + ".pptx");
    await p.writeFile({ fileName: out });
    const n = p.slides ? p.slides.length : (rec ? rec.length : "?");
    console.log("✓", slug.padEnd(22), String(n).padStart(2), "slayt", "·", d.chapters.length, "bölüm");
    if (PREVIEW && rec) fs.writeFileSync(path.join(PREVIEW, slug + ".json"), JSON.stringify({ slug, title: d.title, slides: rec.map(r => ({ bg: r.slide.background && r.slide.background.color, items: r.items })) }));
  }
  await browser.close();
  console.log(slugs.length, "sunum →", OUT);
})().catch(e => { console.error(e); process.exit(1); });
