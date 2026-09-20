const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Prizmalar", "Fizik · Optik");
const FOOT = "Optik · Konu 07 · Prizmalar";

const D2R = d => (d * Math.PI) / 180, R2D = r => (r * 180) / Math.PI;
function sapma(A, i1, n) {
  const r1 = R2D(Math.asin(Math.min(1, Math.sin(D2R(i1)) / n)));
  const r2 = A - r1;
  const q = n * Math.sin(D2R(r2));
  if (Math.abs(q) > 1) return null;
  return i1 + R2D(Math.asin(q)) - A;
}

let s = B.kapak(p, {
  ust: "OPTİK · KONU 07",
  baslik: "Prizmalar ve renkler",
  lede: "Prizma ışığı iki kez kırarak saptırır. Her renk için indis biraz farklı olduğundan " +
    "beyaz ışık bileşenlerine ayrılır.",
  formul: "r₁ + r₂ = A          δ = i₁ + i₂ − A          n(mor) > n(kırmızı)",
  link: "dersler.perinet.org/prizmalar.html",
  not: "Açılışta Newton'un 1666'daki deneyini anlat: prizma renk üretmiyor, ayırıyor."
});
s.addShape("triangle", { x: 10.3, y: 2.8, w: 2.0, h: 1.8, fill: { color: "1B2544" },
  line: { color: "82AAFF", width: 2 } });
s.addShape("line", { x: 8.9, y: 3.9, w: 1.5, h: 0.25, line: { color: "FFFFFF", width: 3 } });
[["E23B2E", 0.30], ["EF7D1A", 0.42], ["E8C11C", 0.54], ["2EA44F", 0.66],
 ["2563EB", 0.78], ["7C3AED", 0.90]].forEach(q => {
  s.addShape("line", { x: 12.0, y: 4.05, w: 1.0, h: q[1], line: { color: q[0], width: 2.2 } });
});
s.addText("beyaz ışık", { x: 8.5, y: 3.5, w: 1.8, h: 0.3, fontFace: F.body, fontSize: 10,
  color: "6A7798", isTextBox: true, margin: 0 });
s.addText("tayf", { x: 12.2, y: 5.05, w: 1.0, h: 0.3, fontFace: F.body, fontSize: 10,
  color: "6A7798", isTextBox: true, margin: 0 });

B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: sapma açısından gökkuşağına.",
  kartlar: [
    ["Sapma açısı", "δ = i₁ + i₂ − A; ışık tabana doğru sapar.", C.blue],
    ["En küçük sapma", "Simetrik geçişte; indis ölçümünde kullanılır.", C.violet],
    ["Dispersiyon", "Her rengin indisi farklı; beyaz ışık ayrışır.", C.lime],
    ["Tayf", "Kırmızıdan mora renk şeridi.", C.amber],
    ["Tam yansımalı prizma", "45° prizma ışığı 90° ya da 180° döndürür.", C.rose],
    ["Gökkuşağı", "Damlada kırılma + yansıma + kırılma: 42°.", C.blue]
  ],
  not: "Prizma konusu kırılmanın iki kez uygulanmasından ibaret; bunu baştan söylemek rahatlatıyor."
});

/* 3 · sapma */
s = T.light(p);
T.head(s, 2, "Prizmada sapma", C.blue);
T.lede(s, "İki kırılma, tek sonuç: ışık tabana doğru sapar.");
T.formula(s, "r₁ + r₂ = A          δ = i₁ + i₂ − A", { x: M, y: 1.95, w: CW, h: 0.8, size: 17 });
[["A", "tepe açısı", "ışığın girdiği ve çıktığı yüzeyler arasındaki açı", C.blue],
 ["i₁ · r₁", "birinci yüzey", "geliş ve kırılma açıları", C.violet],
 ["r₂ · i₂", "ikinci yüzey", "geliş ve çıkış açıları", C.lime],
 ["δ", "sapma açısı", "gelen ışın ile çıkan ışın arasındaki açı", C.rose]
].forEach((r, i) => {
  const y = 3.0 + i * 0.86;
  T.card(s, { x: M, y: y, w: 7.2, h: 0.74 });
  s.addText(r[0], { x: M + 0.3, y: y, w: 1.1, h: 0.74, valign: "middle", align: "center",
    fontFace: "Courier New", fontSize: 15, bold: true, color: r[3], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 1.5, y: y, w: 1.8, h: 0.74, valign: "middle", fontFace: F.body,
    fontSize: 12.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 3.4, y: y, w: 3.6, h: 0.74, valign: "middle", fontFace: F.body,
    fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.55, y: 3.0, w: CW - 7.55, h: 3.44, fill: "FCECF0", line: "F3C9D4" });
s.addText("Işık her zaman çıkamaz", { x: M + 7.9, y: 3.25, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "r₂ sınır açıdan büyükse ışık ikinci yüzeyden çıkamaz; içeride tam yansımaya uğrar.\n\n" +
  "Cam için sınır açı ≈ 41,8°'dir. Tepe açısı büyüdükçe r₂ de büyür; 60°'lik prizmada küçük " +
  "gelme açılarında ışık hapsolur.\n\n" +
  "Tam yansımalı prizmalar bu durumu bilerek kullanır.",
  { x: M + 7.9, y: 3.8, w: 3.3, h: 2.5, size: 12.5 });
T.footer(s, FOOT, 3);
s.addNotes("δ = i₁ + i₂ − A bağıntısının türetimi üçgen açı toplamından geliyor; istersen tahtada çıkar.");

/* 4 · en küçük sapma + grafik */
s = T.light(p);
T.head(s, 3, "En küçük sapma", C.violet);
T.lede(s, "Sapma açısı gelme açısıyla önce azalır, sonra artar.");
const II = [], DD = [];
for (let i = 25; i <= 85; i++) { const d = sapma(60, i, 1.5); if (d != null) { II.push(i); DD.push(+d.toFixed(2)); } }
s.addChart(p.ChartType.scatter, [{ name: "i₁", values: II }, { name: "δ", values: DD }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "A = 60°, n = 1,50 için sapma açısı – gelme açısı",
    catAxisTitle: "gelme açısı i₁ (°)", valAxisTitle: "sapma açısı δ (°)",
    valAxisMinVal: 30, valAxisMaxVal: 60 } }),
  { x: M, y: 1.95, w: 6.6, h: 4.45 }));
T.formula(s, "i₁ = i₂ ve r₁ = r₂ = A/2\nn = sin((A + δmin)/2) / sin(A/2)", {
  x: M + 6.95, y: 1.95, w: CW - 6.95, h: 1.05, size: 12.5, fill: "F1EDFB", color: C.violet });
T.bullets(s, [
  "En küçük sapmada ışın prizmadan simetrik geçer.",
  "Işın, prizmanın tabanına paralel ilerler.",
  "A = 60° ve n = 1,5 için δmin ≈ 37,2°.",
  "δmin ölçülerek prizmanın indisi hesaplanır.",
  "Bu, laboratuvarda indis ölçmenin klasik yöntemidir."],
  { x: M + 6.95, y: 3.2, w: CW - 6.95, h: 3.2, size: 12.5, gap: 15 });
T.footer(s, FOOT, 4);
s.addNotes("Eğrinin düz tabanı önemli: minimum civarında sapma açıya çok az duyarlıdır.");

/* 5 · dispersiyon */
s = T.light(p);
T.head(s, 4, "Dispersiyon: renklere ayrılma", C.lime);
T.lede(s, "Kırılma indisi dalga boyuna bağlıdır.");
B.tablo(s, [
  ["Renk", "Dalga boyu", "Camda n", "Sapma (A = 60°, i = 50°)"],
  ["Kırmızı", "≈ 700 nm", "1,513", "38,3°"],
  ["Sarı", "≈ 580 nm", "1,520", "38,9°"],
  ["Mavi", "≈ 470 nm", "1,531", "39,9°"],
  ["Mor", "≈ 400 nm", "1,538", "40,5°"]
], { x: M, y: 1.95, w: CW, step: 0.8, size: 12.5, mono: true,
     cols: [[M + 0.3, 2.2], [M + 2.6, 2.0], [M + 4.7, 1.6], [M + 6.5, 5.2]] });
T.formula(s, "n(mor) > n(mavi) > ... > n(kırmızı)        →        mor en çok sapar", {
  x: M, y: 5.05, w: CW, h: 0.75, size: 15, fill: "EAF7DC", color: C.lime });
T.card(s, { x: M, y: 5.95, w: CW, h: 0.65, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Prizma renk üretmez, ayırır. ", options: { bold: true, color: C.amber } },
  { text: "İkinci bir prizmayla tayf yeniden birleştirilirse beyaz ışık elde edilir — " +
    "Newton bunu 1666'da göstermiştir.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.95, w: CW - 0.7, h: 0.65, valign: "middle", fontFace: F.body,
    fontSize: 12, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Sapma farkının yalnızca 2,2° olmasına dikkat çek: küçük fark, uzak perdede büyük şerit.");

/* 6 · tam yansımalı prizma */
s = T.light(p);
T.head(s, 5, "Tam yansımalı prizmalar", C.rose);
T.lede(s, "Neden dürbünlerde ayna değil prizma kullanılır?");
T.formula(s, "cam için sin θ(sınır) = 1/1,5 → θ ≈ 41,8°   ·   hipotenüse geliş 45° > 41,8°", {
  x: M, y: 1.95, w: CW, h: 0.8, size: 14, fill: "FCECF0", color: C.rose });
[["Tek yansıma", "Işığı 90° döndürür.", "periskop, dik açı prizması", C.blue],
 ["İki yansıma", "Işığı 180° geri gönderir.", "dürbün, reflektör", C.violet],
 ["Aynaya üstünlüğü", "Kayıp yok, kaplama bozulmaz, ikincil görüntü oluşmaz.",
  "yüksek verim", C.lime]
].forEach((r, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 3.0, w: 3.71, h: 2.0 });
  s.addText(r[0], { x: x + 0.3, y: 3.2, w: 3.1, h: 0.45, fontFace: F.body, fontSize: 15,
    bold: true, color: r[3], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: x + 0.3, y: 3.72, w: 3.1, h: 0.8, size: 12.5 });
  s.addText(r[2], { x: x + 0.3, y: 4.5, w: 3.1, h: 0.35, fontFace: "Courier New",
    fontSize: 11, bold: true, color: r[3], isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.25, w: CW, h: 1.15, fill: C.softer });
s.addText([{ text: "İndis düşerse ne olur? ", options: { bold: true, color: C.ink } },
  { text: "n = 1,3 olsaydı sınır açı 50,3° olurdu; 45° bu değerin altında kaldığı için tam " +
    "yansıma gerçekleşmez ve ışığın bir kısmı prizmadan dışarı sızardı. Bu yüzden prizma " +
    "camının indisi önemlidir.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.25, w: CW - 0.7, h: 1.15, valign: "middle", fontFace: F.body,
    fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 6);
s.addNotes("Bisiklet reflektörünü sınıfa getir: içi köşe prizmalarla dolu, ışığı geldiği yöne döndürüyor.");

/* 7 · gökkuşağı */
s = T.light(p);
T.head(s, 6, "Gökkuşağı", C.amber);
T.lede(s, "Yağmur damlası küçük bir prizma gibi davranır.");
const BB = [], DV = [];
for (let i = 1; i <= 99; i++) {
  const b = i / 100;
  const iA = R2D(Math.asin(b)), rA = R2D(Math.asin(b / 1.333));
  BB.push(b);
  DV.push(+(180 + 2 * iA - 4 * rA).toFixed(2));
}
s.addChart(p.ChartType.scatter, [{ name: "b/R", values: BB }, { name: "sapma", values: DV }],
  Object.assign(T.chartOpts({ colors: [C.amber], extra: {
    title: "Su damlasında toplam sapma – ışının damlaya düşme yeri",
    catAxisTitle: "b / R", valAxisTitle: "toplam sapma (°)",
    valAxisMinVal: 130, valAxisMaxVal: 185 } }),
  { x: M, y: 1.95, w: 6.6, h: 4.45 }));
[["1", "Damlaya girerken kırılır (renkler ayrılmaya başlar)."],
 ["2", "Damlanın arka yüzeyinden yansır."],
 ["3", "Çıkarken ikinci kez kırılır."],
 ["!", "Toplam sapma en az 138°: ışık geldiği yönle 42° açı yaparak döner."]
].forEach((r, i) => {
  const y = 1.95 + i * 0.86;
  T.card(s, { x: M + 6.95, y: y, w: CW - 6.95, h: 0.74 });
  s.addShape("ellipse", { x: M + 7.2, y: y + 0.15, w: 0.44, h: 0.44,
    fill: { color: r[0] === "!" ? C.rose : C.amber }, line: { type: "none" } });
  s.addText(r[0], { x: M + 7.2, y: y + 0.15, w: 0.44, h: 0.44, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 7.8, y: y, w: 3.7, h: 0.74, valign: "middle", fontFace: F.body,
    fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 6.95, y: 5.45, w: CW - 6.95, h: 0.95, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Kırmızı dışta (42°), mor içte (40°). İkinci gökkuşağı iki iç yansımadan doğar, " +
  "renkleri terstir ve ≈ 51°'de görünür.",
  { x: M + 7.3, y: 5.45, w: 4.3, h: 0.95, valign: "middle", fontFace: F.body, fontSize: 11.5,
    color: C.muted, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("Eğrinin minimumu ışınların yığıldığı yer; 'neden orada parlak?' sorusu tam burada sorulmalı.");

B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.blue,
  baslik: "Çözümlü örnek · sapma açısı",
  lede: "Doğrudan bağıntıyla.",
  soru: "Tepe açısı 60° olan prizmaya 45° ile giren ışın, ikinci yüzeyden 52° ile çıkıyor.\n\n" +
    "Sapma açısı kaçtır?",
  cevap: "37°",
  adimlar: [
    ["1", "δ = i₁ + i₂ − A"],
    ["2", "δ = 45 + 52 − 60"],
    ["3", "δ = 37°"],
    ["!", "Bu değer en küçük sapmaya çok yakın; ışın neredeyse simetrik geçmiş."]],
  not: "Bağıntının basitliği yanıltmasın; i₂'yi bulmak için Snell iki kez uygulanır." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.violet,
  baslik: "Çözümlü örnek · en küçük sapmadan indis",
  lede: "sin45° = 0,707 · sin30° = 0,5",
  soru: "Tepe açısı 60° olan bir prizmada en küçük sapma açısı 30° ölçülüyor.\n\n" +
    "Prizmanın kırılma indisi nedir?",
  cevap: "n ≈ 1,41",
  adimlar: [
    ["1", "n = sin((A + δmin)/2) / sin(A/2)"],
    ["2", "n = sin((60 + 30)/2) / sin30° = sin45° / sin30°"],
    ["3", "n = 0,707 / 0,5 ≈ 1,41 (yaklaşık √2)"],
    ["!", "Bu yöntem, bilinmeyen bir camın indisini ölçmenin en hassas yollarındandır."]],
  not: "Formülün türetimi ileri düzey; burada kullanımı yeterli." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.rose,
  baslik: "Çözümlü örnek · ışık çıkabilir mi?",
  lede: "sin30° = 0,5",
  soru: "Tepe açısı 60°, indisi 1,5 olan prizmaya 30° ile giren ışın için r₁, r₂ ve ışığın " +
    "çıkıp çıkamayacağını inceleyiniz.",
  cevap: "r₁ ≈ 19,5° · r₂ ≈ 40,5° · çıkar",
  adimlar: [
    ["1", "sin r₁ = sin30°/1,5 = 0,333 → r₁ ≈ 19,5°"],
    ["2", "r₂ = A − r₁ = 60 − 19,5 = 40,5°"],
    ["3", "Sınır açı: sin θ = 1/1,5 = 0,667 → θ ≈ 41,8°"],
    ["!", "r₂ < θ olduğu için ışın çıkabilir — ama sınıra çok yakın, biraz daha küçük i₁'de hapsolurdu."]],
  not: "Bu örnek, tam yansımalı prizmaya doğal bir köprü kuruyor." });

B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["Prizma renk üretir sanmak", "Prizma renkleri ayırır; beyaz ışıkta zaten hepsi vardır."],
  ["Kırmızı en çok sapar sanmak", "En çok sapan mordur; indisi en büyüktür."],
  ["δ = i₁ + i₂ + A yazmak", "Doğrusu δ = i₁ + i₂ − A'dır."],
  ["Işık tepeye doğru sapar sanmak", "Sapma her zaman tabana doğrudur."],
  ["Işık her durumda çıkar sanmak", "r₂ sınır açıyı aşarsa içeride tam yansır."],
  ["Levha ile prizmayı karıştırmak", "Levhada doğrultu korunur, prizmada değişir."]
], not: "İkinci madde gökkuşağı sıralamasıyla birlikte sorulunca netleşiyor." });

B.ozet(p, {
  maddeler: [
    ["İki kırılma, bir sapma", "δ = i₁ + i₂ − A; ışık tabana doğru sapar."],
    ["En küçük sapma simetriktir", "i₁ = i₂, r₁ = r₂ = A/2; indis ölçümünde kullanılır."],
    ["İndis renge bağlıdır", "Mor en çok, kırmızı en az sapar: dispersiyon."],
    ["45° prizma tam yansıtır", "Sınır açı 41,8° < 45°; kayıpsız 90° ve 180° dönüş."]],
  linkMetin: "Prizma laboratuvarı, tayf ve gökkuşağı:",
  link: "dersler.perinet.org/prizmalar.html",
  not: "Kapanışta gökkuşağı bölümünü aç; sapma eğrisinin minimumunu sınıfa buldur."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/prizmalar.pptx" })
  .then(f => console.log("yazıldı:", f));
