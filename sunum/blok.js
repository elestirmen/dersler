/* Ortak slayt blokları — her sunumda tekrar eden düzenler. tema.js üzerine kuruludur. */

const T = require("./tema.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

/* kapak: koyu zemin, üst başlık, büyük başlık, giriş cümlesi, formül satırı */
function kapak(p, o) {
  const s = T.dark(p);
  s.addText(o.ust, { x: 0.95, y: 1.7, w: 8.4, h: 0.35, fontFace: F.body, fontSize: 13,
    bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
  s.addText(o.baslik, { x: 0.9, y: 2.1, w: 8.6, h: 1.3, fontFace: F.head,
    fontSize: o.baslik.length > 24 ? 42 : 48, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(o.lede, { x: 0.95, y: 3.6, w: 7.4, h: 1.15, fontFace: F.body, fontSize: 15.5,
    color: "C3CEE8", lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
  s.addText(o.formul, { x: 0.95, y: 5.05, w: 8.6, h: 0.5, fontFace: "Courier New",
    fontSize: 13.5, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  T.footer(s, o.link, null, true);
  if (o.not) s.addNotes(o.not);
  return s;
}

/* altı kartlık "bu derste" ızgarası */
function buDerste(p, o) {
  const s = T.light(p);
  T.head(s, 1, "Bu derste", C.blue);
  T.lede(s, o.lede);
  o.kartlar.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (3.71 + 0.4), y = 1.95 + row * 2.28;
    T.card(s, { x: x, y: y, w: 3.71, h: 2.05 });
    s.addShape("ellipse", { x: x + 0.28, y: y + 0.28, w: 0.42, h: 0.42,
      fill: { color: a[2] }, line: { type: "none" } });
    s.addText(String(i + 1), { x: x + 0.28, y: y + 0.28, w: 0.42, h: 0.42, align: "center",
      valign: "middle", fontFace: F.body, fontSize: 11.5, bold: true, color: C.white,
      isTextBox: true, margin: 0 });
    s.addText(a[0], { x: x + 0.85, y: y + 0.26, w: 2.7, h: 0.46, fontFace: F.body,
      fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    T.body(s, a[1], { x: x + 0.3, y: y + 0.95, w: 3.1, h: 0.9, size: 12.5 });
  });
  T.footer(s, o.foot, o.sayfa);
  if (o.not) s.addNotes(o.not);
  return s;
}

/* altı kartlık uygulama/örnek ızgarası (etiketli) */
function kartlar6(p, o) {
  const s = T.light(p);
  T.head(s, o.no, o.baslik, o.tone || C.blue);
  T.lede(s, o.lede);
  o.kartlar.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (3.71 + 0.4), y = 1.95 + row * 2.28;
    T.card(s, { x: x, y: y, w: 3.71, h: 2.05 });
    s.addText(a[0], { x: x + 0.3, y: y + 0.22, w: 3.1, h: 0.42, fontFace: F.body,
      fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
    T.body(s, a[1], { x: x + 0.3, y: y + 0.72, w: 3.1, h: 0.9, size: 12 });
    s.addText(a[2], { x: x + 0.3, y: y + 1.6, w: 3.1, h: 0.32, fontFace: "Courier New",
      fontSize: 11.5, bold: true, color: a[3], isTextBox: true, margin: 0 });
  });
  T.footer(s, o.foot, o.sayfa);
  if (o.not) s.addNotes(o.not);
  return s;
}

/* soru solda, adımlar sağda çözümlü örnek */
function ornek(p, o) {
  const s = T.light(p);
  T.head(s, o.no, o.baslik, o.tone);
  T.lede(s, o.lede);
  T.card(s, { x: M, y: 1.95, w: 4.5, h: 4.45, fill: C.softer });
  s.addText("SORU", { x: M + 0.35, y: 2.2, w: 3.8, h: 0.3, fontFace: F.body, fontSize: 11,
    bold: true, color: o.tone, charSpacing: 2, isTextBox: true, margin: 0 });
  T.body(s, o.soru, { x: M + 0.35, y: 2.6, w: 3.8, h: 2.9, size: 14 });
  s.addText("CEVAPLAR", { x: M + 0.35, y: 5.55, w: 3.8, h: 0.28, fontFace: F.body,
    fontSize: 10, bold: true, color: C.dim, charSpacing: 2, isTextBox: true, margin: 0 });
  T.formula(s, o.cevap, { x: M + 0.35, y: 5.85, w: 3.8, h: 0.5, size: 12.5, fill: "FFFFFF",
    color: o.tone });
  const gap = 0.25, h = (4.45 - (o.adimlar.length - 1) * gap) / o.adimlar.length;
  o.adimlar.forEach((a, i) => {
    const y = 1.95 + i * (h + gap);
    T.card(s, { x: M + 4.85, y: y, w: CW - 4.85, h: h });
    s.addShape("ellipse", { x: M + 5.15, y: y + (h - 0.44) / 2, w: 0.44, h: 0.44,
      fill: { color: o.tone }, line: { type: "none" } });
    s.addText(a[0], { x: M + 5.15, y: y + (h - 0.44) / 2, w: 0.44, h: 0.44, align: "center",
      valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
      isTextBox: true, margin: 0 });
    s.addText(a[1], { x: M + 5.8, y: y, w: CW - 6.1, h: h, valign: "middle", fontFace: F.body,
      fontSize: 13.5, color: C.muted, lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
  });
  T.footer(s, o.foot, o.sayfa);
  if (o.not) s.addNotes(o.not);
  return s;
}

/* altı maddelik yanlış/doğru kartları */
function hatalar(p, o) {
  const s = T.light(p);
  T.head(s, o.no, "Sık yapılan hatalar", C.rose);
  T.lede(s, o.lede || "Sınavda puan kaybettiren altı klasik.");
  o.maddeler.forEach((h, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * (5.85 + 0.23), y = 1.95 + row * 1.52;
    T.card(s, { x: x, y: y, w: 5.85, h: 1.35, fill: C.white });
    s.addText("✗", { x: x + 0.25, y: y + 0.18, w: 0.35, h: 0.35, align: "center",
      valign: "middle", fontFace: F.body, fontSize: 15, bold: true, color: C.rose,
      isTextBox: true, margin: 0 });
    s.addText(h[0], { x: x + 0.68, y: y + 0.15, w: 4.9, h: 0.42, valign: "middle",
      fontFace: F.body, fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
    s.addText("✓", { x: x + 0.25, y: y + 0.68, w: 0.35, h: 0.35, align: "center",
      valign: "middle", fontFace: F.body, fontSize: 15, bold: true, color: C.lime,
      isTextBox: true, margin: 0 });
    s.addText(h[1], { x: x + 0.68, y: y + 0.62, w: 4.9, h: 0.55, valign: "middle",
      fontFace: F.body, fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
  });
  T.footer(s, o.foot, o.sayfa);
  if (o.not) s.addNotes(o.not);
  return s;
}

/* koyu zeminli kapanış */
function ozet(p, o) {
  const s = T.dark(p);
  s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
    bold: true, color: C.white, isTextBox: true, margin: 0 });
  o.maddeler.forEach((k, i) => {
    const y = 2.3 + i * 1.02;
    s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5,
      fontFace: F.head, fontSize: 19, bold: true, color: C.limeBright, isTextBox: true,
      margin: 0 });
    s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 4.4, h: 0.45, fontFace: F.body,
      fontSize: 15.5, bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
    s.addText(k[1], { x: M + 5.55, y: y - 0.04, w: 5.4, h: 0.62, fontFace: F.body,
      fontSize: 13.5, color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
  });
  s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
    fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
  s.addText([{ text: o.linkMetin + "  ", options: { color: "AEBBD6" } },
    { text: o.link, options: { color: C.limeBright, bold: true } }],
    { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body,
      fontSize: 13, isTextBox: true, margin: 0 });
  if (o.not) s.addNotes(o.not);
  return s;
}

/* satırlı tablo (ilk satır başlık) */
function tablo(s, rows, o) {
  const cols = o.cols;
  rows.forEach((r, i) => {
    const y = o.y + i * o.step;
    if (i > 0) {
      s.addShape("roundRect", { x: o.x, y: y, w: o.w, h: o.step - 0.08, rectRadius: 0.08,
        fill: { color: o.vurgu === i ? "EAF7DC" : (i % 2 ? C.white : C.softer) },
        line: { color: o.vurgu === i ? "CFE8B2" : C.line, width: 1 } });
    }
    r.forEach((txt, j) => {
      s.addText(txt, { x: cols[j][0], y: y, w: cols[j][1], h: o.step - 0.08, valign: "middle",
        fontFace: i === 0 ? F.body : (o.mono && j > 0 ? "Courier New" : F.body),
        fontSize: i === 0 ? 11.5 : (o.size || 12.5), bold: i === 0 || j === 0,
        color: i === 0 ? C.dim : (o.vurgu === i ? C.lime : (j === 0 ? C.ink : C.muted)),
        charSpacing: i === 0 ? 1 : 0, isTextBox: true, margin: 0 });
    });
  });
}

module.exports = { kapak, buDerste, kartlar6, ornek, hatalar, ozet, tablo, CW };
