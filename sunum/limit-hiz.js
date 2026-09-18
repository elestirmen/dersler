const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Limit hız", "Fizik · Kuvvet ve Hareket");
const FOOT = "Kuvvet ve Hareket · Konu 05 · Limit hız";
const CW = W - M * 2;
const GR = 9.81;

/* 1 · kapak */
let s = T.dark(p);
s.addText("KUVVET VE HAREKET · KONU 05", { x: 0.95, y: 1.7, w: 7, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("Limit hız", { x: 0.9, y: 2.1, w: 8.4, h: 1.3, fontFace: F.head, fontSize: 50,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
s.addText("Gerçek dünyada hiçbir cisim sonsuza kadar hızlanmaz. Hava direnci hızla büyür; " +
  "ağırlığa eşitlendiği anda net kuvvet sıfırlanır ve hız sabitlenir.", {
  x: 0.95, y: 3.6, w: 7.1, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("F(direnç) = k·v²        m·g = k·v(limit)²        v = √(m·g / k)", {
  x: 0.95, y: 5.0, w: 8.0, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* kuvvet dengesi motifi */
s.addShape("ellipse", { x: 10.9, y: 3.55, w: 0.6, h: 0.6, fill: { color: "82AAFF" },
  line: { type: "none" } });
s.addShape("line", { x: 11.2, y: 4.15, w: 0, h: 1.0,
  line: { color: "9C8CFF", width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: 11.2, y: 2.55, w: 0, h: 1.0, flipV: true,
  line: { color: "FF8FA3", width: 3, endArrowType: "triangle" } });
s.addText("F(direnç)", { x: 10.3, y: 2.18, w: 1.8, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 11, bold: true, color: "FF8FA3", isTextBox: true, margin: 0 });
s.addText("G", { x: 10.9, y: 5.2, w: 0.6, h: 0.3, align: "center", fontFace: F.body, fontSize: 12,
  bold: true, color: "9C8CFF", isTextBox: true, margin: 0 });
s.addText("dengede: a = 0", { x: 9.9, y: 5.62, w: 2.6, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 11, color: "6A7798", isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/limit-hiz.html", null, true);
s.addNotes("Açılış sorusu: 'Paraşütçü neden sürekli hızlanmaz?' Cevap bu iki okun eşitlenmesinde.");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: hava direncinden paraşüte.");
[["Hava direnci", "Hıza bağlı, harekete zıt kuvvet: F = k·v².", C.blue],
 ["Kuvvet dengesi", "Direnç ağırlığa eşitlenince ivme biter.", C.violet],
 ["Limit hız bağıntısı", "v = √(mg/k); belirleyici olan m/A oranı.", C.lime],
 ["v–t doyma eğrisi", "Eğim g'den başlar, sıfıra iner.", C.amber],
 ["Paraşüt", "Alan büyür, limit hız küçülür.", C.rose],
 ["Ölçek etkisi", "Küçük canlılar neden düşmekten incinmez?", C.blue]
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
s.addNotes("Bu konu, serbest düşme modelinin sınırlarını gösterir: ideal model ne zaman bırakılır?");

/* 3 · hava direnci */
s = T.light(p);
T.head(s, 2, "Hava direnci: hıza bağlı bir kuvvet", C.blue);
T.lede(s, "Sürtünmeden farkı: hız büyüdükçe hızla büyür.");
T.formula(s, "F(direnç) = k · v²        k = ½ · ρ · C · A", { x: M, y: 1.95, w: CW, h: 0.8,
  size: 17 });
[["ρ", "havanın yoğunluğu", "deniz seviyesinde ≈ 1,2 kg/m³", C.blue],
 ["C", "sürükleme katsayısı", "şekle bağlı: küre ≈ 0,5 · düz levha ≈ 1,2", C.violet],
 ["A", "kesit alanı", "harekete dik yüzeyin alanı", C.lime]].forEach((r, i) => {
  const y = 3.05 + i * 1.05;
  T.card(s, { x: M, y: y, w: 7.3, h: 0.9 });
  s.addText(r[0], { x: M + 0.3, y: y, w: 0.6, h: 0.9, valign: "middle", align: "center",
    fontFace: "Courier New", fontSize: 18, bold: true, color: r[3], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 1.0, y: y, w: 2.4, h: 0.9, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 3.5, y: y, w: 3.6, h: 0.9, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.7, y: 3.05, w: CW - 7.7, h: 2.95, fill: "FDF4E3", line: "F0DCB4" });
s.addText("Kütle burada yok!", { x: M + 8.05, y: 3.3, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.amber, isTextBox: true, margin: 0 });
T.body(s, "Direnç kuvveti cismin kütlesine değil; şekline, alanına ve hızına bağlıdır. " +
  "Kütlenin rolü, bu direncin hangi hızda ağırlığı dengeleyeceğini belirlemektir.\n\n" +
  "Hız iki katına çıkarsa direnç dört katına çıkar.", {
  x: M + 8.05, y: 3.8, w: 3.3, h: 2.1, size: 12.5 });
T.footer(s, FOOT, 3);
s.addNotes("v² bağımlılığı bu konunun anahtarı: bu yüzden denge hızlı kurulur ve limit hız keskin bir değerdir.");

/* 4 · denge tablosu */
s = T.light(p);
T.head(s, 3, "Neden bir hız sınırı var?", C.violet);
T.lede(s, "Hız büyüdükçe direnç büyür, net kuvvet küçülür, ivme sıfıra iner.");
const ROWS = [["An", "Direnç", "Net kuvvet", "İvme", "Hız"],
  ["Bırakma anı", "0", "m·g", "g", "0"],
  ["Ara evre", "0 < F < m·g", "azalıyor", "azalıyor", "artıyor"],
  ["Limit hız", "m·g", "0", "0", "sabit"]];
ROWS.forEach((r, i) => {
  const y = 2.0 + i * 0.78;
  if (i > 0) {
    s.addShape("roundRect", { x: M, y: y, w: CW, h: 0.68, rectRadius: 0.08,
      fill: { color: i === 3 ? "EAF7DC" : (i % 2 ? C.white : C.softer) },
      line: { color: i === 3 ? "CFE8B2" : C.line, width: 1 } });
  }
  const cols = [[M + 0.3, 2.6], [M + 3.1, 2.4], [M + 5.6, 2.2], [M + 8.0, 1.6], [M + 9.8, 1.7]];
  r.forEach((txt, j) => {
    s.addText(txt, { x: cols[j][0], y: y, w: cols[j][1], h: 0.68, valign: "middle",
      fontFace: i === 0 ? F.body : (j === 0 ? F.body : "Courier New"),
      fontSize: i === 0 ? 11.5 : 13, bold: i === 0 || j === 0,
      color: i === 0 ? C.dim : (i === 3 ? C.lime : C.muted), charSpacing: i === 0 ? 1 : 0,
      isTextBox: true, margin: 0 });
  });
});
T.formula(s, "m·g = k · v(limit)²   →   v(limit) = √(m·g / k)", { x: M, y: 5.05, w: CW, h: 0.8,
  size: 16, fill: "F1EDFB", color: C.violet });
T.body(s, "Limit hızda cisim durmaz; sabit hızla düşmeye devam eder ve yere o hızla çarpar. " +
  "Sıfır olan ivmedir, hız değil.", { x: M, y: 6.0, w: CW, h: 0.5, size: 13 });
T.footer(s, FOOT, 4);
s.addNotes("Tablodaki son satır en çok karıştırılan yer: 'hız sabit' ile 'hız sıfır' farkını vurgula.");

/* 5 · v-t eğrisi */
s = T.light(p);
T.head(s, 4, "v – t: doyan eğri", C.amber);
T.lede(s, "Hava direnci yokken doğru; varken limit hıza yaklaşan bir eğri.");
const TT = [], VV = [], VI = [];
const VL = 50;
for (let i = 0; i <= 40; i++) {
  const t = i * 0.5;
  TT.push(+t.toFixed(1));
  VV.push(+(VL * Math.tanh((GR * t) / VL)).toFixed(2));
  VI.push(+Math.min(GR * t, 70).toFixed(2));
}
s.addChart(p.ChartType.scatter,
  [{ name: "t", values: TT }, { name: "hava dirençli", values: VV },
   { name: "hava direncisiz (ideal)", values: VI }],
  Object.assign(T.chartOpts({ colors: [C.blue, C.dim], extra: {
    title: "Limit hızı 50 m/s olan bir cismin hız–zaman grafiği",
    catAxisTitle: "t (s)", valAxisTitle: "v (m/s)", valAxisMinVal: 0, valAxisMaxVal: 70,
    showLegend: true, legendPos: "b", legendFontFace: F.body, legendFontSize: 11,
    legendColor: C.muted } }),
  { x: M, y: 1.95, w: 7.2, h: 4.45 }));
T.formula(s, "v(t) = v(limit)·tanh(g·t / v(limit))", { x: M + 7.55, y: 1.95, w: CW - 7.55,
  h: 0.75, size: 12, fill: "FDF4E3", color: C.amber });
T.bullets(s, ["Başlangıçta eğim g'dir: ideal doğruya teğettir.",
  "Hız büyüdükçe eğim azalır.", "Limit hıza asimptotik yaklaşır.",
  "Pratikte birkaç saniyede %95'ine oturur."],
  { x: M + 7.55, y: 2.95, w: 4.2, h: 2.2, size: 12.5, gap: 9 });
T.card(s, { x: M + 7.55, y: 5.35, w: CW - 7.55, h: 1.05, fill: C.softer });
s.addText([{ text: "a – t grafiği ", options: { bold: true, color: C.ink } },
  { text: "g'den başlar ve sıfıra iner. İvmenin sıfırlanması, hızın sabitlenmesi demektir.",
    options: { color: C.muted } }],
  { x: M + 7.9, y: 5.35, w: 3.9, h: 1.05, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("İki eğrinin başlangıçta çakışması önemli: kısa düşüşlerde serbest düşme modeli hâlâ iyi çalışır.");

/* 6 · neye bağlı */
s = T.light(p);
T.head(s, 5, "Limit hız neye bağlı?", C.lime);
T.lede(s, "Kütlenin karekökü ile artar, alanın kareköküyle azalır.");
const MX = [], MV = [];
for (let i = 1; i <= 60; i++) { const m = i * 2; MX.push(m); MV.push(+Math.sqrt((m * GR) / 0.42).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "m", values: MX }, { name: "v(limit)", values: MV }],
  Object.assign(T.chartOpts({ colors: [C.blue], extra: {
    title: "Alan sabit: kütle arttıkça limit hız artar",
    catAxisTitle: "kütle (kg)", valAxisTitle: "v (m/s)", valAxisMinVal: 0 } }),
  { x: M, y: 1.95, w: 5.6, h: 3.3 }));
const AX = [], AV = [];
for (let i = 1; i <= 60; i++) { const a = i * 0.1; AX.push(+a.toFixed(1)); AV.push(+Math.sqrt((80 * GR) / (0.6 * a)).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "A", values: AX }, { name: "v(limit)", values: AV }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "Kütle sabit: alan arttıkça limit hız azalır",
    catAxisTitle: "kesit alanı (m²)", valAxisTitle: "v (m/s)", valAxisMinVal: 0,
    valAxisMaxVal: 120 } }),
  { x: M + 6.0, y: 1.95, w: CW - 6.0, h: 3.3 }));
[["Kütle 4 katı", "limit hız 2 katı", C.blue],
 ["Alan 4 katı", "limit hız yarısı", C.violet],
 ["Belirleyici", "m / A oranı", C.lime]].forEach((r, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 5.5, w: 3.71, h: 0.9, fill: C.softer });
  s.addText(r[0], { x: x + 0.3, y: 5.5, w: 1.8, h: 0.9, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: x + 2.0, y: 5.5, w: 1.5, h: 0.9, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 13, bold: true, color: r[2], isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 6);
s.addNotes("Sağdaki eğri 1/√A: paraşütün neden bu kadar etkili olduğunu tek bakışta anlatır.");

/* 7 · serbest düşme vs gerçek */
s = T.light(p);
T.head(s, 6, "Serbest düşmeden farkı", C.violet);
T.lede(s, "Serbest düşme, direncin ihmal edilebildiği durumların modelidir.");
const R2 = [["", "Serbest düşme (ideal)", "Gerçek düşüş"],
  ["Etkiyen kuvvet", "yalnızca ağırlık", "ağırlık + hava direnci"],
  ["İvme", "sabit, g", "g'den başlar, sıfıra iner"],
  ["Hız", "sınırsız artar", "limit hızda sabitlenir"],
  ["Kütlenin rolü", "yok", "var (m/A oranı)"]];
R2.forEach((r, i) => {
  const y = 2.0 + i * 0.8;
  if (i > 0) {
    s.addShape("roundRect", { x: M, y: y, w: 9.4, h: 0.7, rectRadius: 0.08,
      fill: { color: i % 2 ? C.white : C.softer }, line: { color: C.line, width: 1 } });
  }
  [[M + 0.3, 2.6], [M + 3.1, 3.1], [M + 6.3, 3.0]].forEach((c, j) => {
    s.addText(r[j], { x: c[0], y: y, w: c[1], h: 0.7, valign: "middle", fontFace: F.body,
      fontSize: i === 0 ? 11.5 : 13, bold: i === 0 || j === 0,
      color: i === 0 ? C.dim : (j === 0 ? C.ink : C.muted), charSpacing: i === 0 ? 1 : 0,
      isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M + 9.8, y: 2.0, w: CW - 9.8, h: 3.5, fill: C.softer });
s.addText("Model ne zaman geçerli?", { x: M + 10.05, y: 2.25, w: 1.9, h: 0.6, fontFace: F.body,
  fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Kısa mesafe, yoğun ve küçük cisim, düşük hız → serbest düşme iyi çalışır.\n\n" +
  "Uzun düşüş, hafif ve geniş cisim → direnç ihmal edilemez.", {
  x: M + 10.05, y: 2.95, w: 1.9, h: 2.4, size: 11.5 });
T.body(s, "Galileo'nun kulesi ile paraşütçünün atlayışı aynı fizikle anlatılır; fark, " +
  "direncin ihmal edilip edilemeyeceğidir.", { x: M, y: 5.7, w: 9.4, h: 0.6, size: 13 });
T.footer(s, FOOT, 7);
s.addNotes("Fizikte model kurma fikrini anlatmak için iyi bir yer: hangi kuvveti ne zaman ihmal ederiz?");

/* 8 · paraşüt */
s = T.light(p);
T.head(s, 7, "Paraşüt: alanı büyüt, hızı düşür", C.rose);
T.lede(s, "Kütle değişmez; değişen tek şey k, yani şekil ve alan.");
const PT = [], PV = [];
{
  let v = 0, t = 0;
  const M2 = 80, k1 = (M2 * GR) / (55 * 55), k2 = (M2 * GR) / (5.1 * 5.1);
  for (let i = 0; i <= 90; i++) {
    PT.push(+t.toFixed(1));
    PV.push(+v.toFixed(2));
    for (let j = 0; j < 20; j++) {
      const k = t < 25 ? k1 : k2;
      v += (GR - (k / M2) * v * v) * 0.05;
      t += 0.05;
    }
  }
}
s.addChart(p.ChartType.scatter, [{ name: "t", values: PT }, { name: "hız", values: PV }],
  Object.assign(T.chartOpts({ colors: [C.rose], extra: {
    title: "Paraşütçünün hızı: iki plato, iki denge",
    catAxisTitle: "t (s)", valAxisTitle: "v (m/s)", valAxisMinVal: 0 } }),
  { x: M, y: 1.95, w: 7.2, h: 4.45 }));
T.formula(s, "A → 25A  ⇒  v → v / 5", { x: M + 7.55, y: 1.95, w: CW - 7.55, h: 0.75, size: 14,
  fill: "FBE9EE", color: C.rose });
T.body(s, "Açılma anında hız hâlâ eski limit hızdadır; direnç birden ağırlığın çok üstüne çıkar " +
  "ve yukarı yönlü büyük bir net kuvvet doğar. Paraşütçünün hissettiği sarsıntı budur.", {
  x: M + 7.55, y: 2.95, w: 4.2, h: 1.6, size: 13 });
T.card(s, { x: M + 7.55, y: 4.65, w: CW - 7.55, h: 1.75, fill: C.softer });
s.addText("Ölçek etkisi", { x: M + 7.9, y: 4.85, w: 3.5, h: 0.4, fontFace: F.body, fontSize: 14,
  bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Kütle uzunluğun küpüyle, alan karesiyle küçülür. Küçük bir böceğin m/A oranı çok " +
  "düşüktür; limit hızı o kadar küçüktür ki yüksekten düşmesi onu incitmez.", {
  x: M + 7.9, y: 5.3, w: 3.4, h: 1.0, size: 12 });
T.footer(s, FOOT, 8);
s.addNotes("Grafikteki iki plato: ikisi de denge. Öğrenciye 'hangi anda ivme en büyük?' diye sor — açılma anı.");

/* 9 · tipik değerler */
s = T.light(p);
T.head(s, 8, "Tipik limit hızlar", C.blue);
T.lede(s, "Hepsi aynı bağıntının sonucudur; değişen tek şey m/A oranı.");
const VALS = [["Sis damlacığı", "≈ 0,01 m/s", "çok küçük m/A"],
  ["Yağmur damlası", "≈ 9 m/s", "küçük kütle, küresel"],
  ["Tenis topu", "≈ 25 m/s", "orta m/A"],
  ["Paraşütçü (kol-bacak açık)", "≈ 55 m/s", "büyük kütle, orta alan"],
  ["Paraşütçü (dalış)", "≈ 90 m/s", "alan iyice küçülür"],
  ["Açık paraşüt", "≈ 5 m/s", "alan onlarca kat büyür"]];
VALS.forEach((r, i) => {
  const y = 1.95 + i * 0.76;
  T.card(s, { x: M, y: y, w: CW, h: 0.66, fill: i % 2 ? C.white : C.softer });
  s.addText(r[0], { x: M + 0.35, y: y, w: 4.4, h: 0.66, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 4.9, y: y, w: 2.4, h: 0.66, valign: "middle", fontFace: "Courier New",
    fontSize: 13, color: C.blue, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 7.5, y: y, w: 4.0, h: 0.66, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.dim, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 9);
s.addNotes("Yağmur damlası satırı önemli: 2 km'den düşen damla neden öldürmüyor? Çünkü 9 m/s'de sabitleniyor.");

/* 10–12 örnekler */
function ornek(no, baslik, soru, cevap, adimlar, notlar, sayfa, tone) {
  const sl = T.light(p);
  T.head(sl, no, baslik, tone);
  T.lede(sl, "Çözümlerde g = 10 m/s² alınmıştır.");
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

ornek(9, "Çözümlü örnek · limit hızda kuvvetler",
  "80 kg kütleli bir paraşütçü, paraşütü kapalıyken 50 m/s'lik limit hızıyla düşmektedir.\n\n" +
  "(a) Hava direnci kaç N'dur?\n(b) İvmesi nedir?",
  "(a) 800 N · (b) 0",
  [["a", "Limit hızda net kuvvet sıfırdır → F(direnç) = m·g = 80 · 10 = 800 N"],
   ["b", "ΣF = 0 olduğu için a = 0"],
   ["!", "Hız sıfır değil: cisim 50 m/s ile düşmeye devam eder. Sabit olan hız, sıfır olan ivmedir."]],
  "Bu soru en sık yapılan hatayı hedefler: 'ivme sıfır' ile 'hız sıfır' karışıklığı.",
  10, C.blue);

ornek(10, "Çözümlü örnek · direnç katsayısı",
  "Kütlesi 2 kg olan bir cismin limit hızı 20 m/s ölçülüyor. Direnç F = k·v² modeliyle veriliyor.\n\n" +
  "(a) k kaçtır?\n(b) Hız 10 m/s iken ivme ne olur?",
  "(a) 0,05 kg/m · (b) 7,5 m/s²",
  [["a", "Limit hızda m·g = k·v² → 20 = k · 400 → k = 0,05 kg/m"],
   ["b", "v = 10 m/s → F(direnç) = 0,05 · 100 = 5 N"],
   ["2", "Net kuvvet: 20 − 5 = 15 N → a = 15 / 2 = 7,5 m/s²"],
   ["!", "Hız limitin yarısındayken ivme hâlâ g'nin dörtte üçü: direnç v² ile büyür."]],
  "Son satır v² bağımlılığının sezgisel sonucudur; öğrenciler 'yarı hızda yarı ivme' bekler.",
  11, C.violet);

ornek(11, "Çözümlü örnek · paraşüt açılınca",
  "Limit hızı 50 m/s olan paraşütçünün yüzey alanı, paraşüt açılınca 25 katına çıkıyor.\n\n" +
  "(a) Yeni limit hız nedir?\n(b) Açılma anındaki ivmesi ne olur?",
  "(a) 10 m/s · (b) ≈ 24g yukarı",
  [["a", "v ∝ 1/√A → 50 / √25 = 10 m/s"],
   ["b", "Açılma anında hız hâlâ 50 m/s; yeni k ile direnç 25·m·g olur"],
   ["2", "Net kuvvet = 25mg − mg = 24mg (yukarı) → a = 24g ≈ 240 m/s²"],
   ["!", "Gerçek paraşütler açılmayı birkaç saniyeye yayarak bu ivmeyi düşürür."]],
  "Sayı büyük çıkıyor çünkü model ani açılma varsayıyor; gerçekte yavaşça açılır. Bunu belirtmek iyi olur.",
  12, C.rose);

/* 13 · hatalar */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Limit hızda hız sıfırdır", "Sıfır olan ivmedir; hız sabit ve büyüktür."],
 ["Limit hızda kuvvet etki etmez", "İki büyük kuvvet vardır; net kuvvet sıfırdır."],
 ["Ağır cisim her zaman hızlı düşer", "Belirleyici olan m/A oranıdır."],
 ["Direnç hızla doğru orantılıdır", "Günlük hızlarda v² ile artar."],
 ["Paraşüt kütleyi azaltır", "Yalnızca alanı büyütür; kütle aynıdır."],
 ["Limit hıza ulaşınca cisim durur", "Durmaz; sabit hızla düşmeye devam eder."]].forEach((h, i) => {
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
s.addNotes("İlk iki madde aynı kökten geliyor: 'net kuvvet sıfır' ile 'kuvvet yok' karışıklığı.");

/* 14 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Direnç hıza bağlıdır", "F = k·v²: hız iki katına çıkarsa direnç dört katına."],
 ["Denge bir sınır doğurur", "m·g = k·v² olduğunda ivme sıfırlanır, hız sabitlenir."],
 ["Belirleyici olan m/A", "Kütlenin kareköküyle artar, alanın kareköküyle azalır."],
 ["İvme sıfır, hız değil", "Limit hızda cisim hâlâ (hem de hızla) düşmektedir."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5, fontFace: F.head,
    fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 3.9, h: 0.45, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 5.05, y: y - 0.04, w: 5.9, h: 0.62, fontFace: F.body, fontSize: 13.5,
    color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([{ text: "Hava direnci laboratuvarı, paraşüt ve kâğıt deneyi:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/limit-hiz.html", options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta siteyi aç: kâğıt deneyinde aynı kütleli iki kâğıdın farkını canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/limit-hiz.pptx" })
  .then(f => console.log("yazıldı:", f));
