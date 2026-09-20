/* Dersler sunum teması — site paletiyle (dersler.perinet.org) aynı renkler. */

const C = {
  ink: "0E1426",        // koyu lacivert — koyu slayt zemini ve ana metin
  inkSoft: "1C2542",
  white: "FFFFFF",
  soft: "F4F5F9",       // açık kart zemini
  softer: "F8F9FC",
  line: "E1E5EE",
  muted: "4A5470",
  dim: "7B849E",
  blue: "2957D4",
  violet: "5F4BD8",
  lime: "3C8C21",       // açık zeminde okunur yeşil
  limeBright: "C6F36B", // koyu zeminde vurgu
  amber: "A56209",
  rose: "C53455"
};

const F = { head: "Cambria", body: "Calibri", mono: "Courier New" };
const W = 13.333, H = 7.5, M = 0.7;

/* kart gölgesi: yumuşak, lacivert tonlu */
function shadow(o) {
  o = o || {};
  return {
    type: "outer",
    angle: 90,
    blur: o.blur || 10,
    offset: o.offset == null ? 3 : o.offset,
    color: o.color || "1E2A4A",
    opacity: o.opacity == null ? 0.10 : o.opacity
  };
}

function deck(pptx, title, subject) {
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Dersler";
  pptx.company = "dersler.perinet.org";
  pptx.title = title;
  pptx.subject = subject;
  pptx.lang = "tr-TR";
  return pptx;
}

function light(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  return s;
}

function dark(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  return s;
}

/* numaralı yuvarlatılmış kare + başlık; altına çizgi çekilmez */
function head(slide, n, text, tone) {
  const color = tone || C.blue;
  slide.addShape("roundRect", {
    x: M, y: 0.46, w: 0.54, h: 0.54, rectRadius: 0.14,
    fill: { color: color }, line: { type: "none" },
    shadow: shadow({ blur: 8, offset: 2, color: color, opacity: 0.28 })
  });
  slide.addText(typeof n === "number" ? String(n).padStart(2, "0") : String(n), {
    x: M, y: 0.46, w: 0.54, h: 0.54, align: "center", valign: "middle",
    fontFace: F.body, fontSize: 13, bold: true, color: C.white, isTextBox: true, margin: 0
  });
  slide.addText(text, {
    x: M + 0.78, y: 0.4, w: W - M * 2 - 0.78, h: 0.7, align: "left", valign: "middle",
    fontFace: F.head, fontSize: 32, bold: true, color: C.ink, isTextBox: true, margin: 0,
    charSpacing: -0.5
  });
}

/* üst başlığın altındaki tek cümlelik giriş */
function lede(slide, text) {
  slide.addText(text, {
    x: M + 0.78, y: 1.12, w: W - M * 2 - 0.9, h: 0.42,
    fontFace: F.body, fontSize: 14.5, color: C.muted, isTextBox: true, margin: 0
  });
}

function card(slide, o) {
  slide.addShape("roundRect", {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: o.r == null ? 0.16 : o.r,
    fill: { color: o.fill || C.soft },
    line: { color: o.line || C.line, width: 0.75 },
    shadow: o.flat ? undefined : shadow({})
  });
}

/* formül kutusu — Courier New her yerde aynı genişlikte */
function formula(slide, text, o) {
  slide.addShape("roundRect", {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.12,
    fill: { color: o.fill || "EEF2FC" }, line: { color: o.lineColor || "CBD7F4", width: 0.75 }
  });
  slide.addText(text, {
    x: o.x, y: o.y, w: o.w, h: o.h, align: "center", valign: "middle",
    fontFace: F.mono, fontSize: o.size || 15, bold: true,
    color: o.color || C.blue, isTextBox: true, margin: 0
  });
}

/* büyük sayı + altında etiket */
function stat(slide, value, label, o) {
  slide.addText(value, {
    x: o.x, y: o.y, w: o.w, h: 0.78, align: o.align || "left", valign: "bottom",
    fontFace: F.head, fontSize: o.size || 40, bold: true, color: o.color || C.blue,
    isTextBox: true, margin: 0, charSpacing: -1
  });
  slide.addText(label, {
    x: o.x, y: o.y + 0.8, w: o.w, h: o.h ? o.h : 0.6, align: o.align || "left", valign: "top",
    fontFace: F.body, fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0
  });
}

function body(slide, text, o) {
  slide.addText(text, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontFace: F.body, fontSize: o.size || 14.5, color: o.color || C.muted,
    lineSpacingMultiple: 1.18, isTextBox: true, margin: o.margin == null ? 0 : o.margin,
    valign: o.valign || "top", align: o.align || "left", bold: o.bold || false
  });
}

function bullets(slide, items, o) {
  const runs = items.map((t, i) => ({
    text: typeof t === "string" ? t : t.text,
    options: {
      bullet: true,
      breakLine: i < items.length - 1,
      paraSpaceAfter: o.gap == null ? 9 : o.gap,
      bold: typeof t === "object" && t.bold ? true : false,
      color: (typeof t === "object" && t.color) || o.color || C.muted
    }
  }));
  slide.addText(runs, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontFace: F.body, fontSize: o.size || 14.5, color: o.color || C.muted,
    isTextBox: true, margin: 0, valign: "top"
  });
}

/* alt bilgi: küçük marka karesi + metin, sağda sayfa numarası */
function footer(slide, text, page, onDark) {
  const color = onDark ? "6A7798" : C.dim;
  slide.addShape("roundRect", {
    x: M, y: H - 0.52, w: 0.14, h: 0.14, rectRadius: 0.04,
    fill: { color: onDark ? C.limeBright : "A9E648" }, line: { type: "none" }
  });
  slide.addText(text, {
    x: M + 0.24, y: H - 0.62, w: 8, h: 0.34, fontFace: F.body, fontSize: 10.5,
    color: color, isTextBox: true, margin: 0, valign: "middle"
  });
  if (page) {
    slide.addText(String(page).padStart(2, "0"), {
      x: W - M - 1.2, y: H - 0.62, w: 1.2, h: 0.34, align: "right",
      fontFace: F.body, fontSize: 10.5, color: color, charSpacing: 1,
      isTextBox: true, margin: 0, valign: "middle"
    });
  }
}

/* koyu slaytlara sağ tarafta soluk yörünge motifi: halkalar + strobo noktaları */
function motif(slide, o) {
  o = o || {};
  const cx = o.cx == null ? 11.4 : o.cx, cy = o.cy == null ? 3.9 : o.cy;
  [1.0, 1.9, 2.8].forEach((r, i) => {
    slide.addShape("ellipse", {
      x: cx - r, y: cy - r, w: 2 * r, h: 2 * r,
      fill: { type: "none" },
      line: { color: i === 1 ? "A093FF" : "82AAFF", width: 0.75, transparency: 84 + i * 3 }
    });
  });
  const n = 9;
  for (let k = 0; k <= n; k++) {
    const u = k / n;
    const x = cx - 3.2 + 4.2 * u, y = cy + 2.2 - 4 * 2.3 * u * (1 - u);
    const d = 0.08 + 0.05 * u;
    slide.addShape("ellipse", {
      x: x - d / 2, y: y - d / 2, w: d, h: d,
      fill: { color: k === n ? C.limeBright : "82AAFF", transparency: k === n ? 0 : 55 - 35 * u },
      line: { type: "none" }
    });
  }
}

/* ortak grafik görünümü */
function chartOpts(o) {
  return Object.assign({
    showTitle: true,
    titleFontFace: F.body, titleFontSize: 12, titleColor: C.ink, titleAlign: "left",
    showLegend: false,
    chartColors: o.colors || [C.blue],
    lineSize: 2.5, lineSmooth: true, lineDataSymbol: "none",
    catAxisLabelFontFace: F.body, catAxisLabelFontSize: 9, catAxisLabelColor: C.dim,
    valAxisLabelFontFace: F.body, valAxisLabelFontSize: 9, valAxisLabelColor: C.dim,
    catAxisLineShow: true, valAxisLineShow: false,
    valGridLine: { color: "E6EBF6", size: 1 },
    catGridLine: { style: "none" },
    showCatAxisTitle: true, catAxisTitleFontFace: F.body, catAxisTitleFontSize: 9.5,
    catAxisTitleColor: C.dim,
    showValAxisTitle: true, valAxisTitleFontFace: F.body, valAxisTitleFontSize: 9.5,
    valAxisTitleColor: C.dim,
    dataBorder: { pt: 0, color: "FFFFFF" }
  }, o.extra || {});
}

module.exports = { C, F, W, H, M, shadow, deck, light, dark, head, lede, card,
                   formula, stat, body, bullets, footer, motif, chartOpts };
