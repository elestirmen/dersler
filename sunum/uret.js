#!/usr/bin/env node
/* Konu anlatımından sunum üretir.
 *
 * Her konu sayfasının "Konu anlatımı" modalı tek kaynaktır. Anlatım dört basamakta ilerler
 * (Temel → Orta → İleri → Pekiştir); deste de aynı yolu izler:
 *
 *   kapak (giriş görseli) · başlarken · yol haritası
 *   her basamak: koyu ayraç slaytı (görsel ya da formüller) → bölümler
 *   her bölüm: başlık cümlesi "Kısaca", gövdede liste/formül/tablo/uyarı, sağda çizim;
 *              paragraflar konuşmacı notuna gider
 *   her "Düşün": soru slaytı + cevap slaytı
 *   çözümlü örnekler: örnek başına bir slayt, zorluk rozetiyle · sık yapılan hatalar · özetle
 *
 *   NODE_PATH=$(npm root -g) node sunum/uret.js                 # 18 konu → dist/sunum
 *   NODE_PATH=$(npm root -g) node sunum/uret.js --konu kirilma  # tek konu
 *   NODE_PATH=$(npm root -g) node sunum/uret.js --cikti /tmp/x --onizleme /tmp/x/onizleme
 *   NODE_PATH=$(npm root -g) node sunum/uret.js --kok /tmp/kopya  # sayfaları dist yerine bir kopyadan oku
 *
 * Gerekenler: pptxgenjs, puppeteer (küresel; çizimleri PNG'ye çevirir ve modalı okur),
 * ImageMagick (`magick`; görselleri slayt çerçevesine kırpar).
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
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
const KOK = path.resolve(arg("--kok", DIST));
const OUT = path.resolve(arg("--cikti", path.join(DIST, "sunum")));
const PREVIEW = arg("--onizleme", null) ? path.resolve(arg("--onizleme")) : null;
const ONLY = arg("--konu", null);
const FIGDIR = path.resolve(arg("--sekiller", path.join(os.tmpdir(), "dersler-sekiller")));
const SITE = "dersler.perinet.org";

/* basamak renkleri: açık zeminde ton, koyu zeminde parlak ton */
const BASAMAK = {
  0: { ton: C.blue, parlak: C.blueBright },
  1: { ton: C.lime, parlak: C.limeBright },
  2: { ton: C.blue, parlak: C.blueBright },
  3: { ton: C.violet, parlak: C.violetBright },
  4: { ton: C.amber, parlak: C.amberBright }
};
const ZORLUK = {
  kolay: { ad: "KOLAY", ton: C.lime, zemin: "EAF7DC" },
  orta: { ad: "ORTA", ton: C.blue, zemin: "E6EDFB" },
  zor: { ad: "ZOR", ton: C.rose, zemin: "FBE9EE" }
};

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
/* verilen kutuya sığan en büyük punto */
function fit(text, w, h, max, min, bold, mult) {
  let size = max;
  while (size > min && textH(text, w, size, bold, mult) > h) size -= 0.5;
  return size;
}

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
/* paragraf listesini tek metin kutusuna: her paragraf yeni satır */
function joinParas(paras, o) {
  const out = [];
  paras.forEach((b, k) => {
    const rs = toRuns(b.runs, o);
    if (!rs.length) return;
    if (k < paras.length - 1) rs[rs.length - 1].options.breakLine = true;
    out.push(...rs);
  });
  return out;
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
    s.addText(b.text, { x, y: y + 0.04, w, h: 0.3, fontFace: F.body, fontSize: size + 0.5, bold: true, color: tone || C.blue,
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

/* görseli slayt çerçevesinin oranına kırpar (ImageMagick); JPEG yolunu döndürür */
function kirp(src, ad, pw, ph, ekstra) {
  const out = path.join(FIGDIR, ad + ".jpg");
  if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs) {
    execFileSync("magick", [src, "-resize", pw + "x" + ph + "^", "-gravity", "center", "-extent", pw + "x" + ph]
      .concat(ekstra || []).concat(["-strip", "-quality", "90", out]));
  }
  return out;
}
function gorsel(d, ad) { return d.gorsel && d.gorsel[ad] ? d.gorsel[ad] : null; }

/* görsel kartı: resim üstte, kısa alt yazı altta */
function fotoKart(s, foto, x, y, w, onDark) {
  const ih = w / 1.5;
  const img = kirp(foto.file, foto.slug + "-" + foto.ad + "-kart", 1200, 800);
  s.addShape("roundRect", { x: x - 0.06, y: y - 0.06, w: w + 0.12, h: ih + 0.12, rectRadius: 0.14,
    fill: { color: onDark ? C.inkSoft : C.white }, line: { color: onDark ? "2C3860" : C.line, width: 0.75 },
    shadow: onDark ? undefined : T.shadow({}) });
  s.addImage({ path: img, x, y, w, h: ih });
  return ih;
}

/* -------------------------------------------------------------- slaytlar */
const TOP = 1.62, BOTTOM = 6.72;
const bolumNo = ch => String(ch.no).padStart(2, "0");

/* başlık altındaki "Kısaca" bandı: yüksekliği döndürür */
function manset(s, text, tone, y) {
  const w = CW;
  const size = fit(text, w - 0.55, 1.05, 19, 15.5, false, 1.12);
  const h = Math.max(0.62, textH(text, w - 0.55, size, false, 1.12) + 0.26);
  s.addShape("roundRect", { x: M, y, w, h, rectRadius: 0.12, fill: { color: C.softer }, line: { color: C.line, width: 0.75 } });
  s.addShape("rect", { x: M + 0.02, y: y + 0.12, w: 0.06, h: h - 0.24, fill: { color: tone }, line: { type: "none" } });
  s.addText(text, { x: M + 0.32, y: y + 0.05, w: w - 0.5, h: h - 0.1, fontFace: F.body, fontSize: size, color: C.ink,
    lineSpacingMultiple: 1.12, valign: "middle", isTextBox: true, margin: 0 });
  return h;
}

/* bölümün slayt gövdesi: liste, formül, tablo, uyarı (başlıklarıyla). Paragraflar nota gider. */
function slaytGovdesi(ch) {
  const kinds = ["h4", "ul", "ol", "formula", "callout", "table"];
  let body = ch.blocks.filter(b => kinds.includes(b.type) && !(b.type === "callout" && /^Kendini sına/.test(b.text)));
  body = body.filter((b, i) => b.type !== "h4" || (body[i + 1] && body[i + 1].type !== "h4"));
  if (!body.length) body = ch.blocks.filter(b => b.type === "p");
  return body;
}

function chapterSlides(p, ctx, ch, bas) {
  const tone = BASAMAK[bas.no].ton;
  const kisaca = ch.blocks.find(b => b.type === "kisaca");
  const figs = ch.blocks.filter(b => b.type === "fig");
  const fotos = ch.blocks.filter(b => b.type === "foto" && !b.ayractaGosterildi);
  let content = slaytGovdesi(ch);
  const hasFig = figs.length > 0 || fotos.length > 0;

  /* ilk sayfa: manşet yüksekliği kadar aşağıdan başlar */
  const probe = { addShape() {}, addText() {} };
  const mh = kisaca ? manset(probe, kisaca.text, tone, 1.3) : 0;
  const top1 = kisaca ? 1.3 + mh + 0.24 : TOP;
  const avail1 = BOTTOM - top1, availN = BOTTOM - TOP;

  /* gövde slaytın yarısını doldurmuyorsa anlatımın paragrafları (sırasıyla, cümle cümle) eklenir */
  const olcuW = hasFig ? 6.9 : CW;
  const govdeH = content.reduce((h, b) => h + blockH(b, olcuW, 15), 0);
  if (!content.some(b => b.type === "p") && govdeH < avail1 * 0.45) {
    let butce = avail1 * 0.78 - govdeH;
    const secili = new Set(content);
    const yeni = [];
    ch.blocks.forEach(b => {
      if (secili.has(b)) { yeni.push(b); return; }
      if (b.type !== "p" || butce <= 0.3) return;
      /* paragraf ya bütünüyle girer ya hiç (yarım bırakılan bir akıl yürütme yanıltır); sığmayan atlanır */
      const items = paraItems(b) || [{ runs: b.runs, text: b.text }];
      const h = items.reduce((a, it) => a + textH(it.text, olcuW - 0.3, 15) + 0.07, 0) + 0.12;
      if (h > butce) return;
      butce -= h; yeni.push({ type: "ul", items });
    });
    content = yeni;
  }

  const candidates = hasFig
    ? [{ size: 16, colW: 6.0 }, { size: 15, colW: 6.4 }, { size: 14, colW: 6.9 }, { size: 13, colW: 7.3 },
       { size: 12.5, colW: 7.6 }, { size: 12, colW: 7.9 }]
    : [{ size: 17, colW: CW }, { size: 16, colW: CW }, { size: 15, colW: CW }, { size: 14, colW: CW },
       { size: 13, colW: CW }, { size: 12.5, colW: CW }];
  let pick = null;
  for (const c of candidates) {
    const total = content.reduce((h, b) => h + blockH(b, c.colW, c.size), 0);
    if (total <= avail1 * (c.size >= 15 ? 0.92 : 1)) { pick = c; break; }
  }

  let pages;
  if (pick) {
    pages = [{ blocks: content, colW: pick.colW, size: pick.size, fig: hasFig }];
  } else {
    const size = 13, colFig = hasFig ? 7.3 : CW, colFull = CW;
    let best = null;
    for (let k = 1; k < content.length; k++) {
      const h1 = content.slice(0, k).reduce((h, b) => h + blockH(b, colFig, size), 0);
      const h2 = content.slice(k).reduce((h, b) => h + blockH(b, colFull, size), 0);
      if (h1 <= avail1 && h2 <= availN) {
        const score = Math.abs(h1 / avail1 - h2 / availN);
        if (!best || score < best.score) best = { k, score };
      }
    }
    if (best) {
      pages = [{ blocks: content.slice(0, best.k), colW: colFig, size, fig: hasFig },
               { blocks: content.slice(best.k), colW: colFull, size, fig: false }];
    } else {
      pages = [{ blocks: [], colW: colFig, size, fig: hasFig }]; let y = 0;
      content.forEach(b => {
        const cur = pages[pages.length - 1];
        const h = blockH(b, cur.colW, size);
        const lim = pages.length === 1 ? avail1 : availN;
        if (y + h > lim && cur.blocks.length) { pages.push({ blocks: [], colW: colFull, size, fig: false }); y = 0; }
        pages[pages.length - 1].blocks.push(b); y += h;
      });
    }
  }

  pages.forEach((pg, pi) => {
    const { blocks, colW, size } = pg;
    const s = T.light(p);
    T.head(s, ch.no, ch.title + (pi ? " · devam" : ""), tone);
    basamakEtiketi(s, bas);
    const top = pi === 0 ? top1 : TOP;
    if (pi === 0 && kisaca) manset(s, kisaca.text, tone, 1.3);
    let yy = top;
    blocks.forEach(b => { yy += drawBlock(s, b, M, yy, colW, tone, size); });
    if (pg.fig) {
      const figX = M + colW + 0.32, figW = W - M - figX;
      let fy = top;
      if (figs.length) {
        figs.forEach((f, i) => {
          if (i > 0 && fy > BOTTOM - 2.2) return; /* sığmayan ikinci çizim atlanır */
          fy += drawFigure(s, f, figX, fy, figW, BOTTOM - fy) + 0.18;
        });
      } else {
        const ih = fotoKart(s, fotos[0], figX + 0.06, fy + 0.06, figW - 0.12);
        const cap = fotos[0].captionText;
        const capSize = fit(cap, figW, BOTTOM - (fy + ih + 0.3), 11, 9, false, 1.12);
        s.addText(toRuns(fotos[0].caption, { boldColor: C.muted }), { x: figX, y: fy + ih + 0.28, w: figW, h: BOTTOM - (fy + ih + 0.28),
          fontFace: F.body, fontSize: capSize, color: C.dim, lineSpacingMultiple: 1.12, valign: "top", isTextBox: true, margin: 0 });
      }
    }
    ctx.page++;
    T.footer(s, ctx.foot, ctx.page);
    if (pi === 0) s.addNotes(bolumNotu(ch));
    else s.addNotes(ch.title + " (devam)");
  });
}

/* konuşmacı notu: bölümün bütün anlatımı, sırasıyla */
function bolumNotu(ch) {
  const kisaca = ch.blocks.find(b => b.type === "kisaca");
  const parts = [ch.title];
  if (kisaca) parts.push("Kısaca: " + kisaca.text);
  ch.blocks.forEach(b => {
    if (b.type === "p" || b.type === "h4" || b.type === "callout") parts.push(b.text);
    else if (b.type === "ul" || b.type === "ol") parts.push(b.items.map(it => "• " + it.text).join("\n"));
    else if (b.type === "formula") parts.push(b.codes.join("   "));
    else if (b.type === "table") parts.push(b.rows.map(r => r.map(c => c.text).join(" | ")).join("\n"));
    else if (b.type === "fig" || b.type === "foto") parts.push("Görsel: " + b.captionText);
    else if (b.type === "dusun") parts.push("Düşün: " + b.soru + "\nCevap: " + b.cevap.map(c => c.text).join(" "));
  });
  return parts.filter(Boolean).join("\n\n");
}

/* sağ üstte küçük basamak etiketi */
function basamakEtiketi(s, bas) {
  if (!bas.no) return;
  const tone = BASAMAK[bas.no].ton;
  s.addText([{ text: bas.no + " / 4  ", options: { color: C.dim } }, { text: bas.ad.toLocaleUpperCase("tr-TR"), options: { color: tone } }],
    { x: W - M - 2.6, y: 0.12, w: 2.6, h: 0.28, align: "right", fontFace: F.body, fontSize: 9.5, bold: true, charSpacing: 2,
      isTextBox: true, margin: 0, valign: "middle" });
}

/* düşün: soru slaytı + cevap slaytı */
function dusunSlides(p, ctx, ch, bas, q) {
  const tone = C.violet;
  /* soru */
  let s = T.light(p);
  s.background = { color: "F7F6FE" };
  basamakEtiketi(s, bas);
  s.addShape("ellipse", { x: M + 0.2, y: 2.2, w: 1.7, h: 1.7, fill: { color: tone }, line: { type: "none" },
    shadow: T.shadow({ blur: 14, offset: 4, color: tone, opacity: 0.3 }) });
  s.addText("?", { x: M + 0.2, y: 2.2, w: 1.7, h: 1.7, align: "center", valign: "middle", fontFace: F.head, fontSize: 80,
    bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText("DÜŞÜN", { x: M + 2.5, y: 1.55, w: 6, h: 0.35, fontFace: F.body, fontSize: 13, bold: true, color: tone,
    charSpacing: 4, isTextBox: true, margin: 0 });
  const qw = CW - 2.6, qh = 3.4;
  const qs = fit(q.soru, qw, qh, 32, 20, false, 1.2);
  s.addText(q.soru, { x: M + 2.5, y: 2.0, w: qw, h: qh, fontFace: F.head, fontSize: qs, color: C.ink,
    lineSpacingMultiple: 1.2, valign: "middle", isTextBox: true, margin: 0 });
  s.addText([{ text: bolumNo(ch) + " · " + ch.title, options: { color: C.dim } },
    { text: "     Cevap bir sonraki slaytta", options: { color: tone, bold: true } }],
    { x: M + 2.5, y: 5.75, w: qw, h: 0.34, fontFace: F.body, fontSize: 12, isTextBox: true, margin: 0, valign: "middle" });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Düşün: " + q.soru + "\n\nSınıfa sorun, birkaç tahmin alın; sonra cevap slaytına geçin.\n\nCevap: " + q.cevap.map(b => b.text).join("\n"));

  /* cevap */
  s = T.light(p);
  basamakEtiketi(s, bas);
  s.addShape("roundRect", { x: M, y: 0.5, w: 0.54, h: 0.54, rectRadius: 0.14, fill: { color: tone }, line: { type: "none" } });
  s.addText("!", { x: M, y: 0.5, w: 0.54, h: 0.54, align: "center", valign: "middle", fontFace: F.head, fontSize: 22, bold: true,
    color: C.white, isTextBox: true, margin: 0 });
  s.addText("Cevap", { x: M + 0.78, y: 0.42, w: 6, h: 0.7, fontFace: F.head, fontSize: 32, bold: true, color: C.ink,
    isTextBox: true, margin: 0, valign: "middle" });
  const sq = fit(q.soru, CW - 0.8, 0.8, 16, 12.5, false);
  s.addText(q.soru, { x: M + 0.78, y: 1.2, w: CW - 0.8, h: 0.8, fontFace: F.body, fontSize: sq, italic: true, color: C.dim,
    valign: "top", isTextBox: true, margin: 0 });
  const ay = 2.2, ah = BOTTOM - ay;
  const aText = q.cevap.map(b => b.text).join("\n");
  const as = fit(aText, CW - 1.1, ah - 0.6, 22, 13, false, 1.25);
  s.addShape("roundRect", { x: M, y: ay, w: CW, h: ah, rectRadius: 0.2, fill: { color: C.white },
    line: { color: "CFC8F5", width: 0.75 }, shadow: T.shadow({}) });
  s.addShape("rect", { x: M + 0.03, y: ay + 0.4, w: 0.07, h: ah - 0.8, fill: { color: tone }, line: { type: "none" } });
  s.addText(joinParas(q.cevap, { boldColor: tone }), { x: M + 0.55, y: ay + 0.3, w: CW - 1.1, h: ah - 0.6, fontFace: F.body,
    fontSize: as, color: C.ink, lineSpacingMultiple: 1.25, valign: "middle", isTextBox: true, margin: 0 });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Cevap: " + aText);
}

function exampleSlide(p, ctx, ch, bas, ex, i, total, intro) {
  const tone = BASAMAK[bas.no].ton;
  const s = T.light(p);
  T.head(s, ch.no, "Çözümlü örnek " + (i + 1) + " / " + total, tone);
  const z = ZORLUK[ex.zorluk];
  if (z) {
    s.addShape("roundRect", { x: W - M - 1.25, y: 0.56, w: 1.25, h: 0.42, rectRadius: 0.21, fill: { color: z.zemin },
      line: { color: z.ton, width: 0.75 } });
    s.addText(z.ad, { x: W - M - 1.25, y: 0.56, w: 1.25, h: 0.42, align: "center", valign: "middle", fontFace: F.body,
      fontSize: 11.5, bold: true, color: z.ton, charSpacing: 2, isTextBox: true, margin: 0 });
  }
  const sub = ex.title.replace(/^Örnek\s*\d+\s*[—–-]\s*/u, "");
  /* bölümün giriş cümlesi tek satıra sığıyorsa başlığın altına, sığmıyorsa yalnızca nota */
  const ledeTam = sub + (intro ? "  ·  " + intro : "");
  T.lede(s, lines(ledeTam, W - M * 2 - 0.9, 14.5) <= 1 ? ledeTam : sub);

  const top = 1.78, h = BOTTOM - top;
  /* soru kartı */
  const qw = 4.7;
  T.card(s, { x: M, y: top, w: qw, h, fill: C.softer });
  s.addText("SORU", { x: M + 0.32, y: top + 0.24, w: 3, h: 0.28, fontFace: F.body, fontSize: 10.5, bold: true,
    color: tone, charSpacing: 2, isTextBox: true, margin: 0 });
  const qText = ex.intro.map(b => b.text).join("\n");
  let qSize = 16;
  while (qSize > 11 && textH(qText, qw - 0.64, qSize) > h - 1.6) qSize -= 0.5;
  const qh = textH(qText, qw - 0.64, qSize) + 0.1;
  s.addText(joinParas(ex.intro), { x: M + 0.32, y: top + 0.6, w: qw - 0.64, h: qh, fontFace: F.body, fontSize: qSize, color: C.ink,
    lineSpacingMultiple: 1.18, valign: "top", isTextBox: true, margin: 0 });
  if (ex.outro.length) {
    const oText = ex.outro.map(b => b.text).join("\n");
    const oy = top + 0.7 + qh + 0.15;
    const yer = h - (oy - top) - 0.3 - 0.3;                       /* NOT etiketi + alt pay */
    const os = fit(oText, qw - 0.64, yer, 11.5, 9, false, 1.12);
    const oh = textH(oText, qw - 0.64, os, false, 1.12) + 0.06;
    if (yer > 0.4 && oh <= yer) {                                   /* sığmıyorsa yalnızca notta kalır */
      s.addText("NOT", { x: M + 0.32, y: oy, w: 3, h: 0.24, fontFace: F.body, fontSize: 9.5, bold: true, color: C.dim,
        charSpacing: 2, isTextBox: true, margin: 0 });
      s.addText(joinParas(ex.outro, { boldColor: C.ink }), { x: M + 0.32, y: oy + 0.28, w: qw - 0.64, h: oh, fontFace: F.body,
        fontSize: os, color: C.muted, lineSpacingMultiple: 1.12, valign: "top", isTextBox: true, margin: 0 });
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
  s.addNotes([ex.title + (z ? " (" + z.ad.toLocaleLowerCase("tr-TR") + ")" : ""), intro ? "\n" + intro : "", qText, "",
    ex.steps.map((st, k) => (k + 1) + ". " + st.text).join("\n")]
    .concat(ex.outro.length ? ["", ex.outro.map(b => b.text).join("\n")] : []).join("\n"));
}

function mistakesSlides(p, ctx, ch, bas) {
  const list = ch.blocks.find(b => b.type === "ul");
  const all = list ? list.items : [];
  const per = all.length > 6 ? Math.ceil(all.length / 2) : all.length;
  const groups = [];
  for (let i = 0; i < all.length; i += per) groups.push(all.slice(i, i + per));
  const intro = ch.blocks.find(b => b.type === "p" && !/^Kendini sına/.test(b.text));
  groups.forEach((items, gi) => {
    const s = T.light(p);
    T.head(s, ch.no, ch.title + (groups.length > 1 ? " · " + (gi + 1) + " / " + groups.length : ""), C.rose);
    basamakEtiketi(s, bas);
    T.lede(s, intro ? intro.text : "Sınavda puan kaybettiren klasikler ve doğrusu.");
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
    let claimSize = 16, explSize = 15;
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
  });
}

/* kapak: giriş görseli tam zemin, solda koyu geçiş ve başlık */
function kapakSlide(p, ctx, d) {
  const g = gorsel(d, "giris");
  if (!g) {
    let formul = d.formulas.map(f => f.code);
    while (formul.join("   ·   ").length > 66 && formul.length > 1) formul = formul.slice(0, -1);
    B.kapak(p, { ust: (d.unit + " · Konu " + d.topicNo).toLocaleUpperCase("tr-TR"), baslik: d.title, lede: d.lead,
      ledeSize: d.lead.length > 250 ? 13.5 : (d.lead.length > 200 ? 14.5 : 15.5), formul: formul.join("   ·   "),
      link: ctx.foot, not: d.leadIn || d.lead });
    return;
  }
  const s = T.dark(p);
  /* sağda görsel paneli (ortadan kırpılır, özne görünür kalır); sol kenarı koyu zemine yumuşakça karışır */
  const pw = 7.9, px = W - pw;
  const img = kirp(g.file, d.slug + "-kapak", 1580, 1500,
    ["(", "-size", "1580x1500", "xc:none", "-sparse-color", "Barycentric", "0,0 rgba(14,20,38,1) 520,0 rgba(14,20,38,0)", ")",
     "-composite"]);
  s.addImage({ path: img, x: px, y: 0, w: pw, h: H });
  s.addShape("roundRect", { x: 0.95, y: 0.9, w: 0.34, h: 0.34, rectRadius: 0.1, fill: { color: "A9E648" }, line: { type: "none" } });
  s.addText([{ text: "Dersler", options: { color: C.white, bold: true } }, { text: "  ·  fizik", options: { color: C.paleDim } }],
    { x: 1.4, y: 0.9, w: 4, h: 0.34, fontFace: F.body, fontSize: 12.5, valign: "middle", isTextBox: true, margin: 0 });
  s.addShape("rect", { x: 0.7, y: 2.15, w: 0.06, h: 1.2, fill: { color: C.limeBright }, line: { type: "none" } });
  s.addText((d.unit + " · Konu " + d.topicNo).toLocaleUpperCase("tr-TR"), { x: 0.95, y: 1.7, w: 6.4, h: 0.35,
    fontFace: F.body, fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
  const ts = fit(d.title, 5.6, 1.3, 46, 28, true, 1.0);
  s.addText(d.title, { x: 0.9, y: 2.1, w: 5.6, h: 1.3, fontFace: F.head, fontSize: ts, bold: true, color: C.white,
    isTextBox: true, margin: 0, charSpacing: -1, valign: "middle" });
  const ls = fit(d.lead, 5.2, 1.5, 15, 11.5, false, 1.25);
  s.addText(d.lead, { x: 0.95, y: 3.6, w: 5.2, h: 1.5, fontFace: F.body, fontSize: ls, color: C.paleText,
    lineSpacingMultiple: 1.25, isTextBox: true, margin: 0, valign: "top" });
  /* dört basamak şeridi */
  const bas = d.basamaklar.filter(b => b.no);
  if (bas.length) {
    const bw = 1.22, by = 5.35;
    bas.forEach((b, i) => {
      const x = 0.95 + i * (bw + 0.1);
      s.addShape("roundRect", { x, y: by, w: bw, h: 0.62, rectRadius: 0.1, fill: { color: C.inkSoft, transparency: 10 },
        line: { color: "2C3860", width: 0.75 } });
      s.addShape("rect", { x: x + 0.12, y: by + 0.14, w: 0.05, h: 0.34, fill: { color: BASAMAK[b.no].parlak }, line: { type: "none" } });
      s.addText([{ text: b.no + "  ", options: { color: BASAMAK[b.no].parlak, bold: true } }, { text: b.ad, options: { color: C.white, bold: true } }],
        { x: x + 0.28, y: by, w: bw - 0.3, h: 0.62, fontFace: F.body, fontSize: 13, valign: "middle", isTextBox: true, margin: 0 });
    });
  }
  T.footer(s, ctx.foot, null, true);
  s.addNotes((d.leadIn || d.lead) + (g.captionText ? "\n\nKapak görseli: " + g.captionText : ""));
}

/* açılış sorusu: konu anlatımının giriş bloğunun merak sorusu, büyük puntoyla */
function openingSlide(p, ctx, d) {
  if (!d.hookRuns || !d.hookRuns.length) return;
  const s = T.light(p);
  T.head(s, "?", "Başlarken", C.violet);
  T.lede(s, "Konuya günlük bir soruyla giriyoruz.");
  const x = M + 0.6, w = CW - 1.2, y = 2.0, h = 4.3;
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.22, fill: { color: C.white },
    line: { color: "CFC8F5", width: 0.75 }, shadow: T.shadow({}) });
  s.addShape("rect", { x: x + 0.04, y: y + 0.5, w: 0.07, h: h - 1.0, fill: { color: C.violet }, line: { type: "none" } });
  const size = fit(d.hook, w - 1.4, h - 0.9, 24, 15, false, 1.3);
  s.addText(toRuns(d.hookRuns, { boldColor: C.violet }), { x: x + 0.7, y: y + 0.4, w: w - 1.4, h: h - 0.8,
    fontFace: F.head, fontSize: size, color: C.ink, lineSpacingMultiple: 1.3, valign: "middle", isTextBox: true, margin: 0 });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Açılış sorusu — sınıfa sorup birkaç cevap alın, sonra konuya geçin.\n\n" + d.leadIn);
}

/* yol haritası: dört basamak sütunu, her birinde bölüm başlıkları */
function yolHaritasi(p, ctx, d) {
  const bas = d.basamaklar.filter(b => b.no);
  if (!bas.length) return outlineSlide(p, ctx, d);
  const s = T.light(p);
  T.head(s, "≡", "Bu derste", C.blue);
  T.lede(s, "Dört basamak, kolaydan zora: önce sezgi, sonra bağıntılar, sonra derinleşme; en sonda pekiştirme.");
  const gap = 0.22, cw = (CW - gap * (bas.length - 1)) / bas.length, top = 1.8, ch = BOTTOM - top;
  bas.forEach((b, i) => {
    const x = M + i * (cw + gap), tone = BASAMAK[b.no].ton;
    T.card(s, { x, y: top, w: cw, h: ch, fill: C.white });
    s.addShape("rect", { x: x + 0.2, y: top, w: cw - 0.4, h: 0.07, fill: { color: tone }, line: { type: "none" } });
    B.rozet(s, b.no, x + 0.24, top + 0.3, 0.46, tone);
    s.addText(b.ad, { x: x + 0.84, y: top + 0.28, w: cw - 1.0, h: 0.5, fontFace: F.head, fontSize: 19, bold: true, color: C.ink,
      valign: "middle", isTextBox: true, margin: 0 });
    const ds = fit(b.aciklama, cw - 0.48, 0.95, 11.5, 9.5, false, 1.1);
    s.addText(b.aciklama, { x: x + 0.24, y: top + 0.92, w: cw - 0.48, h: 0.95, fontFace: F.body, fontSize: ds, color: C.muted,
      lineSpacingMultiple: 1.1, valign: "top", isTextBox: true, margin: 0 });
    s.addShape("line", { x: x + 0.24, y: top + 1.95, w: cw - 0.48, h: 0, line: { color: C.line, width: 0.75, dashType: "dash" } });
    const listH = ch - 2.15;
    const itemH = Math.min(0.72, listH / Math.max(1, b.chapters.length));
    b.chapters.forEach((c, k) => {
      const y = top + 2.1 + k * itemH;
      s.addText(bolumNo(c), { x: x + 0.24, y, w: 0.42, h: itemH - 0.06, fontFace: F.body, fontSize: 11, bold: true, color: tone,
        valign: "top", isTextBox: true, margin: 0 });
      const ts = fit(c.title, cw - 0.9, itemH - 0.08, 12.5, 10, true, 1.05);
      s.addText(c.title, { x: x + 0.66, y, w: cw - 0.9, h: itemH - 0.06, fontFace: F.body, fontSize: ts, bold: true, color: C.ink,
        lineSpacingMultiple: 1.05, valign: "top", isTextBox: true, margin: 0 });
    });
  });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Bu derste:\n" + bas.map(b => b.no + ". " + b.ad + " — " + b.aciklama + "\n" +
    b.chapters.map(c => "   " + bolumNo(c) + " " + c.title).join("\n")).join("\n"));
}

/* basamak ayracı: koyu zemin, büyük numara; sağda görsel, formüller ya da örnek listesi */
function basamakSlide(p, ctx, d, b) {
  const s = T.dark(p);
  const tone = BASAMAK[b.no].parlak;
  s.addText(String(b.no), { x: M + 0.05, y: 0.4, w: 2.0, h: 2.05, fontFace: F.head, fontSize: 116, bold: true, color: tone,
    isTextBox: true, margin: 0, valign: "middle" });
  s.addText("BASAMAK " + b.no + " / 4", { x: M + 0.1, y: 2.5, w: 5, h: 0.32, fontFace: F.body, fontSize: 12, bold: true,
    color: tone, charSpacing: 3, isTextBox: true, margin: 0 });
  s.addText(b.ad, { x: M + 0.05, y: 2.82, w: 5.6, h: 0.9, fontFace: F.head, fontSize: 46, bold: true, color: C.white,
    isTextBox: true, margin: 0, charSpacing: -1, valign: "middle" });
  const ds = fit(b.aciklama, 5.3, 1.0, 16, 12.5, false, 1.2);
  s.addText(b.aciklama, { x: M + 0.1, y: 3.8, w: 5.3, h: 1.0, fontFace: F.body, fontSize: ds, color: C.paleText,
    lineSpacingMultiple: 1.2, isTextBox: true, margin: 0, valign: "top" });
  /* bölüm listesi */
  const ly = 5.0, lhh = Math.min(0.36, 1.75 / Math.max(1, b.chapters.length));
  b.chapters.forEach((c, k) => {
    s.addText([{ text: bolumNo(c) + "   ", options: { color: tone, bold: true } }, { text: c.title, options: { color: C.white } }],
      { x: M + 0.1, y: ly + k * lhh, w: 5.6, h: lhh, fontFace: F.body, fontSize: lhh < 0.33 ? 11.5 : 13, valign: "middle",
        isTextBox: true, margin: 0 });
  });

  const rx = 6.75, rw = W - M - rx;
  const ad = b.no === 1 ? "gunluk" : (b.no === 3 ? "uygulama" : null);
  const foto = ad ? gorsel(d, ad) : null;
  let not = "Basamak " + b.no + " — " + b.ad + ": " + b.aciklama + "\n" + b.chapters.map(c => bolumNo(c) + " " + c.title).join("\n");
  if (foto) {
    const ih = fotoKart(s, foto, rx, 1.05, rw, true);
    const cs = fit(foto.captionText, rw, 6.55 - (1.05 + ih + 0.25), 11.5, 9, false, 1.15);
    s.addText(toRuns(foto.caption, { boldColor: C.white }), { x: rx, y: 1.05 + ih + 0.25, w: rw, h: 6.55 - (1.05 + ih + 0.25),
      fontFace: F.body, fontSize: cs, color: C.paleText, lineSpacingMultiple: 1.15, valign: "top", isTextBox: true, margin: 0 });
    foto.ayractaGosterildi = true;
    not += "\n\nGörsel: " + foto.captionText;
  } else if (b.no === 2 && d.formulas.length) {
    s.addText("TEMEL BAĞINTILAR", { x: rx, y: 1.2, w: rw, h: 0.3, fontFace: F.body, fontSize: 10.5, bold: true,
      color: C.paleDim, charSpacing: 2, isTextBox: true, margin: 0 });
    d.formulas.slice(0, 5).forEach((f, i) => {
      const y = 1.62 + i * 0.95;
      s.addShape("roundRect", { x: rx, y, w: rw, h: 0.8, rectRadius: 0.1, fill: { color: C.inkSoft }, line: { color: "2C3860", width: 0.75 } });
      const fw = Math.min(rw - 2.3, Math.max(1.8, f.code.length * 0.13 + 0.3));
      s.addText(f.code, { x: rx + 0.25, y, w: fw, h: 0.8, fontFace: F.mono, fontSize: 15, bold: true, color: tone,
        valign: "middle", isTextBox: true, margin: 0 });
      s.addText(f.note, { x: rx + 0.35 + fw, y, w: rw - fw - 0.55, h: 0.8, fontFace: F.body, fontSize: 12, color: "AEBBD6",
        valign: "middle", align: "right", isTextBox: true, margin: 0 });
    });
  } else if (b.no === 4) {
    const ex = [].concat(...b.chapters.map(c => c.blocks.filter(x => x.type === "example")));
    s.addText("KOLAYDAN ZORA " + ex.length + " ÇÖZÜMLÜ ÖRNEK", { x: rx, y: 1.2, w: rw, h: 0.3, fontFace: F.body, fontSize: 10.5,
      bold: true, color: C.paleDim, charSpacing: 2, isTextBox: true, margin: 0 });
    const ih = Math.min(0.66, 4.9 / Math.max(1, ex.length));
    ex.forEach((e, i) => {
      const y = 1.62 + i * ih, z = ZORLUK[e.zorluk];
      s.addShape("roundRect", { x: rx, y, w: rw, h: ih - 0.1, rectRadius: 0.1, fill: { color: C.inkSoft }, line: { color: "2C3860", width: 0.75 } });
      s.addText(e.title.replace(/^Örnek\s*(\d+)\s*[—–-]\s*/u, "$1   "), { x: rx + 0.25, y, w: rw - 1.6, h: ih - 0.1, fontFace: F.body,
        fontSize: 13, color: C.white, valign: "middle", isTextBox: true, margin: 0 });
      if (z) {
        const zt = { kolay: C.limeBright, orta: C.blueBright, zor: C.roseBright }[e.zorluk];
        s.addText(z.ad, { x: rx + rw - 1.3, y, w: 1.1, h: ih - 0.1, align: "right", fontFace: F.body, fontSize: 10.5, bold: true,
          color: zt, charSpacing: 2, valign: "middle", isTextBox: true, margin: 0 });
      }
    });
  }
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page, true);
  s.addNotes(not);
}

/* basamaksız (eski yapıdaki) sayfalar için dokuzlu ızgara */
function outlineSlide(p, ctx, d) {
  const s = T.light(p);
  T.head(s, "≡", "Bu derste", C.blue);
  T.lede(s, "Konu anlatımının başlıkları, sırasıyla.");
  const cw = 3.71, chh = 1.42, gx = 0.4, gy = 0.2, top = 1.72;
  const TONES = [C.blue, C.violet, C.lime, C.amber, C.blue, C.violet, C.lime, C.amber, C.rose];
  d.chapters.slice(0, 9).forEach((ch, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (cw + gx), y = top + row * (chh + gy);
    T.card(s, { x, y, w: cw, h: chh });
    B.rozet(s, i + 1, x + 0.26, y + 0.24, 0.4, TONES[i % TONES.length]);
    s.addText(ch.title, { x: x + 0.8, y: y + 0.2, w: cw - 1.0, h: 0.48, fontFace: F.body, fontSize: 14, bold: true,
      color: C.ink, valign: "middle", isTextBox: true, margin: 0 });
  });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Bu derste:\n" + d.chapters.map((c, i) => (i + 1) + ". " + c.title).join("\n"));
}

function summarySlide(p, ctx, d) {
  const s = T.dark(p);
  s.addShape("rect", { x: M + 0.25, y: 1.25, w: 0.06, h: 0.6, fill: { color: C.limeBright }, line: { type: "none" } });
  s.addText("Özetle", { x: M + 0.5, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40, bold: true, color: C.white,
    isTextBox: true, margin: 0, charSpacing: -1 });
  s.addText("AKLINDA KALSIN", { x: M + 0.25, y: 2.25, w: 5, h: 0.3, fontFace: F.body, fontSize: 10.5, bold: true,
    color: C.paleDim, charSpacing: 2, isTextBox: true, margin: 0 });
  d.facts.forEach((f, i) => {
    const y = 2.68 + i * 0.86;
    s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y, w: 0.6, h: 0.5, fontFace: F.head, fontSize: 18, bold: true,
      color: C.limeBright, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(toRuns(f.runs, { boldColor: C.white }), { x: M + 0.9, y, w: 4.9, h: 0.5, fontFace: F.body, fontSize: 15,
      color: C.paleText, valign: "middle", isTextBox: true, margin: 0 });
  });
  const rx = 7.05, rw = W - M - rx;
  s.addText("TEMEL BAĞINTILAR", { x: rx, y: 2.25, w: 5, h: 0.3, fontFace: F.body, fontSize: 10.5, bold: true,
    color: C.paleDim, charSpacing: 2, isTextBox: true, margin: 0 });
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
  s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1, fill: { color: C.inkSoft },
    line: { color: "2C3860", width: 0.75 } });
  s.addText([{ text: "Etkileşimli deneyler, canlı grafikler ve hızlı test:  ", options: { color: "AEBBD6" } },
    { text: SITE + "/" + d.slug + ".html", options: { color: C.limeBright, bold: true } }],
    { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13, isTextBox: true, margin: 0 });
  if (d.next) {
    s.addText([{ text: "SIRADAKİ KONU  ", options: { color: C.paleDim, bold: true, charSpacing: 2, fontSize: 10 } },
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

  kapakSlide(p, ctx, d);
  openingSlide(p, ctx, d);
  yolHaritasi(p, ctx, d);

  /* sınıfta soru–cevap çifti en çok altı: önce her basamaktan birer, sonra sırayla; kalanlar notta */
  const tumDusun = [];
  d.basamaklar.forEach(b => b.chapters.forEach(ch => ch.blocks.forEach(x => { if (x.type === "dusun") tumDusun.push({ x, b: b.no }); })));
  const secDusun = new Set();
  [...new Set(tumDusun.map(t => t.b))].forEach(bn => { const t = tumDusun.find(u => u.b === bn); if (t) secDusun.add(t.x); });
  tumDusun.forEach(t => { if (secDusun.size < 6) secDusun.add(t.x); });

  d.basamaklar.forEach(b => {
    if (b.no) basamakSlide(p, ctx, d, b);
    b.chapters.forEach(ch => {
      const examples = ch.blocks.filter(x => x.type === "example");
      if (examples.length) {
        const intro = (ch.blocks.find(x => x.type === "p") || {}).text || "";
        examples.forEach((ex, k) => exampleSlide(p, ctx, ch, b, ex, k, examples.length, intro));
      } else if (/hata/i.test(ch.title) && ch.blocks.some(x => x.type === "ul")) {
        mistakesSlides(p, ctx, ch, b);
      } else {
        chapterSlides(p, ctx, ch, b);
        ch.blocks.filter(x => x.type === "dusun" && secDusun.has(x)).forEach(q => dusunSlides(p, ctx, ch, b, q));
      }
    });
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
  const basamaklar = []; let bas = null;
  [...body.children].forEach(el => {
    const tag = el.tagName.toLowerCase(), cls = el.getAttribute("class") || "";
    if (tag === "div" && /\bbasamak\b/.test(cls)) {
      bas = { no: +el.dataset.basamak, ad: txt(el.querySelector("b")), aciklama: txt(el.querySelector("span")), chapters: [] };
      basamaklar.push(bas); cur = null; return;
    }
    if (tag === "h3") {
      cur = { id: el.id, title: txt(el), blocks: [], no: chapters.length + 1 };
      chapters.push(cur);
      if (!bas) { bas = { no: 0, ad: "", aciklama: "", chapters: [] }; basamaklar.push(bas); }
      bas.chapters.push(cur);
      return;
    }
    if (tag === "svg") return;
    const target = cur ? cur.blocks : intro;
    if (tag === "p" && /lead-in/.test(cls)) target.push({ type: "leadin", runs: runs(el), text: txt(el) });
    else if (tag === "p" && /kisaca/.test(cls)) {
      const rs = runs(el);
      if (rs.length && /^Kısaca:?\s*$/.test(rs[0].t.trim())) rs.shift();
      if (rs.length) rs[0].t = rs[0].t.replace(/^\s+/, "");
      target.push({ type: "kisaca", runs: rs, text: txt(el).replace(/^Kısaca:\s*/, "") });
    }
    else if (tag === "p") target.push({ type: "p", runs: runs(el), text: txt(el) });
    else if (tag === "h4") target.push({ type: "h4", text: txt(el) });
    else if (tag === "ul" || tag === "ol") target.push({ type: tag, items: [...el.children].map(li => ({ runs: runs(li), text: txt(li) })) });
    else if (tag === "div" && /formula/.test(cls)) target.push({ type: "formula", codes: [...el.querySelectorAll("code")].map(txt) });
    else if (tag === "div" && /callout/.test(cls)) target.push({ type: "callout", warn: /warn/.test(cls), runs: runs(el), text: txt(el) });
    else if (tag === "table") target.push({ type: "table", rows: [...el.rows].map(r => [...r.cells].map(c => ({ text: txt(c), head: c.tagName === "TH" }))) });
    else if (tag === "details" && /dusun/.test(cls)) {
      const cevap = [...el.children].filter(k => k.tagName !== "SUMMARY").map(k => ({ runs: runs(k), text: txt(k) }));
      target.push({ type: "dusun", soru: txt(el.querySelector("summary")).replace(/^Düşün:\s*/, ""), cevap });
    }
    else if (tag === "details") {
      const sm = el.querySelector("summary");
      const ex = { type: "example", title: txt(sm), zorluk: (sm && sm.dataset.zorluk) || "", intro: [], steps: [], outro: [] };
      let seenList = false;
      [...el.children].forEach(k => {
        const kt = k.tagName.toLowerCase();
        if (kt === "summary") return;
        if (kt === "ol" || kt === "ul") { seenList = true; ex.steps.push(...[...k.children].map(li => ({ runs: runs(li), text: txt(li) }))); }
        else if (kt === "div" && /formula/.test(k.getAttribute("class") || "")) { const t = [...k.querySelectorAll("code")].map(txt).join("   "); (seenList ? ex.outro : ex.intro).push({ runs: [{ t, mono: true }], text: t }); }
        else (seenList ? ex.outro : ex.intro).push({ runs: runs(k), text: txt(k) });
      });
      target.push(ex);
    }
    else if (tag === "figure" && /\bfoto\b/.test(cls)) {
      const img = el.querySelector("img"), cap = el.querySelector("figcaption");
      const src = img ? img.getAttribute("src") : "";
      target.push({ type: "foto", src, ad: (src.match(/-(giris|gunluk|uygulama)\.webp(?:\?.*)?$/) || [])[1] || "",
        alt: img ? img.getAttribute("alt") : "", caption: cap ? runs(cap) : [], captionText: txt(cap) });
    }
    else if (tag === "figure") {
      const svg = el.querySelector("svg"), cap = el.querySelector("figcaption");
      target.push({ type: "fig", index: figIndex++, caption: cap ? runs(cap) : [], captionText: txt(cap), aria: svg ? svg.getAttribute("aria-label") : "" });
    }
    else target.push({ type: "p", runs: runs(el), text: txt(el) });
  });
  const eyebrow = q(".hero .eyebrow");
  const leadIn = intro.find(b => b.type === "leadin");
  const introFotos = intro.filter(b => b.type === "foto");
  return {
    title: txt(q("#konu-title")),
    unit: txt(eyebrow.querySelector("a")),
    unitId: (eyebrow.querySelector("a").getAttribute("href").split("#")[1] || ""),
    topicNo: (txt(eyebrow).match(/Konu\s+(\d+)/) || [, "01"])[1],
    lead: txt(q(".hero .lead")),
    facts: [...document.querySelectorAll(".facts li")].map(li => ({ runs: runs(li), text: txt(li) })),
    formulas: [...document.querySelectorAll(".formula-list li")].map(li => ({ code: txt(li.querySelector("code")), note: txt(li.querySelector("span")) })),
    leadIn: leadIn ? leadIn.text : "",
    leadInRuns: leadIn ? leadIn.runs : [],
    introFotos,
    next: txt(q(".topic-nav .next b")),
    chapters,
    basamaklar
  };
}

/* giriş bloğunun merak kısmı: "basamak" geçen ilk cümleden (yol haritası) öncesi */
function hookOf(d) {
  const sents = sentences(d.leadInRuns || []);
  let k = sents.findIndex(rs => /basamak/i.test(plain(rs)));
  if (k <= 0) k = sents.length;
  const out = [];
  sents.slice(0, k).forEach((rs, i) => { if (i) out.push({ t: " " }); out.push(...rs); });
  d.hookRuns = out;
  d.hook = plain(out);
}

async function readTopic(page, slug) {
  await page.goto("file://" + path.join(KOK, slug + ".html"), { waitUntil: "networkidle0", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  const d = await page.evaluate(extractInPage);
  d.slug = slug;
  /* page.evaluate her nesneyi ayrı kopyalar; basamakların bölümlerini d.chapters'taki asıllara bağla */
  const byId = {};
  d.chapters.forEach(c => { byId[c.id] = c; });
  d.basamaklar.forEach(b => { b.chapters = b.chapters.map(c => byId[c.id]); });
  hookOf(d);
  /* sayfadan dönen veri kopyadır; görselleri bölüm bloklarının kendisinden topla ki işaretler paylaşılsın */
  d.gorsel = {};
  [].concat(d.introFotos, ...d.chapters.map(c => c.blocks.filter(b => b.type === "foto"))).forEach(f => {
    /* varsa özgün PNG (gorsel/ham, sunucuda) kırpılır; WebP'yi yeniden sıkıştırmak kaliteyi düşürür */
    const ham = path.join(ROOT, "gorsel", "ham", slug + "-" + f.ad + ".png");
    const file = fs.existsSync(ham) ? ham : path.join(KOK, f.src.replace(/\?.*$/, ""));
    if (f.ad && fs.existsSync(file)) { f.file = file; f.slug = slug; d.gorsel[f.ad] = f; }
  });

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

  let slugs = fs.readdirSync(KOK).filter(f => /\.html$/.test(f) && !/^(index|404)\.html$/.test(f)).map(f => f.replace(/\.html$/, "")).sort();
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
    console.log("✓", slug.padEnd(22), String(n).padStart(2), "slayt", "·", d.chapters.length, "bölüm", "·",
      Object.keys(d.gorsel).length, "görsel");
    if (PREVIEW && rec) fs.writeFileSync(path.join(PREVIEW, slug + ".json"), JSON.stringify({ slug, title: d.title, slides: rec.map(r => ({ bg: r.slide.background && r.slide.background.color, items: r.items })) }));
  }
  await browser.close();
  console.log(slugs.length, "sunum →", OUT);
})().catch(e => { console.error(e); process.exit(1); });
