const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Görünür derinlik", "Fizik · Optik");
const FOOT = "Optik · Konu 05 · Görünür derinlik";

let s = B.kapak(p, {
  ust: "OPTİK · KONU 05",
  baslik: "Görünür derinlik",
  lede: "Havuzun dibi olduğundan yakın, sudaki balık olduğundan sığ görünür. Sebebi: sudan " +
    "çıkan ışınlar yüzeyde kırılır ve göz onları düz gelmiş sanar.",
  formul: "h′ = h / n          h′ = n · h (sudan havaya)          Δ = t (1 − 1/n)",
  link: "dersler.perinet.org/gorunur-derinlik.html",
  not: "Açılışta bardağa bozuk para koyup su ekleme deneyini anlat: görünmeyen para görünür oluyor."
});
s.addShape("rect", { x: 9.2, y: 3.5, w: 3.7, h: 1.9, fill: { color: "1B2544" },
  line: { color: "2C3860", width: 1 } });
s.addShape("ellipse", { x: 10.8, y: 5.0, w: 0.34, h: 0.34, fill: { color: "FFE08A" },
  line: { type: "none" } });
s.addShape("ellipse", { x: 10.8, y: 4.35, w: 0.34, h: 0.34, fill: { type: "none" },
  line: { color: "9C8CFF", width: 2, dashType: "dash" } });
s.addShape("line", { x: 10.97, y: 3.5, w: 0, h: 1.5, flipV: true,
  line: { color: "B9EE63", width: 2 } });
s.addText("gerçek", { x: 11.3, y: 5.02, w: 1.4, h: 0.3, fontFace: F.body, fontSize: 10,
  color: "FFE08A", isTextBox: true, margin: 0 });
s.addText("görünen", { x: 11.3, y: 4.37, w: 1.4, h: 0.3, fontFace: F.body, fontSize: 10,
  color: "9C8CFF", isTextBox: true, margin: 0 });

B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: bağıntının kaynağından günlük sonuçlarına.",
  kartlar: [
    ["Neden sığ görünür?", "Kırılan ışınların uzantıları yukarıda kesişir.", C.blue],
    ["Bağıntı", "h′ = h/n; su için dörtte üç.", C.violet],
    ["Yükselme miktarı", "Δh = h(1 − 1/n).", C.lime],
    ["Sudan havaya bakış", "h′ = n·h; cisim uzaklaşmış görünür.", C.amber],
    ["Cam levha", "Altındaki yazı t(1 − 1/n) kadar yükselir.", C.rose],
    ["Geçerlilik sınırı", "Bağıntılar dik bakış içindir.", C.blue]
  ],
  not: "Bu konu kırılmanın doğrudan uygulaması; Snell yasasını hatırlatarak başla."
});

/* 3 · neden sığ görünür */
s = T.light(p);
T.head(s, 2, "Neden daha sığ görünür?", C.blue);
T.lede(s, "Cisim yerinde durur; değişen, göze ulaşan ışınların doğrultusudur.");
[["1", "Sudaki cisimden çıkan ışınlar su–hava sınırına ulaşır."],
 ["2", "Çok yoğundan az yoğuna geçtikleri için normalden uzaklaşarak kırılırlar."],
 ["3", "Göz, kendisine gelen ışınların geldiği doğrultuyu geriye uzatır."],
 ["4", "Uzantılar, gerçek yerin yukarısında kesişir: görüntü orada oluşur."]
].forEach((r, i) => {
  const y = 1.95 + i * 1.05;
  T.card(s, { x: M, y: y, w: 7.3, h: 0.92 });
  s.addShape("ellipse", { x: M + 0.3, y: y + 0.24, w: 0.44, h: 0.44, fill: { color: C.blue },
    line: { type: "none" } });
  s.addText(r[0], { x: M + 0.3, y: y + 0.24, w: 0.44, h: 0.44, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 0.95, y: y, w: 6.2, h: 0.92, valign: "middle", fontFace: F.body,
    fontSize: 13, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.65, y: 1.95, w: CW - 7.65, h: 2.2, fill: "EAF0FD", line: "C7D7F7" });
s.addText("Görüntü sanaldır", { x: M + 8.0, y: 2.15, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.blue, isTextBox: true, margin: 0 });
T.body(s, "Suyun içinde gerçekten bir görüntü oluşmaz; ışınların uzantıları orada kesişir. " +
  "Bu yüzden görünen derinliğe perde konamaz.",
  { x: M + 8.0, y: 2.6, w: 3.3, h: 1.4, size: 12.5 });
T.formula(s, "h′ = h / n\nΔh = h (1 − 1/n)", { x: M + 7.65, y: 4.35, w: CW - 7.65, h: 1.0,
  size: 14 });
T.card(s, { x: M + 7.65, y: 5.5, w: CW - 7.65, h: 0.9, fill: C.softer });
s.addText("Su için n = 4/3: h′ = 3h/4, yani cisim derinliğinin dörtte biri kadar yükselmiş görünür.",
  { x: M + 8.0, y: 5.5, w: 3.3, h: 0.9, valign: "middle", fontFace: F.body, fontSize: 11.5,
    color: C.muted, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 3);
s.addNotes("Dört adımı tahtada çizerek göster; özellikle 'uzantı' adımı atlanınca konu havada kalıyor.");

/* 4 · sıvı tablosu + grafik */
s = T.light(p);
T.head(s, 3, "Hangi sıvı ne kadar yükseltir?", C.violet);
T.lede(s, "İndis büyüdükçe cisim daha çok yükselmiş görünür.");
const NN = [], HH = [];
for (let i = 100; i <= 180; i++) { NN.push(i / 100); HH.push(+(200 / (i / 100)).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "n", values: NN }, { name: "h′", values: HH }],
  Object.assign(T.chartOpts({ colors: [C.violet], extra: {
    title: "h = 200 cm için görünen derinlik – kırılma indisi",
    catAxisTitle: "kırılma indisi n", valAxisTitle: "görünen derinlik (cm)",
    valAxisMinVal: 0, valAxisMaxVal: 220 } }),
  { x: M, y: 1.95, w: 6.5, h: 4.45 }));
B.tablo(s, [
  ["Sıvı", "n", "h′/h", "Yükselme"],
  ["Su", "1,33", "0,75", "%25"],
  ["Alkol", "1,36", "0,74", "%26"],
  ["Gliserin", "1,47", "0,68", "%32"],
  ["Karbon sülfür", "1,63", "0,61", "%39"]
], { x: M + 6.85, y: 1.95, w: CW - 6.85, step: 0.72, size: 12, mono: true,
     cols: [[M + 7.15, 2.0], [M + 9.2, 0.8], [M + 10.0, 0.9], [M + 10.9, 1.0]] });
T.card(s, { x: M + 6.85, y: 5.65, w: CW - 6.85, h: 0.75, fill: "FDF4E3", line: "F0DCB4" });
s.addText("n = h / h′ bağıntısı, bilinmeyen bir sıvının indisini ölçmenin en basit yoludur.",
  { x: M + 7.15, y: 5.65, w: 4.5, h: 0.75, valign: "middle", fontFace: F.body, fontSize: 11.5,
    color: C.muted, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Grafiğin 1/n biçimi vurgulanmalı: indis iki katına çıkarsa görünen derinlik yarıya iner.");

/* 5 · sudan havaya */
s = T.light(p);
T.head(s, 4, "Sudan havaya bakmak", C.amber);
T.lede(s, "Gözlemci yoğun ortamdaysa bağıntı ters çalışır.");
T.formula(s, "havadan bakış: h′ = h / n        sudan bakış: h′ = n · h", { x: M, y: 1.95,
  w: CW, h: 0.8, size: 16, fill: "FDF4E3", color: C.amber });
[["Havadan suya bakış", "Cisim yükselmiş, yani daha yakın görünür.", "h′ = h/n", "sığ görünür", C.blue],
 ["Sudan havaya bakış", "Cisim daha yüksekte, yani daha uzak görünür.", "h′ = n·h", "uzak görünür", C.rose]
].forEach((r, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 3.0, w: 5.85, h: 2.2 });
  s.addText(r[0], { x: x + 0.35, y: 3.2, w: 5.1, h: 0.45, fontFace: F.body, fontSize: 15,
    bold: true, color: r[4], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: x + 0.35, y: 3.72, w: 5.1, h: 0.8, size: 12.5 });
  s.addText(r[2], { x: x + 0.35, y: 4.5, w: 2.4, h: 0.4, fontFace: "Courier New",
    fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[3], { x: x + 2.9, y: 4.5, w: 2.55, h: 0.4, align: "right", fontFace: F.body,
    fontSize: 12.5, bold: true, color: r[4], isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.45, w: CW, h: 0.95, fill: C.softer });
s.addText([{ text: "Genel kural: ", options: { bold: true, color: C.ink } },
  { text: "Gözlemcinin bulunduğu ortamın indisi büyükse cisim uzaklaşmış, küçükse yakınlaşmış " +
    "görünür. Su altındaki dalgıç için 1,5 m yukarıdaki kuş 2 m'de görünür.",
    options: { color: C.muted } }],
  { x: M + 0.35, y: 5.45, w: CW - 0.7, h: 0.95, valign: "middle", fontFace: F.body,
    fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Bu simetri sorularda sık sınanır: hangi ortamda olduğunu sormadan formül seçilmemeli.");

/* 6 · cam levha + günlük */
s = T.light(p);
T.head(s, 5, "Cam levha ve günlük örnekler", C.lime);
T.lede(s, "Kitabın üstündeki cam, yazıyı neden yükseltir?");
T.formula(s, "Δ = t (1 − 1/n)        cam için (n = 1,5): Δ = t / 3", { x: M, y: 1.95,
  w: 6.3, h: 0.8, size: 15, fill: "EAF7DC", color: C.lime });
T.body(s, "Kalınlığı t, indisi n olan cam levha altındaki yazıyı yukarı taşımış gibi gösterir. " +
  "Yazının levhaya uzaklığı sonucu değiştirmez; önemli olan ışığın cam içinde katettiği " +
  "kalınlıktır. 6 cm'lik cam levha yazıyı 2 cm yükseltir.",
  { x: M, y: 2.95, w: 6.3, h: 1.4, size: 13 });
[["Havuz sığ görünür", "Derinliği olduğundan az sanıp atlamak tehlikelidir."],
 ["Kaşık kırık görünür", "Su altındaki kısım yükselmiş görünür."],
 ["Zıpkınla balık avı", "Avcılar gördüklerinin biraz altına nişan alır."],
 ["Bardaktaki bozuk para", "Su eklenince görünmeyen para görünür olur."]
].forEach((r, i) => {
  const y = 4.5 + i * 0.5;
  s.addText("•", { x: M + 0.1, y: y, w: 0.3, h: 0.45, fontFace: F.body, fontSize: 13,
    color: C.lime, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(r[0], { x: M + 0.4, y: y, w: 2.5, h: 0.45, valign: "middle", fontFace: F.body,
    fontSize: 12.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 2.95, y: y, w: 3.4, h: 0.45, valign: "middle", fontFace: F.body,
    fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 6.7, y: 1.95, w: CW - 6.7, h: 4.45, fill: "FCECF0", line: "F3C9D4" });
s.addText("Bağıntının sınırı", { x: M + 7.05, y: 2.2, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "h′ = h/n bağıntısı yalnızca dik (dike yakın) bakış içindir.\n\n" +
  "Yüzeye çok eğik bakıldığında kırılma açısı büyür; uzantıların kesiştiği nokta daha da " +
  "yükselir ve cisim beklenenden de sığ görünür.\n\n" +
  "Bu yüzden havuza yandan bakıldığında dip iyice yakın görünür — ve bu, atlayanlar için " +
  "gerçek bir tehlikedir.",
  { x: M + 7.05, y: 2.75, w: 4.3, h: 3.4, size: 12.5 });
T.footer(s, FOOT, 6);
s.addNotes("Güvenlik uyarısı bu slaytın en değerli kısmı: derinliği gözle tahmin etmek yanıltıcı.");

B.ornek(p, { foot: FOOT, sayfa: 7, no: 6, tone: C.blue,
  baslik: "Çözümlü örnek · havuzun derinliği",
  lede: "n(su) = 4/3 alınmıştır.",
  soru: "Derinliği 2 m olan bir havuzun dibi, yukarıdan bakan biri için kaç metre derinlikte " +
    "görünür? Yükselme ne kadardır?",
  cevap: "1,5 m · yükselme 0,5 m",
  adimlar: [
    ["1", "h′ = h/n = 2 / (4/3) = 2 · 3/4"],
    ["2", "h′ = 1,5 m"],
    ["3", "Δh = 2 − 1,5 = 0,5 m, yani derinliğin dörtte biri."],
    ["!", "Su içindeki her cisim gerçek derinliğinin dörtte üçünde görünür."]],
  not: "Havuz güvenliğiyle ilişkilendir: 2 m'lik havuz 1,5 m gibi görünüyor." });

B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.violet,
  baslik: "Çözümlü örnek · indisi bulmak",
  lede: "Ölçümden indise.",
  soru: "Bir kaptaki sıvının 60 cm derinliğindeki cisim, 40 cm derinlikte görünüyor.\n\n" +
    "(a) Sıvının kırılma indisi nedir?\n(b) Işığın bu sıvıdaki hızı nedir?",
  cevap: "(a) 1,5 · (b) 2·10⁸ m/s",
  adimlar: [
    ["a", "n = h / h′ = 60 / 40 = 1,5"],
    ["b", "v = c/n = 3·10⁸ / 1,5 = 2·10⁸ m/s"],
    ["!", "Bu yöntem, laboratuvarda sıvı indisini ölçmenin en basit yollarından biridir."]],
  not: "Bir önceki konuyla (kırılma) bağ kurmak için ideal örnek." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.rose,
  baslik: "Çözümlü örnek · sudan bakış ve cam levha",
  lede: "İki ayrı bağıntı bir arada.",
  soru: "(a) Su altındaki dalgıç, yüzeyden 120 cm yukarıdaki lambayı kaç cm'de görür? (n = 4/3)\n\n" +
    "(b) Kalınlığı 9 cm, indisi 1,5 olan cam levha altındaki yazı ne kadar yükselir?",
  cevap: "(a) 160 cm · (b) 3 cm",
  adimlar: [
    ["a", "Gözlemci yoğun ortamda: h′ = n·h = (4/3)·120 = 160 cm"],
    ["2", "Lamba 40 cm daha yüksekteymiş gibi görünür."],
    ["b", "Δ = t(1 − 1/n) = 9 · (1 − 1/1,5) = 9 · (1/3)"],
    ["3", "Δ = 3 cm; yazı ile levha arasındaki hava boşluğu sonucu değiştirmez."]],
  not: "İki bağıntının yönünü karşılaştırmak için iyi bir kapanış örneği." });

B.hatalar(p, { foot: FOOT, sayfa: 10, no: 9, maddeler: [
  ["h′ = h·n yazmak", "Havadan bakışta bölme yapılır: h′ = h/n."],
  ["Görüntüyü gerçek sanmak", "Görüntü sanaldır; su içinde perdeye düşmez."],
  ["Cismin yükseldiğini düşünmek", "Cisim yerinde durur; değişen ışınların doğrultusudur."],
  ["Sudan bakışta aynı bağıntı", "O durumda h′ = n·h olur, cisim uzaklaşmış görünür."],
  ["Cam levhada yükselme t kadar", "Yükselme t değil, t(1 − 1/n)'dir."],
  ["Eğik bakışta aynı formül", "Bağıntı dik bakış içindir."]
], not: "Üçüncü madde kavramsal; 'ne değişti?' sorusuyla tartıştır." });

B.ozet(p, {
  maddeler: [
    ["Kırılma yanıltır", "Kırılan ışınların uzantıları cismi gerçek yerinden yukarıda gösterir."],
    ["Havadan bakışta bölünür", "h′ = h/n; suda her cisim dörtte üç derinlikte görünür."],
    ["Sudan bakışta çarpılır", "h′ = n·h; havadaki cisim uzaklaşmış görünür."],
    ["Cam levha yazıyı yükseltir", "Δ = t(1 − 1/n); cam için kalınlığın üçte biri."]],
  linkMetin: "Havuz laboratuvarı, balık avı ve cam levha:",
  link: "dersler.perinet.org/gorunur-derinlik.html",
  not: "Kapanışta balık avı bölümünü oynat: sınıfa 'nereye nişan alalım?' diye sor."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/gorunur-derinlik.pptx" })
  .then(f => console.log("yazıldı:", f));
