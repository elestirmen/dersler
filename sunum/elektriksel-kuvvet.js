const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Elektriksel kuvvet ve elektriksel alan",
  "Fizik · Elektrik ve Manyetizma");
const FOOT = "Elektrik ve Manyetizma · Konu 01 · Elektriksel kuvvet ve alan";
const CW = W - M * 2;
const KC = 9e9;

/* 1 · kapak */
let s = T.dark(p);
s.addText("ELEKTRİK VE MANYETİZMA · KONU 01", { x: 0.95, y: 1.7, w: 8, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("Elektriksel kuvvet ve alan", { x: 0.9, y: 2.1, w: 8.6, h: 1.3, fontFace: F.head,
  fontSize: 46, bold: true, color: C.white, isTextBox: true, margin: 0 });
s.addText("Yükler birbirine dokunmadan kuvvet uygular. Bu kuvveti taşıyan şey, her yükün " +
  "çevresinde kurduğu görünmez örtüdür: elektriksel alan.", {
  x: 0.95, y: 3.6, w: 7.4, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("F = k · |q₁·q₂| / r²          E = F / q          E = k · |q| / r²", {
  x: 0.95, y: 5.0, w: 8.4, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* iki yük ve itme okları */
s.addShape("ellipse", { x: 9.9, y: 3.3, w: 0.7, h: 0.7, fill: { color: "FF8FA3" },
  line: { type: "none" } });
s.addText("+", { x: 9.9, y: 3.3, w: 0.7, h: 0.7, align: "center", valign: "middle",
  fontFace: F.body, fontSize: 22, bold: true, color: "3A0F1A", isTextBox: true, margin: 0 });
s.addShape("ellipse", { x: 11.7, y: 3.3, w: 0.7, h: 0.7, fill: { color: "FF8FA3" },
  line: { type: "none" } });
s.addText("+", { x: 11.7, y: 3.3, w: 0.7, h: 0.7, align: "center", valign: "middle",
  fontFace: F.body, fontSize: 22, bold: true, color: "3A0F1A", isTextBox: true, margin: 0 });
s.addShape("line", { x: 9.0, y: 3.65, w: 0.8, h: 0, flipH: true,
  line: { color: "9C8CFF", width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: 12.5, y: 3.65, w: 0.8, h: 0,
  line: { color: "9C8CFF", width: 3, endArrowType: "triangle" } });
s.addText("aynı işaret → itme", { x: 9.0, y: 4.2, w: 4.3, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11, color: "6A7798", isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/elektriksel-kuvvet.html", null, true);
s.addNotes("Açılış: 'Yükler birbirine dokunmadan nasıl kuvvet uyguluyor?' Alan kavramı bu sorunun cevabı.");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: elektrik yükünden paralel levhalara.");
[["Elektrik yükü", "Korunur, kuantumludur; birimi coulomb.", C.blue],
 ["Coulomb yasası", "Kuvvet yüklerle doğru, uzaklığın karesiyle ters.", C.violet],
 ["Elektriksel alan", "Birim yüke etki eden kuvvet: E = F/q.", C.lime],
 ["Alan çizgileri", "Alanı görünür kılan haritalar; asla kesişmez.", C.amber],
 ["Düzgün alan", "Paralel levhalar arasında E = V/d.", C.rose],
 ["Yüklü parçacık", "Düzgün alanda yörünge parabolüdür.", C.blue]
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
s.addNotes("Bu ünite, kuvvet kavramını temastan uzaklaştırıp alan kavramına geçiriyor.");

/* 3 · elektrik yükü */
s = T.light(p);
T.head(s, 2, "Elektrik yükü", C.blue);
T.lede(s, "Maddenin, elektriksel etkileşime giren temel özelliği.");
[["İki çeşittir", "Pozitif (proton) ve negatif (elektron). Aynı işaretliler iter, " +
  "zıt işaretliler çeker.", C.blue],
 ["Korunur", "Yük yoktan var edilemez, yok edilemez; yalnızca yer değiştirir. " +
  "Yalıtılmış bir sistemin toplam yükü sabittir.", C.violet],
 ["Kuantumludur", "Her yük, elektronun yükünün tam katıdır: q = n·e. " +
  "Yarım elektron yükü diye bir şey yoktur.", C.lime]
].forEach((r, i) => {
  const y = 1.95 + i * 1.28;
  T.card(s, { x: M, y: y, w: 7.4, h: 1.12 });
  s.addText(r[0], { x: M + 0.35, y: y, w: 2.1, h: 1.12, valign: "middle", fontFace: F.body,
    fontSize: 14, bold: true, color: r[2], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: M + 2.5, y: y + 0.2, w: 4.6, h: 0.8, size: 12.5 });
});
T.formula(s, "e = 1,6 · 10⁻¹⁹ C        q = n · e        1 C = 6,25 · 10¹⁸ elektron", {
  x: M, y: 5.85, w: 7.4, h: 0.75, size: 13 });
T.card(s, { x: M + 7.75, y: 1.95, w: CW - 7.75, h: 4.65, fill: "EAF0FD", line: "C7D7F7" });
s.addText("İletken · yalıtkan", { x: M + 8.1, y: 2.2, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.blue, isTextBox: true, margin: 0 });
T.bullets(s, [
  "İletkende yükler serbestçe hareket eder (metaller, çözeltiler).",
  "Yalıtkanda yükler bulundukları yerde kalır (cam, plastik).",
  "Dokundurma: iki iletken küre eşit yük paylaşır.",
  "Etki (indüksiyon): yaklaştırılan yük, karşı yüzeyde zıt yük toplar — dokunma yoktur.",
  "Topraklama: fazla yükün toprağa akmasıdır."],
  { x: M + 8.1, y: 2.75, w: 3.3, h: 3.6, size: 12.5, gap: 11 });
T.footer(s, FOOT, 3);
s.addNotes("Etki ile elektriklenme, sonraki ünitedeki indüksiyonla karıştırılmamalı: burada yük ayrışması var.");

/* 4 · Coulomb yasası */
s = T.light(p);
T.head(s, 3, "Coulomb yasası", C.violet);
T.lede(s, "İki nokta yük arasındaki kuvvet: yüklerle doğru, uzaklığın karesiyle ters orantılı.");
T.formula(s, "F = k · |q₁ · q₂| / r²          k = 9 · 10⁹ N·m²/C²", { x: M, y: 1.95, w: CW,
  h: 0.8, size: 17, fill: "F1EDFB", color: C.violet });
const RR = [], FF = [];
for (let i = 5; i <= 50; i++) { RR.push(i); FF.push(+((KC * 1e-12) / Math.pow(i / 100, 2)).toFixed(3)); }
s.addChart(p.ChartType.scatter, [{ name: "r", values: RR }, { name: "F", values: FF }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "q₁ = q₂ = 1 µC için kuvvet – uzaklık",
    catAxisTitle: "uzaklık r (cm)", valAxisTitle: "F (N)", valAxisMinVal: 0, valAxisMaxVal: 4 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
[["r 2 katına çıkarsa", "F dörtte bire iner", C.violet],
 ["r yarıya inerse", "F dört katına çıkar", C.rose],
 ["q₁ 3 katına çıkarsa", "F 3 katına çıkar", C.blue]].forEach((r, i) => {
  const y = 2.95 + i * 0.86;
  T.card(s, { x: M + 6.85, y: y, w: CW - 6.85, h: 0.72, fill: C.softer });
  s.addText(r[0], { x: M + 7.15, y: y, w: 2.6, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.7, y: y, w: 2.1, h: 0.72, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 12.5, bold: true, color: r[2], isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 6.85, y: 5.6, w: CW - 6.85, h: 0.8, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Etki – tepki: ", options: { bold: true, color: C.amber } },
  { text: "İki yük birbirine eşit büyüklükte, zıt yönde kuvvet uygular — yükleri farklı olsa bile.",
    options: { color: C.muted } }],
  { x: M + 7.15, y: 5.6, w: 4.6, h: 0.8, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Ters kare yasası: kütle çekimiyle aynı matematiksel yapı. Fark, elektriksel kuvvetin itici de olabilmesi.");

/* 5 · elektriksel alan */
s = T.light(p);
T.head(s, 4, "Elektriksel alan", C.lime);
T.lede(s, "Kuvvetin kendisi değil, kuvvet uygulama yeteneği: birim yüke düşen kuvvet.");
T.formula(s, "E = F / q          E = k · |q| / r²          birimi: N/C", { x: M, y: 1.95,
  w: 7.1, h: 0.8, size: 16, fill: "EAF7DC", color: C.lime });
const ER = [], E1 = [], E2 = [];
for (let i = 5; i <= 50; i++) {
  ER.push(i);
  E1.push(+((KC * 1e-6) / Math.pow(i / 100, 2) / 1000).toFixed(2));
  E2.push(+((KC * 2e-6) / Math.pow(i / 100, 2) / 1000).toFixed(2));
}
s.addChart(p.ChartType.scatter,
  [{ name: "r", values: ER }, { name: "q = 1 µC", values: E1 }, { name: "q = 2 µC", values: E2 }],
  Object.assign(T.chartOpts({ colors: [C.lime, C.blue], extra: {
    title: "Nokta yükün alanı: uzaklıkla azalır, yükle büyür",
    catAxisTitle: "uzaklık r (cm)", valAxisTitle: "E (kN/C)", valAxisMinVal: 0,
    valAxisMaxVal: 40, showLegend: true, legendPos: "b", legendFontFace: F.body,
    legendFontSize: 11, legendColor: C.muted } }),
  { x: M, y: 2.95, w: 7.1, h: 3.45 }));
T.card(s, { x: M + 7.45, y: 1.95, w: CW - 7.45, h: 4.45 });
s.addText("Alanın yönü", { x: M + 7.8, y: 2.2, w: 3.6, h: 0.4, fontFace: F.body, fontSize: 15,
  bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Bir noktadaki alanın yönü, oraya konan pozitif test yükünün itileceği yöndür.",
  "Pozitif yükün alanı dışa doğrudur; negatif yükünki içe doğru.",
  "Negatif yüke etki eden kuvvet, alana zıt yöndedir: F = q·E.",
  "Birden çok yük varsa alanlar vektörel toplanır.",
  "Alan, yükün yarattığı bir özelliktir: test yükü kaldırılsa da orada durur."],
  { x: M + 7.8, y: 2.75, w: 3.5, h: 3.4, size: 12.5, gap: 11 });
T.footer(s, FOOT, 5);
s.addNotes("E = F/q tanımı, E = kq/r² formülüyle karıştırılmamalı: biri tanım, öteki nokta yük için sonuç.");

/* 6 · alan çizgileri */
s = T.light(p);
T.head(s, 5, "Alan çizgileri", C.amber);
T.lede(s, "Alanı gözle görülür yapan harita: teğeti alanın yönünü, sıklığı büyüklüğünü verir.");
T.bullets(s, [
  "Pozitif yükten çıkar, negatif yükte son bulur.",
  "Çizgilerin sıklaştığı yerde alan güçlüdür.",
  "Her noktadan yalnız bir çizgi geçer: çizgiler asla kesişmez.",
  "İletken yüzeyine her zaman diktir.",
  "Yük yoksa çizgi başlamaz ya da bitmez."],
  { x: M, y: 2.0, w: 5.2, h: 2.4, size: 14, gap: 16 });
T.card(s, { x: M, y: 4.45, w: 5.2, h: 0.95, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Neden kesişmez? ", options: { bold: true, color: C.amber } },
  { text: "Kesişselerdi o noktada alanın iki farklı yönü olurdu; bir noktada alanın tek bir yönü vardır.",
    options: { color: C.muted } }],
  { x: M + 0.3, y: 4.45, w: 4.6, h: 0.95, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.card(s, { x: M, y: 5.55, w: 5.2, h: 0.85, fill: C.softer });
s.addText([{ text: "Nötr nokta: ", options: { bold: true, color: C.lime } },
  { text: "Aynı işaretli iki yükün arasında, bileşke alanın sıfır olduğu bir nokta vardır; " +
    "orada hiçbir çizgi geçmez.", options: { color: C.muted } }],
  { x: M + 0.3, y: 5.55, w: 4.6, h: 0.85, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });

/* iki mini sahne: tek pozitif ve tek negatif yük */
function radial(slide, cx, cy, tone, outward) {
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
  dirs.forEach(d => {
    const diag = d[0] !== 0 && d[1] !== 0;
    const len = diag ? 0.42 : 0.6, off = diag ? 0.22 : 0.3;
    const w = Math.abs(d[0]) * len, h = Math.abs(d[1]) * len;
    const x = d[0] > 0 ? cx + off : (d[0] < 0 ? cx - off - w : cx);
    const y = d[1] > 0 ? cy + off : (d[1] < 0 ? cy - off - h : cy);
    const line = { color: tone, width: 1.8 };
    if (outward) {
      line.endArrowType = "triangle";
      if (d[0] < 0) line.beginArrowType = "none";
    } else {
      line.beginArrowType = "triangle";
    }
    slide.addShape("line", Object.assign({ x: x, y: y, w: w, h: h }, {
      flipH: d[0] < 0, flipV: d[1] < 0, line: line
    }));
  });
  slide.addShape("ellipse", { x: cx - 0.21, y: cy - 0.21, w: 0.42, h: 0.42,
    fill: { color: tone }, line: { type: "none" } });
  slide.addText(outward ? "+" : "−", { x: cx - 0.21, y: cy - 0.21, w: 0.42, h: 0.42,
    align: "center", valign: "middle", fontFace: F.body, fontSize: 17, bold: true,
    color: C.white, isTextBox: true, margin: 0 });
}
T.card(s, { x: M + 5.6, y: 1.95, w: 3.1, h: 4.45, fill: C.softer });
radial(s, M + 7.15, 3.9, C.rose, true);
s.addText("Pozitif yük", { x: M + 5.6, y: 2.15, w: 3.1, h: 0.4, align: "center", fontFace: F.body,
  fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
s.addText("çizgiler dışa doğru", { x: M + 5.6, y: 5.6, w: 3.1, h: 0.4, align: "center",
  fontFace: F.body, fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
T.card(s, { x: M + 8.85, y: 1.95, w: CW - 8.85, h: 4.45, fill: C.softer });
radial(s, M + 10.3, 3.9, C.blue, false);
s.addText("Negatif yük", { x: M + 8.85, y: 2.15, w: CW - 8.85, h: 0.4, align: "center",
  fontFace: F.body, fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
s.addText("çizgiler içe doğru", { x: M + 8.85, y: 5.6, w: CW - 8.85, h: 0.4, align: "center",
  fontFace: F.body, fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 6);
s.addNotes("Tahtada dipol ve iki aynı yük çizimini de ekle: nötr nokta kavramı oradan çıkıyor.");

/* 7 · düzgün alan */
s = T.light(p);
T.head(s, 6, "Düzgün alan: paralel levhalar", C.rose);
T.lede(s, "Levhalar arasında alan her noktada aynı büyüklükte ve aynı yöndedir.");
T.formula(s, "E = V / d          F = q · E          a = q·E / m", { x: M, y: 1.95, w: 6.4,
  h: 0.8, size: 16, fill: "FCECF0", color: C.rose });
/* levha şeması */
T.card(s, { x: M, y: 2.95, w: 6.4, h: 3.45, fill: C.softer });
s.addShape("rect", { x: M + 0.75, y: 3.35, w: 4.9, h: 0.16, fill: { color: C.rose },
  line: { type: "none" } });
s.addShape("rect", { x: M + 0.75, y: 5.65, w: 4.9, h: 0.16, fill: { color: C.blue },
  line: { type: "none" } });
s.addText("+ + + + + + + + + +", { x: M + 0.75, y: 3.0, w: 4.9, h: 0.32, align: "center",
  fontFace: F.body, fontSize: 13, bold: true, color: C.rose, isTextBox: true, margin: 0 });
s.addText("−  −  −  −  −  −  −  −  −  −", { x: M + 0.75, y: 5.85, w: 4.9, h: 0.32,
  align: "center", fontFace: F.body, fontSize: 13, bold: true, color: C.blue,
  isTextBox: true, margin: 0 });
for (let i = 0; i < 6; i++) {
  s.addShape("line", { x: M + 1.15 + i * 0.83, y: 3.6, w: 0, h: 1.9,
    line: { color: "9C8CFF", width: 1.6, endArrowType: "triangle" } });
}
s.addText("E", { x: M + 5.75, y: 4.35, w: 0.4, h: 0.4, fontFace: "Courier New", fontSize: 16,
  bold: true, color: C.violet, isTextBox: true, margin: 0 });
s.addText("d", { x: M + 0.3, y: 4.35, w: 0.4, h: 0.4, fontFace: "Courier New", fontSize: 16,
  bold: true, color: C.dim, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Alan çizgileri paralel ve eşit aralıklıdır: her noktada aynı E.",
  "Levhalara paralel giren yüklü parçacık, yatay atış gibi parabol çizer.",
  "Yatayda sabit hız, düşeyde sabit ivme vardır.",
  "Pozitif yük alan yönünde, negatif yük ters yönde sapar.",
  "Aynı alanda elektron protondan ≈ 1836 kat büyük ivme kazanır."],
  { x: M + 6.75, y: 2.0, w: CW - 6.75, h: 2.7, size: 13, gap: 17 });
T.card(s, { x: M + 6.75, y: 4.85, w: CW - 6.75, h: 1.55, fill: "EAF0FD", line: "C7D7F7" });
s.addText([{ text: "Sayısal örnek\n", options: { bold: true, color: C.blue, breakLine: true } },
  { text: "V = 100 V ve d = 2 cm ise E = 100 / 0,02 = 5000 N/C olur. Bu alandaki bir elektrona " +
    "F = q·E = 1,6·10⁻¹⁹ · 5000 = 8·10⁻¹⁶ N kuvvet etki eder; ivmesi 10¹⁵ m/s² mertebesindedir.",
    options: { color: C.muted } }],
  { x: M + 7.05, y: 4.85, w: 4.7, h: 1.55, valign: "middle", fontFace: F.body, fontSize: 12,
    lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("Paralel levha, yatay atışın elektriksel kopyasıdır; kinematik bilgisi burada aynen kullanılır.");

/* 8 · günlük hayat */
s = T.light(p);
T.head(s, 7, "Nerede karşımıza çıkar?", C.blue);
T.lede(s, "Elektriksel kuvvet, günlük hayatta gördüğümüz pek çok olayın arkasındadır.");
[["Yıldırım", "Bulut ile yer arasında biriken yük, havanın yalıtkanlığını yenince boşalır.",
  "≈ 3 · 10⁶ N/C", C.violet],
 ["Fotokopi ve lazer yazıcı", "Yüklü tambur, toner tozunu elektriksel kuvvetle tutar.",
  "toner çekimi", C.blue],
 ["Boya püskürtme", "Yüklenen boya taneleri, zıt yüklü yüzeye kendiliğinden yapışır.",
  "daha az israf", C.lime],
 ["Elektrostatik filtre", "Bacadaki tozu yükleyip levhalarda toplar.", "hava temizleme", C.amber],
 ["Dokunmatik ekran", "Parmağın yükü, ekrandaki alanı bozar; konum böyle ölçülür.",
  "kapasitif algı", C.rose],
 ["Hücre zarı", "Zarın iki yüzü arasındaki gerilim ≈ 70 mV; alan 10⁷ N/C mertebesindedir.",
  "biyofizik", C.violet]
].forEach((a, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = M + col * (3.71 + 0.4), y = 1.95 + row * 2.28;
  T.card(s, { x: x, y: y, w: 3.71, h: 2.05 });
  s.addText(a[0], { x: x + 0.3, y: y + 0.22, w: 3.1, h: 0.42, fontFace: F.body, fontSize: 14.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  T.body(s, a[1], { x: x + 0.3, y: y + 0.72, w: 3.1, h: 0.9, size: 12 });
  s.addText(a[2], { x: x + 0.3, y: y + 1.6, w: 3.1, h: 0.32, fontFace: F.body, fontSize: 11.5,
    bold: true, color: a[3], isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 8);
s.addNotes("Yıldırım değeri havanın delinme dayanımıdır: 3 MV/m. Sınıfta 'kaç volt?' sorusuna buradan geçilebilir.");

/* 9–11 · çözümlü örnekler */
function ornek(no, baslik, soru, cevap, adimlar, notlar, sayfa, tone) {
  const sl = T.light(p);
  T.head(sl, no, baslik, tone);
  T.lede(sl, "Çözümlerde k = 9·10⁹ N·m²/C² ve g = 10 m/s² alınmıştır.");
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

ornek(8, "Çözümlü örnek · Coulomb kuvveti",
  "q₁ = +4 µC ve q₂ = −2 µC yükleri havada 30 cm aralıkla duruyor.\n\n" +
  "(a) Aralarındaki kuvvetin büyüklüğü ve türü nedir?\n" +
  "(b) Uzaklık 60 cm yapılırsa kuvvet ne olur?",
  "(a) 0,8 N çekme · (b) 0,2 N",
  [["a", "F = k·|q₁·q₂|/r² = 9·10⁹ · (4·10⁻⁶ · 2·10⁻⁶) / (0,3)²"],
   ["2", "F = 9·10⁹ · 8·10⁻¹² / 0,09 = 0,072 / 0,09 = 0,8 N"],
   ["3", "Yükler zıt işaretli olduğu için kuvvet çekmedir."],
   ["b", "r 2 katına çıkınca F dörtte bire iner: 0,8 / 4 = 0,2 N"]],
  "Öğrencilere 'hangi yüke daha büyük kuvvet etki eder?' diye sor: cevap eşit — Newton'un 3. yasası.",
  9, C.violet);

ornek(9, "Çözümlü örnek · alanın sıfırlandığı nokta",
  "q₁ = +4q yükü orijinde, q₂ = +q yükü ondan 30 cm sağdadır.\n\n" +
  "Bileşke elektriksel alanın sıfır olduğu nokta neresidir?",
  "q₁'den 20 cm sağda",
  [["1", "Aynı işaretli yüklerde nötr nokta, yükler arasında ve küçük yüke yakındır."],
   ["2", "x uzaklığı q₁'den ölçülürse: k·4q/x² = k·q/(0,3 − x)²"],
   ["3", "Karekök alınır: 2/x = 1/(0,3 − x) → 0,6 − 2x = x → x = 0,2 m"],
   ["!", "Zıt işaretli yüklerde nötr nokta yüklerin dışında, küçük yükün ötesinde olur."]],
  "Karekök adımını atlamak en sık hata. Ayrıca 'alan sıfır' demek 'kuvvet sıfır' demektir, potansiyel değil.",
  10, C.lime);

ornek(10, "Çözümlü örnek · paralel levhalar",
  "Aralarındaki uzaklık 2 cm olan paralel levhalara 100 V uygulanıyor.\n\n" +
  "(a) Levhalar arasındaki alan kaç N/C'dur?\n" +
  "(b) Kütlesi 2·10⁻⁶ kg olan toz tanesi havada asılı kalıyorsa yükü nedir?",
  "(a) 5000 N/C · (b) 4·10⁻⁹ C",
  [["a", "E = V/d = 100 / 0,02 = 5000 N/C"],
   ["b", "Asılı kalma şartı: elektriksel kuvvet = ağırlık → q·E = m·g"],
   ["2", "q = m·g / E = (2·10⁻⁶ · 10) / 5000 = 2·10⁻⁵ / 5000"],
   ["3", "q = 4·10⁻⁹ C. Yükün işareti, alanın yönüne göre yukarı kuvvet verecek şekilde olmalıdır."]],
  "Bu, Millikan'ın yağ damlası deneyinin basitleştirilmiş hâli: elektron yükü böyle ölçüldü.",
  11, C.rose);

/* 12 · hatalar */
s = T.light(p);
T.head(s, 11, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Büyük yüke büyük kuvvet etki eder", "Kuvvetler eşit büyüklükte ve zıt yönlüdür."],
 ["Kuvvet uzaklıkla ters orantılıdır", "Uzaklığın karesiyle ters orantılıdır."],
 ["Alan, kuvvetin başka adıdır", "Alan birim yüke düşen kuvvettir; birimi N/C."],
 ["Alan çizgileri kesişebilir", "Kesişseydi bir noktada iki yön olurdu; asla kesişmez."],
 ["Negatif yük alan yönünde hareket eder", "Alanın tersi yönde kuvvet görür."],
 ["Test yükü kaldırılınca alan biter", "Alan kaynak yükün özelliğidir, orada durmaya devam eder."]
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
T.footer(s, FOOT, 12);
s.addNotes("İlk iki madde Coulomb yasasının yapısını anlamamaktan geliyor; tahtada birim analizi yaptır.");

/* 13 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Kuvvet ters kare yasasına uyar", "F = k·q₁·q₂/r²: uzaklık 2 katına çıkarsa kuvvet dörtte bire."],
 ["Alan, birim yüke düşen kuvvettir", "E = F/q; yönü pozitif test yükünün itildiği yöndür."],
 ["Çizgiler alanı görünür yapar", "Sıklık büyüklüğü, teğet yönü verir; asla kesişmezler."],
 ["Düzgün alanda yörünge paraboldür", "E = V/d sabittir; hareket yatay atışın aynısıdır."]
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
s.addText([{ text: "Coulomb laboratuvarı, alan haritası ve paralel levhalar:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/elektriksel-kuvvet.html",
    options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta siteyi aç: alanın sıfırlandığı nokta bölümünde yükleri değiştirerek nötr noktayı canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/elektriksel-kuvvet.pptx" })
  .then(f => console.log("yazıldı:", f));
