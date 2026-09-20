const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Düzgün çembersel hareket", "Fizik · Kuvvet ve Hareket");
const FOOT = "Kuvvet ve Hareket · Konu 06 · Düzgün çembersel hareket";
const CW = W - M * 2;
const GR = 9.81;

/* 1 · kapak */
let s = T.dark(p);
s.addText("KUVVET VE HAREKET · KONU 06", { x: 0.95, y: 1.7, w: 7, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("Düzgün\nçembersel hareket", { x: 0.9, y: 2.0, w: 8.0, h: 1.9, fontFace: F.head,
  fontSize: 42, bold: true, color: C.white, lineSpacingMultiple: 1.1, isTextBox: true, margin: 0 });
s.addText("Sürat sabit olabilir; ama hız her an yön değiştiriyorsa hareket ivmelidir. " +
  "Bu ivme daima merkeze doğrudur ve onu üreten kuvvet olmadan cisim çemberde kalamaz.", {
  x: 0.95, y: 4.15, w: 7.1, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("v = 2πr / T        a = v² / r        F = m·v² / r", {
  x: 0.95, y: 5.45, w: 7.6, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* çember motifi */
s.addShape("ellipse", { x: 9.55, y: 2.35, w: 2.9, h: 2.9, fill: { type: "none" },
  line: { color: "3D4C74", width: 2, dashType: "dash" } });
s.addShape("ellipse", { x: 10.93, y: 3.73, w: 0.14, h: 0.14, fill: { color: "6A7798" },
  line: { type: "none" } });
s.addShape("ellipse", { x: 12.18, y: 3.62, w: 0.36, h: 0.36, fill: { color: "82AAFF" },
  line: { type: "none" } });
s.addShape("line", { x: 12.36, y: 2.55, w: 0, h: 1.05, flipV: true,
  line: { color: "82AAFF", width: 2.5, endArrowType: "triangle" } });
s.addShape("line", { x: 11.15, y: 3.8, w: 1.03, h: 0, flipH: true,
  line: { color: "FF8FA3", width: 2.5, endArrowType: "triangle" } });
s.addText("v", { x: 12.15, y: 2.2, w: 0.5, h: 0.3, fontFace: F.body, fontSize: 12, bold: true,
  color: "82AAFF", isTextBox: true, margin: 0 });
s.addText("a", { x: 10.75, y: 3.9, w: 0.5, h: 0.3, fontFace: F.body, fontSize: 12, bold: true,
  color: "FF8FA3", isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/cembersel-hareket.html", null, true);
s.addNotes("Açılış: 'Sabit süratle dönen bir cismin ivmesi var mıdır?' Çoğu öğrenci hayır der; ders bu cevabı düzeltmek üzerine kurulu.");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: periyottan viraj güvenliğine.");
[["Tanım", "Sabit süratli ama ivmeli hareket.", C.blue],
 ["Periyot ve frekans", "T, f ve açısal hız ω.", C.violet],
 ["Çizgisel hız", "v = 2πr/T = ω·r.", C.lime],
 ["Merkezcil ivme", "a = v²/r, daima merkeze doğru.", C.amber],
 ["Merkezcil kuvvet", "Yeni bir kuvvet değil, bir rol.", C.rose],
 ["Viraj ve savrulma", "Sınır hız √(μgr).", C.blue]
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
s.addNotes("Bu konu Newton yasalarının çembersel harekete uygulanmasıdır; yeni bir yasa yok.");

/* 3 · tanım */
s = T.light(p);
T.head(s, 2, "Sabit sürat, değişen hız", C.blue);
T.lede(s, "Hız bir vektördür: büyüklüğü sabit olsa da yönü değişiyorsa hız değişiyordur.");
T.card(s, { x: M, y: 1.95, w: 7.2, h: 1.8, fill: "EAF0FD" });
s.addText("Düzgün çembersel hareket, sabit süratli ama ivmeli bir harekettir.", {
  x: M + 0.4, y: 1.95, w: 6.5, h: 1.8, valign: "middle", fontFace: F.head, fontSize: 19,
  bold: true, color: C.ink, lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
[["Sürat (skaler)", "sabittir: |v| değişmez", C.lime],
 ["Hız (vektör)", "her an yön değiştirir; yörüngeye teğettir", C.blue],
 ["İvme", "hızın yönünü çevirir; merkeze doğrudur", C.rose]].forEach((r, i) => {
  const y = 4.05 + i * 0.82;
  T.card(s, { x: M, y: y, w: 7.2, h: 0.72, fill: i % 2 ? C.white : C.softer });
  s.addText(r[0], { x: M + 0.3, y: y, w: 2.3, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: r[2], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 2.7, y: y, w: 4.3, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.6, y: 1.95, w: CW - 7.6, h: 4.45, fill: C.softer });
s.addText("İvmenin işi ne?", { x: M + 7.95, y: 2.2, w: 3.5, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Doğrusal harekette ivme hızı büyütür ya da küçültür.\n\n" +
  "Düzgün çembersel harekette ise ivme hıza diktir: büyüklüğünü değiştirmez, " +
  "yalnızca yönünü çevirir.\n\n" +
  "Bu yüzden cisim sürekli 'içeri düşer' ama yarıçapı sabit kalır.", {
  x: M + 7.95, y: 2.7, w: 3.4, h: 3.4, size: 13 });
T.footer(s, FOOT, 3);
s.addNotes("İvmenin hıza dik olması fikri bu dersin en soyut kısmı; ipli örnekle somutlaştır.");

/* 4 · periyot, frekans, ω */
s = T.light(p);
T.head(s, 3, "Periyot, frekans ve açısal hız", C.violet);
T.lede(s, "Katı bir cisim dönerken bu üç büyüklük bütün noktalar için ortaktır.");
[["T", "periyot", "bir tam turun süresi", "s"],
 ["f", "frekans", "birim zamandaki tur sayısı", "Hz"],
 ["ω", "açısal hız", "birim zamanda taranan açı", "rad/s"]].forEach((r, i) => {
  const y = 1.95 + i * 1.05;
  T.card(s, { x: M, y: y, w: 7.2, h: 0.92 });
  s.addText(r[0], { x: M + 0.3, y: y, w: 0.7, h: 0.92, valign: "middle", align: "center",
    fontFace: "Courier New", fontSize: 19, bold: true, color: C.violet, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 1.1, y: y, w: 1.8, h: 0.92, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 3.0, y: y, w: 3.3, h: 0.92, valign: "middle", fontFace: F.body,
    fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[3], { x: M + 6.3, y: y, w: 0.7, h: 0.92, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 12.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.formula(s, "T = 1 / f        ω = 2π / T = 2π·f", { x: M, y: 5.2, w: 7.2, h: 0.8, size: 16,
  fill: "F1EDFB", color: C.violet });
T.card(s, { x: M + 7.6, y: 1.95, w: CW - 7.6, h: 4.45, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Ortak olan ne?", { x: M + 7.95, y: 2.2, w: 3.5, h: 0.4, fontFace: F.body, fontSize: 15,
  bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "Dönen bir diskin, tekerleğin ya da atlıkarıncanın üzerindeki bütün noktalar aynı " +
  "sürede bir tur atar.\n\nBu yüzden T, f ve ω ortaktır.\n\n" +
  "Ama çizgisel hız v = ω·r olduğundan, merkezden uzaklaştıkça hız büyür.", {
  x: M + 7.95, y: 2.7, w: 3.4, h: 3.4, size: 13 });
T.footer(s, FOOT, 4);
s.addNotes("Atlıkarınca örneği: dıştaki at daha hızlı ama ikisi de aynı anda turu bitirir.");

/* 5 · çizgisel hız */
s = T.light(p);
T.head(s, 4, "Çizgisel hız", C.lime);
T.lede(s, "Bir turda 2πr yol alınır; bunu T süreye bölmek hızı verir.");
T.formula(s, "v = 2πr / T = ω · r", { x: M, y: 1.95, w: CW, h: 0.85, size: 19, fill: "EAF7DC",
  color: C.lime });
const RX = [], RV = [];
for (let i = 0; i <= 50; i++) { const r = i * 0.1; RX.push(+r.toFixed(1)); RV.push(+(3.14 * r).toFixed(2)); }
s.addChart(p.ChartType.scatter, [{ name: "r", values: RX }, { name: "v", values: RV }],
  Object.assign(T.chartOpts({ colors: [C.lime], extra: {
    title: "Aynı diskte (T = 2 s): yarıçap büyüdükçe çizgisel hız doğrusal artar",
    catAxisTitle: "yarıçap r (m)", valAxisTitle: "v (m/s)", valAxisMinVal: 0 } }),
  { x: M, y: 3.05, w: 7.2, h: 3.35 }));
[["Aynı T", "bütün noktalarda eşit"], ["Aynı ω", "bütün noktalarda eşit"],
 ["Farklı v", "v = ω·r, yarıçapla orantılı"], ["Farklı a", "a = ω²·r, yarıçapla orantılı"]
].forEach((r, i) => {
  const y = 3.05 + i * 0.86;
  T.card(s, { x: M + 7.55, y: y, w: CW - 7.55, h: 0.74, fill: i < 2 ? "EAF7DC" : C.white,
    line: i < 2 ? "CFE8B2" : C.line });
  s.addText(r[0], { x: M + 7.85, y: y, w: 1.5, h: 0.74, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: i < 2 ? C.lime : C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.3, y: y, w: 2.3, h: 0.74, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 5);
s.addNotes("Grafik doğrusal: v ile r doğru orantılı. Bir sonraki slaytta a ile v'nin karesel ilişkisi gelecek.");

/* 6 · merkezcil ivme */
s = T.light(p);
T.head(s, 5, "Merkezcil ivme", C.amber);
T.lede(s, "Yönü daima merkeze doğru; büyüklüğü hızın karesiyle, yarıçapla ters orantılı.");
T.formula(s, "a = v² / r = ω² · r = 4π²r / T²", { x: M, y: 1.95, w: CW, h: 0.8, size: 17,
  fill: "FDF4E3", color: C.amber });
const VX2 = [], AV = [];
for (let i = 0; i <= 40; i++) { const v = i * 0.5; VX2.push(+v.toFixed(1)); AV.push(+((v * v) / 2).toFixed(2)); }
s.addChart(p.ChartType.scatter, [{ name: "v", values: VX2 }, { name: "a", values: AV }],
  Object.assign(T.chartOpts({ colors: [C.blue], extra: {
    title: "r = 2 m sabit: hız 2 katına çıkarsa ivme 4 katına",
    catAxisTitle: "hız v (m/s)", valAxisTitle: "a (m/s²)", valAxisMinVal: 0 } }),
  { x: M, y: 3.0, w: 5.6, h: 3.4 }));
const RX2 = [], AR = [];
for (let i = 2; i <= 60; i++) { const r = i * 0.2; RX2.push(+r.toFixed(1)); AR.push(+((10 * 10) / r).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "r", values: RX2 }, { name: "a", values: AR }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "v = 10 m/s sabit: yarıçap büyüdükçe ivme azalır",
    catAxisTitle: "yarıçap r (m)", valAxisTitle: "a (m/s²)", valAxisMinVal: 0,
    valAxisMaxVal: 120 } }),
  { x: M + 6.0, y: 3.0, w: CW - 6.0, h: 3.4 }));
T.footer(s, FOOT, 6);
s.addNotes("Sağdaki 1/r eğrisi, geniş virajın neden daha güvenli olduğunu anlatır: aynı hızda daha küçük ivme.");

/* 7 · merkezcil kuvvet */
s = T.light(p);
T.head(s, 6, "Merkezcil kuvvet: bir rol, bir kuvvet türü değil", C.rose);
T.lede(s, "Net kuvvet merkeze doğrudur; bu rolü hangi kuvvetin üstlendiği duruma göre değişir.");
T.formula(s, "F = m·a = m·v² / r = m·ω²·r", { x: M, y: 1.95, w: CW, h: 0.8, size: 17,
  fill: "FBE9EE", color: C.rose });
const ROWS = [["Durum", "Merkezcil kuvveti sağlayan", "Bağıntı"],
  ["İpin ucunda dönen taş", "ipteki gerilme kuvveti", "T = mv²/r"],
  ["Virajı alan araç", "yol–lastik sürtünmesi", "μmg ≥ mv²/r"],
  ["Dünya çevresindeki uydu", "yerçekimi", "GMm/r² = mv²/r"],
  ["Çamaşır makinesi sıkma", "tambur duvarının normal kuvveti", "N = mv²/r"]];
ROWS.forEach((r, i) => {
  const y = 3.0 + i * 0.72;
  if (i > 0) {
    s.addShape("roundRect", { x: M, y: y, w: 8.8, h: 0.62, rectRadius: 0.08,
      fill: { color: i % 2 ? C.white : C.softer }, line: { color: C.line, width: 1 } });
  }
  [[M + 0.3, 3.3], [M + 3.7, 3.6], [M + 7.3, 1.4]].forEach((c, j) => {
    s.addText(r[j], { x: c[0], y: y, w: c[1], h: 0.62, valign: "middle",
      fontFace: i === 0 ? F.body : (j === 2 ? "Courier New" : F.body),
      fontSize: i === 0 ? 11 : 12.5, bold: i === 0 || j === 0,
      color: i === 0 ? C.dim : (j === 2 ? C.rose : C.muted), charSpacing: i === 0 ? 1 : 0,
      isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M + 9.2, y: 3.0, w: CW - 9.2, h: 3.4, fill: "FDF4E3", line: "F0DCB4" });
s.addText("Diyagrama eklenmez", { x: M + 9.5, y: 3.25, w: 2.3, h: 0.5, fontFace: F.body,
  fontSize: 13, bold: true, color: C.amber, isTextBox: true, margin: 0 });
T.body(s, "Serbest cisim diyagramına 'merkezcil kuvvet' diye ayrı bir ok çizilmez. " +
  "Var olan kuvvetlerden hangisinin bu rolü üstlendiği bulunur.", {
  x: M + 9.5, y: 3.85, w: 2.2, h: 2.3, size: 11.5 });
T.footer(s, FOOT, 7);
s.addNotes("Tabloyu tek tek sordur: 'Uyduyu çemberde tutan kuvvet hangisi?' Cevap: yerçekimi.");

/* 8 · merkezkaç yanılgısı */
s = T.light(p);
T.head(s, 7, "Merkezkaç kuvveti yanılgısı", C.violet);
T.lede(s, "Virajda kapıya doğru itilme hissinin sebebi bir kuvvet değil, eylemsizliktir.");
T.card(s, { x: M, y: 1.95, w: 5.5, h: 2.5, fill: "FBE9EE", line: "F2C9D4" });
s.addText("✗ Yaygın sanı", { x: M + 0.35, y: 2.15, w: 4.8, h: 0.4, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "Cisme dışarı doğru bir 'merkezkaç kuvveti' etki eder; ip kesilirse cisim " +
  "merkezden uzaklaşan doğrultuda fırlar.", { x: M + 0.35, y: 2.65, w: 4.7, h: 1.6, size: 13 });
T.card(s, { x: M + 5.9, y: 1.95, w: CW - 5.9, h: 2.5, fill: "EAF7DC", line: "CFE8B2" });
s.addText("✓ Doğrusu", { x: M + 6.25, y: 2.15, w: 4.8, h: 0.4, fontFace: F.body, fontSize: 14.5,
  bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "Yerdeki gözlemci için dışarı iten bir kuvvet yoktur. İp kesilince net kuvvet sıfırlanır " +
  "ve cisim 1. yasa gereği teğet doğrultuda düzgün doğrusal hareket eder.", {
  x: M + 6.25, y: 2.65, w: 5.0, h: 1.6, size: 13 });
/* teğet şeması */
const CXX = M + 2.3, CYY = 5.75, RR = 0.82;
s.addShape("ellipse", { x: CXX - RR, y: CYY - RR, w: RR * 2, h: RR * 2, fill: { type: "none" },
  line: { color: C.line, width: 1.5, dashType: "dash" } });
s.addShape("ellipse", { x: CXX - 0.07, y: CYY - 0.07, w: 0.14, h: 0.14, fill: { color: C.dim },
  line: { type: "none" } });
s.addShape("ellipse", { x: CXX + RR - 0.13, y: CYY - 0.13, w: 0.26, h: 0.26,
  fill: { color: C.blue }, line: { type: "none" } });
s.addShape("line", { x: CXX + RR, y: CYY - 0.95, w: 0, h: 0.95, flipV: true,
  line: { color: C.lime, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: CXX + RR + 0.1, y: CYY, w: 1.1, h: 0,
  line: { color: C.rose, width: 2, dashType: "dash", endArrowType: "triangle" } });
s.addText("doğru: teğet", { x: CXX + RR - 0.9, y: CYY - 1.32, w: 1.9, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11, bold: true, color: C.lime, isTextBox: true, margin: 0 });
s.addText("yanlış: dışarı", { x: CXX + RR + 1.25, y: CYY - 0.15, w: 1.6, h: 0.3, fontFace: F.body,
  fontSize: 11, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.card(s, { x: M + 6.6, y: 4.75, w: CW - 6.6, h: 1.65, fill: C.softer });
T.body(s, "\"Merkezkaç kuvveti\" yalnızca dönen bir referans sisteminde tanımlanan hayalî " +
  "(eylemsizlik) kuvvetidir. Yerdeki gözlemci için böyle bir kuvvet yoktur.", {
  x: M + 6.95, y: 4.95, w: 4.8, h: 1.3, size: 12.5 });
T.footer(s, FOOT, 8);
s.addNotes("Şemayı göstererek sor: 'İp kesilirse taş hangi yöne gider?' Sınıfın çoğu kırmızı oku seçer.");

/* 9 · viraj */
s = T.light(p);
T.head(s, 8, "Virajda savrulma sınırı", C.blue);
T.lede(s, "Gereken kuvvet mv²/r, yolun sağlayabildiği en fazla kuvvet μmg.");
const TR = [], V1 = [], V2 = [], V3 = [];
for (let i = 1; i <= 24; i++) {
  const r = i * 10;
  TR.push(r);
  V1.push(+(Math.sqrt(0.8 * GR * r) * 3.6).toFixed(1));
  V2.push(+(Math.sqrt(0.5 * GR * r) * 3.6).toFixed(1));
  V3.push(+(Math.sqrt(0.2 * GR * r) * 3.6).toFixed(1));
}
s.addChart(p.ChartType.scatter,
  [{ name: "r", values: TR }, { name: "kuru (μ = 0,8)", values: V1 },
   { name: "ıslak (μ = 0,5)", values: V2 }, { name: "karlı (μ = 0,2)", values: V3 }],
  Object.assign(T.chartOpts({ colors: [C.lime, C.amber, C.rose], extra: {
    title: "Savrulmadan alınabilecek en büyük hız",
    catAxisTitle: "viraj yarıçapı (m)", valAxisTitle: "v(maks) (km/h)", valAxisMinVal: 0,
    showLegend: true, legendPos: "b", legendFontFace: F.body, legendFontSize: 11,
    legendColor: C.muted } }),
  { x: M, y: 1.95, w: 7.2, h: 4.45 }));
T.formula(s, "v(maks) = √(μ · g · r)", { x: M + 7.55, y: 1.95, w: CW - 7.55, h: 0.75, size: 15,
  fill: "EAF0FD" });
T.bullets(s, ["Kütle sadeleşir: kamyon da otomobil de aynı sınıra sahiptir.",
  "Yarıçap 4 katına çıkarsa sınır hız 2 katına çıkar.",
  "μ yarıya inerse sınır hız √2 kat (≈ %30) düşer.",
  "Bu yüzden virajlar geniş yapılır ve dışa doğru eğimlendirilir."],
  { x: M + 7.55, y: 2.95, w: 4.2, h: 2.6, size: 12.5, gap: 9 });
T.card(s, { x: M + 7.55, y: 5.65, w: CW - 7.55, h: 0.75, fill: "FDF4E3", line: "F0DCB4" });
s.addText("Sürtünme burada merkezcil kuvvet rolündedir.", { x: M + 7.85, y: 5.65, w: 3.9,
  h: 0.75, valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.amber,
  isTextBox: true, margin: 0 });
T.footer(s, FOOT, 9);
s.addNotes("Grafik üç eğri: kışın hız sınırı neden düşürülmeli sorusunun fiziksel cevabı.");

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

ornek(9, "Çözümlü örnek · temel büyüklükler",
  "2 m yarıçaplı çember üzerinde dolanan 0,5 kg'lık cisim 4 saniyede bir tur atıyor.\n\n" +
  "Frekans, çizgisel hız, merkezcil ivme ve kuvveti bulunuz. (π ≈ 3)",
  "0,25 Hz · 3 m/s · 4,5 m/s² · 2,25 N",
  [["1", "f = 1/T = 1/4 = 0,25 Hz"],
   ["2", "v = 2πr/T = (2·3·2)/4 = 3 m/s"],
   ["3", "a = v²/r = 9/2 = 4,5 m/s²"],
   ["4", "F = m·a = 0,5 · 4,5 = 2,25 N (merkeze doğru)"]],
  "Sıralamayı ezberlet: önce T'den f ve v, sonra a, en son F.",
  10, C.blue);

ornek(10, "Çözümlü örnek · aynı diskte iki nokta",
  "Dönen bir diskin merkezinden 20 cm ve 60 cm uzaklıktaki iki noktası karşılaştırılıyor.\n\n" +
  "Periyot, çizgisel hız ve merkezcil ivme oranları nedir?",
  "T eşit · v ve a oranı 3",
  [["1", "Katı cisimde her nokta aynı sürede bir tur atar → T₁ = T₂, ω₁ = ω₂"],
   ["2", "v = ω·r → v₂/v₁ = r₂/r₁ = 60/20 = 3"],
   ["3", "a = ω²·r → a₂/a₁ = r₂/r₁ = 3"],
   ["!", "Aynı diskte v ve a yarıçapla doğru orantılıdır; T ve ω ise ortaktır."]],
  "Bu soru tipi sınavlarda çok çıkıyor. 'Aynı disk' ifadesini görünce ω ortak yazdır.",
  11, C.violet);

ornek(11, "Çözümlü örnek · virajda sınır hız",
  "Yarıçapı 50 m olan virajda lastik–yol sürtünme katsayısı 0,5'tir.\n\n" +
  "(a) Savrulmadan alınabilecek en büyük hız nedir?\n(b) Yol ıslanıp μ 0,2'ye düşerse?",
  "(a) ≈ 57 km/h · (b) 36 km/h",
  [["1", "Gereken kuvvet mv²/r, sağlanabilen en büyük kuvvet μmg → v = √(μgr)"],
   ["a", "v = √(0,5 · 10 · 50) = √250 ≈ 15,8 m/s ≈ 57 km/h"],
   ["b", "v = √(0,2 · 10 · 50) = √100 = 10 m/s = 36 km/h"],
   ["!", "Kütle sadeleşti: sınır hız araç kütlesinden bağımsızdır."]],
  "Son satır sezgiye aykırı gelir: 'ağır araç daha çok savrulur' sanısını burada düzelt.",
  12, C.rose);

/* 13 · hatalar */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Sürat sabitse ivme yoktur", "Hızın yönü değişiyorsa ivme vardır."],
 ["İvme hız yönündedir", "Düzgün çembersel harekette ivme hıza diktir."],
 ["Dışarı doğru merkezkaç kuvveti etki eder", "Yerdeki gözlemci için böyle bir kuvvet yoktur."],
 ["Merkezcil kuvvet ayrı bir kuvvettir", "Gerilme, sürtünme ya da çekim bu rolü üstlenir."],
 ["İp kesilince cisim dışarı fırlar", "Teğet doğrultuda gider."],
 ["Diskin her noktasının hızı aynıdır", "Aynı olan T ve ω; v yarıçapla artar."]].forEach((h, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * (5.85 + 0.23), y = 1.95 + row * 1.52;
  T.card(s, { x: x, y: y, w: 5.85, h: 1.35, fill: C.white });
  s.addText("✗", { x: x + 0.25, y: y + 0.18, w: 0.35, h: 0.35, align: "center", valign: "middle",
    fontFace: F.body, fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
  s.addText(h[0], { x: x + 0.68, y: y + 0.15, w: 4.9, h: 0.42, valign: "middle", fontFace: F.body,
    fontSize: 12.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("✓", { x: x + 0.25, y: y + 0.68, w: 0.35, h: 0.35, align: "center", valign: "middle",
    fontFace: F.body, fontSize: 15, bold: true, color: C.lime, isTextBox: true, margin: 0 });
  s.addText(h[1], { x: x + 0.68, y: y + 0.62, w: 4.9, h: 0.55, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 13);
s.addNotes("İlk iki madde vektör kavramının özü; kalan dördü uygulama hataları.");

/* 14 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Sabit sürat, ivmeli hareket", "Hızın yönü sürekli değişir; ivme merkeze doğrudur."],
 ["v = 2πr/T = ω·r", "Aynı diskte T ve ω ortak, v yarıçapla artar."],
 ["a = v²/r", "Hız 2 katına çıkarsa ivme 4 katına; yarıçap büyürse ivme azalır."],
 ["Merkezcil kuvvet bir roldür", "Gerilme, sürtünme ya da çekim bu rolü üstlenir."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5, fontFace: F.head,
    fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 4.2, h: 0.45, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 5.35, y: y - 0.04, w: 5.6, h: 0.62, fontFace: F.body, fontSize: 13.5,
    color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([{ text: "Çember laboratuvarı, ipi kes deneyi ve viraj sınırı:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/cembersel-hareket.html",
    options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta siteyi aç: ipi kes deneyiyle teğet doğrultuyu canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/cembersel-hareket.pptx" })
  .then(f => console.log("yazıldı:", f));
