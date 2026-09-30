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
      return b.rows.reduce((h, r) => h + tableRowH(r, colW, size), 0) + 0.14;
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
    const rowH = b.rows.map(r => tableRowH(r, colW, size));
    const rows = b.rows.map((r, i) => r.map((c, j) => ({
      text: c.text,
      options: {
        bold: c.head || j === 0,
        color: c.head ? C.dim : (j === 0 ? C.ink : C.muted),
        fontSize: c.head ? Math.max(10.5, size - 3) : size,
        fill: { color: c.head ? C.softer : (i % 2 ? C.white : "FBFCFE") },
        valign: "middle",
        margin: size > 14 ? [5, 9, 5, 9] : [3, 6, 3, 6]
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

/* Slaytlar küçük adımlıdır: başarısı düşük öğrenci için her slaytta bir fikir, büyük punto.
 * Metin slaytında içerik alanın en çok DOLULUK kadarını kaplar; fazlası bir sonraki slayta geçer. */
const METIN = 22, LISTE = 21, TABLO = 17, KUTU = 19;
const DOLULUK = 0.78;
const GOVDE_Y = 1.45;
const GOVDE_H = BOTTOM - GOVDE_Y;

/* sağ üstte küçük basamak etiketi ve (varsa) adım sayacı */
function basamakEtiketi(s, bas, adim) {
  if (!bas.no) return;
  const tone = BASAMAK[bas.no].ton;
  const runs = [{ text: bas.no + " / 4  ", options: { color: C.dim } }, { text: bas.ad.toLocaleUpperCase("tr-TR"), options: { color: tone } }];
  if (adim) runs.push({ text: "   ·   ADIM " + adim[0] + " / " + adim[1], options: { color: C.dim } });
  s.addText(runs, { x: W - M - 4.6, y: 0.12, w: 4.6, h: 0.28, align: "right", fontFace: F.body, fontSize: 9.5, bold: true, charSpacing: 2,
    isTextBox: true, margin: 0, valign: "middle" });
}

/* bir bloğu slayta sığan parçalara böler; paragraf cümle cümle, liste madde madde, tablo satır satır */
function parcala(b, w) {
  const sinir = GOVDE_H * DOLULUK - 0.2;
  if (b.type === "p") {
    const items = paraItems(b) || [{ runs: b.runs, text: b.text }];
    const out = []; let cur = [];
    items.forEach(it => {
      const dene = cur.concat([it]);
      if (cur.length && listeH(dene, w, METIN) > sinir) { out.push({ type: "pp", items: cur }); cur = [it]; }
      else cur = dene;
    });
    if (cur.length) out.push({ type: "pp", items: cur });
    return out;
  }
  if (b.type === "ul" || b.type === "ol") {
    const out = []; let cur = [], bas = 0;
    b.items.forEach((it, i) => {
      const dene = cur.concat([it]);
      if (cur.length && (listeH(dene, w, LISTE) > sinir || cur.length >= 4)) { out.push({ type: b.type, items: cur, basla: bas }); cur = [it]; bas = i; }
      else cur = dene;
    });
    if (cur.length) out.push({ type: b.type, items: cur, basla: bas });
    return out;
  }
  if (b.type === "table") {
    const bas = b.rows[0], govde = b.rows.slice(1);
    if (!bas.every(c => c.head)) return [b];
    const out = [];
    for (let i = 0; i < govde.length; i += 6) out.push({ type: "table", rows: [bas].concat(govde.slice(i, i + 6)) });
    return out.length ? out : [b];
  }
  if (b.type === "callout" && blockH(b, w, KUTU) > sinir) {
    const items = paraItems(b) || [];
    if (items.length > 1) {
      const out = []; let cur = [];
      items.forEach(it => {
        const dene = cur.concat([it]);
        if (cur.length && textH(dene.map(x => x.text).join(" "), w - 0.62, KUTU - 1) + 0.56 > sinir) { out.push({ type: "callout", warn: b.warn, runs: [].concat(...cur.map((x, k) => (k ? [{ t: " " }] : []).concat(x.runs))), text: cur.map(x => x.text).join(" ") }); cur = [it]; }
        else cur = dene;
      });
      if (cur.length) out.push({ type: "callout", warn: b.warn, runs: [].concat(...cur.map((x, k) => (k ? [{ t: " " }] : []).concat(x.runs))), text: cur.map(x => x.text).join(" ") });
      return out;
    }
  }
  return [b];
}
/* 18 pt formül kutularını satırlara dizer (Courier New ≈ 0,15 inç/karakter) */
function buyukFormulSatirlari(codes, w) {
  const rows = [[]]; let x = 0;
  codes.forEach(c => {
    const bw = Math.min(w, c.length * 0.152 + 0.6);
    if (x + bw > w && rows[rows.length - 1].length) { rows.push([]); x = 0; }
    rows[rows.length - 1].push({ text: c, w: bw });
    x += bw + 0.16;
  });
  return rows;
}
function listeH(items, w, size) { return items.reduce((h, it) => h + textH(it.text, w - 0.3, size) + 0.1, 0) + 0.12; }
function parcaH(b, w) {
  if (b.type === "pp") return listeH(b.items, w, METIN);
  if (b.type === "ul" || b.type === "ol") return listeH(b.items, w, LISTE);
  if (b.type === "h4") return 0.52;
  if (b.type === "formula") return buyukFormulSatirlari(b.codes, w).length * 0.78 + 0.1;
  if (b.type === "table") return blockH(b, w, TABLO) + 0.1;
  if (b.type === "callout") return textH(b.text, w - 0.62, KUTU - 1) + 0.56;
  return blockH(b, w, METIN);
}

/* metin slaytının parçasını çizer; kullandığı yüksekliği döndürür */
function parcaCiz(s, b, x, y, w, tone) {
  if (b.type === "pp" || b.type === "ul" || b.type === "ol") {
    const size = b.type === "pp" ? METIN : LISTE;
    const h = parcaH(b, w);
    const runs = listRuns(b.items, b.type === "ol");
    if (b.type === "ol" && b.basla) runs[0].options.bullet = { type: "number", indent: 22, numberStartAt: b.basla + 1 };
    runs.forEach(r => { if (r.options.bullet) r.options.paraSpaceAfter = 8; });
    s.addText(runs, { x, y, w, h: h - 0.12, fontFace: F.body, fontSize: size, color: C.ink, lineSpacingMultiple: 1.15,
      valign: "top", isTextBox: true, margin: 0 });
    return h + 0.1;
  }
  if (b.type === "h4") {
    s.addShape("rect", { x, y: y + 0.08, w: 0.07, h: 0.34, fill: { color: tone }, line: { type: "none" } });
    s.addText(b.text, { x: x + 0.2, y, w: w - 0.2, h: 0.5, fontFace: F.head, fontSize: 22, bold: true, color: C.ink,
      valign: "middle", isTextBox: true, margin: 0 });
    return 0.62;
  }
  if (b.type === "formula") {
    let yy = y;
    buyukFormulSatirlari(b.codes, w).forEach(row => {
      let xx = x;
      row.forEach(c => { T.formula(s, c.text, { x: xx, y: yy, w: c.w, h: 0.64, size: 18 }); xx += c.w + 0.16; });
      yy += 0.78;
    });
    return yy - y + 0.12;
  }
  if (b.type === "table") return drawBlock(s, b, x, y, w, tone, TABLO) + 0.1;
  if (b.type === "callout") {
    const h = parcaH(b, w);
    s.addShape("roundRect", { x, y, w, h: h - 0.12, rectRadius: 0.14, fill: { color: C.white }, line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
    s.addShape("rect", { x: x + 0.02, y: y + 0.18, w: 0.06, h: h - 0.48, fill: { color: b.warn ? C.amber : C.lime }, line: { type: "none" } });
    s.addText(toRuns(b.runs), { x: x + 0.34, y: y + 0.14, w: w - 0.56, h: h - 0.4, fontFace: F.body, fontSize: KUTU - 1, color: C.ink,
      lineSpacingMultiple: 1.14, valign: "middle", isTextBox: true, margin: 0 });
    return h + 0.08;
  }
  return drawBlock(s, b, x, y, w, tone, METIN) + 0.1;
}
function parcaMetni(b) {
  if (b.type === "pp" || b.type === "ul" || b.type === "ol") return b.items.map(it => "• " + it.text).join("\n");
  if (b.type === "formula") return b.codes.join("   ");
  if (b.type === "table") return b.rows.map(r => r.map(c => c.text).join(" | ")).join("\n");
  return b.text || "";
}

/* bölüm: sırayla metin slaytları ve şekil slaytları, sonunda Kısaca ve Düşün soruları */
function chapterSlides(p, ctx, ch, bas) {
  const tone = BASAMAK[bas.no].ton;
  const akis = []; let buf = [], dolu = 0;
  const bosalt = () => { if (buf.length) akis.push({ tur: "metin", parcalar: buf }); buf = []; dolu = 0; };
  ch.blocks.forEach(b => {
    if (b.type === "kisaca" || b.type === "dusun") return;
    if (b.type === "callout" && /^Kendini sına/.test(b.text)) return;
    if (b.type === "fig" || (b.type === "foto" && !b.ayractaGosterildi)) { bosalt(); akis.push({ tur: "sekil", fig: b }); return; }
    if (b.type === "foto") return;
    if (b.type === "h4") { bosalt(); buf.push(b); dolu = parcaH(b, CW); return; }
    parcala(b, CW).forEach(pc => {
      const h = parcaH(pc, CW);
      const yalnizBaslik = buf.length === 1 && buf[0].type === "h4";
      const sigar = dolu + h <= GOVDE_H * DOLULUK;
      const kisaKuyruk = h <= 0.95 && dolu + h <= GOVDE_H * 0.95;   /* bir iki satırlık parça yetim kalmasın */
      if (buf.length && !yalnizBaslik && !sigar && !kisaKuyruk) {
        /* ":" ile biten giriş cümlesi, tanıttığı tablo/formül/listeyle birlikte yeni slayta geçer */
        let tasi = null;
        const son = buf[buf.length - 1];
        if (buf.length > 1 && son.type === "pp" && /:\s*$/.test(son.items[son.items.length - 1].text)) {
          if (son.items.length > 1) { tasi = { type: "pp", items: [son.items.pop()] }; }
          else tasi = buf.pop();
        }
        /* geride yalnızca alt başlık kalacaksa o da taşınır */
        const baslik = tasi && buf.length === 1 && buf[0].type === "h4" ? buf.pop() : null;
        bosalt();
        if (baslik) { buf.push(baslik); dolu = parcaH(baslik, CW); }
        if (tasi) { buf.push(tasi); dolu += parcaH(tasi, CW) + 0.1; }
      }
      buf.push(pc); dolu += h + 0.1;
    });
  });
  bosalt();

  const n = akis.length;
  akis.forEach((a, i) => {
    const s = T.light(p);
    T.head(s, ch.no, ch.title, tone);
    basamakEtiketi(s, bas, n > 1 ? [i + 1, n] : null);
    if (a.tur === "metin") {
      let y = GOVDE_Y;
      a.parcalar.forEach(pc => { y += parcaCiz(s, pc, M, y, CW, tone); });
      s.addNotes(ch.title + (n > 1 ? " — adım " + (i + 1) + "/" + n : "") + "\n\n" + a.parcalar.map(parcaMetni).filter(Boolean).join("\n\n"));
    } else {
      sekilSlayti(s, a.fig);
      s.addNotes(ch.title + " — şekil\n\n" + a.fig.captionText);
    }
    ctx.page++;
    T.footer(s, ctx.foot, ctx.page);
  });

  const kisaca = ch.blocks.find(b => b.type === "kisaca");
  if (kisaca) kisacaSlide(p, ctx, ch, bas, kisaca);
  ch.blocks.filter(x => x.type === "dusun").forEach(q => dusunSlides(p, ctx, ch, bas, q));
}

/* şekil ya da görsel tek başına, büyük, alt yazısıyla */
function sekilSlayti(s, f) {
  const capW = 10.6, capSize = 13.5;
  const capH = f.captionText ? Math.min(1.5, textH(f.captionText, capW, capSize, false, 1.15) + 0.1) : 0;
  const maxW = 10.6, maxH = BOTTOM - GOVDE_Y - capH - 0.35;
  if (f.type === "foto") {
    let w = maxW, h = w / 1.5;
    if (h > maxH) { h = maxH; w = h * 1.5; }
    const x = (W - w) / 2, img = kirp(f.file, f.slug + "-" + f.ad + "-genis", 1500, 1000);
    s.addShape("roundRect", { x: x - 0.06, y: GOVDE_Y - 0.06, w: w + 0.12, h: h + 0.12, rectRadius: 0.14, fill: { color: C.white },
      line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
    s.addImage({ path: img, x, y: GOVDE_Y, w, h });
    var altY = GOVDE_Y + h + 0.26;
  } else {
    let w = maxW, h = w / f.ratio;
    if (h > maxH) { h = maxH; w = h * f.ratio; }
    const x = (W - w) / 2;
    s.addShape("roundRect", { x: x - 0.25, y: GOVDE_Y - 0.1, w: w + 0.5, h: h + 0.2, rectRadius: 0.16, fill: { color: C.white },
      line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
    s.addImage({ path: f.png, x, y: GOVDE_Y, w, h });
    var altY = GOVDE_Y + h + 0.3;
  }
  if (capH) {
    const size = fit(f.captionText, capW, BOTTOM - altY, capSize, 11, false, 1.15);
    s.addText(toRuns(f.caption, { boldColor: C.ink }), { x: (W - capW) / 2, y: altY, w: capW, h: BOTTOM - altY, fontFace: F.body, fontSize: size,
      color: C.muted, lineSpacingMultiple: 1.15, valign: "top", align: "center", isTextBox: true, margin: 0 });
  }
}

/* bölümün özeti: tek cümle, büyük */
function kisacaSlide(p, ctx, ch, bas, k) {
  const tone = BASAMAK[bas.no].ton;
  const s = T.light(p);
  T.head(s, ch.no, ch.title, tone);
  basamakEtiketi(s, bas);
  const x = M + 0.4, y = 1.85, w = CW - 0.8, h = 4.2;
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.22, fill: { color: C.white }, line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
  s.addShape("rect", { x: x + 0.04, y: y + 0.5, w: 0.08, h: h - 1.0, fill: { color: tone }, line: { type: "none" } });
  s.addText("KISACA  ·  BU BÖLÜMDE ÖĞRENDİK", { x: x + 0.6, y: y + 0.32, w: w - 1.2, h: 0.32, fontFace: F.body, fontSize: 12, bold: true,
    color: tone, charSpacing: 3, isTextBox: true, margin: 0 });
  const size = fit(k.text, w - 1.2, h - 1.3, 28, 18, false, 1.25);
  s.addText(toRuns(k.runs, { boldColor: tone }), { x: x + 0.6, y: y + 0.8, w: w - 1.2, h: h - 1.2, fontFace: F.head, fontSize: size,
    color: C.ink, lineSpacingMultiple: 1.25, valign: "middle", isTextBox: true, margin: 0 });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Kısaca: " + k.text + "\n\nSınıfa bu cümleyi kendi sözleriyle tekrar ettirin.");
}

/* önce hatırlayalım: konudan önce bilinmesi gerekenler, slayt başına en çok üç kart */
function hatirlaSlides(p, ctx, d) {
  if (!d.hatirla || !d.hatirla.length) return;
  const items = d.hatirla, per = 3, sayfa = Math.ceil(items.length / per);
  for (let k = 0; k < sayfa; k++) {
    const grup = items.slice(k * per, k * per + per);
    const s = T.light(p);
    T.head(s, "↺", "Önce hatırlayalım" + (sayfa > 1 ? " · " + (k + 1) + " / " + sayfa : ""), C.lime);
    T.lede(s, "Bu konuya başlamadan önce bilmen gereken birkaç şey.");
    const top = 1.8, gap = 0.22, ch_ = (BOTTOM - top - gap * (per - 1)) / per;
    grup.forEach((it, i) => {
      const y = top + i * (ch_ + gap);
      T.card(s, { x: M, y, w: CW, h: ch_, fill: C.white });
      B.rozet(s, k * per + i + 1, M + 0.3, y + (ch_ - 0.5) / 2, 0.5, C.lime);
      const size = fit(it.text, CW - 1.5, ch_ - 0.3, 20, 14, false, 1.15);
      s.addText(toRuns(it.runs), { x: M + 1.1, y: y + 0.12, w: CW - 1.4, h: ch_ - 0.24, fontFace: F.body, fontSize: size, color: C.muted,
        lineSpacingMultiple: 1.15, valign: "middle", isTextBox: true, margin: 0 });
    });
    ctx.page++;
    T.footer(s, ctx.foot, ctx.page);
    s.addNotes("Önce hatırlayalım:\n" + grup.map(it => "• " + it.text).join("\n") + "\n\nHer maddeyi sınıfa sorarak hatırlatın.");
  }
}

/* düşün: soru slaytı + cevap slaytı */
function dusunSlides(p, ctx, ch, bas, q) {
  soruCevap(p, ctx, bas, {
    etiket: "DÜŞÜN", renk: C.violet, zemin: "F7F6FE", simge: "?", soru: q.soru, cevap: q.cevap,
    alt: bolumNo(ch) + " · " + ch.title, not: "Düşün: " + q.soru + "\n\nSınıfa sorun, birkaç tahmin alın; sonra cevap slaytına geçin."
  });
}

/* sıra sende: alıştırma sorusu + cevabı */
function alistirmaSlides(p, ctx, ch, bas, a, i, n, yonerge) {
  soruCevap(p, ctx, bas, {
    etiket: "SIRA SENDE " + (i + 1) + " / " + n, renk: C.amber, zemin: "FEF8EE", simge: "✎", soru: a.soru, cevap: a.cevap, zorluk: a.zorluk,
    alt: yonerge || "Önce verilenleri ve isteneni yaz, sonra çöz.", not: "Sıra sende: " + a.soru + "\n\nÖğrencilere 2–3 dakika verin; sonra cevap slaytını açın."
  });
}

function zorlukRozeti(s, z, x, y) {
  const Z = ZORLUK[z]; if (!Z) return;
  s.addShape("roundRect", { x, y, w: 1.25, h: 0.42, rectRadius: 0.21, fill: { color: Z.zemin }, line: { color: Z.ton, width: 0.75 } });
  s.addText(Z.ad, { x, y, w: 1.25, h: 0.42, align: "center", valign: "middle", fontFace: F.body, fontSize: 11.5, bold: true,
    color: Z.ton, charSpacing: 2, isTextBox: true, margin: 0 });
}

function soruCevap(p, ctx, bas, o) {
  let s = T.light(p);
  s.background = { color: o.zemin };
  basamakEtiketi(s, bas);
  s.addShape("ellipse", { x: M + 0.2, y: 2.2, w: 1.7, h: 1.7, fill: { color: o.renk }, line: { type: "none" },
    shadow: T.shadow({ blur: 14, offset: 4, color: o.renk, opacity: 0.3 }) });
  s.addText(o.simge, { x: M + 0.2, y: 2.2, w: 1.7, h: 1.7, align: "center", valign: "middle", fontFace: F.head, fontSize: o.simge === "?" ? 80 : 60,
    bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText(o.etiket, { x: M + 2.5, y: 1.55, w: 6, h: 0.35, fontFace: F.body, fontSize: 13, bold: true, color: o.renk,
    charSpacing: 4, isTextBox: true, margin: 0 });
  if (o.zorluk) zorlukRozeti(s, o.zorluk, W - M - 1.25, 1.5);
  const qw = CW - 2.6, qh = 3.4;
  const qs = fit(o.soru, qw, qh, 32, 20, false, 1.2);
  s.addText(o.soru, { x: M + 2.5, y: 2.0, w: qw, h: qh, fontFace: F.head, fontSize: qs, color: C.ink,
    lineSpacingMultiple: 1.2, valign: "middle", isTextBox: true, margin: 0 });
  s.addText([{ text: o.alt, options: { color: C.dim } }, { text: "     Cevap bir sonraki slaytta", options: { color: o.renk, bold: true } }],
    { x: M + 2.5, y: 5.75, w: qw, h: 0.34, fontFace: F.body, fontSize: 12, isTextBox: true, margin: 0, valign: "middle" });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes(o.not + "\n\nCevap: " + o.cevap.map(b => b.text).join("\n"));

  s = T.light(p);
  basamakEtiketi(s, bas);
  s.addShape("roundRect", { x: M, y: 0.5, w: 0.54, h: 0.54, rectRadius: 0.14, fill: { color: o.renk }, line: { type: "none" } });
  s.addText("!", { x: M, y: 0.5, w: 0.54, h: 0.54, align: "center", valign: "middle", fontFace: F.head, fontSize: 22, bold: true,
    color: C.white, isTextBox: true, margin: 0 });
  s.addText("Cevap", { x: M + 0.78, y: 0.42, w: 6, h: 0.7, fontFace: F.head, fontSize: 32, bold: true, color: C.ink,
    isTextBox: true, margin: 0, valign: "middle" });
  const sq = fit(o.soru, CW - 0.8, 0.8, 16, 12.5, false);
  s.addText(o.soru, { x: M + 0.78, y: 1.2, w: CW - 0.8, h: 0.8, fontFace: F.body, fontSize: sq, italic: true, color: C.dim,
    valign: "top", isTextBox: true, margin: 0 });
  const ay = 2.2, ah = BOTTOM - ay;
  const aText = o.cevap.map(b => b.text).join("\n");
  const as = fit(aText, CW - 1.1, ah - 0.6, 24, 13, false, 1.25);
  s.addShape("roundRect", { x: M, y: ay, w: CW, h: ah, rectRadius: 0.2, fill: { color: C.white },
    line: { color: C.line, width: 0.75 }, shadow: T.shadow({}) });
  s.addShape("rect", { x: M + 0.03, y: ay + 0.4, w: 0.07, h: ah - 0.8, fill: { color: o.renk }, line: { type: "none" } });
  s.addText(joinParas(o.cevap, { boldColor: o.renk }), { x: M + 0.55, y: ay + 0.3, w: CW - 1.1, h: ah - 0.6, fontFace: F.body,
    fontSize: as, color: C.ink, lineSpacingMultiple: 1.25, valign: "middle", isTextBox: true, margin: 0 });
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes("Cevap: " + aText);
}

/* çözümlü örnek: önce soru + verilenler/istenen, sonra adımlar (slayt başına en çok üç) */
function exampleSlides(p, ctx, ch, bas, ex, i, total) {
  const tone = BASAMAK[bas.no].ton;
  const alt = ex.title.replace(/^Örnek\s*\d+\s*[—–-]\s*/u, "");
  const bol = t => t.split(/\s+·\s+/).map(x => x.trim()).filter(Boolean);

  /* 1) soru */
  let s = T.light(p);
  T.head(s, ch.no, "Örnek " + (i + 1) + " / " + total + " · Soru", tone);
  zorlukRozeti(s, ex.zorluk, W - M - 1.25, 0.56);
  T.lede(s, alt);
  const qText = ex.intro.map(b => b.text).join("\n");
  const kutuVar = ex.verilen || ex.istenen;
  /* soru kartı ihtiyacı kadar yer alır (20 pt'den başlar), kalanı verilenler / istenen kartlarına */
  let qs = 20;
  while (qs > 14 && textH(qText, CW - 0.7, qs, false, 1.18) > 2.2) qs -= 0.5;
  const qh = kutuVar ? Math.max(1.25, Math.min(2.6, textH(qText, CW - 0.7, qs, false, 1.18) + 0.75)) : BOTTOM - 1.85;
  if (!kutuVar) qs = fit(qText, CW - 0.7, qh - 0.6, 20, 12.5, false, 1.18);
  T.card(s, { x: M, y: 1.8, w: CW, h: qh, fill: C.softer });
  s.addText("SORU", { x: M + 0.35, y: 1.98, w: 3, h: 0.28, fontFace: F.body, fontSize: 10.5, bold: true, color: tone, charSpacing: 2, isTextBox: true, margin: 0 });
  s.addText(joinParas(ex.intro), { x: M + 0.35, y: 2.32, w: CW - 0.7, h: qh - 0.6, fontFace: F.body, fontSize: qs, color: C.ink,
    lineSpacingMultiple: 1.18, valign: "top", isTextBox: true, margin: 0 });
  if (kutuVar) {
    const y = 1.8 + qh + 0.22, h = BOTTOM - y, cw = (CW - 0.3) / 2;
    [["VERİLENLER", ex.verilen, C.blue], ["İSTENEN", ex.istenen, C.violet]].forEach(([ad, v, renk], k) => {
      const x = M + k * (cw + 0.3);
      T.card(s, { x, y, w: cw, h, fill: C.white });
      s.addShape("rect", { x: x + 0.02, y: y + 0.18, w: 0.06, h: h - 0.36, fill: { color: renk }, line: { type: "none" } });
      s.addText(ad, { x: x + 0.3, y: y + 0.16, w: cw - 0.5, h: 0.28, fontFace: F.body, fontSize: 10.5, bold: true, color: renk, charSpacing: 2, isTextBox: true, margin: 0 });
      if (!v) return;
      const items = bol(v.text.replace(/^(Verilenler|İstenen):\s*/, "")).map(t => ({ runs: [{ t }], text: t }));
      const yer = h - 0.66;
      /* madde aralığı dahil sığan punto; 11 pt'de de sığmıyorsa iki sütun */
      const olc = (its, w, sz) => its.reduce((a, it) => a + textH(it.text, w - 0.3, sz, false, 1.1) + 5 / 72, 0);
      let sutun = 1, size = 18;
      while (size > 11 && olc(items, cw - 0.6, size) > yer) size -= 0.5;
      if (olc(items, cw - 0.6, size) > yer && items.length > 3) {
        sutun = 2; size = 16;
        const yari = Math.ceil(items.length / 2);
        while (size > 10 && Math.max(olc(items.slice(0, yari), (cw - 0.7) / 2, size), olc(items.slice(yari), (cw - 0.7) / 2, size)) > yer) size -= 0.5;
      }
      const parcalar = sutun === 1 ? [items] : [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))];
      const sw = sutun === 1 ? cw - 0.6 : (cw - 0.7) / 2;
      parcalar.forEach((its, j) => {
        s.addText(listRuns(its, false), { x: x + 0.34 + j * (sw + 0.1), y: y + 0.52, w: sw, h: yer, fontFace: F.body, fontSize: size, color: C.ink,
          lineSpacingMultiple: 1.1, valign: "top", isTextBox: true, margin: 0 });
      });
    });
  }
  ctx.page++;
  T.footer(s, ctx.foot, ctx.page);
  s.addNotes([ex.title, qText, ex.verilen ? ex.verilen.text : "", ex.istenen ? ex.istenen.text : "",
    "Önce öğrencilere verilenleri ve isteneni söyletin; hangi bağıntının kullanılacağını sorun."].filter(Boolean).join("\n\n"));

  /* 2) çözüm adımları */
  /* slayt başına en çok üç adım, dengeli: 4 → 2+2, 5 → 3+2 */
  const gs = Math.max(1, Math.ceil(ex.steps.length / 3)), per = Math.ceil(ex.steps.length / gs) || 3, gruplar = [];
  for (let k = 0; k < ex.steps.length; k += per) gruplar.push(ex.steps.slice(k, k + per));
  if (!gruplar.length) gruplar.push([]);
  gruplar.forEach((g, gi) => {
    s = T.light(p);
    T.head(s, ch.no, "Örnek " + (i + 1) + " · Çözüm" + (gruplar.length > 1 ? " " + (gi + 1) + " / " + gruplar.length : ""), tone);
    zorlukRozeti(s, ex.zorluk, W - M - 1.25, 0.56);
    T.lede(s, alt);
    const sonMu = gi === gruplar.length - 1;
    const notText = sonMu && ex.outro.length ? ex.outro.map(b => b.text).join("\n") : "";
    const notH = notText ? Math.min(1.5, textH(notText, CW - 0.9, 15, false, 1.12) + 0.5) : 0;
    const top = 1.8, gap = 0.18, alan = BOTTOM - top - (notH ? notH + gap : 0);
    const textW = CW - 1.15;
    let size = 20, need = [];
    for (;;) {
      need = g.map(st => Math.max(0.7, textH(st.text, textW, size, false, 1.12) + 0.36));
      if (need.reduce((a, b) => a + b, 0) + gap * (g.length - 1) <= alan || size <= 12) break;
      size -= 0.5;
    }
    const f = (alan - gap * (g.length - 1)) / need.reduce((a, b) => a + b, 0);
    let y = top;
    g.forEach((st, k) => {
      const sh = need[k] * Math.min(f, 1.6);
      T.card(s, { x: M, y, w: CW, h: sh });
      B.rozet(s, gi * per + k + 1, M + 0.3, y + (sh - 0.46) / 2, 0.46, tone);
      s.addText(toRuns(st.runs), { x: M + 0.95, y: y + 0.06, w: textW, h: sh - 0.12, fontFace: F.body, fontSize: size,
        color: C.ink, lineSpacingMultiple: 1.12, valign: "middle", isTextBox: true, margin: 0 });
      y += sh + gap;
    });
    if (notH) {
      const ny = BOTTOM - notH;
      T.card(s, { x: M, y: ny, w: CW, h: notH, fill: C.softer });
      s.addText("NOT", { x: M + 0.35, y: ny + 0.14, w: 2, h: 0.24, fontFace: F.body, fontSize: 10, bold: true, color: C.dim, charSpacing: 2, isTextBox: true, margin: 0 });
      const ns = fit(notText, CW - 0.9, notH - 0.5, 15, 11, false, 1.12);
      s.addText(joinParas(ex.outro, { boldColor: C.ink }), { x: M + 0.35, y: ny + 0.4, w: CW - 0.7, h: notH - 0.5, fontFace: F.body,
        fontSize: ns, color: C.muted, lineSpacingMultiple: 1.12, valign: "top", isTextBox: true, margin: 0 });
    }
    ctx.page++;
    T.footer(s, ctx.foot, ctx.page);
    s.addNotes(ex.title + " — çözüm\n\n" + g.map((st, k) => (gi * per + k + 1) + ". " + st.text).join("\n") + (notText ? "\n\n" + notText : ""));
  });
}

function mistakesSlides(p, ctx, ch, bas) {
  const list = ch.blocks.find(b => b.type === "ul");
  const all = list ? list.items : [];
  const per = 4;
  const groups = [];
  for (let i = 0; i < all.length; i += per) groups.push(all.slice(i, i + per));
  const intro = ch.blocks.find(b => b.type === "p" && !/^Kendini sına/.test(b.text));
  groups.forEach((items, gi) => {
    const s = T.light(p);
    T.head(s, ch.no, ch.title + (groups.length > 1 ? " · " + (gi + 1) + " / " + groups.length : ""), C.rose);
    basamakEtiketi(s, bas);
    T.lede(s, intro ? intro.text : "Sınavda puan kaybettiren klasikler ve doğrusu.");
    const n = items.length, cols = 2, rows = Math.ceil(n / cols);
    const top = 1.78, gap = 0.18, cw = (CW - 0.24) / 2;
    const ch_ = (BOTTOM - top - (rows - 1) * gap) / rows;
    const split = it => {
      let k = 0; while (k < it.runs.length && (it.runs[k].b || !it.runs[k].t.trim())) k++;
      const claim = it.runs.slice(0, k), expl = it.runs.slice(k);
      if (!claim.length) { claim.push(it.runs[0]); expl.splice(0, 1); }
      return { claim, expl };
    };
    let claimSize = 19, explSize = 17;
    while (claimSize > 12 && items.some(it => {
      const { claim, expl } = split(it);
      return 0.16 + textH(plain(claim), cw - 0.95, claimSize, true) + 0.14 + textH(plain(expl), cw - 0.86, explSize) + 0.2 > ch_;
    })) { claimSize -= 0.5; explSize -= 0.5; }
    items.forEach((it, i) => {
      const { claim, expl } = split(it);
      const col = i % cols, row = Math.floor(i / cols);
      const x = M + col * (cw + 0.24), y = top + row * (ch_ + gap);
      T.card(s, { x, y, w: cw, h: ch_, fill: C.white });
      const claimText = plain(claim).replace(/^[“"]|[”"]$/g, "");
      const claimH = textH(claimText, cw - 0.95, claimSize, true) + 0.08;
      s.addShape("roundRect", { x: x + 0.22, y: y + 0.18, w: 0.34, h: 0.34, rectRadius: 0.09, fill: { color: "FBE9EE" }, line: { type: "none" } });
      s.addText("✗", { x: x + 0.22, y: y + 0.18, w: 0.34, h: 0.34, align: "center", valign: "middle", fontFace: F.body,
        fontSize: 14, bold: true, color: C.rose, isTextBox: true, margin: 0 });
      s.addText(toRuns(claim.map(r => Object.assign({}, r, { b: true }))), { x: x + 0.7, y: y + 0.14, w: cw - 0.9, h: claimH,
        fontFace: F.body, fontSize: claimSize, color: C.ink, lineSpacingMultiple: 1.08, valign: "top", isTextBox: true, margin: 0 });
      const ey = y + 0.14 + claimH + 0.1;
      s.addShape("roundRect", { x: x + 0.22, y: ey + 0.02, w: 0.34, h: 0.34, rectRadius: 0.09, fill: { color: "EAF7DC" }, line: { type: "none" } });
      s.addText("✓", { x: x + 0.22, y: ey + 0.02, w: 0.34, h: 0.34, align: "center", valign: "middle", fontFace: F.body,
        fontSize: 14, bold: true, color: C.lime, isTextBox: true, margin: 0 });
      s.addText(toRuns(expl, { boldColor: C.ink }), { x: x + 0.7, y: ey, w: cw - 0.9, h: Math.max(0.3, ch_ - (ey - y) - 0.14),
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
  hatirlaSlides(p, ctx, d);

  d.basamaklar.forEach(b => {
    if (b.no) basamakSlide(p, ctx, d, b);
    b.chapters.forEach(ch => {
      const examples = ch.blocks.filter(x => x.type === "example");
      if (examples.length) {
        examples.forEach((ex, k) => exampleSlides(p, ctx, ch, b, ex, k, examples.length));
        const al = ch.blocks.filter(x => x.type === "alistirma");
        const hi = ch.blocks.findIndex(x => x.type === "h4" && x.text === "Sıra sende");
        const yon = hi > -1 && ch.blocks[hi + 1] && ch.blocks[hi + 1].type === "p" ? ch.blocks[hi + 1].text : "";
        al.forEach((a, k) => alistirmaSlides(p, ctx, ch, b, a, k, al.length, yon));
      } else if (/hata/i.test(ch.title) && ch.blocks.some(x => x.type === "ul")) {
        mistakesSlides(p, ctx, ch, b);
      } else {
        chapterSlides(p, ctx, ch, b);
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
  const basamaklar = []; let bas = null; let hatirla = [];
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
    if (tag === "div" && /\bhatirla\b/.test(cls)) { hatirla = [...el.querySelectorAll("li")].map(li => ({ runs: runs(li), text: txt(li) })); return; }
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
    else if (tag === "details" && /alistirma/.test(cls)) {
      const sm = el.querySelector("summary");
      const cevap = [...el.children].filter(k => k.tagName !== "SUMMARY").map(k => ({ runs: runs(k), text: txt(k) }));
      target.push({ type: "alistirma", soru: txt(sm).replace(/^Sıra sende\s*\d+:\s*/, ""), zorluk: (sm && sm.dataset.zorluk) || "", cevap });
    }
    else if (tag === "details") {
      const sm = el.querySelector("summary");
      const ex = { type: "example", title: txt(sm), zorluk: (sm && sm.dataset.zorluk) || "", intro: [], steps: [], outro: [] };
      let seenList = false;
      [...el.children].forEach(k => {
        const kt = k.tagName.toLowerCase();
        if (kt === "summary") return;
        const kc = k.getAttribute("class") || "";
        if (kt === "p" && /verilen/.test(kc)) { ex.verilen = { runs: runs(k), text: txt(k) }; return; }
        if (kt === "p" && /istenen/.test(kc)) { ex.istenen = { runs: runs(k), text: txt(k) }; return; }
        if (kt === "ol" || kt === "ul") { seenList = true; ex.steps.push(...[...k.children].map(li => ({ runs: runs(li), text: txt(li) }))); }
        else if (kt === "div" && /formula/.test(k.getAttribute("class") || "")) { const t = [...k.querySelectorAll("code")].map(txt).join("   "); (seenList ? ex.outro : ex.intro).push({ runs: [{ t, mono: true }], text: t }); }
        else (seenList ? ex.outro : ex.intro).push({ runs: runs(k), text: txt(k) });
      });
      target.push(ex);
    }
    else if (tag === "figure" && /\bfoto\b/.test(cls)) {
      const img = el.querySelector("img"), cap = el.querySelector("figcaption");
      const src = img ? img.getAttribute("src") : "";
      target.push({ type: "foto", src, ad: (src.match(/-(giris|gunluk|uygulama|ek\d)\.webp(?:\?.*)?$/) || [])[1] || "",
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
    hatirla,
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
