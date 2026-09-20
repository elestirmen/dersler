const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Manyetik alan ve manyetik kuvvet",
  "Fizik · Elektrik ve Manyetizma");
const FOOT = "Elektrik ve Manyetizma · Konu 02 · Manyetik alan ve kuvvet";
const CW = W - M * 2;

/* 1 · kapak */
let s = T.dark(p);
s.addText("ELEKTRİK VE MANYETİZMA · KONU 02", { x: 0.95, y: 1.7, w: 8, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("Manyetik alan ve kuvvet", { x: 0.9, y: 2.1, w: 8.6, h: 1.3, fontFace: F.head,
  fontSize: 46, bold: true, color: C.white, isTextBox: true, margin: 0 });
s.addText("Hareket eden yük manyetik alan üretir; manyetik alan da hareket eden yüke kuvvet " +
  "uygular. Elektrik motorundan MR cihazına kadar her şey bu iki cümleye dayanır.", {
  x: 0.95, y: 3.6, w: 7.4, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("B = 2·10⁻⁷ · I / r        F = B·I·L·sinα        F = q·v·B·sinα", {
  x: 0.95, y: 5.0, w: 8.4, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* tel ve çevresindeki alan halkaları */
s.addShape("line", { x: 11.15, y: 2.5, w: 0, h: 2.6,
  line: { color: "FF8FA3", width: 4, endArrowType: "triangle" } });
[0.55, 0.95, 1.35].forEach(r => {
  s.addShape("ellipse", { x: 11.15 - r, y: 3.8 - r * 0.32, w: r * 2, h: r * 0.64,
    fill: { type: "none" }, line: { color: "9C8CFF", width: 1.8 } });
});
s.addText("I", { x: 10.75, y: 2.3, w: 0.4, h: 0.3, align: "center", fontFace: "Courier New",
  fontSize: 14, bold: true, color: "FF8FA3", isTextBox: true, margin: 0 });
s.addText("akımın alanı halkalar çizer", { x: 9.3, y: 5.3, w: 3.7, h: 0.3, align: "center",
  fontFace: F.body, fontSize: 11, color: "6A7798", isTextBox: true, margin: 0 });
T.footer(s, "dersler.perinet.org/manyetik-alan.html", null, true);
s.addNotes("Açılışta Oersted'in 1820'deki kazasını anlat: pusula iğnesi telin yanında sapınca elektrik ve manyetizma birleşti.");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: mıknatıstan siklotrona.");
[["Manyetik alan", "Mıknatısın ve akımın çevresindeki alan; birimi tesla.", C.blue],
 ["Akımın alanı", "Düz telde B = 2·10⁻⁷·I/r; uzaklıkla ters orantılı.", C.violet],
 ["Sağ el kuralı", "Alanın ve kuvvetin yönünü bulmanın pratik yolu.", C.lime],
 ["Tele etkiyen kuvvet", "F = B·I·L·sinα; motorun çalışma ilkesi.", C.amber],
 ["Yüklü parçacık", "F = q·v·B·sinα; alana dik girerse çember çizer.", C.rose],
 ["Uygulamalar", "Motor, hoparlör, siklotron, kütle spektrometresi.", C.blue]
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
s.addNotes("Bu konu elektrik yüküyle manyetizmayı birleştirir: ikisi aynı olgunun iki yüzüdür.");

/* 3 · manyetik alan */
s = T.light(p);
T.head(s, 2, "Manyetik alan", C.blue);
T.lede(s, "Mıknatısın ve akımın çevresinde, manyetik etki gösteren bölge.");
T.formula(s, "B'nin birimi tesla (T)        1 T = 1 N / (A·m)        1 T = 10⁴ gauss", {
  x: M, y: 1.95, w: 7.1, h: 0.8, size: 15 });
[["Kutuplar ayrılamaz", "Mıknatıs ikiye bölünürse iki yeni mıknatıs oluşur; tek kutuplu " +
  "mıknatıs (manyetik monopol) bulunamamıştır.", C.blue],
 ["Alan çizgileri kapalıdır", "Dışarıda N'den çıkıp S'ye girer, mıknatısın içinde S'den N'ye " +
  "devam eder: baştan sona kapalı eğrilerdir.", C.violet],
 ["Kaynağı harekettir", "Manyetik alanı hareket eden yükler üretir; atomlardaki elektron " +
  "hareketleri kalıcı mıknatısların da kaynağıdır.", C.lime]
].forEach((r, i) => {
  const y = 2.95 + i * 1.22;
  T.card(s, { x: M, y: y, w: 7.1, h: 1.06 });
  s.addText(r[0], { x: M + 0.35, y: y, w: 2.2, h: 1.06, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: r[2], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: M + 2.6, y: y + 0.16, w: 4.25, h: 0.78, size: 12 });
});
T.card(s, { x: M + 7.45, y: 1.95, w: CW - 7.45, h: 4.65, fill: C.softer });
s.addText("Tipik alan şiddetleri", { x: M + 7.8, y: 2.2, w: 3.6, h: 0.4, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
[["Dünya'nın alanı", "≈ 50 µT"], ["Buzdolabı mıknatısı", "≈ 5 mT"],
 ["Hoparlör mıknatısı", "≈ 1 T"], ["MR cihazı", "1,5 – 3 T"],
 ["Laboratuvar süper iletkeni", "≈ 20 T"], ["Nötron yıldızı", "10⁸ T"]].forEach((r, i) => {
  const y = 2.75 + i * 0.63;
  s.addText(r[0], { x: M + 7.8, y: y, w: 2.3, h: 0.5, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 10.0, y: y, w: 1.4, h: 0.5, valign: "middle", align: "right",
    fontFace: "Courier New", fontSize: 12, bold: true, color: C.blue, isTextBox: true,
    margin: 0 });
});
T.footer(s, FOOT, 3);
s.addNotes("Dünya'nın alanı 50 µT: pusulanın çalıştığı ama çok zayıf bir alan. Karşılaştırma öğrenciye ölçek kazandırır.");

/* 4 · akımın manyetik alanı */
s = T.light(p);
T.head(s, 3, "Akımın manyetik alanı", C.violet);
T.lede(s, "Düz telin alanı, teli saran halkalar biçimindedir ve uzaklıkla ters orantılıdır.");
T.formula(s, "B = 2 · 10⁻⁷ · I / r          (sonsuz uzun düz tel)", { x: M, y: 1.95, w: CW,
  h: 0.8, size: 17, fill: "F1EDFB", color: C.violet });
const BR = [], BB = [];
for (let i = 2; i <= 40; i++) { BR.push(i); BB.push(+((2e-7 * 10) / (i / 100) * 1e6).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "r", values: BR }, { name: "B", values: BB }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "I = 10 A için alan – uzaklık",
    catAxisTitle: "telden uzaklık r (cm)", valAxisTitle: "B (µT)", valAxisMinVal: 0,
    valAxisMaxVal: 100 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
[["Uzaklık 2 katına çıkarsa", "B yarıya iner", C.violet],
 ["Akım 2 katına çıkarsa", "B 2 katına çıkar", C.blue],
 ["Halka merkezinde", "B = 2π·10⁻⁷ · I / r", C.lime],
 ["Bobinde (N sarım)", "B = 2π·10⁻⁷ · N·I / r", C.amber]].forEach((r, i) => {
  const y = 2.95 + i * 0.78;
  T.card(s, { x: M + 6.85, y: y, w: CW - 6.85, h: 0.66, fill: C.softer });
  s.addText(r[0], { x: M + 7.15, y: y, w: 2.5, h: 0.66, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.6, y: y, w: 2.2, h: 0.66, valign: "middle", align: "right",
    fontFace: "Courier New", fontSize: 11.5, bold: true, color: r[2], isTextBox: true,
    margin: 0 });
});
T.card(s, { x: M + 6.85, y: 6.1, w: CW - 6.85, h: 0.3, flat: true, fill: C.white,
  line: C.white });
s.addText("Alan, telden uzaklaştıkça hızla zayıflar: 1 cm'de 200 µT, 20 cm'de 10 µT.",
  { x: M + 6.85, y: 5.95, w: CW - 6.85, h: 0.45, valign: "middle", fontFace: F.body,
    fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Elektrik alanı 1/r² ile, telin manyetik alanı 1/r ile azalır: bu farkı vurgula.");

/* 5 · sağ el kuralları */
s = T.light(p);
T.head(s, 4, "Sağ el kuralları", C.lime);
T.lede(s, "Yönleri ezberlemek yerine elinle bul: üç durum, üç kural.");
[["Düz tel", "Başparmak akım yönünü gösterir; avucun kapanma yönü alan halkalarının yönüdür.",
  "B halkaları teli sarar", C.blue],
 ["Halka ve bobin", "Parmaklar akım yönünde sarılır; başparmak, halkanın içindeki alanın " +
  "yönünü — yani kuzey kutbunu — gösterir.", "N kutbu başparmakta", C.violet],
 ["Kuvvetin yönü", "Sağ elin parmakları akım yönünden alan yönüne doğru döndürülür; " +
  "başparmak kuvvetin yönünü verir. Kuvvet hem akıma hem alana diktir.",
  "F ⟂ I ve F ⟂ B", C.lime]
].forEach((a, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 1.95, w: 3.71, h: 3.3 });
  s.addShape("ellipse", { x: x + 0.3, y: 2.2, w: 0.5, h: 0.5, fill: { color: a[3] },
    line: { type: "none" } });
  s.addText(String(i + 1), { x: x + 0.3, y: 2.2, w: 0.5, h: 0.5, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 13, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(a[0], { x: x + 0.95, y: 2.2, w: 2.5, h: 0.5, valign: "middle", fontFace: F.body,
    fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.body(s, a[1], { x: x + 0.3, y: 2.95, w: 3.1, h: 1.6, size: 12.5 });
  s.addText(a[2], { x: x + 0.3, y: 4.62, w: 3.1, h: 0.4, fontFace: "Courier New",
    fontSize: 11.5, bold: true, color: a[3], isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.5, w: CW, h: 0.9, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Sayfa düzlemi gösterimi: ", options: { bold: true, color: C.lime } },
  { text: "⊗ sayfa düzleminden içeri giren yönü (okun tüyleri), ⊙ ise dışarı çıkan yönü " +
    "(okun ucu) gösterir. Manyetik alan üç boyutlu olduğu için bu gösterim şarttır.",
    options: { color: C.muted } }],
  { x: M + 0.35, y: 5.5, w: CW - 0.7, h: 0.9, valign: "middle", fontFace: F.body, fontSize: 12.5,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Tahtada üç kuralı da elle yaptır; öğrenciler sağ elini kaldırmadan bu konuyu geçemez.");

/* 6 · tele etkiyen kuvvet */
s = T.light(p);
T.head(s, 5, "Akım taşıyan tele etkiyen kuvvet", C.amber);
T.lede(s, "Kuvvet, akımla alan arasındaki açının sinüsüyle değişir.");
T.formula(s, "F = B · I · L · sinα", { x: M, y: 1.95, w: 6.5, h: 0.8, size: 18,
  fill: "FDF4E3", color: C.amber });
const AA = [], AF = [];
for (let i = 0; i <= 180; i += 3) { AA.push(i); AF.push(+(0.5 * 2 * 0.4 * Math.sin((i * Math.PI) / 180)).toFixed(3)); }
s.addChart(p.ChartType.scatter, [{ name: "α", values: AA }, { name: "F", values: AF }],
  Object.assign(T.chartOpts({ colors: [C.amber], extra: {
    title: "B = 0,5 T · I = 2 A · L = 40 cm için kuvvet – açı",
    catAxisTitle: "akım ile alan arasındaki açı α (°)", valAxisTitle: "F (N)",
    valAxisMinVal: 0, valAxisMaxVal: 0.5 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
T.bullets(s, [
  "α = 90° (akım alana dik): kuvvet en büyüktür, F = B·I·L.",
  "α = 0° ya da 180° (akım alana paralel): kuvvet sıfırdır.",
  "Kuvvetin yönü hem akıma hem alana diktir.",
  "Akım yönü ters çevrilirse kuvvet de ters döner.",
  "Elektrik motoru, çerçevenin karşılıklı kenarlarına zıt yönde etkiyen bu kuvvetle döner."],
  { x: M + 6.85, y: 2.0, w: CW - 6.85, h: 2.8, size: 13, gap: 16 });
T.card(s, { x: M + 6.85, y: 4.95, w: CW - 6.85, h: 1.45, fill: "EAF0FD", line: "C7D7F7" });
s.addText([{ text: "Amperin tanımı\n", options: { bold: true, color: C.blue, breakLine: true } },
  { text: "Paralel iki tel, akımları aynı yöndeyse birbirini çeker, zıt yöndeyse iter. " +
    "Bu kuvvet, uzun yıllar amper biriminin tanımı olarak kullanıldı.",
    options: { color: C.muted } }],
  { x: M + 7.15, y: 4.95, w: 4.7, h: 1.45, valign: "middle", fontFace: F.body, fontSize: 12,
    lineSpacingMultiple: 1.15, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 6);
s.addNotes("Sinüs eğrisinin iki ucunda kuvvetin sıfırlanması en çok sorulan yer: paralel akım kuvvet görmez.");

/* 7 · yüklü parçacık */
s = T.light(p);
T.head(s, 6, "Manyetik alanda yüklü parçacık", C.rose);
T.lede(s, "Alana dik giren yük, sabit büyüklükte ama sürekli yön değiştiren bir kuvvet görür.");
T.formula(s, "F = q·v·B·sinα        r = m·v / (q·B)        T = 2π·m / (q·B)", { x: M, y: 1.95,
  w: CW, h: 0.8, size: 16, fill: "FCECF0", color: C.rose });
const VX = [], VR = [];
for (let i = 0; i <= 50; i++) { const v = i * 0.1; VX.push(+v.toFixed(1)); VR.push(+(v * 5).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "v", values: VX }, { name: "r", values: VR }],
  Object.assign(T.chartOpts({ colors: [C.rose], extra: {
    title: "B = 0,2 T'da protonun yarıçapı hızla doğru orantılıdır",
    catAxisTitle: "hız (10⁶ m/s)", valAxisTitle: "yarıçap (cm)", valAxisMinVal: 0 } }),
  { x: M, y: 2.95, w: 6.5, h: 3.45 }));
T.bullets(s, [
  "Kuvvet hıza dik olduğu için hızın büyüklüğünü değiştiremez: iş yapmaz.",
  "Yalnızca yönü değiştirir; bu yüzden yörünge çemberdir.",
  "Hız arttıkça çemberin yarıçapı büyür.",
  "Periyot hıza bağlı değildir: hızlı parçacık büyük çemberi aynı sürede tamamlar.",
  "Hız alana paralelse (α = 0) hiç kuvvet yoktur; eğik girerse yörünge sarmal olur."],
  { x: M + 6.85, y: 2.95, w: CW - 6.85, h: 2.6, size: 13, gap: 15 });
T.card(s, { x: M + 6.85, y: 5.55, w: CW - 6.85, h: 0.85, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Periyodun hızdan bağımsızlığı ", options: { bold: true, color: C.lime } },
  { text: "siklotronun çalışma ilkesidir: parçacık hızlansa da tur süresi değişmez.",
    options: { color: C.muted } }],
  { x: M + 7.15, y: 5.55, w: 4.7, h: 0.85, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("'Manyetik kuvvet iş yapmaz' cümlesi bu konunun kilit noktası; enerji korunumuyla birlikte anlat.");

/* 8 · uygulamalar */
s = T.light(p);
T.head(s, 7, "Nerede karşımıza çıkar?", C.blue);
T.lede(s, "Manyetik kuvvet, günlük hayatta hareketin kaynağıdır.");
[["Elektrik motoru", "Alandaki akım çerçevesine etkiyen zıt kuvvetler çifti çerçeveyi döndürür.",
  "F = B·I·L", C.blue],
 ["Hoparlör", "Ses akımı, mıknatısın alanındaki bobini ileri geri iter; koni havayı titretir.",
  "değişken akım", C.violet],
 ["Siklotron", "Parçacık her turda hızlanır; periyot değişmediği için hızlandırma uyumlu kalır.",
  "T sabit", C.lime],
 ["Kütle spektrometresi", "Aynı hız ve alanda ağır iyon büyük çember çizer; kütleler ayrışır.",
  "r ∝ m", C.amber],
 ["MR görüntüleme", "Güçlü alan, vücuttaki hidrojen çekirdeklerini hizalar.", "1,5 – 3 T", C.rose],
 ["Dünya'nın kalkanı", "Manyetosfer, güneş rüzgârındaki yüklü parçacıkları saptırır.",
  "kutup ışıkları", C.blue]
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
T.footer(s, FOOT, 8);
s.addNotes("Kutup ışıkları, manyetik kuvvetin en görsel sonucu: parçacıklar alan çizgileri boyunca kutuplara sürüklenir.");

/* 9–11 · çözümlü örnekler */
function ornek(no, baslik, soru, cevap, adimlar, notlar, sayfa, tone) {
  const sl = T.light(p);
  T.head(sl, no, baslik, tone);
  T.lede(sl, "Çözümlerde 2·10⁻⁷ T·m/A ve proton için m = 1,6·10⁻²⁷ kg alınmıştır.");
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

ornek(8, "Çözümlü örnek · telin alanı",
  "Uzun düz bir telden 4 A akım geçiyor.\n\n" +
  "(a) Telden 20 cm uzaklıktaki manyetik alan kaç T'dır?\n" +
  "(b) Aynı alanı 40 cm uzaklıkta elde etmek için akım ne olmalıdır?",
  "(a) 4·10⁻⁶ T · (b) 8 A",
  [["a", "B = 2·10⁻⁷ · I / r = 2·10⁻⁷ · 4 / 0,2"],
   ["2", "B = 8·10⁻⁷ / 0,2 = 4·10⁻⁶ T (yani 4 µT)"],
   ["b", "B ∝ I/r olduğundan uzaklık 2 katına çıkarsa akım da 2 katına çıkmalıdır: 8 A"],
   ["!", "Bu değer Dünya'nın alanının onda biri kadardır; pusula iğnesi bunu hisseder."]],
  "Sonucu Dünya'nın 50 µT'lık alanıyla karşılaştırmak, büyüklük duygusu kazandırır.",
  9, C.violet);

ornek(9, "Çözümlü örnek · tele etkiyen kuvvet",
  "B = 0,5 T'lık düzgün alanda, 40 cm uzunluğundaki telden 2 A akım geçiyor.\n\n" +
  "(a) Tel alana dikken kuvvet nedir?\n" +
  "(b) Tel alanla 30° açı yaparsa kuvvet ne olur?\n" +
  "(c) Tel alana paralelse?",
  "(a) 0,4 N · (b) 0,2 N · (c) 0",
  [["a", "F = B·I·L·sin90° = 0,5 · 2 · 0,4 · 1 = 0,4 N"],
   ["b", "sin30° = 0,5 → F = 0,4 · 0,5 = 0,2 N"],
   ["c", "sin0° = 0 → F = 0. Akım alana paralelse kuvvet oluşmaz."],
   ["!", "Kuvvetin yönü hem tele hem alana diktir; sağ el kuralıyla bulunur."]],
  "(c) şıkkı en sık yanlış yapılan kısım: 'alan var, akım var, kuvvet de vardır' sanılıyor.",
  10, C.amber);

ornek(10, "Çözümlü örnek · dairesel hareket",
  "B = 0,2 T'lık alana, alana dik olarak 2·10⁶ m/s hızla bir proton giriyor.\n" +
  "(q = 1,6·10⁻¹⁹ C, m = 1,6·10⁻²⁷ kg)\n\n" +
  "(a) Yörüngenin yarıçapı nedir?\n(b) Periyodu nedir?",
  "(a) 10 cm · (b) ≈ 3,1·10⁻⁷ s",
  [["a", "r = m·v / (q·B) = (1,6·10⁻²⁷ · 2·10⁶) / (1,6·10⁻¹⁹ · 0,2)"],
   ["2", "r = 3,2·10⁻²¹ / 3,2·10⁻²⁰ = 0,1 m = 10 cm"],
   ["b", "T = 2π·m / (q·B) = 2π · 1,6·10⁻²⁷ / 3,2·10⁻²⁰ ≈ 3,1·10⁻⁷ s"],
   ["!", "Periyot hıza bağlı değildir: hız iki katına çıksa yarıçap büyür ama süre aynı kalır."]],
  "Son satır siklotronun kalbi. İstersen 'hız 2 katı olsa r ve T ne olur?' diye sorup tartıştır.",
  11, C.rose);

/* 12 · hatalar */
s = T.light(p);
T.head(s, 11, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Manyetik kuvvet hız yönündedir", "Kuvvet hem hıza hem alana diktir."],
 ["Durgun yüke de kuvvet etki eder", "Manyetik kuvvet yalnızca hareketli yüke etki eder."],
 ["Manyetik kuvvet hızı artırır", "Hıza dik olduğu için iş yapmaz; yalnızca yön değiştirir."],
 ["Alana paralel akım kuvvet görür", "sinα = 0 olduğu için kuvvet sıfırdır."],
 ["Periyot hıza bağlıdır", "T = 2πm/qB; hız ve yarıçaptan bağımsızdır."],
 ["Mıknatısın tek kutbu olabilir", "Bölünen mıknatıs iki yeni mıknatıs verir."]
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
s.addNotes("İlk üç madde aynı yanlış sezgiden geliyor: kuvveti hareketin 'itici gücü' sanmak.");

/* 13 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Alanı hareket eden yük üretir", "Düz telde B = 2·10⁻⁷·I/r; uzaklıkla ters orantılı."],
 ["Yönler sağ elle bulunur", "Başparmak akım, parmaklar alan; kuvvet ikisine de dik."],
 ["Kuvvet açıya bağlıdır", "F = B·I·L·sinα: dikte en büyük, paralelde sıfır."],
 ["Alana dik giren yük çember çizer", "r = mv/qB; periyot T = 2πm/qB hızdan bağımsızdır."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5, fontFace: F.head,
    fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 4.5, h: 0.45, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 5.65, y: y - 0.04, w: 5.3, h: 0.62, fontFace: F.body, fontSize: 13.5,
    color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([{ text: "Telin alanı, kuvvet deneyi ve sağ el kuralı alıştırması:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/manyetik-alan.html",
    options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta sağ el kuralı alıştırmasını sınıfça çöz: on soruda yön bulma pratiği kazandırıyor.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/manyetik-alan.pptx" })
  .then(f => console.log("yazıldı:", f));
