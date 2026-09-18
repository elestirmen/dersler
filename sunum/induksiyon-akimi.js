const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "İndüksiyon akımı", "Fizik · Elektrik ve Manyetizma");
const FOOT = "Elektrik ve Manyetizma · Konu 03 · İndüksiyon akımı";
const CW = W - M * 2;

/* 1 · kapak */
let s = T.dark(p);
s.addText("ELEKTRİK VE MANYETİZMA · KONU 03", { x: 0.95, y: 1.7, w: 8, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("İndüksiyon akımı", { x: 0.9, y: 2.1, w: 8.6, h: 1.3, fontFace: F.head,
  fontSize: 48, bold: true, color: C.white, isTextBox: true, margin: 0 });
s.addText("Manyetik alan akım üretebilir — ama yalnızca değişirse. Dünyadaki elektriğin " +
  "neredeyse tamamı bu tek cümlenin üzerine kuruludur.", {
  x: 0.95, y: 3.6, w: 7.4, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("Φ = B·A·cosα        ε = −N · ΔΦ / Δt        ε = B·L·v", {
  x: 0.95, y: 5.0, w: 8.4, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* bobin ve yaklaşan mıknatıs */
[0, 1, 2, 3].forEach(i => {
  s.addShape("ellipse", { x: 11.4, y: 3.05 + i * 0.32, w: 1.0, h: 0.34,
    fill: { type: "none" }, line: { color: "82AAFF", width: 2.4 } });
});
s.addShape("rect", { x: 9.55, y: 3.62, w: 0.72, h: 0.4, fill: { color: "FF8FA3" },
  line: { type: "none" } });
s.addShape("rect", { x: 10.27, y: 3.62, w: 0.72, h: 0.4, fill: { color: "82AAFF" },
  line: { type: "none" } });
s.addText("N", { x: 9.55, y: 3.62, w: 0.72, h: 0.4, align: "center", valign: "middle",
  fontFace: F.body, fontSize: 12, bold: true, color: "3A0F1A", isTextBox: true, margin: 0 });
s.addText("S", { x: 10.27, y: 3.62, w: 0.72, h: 0.4, align: "center", valign: "middle",
  fontFace: F.body, fontSize: 12, bold: true, color: "0B1B3A", isTextBox: true, margin: 0 });
s.addShape("line", { x: 10.0, y: 2.95, w: 1.1, h: 0,
  line: { color: "9C8CFF", width: 2.5, endArrowType: "triangle" } });
s.addText("hareket → akım", { x: 9.3, y: 4.85, w: 3.4, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 11, color: "6A7798", isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/induksiyon-akimi.html", null, true);
s.addNotes("Açılış: mıknatısı bobinin içinde hareketsiz tut — galvanometre sıfır. Kımıldat — sapıyor. Bütün konu bu.");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: manyetik akıdan jeneratöre.");
[["Manyetik akı", "Bir yüzeyden geçen alan çizgisi sayısı: Φ = B·A·cosα.", C.blue],
 ["Faraday yasası", "İndüklenen emk, akının değişim hızıyla orantılıdır.", C.violet],
 ["Lenz yasası", "İndüksiyon akımı, kendini doğuran değişime karşı koyar.", C.lime],
 ["Akımın yönü", "Üç adımda: akı → karşı alan → sağ el.", C.amber],
 ["Hareketli çubuk", "ε = B·L·v; mekanik güç elektriğe dönüşür.", C.rose],
 ["Jeneratör", "Dönen çerçeve alternatif gerilim üretir.", C.blue]
].forEach((a, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = M + col * (3.71 + 0.4), y = 1.95 + row * 2.28;
  T.card(s, { x: x, y: y, w: 3.71, h: 2.05 });
  s.addShape("ellipse", { x: x + 0.28, y: y + 0.28, w: 0.42, h: 0.42, fill: { color: a[2] },
    line: { type: "none" } });
  s.addText(String(i + 1), { x: x + 0.28, y: y + 0.28, w: 0.42, h: 0.42, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 11.5, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(a[0], { x: x + 0.85, y: y + 0.26, w: 2.7, h: 0.46, fontFace: F.body, fontSize: 15,
    bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  T.body(s, a[1], { x: x + 0.3, y: y + 0.95, w: 3.1, h: 0.9, size: 12.5 });
});
T.footer(s, FOOT, 2);
s.addNotes("Bir önceki konuda akım alan üretiyordu; burada tersi oluyor. Simetriyi vurgula.");

/* 3 · manyetik akı */
s = T.light(p);
T.head(s, 2, "Manyetik akı", C.blue);
T.lede(s, "Bir yüzeyden geçen manyetik alan çizgilerinin sayısı.");
T.formula(s, "Φ = B · A · cosα          birimi: weber (Wb)          1 Wb = 1 T·m²", {
  x: M, y: 1.95, w: CW, h: 0.8, size: 16 });
[["α = 0°", "Alan yüzeye dik", "Φ = B·A (en büyük)", C.lime],
 ["α = 60°", "Alan yüzeyle eğik", "Φ = 0,5 · B·A", C.amber],
 ["α = 90°", "Alan yüzeye paralel", "Φ = 0 (sıfır)", C.rose]].forEach((r, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 2.95, w: 3.71, h: 1.65 });
  s.addText(r[0], { x: x + 0.3, y: 3.1, w: 3.1, h: 0.45, fontFace: "Courier New", fontSize: 16,
    bold: true, color: r[3], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: x + 0.3, y: 3.6, w: 3.1, h: 0.35, fontFace: F.body, fontSize: 12.5,
    color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: x + 0.3, y: 4.0, w: 3.1, h: 0.4, fontFace: F.body, fontSize: 13,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 4.85, w: CW, h: 1.55, fill: C.softer });
s.addText("Akı üç yoldan değişir", { x: M + 0.35, y: 5.0, w: 4, h: 0.4, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
[["B değişirse", "mıknatıs yaklaşır ya da uzaklaşır", C.blue],
 ["A değişirse", "çerçeve büyür, küçülür ya da devre kapanır", C.violet],
 ["α değişirse", "çerçeve alan içinde döner", C.lime]].forEach((r, i) => {
  const x = M + 0.35 + i * 3.85;
  s.addText(r[0], { x: x, y: 5.45, w: 3.6, h: 0.35, fontFace: "Courier New", fontSize: 13,
    bold: true, color: r[2], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: x, y: 5.8, w: 3.6, h: 0.45, fontFace: F.body, fontSize: 12,
    color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 3);
s.addNotes("α, alan ile yüzeyin NORMALİ arasındaki açıdır; yüzeyin kendisiyle değil. Bu ayrım sınavda sorulur.");

/* 4 · Faraday yasası */
s = T.light(p);
T.head(s, 3, "Faraday indüksiyon yasası", C.violet);
T.lede(s, "Akı değişirse emk indüklenir; belirleyici olan değişimin hızıdır.");
T.formula(s, "ε = −N · ΔΦ / Δt          I = ε / R", { x: M, y: 1.95, w: 6.5, h: 0.8,
  size: 17, fill: "F1EDFB", color: C.violet });
const FT = [], FP = [];
for (let i = 0; i <= 60; i++) {
  const t = i * 0.1;
  FT.push(+t.toFixed(1));
  FP.push(+(t < 2 ? t * 1.5 : (t < 4 ? 3 : 3 - (t - 4) * 1.5)).toFixed(2));
}
s.addChart(p.ChartType.scatter, [{ name: "t", values: FT }, { name: "Φ", values: FP }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "Akı – zaman: eğim emk'yi verir",
    catAxisTitle: "t (s)", valAxisTitle: "Φ (mWb)", valAxisMinVal: 0, valAxisMaxVal: 4 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
[["0 – 2 s", "Akı artıyor", "emk var, bir yönde", C.lime],
 ["2 – 4 s", "Akı sabit", "emk yok: I = 0", C.dim],
 ["4 – 6 s", "Akı azalıyor", "emk var, ters yönde", C.rose]].forEach((r, i) => {
  const y = 2.95 + i * 0.92;
  T.card(s, { x: M + 6.85, y: y, w: CW - 6.85, h: 0.8, fill: C.softer });
  s.addText(r[0], { x: M + 7.15, y: y, w: 1.2, h: 0.8, valign: "middle", fontFace: "Courier New",
    fontSize: 12, bold: true, color: r[3], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 8.4, y: y, w: 1.6, h: 0.8, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 10.0, y: y, w: 1.8, h: 0.8, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 12, bold: true, color: r[3], isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 6.85, y: 5.7, w: CW - 6.85, h: 0.7, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Güçlü ama sabit alan ", options: { bold: true, color: C.amber } },
  { text: "hiçbir akım üretmez. Belirleyici olan değişimdir.", options: { color: C.muted } }],
  { x: M + 7.15, y: 5.7, w: 4.7, h: 0.7, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Grafiğin eğimi emk'dir: matematikteki türev kavramının fizikteki en somut karşılığı.");

/* 5 · Lenz yasası */
s = T.light(p);
T.head(s, 4, "Lenz yasası", C.lime);
T.lede(s, "İndüksiyon akımı, kendisini doğuran akı değişimine karşı koyacak yönde akar.");
[["Mıknatıs yaklaşırken", "Bobinden geçen akı artar. İndüksiyon akımı, artışı engelleyecek " +
  "yönde alan üretir: mıknatısa aynı kutbunu çevirir ve onu iter.", "itme", C.blue],
 ["Mıknatıs uzaklaşırken", "Akı azalır. Akım, azalmayı telafi edecek yönde alan üretir: " +
  "zıt kutup oluşturur ve mıknatısı çeker.", "çekme", C.violet]
].forEach((a, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 1.95, w: 5.85, h: 2.0 });
  s.addText(a[0], { x: x + 0.35, y: 2.15, w: 4.0, h: 0.42, fontFace: F.body, fontSize: 15,
    bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(a[2], { x: x + 4.3, y: 2.15, w: 1.25, h: 0.42, align: "right", valign: "middle",
    fontFace: "Courier New", fontSize: 14, bold: true, color: a[3], isTextBox: true, margin: 0 });
  T.body(s, a[1], { x: x + 0.35, y: 2.7, w: 5.15, h: 1.1, size: 13 });
});
T.card(s, { x: M, y: 4.2, w: CW, h: 1.15, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Eksi işaretinin anlamı: ", options: { bold: true, color: C.lime } },
  { text: "Lenz yasası, enerji korunumunun indüksiyondaki yüzüdür. Mıknatısı hareket " +
    "ettirmek için yaptığın iş, devrede üretilen elektrik enerjisine dönüşür — bedava " +
    "elektrik yoktur.", options: { color: C.muted } }],
  { x: M + 0.35, y: 4.2, w: CW - 0.7, h: 1.15, valign: "middle", fontFace: F.body,
    fontSize: 13, isTextBox: true, margin: 0 });
T.card(s, { x: M, y: 5.6, w: CW, h: 0.8, fill: "FCECF0", line: "F3C9D4" });
s.addText([{ text: "Lenz olmasaydı ne olurdu? ", options: { bold: true, color: C.rose } },
  { text: "İndüksiyon akımı değişimi desteklerdi; sistem kendi kendini hızlandırır ve " +
    "yoktan enerji üretirdi. Eksi işareti, enerji korunumunun bekçisidir.",
    options: { color: C.muted } }],
  { x: M + 0.35, y: 5.6, w: CW - 0.7, h: 0.8, valign: "middle", fontFace: F.body,
    fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Bakır boru deneyi burada anlatılır: mıknatıs boruda yavaşlar çünkü indüklenen akımlar onu frenler.");

/* 6 · akımın yönü */
s = T.light(p);
T.head(s, 5, "İndüksiyon akımının yönü", C.amber);
T.lede(s, "Üç adımda çözülür; ezber gerekmez.");
[["1", "Akıyı belirle", "Devreden geçen akının yönünü ve artıyor mu azalıyor mu olduğunu bul."],
 ["2", "Karşı alanı bul", "Lenz'e göre indüksiyon akımının hangi yönde alan üretmesi " +
  "gerektiğini belirle: artışa zıt, azalmaya aynı yönde."],
 ["3", "Sağ eli kullan", "Bu alanı üretecek akım yönünü sağ el kuralıyla belirle."]
].forEach((a, i) => {
  const y = 1.95 + i * 1.15;
  T.card(s, { x: M, y: y, w: 7.3, h: 1.0 });
  s.addShape("ellipse", { x: M + 0.3, y: y + 0.28, w: 0.44, h: 0.44, fill: { color: C.amber },
    line: { type: "none" } });
  s.addText(a[0], { x: M + 0.3, y: y + 0.28, w: 0.44, h: 0.44, align: "center", valign: "middle",
    fontFace: F.body, fontSize: 12, bold: true, color: C.white, isTextBox: true, margin: 0 });
  s.addText(a[1], { x: M + 0.95, y: y + 0.1, w: 1.9, h: 0.8, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.body(s, a[2], { x: M + 2.95, y: y + 0.12, w: 4.2, h: 0.78, size: 12 });
});
T.card(s, { x: M, y: 5.45, w: 7.3, h: 0.95, fill: C.softer });
s.addText([{ text: "Pratik kontrol: ", options: { bold: true, color: C.ink } },
  { text: "İndüksiyon akımının ürettiği alan, bobinin içinde her zaman değişime karşı çıkar. " +
    "Yönü bulduktan sonra bu soruyu kendine sor.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.45, w: 6.6, h: 0.95, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.card(s, { x: M + 7.65, y: 1.95, w: CW - 7.65, h: 4.45, fill: "EAF0FD", line: "C7D7F7" });
s.addText("Akı ne zaman değişir?", { x: M + 8.0, y: 2.2, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.blue, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Mıknatıs bobine yaklaşır ya da uzaklaşırsa.",
  "Bobin, alan içinde döner ya da eğilirse.",
  "Devrenin çevrelediği alan büyür ya da küçülürse.",
  "Komşu devredeki akım değişirse (transformatör).",
  "Alan kaynağı kapatılır ya da açılırsa."],
  { x: M + 8.0, y: 2.75, w: 3.3, h: 3.4, size: 12.5, gap: 13 });
T.footer(s, FOOT, 6);
s.addNotes("Üç adımı tahtada bir örnekle uygula; öğrenciler ikinci adımı sık atlıyor.");

/* 7 · hareketli çubuk */
s = T.light(p);
T.head(s, 6, "Raylar üzerinde hareketli çubuk", C.rose);
T.lede(s, "En sade indüksiyon üreteci: iten el, elektriği üretir.");
T.formula(s, "ε = B · L · v        I = ε / R        F = B · I · L", { x: M, y: 1.95, w: 6.3,
  h: 0.8, size: 16, fill: "FCECF0", color: C.rose });
/* şema */
T.card(s, { x: M, y: 2.95, w: 6.3, h: 3.45, fill: C.softer });
s.addShape("line", { x: M + 0.8, y: 3.5, w: 4.7, h: 0, line: { color: C.dim, width: 2.5 } });
s.addShape("line", { x: M + 0.8, y: 5.5, w: 4.7, h: 0, line: { color: C.dim, width: 2.5 } });
s.addShape("line", { x: M + 0.8, y: 3.5, w: 0, h: 2.0, line: { color: C.dim, width: 2.5 } });
s.addShape("rect", { x: M + 3.1, y: 3.5, w: 0.12, h: 2.0, fill: { color: C.rose },
  line: { type: "none" } });
s.addShape("line", { x: M + 3.4, y: 4.5, w: 1.0, h: 0,
  line: { color: C.rose, width: 3, endArrowType: "triangle" } });
s.addText("v", { x: M + 3.7, y: 4.1, w: 0.5, h: 0.35, fontFace: "Courier New", fontSize: 14,
  bold: true, color: C.rose, isTextBox: true, margin: 0 });
s.addText("R", { x: M + 0.35, y: 4.3, w: 0.4, h: 0.4, fontFace: "Courier New", fontSize: 14,
  bold: true, color: C.dim, isTextBox: true, margin: 0 });
s.addText("L", { x: M + 2.7, y: 4.3, w: 0.4, h: 0.4, fontFace: "Courier New", fontSize: 14,
  bold: true, color: C.muted, isTextBox: true, margin: 0 });
/* alan işaretleri — L etiketinin yanı boş bırakılır */
[[1.25, 3.75], [1.9, 3.75], [2.55, 3.75], [1.25, 4.95], [1.9, 4.95], [2.55, 4.95],
 [3.55, 3.75], [4.2, 3.75], [4.85, 3.75], [3.55, 4.35], [4.2, 4.35], [4.85, 4.35],
 [3.55, 4.95], [4.2, 4.95], [4.85, 4.95]].forEach(q => {
  s.addText("×", { x: M + q[0], y: q[1], w: 0.3, h: 0.3, align: "center", fontFace: F.body,
    fontSize: 13, color: "9BA6C4", isTextBox: true, margin: 0 });
});
s.addText("B sayfa düzlemine dik, içeri doğru", { x: M + 0.8, y: 5.75, w: 4.9, h: 0.35,
  align: "center", fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Çubuk hareket ettikçe devrenin çevrelediği alan büyür; akı değişir.",
  "İndüklenen emk ε = B·L·v, hızla doğru orantılıdır.",
  "Oluşan akım, çubuğa harekete zıt yönde bir kuvvet uygular (Lenz).",
  "Sabit hızda itmek için bu kuvvete eşit kuvvet uygulanmalıdır.",
  "Uygulanan mekanik güç (F·v), devrede harcanan elektriksel güce (I²R) eşittir."],
  { x: M + 6.65, y: 2.95, w: CW - 6.65, h: 2.5, size: 13, gap: 15 });
T.card(s, { x: M + 6.65, y: 5.45, w: CW - 6.65, h: 0.95, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Enerji nereden geliyor? ", options: { bold: true, color: C.lime } },
  { text: "Çubuğu iten elden. Elektrik enerjisi yoktan var olmaz; mekanik enerji dönüşür.",
    options: { color: C.muted } }],
  { x: M + 6.95, y: 5.45, w: 4.6, h: 0.95, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("Güç dengesini sayısal olarak da göster: F·v = I²R eşitliği öğrenciyi ikna ediyor.");

/* 8 · jeneratör */
s = T.light(p);
T.head(s, 7, "Jeneratör: dönen çerçeve", C.blue);
T.lede(s, "Düzgün alanda sabit hızla dönen çerçeve, alternatif gerilim üretir.");
const GT = [], GP = [], GE = [];
for (let i = 0; i <= 72; i++) {
  const a = (i * 5 * Math.PI) / 180;
  GT.push(i * 5);
  GP.push(+Math.cos(a).toFixed(3));
  GE.push(+Math.sin(a).toFixed(3));
}
s.addChart(p.ChartType.scatter,
  [{ name: "açı", values: GT }, { name: "akı Φ (bağıl)", values: GP },
   { name: "emk ε (bağıl)", values: GE }],
  Object.assign(T.chartOpts({ colors: [C.violet, C.blue], extra: {
    title: "Akı ve emk çeyrek periyot faz farklıdır (bağıl değerler)",
    catAxisTitle: "çerçevenin döndüğü açı (°)", valAxisTitle: "bağıl değer",
    valAxisMinVal: -1.2, valAxisMaxVal: 1.2, showLegend: true, legendPos: "b",
    legendFontFace: F.body, legendFontSize: 11, legendColor: C.muted } }),
  { x: M, y: 1.95, w: 7.1, h: 4.45 }));
T.formula(s, "Φ = B·A·cos(ω·t)\nε = N·B·A·ω·sin(ω·t)", { x: M + 7.45, y: 1.95, w: CW - 7.45,
  h: 1.0, size: 12 });
T.bullets(s, [
  "Çerçeve alana dikken (Φ en büyük) emk sıfırdır.",
  "Çerçeve alana paralelken (Φ = 0) emk en büyüktür.",
  "Değişimin en hızlı olduğu an, emk'nin en büyük olduğu andır.",
  "Dönme hızı iki katına çıkarsa hem frekans hem tepe gerilimi iki katına çıkar.",
  "Türkiye'de şebeke frekansı 50 Hz: çerçeve saniyede 50 tur atar."],
  { x: M + 7.45, y: 3.15, w: CW - 7.45, h: 2.4, size: 12.5, gap: 13 });
T.card(s, { x: M + 7.45, y: 5.7, w: CW - 7.45, h: 0.7, fill: C.softer });
s.addText([{ text: "Santralde ne değişir? ", options: { bold: true, color: C.ink } },
  { text: "Yalnızca türbini döndüren kaynak: su, rüzgâr, buhar.", options: { color: C.muted } }],
  { x: M + 7.75, y: 5.7, w: 4.0, h: 0.7, valign: "middle", fontFace: F.body, fontSize: 11.5,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 8);
s.addNotes("Φ ve ε'nin faz farkı en çok sorulan yer: Φ en büyükken ε sıfırdır, tersi değil.");

/* 9 · uygulamalar */
s = T.light(p);
T.head(s, 8, "Nerede karşımıza çıkar?", C.violet);
T.lede(s, "Elektrik enerjisinin neredeyse tamamı indüksiyonla üretilir.");
[["Jeneratör", "Su, rüzgâr ya da buhar türbini çevirir; dönen çerçeve gerilim üretir.",
  "elektriğin kaynağı", C.blue],
 ["Transformatör", "Değişen akı, ikinci bobinde gerilim indükler.", "sonraki konu", C.violet],
 ["İndüksiyonlu ocak", "Tencerenin tabanında indüklenen girdap akımları ısı üretir.",
  "girdap akımı", C.lime],
 ["Manyetik kart okuyucu", "Şeritteki manyetik desen, kafada akım darbeleri oluşturur.",
  "veri okuma", C.amber],
 ["Manyetik fren", "Hareketli metalde indüklenen akımlar, hareketi frenler.",
  "tren ve lunapark", C.rose],
 ["Kablosuz şarj", "İki bobin arasında akı köprüsü kurulur; temas gerekmez.",
  "telefon şarjı", C.blue]
].forEach((a, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = M + col * (3.71 + 0.4), y = 1.95 + row * 2.28;
  T.card(s, { x: x, y: y, w: 3.71, h: 2.05 });
  s.addText(a[0], { x: x + 0.3, y: y + 0.22, w: 3.1, h: 0.42, fontFace: F.body, fontSize: 14.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  T.body(s, a[1], { x: x + 0.3, y: y + 0.72, w: 3.1, h: 0.9, size: 12 });
  s.addText(a[2], { x: x + 0.3, y: y + 1.6, w: 3.1, h: 0.32, fontFace: "Courier New",
    fontSize: 11.5, bold: true, color: a[3], isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 9);
s.addNotes("İndüksiyonlu ocakta tencerenin manyetik olması gerektiğini sor: cam ve alüminyum neden ısınmaz?");

/* 10–12 · çözümlü örnekler */
function ornek(no, baslik, soru, cevap, adimlar, notlar, sayfa, tone) {
  const sl = T.light(p);
  T.head(sl, no, baslik, tone);
  T.lede(sl, "Çözümlerde emk'nin büyüklüğü hesaplanmıştır; işaret yönü Lenz ile bulunur.");
  T.card(sl, { x: M, y: 1.95, w: 4.5, h: 4.45, fill: C.softer });
  sl.addText("SORU", { x: M + 0.35, y: 2.2, w: 3.8, h: 0.3, fontFace: F.body, fontSize: 11,
    bold: true, color: tone, charSpacing: 2, isTextBox: true, margin: 0 });
  T.body(sl, soru, { x: M + 0.35, y: 2.6, w: 3.8, h: 2.9, size: 14 });
  sl.addText("CEVAPLAR", { x: M + 0.35, y: 5.55, w: 3.8, h: 0.28, fontFace: F.body, fontSize: 10,
    bold: true, color: C.dim, charSpacing: 2, isTextBox: true, margin: 0 });
  T.formula(sl, cevap, { x: M + 0.35, y: 5.85, w: 3.8, h: 0.5, size: 12.5, fill: "FFFFFF",
    color: tone });
  const gap = 0.25, h = (4.45 - (adimlar.length - 1) * gap) / adimlar.length;
  adimlar.forEach((a, i) => {
    const y = 1.95 + i * (h + gap);
    T.card(sl, { x: M + 4.85, y: y, w: CW - 4.85, h: h });
    sl.addShape("ellipse", { x: M + 5.15, y: y + (h - 0.44) / 2, w: 0.44, h: 0.44,
      fill: { color: tone }, line: { type: "none" } });
    sl.addText(a[0], { x: M + 5.15, y: y + (h - 0.44) / 2, w: 0.44, h: 0.44, align: "center",
      valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
      isTextBox: true, margin: 0 });
    sl.addText(a[1], { x: M + 5.8, y: y, w: CW - 6.1, h: h, valign: "middle", fontFace: F.body,
      fontSize: 13.5, color: C.muted, lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
  });
  T.footer(sl, FOOT, sayfa);
  sl.addNotes(notlar);
}

ornek(9, "Çözümlü örnek · akı değişiminden emk",
  "200 sarımlı bir bobinden geçen manyetik akı, 0,1 saniyede 4·10⁻³ Wb'den 1·10⁻³ Wb'ye " +
  "düşüyor.\n\n(a) İndüklenen emk'nin büyüklüğü nedir?\n" +
  "(b) Bobinin direnci 3 Ω ise akım kaç A'dir?",
  "(a) 6 V · (b) 2 A",
  [["a", "ΔΦ = 1·10⁻³ − 4·10⁻³ = −3·10⁻³ Wb (azalma)"],
   ["2", "|ε| = N·|ΔΦ|/Δt = 200 · 3·10⁻³ / 0,1 = 6 V"],
   ["b", "I = ε/R = 6 / 3 = 2 A"],
   ["!", "Akı azaldığı için indüksiyon akımı, akıyı sürdürecek yönde akar (Lenz)."]],
  "Sarım sayısının çarpan olduğunu vurgula: aynı akı değişimi 200 kez sayılıyor.",
  10, C.violet);

ornek(10, "Çözümlü örnek · hareketli çubuk",
  "0,5 T'lık düzgün alanda, 40 cm uzunluğundaki çubuk raylar üzerinde 5 m/s sabit hızla " +
  "kayıyor. Devrenin toplam direnci 2 Ω'dur.\n\n" +
  "(a) emk ve akım nedir?\n(b) Çubuğu itmek için gereken kuvvet ve güç nedir?",
  "(a) 1 V · 0,5 A — (b) 0,1 N · 0,5 W",
  [["a", "ε = B·L·v = 0,5 · 0,4 · 5 = 1 V → I = ε/R = 1/2 = 0,5 A"],
   ["b", "Çubuğa etkiyen karşı kuvvet: F = B·I·L = 0,5 · 0,5 · 0,4 = 0,1 N"],
   ["2", "Sabit hız için aynı büyüklükte kuvvet uygulanır: P = F·v = 0,1 · 5 = 0,5 W"],
   ["!", "Kontrol: elektriksel güç I²R = 0,25 · 2 = 0,5 W. İki güç eşit — enerji korunuyor."]],
  "Son satırdaki eşitlik bu konunun kapanış cümlesi: mekanik enerji elektrik enerjisine dönüşüyor.",
  11, C.rose);

ornek(11, "Çözümlü örnek · jeneratör",
  "Alanı 200 cm² olan 100 sarımlı çerçeve, 0,5 T'lık alanda saniyede 2 tur atacak şekilde " +
  "dönüyor.\n\n(a) Açısal hız nedir?\n(b) Üretilen emk'nin tepe değeri kaç volttur?",
  "(a) ≈ 12,6 rad/s · (b) ≈ 12,6 V",
  [["a", "ω = 2π·f = 2π · 2 ≈ 12,6 rad/s"],
   ["b", "A = 200 cm² = 0,02 m²"],
   ["2", "ε(tepe) = N·B·A·ω = 100 · 0,5 · 0,02 · 12,6"],
   ["3", "ε(tepe) ≈ 12,6 V. Dönme hızı iki katına çıkarsa tepe gerilimi de iki katına çıkar."]],
  "Birim dönüşümünü (cm² → m²) atlayan öğrenci 10.000 kat hata yapıyor; burada durup göster.",
  12, C.blue);

/* 13 · hatalar */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Güçlü alan akım üretir", "Akım ancak akı değişirse üretilir; sabit alan işe yaramaz."],
 ["Akı sıfırsa emk de sıfırdır", "Belirleyici olan akının değeri değil, değişim hızıdır."],
 ["Yalnız B değişirse akı değişir", "A ya da α değişimi de akıyı değiştirir."],
 ["ε = B·L·v her durumda geçerli", "Yalnızca çubuk alana ve kendine dik hareket ederken."],
 ["Jeneratörde Φ ve ε aynı anda büyük", "Aralarında çeyrek periyot faz farkı vardır."],
 ["Lenz yasası bir tercihtir", "Enerji korunumunun zorunlu sonucudur."]
].forEach((h, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * (5.85 + 0.23), y = 1.95 + row * 1.52;
  T.card(s, { x: x, y: y, w: 5.85, h: 1.35, fill: C.white });
  s.addText("✗", { x: x + 0.25, y: y + 0.18, w: 0.35, h: 0.35, align: "center", valign: "middle",
    fontFace: F.body, fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
  s.addText(h[0], { x: x + 0.68, y: y + 0.15, w: 4.9, h: 0.42, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("✓", { x: x + 0.25, y: y + 0.68, w: 0.35, h: 0.35, align: "center", valign: "middle",
    fontFace: F.body, fontSize: 15, bold: true, color: C.lime, isTextBox: true, margin: 0 });
  s.addText(h[1], { x: x + 0.68, y: y + 0.62, w: 4.9, h: 0.55, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 13);
s.addNotes("İlk iki madde aynı kökten: 'değişim' kelimesinin atlanması.");

/* 14 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Akı değişirse akım doğar", "Φ = B·A·cosα; B, A ya da α değişimi yeterlidir."],
 ["Belirleyici olan değişim hızı", "ε = −N·ΔΦ/Δt: hızlı değişim büyük emk demektir."],
 ["Lenz: doğa değişime direnir", "İndüksiyon akımı, kendini doğuran değişime karşı koyar."],
 ["Enerji yoktan var olmaz", "Üretilen elektrik, harcanan mekanik enerjiye eşittir."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5, fontFace: F.head,
    fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 4.4, h: 0.45, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 5.55, y: y - 0.04, w: 5.4, h: 0.62, fontFace: F.body, fontSize: 13.5,
    color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([{ text: "Mıknatıs–bobin deneyi, jeneratör ve bakır boru:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/induksiyon-akimi.html",
    options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta bakır boru bölümünü aç: aynı mıknatıs plastikte 0,49 s, bakırda 5,5 s'de düşüyor.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/induksiyon-akimi.pptx" })
  .then(f => console.log("yazıldı:", f));
