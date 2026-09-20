const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Transformatörler", "Fizik · Elektrik ve Manyetizma");
const FOOT = "Elektrik ve Manyetizma · Konu 04 · Transformatörler";
const CW = W - M * 2;

/* 1 · kapak */
let s = T.dark(p);
s.addText("ELEKTRİK VE MANYETİZMA · KONU 04", { x: 0.95, y: 1.7, w: 8, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("Transformatörler", { x: 0.9, y: 2.1, w: 8.6, h: 1.3, fontFace: F.head,
  fontSize: 48, bold: true, color: C.white, isTextBox: true, margin: 0 });
s.addText("Gerilimi yükseltir ya da düşürür, ama gücü üretmez. Gerilimi kaç kat büyütürse " +
  "akımı o kadar küçültür — elektriği yüzlerce kilometre öteye taşıyabilmemizin tek sebebi budur.", {
  x: 0.95, y: 3.6, w: 7.4, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("V₁ / V₂ = N₁ / N₂        I₁ / I₂ = N₂ / N₁        P₁ = P₂ (ideal)", {
  x: 0.95, y: 5.0, w: 8.4, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* nüve ve iki bobin */
s.addShape("rect", { x: 9.9, y: 2.95, w: 2.5, h: 1.9, fill: { type: "none" },
  line: { color: "6A7798", width: 9 } });
[0, 1, 2].forEach(i => {
  s.addShape("ellipse", { x: 9.62, y: 3.25 + i * 0.44, w: 0.56, h: 0.3,
    fill: { type: "none" }, line: { color: "FF8FA3", width: 2.2 } });
});
[0, 1, 2, 3, 4].forEach(i => {
  s.addShape("ellipse", { x: 12.12, y: 3.1 + i * 0.34, w: 0.56, h: 0.26,
    fill: { type: "none" }, line: { color: "82AAFF", width: 2.2 } });
});
s.addText("N₁", { x: 9.35, y: 5.0, w: 0.9, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 12, bold: true, color: "FF8FA3", isTextBox: true, margin: 0 });
s.addText("N₂", { x: 12.05, y: 5.0, w: 0.9, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 12, bold: true, color: "82AAFF", isTextBox: true, margin: 0 });
s.addText("ortak akı iki bobini birbirine bağlar", { x: 9.0, y: 5.4, w: 4.3, h: 0.3,
  align: "center", fontFace: F.body, fontSize: 11, color: "6A7798", isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/transformatorler.html", null, true);
s.addNotes("Açılış sorusu: 'Şehre gelen elektrik neden 154 kV ile taşınıp evde 220 V'a indiriliyor?'");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: nüveden enerji iletimine.");
[["Yapısı", "Primer, sekonder ve iki bobini bağlayan demir nüve.", C.blue],
 ["Çalışma ilkesi", "Değişen akı, ikinci bobinde emk indükler.", C.violet],
 ["Sarım ve gerilim", "V doğru orantılı: V₂ = V₁·N₂/N₁.", C.lime],
 ["Akım ve güç", "Akım ters orantılı; ideal durumda P₁ = P₂.", C.amber],
 ["Verim ve kayıplar", "Bakır, girdap ve histerezis kayıpları ısıya gider.", C.rose],
 ["Enerji iletimi", "Yüksek gerilim, küçük akım, küçük kayıp.", C.blue]
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
s.addNotes("Transformatör, indüksiyonun en yaygın uygulaması: bir önceki konunun doğrudan devamı.");

/* 3 · yapısı ve çalışma ilkesi */
s = T.light(p);
T.head(s, 2, "Yapısı ve çalışma ilkesi", C.blue);
T.lede(s, "İki bobin arasında elektriksel bağlantı yoktur; tek köprü manyetik akıdır.");
[["Primer sarım", "Kaynağa bağlanan, N₁ sarımlı bobin.", C.rose],
 ["Sekonder sarım", "Yükün bağlandığı, N₂ sarımlı bobin.", C.blue],
 ["Nüve (demir çekirdek)", "Akıyı toplayıp sekonderden geçmeye zorlar.", C.violet]
].forEach((r, i) => {
  const y = 1.95 + i * 1.0;
  T.card(s, { x: M, y: y, w: 6.6, h: 0.85 });
  s.addText(r[0], { x: M + 0.3, y: y, w: 2.5, h: 0.85, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: r[2], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 2.9, y: y, w: 3.5, h: 0.85, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
});
T.formula(s, "V₁ = N₁ · ΔΦ/Δt        V₂ = N₂ · ΔΦ/Δt        →        V₁/V₂ = N₁/N₂", {
  x: M, y: 5.05, w: 6.6, h: 0.75, size: 13 });
s.addText("Her iki sarımdan aynı akı geçtiği için ΔΦ/Δt ortaktır.", { x: M, y: 5.9, w: 6.6,
  h: 0.4, fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
T.card(s, { x: M + 6.95, y: 1.95, w: CW - 6.95, h: 2.35, fill: "FCECF0", line: "F3C9D4" });
s.addText("Doğru akımda çalışmaz", { x: M + 7.3, y: 2.2, w: 4.3, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "Pil bağlanırsa akım sabit olur, nüvedeki akı değişmez ve sekonderde emk " +
  "indüklenmez. Transformatörün canı değişimdir; bu yüzden evlerimize alternatif akım gelir.",
  { x: M + 7.3, y: 2.7, w: 4.3, h: 1.4, size: 12.5 });
T.card(s, { x: M + 6.95, y: 4.5, w: CW - 6.95, h: 1.8, fill: C.softer });
s.addText("Nüve neden ince levhalardan yapılır?", { x: M + 7.3, y: 4.72, w: 4.3, h: 0.4,
  fontFace: F.body, fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Demir tek parça olsaydı içinde dolanan girdap akımları onu ısıtır, enerjiyi " +
  "boşa harcardı. Yalıtılmış ince saclar bu akımların yolunu keser.",
  { x: M + 7.3, y: 5.2, w: 4.3, h: 1.0, size: 12.5 });
T.footer(s, FOOT, 3);
s.addNotes("İki devre arasında elektriksel bağlantı olmaması, transformatörün yalıtım aracı olarak da kullanılmasını sağlar.");

/* 4 · sarım ve gerilim */
s = T.light(p);
T.head(s, 3, "Sarım sayısı ve gerilim", C.lime);
T.lede(s, "Gerilim sarım sayısıyla doğru orantılıdır: her sarıma aynı gerilim düşer.");
T.formula(s, "V₁ / V₂ = N₁ / N₂          V₂ = V₁ · N₂ / N₁", { x: M, y: 1.95, w: 6.5, h: 0.8,
  size: 17, fill: "EAF7DC", color: C.lime });
const NX = [], NV = [];
for (let i = 0; i <= 40; i++) { const n = i * 50; NX.push(n); NV.push(+((220 * n) / 500).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "N₂", values: NX }, { name: "V₂", values: NV }],
  Object.assign(T.chartOpts({ colors: [C.lime], extra: {
    title: "V₁ = 220 V ve N₁ = 500 için çıkış gerilimi",
    catAxisTitle: "sekonder sarım sayısı N₂", valAxisTitle: "V₂ (V)", valAxisMinVal: 0 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
T.card(s, { x: M + 6.85, y: 2.95, w: CW - 6.85, h: 1.55, fill: C.softer });
s.addText("Sarım başına gerilim", { x: M + 7.15, y: 3.15, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "220 V, 500 sarıma uygulanıyorsa sarım başına 0,44 V düşer. 1000 sarımlı " +
  "sekonderde 1000 · 0,44 = 440 V elde edilir.",
  { x: M + 7.15, y: 3.6, w: 4.4, h: 0.8, size: 12.5 });
[["N₂ = 2·N₁", "V₂ = 2·V₁", C.lime],
 ["N₂ = N₁ / 4", "V₂ = V₁ / 4", C.blue],
 ["N₂ = N₁", "V₂ = V₁", C.dim]].forEach((r, i) => {
  const y = 4.65 + i * 0.6;
  s.addText(r[0], { x: M + 7.15, y: y, w: 2.2, h: 0.5, valign: "middle", fontFace: "Courier New",
    fontSize: 13, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.4, y: y, w: 2.2, h: 0.5, valign: "middle", align: "right",
    fontFace: "Courier New", fontSize: 13, bold: true, color: r[2], isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 4);
s.addNotes("Grafiğin doğru olması önemli: gerilim sarımla doğru orantılı, akım değil.");

/* 5 · akım ve güç */
s = T.light(p);
T.head(s, 4, "Akım ve güç korunumu", C.amber);
T.lede(s, "Transformatör enerji üretmez, yalnızca dönüştürür.");
T.formula(s, "P₁ = P₂        V₁·I₁ = V₂·I₂        I₁ / I₂ = N₂ / N₁", { x: M, y: 1.95, w: CW,
  h: 0.8, size: 17, fill: "FDF4E3", color: C.amber });
const ROWS = [["Büyüklük", "Sarımla ilişkisi", "N₂ > N₁ ise", "N₂ < N₁ ise"],
  ["Gerilim", "doğru orantılı", "artar", "azalır"],
  ["Akım", "ters orantılı", "azalır", "artar"],
  ["Güç", "değişmez (ideal)", "aynı kalır", "aynı kalır"],
  ["Frekans", "değişmez", "aynı kalır", "aynı kalır"]];
ROWS.forEach((r, i) => {
  const y = 2.85 + i * 0.64;
  if (i > 0) {
    s.addShape("roundRect", { x: M, y: y, w: CW, h: 0.56, rectRadius: 0.08,
      fill: { color: i % 2 ? C.white : C.softer }, line: { color: C.line, width: 1 } });
  }
  const cols = [[M + 0.3, 2.6], [M + 3.2, 3.0], [M + 6.6, 2.4], [M + 9.2, 2.5]];
  r.forEach((txt, j) => {
    s.addText(txt, { x: cols[j][0], y: y, w: cols[j][1], h: 0.56, valign: "middle",
      fontFace: F.body, fontSize: i === 0 ? 11.5 : 13, bold: i === 0 || j === 0,
      color: i === 0 ? C.dim : (j > 1 ? C.ink : C.muted), charSpacing: i === 0 ? 1 : 0,
      isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M, y: 6.13, w: CW, h: 0.5, fill: "EAF0FD", line: "C7D7F7" });
s.addText([{ text: "Frekans asla değişmez: ", options: { bold: true, color: C.blue } },
  { text: "akı her iki bobinde ortak olduğu için sekonderdeki gerilimin değişim sayısı " +
    "primerdekiyle aynıdır.", options: { color: C.muted } }],
  { x: M + 0.35, y: 6.13, w: CW - 0.7, h: 0.5, valign: "middle", fontFace: F.body,
    fontSize: 11.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("'Gerilim arttı, güç de arttı' hatası bu tabloda kapanıyor: akım küçüldüğü için çarpım sabit.");

/* 6 · yükseltici ve düşürücü */
s = T.light(p);
T.head(s, 5, "Yükseltici, düşürücü ve 1 : 1", C.violet);
T.lede(s, "Kaynak hangi bobine bağlıysa orası primerdir; aynı transformatör ters de bağlanabilir.");
[["Yükseltici", "N₂ > N₁", "Gerilimi büyütür, akımı küçültür.",
  "Santral çıkışında, iletim hattına girerken.", C.rose],
 ["Düşürücü", "N₂ < N₁", "Gerilimi küçültür, akımı büyütür.",
  "Şehir girişinde, mahalle trafosunda, şarj adaptöründe.", C.blue],
 ["1 : 1", "N₂ = N₁", "Gerilimi değiştirmez.",
  "Devreyi şebekeden yalıtmak için (yalıtım trafosu).", C.dim]
].forEach((a, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 1.95, w: 3.71, h: 3.15 });
  s.addText(a[0], { x: x + 0.3, y: 2.15, w: 3.1, h: 0.45, fontFace: F.body, fontSize: 16,
    bold: true, color: a[4], isTextBox: true, margin: 0 });
  s.addText(a[1], { x: x + 0.3, y: 2.65, w: 3.1, h: 0.4, fontFace: "Courier New", fontSize: 15,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.body(s, a[2], { x: x + 0.3, y: 3.15, w: 3.1, h: 0.8, size: 12.5 });
  s.addText("NEREDE?", { x: x + 0.3, y: 3.95, w: 3.1, h: 0.28, fontFace: F.body, fontSize: 9.5,
    bold: true, color: C.dim, charSpacing: 2, isTextBox: true, margin: 0 });
  T.body(s, a[3], { x: x + 0.3, y: 4.25, w: 3.1, h: 0.7, size: 12 });
});
T.card(s, { x: M, y: 5.35, w: CW, h: 1.05, fill: C.softer });
s.addText([{ text: "Örnek: ", options: { bold: true, color: C.ink } },
  { text: "220 V'luk şebekeden 12 V üretmek isteyen bir adaptörün primeri 1100 sarımlıysa " +
    "sekonderi N₂ = 1100 · 12 / 220 = 60 sarım olmalıdır. Sarım başına gerilim 0,2 V'tur.",
    options: { color: C.muted } }],
  { x: M + 0.35, y: 5.35, w: CW - 0.7, h: 1.05, valign: "middle", fontFace: F.body,
    fontSize: 13, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 6);
s.addNotes("Telefon şarj adaptörünü sınıfa getir: üzerindeki giriş/çıkış değerlerini birlikte okuyun.");

/* 7 · verim ve kayıplar */
s = T.light(p);
T.head(s, 6, "Verim ve kayıplar", C.rose);
T.lede(s, "Gerçek transformatörde çıkan güç, girenden biraz küçüktür.");
T.formula(s, "verim = P₂ / P₁          % verim = (P₂ / P₁) · 100", { x: M, y: 1.95, w: 6.4,
  h: 0.8, size: 16, fill: "FCECF0", color: C.rose });
s.addChart(p.ChartType.bar,
  [{ name: "Güç (W)", labels: ["Giren P₁", "Çıkan P₂", "Kayıp"], values: [1000, 950, 50] }],
  Object.assign(T.chartOpts({ colors: [C.rose, C.lime, C.amber], extra: {
    title: "%95 verimli bir transformatörde güç dağılımı",
    barDir: "col", barGapWidthPct: 60, showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontFace: F.body, dataLabelFontSize: 11, dataLabelColor: C.ink,
    valAxisMinVal: 0, valAxisMaxVal: 1200, showCatAxisTitle: false,
    valAxisTitle: "güç (W)" } }),
  { x: M, y: 2.95, w: 6.4, h: 3.45 }));
[["Bakır kaybı", "Sarım tellerinin direncinde harcanan I²·R gücü.", C.rose],
 ["Girdap akımı kaybı", "Nüvede dolanan akımların ısıtması; ince saclarla azaltılır.", C.amber],
 ["Histerezis kaybı", "Demirin mıknatıslanma yönünü sürekli değiştirmesi.", C.violet]
].forEach((r, i) => {
  const y = 1.95 + i * 1.12;
  T.card(s, { x: M + 6.75, y: y, w: CW - 6.75, h: 0.98 });
  s.addText(r[0], { x: M + 7.05, y: y + 0.08, w: 4.4, h: 0.38, fontFace: F.body, fontSize: 13,
    bold: true, color: r[2], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: M + 7.05, y: y + 0.46, w: 4.4, h: 0.45, size: 11.5 });
});
T.card(s, { x: M + 6.75, y: 5.4, w: CW - 6.75, h: 1.0, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Kayıpların tamamı ısıya dönüşür. ", options: { bold: true, color: C.lime } },
  { text: "Büyük güç transformatörlerinin verimi %98–99'dur; buna rağmen kaybedilen güç " +
    "kilowatt mertebesinde olduğu için yağla soğutulurlar.", options: { color: C.muted } }],
  { x: M + 7.05, y: 5.4, w: 4.4, h: 1.0, valign: "middle", fontFace: F.body, fontSize: 11.5,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("Verim %95 bile olsa 1000 W'lık bir cihazda 50 W ısı demek: elle tutulamayacak kadar sıcak.");

/* 8 · enerji iletimi */
s = T.light(p);
T.head(s, 7, "Neden yüksek gerilimle iletiyoruz?", C.blue);
T.lede(s, "Kayıp akımın karesiyle değişir; gerilimi yükseltmek akımı küçültür.");
T.formula(s, "P(kayıp) = I² · R        I = P / V", { x: M, y: 1.95, w: 6.5, h: 0.8, size: 17 });
const LV = [], LP = [];
for (let i = 5; i <= 200; i += 1) { LV.push(i); LP.push(+((1e6 * 5) / Math.pow(i * 1000, 2) * 100).toFixed(3)); }
s.addChart(p.ChartType.scatter, [{ name: "V", values: LV }, { name: "kayıp", values: LP }],
  Object.assign(T.chartOpts({ colors: [C.blue], extra: {
    title: "1 MW gücün 5 Ω'luk hatla iletiminde kayıp oranı",
    catAxisTitle: "iletim gerilimi (kV)", valAxisTitle: "kayıp (%)", valAxisMinVal: 0,
    valAxisMaxVal: 20 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
const TBL = [["5 kV", "200 A", "200 kW", "%20"],
  ["10 kV", "100 A", "50 kW", "%5"],
  ["50 kV", "20 A", "2 kW", "%0,2"],
  ["154 kV", "6,5 A", "211 W", "%0,02"]];
s.addText("Gerilim · akım · kayıp", { x: M + 6.85, y: 2.95, w: 4.8, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
TBL.forEach((r, i) => {
  const y = 3.4 + i * 0.62;
  s.addShape("roundRect", { x: M + 6.85, y: y, w: CW - 6.85, h: 0.54, rectRadius: 0.08,
    fill: { color: i === 3 ? "EAF7DC" : (i % 2 ? C.white : C.softer) },
    line: { color: i === 3 ? "CFE8B2" : C.line, width: 1 } });
  [[0.15, 1.1], [1.35, 1.1], [2.5, 1.2], [3.75, 1.1]].forEach((cd, j) => {
    s.addText(r[j], { x: M + 6.85 + cd[0], y: y, w: cd[1], h: 0.54, valign: "middle",
      align: j === 3 ? "right" : "left", fontFace: "Courier New", fontSize: 12,
      bold: j === 0 || j === 3, color: i === 3 ? C.lime : (j === 3 ? C.ink : C.muted),
      isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M + 6.85, y: 5.95, w: CW - 6.85, h: 0.45, flat: true, fill: "FDF4E3",
  line: "F0DCB4" });
s.addText("Gerilimi 10 katına çıkarmak kaybı 100'de bire indirir.", { x: M + 7.15, y: 5.95,
  w: 4.4, h: 0.45, valign: "middle", fontFace: F.body, fontSize: 11.5, bold: true,
  color: C.amber, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 8);
s.addNotes("Tablodaki 154 kV satırı Türkiye'deki gerçek iletim gerilimidir; 400 kV hatlar da vardır.");

/* 9 · günlük hayat */
s = T.light(p);
T.head(s, 8, "Nerede karşımıza çıkar?", C.violet);
T.lede(s, "Evden santrale, her gerilim değişiminin arkasında bir transformatör vardır.");
[["Santral çıkışı", "Üretilen gerilim yükselticiyle 154 kV – 400 kV'a çıkarılır.",
  "yükseltici", C.rose],
 ["Mahalle trafosu", "Orta gerilimi 380/220 V'a indirir; direklerde ya da kabinlerde.",
  "düşürücü", C.blue],
 ["Şarj adaptörü", "220 V'u 5 – 20 V'a indirir; küçük ve hafif olması için yüksek frekanslıdır.",
  "düşürücü", C.lime],
 ["Kaynak makinesi", "Gerilimi düşürüp akımı yüzlerce ampere çıkarır.", "çok yüksek akım", C.amber],
 ["Mikrodalga fırın", "Magnetronu besleyen yükseltici, binlerce volt üretir.",
  "yükseltici", C.violet],
 ["Yalıtım trafosu", "1:1 çevirir; laboratuvarda ve tıbbi cihazlarda güvenlik sağlar.",
  "1 : 1", C.dim]
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
s.addNotes("Mahalle trafosunun uğultusu histerezis ve manyetostriksiyondan gelir: 50 Hz'in iki katı, 100 Hz.");

/* 10–12 · çözümlü örnekler */
function ornek(no, baslik, soru, cevap, adimlar, notlar, sayfa, tone) {
  const sl = T.light(p);
  T.head(sl, no, baslik, tone);
  T.lede(sl, "Aksi belirtilmedikçe transformatör ideal kabul edilmiştir.");
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

ornek(9, "Çözümlü örnek · çıkış gerilimi ve akımı",
  "Primeri 500, sekonderi 100 sarımlı ideal bir transformatörün primerine 220 V " +
  "uygulanıyor. Sekonderden 3 A akım çekiliyor.\n\n" +
  "(a) V₂ nedir?\n(b) Güçler nedir?\n(c) I₁ nedir?",
  "(a) 44 V · (b) 132 W · (c) 0,6 A",
  [["a", "V₂ = V₁·N₂/N₁ = 220 · 100/500 = 44 V (düşürücü)"],
   ["b", "P₂ = V₂·I₂ = 44 · 3 = 132 W; ideal olduğu için P₁ = P₂ = 132 W"],
   ["c", "I₁ = P₁/V₁ = 132 / 220 = 0,6 A"],
   ["!", "Kontrol: I₁/I₂ = 0,6/3 = 1/5 = N₂/N₁ ✓ Gerilim 5'te bire indi, akım 5 katına çıktı."]],
  "Kontrol satırını mutlaka yaptır: akım ve gerilim oranlarının ters olması konunun özeti.",
  10, C.blue);

ornek(10, "Çözümlü örnek · verim",
  "Bir transformatörün primerinden 4 A akım geçerken uçlarındaki gerilim 220 V'tur. " +
  "Sekonderde 44 V altında 17 A akım ölçülmüştür.\n\n" +
  "(a) Verimi nedir?\n(b) Kaybedilen güç nedir?",
  "(a) %85 · (b) 132 W",
  [["a", "P₁ = 220 · 4 = 880 W"],
   ["2", "P₂ = 44 · 17 = 748 W"],
   ["3", "verim = P₂/P₁ = 748/880 = 0,85 → %85"],
   ["b", "Kayıp = 880 − 748 = 132 W; bu güç bakır, girdap ve histerezis kayıplarıyla ısıya gider."]],
  "İdeal kabulün kaldırıldığı tek örnek: ölçülen değerlerle hesaplananın neden tutmadığını tartışın.",
  11, C.rose);

ornek(11, "Çözümlü örnek · iletim kaybı",
  "Bir santral 1 MW gücü, toplam direnci 5 Ω olan bir hatla taşıyor.\n\n" +
  "İletim gerilimi (a) 10 kV (b) 100 kV ise hatta kaybedilen güçleri karşılaştırınız.",
  "(a) 50 kW (%5) · (b) 500 W (%0,05)",
  [["a", "I = P/V = 10⁶ / 10⁴ = 100 A → P(kayıp) = I²·R = 100² · 5 = 50 kW"],
   ["b", "I = 10⁶ / 10⁵ = 10 A → P(kayıp) = 10² · 5 = 500 W"],
   ["!", "Gerilim 10 katına çıkınca akım 10'da bire, kayıp 100'de bire indi."],
   ["2", "Kaybı azaltmanın öteki yolu hattın direncini küçültmektir; ama bu çok daha kalın ve pahalı iletken demektir."]],
  "Bu örnek, ünitenin kapanış fikri: transformatör olmasaydı uzak mesafeye elektrik taşınamazdı.",
  12, C.blue);

/* 13 · hatalar */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Transformatör gücü artırır", "Gerilimi artırırken akımı azaltır; güç artmaz."],
 ["Akım da sarımla doğru orantılıdır", "Gerilim doğru, akım ters orantılıdır."],
 ["Doğru akımla da çalışır", "Akı değişmezse emk indüklenmez."],
 ["Frekans da değişir", "Frekans primer ve sekonderde aynıdır."],
 ["Hat kaybı akımla doğru orantılıdır", "Kayıp I²·R'dir: akım 2 katına çıkarsa kayıp 4 katına."],
 ["Sekonder her zaman çıkıştır", "Kaynağın bağlı olduğu sarım primerdir; bağlantı ters çevrilebilir."]
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
s.addNotes("İlk madde en yaygın: transformatörü bir güç kaynağı sanmak. P₁ = P₂ eşitliğini tekrar yaz.");

/* 14 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Köprü manyetik akıdır", "İki bobin arasında elektriksel bağlantı yoktur; yalnızca AC ile çalışır."],
 ["Gerilim sarımla doğru orantılı", "V₂ = V₁·N₂/N₁: her sarıma aynı gerilim düşer."],
 ["Akım ters orantılı", "Güç korunur: gerilim kaç kat büyürse akım o kadar küçülür."],
 ["Yüksek gerilim = küçük kayıp", "Kayıp I²·R; gerilimi 10 katına çıkarmak kaybı 100'de bire indirir."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5, fontFace: F.head,
    fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 4.3, h: 0.45, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 5.45, y: y - 0.04, w: 5.5, h: 0.62, fontFace: F.body, fontSize: 13.5,
    color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([{ text: "Transformatör laboratuvarı, enerji iletimi ve hedef gerilim oyunu:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/transformatorler.html",
    options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta enerji iletimi bölümünü aç: gerilimi 1 kV'a indirince hattın taşıyamadığını canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/transformatorler.pptx" })
  .then(f => console.log("yazıldı:", f));
