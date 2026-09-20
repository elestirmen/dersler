const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Serbest düşme", "Fizik · Kuvvet ve Hareket");
const FOOT = "Kuvvet ve Hareket · Konu 01 · Serbest düşme";
const CW = W - M * 2;

/* ---------- 1 · kapak ---------- */
let s = T.dark(p);
s.addText("KUVVET VE HAREKET · KONU 01", {
  x: 0.95, y: 1.75, w: 6, h: 0.35, fontFace: F.body, fontSize: 13, bold: true,
  color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0
});
s.addText("Serbest düşme", {
  x: 0.9, y: 2.15, w: 8.2, h: 1.4, fontFace: F.head, fontSize: 54, bold: true,
  color: C.white, isTextBox: true, margin: 0
});
s.addText(
  "Hava direncinin ihmal edildiği yerde bırakılan her cisim, kütlesi ne olursa " +
  "olsun aynı ivmeyle düşer. Bu dersin tamamı bu tek cümlenin sonuçlarıdır.", {
  x: 0.95, y: 3.75, w: 6.9, h: 1.1, fontFace: F.body, fontSize: 15.5,
  color: "C3CEE8", lineSpacingMultiple: 1.25, isTextBox: true, margin: 0
});
s.addText("g = 9,81 m/s²   ·   v = g·t   ·   h = ½·g·t²", {
  x: 0.95, y: 5.05, w: 7, h: 0.5, fontFace: "Courier New", fontSize: 14, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0
});
for (let k = 1; k <= 6; k++) {
  s.addShape("ellipse", {
    x: 10.85, y: 0.75 + 5.1 * ((k * k - 1) / 35), w: 0.32, h: 0.32,
    fill: { color: C.limeBright, transparency: 72 - k * 12 }, line: { type: "none" }
  });
}
s.addText("eşit zaman aralıkları", {
  x: 9.0, y: 6.35, w: 3.4, h: 0.3, align: "right", fontFace: F.body, fontSize: 10.5,
  color: "6A7798", isTextBox: true, margin: 0
});
T.footer(s, "dersler.perinet.org/serbest-dusme.html", null, true);
s.addNotes("Açılış: cismi bırakınca ne olduğunu herkes biliyor; asıl soru NEDEN kütlenin fark etmediği. Sağdaki noktalar eşit zaman aralıklarıyla çekilmiş bir strobo fotoğrafı: aralar büyüyor, çünkü hız artıyor.");

/* ---------- 2 · bu derste ---------- */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: tanımdan başlayıp çözümlü örneklere kadar.");
const AGENDA = [
  ["Tanım ve koşullar", "İlk hız sıfır, tek kuvvet ağırlık, ivme sabit.", C.blue],
  ["Kütle neden fark etmez", "Newton'un ikinci yasasında kütlenin sadeleşmesi.", C.violet],
  ["Temel bağıntılar", "v = g·t, h = ½g·t², v² = 2gh ve türetmeleri.", C.lime],
  ["Grafik yorumu", "a–t, v–t, h–t: eğim ve alan ilişkisi.", C.amber],
  ["1 : 3 : 5 kuralı", "Eşit sürelerde alınan yollar ve toplamları.", C.rose],
  ["Düşey atış · limit hız", "Yukarı atış simetrisi ve gerçekte hava direnci.", C.blue]
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
  s.addText(a[0], { x: x + 0.85, y: y + 0.26, w: 2.6, h: 0.46, fontFace: F.body,
    fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0, valign: "middle" });
  T.body(s, a[1], { x: x + 0.3, y: y + 0.92, w: 3.1, h: 0.8, size: 12.5 });
});
T.footer(s, FOOT, 2);
s.addNotes("Dersin haritası. Öğrenciye sırayla nereye gideceğimizi söyle; 5. başlık sınavda en çok soru çıkan yer.");

/* ---------- 3 · tanım ---------- */
s = T.light(p);
T.head(s, 2, "Serbest düşme nedir?", C.blue);
T.lede(s, "Bir hareketin serbest düşme sayılması için üç koşul birden aranır.");
const KOSUL = [
  ["İlk hız sıfırdır", "v₀ = 0", "Cisim atılmaz, bırakılır. İlk hız varsa hareketin adı düşey atıştır.", C.blue],
  ["Tek kuvvet ağırlıktır", "G = m·g", "Hava direnci ihmal edilir; sürtünme, itme, kaldırma kuvveti yoktur.", C.violet],
  ["İvme sabittir", "a = g", "Büyüklüğü g, yönü daima yerin merkezine doğrudur.", C.lime]
];
KOSUL.forEach((k, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 1.95, w: 3.71, h: 2.35 });
  s.addText(k[0], { x: x + 0.32, y: 2.15, w: 3.1, h: 0.4, fontFace: F.body, fontSize: 15.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.formula(s, k[1], { x: x + 0.32, y: 2.62, w: 1.55, h: 0.48, size: 14, color: k[3],
    fill: "FFFFFF" });
  T.body(s, k[2], { x: x + 0.32, y: 3.25, w: 3.1, h: 0.95, size: 12.5 });
});
T.card(s, { x: M, y: 4.62, w: CW, h: 1.75, fill: C.softer });
s.addText("Yerçekimi ivmesi her gökcisminde farklıdır", {
  x: M + 0.35, y: 4.8, w: 6, h: 0.4, fontFace: F.body, fontSize: 15, bold: true,
  color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Dünya yüzeyinde ortalama 9,81 m/s²; ekvatorda 9,78, kutuplarda 9,83. " +
  "Problemlerde işlem kolaylığı için çoğunlukla g = 10 m/s² alınır.", {
  x: M + 0.35, y: 5.24, w: 5.9, h: 0.9, size: 12.5 });
[["Ay", "1,62"], ["Mars", "3,72"], ["Dünya", "9,81"], ["Jüpiter", "24,79"]].forEach((g, i) => {
  const x = M + 6.6 + i * 1.28;
  s.addText(g[1], { x: x, y: 4.95, w: 1.2, h: 0.5, align: "center", fontFace: F.head,
    fontSize: 21, bold: true, color: i === 2 ? C.lime : C.blue, isTextBox: true, margin: 0 });
  s.addText(g[0], { x: x, y: 5.45, w: 1.2, h: 0.3, align: "center", fontFace: F.body,
    fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
  s.addText("m/s²", { x: x, y: 5.72, w: 1.2, h: 0.3, align: "center", fontFace: F.body,
    fontSize: 10, color: C.dim, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 3);
s.addNotes("Üç koşulu tek tek sor: 'Yukarı attığım taş serbest düşme yapıyor mu?' Cevap: çıkarken de inerken de ivmesi g, ama ilk hızı sıfır olmadığı için adı düşey atış.");

/* ---------- 4 · kütle ---------- */
s = T.light(p);
T.head(s, 3, "Kütle neden fark etmez?", C.violet);
T.lede(s, "Sezgi 'ağır olan önce düşer' der; Newton'un ikinci yasası tersini söyler.");
T.formula(s, "F = m · a", { x: M, y: 2.0, w: 3.4, h: 0.75, size: 17 });
T.formula(s, "m · g = m · a", { x: M, y: 2.95, w: 3.4, h: 0.75, size: 17 });
T.formula(s, "a = g", { x: M, y: 3.9, w: 3.4, h: 0.75, size: 17, fill: "EAF7DC", color: C.lime });
T.body(s, "Kütle eşitliğin iki yanında da bulunduğu için sadeleşir. Ağır cisme daha " +
  "büyük kuvvet etki eder, ama eylemsizliği de o oranda fazladır; iki etki birbirini " +
  "tam olarak götürür.", { x: M, y: 4.95, w: 3.4, h: 1.5, size: 13 });
T.card(s, { x: M + 3.9, y: 1.95, w: 3.5, h: 4.5, fill: C.softer });
s.addShape("ellipse", { x: M + 4.45, y: 2.45, w: 0.42, h: 0.42, fill: { color: C.blue },
  line: { type: "none" } });
s.addShape("ellipse", { x: M + 5.85, y: 2.3, w: 0.72, h: 0.72, fill: { color: C.violet },
  line: { type: "none" } });
s.addText("1 kg", { x: M + 3.55, y: 2.44, w: 0.85, h: 0.44, align: "right", valign: "middle",
  fontFace: F.body, fontSize: 11.5, bold: true, color: C.blue, isTextBox: true, margin: 0 });
s.addText("8 kg", { x: M + 6.65, y: 2.44, w: 0.85, h: 0.44, align: "left", valign: "middle",
  fontFace: F.body, fontSize: 11.5, bold: true, color: C.violet, isTextBox: true, margin: 0 });
s.addShape("line", { x: M + 4.2, y: 5.25, w: 2.9, h: 0, line: { color: C.lime, width: 2 } });
s.addText("aynı anda yere iner", { x: M + 4.2, y: 5.35, w: 2.9, h: 0.35, align: "center",
  fontFace: F.body, fontSize: 12.5, bold: true, color: C.lime, isTextBox: true, margin: 0 });
s.addShape("line", { x: M + 4.66, y: 2.95, w: 0, h: 2.25,
  line: { color: C.blue, width: 1.5, dashType: "dash" } });
s.addShape("line", { x: M + 6.21, y: 3.05, w: 0, h: 2.15,
  line: { color: C.violet, width: 1.5, dashType: "dash" } });
s.addText("hava direnci ihmal edildiğinde", { x: M + 4.05, y: 5.82, w: 3.2, h: 0.3,
  align: "center", fontFace: F.body, fontSize: 10.5, color: C.dim, isTextBox: true, margin: 0 });
T.card(s, { x: M + 7.8, y: 1.95, w: CW - 7.8, h: 4.5 });
s.addText("1971 · Apollo 15", { x: M + 8.15, y: 2.2, w: 3.3, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Astronot David Scott, havasız Ay yüzeyinde bir şahin tüyü ile alüminyum bir " +
  "çekici aynı anda bıraktı. İkisi de aynı anda toza değdi.", {
  x: M + 8.15, y: 2.7, w: 3.3, h: 1.45, size: 13 });
T.body(s, "Günlük hayatta tüyün geride kalmasının sebebi kütlesi değil, hava direncidir. " +
  "Havası boşaltılmış bir tüpte bu fark tamamen kaybolur.", {
  x: M + 8.15, y: 4.2, w: 3.3, h: 1.4, size: 13 });
T.formula(s, "Galileo, 1600'ler", { x: M + 8.15, y: 5.7, w: 3.3, h: 0.5, size: 12,
  fill: "F1EDFB", color: C.violet });
T.footer(s, FOOT, 4);
s.addNotes("Tahtada m'leri sadeleştirerek göster. Ardından sor: 'Ağır cisme daha büyük kuvvet etki ediyorsa neden daha hızlı düşmüyor?' Cevap eylemsizlik.");

/* ---------- 5 · bağıntılar ---------- */
s = T.light(p);
T.head(s, 4, "Temel bağıntılar", C.lime);
T.lede(s, "Aşağı yön pozitif, v₀ = 0 ve a = g alındığında sabit ivmeli hareket denklemleri sadeleşir.");
[["v = g · t", "hız"], ["h = ½ · g · t²", "alınan yol"],
 ["v² = 2 · g · h", "süre bilinmiyorsa"], ["t = √(2h / g)", "düşme süresi"]].forEach((f, i) => {
  const x = M + i * (2.83 + 0.33);
  T.formula(s, f[0], { x: x, y: 1.95, w: 2.83, h: 0.95, size: 16 });
  s.addText(f[1], { x: x, y: 2.96, w: 2.83, h: 0.3, align: "center", fontFace: F.body,
    fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 3.6, w: 5.8, h: 2.8, fill: C.softer });
s.addText("Üçüncü bağıntı nereden geliyor?", { x: M + 0.35, y: 3.85, w: 5.1, h: 0.4,
  fontFace: F.body, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "İlk iki bağıntıdan süreyi yok edelim. v = g·t ifadesinden t = v/g yazıp " +
  "ikinciye koyarsak:", { x: M + 0.35, y: 4.3, w: 5.1, h: 0.6, size: 13 });
T.formula(s, "h = ½·g·(v/g)² = v²/(2g)   →   v² = 2·g·h", {
  x: M + 0.35, y: 4.95, w: 5.1, h: 0.6, size: 12.5, fill: "FFFFFF" });
T.body(s, "Süre sorulmayan sorularda en kısa yol budur.", {
  x: M + 0.35, y: 5.7, w: 5.1, h: 0.5, size: 12.5 });
T.card(s, { x: M + 6.13, y: 3.6, w: CW - 6.13, h: 2.8 });
s.addText("Hemen okunacak üç sonuç", { x: M + 6.48, y: 3.85, w: 5.1, h: 0.4,
  fontFace: F.body, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Düşme süresi yüksekliğin kareköküyle artar: 4 kat yükseklik → 2 kat süre.",
  "Çarpma hızı da yüksekliğin kareköküyle artar.",
  "Alınan yol ise sürenin karesiyle büyür.",
  "Kütle hiçbir bağıntıda yer almaz."
], { x: M + 6.48, y: 4.35, w: 5.0, h: 1.9, size: 13, gap: 11 });
T.footer(s, FOOT, 5);
s.addNotes("Dört bağıntının üçü bağımsız; dördüncüsü ikincinin t'ye göre çözülmüş hâli. Öğrenciye 'hangi büyüklük verilmiş, hangisi isteniyor' diye sordur.");

/* ---------- 6 · grafikler ---------- */
s = T.light(p);
T.head(s, 5, "Grafikler ve yorumu", C.amber);
T.lede(s, "Ezberlemek yerine eğim–alan ilişkisini kurmak yeterli (g = 9,81 m/s², ilk 3 saniye).");
const tt = [], va = [], ha = [], aa = [];
for (let i = 0; i <= 30; i++) { const t = i / 10; tt.push(t); aa.push(9.81);
  va.push(+(9.81 * t).toFixed(2)); ha.push(+(4.905 * t * t).toFixed(2)); }
const G = [
  { title: "a – t · ivme", y: aa, color: C.violet, unit: "m/s²",
    note: "Zaman eksenine paralel doğru. Eğim sıfır, ivme hiç değişmez." },
  { title: "v – t · hız", y: va, color: C.lime, unit: "m/s",
    note: "Orijinden geçen doğru. Eğimi g; altındaki alan alınan yolu verir." },
  { title: "h – t · alınan yol", y: ha, color: C.blue, unit: "m",
    note: "Parabol. Herhangi bir noktadaki eğim, o andaki anlık hızdır." }
];
G.forEach((g, i) => {
  const x = M + i * (3.71 + 0.4);
  s.addChart(p.ChartType.scatter,
    [{ name: "t", values: tt }, { name: g.title, values: g.y }],
    Object.assign(T.chartOpts({ colors: [g.color], extra: {
      title: g.title, catAxisTitle: "t (s)", valAxisTitle: g.unit,
      valAxisMinVal: 0, lineSize: 3 } }),
      { x: x, y: 1.9, w: 3.71, h: 3.0 }));
  T.body(s, g.note, { x: x + 0.05, y: 5.05, w: 3.6, h: 0.9, size: 12 });
});
T.card(s, { x: M, y: 6.0, w: CW, h: 0.62, fill: C.softer, flat: true });
T.body(s, "v – t doğrusunun altındaki üçgenin alanı ½·t·(g·t) = ½·g·t² eder — bu da tam olarak alınan yoldur. Grafikler birbirini böyle doğrular.",
  { x: M + 0.3, y: 6.0, w: CW - 0.6, h: 0.62, size: 12.5, valign: "middle", color: C.ink });
T.footer(s, FOOT, 6);
s.addNotes("Üç grafiği birbirine bağla: a–t'nin altındaki alan hız değişimi, v–t'nin altındaki alan yol. Sınavda en sık 'v–t'nin eğimi nedir' diye sorulur: g.");

/* ---------- 7 · 1:3:5 ---------- */
s = T.light(p);
T.head(s, 6, "Eşit zamanlarda 1 : 3 : 5", C.rose);
T.lede(s, "Düşüşü eşit süreli dilimlere bölelim (Δt = 1 s, g = 10 m/s²).");
s.addChart(p.ChartType.bar,
  [{ name: "O aralıkta alınan yol (m)",
     labels: ["1. saniye", "2. saniye", "3. saniye", "4. saniye", "5. saniye"],
     values: [5, 15, 25, 35, 45] }],
  Object.assign(T.chartOpts({ colors: [C.rose], extra: {
    title: "Her aralıkta alınan yol · 1 : 3 : 5 : 7 : 9",
    barDir: "col", barGapWidthPct: 45, showValue: true, dataLabelPosition: "outEnd",
    dataLabelFontFace: F.body, dataLabelFontSize: 10, dataLabelColor: C.muted,
    catAxisTitle: "eşit süreli dilimler", valAxisTitle: "m", valAxisMaxVal: 52 } }),
  { x: M, y: 1.95, w: 6.9, h: 4.4 }));
T.card(s, { x: M + 7.25, y: 1.95, w: CW - 7.25, h: 2.05, fill: C.softer });
s.addText("Toplam yollar", { x: M + 7.6, y: 2.15, w: 4, h: 0.35, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.formula(s, "5 · 20 · 45 · 80 · 125 m", { x: M + 7.6, y: 2.58, w: 3.7, h: 0.5, size: 12.5,
  fill: "FFFFFF" });
T.body(s, "yani 1 : 4 : 9 : 16 : 25 — sürenin karesiyle orantılı (h = ½·g·t²).",
  { x: M + 7.6, y: 3.18, w: 3.7, h: 0.65, size: 12.5 });
T.card(s, { x: M + 7.25, y: 4.3, w: CW - 7.25, h: 2.05 });
s.addText("Karıştırma!", { x: M + 7.6, y: 4.5, w: 4, h: 0.35, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.bullets(s, [
  "1 : 3 : 5 → her aralıkta alınan yol",
  "1 : 4 : 9 → baştan itibaren toplam yol",
  "1 : 2 : 3 → aralık sonlarındaki hızlar"
], { x: M + 7.6, y: 4.95, w: 3.7, h: 1.3, size: 12.5, gap: 7 });
T.footer(s, FOOT, 7);
s.addNotes("Çubukların boyları tek sayılar; farkları hep 10 m (= g·Δt²). Öğrenciye 'son saniyede 45 m düşen cisim kaç saniyede indi' diye sor: 5 s.");

/* ---------- 8 · düşey atış ---------- */
s = T.light(p);
T.head(s, 7, "Düşey atış: yukarı fırlatınca", C.blue);
T.lede(s, "İvme yine g'dir ve yine aşağı yöndedir; değişen tek şey ilk hızın olması.");
[["h(maks) = v₀² / (2g)", "çıkılan en yüksek nokta"],
 ["t(çıkış) = v₀ / g", "tepe noktasına kadar"],
 ["t(toplam) = 2·v₀ / g", "havada kalma süresi"]].forEach((f, i) => {
  T.formula(s, f[0], { x: M, y: 1.95 + i * 1.12, w: 4.3, h: 0.7, size: 14.5 });
  s.addText(f[1], { x: M + 4.45, y: 1.95 + i * 1.12, w: 2.2, h: 0.7, valign: "middle",
    fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.0, y: 1.95, w: CW - 7.0, h: 2.95, fill: C.softer });
s.addText("Hareket simetriktir", { x: M + 7.35, y: 2.15, w: 4.3, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Çıkış süresi iniş süresine eşittir.",
  "Aynı yükseklikten geçerken süratler eşit, yönler terstir.",
  "Atıldığı noktaya döndüğünde sürati v₀'a eşittir."
], { x: M + 7.35, y: 2.62, w: 4.2, h: 2.1, size: 13, gap: 10 });
T.card(s, { x: M, y: 5.45, w: CW, h: 1.0, fill: "FDF4E3", line: "F0DCB4" });
s.addText("!", { x: M + 0.3, y: 5.62, w: 0.5, h: 0.5, align: "center", valign: "middle",
  fontFace: F.head, fontSize: 22, bold: true, color: C.amber, isTextBox: true, margin: 0 });
s.addText([
  { text: "Tepe noktada ivme sıfır değildir. ", options: { bold: true, color: C.ink } },
  { text: "Sıfır olan hızdır; ivme hâlâ g'dir ve aşağı doğrudur. İvme sıfır olsaydı cisim orada asılı kalırdı.",
    options: { color: C.muted } }
], { x: M + 0.9, y: 5.45, w: CW - 1.2, h: 1.0, valign: "middle", fontFace: F.body,
  fontSize: 13.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 8);
s.addNotes("Klasik sınav tuzağı burada: tepe noktada v = 0 ama a = g. Simetriyi kullanarak 'kaç saniye sonra aynı hızla geçer' sorularını hızlıca çözdür.");

/* ---------- 9 · limit hız ---------- */
s = T.light(p);
T.head(s, 8, "Gerçekte: hava direnci ve limit hız", C.violet);
T.lede(s, "Hava direnci hıza bağlı olarak artar; ağırlığa eşitlendiği anda ivme biter.");
[["≈ 9 m/s", "Yağmur damlası", C.blue],
 ["≈ 55 m/s", "Paraşütsüz atlayan insan", C.violet],
 ["≈ 5 m/s", "Paraşüt açıldığında", C.lime]].forEach((v, i) => {
  const x = M + i * (3.71 + 0.4);
  T.card(s, { x: x, y: 1.95, w: 3.71, h: 1.7 });
  T.stat(s, v[0], v[1], { x: x + 0.35, y: 2.1, w: 3.0, color: v[2], size: 32 });
});
T.card(s, { x: M, y: 4.15, w: 7.4, h: 2.25, fill: C.softer });
s.addText("Limit hız nasıl oluşur?", { x: M + 0.35, y: 4.38, w: 6.5, h: 0.4,
  fontFace: F.body, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Cisim hızlandıkça direnç büyür. Direnç ağırlığa eşitlendiğinde net kuvvet " +
  "sıfırlanır, ivme biter ve cisim sabit hızla düşmeye devam eder. Yüzey alanı büyük, " +
  "kütlesi küçük cisimler (tüy, kâğıt) limit hıza çok çabuk ulaşır; bu yüzden " +
  "'yavaş düşüyor' gibi görünürler.", { x: M + 0.35, y: 4.85, w: 6.6, h: 1.35, size: 13 });
T.card(s, { x: M + 7.75, y: 4.15, w: CW - 7.75, h: 2.25, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Vakumda fark yok", { x: M + 8.1, y: 4.38, w: 3.5, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "Havası boşaltılmış bir tüpte tüy ile bilye yan yana iner. Fark hava " +
  "direncinden gelir, kütleden değil.", { x: M + 8.1, y: 4.85, w: 3.3, h: 1.3, size: 13 });
T.footer(s, FOOT, 9);
s.addNotes("Buradaki mesaj: derste 'ihmal ediyoruz' dediğimiz şey gerçek hayatta paraşütü çalıştıran şeydir. Limit hız formülü müfredat dışı, sayısal örnek yeter.");

/* ---------- 10 · gökcisimleri ---------- */
s = T.light(p);
T.head(s, 9, "Aynı yükseklik, farklı gökcismi", C.amber);
T.lede(s, "10 m yüksekten bırakılan bir cisim: t = √(2h / g).");
s.addChart(p.ChartType.bar,
  [{ name: "g (m/s²)", labels: ["Ay", "Mars", "Dünya", "Jüpiter"],
     values: [1.62, 3.72, 9.81, 24.79] }],
  Object.assign(T.chartOpts({ colors: [C.violet, C.rose, C.lime, C.amber], extra: {
    title: "Yerçekimi ivmesi", barDir: "col", barGapWidthPct: 55, varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontFace: F.body,
    dataLabelFontSize: 10, dataLabelColor: C.muted,
    catAxisTitle: "", valAxisTitle: "m/s²", valAxisMaxVal: 28 } }),
  { x: M, y: 1.95, w: 6.4, h: 4.4 }));
T.card(s, { x: M + 6.85, y: 1.95, w: CW - 6.85, h: 4.4 });
s.addText("10 m'den düşme süresi", { x: M + 7.2, y: 2.2, w: 4.3, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
[["Ay", "3,51 s", C.violet], ["Mars", "2,32 s", C.rose],
 ["Dünya", "1,43 s", C.lime], ["Jüpiter", "0,90 s", C.amber]].forEach((r, i) => {
  const y = 2.75 + i * 0.72;
  s.addShape("roundRect", { x: M + 7.2, y: y, w: 4.3, h: 0.58, rectRadius: 0.08,
    fill: { color: i % 2 ? C.softer : C.white }, line: { color: C.line, width: 1 } });
  s.addText(r[0], { x: M + 7.45, y: y, w: 2, h: 0.58, valign: "middle", fontFace: F.body,
    fontSize: 13.5, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.0, y: y, w: 2.25, h: 0.58, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 14, bold: true, color: r[2], isTextBox: true, margin: 0 });
});
T.body(s, "Ay'da düşüş, Dünya'dakinden yaklaşık 2,5 kat uzun sürer: √(9,81 / 1,62) ≈ 2,46.",
  { x: M + 7.2, y: 5.75, w: 4.3, h: 0.5, size: 12.5 });
T.footer(s, FOOT, 10);
s.addNotes("Süre g'nin kareköküyle ters orantılı. Jüpiter'de g 15 kat büyük ama süre yalnızca ~4 kat kısa; kökü vurgula.");

/* ---------- 11 ve 12 · örnekler ---------- */
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
  adimlar.forEach((a, i) => {
    const y = 1.95 + i * ((4.45 - (adimlar.length - 1) * 0.25) / adimlar.length + 0.25);
    const h = (4.45 - (adimlar.length - 1) * 0.25) / adimlar.length;
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

ornek(10, "Çözümlü örnek · 45 metre",
  "45 m yükseklikten serbest bırakılan bir cisim için:\n\n" +
  "(a) düşme süresini,\n(b) yere çarpma hızını,\n" +
  "(c) hareketin 2. saniyesinde aldığı yolu bulunuz.",
  "t = 3 s · v = 30 m/s · 15 m",
  [["a", "h = ½·g·t²  →  45 = 5·t²  →  t² = 9  →  t = 3 s"],
   ["b", "v = g·t = 10 · 3 = 30 m/s\nKontrol: v² = 2gh = 2·10·45 = 900  →  v = 30 m/s ✓"],
   ["c", "İlk 2 s'de 20 m, ilk 1 s'de 5 m alınır; fark 15 m.\n1 : 3 : 5 kuralıyla da 2. saniyenin payı 3h = 3·5 = 15 m."]],
  "Üç şıkkı üç farklı bağıntıyla çözdük. (c) şıkkında iki yolu da göster: fark alma ve tek sayılar kuralı.",
  11, C.blue);

ornek(11, "Çözümlü örnek · son 1 saniye",
  "Serbest bırakılan bir cisim, yere çarpmadan önceki son 1 saniyede 25 m yol alıyor.\n\n" +
  "Cisim kaç metreden bırakılmıştır?",
  "h = 45 m",
  [["1", "Toplam süreye t diyelim: h(t) − h(t−1) = 25 m"],
   ["2", "5t² − 5(t−1)² = 25  →  5(2t − 1) = 25  →  2t − 1 = 5  →  t = 3 s"],
   ["3", "h = 5 · 3² = 45 m"],
   ["4", "Kısa yol: 1 : 3 : 5 kuralında son terim 5h = 25 m ise h = 5 m,\ntoplam (1+3+5)·5 = 45 m."]],
  "Bu soru tipi her yıl çıkıyor. Kısa yolu ezberletme, nereden geldiğini 7. slayttaki çubuklarla bağla.",
  12, C.violet);

/* ---------- 13 · hatalar ---------- */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
const HATA = [
  ["Ağır cisim önce düşer", "Hava direnci ihmal edildiğinde kütle hiç rol oynamaz."],
  ["Tepe noktada ivme sıfırdır", "Sıfır olan hızdır; ivme orada da g'dir."],
  ["v = 2gh", "Doğrusu v² = 2gh; karekök almayı unutma."],
  ["İlk hızlı hareket de serbest düşmedir", "v₀ ≠ 0 ise hareketin adı düşey atıştır."],
  ["1 : 3 : 5 ile 1 : 4 : 9 aynı şey", "Birincisi her aralıkta, ikincisi baştan itibaren toplam yol."],
  ["Yükseklik 2 katına çıkınca süre de 2 katına çıkar", "Süre karekökle artar: 4 kat yükseklik → 2 kat süre."]
];
HATA.forEach((h, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * (5.85 + 0.23), y = 1.95 + row * 1.52;
  T.card(s, { x: x, y: y, w: 5.85, h: 1.35, fill: C.white });
  s.addText("✗", { x: x + 0.25, y: y + 0.18, w: 0.35, h: 0.35, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 15, bold: true, color: C.rose,
    isTextBox: true, margin: 0 });
  s.addText(h[0], { x: x + 0.68, y: y + 0.15, w: 4.9, h: 0.42, valign: "middle",
    fontFace: F.body, fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText("✓", { x: x + 0.25, y: y + 0.68, w: 0.35, h: 0.35, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 15, bold: true, color: C.lime,
    isTextBox: true, margin: 0 });
  s.addText(h[1], { x: x + 0.68, y: y + 0.62, w: 4.9, h: 0.55, valign: "middle",
    fontFace: F.body, fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 13);
s.addNotes("Bu slaytı ders sonunda tekrar aç; öğrencilerden kendi yaptıkları hatayı söylemelerini iste.");

/* ---------- 14 · özet ---------- */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Kütle fark etmez", "Hava direnci yoksa bütün cisimler aynı g ivmesiyle düşer."],
 ["Hız doğrusal, yol karesel", "v = g·t doğrusal artar; h = ½g·t² sürenin karesiyle büyür."],
 ["Eşit sürelerde tek sayılar", "Aralıklarda 1 : 3 : 5, toplamda 1 : 4 : 9."],
 ["İvme hiç değişmez", "Yukarı atışta da, tepe noktada da, inişte de a = g."]
].forEach((k, i) => {
  const y = 2.3 + i * 1.02;
  s.addText(String(i + 1).padStart(2, "0"), { x: M + 0.25, y: y, w: 0.7, h: 0.5,
    fontFace: F.head, fontSize: 19, bold: true, color: C.limeBright, isTextBox: true, margin: 0 });
  s.addText(k[0], { x: M + 1.05, y: y - 0.04, w: 3.6, h: 0.45, fontFace: F.body,
    fontSize: 15.5, bold: true, color: C.white, isTextBox: true, margin: 0, valign: "middle" });
  s.addText(k[1], { x: M + 4.75, y: y - 0.04, w: 6.2, h: 0.62, fontFace: F.body,
    fontSize: 13.5, color: "AEBBD6", isTextBox: true, margin: 0, valign: "middle" });
});
s.addShape("roundRect", { x: M + 0.25, y: 6.35, w: 11.0, h: 0.62, rectRadius: 0.1,
  fill: { color: C.inkSoft }, line: { color: "2C3860", width: 1 } });
s.addText([
  { text: "Etkileşimli ders, canlı grafikler ve cetvel deneyi:  ", options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/serbest-dusme.html", options: { color: C.limeBright, bold: true } }
], { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body,
  fontSize: 13, isTextBox: true, margin: 0 });
s.addNotes("Kapanış: dört maddeyi öğrencilere tekrar ettir, sonra siteyi açıp laboratuvarda yüksekliği değiştirerek süre–yükseklik ilişkisini canlı gösterebilirsin.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/serbest-dusme.pptx" })
  .then(f => console.log("yazıldı:", f));
