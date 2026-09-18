const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Fiber optik", "Fizik · Optik");
const FOOT = "Optik · Konu 06 · Fiber optik";

let s = B.kapak(p, {
  ust: "OPTİK · KONU 06",
  baslik: "Fiber optik",
  lede: "Saç teli inceliğindeki cam iplik, ışığı kilometrelerce öteye kayıpsıza yakın taşır. " +
    "Sırrı tek bir olaydır: tam yansıma.",
  formul: "sin θ(sınır) = n₂ / n₁          NA = √(n₁² − n₂²)          v = c / n₁",
  link: "dersler.perinet.org/fiber-optik.html",
  not: "Açılışta sor: 'Bu odadaki internet hangi yoldan geliyor? Denizin altından geçen cam iplikle.'"
});
s.addShape("rect", { x: 9.2, y: 3.5, w: 3.7, h: 0.9, fill: { color: "1B2544" },
  line: { color: "2C3860", width: 1 } });
[[9.2, 3.95, 0.92, 0.45], [10.12, 3.5, 0.92, 0.45], [11.04, 3.95, 0.92, 0.45],
 [11.96, 3.5, 0.92, 0.45]].forEach((q, i) => {
  s.addShape("line", { x: q[0], y: q[1], w: q[2], h: q[3], flipV: i % 2 === 1,
    line: { color: "B9EE63", width: 2.5 } });
});
s.addText("çekirdek", { x: 9.2, y: 4.45, w: 1.6, h: 0.3, fontFace: F.body, fontSize: 10,
  color: "6A7798", isTextBox: true, margin: 0 });
s.addText("tam yansıma", { x: 11.2, y: 4.45, w: 1.8, h: 0.3, fontFace: F.body, fontSize: 10,
  color: "B9EE63", isTextBox: true, margin: 0 });

B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: yapısından kullanım alanlarına.",
  kartlar: [
    ["Yapısı", "Çekirdek, kılıf ve koruyucu kaplama.", C.blue],
    ["Çalışma ilkesi", "Tam yansıma; n₁ > n₂ şartı.", C.violet],
    ["Kabul açısı", "NA = √(n₁² − n₂²) ve kabul konisi.", C.lime],
    ["Sinyal hızı", "v = c/n₁; mod dağılımı.", C.amber],
    ["Kayıplar", "Bükülme, soğurma, saçılma.", C.rose],
    ["Kullanım alanları", "İnternet, endoskop, sensörler.", C.blue]
  ],
  not: "Önceki konudaki tam yansımayı hatırlatarak başla: bu konu onun mühendislik uygulaması."
});

/* 3 · yapı ve ilke */
s = T.light(p);
T.head(s, 2, "Yapısı ve çalışma ilkesi", C.blue);
T.lede(s, "İki katman, tek kural.");
[["Çekirdek (core)", "Işığın taşındığı iç kısım; indisi n₁.",
  "tek modlu ≈ 9 µm, çok modlu 50 – 62,5 µm", C.blue],
 ["Kılıf (cladding)", "Çekirdeği saran, indisi daha küçük katman (n₂ < n₁).",
  "tam yansımayı sağlayan katman", C.violet],
 ["Koruyucu kaplama", "Mekanik dayanım sağlar; optik görevi yoktur.",
  "plastik, çekmeye dayanıklı", C.dim]
].forEach((r, i) => {
  const y = 1.95 + i * 1.18;
  T.card(s, { x: M, y: y, w: 7.2, h: 1.05 });
  s.addText(r[0], { x: M + 0.3, y: y + 0.1, w: 2.4, h: 0.4, fontFace: F.body, fontSize: 13.5,
    bold: true, color: r[3], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 2.8, y: y + 0.1, w: 4.2, h: 0.5, fontFace: F.body, fontSize: 12,
    color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 0.3, y: y + 0.6, w: 6.7, h: 0.35, fontFace: "Courier New",
    fontSize: 10.5, bold: true, color: C.dim, isTextBox: true, margin: 0 });
});
T.formula(s, "sin θ(sınır) = n₂ / n₁", { x: M, y: 5.6, w: 7.2, h: 0.8, size: 16 });
T.card(s, { x: M + 7.55, y: 1.95, w: CW - 7.55, h: 4.45, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Açı nereden ölçülür?", { x: M + 7.9, y: 2.2, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "Duvara çarpma açısı, duvarın normaline göre ölçülür.\n\n" +
  "Fiber ekseniyle küçük açı yapan ışın, duvara çok yatık — yani büyük açıyla — çarpar. " +
  "Bu açı sınır açıdan büyük olduğu sürece ışık dışarı çıkamaz.\n\n" +
  "Tam yansımada kayıp yoktur: ışığın tamamı geri döner ve bu binlerce kez tekrarlanır.",
  { x: M + 7.9, y: 2.75, w: 3.3, h: 3.4, size: 12.5 });
T.footer(s, FOOT, 3);
s.addNotes("Açının normale göre ölçülmesi burada kritik; öğrenciler 'küçük açı' deyince kafaları karışıyor.");

/* 4 · kabul açısı */
s = T.light(p);
T.head(s, 3, "Kabul açısı ve sayısal açıklık", C.lime);
T.lede(s, "Fiberin ucuna hangi açıyla giren ışık taşınır?");
const N2 = [], NA = [], AC = [];
for (let i = 100; i <= 149; i++) {
  const n2 = i / 100;
  N2.push(n2);
  const na = Math.sqrt(Math.max(1.5 * 1.5 - n2 * n2, 0));
  NA.push(+na.toFixed(3));
  AC.push(+((Math.asin(Math.min(na, 1)) * 180) / Math.PI).toFixed(1));
}
s.addChart(p.ChartType.scatter, [{ name: "n₂", values: N2 }, { name: "kabul açısı", values: AC }],
  Object.assign(T.chartOpts({ colors: [C.lime], extra: {
    title: "n₁ = 1,50 için kabul açısı – kılıf indisi",
    catAxisTitle: "kılıf indisi n₂", valAxisTitle: "kabul açısı (°)",
    valAxisMinVal: 0, valAxisMaxVal: 90 } }),
  { x: M, y: 1.95, w: 6.5, h: 4.45 }));
T.formula(s, "NA = √(n₁² − n₂²)\nsin θ(kabul) = NA", { x: M + 6.85, y: 1.95, w: CW - 6.85,
  h: 1.0, size: 14, fill: "EAF7DC", color: C.lime });
T.bullets(s, [
  "Kabul konisinin dışından gelen ışık çekirdekte kalamaz.",
  "NA büyükse fiber daha geniş açıdan ışık toplar.",
  "n₁ ile n₂ birbirine yaklaştıkça koni daralır.",
  "Tipik değerler: NA ≈ 0,2 – 0,3; kabul açısı 12° – 17°.",
  "Dar koni: daha az ışık ama daha temiz sinyal."],
  { x: M + 6.85, y: 3.15, w: CW - 6.85, h: 3.2, size: 12.5, gap: 15 });
T.footer(s, FOOT, 4);
s.addNotes("Kabul açısı ile sınır açı farklı yerlerde tanımlı; bunu iki kez söylemekte fayda var.");

/* 5 · sinyal */
s = T.light(p);
T.head(s, 4, "Sinyalin hızı ve mod dağılımı", C.amber);
T.lede(s, "Fiberde ışık boşluktakinden yavaştır; üstelik her ışın aynı yolu izlemez.");
T.formula(s, "v = c / n₁        t = n₁·L / c", { x: M, y: 1.95, w: 6.4, h: 0.8, size: 16,
  fill: "FDF4E3", color: C.amber });
B.tablo(s, [
  ["Kablo uzunluğu", "En hızlı ışın", "En yavaş ışın", "Fark"],
  ["1 km", "5,0 µs", "5,14 µs", "0,14 µs"],
  ["10 km", "50 µs", "51,4 µs", "1,37 µs"],
  ["60 km", "300 µs", "308 µs", "8,2 µs"],
  ["100 km", "500 µs", "514 µs", "13,7 µs"]
], { x: M, y: 2.95, w: 6.4, step: 0.72, size: 12, mono: true,
     cols: [[M + 0.3, 1.9], [M + 2.2, 1.5], [M + 3.7, 1.5], [M + 5.2, 1.0]] });
T.bullets(s, [
  "n₁ = 1,5 için fiberde hız 2·10⁸ m/s: boşluktakinin üçte ikisi.",
  "Eksene yakın ışın kısa, yatık açılı ışın uzun yol alır.",
  "Bu fark sinyal darbesini genişletir: mod dağılımı.",
  "Darbeler birbirine karışmasın diye veri hızı sınırlanır.",
  "Tek modlu fiberde çekirdek çok ince olduğu için sorun ortadan kalkar."],
  { x: M + 6.8, y: 2.0, w: CW - 6.8, h: 3.2, size: 12.5, gap: 15 });
T.card(s, { x: M + 6.8, y: 5.4, w: CW - 6.8, h: 1.0, fill: C.softer });
s.addText("Tablodaki değerler n₁ = 1,50 ve n₂ = 1,46 olan çok modlu bir fiber içindir.",
  { x: M + 7.15, y: 5.4, w: 4.5, h: 1.0, valign: "middle", fontFace: F.body, fontSize: 11.5,
    color: C.muted, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Mod dağılımı, veri hızının neden sınırlı olduğunu açıklıyor; tek modlu fiberin sebebi bu.");

/* 6 · kayıplar ve karşılaştırma */
s = T.light(p);
T.head(s, 5, "Kayıplar ve bakırla karşılaştırma", C.rose);
T.lede(s, "Neden bütün omurga fiber?");
[["Bükülme kaybı", "Keskin kıvrımda ışın dış duvara daha dik çarpar; tam yansıma bozulur.", C.rose],
 ["Soğurma", "Camın kendi kusurları ışığın bir kısmını yutar.", C.amber],
 ["Saçılma", "Malzemedeki küçük düzensizlikler ışığı dağıtır.", C.violet]
].forEach((r, i) => {
  const y = 1.95 + i * 1.0;
  T.card(s, { x: M, y: y, w: 6.3, h: 0.88 });
  s.addText(r[0], { x: M + 0.3, y: y, w: 2.1, h: 0.88, valign: "middle", fontFace: F.body,
    fontSize: 12.5, bold: true, color: r[2], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 2.45, y: y, w: 3.7, h: 0.88, valign: "middle", fontFace: F.body,
    fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.05, w: 6.3, h: 1.35, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "km başına 0,2 dB. ", options: { bold: true, color: C.lime } },
  { text: "Bütün kayıplara rağmen modern fiberde ışık, kilometrelerce yol aldıktan sonra bile " +
    "büyük ölçüde ayaktadır. Bakır kabloda aynı mesafede sinyal çoktan sönerdi.",
    options: { color: C.muted } }],
  { x: M + 0.35, y: 5.05, w: 5.6, h: 1.35, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
B.tablo(s, [
  ["Özellik", "Fiber optik", "Bakır kablo"],
  ["Bant genişliği", "çok yüksek", "sınırlı"],
  ["Kayıp", "çok düşük", "yüksek"],
  ["EM girişim", "etkilenmez", "etkilenir"],
  ["Ağırlık", "hafif", "ağır"],
  ["Dinlenebilirlik", "çok zor", "daha kolay"]
], { x: M + 6.7, y: 1.95, w: CW - 6.7, step: 0.74, size: 12,
     cols: [[M + 7.0, 2.0], [M + 9.1, 1.7], [M + 10.8, 1.5]] });
T.footer(s, FOOT, 6);
s.addNotes("EM girişimden etkilenmemek, elektrik santrali gibi gürültülü ortamlarda belirleyici.");

/* 7 · kullanım */
B.kartlar6(p, {
  foot: FOOT, sayfa: 7, no: 6, tone: C.blue, baslik: "Nerede kullanılır?",
  lede: "Işığı bir noktadan diğerine taşımak gereken her yerde.",
  kartlar: [
    ["İnternet omurgası", "Kıtaları birbirine bağlayan denizaltı kabloları.", "terabit/s", C.blue],
    ["Endoskop", "Vücudun içini hem aydınlatır hem görüntüler.", "tıp", C.violet],
    ["Sanayi görüntüleme", "Ulaşılması zor yerlerin içini gösterir.", "boroskop", C.lime],
    ["Lazer taşıma", "Kesme ve tıbbi lazerleri hedefe iletir.", "yüksek güç", C.amber],
    ["Sensörler", "Sıcaklık, gerilme ve titreşim ölçümü.", "yapı sağlığı", C.rose],
    ["Aydınlatma ve süs", "Işığı noktadan noktaya taşıyan lifler.", "dekorasyon", C.blue]
  ],
  not: "Denizaltı kabloları haritası internette var; göstermek konuyu somutlaştırıyor."
});

B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.violet,
  baslik: "Çözümlü örnek · sınır açı",
  lede: "Çekirdek–kılıf sınırı.",
  soru: "Çekirdek indisi 1,50, kılıf indisi 1,20 olan bir fiberde çekirdek–kılıf sınır açısı " +
    "kaç derecedir?",
  cevap: "53°",
  adimlar: [
    ["1", "sin θ = n₂/n₁ = 1,20/1,50 = 0,8"],
    ["2", "θ = 53°"],
    ["!", "Duvara 53°'den büyük açıyla çarpan ışınlar tam yansımaya uğrar ve taşınır."]],
  not: "0,8 → 53° dönüşümü müfredattaki standart üçgenden geliyor." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.lime,
  baslik: "Çözümlü örnek · sayısal açıklık",
  lede: "Kabul konisi ne kadar geniş?",
  soru: "n₁ = 1,50 ve n₂ = 1,46 olan fiberin sayısal açıklığı ve kabul açısı nedir?",
  cevap: "NA ≈ 0,344 · θ ≈ 20°",
  adimlar: [
    ["1", "NA = √(n₁² − n₂²) = √(2,25 − 2,1316) = √0,1184"],
    ["2", "NA ≈ 0,344"],
    ["3", "sin θ(kabul) = 0,344 → θ ≈ 20°"],
    ["!", "Fiberin ucuna eksenle 20°'den büyük açı yapan ışınlar taşınamaz."]],
  not: "İki indis birbirine çok yakın; küçük farkın karesi alınınca NA nasıl çıkıyor, göster." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.amber,
  baslik: "Çözümlü örnek · sinyal süresi",
  lede: "Hız ve zaman.",
  soru: "Kırılma indisi 1,5 olan 30 km'lik fiber kabloda ışık ne kadar sürede yol alır? " +
    "Aynı yol boşlukta ne kadar sürerdi?",
  cevap: "150 µs (boşlukta 100 µs)",
  adimlar: [
    ["1", "v = c/n = 3·10⁸ / 1,5 = 2·10⁸ m/s"],
    ["2", "t = L/v = 30 000 / 2·10⁸ = 1,5·10⁻⁴ s = 150 µs"],
    ["3", "Boşlukta: 30 000 / 3·10⁸ = 100 µs"],
    ["!", "İstanbul – Ankara arası bir sinyal, fiberde yaklaşık 2 milisaniyede gider."]],
  not: "Gecikme (ping) kavramıyla bağ kur: oyun oynayanlar hemen ilgileniyor." });

B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["Kılıfın indisi büyüktür sanmak", "Tam yansıma için n₁ > n₂ olmalıdır."],
  ["Işık fiberde düz gider sanmak", "Işık zikzak çizerek binlerce kez yansır."],
  ["Tam yansımada kayıp var sanmak", "Tam yansımada ışığın tamamı döner; kayıp soğurma ve saçılmadan."],
  ["Kabul açısı ile sınır açıyı karıştırmak", "Biri fiberin ucunda, öteki çekirdek–kılıf duvarında."],
  ["Fiberde ışık c ile gider sanmak", "Hız c/n₁'dir; n₁ = 1,5 için 2·10⁸ m/s."],
  ["Kabloyu istediği gibi kıvırmak", "Bükülme yarıçapı küçülürse ışık kaçar."]
], not: "Dördüncü madde en ince ayrım; iki açının tanımlandığı yeri tekrar çizdir." });

B.ozet(p, {
  maddeler: [
    ["Çekirdek kılıftan yoğun", "n₁ > n₂ olmazsa tam yansıma olmaz, fiber çalışmaz."],
    ["Tam yansıma kayıpsızdır", "Işık binlerce kez sekerek kilometrelerce yol alır."],
    ["Kabul konisi sınırlıdır", "NA = √(n₁² − n₂²); dışarıdan gelen ışık taşınmaz."],
    ["Hız c/n₁'dir", "Fiberde ışık boşluktakinin üçte iki hızıyla ilerler."]],
  linkMetin: "Fiber laboratuvarı, kabul konisi ve bükülme sınırı:",
  link: "dersler.perinet.org/fiber-optik.html",
  not: "Kapanışta bükülme bölümünü aç; yarıçapı küçültüp ışığın kaçışını canlı göster."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/fiber-optik.pptx" })
  .then(f => console.log("yazıldı:", f));
