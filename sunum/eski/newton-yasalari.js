const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Newton'un hareket yasaları", "Fizik · Kuvvet ve Hareket");
const FOOT = "Kuvvet ve Hareket · Konu 03 · Newton'un hareket yasaları";
const CW = W - M * 2;

/* ---------- 1 · kapak ---------- */
let s = T.dark(p);
s.addText("KUVVET VE HAREKET · KONU 03", {
  x: 0.95, y: 1.7, w: 6, h: 0.35, fontFace: F.body, fontSize: 13, bold: true,
  color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0
});
s.addText("Newton'un\nhareket yasaları", {
  x: 0.9, y: 2.05, w: 7.6, h: 1.9, fontFace: F.head, fontSize: 44, bold: true,
  color: C.white, lineSpacingMultiple: 1.1, isTextBox: true, margin: 0
});
s.addText(
  "Cisimler kendiliğinden hızlanmaz, yavaşlamaz, yön değiştirmez. Hareketi " +
  "değiştiren tek şey net kuvvettir. Üç yasa bunun ne kadarını, nasıl ve " +
  "kime yaptığını söyler.", {
  x: 0.95, y: 4.2, w: 7.0, h: 1.1, fontFace: F.body, fontSize: 15.5,
  color: "C3CEE8", lineSpacingMultiple: 1.25, isTextBox: true, margin: 0
});
s.addText("ΣF = 0  →  a = 0        ΣF = m · a        F₁₂ = −F₂₁", {
  x: 0.95, y: 5.5, w: 7.6, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0
});
/* serbest cisim diyagramı motifi */
const BX = 10.85, BY = 3.5, BS = 1.0;
s.addShape("roundRect", { x: BX, y: BY, w: BS, h: BS, rectRadius: 0.1,
  fill: { color: "1E2A4D" }, line: { color: C.limeBright, width: 1.5 } });
s.addShape("line", { x: BX + BS / 2, y: BY - 0.95, w: 0, h: 0.95, flipV: true,
  line: { color: C.limeBright, width: 2.5, endArrowType: "triangle" } });
s.addShape("line", { x: BX + BS / 2, y: BY + BS, w: 0, h: 0.95,
  line: { color: "9C8CFF", width: 2.5, endArrowType: "triangle" } });
s.addShape("line", { x: BX + BS, y: BY + BS / 2, w: 1.05, h: 0,
  line: { color: "82AAFF", width: 2.5, endArrowType: "triangle" } });
s.addShape("line", { x: BX - 0.8, y: BY + BS / 2, w: 0.8, h: 0, flipH: true,
  line: { color: "FF8FA3", width: 2.5, endArrowType: "triangle" } });
s.addText("N", { x: BX + BS / 2 - 0.35, y: BY - 1.35, w: 0.7, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 12, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
s.addText("G", { x: BX + BS / 2 - 0.35, y: BY + BS + 0.98, w: 0.7, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 12, bold: true, color: "9C8CFF", isTextBox: true, margin: 0 });
s.addText("F", { x: BX + BS + 1.1, y: BY + BS / 2 - 0.17, w: 0.5, h: 0.34, valign: "middle",
  fontFace: F.body, fontSize: 12, bold: true, color: "82AAFF", isTextBox: true, margin: 0 });
s.addText("f", { x: BX - 1.3, y: BY + BS / 2 - 0.17, w: 0.42, h: 0.34, align: "right",
  valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: "FF8FA3",
  isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/newton-yasalari.html", null, true);
s.addNotes("Açılışta sağdaki şemayı göster: dinamikteki her problem bu dört oktan birine bakarak çözülür. Ders boyunca bu diyagrama döneceğiz.");

/* ---------- 2 · bu derste ---------- */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: kuvvet kavramından çözümlü örneklere.");
const AGENDA = [
  ["Kuvvet ve net kuvvet", "Vektörel toplama, dengelenmiş kuvvetler.", C.blue],
  ["1. yasa: eylemsizlik", "Net kuvvet sıfırsa hareket değişmez.", C.violet],
  ["2. yasa: ΣF = m·a", "İvme kuvvetle doğru, kütleyle ters orantılı.", C.lime],
  ["3. yasa: etki–tepki", "Kuvvetler çiftler hâlinde ortaya çıkar.", C.amber],
  ["Serbest cisim diyagramı", "Her problemi çözen beş adımlık yöntem.", C.rose],
  ["Sürtünme ve asansör", "Statik–kinetik sürtünme, görünen ağırlık.", C.blue]
];
AGENDA.forEach((a, i) => {
  const col = i % 3, row = Math.floor(i / 3);
  const x = M + col * (3.71 + 0.4), y = 1.95 + row * 2.28;
  T.card(s, { x: x, y: y, w: 3.71, h: 2.05 });
  s.addShape("ellipse", { x: x + 0.28, y: y + 0.28, w: 0.42, h: 0.42,
    fill: { color: a[2] }, line: { type: "none" } });
  s.addText(String(i + 1), { x: x + 0.28, y: y + 0.28, w: 0.42, h: 0.42, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 11.5, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(a[0], { x: x + 0.85, y: y + 0.26, w: 2.7, h: 0.46, fontFace: F.body,
    fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  T.body(s, a[1], { x: x + 0.3, y: y + 0.95, w: 3.1, h: 0.9, size: 12.5 });
});
T.footer(s, FOOT, 2);
s.addNotes("Üç yasa birbirinin devamı: 1. yasa 'ne zaman hiçbir şey olmaz', 2. yasa 'olursa ne kadar olur', 3. yasa 'kuvvet nereden gelir' sorusunu yanıtlar.");

/* ---------- 3 · kuvvet ve net kuvvet ---------- */
s = T.light(p);
T.head(s, 2, "Kuvvet ve net kuvvet", C.blue);
T.lede(s, "Hareketi belirleyen tek tek kuvvetler değil, hepsinin vektörel toplamıdır.");
[["Aynı yönde", "ΣF = F₁ + F₂", "kuvvetler toplanır", C.blue],
 ["Zıt yönde", "ΣF = F₁ − F₂", "büyükten küçük çıkarılır", C.violet],
 ["Birbirine dik", "ΣF = √(F₁² + F₂²)", "dik üçgen kurulur", C.lime]].forEach((k, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 1.95, w: 3.71, h: 2.15 });
  s.addText(k[0], { x: x + 0.32, y: 2.15, w: 3.1, h: 0.4, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.formula(s, k[1], { x: x + 0.32, y: 2.62, w: 3.05, h: 0.6, size: 13.5, color: k[3] });
  T.body(s, k[2], { x: x + 0.32, y: 3.35, w: 3.05, h: 0.5, size: 12.5 });
});
T.card(s, { x: M, y: 4.4, w: 7.4, h: 2.0, fill: C.softer });
s.addText("Dengelenmiş kuvvetler", { x: M + 0.35, y: 4.62, w: 6.5, h: 0.4, fontFace: F.body,
  fontSize: 15.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Net kuvvet sıfırsa cisim ya durgundur ya da sabit hızla doğrusal hareket eder. " +
  "Fizik açısından bu iki durum arasında hiçbir fark yoktur: ikisi de denge hâlidir ve " +
  "ikisinde de ivme sıfırdır.", { x: M + 0.35, y: 5.1, w: 6.6, h: 1.1, size: 13.5 });
T.card(s, { x: M + 7.75, y: 4.4, w: CW - 7.75, h: 2.0 });
T.stat(s, "1 N", "bir kilogramlık cismi 1 m/s² ivmelendiren kuvvet", {
  x: M + 8.1, y: 4.6, w: 3.4, h: 1.0, color: C.blue, size: 34 });
T.footer(s, FOOT, 3);
s.addNotes("Kuvvetin vektör olduğunu vurgula: yönü olmayan bir kuvvetten söz edilemez. Newton biriminin tanımı 2. yasadan gelir.");

/* ---------- 4 · 1. yasa ---------- */
s = T.light(p);
T.head(s, 3, "1. yasa: eylemsizlik", C.violet);
T.lede(s, "Net kuvvet sıfırsa hareket durumu hiç değişmez.");
T.card(s, { x: M, y: 1.95, w: 6.4, h: 1.75, fill: "F1EDFB", line: "D9CFF3" });
s.addText("Duran cisim durmaya, hareketli cisim sabit hızla doğrusal hareketine devam eder.", {
  x: M + 0.4, y: 1.95, w: 5.7, h: 1.75, valign: "middle", fontFace: F.head, fontSize: 18,
  bold: true, color: C.ink, lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
T.body(s, "Cisimlerin hareket durumundaki değişime gösterdiği bu dirence " +
  "eylemsizlik (atalet) denir. Eylemsizliğin ölçüsü kütledir: kütle büyüdükçe " +
  "cismin hızını değiştirmek zorlaşır.", { x: M, y: 3.95, w: 6.4, h: 1.2, size: 13.5 });
T.formula(s, "kütle = eylemsizliğin ölçüsü", { x: M, y: 5.25, w: 6.4, h: 0.6, size: 13,
  fill: "F1EDFB", color: C.violet });
T.card(s, { x: M + 6.8, y: 1.95, w: CW - 6.8, h: 4.45 });
s.addText("Günlük hayatta", { x: M + 7.15, y: 2.18, w: 4.3, h: 0.4, fontFace: F.body,
  fontSize: 15.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
[["Ani frende öne savrulmak", "otobüs yavaşlar, sen eski hızınla devam edersin"],
 ["Kalkışta arkaya yaslanmak", "araç hızlanır, sen durgunluğunu korursun"],
 ["Masa örtüsünü hızlı çekmek", "tabaklara yeterince kuvvet aktarılmaz"],
 ["Emniyet kemeri", "tam olarak bu yüzden vardır"]].forEach((e, i) => {
  const y = 2.7 + i * 0.92;
  s.addShape("ellipse", { x: M + 7.15, y: y + 0.13, w: 0.17, h: 0.17,
    fill: { color: C.violet }, line: { type: "none" } });
  s.addText(e[0], { x: M + 7.5, y: y, w: 4.0, h: 0.4, fontFace: F.body, fontSize: 13.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.body(s, e[1], { x: M + 7.5, y: y + 0.36, w: 4.0, h: 0.45, size: 11.5 });
});
T.footer(s, FOOT, 4);
s.addNotes("Sınıfta sor: 'Otobüs frene basınca seni öne iten kuvvet hangisi?' Cevap: hiçbiri. Kuvvet seni öne itmiyor, otobüs altından yavaşlıyor.");

/* ---------- 5 · 2. yasa ---------- */
s = T.light(p);
T.head(s, 4, "2. yasa: ΣF = m · a", C.lime);
T.lede(s, "Net kuvvet varsa cisim ivmelenir; ivmenin yönü daima net kuvvetin yönündedir.");
T.formula(s, "ΣF = m · a        a = ΣF / m", { x: M, y: 1.9, w: CW, h: 0.8, size: 19,
  fill: "EAF7DC", color: C.lime });
const FX = [], AF = [];
for (let i = 0; i <= 25; i++) { FX.push(i * 2); AF.push(+((i * 2) / 5).toFixed(2)); }
s.addChart(p.ChartType.scatter, [{ name: "F", values: FX }, { name: "a", values: AF }],
  Object.assign(T.chartOpts({ colors: [C.blue], extra: {
    title: "Kütle sabit (5 kg): a, kuvvetle doğru orantılı",
    catAxisTitle: "net kuvvet (N)", valAxisTitle: "ivme (m/s²)", valAxisMinVal: 0 } }),
  { x: M, y: 2.95, w: 5.8, h: 3.45 }));
const MX = [], AM = [];
for (let i = 0; i <= 36; i++) { const m = 1 + i * 0.25; MX.push(+m.toFixed(2)); AM.push(+(20 / m).toFixed(2)); }
s.addChart(p.ChartType.scatter, [{ name: "m", values: MX }, { name: "a", values: AM }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "Kuvvet sabit (20 N): a, kütleyle ters orantılı",
    catAxisTitle: "kütle (kg)", valAxisTitle: "ivme (m/s²)", valAxisMinVal: 0 } }),
  { x: M + 6.13, y: 2.95, w: CW - 6.13, h: 3.45 }));
T.footer(s, FOOT, 5);
s.addNotes("Soldaki doğru, sağdaki hiperbol. Kuvveti iki katına çıkarmak ivmeyi iki katına çıkarır; kütleyi iki katına çıkarmak ivmeyi yarıya indirir.");

/* ---------- 6 · 3. yasa ---------- */
s = T.light(p);
T.head(s, 5, "3. yasa: etki–tepki", C.amber);
T.lede(s, "Kuvvetler yalnız başına var olmaz; daima çiftler hâlinde ortaya çıkar.");
T.card(s, { x: M, y: 1.95, w: 7.3, h: 1.6, fill: "FDF4E3", line: "F0DCB4" });
s.addText("Bir cisim ikinciye kuvvet uygularsa, ikincisi de birinciye eşit büyüklükte ve zıt yönde kuvvet uygular.", {
  x: M + 0.4, y: 1.95, w: 6.6, h: 1.6, valign: "middle", fontFace: F.head, fontSize: 16.5,
  bold: true, color: C.ink, lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
/* iki araba şeması */
const TY = 4.55;
s.addShape("line", { x: M + 0.3, y: TY + 0.5, w: 6.7, h: 0, line: { color: C.line, width: 2 } });
s.addShape("roundRect", { x: M + 1.5, y: TY - 0.05, w: 1.0, h: 0.55, rectRadius: 0.07,
  fill: { color: "9FB8EE" }, line: { color: C.blue, width: 1 } });
s.addShape("roundRect", { x: M + 4.6, y: TY - 0.15, w: 1.4, h: 0.65, rectRadius: 0.07,
  fill: { color: "B5A4EC" }, line: { color: C.violet, width: 1 } });
s.addShape("line", { x: M + 0.55, y: TY + 0.22, w: 0.85, h: 0, flipH: true,
  line: { color: C.blue, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: M + 6.1, y: TY + 0.22, w: 0.85, h: 0,
  line: { color: C.violet, width: 3, endArrowType: "triangle" } });
s.addText("F = 60 N", { x: M + 0.3, y: TY - 0.5, w: 1.4, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11.5, bold: true, color: C.blue, isTextBox: true, margin: 0 });
s.addText("F = 60 N", { x: M + 5.8, y: TY - 0.5, w: 1.4, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11.5, bold: true, color: C.violet, isTextBox: true, margin: 0 });
s.addText("2 kg → a = 30 m/s²", { x: M + 1.1, y: TY + 0.62, w: 1.9, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11, color: C.muted, isTextBox: true, margin: 0 });
s.addText("6 kg → a = 10 m/s²", { x: M + 4.35, y: TY + 0.62, w: 1.9, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11, color: C.muted, isTextBox: true, margin: 0 });
s.addText("Kuvvetler eşit, ivmeler değil: hafif araba üç kat hızlanır.", {
  x: M + 0.3, y: TY + 1.15, w: 6.7, h: 0.4, align: "center", fontFace: F.body, fontSize: 12.5,
  color: C.dim, isTextBox: true, margin: 0 });
T.card(s, { x: M + 7.65, y: 1.95, w: CW - 7.65, h: 2.25 });
s.addText("Örnekler", { x: M + 8.0, y: 2.15, w: 3.5, h: 0.35, fontFace: F.body, fontSize: 14.5,
  bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.bullets(s, ["Yürümek: ayak yeri geri iter, yer seni ileri iter",
  "Roket: gazı aşağı iter, gaz roketi yukarı iter",
  "Tüfeğin geri tepmesi", "Yüzerken suyu geriye itmek"],
  { x: M + 8.0, y: 2.6, w: 3.3, h: 1.5, size: 12, gap: 6 });
T.card(s, { x: M + 7.65, y: 4.4, w: CW - 7.65, h: 2.0, fill: "FDF4E3", line: "F0DCB4" });
s.addText([
  { text: "Neden dengelemezler? ", options: { bold: true, color: C.ink } },
  { text: "Etki ve tepki farklı cisimlere etki eder. Dengeleme ancak aynı cisme etki eden kuvvetler arasında olur.",
    options: { color: C.muted } }
], { x: M + 8.0, y: 4.4, w: 3.3, h: 2.0, valign: "middle", fontFace: F.body, fontSize: 12.5,
  isTextBox: true, margin: 0 });
T.footer(s, FOOT, 6);
s.addNotes("Klasik yanılgı: 'At arabayı çekiyor, araba atı geri çekiyor; öyleyse hareket edemezler.' Cevap: bu iki kuvvet farklı cisimlerde. Atı hareket ettiren, yerin ata uyguladığı kuvvettir.");

/* ---------- 7 · serbest cisim diyagramı ---------- */
s = T.light(p);
T.head(s, 6, "Serbest cisim diyagramı", C.rose);
T.lede(s, "Dinamik problemlerinin tamamı aynı beş adımla çözülür.");
T.card(s, { x: M, y: 1.95, w: 5.3, h: 4.45, fill: C.softer });
const DX = M + 2.15, DY = 3.75, DS = 1.05;
s.addShape("line", { x: M + 0.55, y: DY + DS, w: 4.2, h: 0,
  line: { color: C.line, width: 2 } });
s.addShape("roundRect", { x: DX, y: DY, w: DS, h: DS, rectRadius: 0.1,
  fill: { color: "C9D8F5" }, line: { color: C.blue, width: 1.5 } });
s.addShape("line", { x: DX + DS / 2, y: DY - 1.0, w: 0, h: 1.0, flipV: true,
  line: { color: C.lime, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: DX + DS / 2, y: DY + DS, w: 0, h: 0.82,
  line: { color: C.violet, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: DX + DS, y: DY + DS / 2, w: 1.2, h: 0,
  line: { color: C.blue, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: DX - 0.85, y: DY + DS / 2, w: 0.85, h: 0, flipH: true,
  line: { color: C.rose, width: 3, endArrowType: "triangle" } });
s.addText("N", { x: DX + DS / 2 - 0.4, y: DY - 1.38, w: 0.8, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 13, bold: true, color: C.lime, isTextBox: true, margin: 0 });
s.addText("G = m·g", { x: DX + DS / 2 - 0.7, y: DY + DS + 0.84, w: 1.4, h: 0.3,
  align: "center", fontFace: F.body, fontSize: 13, bold: true, color: C.violet,
  isTextBox: true, margin: 0 });
s.addText("F", { x: DX + DS + 1.28, y: DY + DS / 2 - 0.17, w: 0.5, h: 0.34, valign: "middle",
  fontFace: F.body, fontSize: 13, bold: true, color: C.blue, isTextBox: true, margin: 0 });
s.addText("f", { x: DX - 1.3, y: DY + DS / 2 - 0.17, w: 0.4, h: 0.34, align: "right",
  valign: "middle", fontFace: F.body, fontSize: 13, bold: true, color: C.rose,
  isTextBox: true, margin: 0 });
s.addText("m", { x: DX, y: DY, w: DS, h: DS, align: "center", valign: "middle",
  fontFace: F.body, fontSize: 15, bold: true, color: "2C3D66", isTextBox: true, margin: 0 });
s.addText("Cisme etki eden tüm kuvvetler — ve yalnızca onlar", {
  x: M + 0.35, y: 6.0, w: 4.6, h: 0.35, align: "center", fontFace: F.body, fontSize: 11.5,
  color: C.dim, isTextBox: true, margin: 0 });
[["1", "İncelenecek cismi seç; onu tek başına çiz."],
 ["2", "Yalnızca o cisme etki eden kuvvetleri çiz: ağırlık, normal, sürtünme, ip gerilmesi, uygulanan kuvvet."],
 ["3", "Cismin başkalarına uyguladığı kuvvetleri çizme."],
 ["4", "Hareket doğrultusunu pozitif seç; eğik kuvvetleri bileşenlerine ayır."],
 ["5", "Her eksen için ΣF = m·a yaz ve bilinmeyeni çöz."]].forEach((k, i) => {
  const y = 1.95 + i * 0.92;
  T.card(s, { x: M + 5.7, y: y, w: CW - 5.7, h: 0.8, fill: i % 2 ? C.white : C.softer });
  s.addShape("ellipse", { x: M + 5.95, y: y + 0.19, w: 0.42, h: 0.42,
    fill: { color: C.rose }, line: { type: "none" } });
  s.addText(k[0], { x: M + 5.95, y: y + 0.19, w: 0.42, h: 0.42, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(k[1], { x: M + 6.55, y: y, w: CW - 6.85, h: 0.8, valign: "middle",
    fontFace: F.body, fontSize: 12.5, color: C.muted, lineSpacingMultiple: 1.1,
    isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 7);
s.addNotes("Diyagramı çizmeden denklem yazdırma. En sık hata 2. ve 3. adımda: öğrenciler cismin masaya uyguladığı kuvveti de diyagrama koyuyor.");

/* ---------- 8 · sürtünme ---------- */
s = T.light(p);
T.head(s, 7, "Sürtünme kuvveti", C.violet);
T.lede(s, "Uygulanan kuvvet arttıkça sürtünme de artar — ama bir yere kadar.");
const UX = [], UY = [];
for (let i = 0; i <= 60; i++) {
  UX.push(i);
  UY.push(i <= 30 ? i : 24);
}
s.addChart(p.ChartType.scatter, [{ name: "F", values: UX }, { name: "sürtünme", values: UY }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "Sürtünme kuvvetinin uygulanan kuvvete göre değişimi",
    catAxisTitle: "uygulanan kuvvet (N)", valAxisTitle: "sürtünme kuvveti (N)",
    valAxisMinVal: 0, lineSmooth: false } }),
  { x: M, y: 1.95, w: 6.9, h: 4.45 }));
T.formula(s, "statik: f ≤ μs·N", { x: M + 7.25, y: 1.95, w: CW - 7.25, h: 0.6, size: 13,
  fill: "F1EDFB", color: C.violet });
T.body(s, "Cisim henüz hareket etmiyorken sürtünme, uygulanan kuvvete eşit büyüklükte " +
  "ortaya çıkar ve onu dengeler. Ama μs·N değerini aşamaz.", {
  x: M + 7.25, y: 2.68, w: 4.3, h: 1.0, size: 12.5 });
T.formula(s, "kinetik: f = μk·N", { x: M + 7.25, y: 3.75, w: CW - 7.25, h: 0.6, size: 13,
  fill: "EAF7DC", color: C.lime });
T.body(s, "Eşik aşıldığı anda cisim harekete başlar; kinetik sürtünme sabittir ve " +
  "genellikle statik eşikten küçüktür. Bu yüzden bir cismi hareket ettirmek, " +
  "hareketini sürdürmekten zordur.", { x: M + 7.25, y: 4.48, w: 4.3, h: 1.2, size: 12.5 });
T.card(s, { x: M + 7.25, y: 5.7, w: CW - 7.25, h: 0.7, fill: C.softer });
s.addText("Sürtünme, temas alanına ve hıza değil; N'ye ve yüzey çiftine bağlıdır.", {
  x: M + 7.5, y: 5.7, w: 4.0, h: 0.7, valign: "middle", fontFace: F.body, fontSize: 11.5,
  color: C.muted, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 8);
s.addNotes("Grafikteki kırılma noktası kritik: o noktaya kadar sürtünme uygulanan kuvvete eşit, sonra sabit. Öğrenciler ilk bölümü genellikle atlıyor.");

/* ---------- 9 · asansör ---------- */
s = T.light(p);
T.head(s, 8, "Ağırlık, normal kuvvet ve asansör", C.amber);
T.lede(s, "Tartı kütleni değil, sana uyguladığı normal kuvveti ölçer.");
T.formula(s, "N = m · (g + a)", { x: M, y: 1.95, w: 5.6, h: 0.75, size: 17, fill: "FDF4E3",
  color: C.amber });
const ROWS = [["Durum", "İvme", "Normal kuvvet", "Tartı (60 kg)"],
  ["Durgun / sabit hız", "a = 0", "N = m·g", "60 kg"],
  ["Yukarı hızlanıyor", "a = +3", "N = m(g + a)", "78 kg"],
  ["Aşağı hızlanıyor", "a = −3", "N = m(g − |a|)", "42 kg"],
  ["Serbest düşme", "a = −g", "N = 0", "0 kg"]];
ROWS.forEach((r, i) => {
  const y = 2.85 + i * 0.66;
  if (i > 0) {
    s.addShape("roundRect", { x: M, y: y, w: 11.0, h: 0.58, rectRadius: 0.08,
      fill: { color: i % 2 ? C.white : C.softer }, line: { color: C.line, width: 1 } });
  }
  const cols = [[M + 0.3, 3.0], [M + 3.4, 1.3], [M + 4.9, 3.0], [M + 8.4, 2.3]];
  r.forEach((txt, j) => {
    s.addText(txt, { x: cols[j][0], y: y, w: cols[j][1], h: 0.58, valign: "middle",
      fontFace: i === 0 ? F.body : (j === 0 ? F.body : "Courier New"),
      fontSize: i === 0 ? 11.5 : 12.5,
      bold: i === 0 || j === 0 || j === 3,
      color: i === 0 ? C.dim : (j === 3 ? (i === 4 ? C.rose : C.ink) : C.muted),
      charSpacing: i === 0 ? 1 : 0, isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M + 5.9, y: 1.95, w: CW - 5.9, h: 0.75, fill: "EAF0FD" });
s.addText("Kütlen hiç değişmez; değişen tartının yazdığı sayıdır.", {
  x: M + 6.2, y: 1.95, w: 5.4, h: 0.75, valign: "middle", fontFace: F.body, fontSize: 13,
  bold: true, color: C.blue, isTextBox: true, margin: 0 });
T.body(s, "Serbest düşmede \"ağırlıksızlık\", yerçekiminin yok olması değildir: sen de tartı da " +
  "aynı ivmeyle düştüğü için aranızda kuvvet kalmaz. Uzay istasyonundaki astronotlar da " +
  "aslında sürekli serbest düşmektedir.", { x: M, y: 6.15, w: CW, h: 0.6, size: 12.5 });
T.footer(s, FOOT, 9);
s.addNotes("Tabloyu satır satır sordur. Son satır en çarpıcısı: tartı sıfır ama yerçekimi hâlâ var.");

/* ---------- 10–12 · örnekler ---------- */
function ornek(no, baslik, soru, cevap, adimlar, notlar, sayfa, tone) {
  const sl = T.light(p);
  T.head(sl, no, baslik, tone);
  T.lede(sl, "Çözümlerde g = 10 m/s² alınmıştır.");
  T.card(sl, { x: M, y: 1.95, w: 4.5, h: 4.45, fill: C.softer });
  sl.addText("SORU", { x: M + 0.35, y: 2.2, w: 3.8, h: 0.3, fontFace: F.body, fontSize: 11,
    bold: true, color: tone, charSpacing: 2, isTextBox: true, margin: 0 });
  T.body(sl, soru, { x: M + 0.35, y: 2.6, w: 3.8, h: 2.9, size: 14 });
  sl.addText("CEVAPLAR", { x: M + 0.35, y: 5.55, w: 3.8, h: 0.28, fontFace: F.body,
    fontSize: 10, bold: true, color: C.dim, charSpacing: 2, isTextBox: true, margin: 0 });
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
    sl.addText(a[1], { x: M + 5.8, y: y, w: CW - 6.1, h: h, valign: "middle",
      fontFace: F.body, fontSize: 13.5, color: C.muted, lineSpacingMultiple: 1.15,
      isTextBox: true, margin: 0 });
  });
  T.footer(sl, FOOT, sayfa);
  sl.addNotes(notlar);
}

ornek(9, "Çözümlü örnek · sürtünmeli zemin",
  "Sürtünme katsayısı 0,2 olan yatay bir zeminde duran 4 kg'lık kutuya yatay doğrultuda " +
  "12 N'luk kuvvet uygulanıyor.\n\nKutunun ivmesi kaç m/s² olur?",
  "a = 1 m/s²",
  [["1", "Düşeyde denge: N = m·g = 4 · 10 = 40 N"],
   ["2", "Sürtünme: f = μ·N = 0,2 · 40 = 8 N"],
   ["3", "Net kuvvet: ΣF = 12 − 8 = 4 N"],
   ["4", "İvme: a = ΣF / m = 4 / 4 = 1 m/s²\nSürtünme olmasaydı a = 3 m/s² olurdu."]],
  "Önce düşey denge, sonra sürtünme, sonra yatay denklem. Bu sıralamayı alışkanlık hâline getirt.",
  10, C.blue);

ornek(10, "Çözümlü örnek · bağlı cisimler",
  "Sürtünmesiz yatay zeminde iple bağlı 2 kg ve 3 kg'lık cisimler, 2 kg'lık cisimden " +
  "F = 20 N ile çekiliyor.\n\nSistemin ivmesi ve ipteki gerilme kuvveti nedir?",
  "a = 4 m/s² · T = 12 N",
  [["1", "Sistemi tek cisim gibi düşün: a = F / (m₁ + m₂) = 20 / 5 = 4 m/s²"],
   ["2", "Yalnızca 3 kg'lık cismi incele: ona etki eden tek yatay kuvvet ip gerilmesidir."],
   ["3", "T = m₂ · a = 3 · 4 = 12 N"],
   ["4", "Kontrol (2 kg): 20 − 12 = 8 N = 2 · 4 ✓"]],
  "İki aşamalı yöntem: önce bütün sistem (iç kuvvetler görünmez), sonra tek cisim (iç kuvvet ortaya çıkar).",
  11, C.violet);

ornek(11, "Çözümlü örnek · eğik düzlem",
  "Yatayla 37° açı yapan eğik düzlemde 10 kg'lık bir cisim aşağı doğru kayıyor. " +
  "Sürtünme katsayısı 0,2'dir.\n\nCismin ivmesi nedir?\n(sin37° = 0,6 · cos37° = 0,8)",
  "a = 4,4 m/s²",
  [["1", "Eğime paralel bileşen: m·g·sinθ = 10 · 10 · 0,6 = 60 N"],
   ["2", "Eğime dik denge: N = m·g·cosθ = 10 · 10 · 0,8 = 80 N"],
   ["3", "Sürtünme: f = μ·N = 0,2 · 80 = 16 N (harekete zıt, yukarı)"],
   ["4", "a = (60 − 16) / 10 = 4,4 m/s²"]],
  "Eğik düzlemde eksenleri eğime paralel/dik seçmek şart. N = m·g değildir; m·g·cosθ'dır.",
  12, C.amber);

/* ---------- 13 · hatalar ---------- */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
const HATA = [
  ["Hareket eden cisme mutlaka kuvvet etki eder", "Sabit hızda net kuvvet sıfırdır; kuvvet hareketi değil, değişimi doğurur."],
  ["Etki ve tepki birbirini dengeler", "Farklı cisimlere etki ettikleri için dengeleyemezler."],
  ["Kütle ile ağırlık aynı şeydir", "Kütle kg (skaler), ağırlık N (vektör) ve g'ye bağlıdır."],
  ["Normal kuvvet her zaman m·g'dir", "Asansörde, eğik düzlemde ve eğik kuvvette değişir."],
  ["Sürtünme daima hareketi engeller", "Yürümeyi, frenlemeyi sağlayan da odur; bağıl kaymaya zıttır."],
  ["İvme hız yönündedir", "İvme net kuvvetin yönündedir; yavaşlamada hıza zıttır."]
];
HATA.forEach((h, i) => {
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
T.footer(s, FOOT, 13);
s.addNotes("Bu altı madde konunun sınav yüzü. Her birini önceki slaytlardaki örneklerle eşleştir.");

/* ---------- 14 · özet ---------- */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Net kuvvet her şeyi belirler", "Tek tek kuvvetler değil, vektörel toplamları önemlidir."],
 ["ΣF = 0 ise hareket değişmez", "Durgunluk ile sabit hız aynı kapıya çıkar: ivme sıfır."],
 ["ΣF = m·a", "İvme kuvvetle doğru, kütleyle ters orantılı; yönü net kuvvetin yönünde."],
 ["Kuvvetler çift gelir", "Etki ve tepki eşit ve zıttır, ama farklı cisimlere etki eder."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5,
    fontFace: F.head, fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 3.9, h: 0.45, fontFace: F.body,
    fontSize: 15.5, bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 5.05, y: y - 0.04, w: 5.9, h: 0.62, fontFace: F.body,
    fontSize: 13.5, color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([
  { text: "Kuvvet laboratuvarı, etki–tepki arabaları ve asansör deneyi:  ",
    options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/newton-yasalari.html",
    options: { color: C.limeBright, bold: true } }
], { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body,
  fontSize: 13, isTextBox: true, margin: 0 });
s.addNotes("Kapanışta siteyi aç: 01'de kuvveti ve kütleyi değiştirip ivmenin nasıl tepki verdiğini canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/newton-yasalari.pptx" })
  .then(f => console.log("yazıldı:", f));
