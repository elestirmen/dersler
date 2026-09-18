const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "Sürtünme kuvveti", "Fizik · Kuvvet ve Hareket");
const FOOT = "Kuvvet ve Hareket · Konu 04 · Sürtünme kuvveti";
const CW = W - M * 2;

/* 1 · kapak */
let s = T.dark(p);
s.addText("KUVVET VE HAREKET · KONU 04", { x: 0.95, y: 1.7, w: 7, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0 });
s.addText("Sürtünme kuvveti", { x: 0.9, y: 2.1, w: 8.4, h: 1.3, fontFace: F.head, fontSize: 48,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
s.addText("Dokunan her iki yüzey arasında, kaymaya karşı koyan bir kuvvet doğar. " +
  "Cisim dururken sana ayak uydurur; bir eşiği aştığında sabitlenir ve cisim kaymaya başlar.", {
  x: 0.95, y: 3.6, w: 7.1, h: 1.1, fontFace: F.body, fontSize: 15.5, color: "C3CEE8",
  lineSpacingMultiple: 1.25, isTextBox: true, margin: 0 });
s.addText("f(statik) ≤ μs · N        f(kinetik) = μk · N        tanθ = μs", {
  x: 0.95, y: 5.0, w: 7.6, h: 0.5, fontFace: "Courier New", fontSize: 13.5, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0 });
/* kutu + oklar motifi */
s.addShape("roundRect", { x: 10.4, y: 3.3, w: 1.5, h: 1.0, rectRadius: 0.1,
  fill: { color: "1E2A4D" }, line: { color: C.limeBright, width: 1.5 } });
s.addShape("line", { x: 11.9, y: 3.8, w: 0.95, h: 0,
  line: { color: "82AAFF", width: 2.5, endArrowType: "triangle" } });
s.addShape("line", { x: 9.55, y: 3.8, w: 0.85, h: 0, flipH: true,
  line: { color: "FF8FA3", width: 2.5, endArrowType: "triangle" } });
s.addText("F", { x: 12.0, y: 3.35, w: 0.6, h: 0.3, fontFace: F.body, fontSize: 12, bold: true,
  color: "82AAFF", isTextBox: true, margin: 0 });
s.addText("f", { x: 9.4, y: 3.35, w: 0.6, h: 0.3, align: "right", fontFace: F.body, fontSize: 12,
  bold: true, color: "FF8FA3", isTextBox: true, margin: 0 });
s.addShape("line", { x: 9.4, y: 4.45, w: 3.1, h: 0, line: { color: "3D4C74", width: 2 } });
T.footer(s, "dersler.perinet.org/surtunme-kuvveti.html", null, true);
s.addNotes("Açılış: 'Masadaki kitabı iterken neden önce hiç kımıldamıyor, sonra birden kayıyor?' Bu dersin tamamı bu sorunun cevabı.");

/* 2 · bu derste */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: tanımdan fren mesafesine.");
[["Sürtünme nedir", "Yüzeyler arası, bağıl kaymaya zıt kuvvet.", C.blue],
 ["Statik sürtünme", "Uygulanan kuvvete eşit büyür, bir eşiği aşamaz.", C.violet],
 ["Kinetik sürtünme", "Kayma başlayınca sabitlenir, genelde daha küçüktür.", C.lime],
 ["Neye bağlı?", "N ve yüzey çiftine; alana ve hıza değil.", C.amber],
 ["Eğik düzlem", "Kayma açısı doğrudan μs'yi verir.", C.rose],
 ["Fren mesafesi", "Hızın karesiyle büyür; trafikte hayat kurtarır.", C.blue]
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
s.addNotes("Sürtünme, Newton yasalarının hemen ardından gelir: serbest cisim diyagramındaki dördüncü ok.");

/* 3 · sürtünme nedir */
s = T.light(p);
T.head(s, 2, "Sürtünme kuvveti nedir?", C.blue);
T.lede(s, "Birbirine değen yüzeyler arasında, bağıl kaymaya zıt yönde ortaya çıkan kuvvet.");
T.card(s, { x: M, y: 1.95, w: 7.2, h: 2.1, fill: C.softer });
T.body(s, "Yüzeyler çıplak gözle pürüzsüz görünse bile mikroskobik ölçekte girinti çıkıntılıdır. " +
  "Temas noktalarındaki kenetlenme ve moleküler yapışma sürtünmeyi doğurur.", {
  x: M + 0.35, y: 2.2, w: 6.5, h: 1.5, size: 14 });
[["Yüzeye paraleldir", "normal kuvvet yüzeye dik, sürtünme yüzeye paraleldir", C.lime],
 ["Kaymaya zıttır", "harekete değil, bağıl kaymaya ters yöndedir", C.rose]].forEach((k, i) => {
  const y = 4.3 + i * 1.1;
  T.card(s, { x: M, y: y, w: 7.2, h: 0.95 });
  s.addText(k[0], { x: M + 0.35, y: y, w: 2.6, h: 0.95, valign: "middle", fontFace: F.body,
    fontSize: 14, bold: true, color: k[2], isTextBox: true, margin: 0 });
  s.addText(k[1], { x: M + 3.0, y: y, w: 4.0, h: 0.95, valign: "middle", fontFace: F.body,
    fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.6, y: 1.95, w: CW - 7.6, h: 4.45, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Sürtünme hep kötü değildir", { x: M + 7.95, y: 2.2, w: 3.5, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "Yürürken ayağın yeri geriye itmeye çalışır; sürtünme de seni ileriye iter. " +
  "Yani burada sürtünme hareketi engellemez, hareketi mümkün kılar.\n\n" +
  "Frenleme, virajı dönme, vidanın tutması, elimizle bir şey kavramak — hepsi sürtünme sayesinde.", {
  x: M + 7.95, y: 2.7, w: 3.4, h: 3.4, size: 13 });
T.footer(s, FOOT, 3);
s.addNotes("Yön kuralını vurgula: 'harekete zıt' demek yanlış, 'bağıl kaymaya zıt' demek doğru. Yürüme örneği bunu kanıtlar.");

/* 4 · statik sürtünme */
s = T.light(p);
T.head(s, 3, "Statik sürtünme: eşiğe kadar dengeler", C.violet);
T.lede(s, "Sabit bir değeri yoktur: uygulanan kuvvet ne kadarsa, o kadar büyür.");
T.formula(s, "f(statik) = F(uygulanan)        f(statik) ≤ μs · N", { x: M, y: 1.95, w: CW, h: 0.8,
  size: 16, fill: "F1EDFB", color: C.violet });
[["10 N itersen", "10 N sürtünme", "cisim durur"],
 ["30 N itersen", "30 N sürtünme", "cisim yine durur"],
 ["Eşik: μs·N = 50 N", "50 N sürtünme", "kayma sınırı"],
 ["60 N itersen", "kinetik: μk·N", "cisim kayar"]].forEach((r, i) => {
  const y = 3.0 + i * 0.82;
  T.card(s, { x: M, y: y, w: 7.4, h: 0.72, fill: i === 3 ? "FDF4E3" : (i % 2 ? C.white : C.softer),
    line: i === 3 ? "F0DCB4" : C.line });
  s.addText(r[0], { x: M + 0.3, y: y, w: 2.6, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 3.0, y: y, w: 2.3, h: 0.72, valign: "middle", fontFace: "Courier New",
    fontSize: 12.5, color: i === 3 ? C.amber : C.violet, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 5.4, y: y, w: 1.9, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.8, y: 3.0, w: CW - 7.8, h: 3.36, fill: C.softer });
s.addText("Neden böyle?", { x: M + 8.15, y: 3.25, w: 3.4, h: 0.4, fontFace: F.body, fontSize: 15,
  bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Cisim hareket etmiyorsa ivmesi sıfırdır; Newton'un 2. yasası gereği net kuvvet de " +
  "sıfır olmalıdır. Sürtünme, uygulanan kuvveti dengelemek için tam gerektiği kadar ortaya çıkar.\n\n" +
  "Ama sınırsız değildir: μs·N değerini aşamaz.", {
  x: M + 8.15, y: 3.75, w: 3.3, h: 2.4, size: 13 });
T.footer(s, FOOT, 4);
s.addNotes("Tabloyu satır satır oku. Öğrencilerin çoğu f = μN'yi her duruma uygular; bu slayt tam olarak o hatayı hedefler.");

/* 5 · kinetik + grafik */
s = T.light(p);
T.head(s, 4, "Kinetik sürtünme ve f – F grafiği", C.lime);
T.lede(s, "Kayma başladığı anda sürtünme sabitlenir ve genellikle eşikten küçüktür.");
const UX = [], UY = [];
for (let i = 0; i <= 60; i++) { UX.push(i); UY.push(i <= 30 ? i : 24); }
s.addChart(p.ChartType.scatter, [{ name: "F", values: UX }, { name: "f", values: UY }],
  Object.assign(T.chartOpts({ colors: [C.rose], extra: {
    title: "Sürtünme kuvvetinin uygulanan kuvvete göre değişimi",
    catAxisTitle: "uygulanan kuvvet (N)", valAxisTitle: "sürtünme (N)",
    valAxisMinVal: 0, lineSmooth: false } }),
  { x: M, y: 1.95, w: 7.0, h: 4.45 }));
T.formula(s, "f(kinetik) = μk · N", { x: M + 7.35, y: 1.95, w: CW - 7.35, h: 0.65, size: 14,
  fill: "EAF7DC", color: C.lime });
T.body(s, "Kinetik sürtünme uygulanan kuvvetten bağımsızdır ve (yaklaşık olarak) hıza da bağlı " +
  "değildir. Grafikteki yatay bölüm bunu gösterir.", {
  x: M + 7.35, y: 2.75, w: 4.2, h: 1.1, size: 13 });
T.card(s, { x: M + 7.35, y: 3.95, w: CW - 7.35, h: 2.45, fill: C.softer });
s.addText("μk < μs", { x: M + 7.7, y: 4.2, w: 3.5, h: 0.4, fontFace: F.body, fontSize: 15,
  bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Bu yüzden ağır bir dolabı yerinden oynatmak, oynadıktan sonra itmeye devam etmekten " +
  "zordur. Grafikte eşikte görülen ani düşüş tam olarak budur.", {
  x: M + 7.7, y: 4.7, w: 3.4, h: 1.5, size: 13 });
T.footer(s, FOOT, 5);
s.addNotes("Bu grafik konunun amblemi. Kırılma noktasından önce doğru 45°'lik; sonrası yatay. Öğrenciye 'F = 20 N iken f kaç?' diye sordur.");

/* 6 · neye bağlı */
s = T.light(p);
T.head(s, 5, "Neye bağlı, neye bağlı değil?", C.amber);
T.lede(s, "Sürtünme katsayısı tek bir cismin değil, iki yüzeyin ortak özelliğidir.");
T.card(s, { x: M, y: 1.95, w: 5.6, h: 2.0, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Bağlıdır", { x: M + 0.35, y: 2.15, w: 4.9, h: 0.4, fontFace: F.body, fontSize: 15.5,
  bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.bullets(s, ["Normal kuvvete (N)", "Yüzey çiftine (μ)"],
  { x: M + 0.35, y: 2.62, w: 4.9, h: 1.2, size: 13.5, gap: 8 });
T.card(s, { x: M + 6.0, y: 1.95, w: CW - 6.0, h: 2.0, fill: "FBE9EE", line: "F2C9D4" });
s.addText("Bağlı değildir", { x: M + 6.35, y: 2.15, w: 4.9, h: 0.4, fontFace: F.body,
  fontSize: 15.5, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.bullets(s, ["Temas alanına", "Kayma hızına (yaklaşık)"],
  { x: M + 6.35, y: 2.62, w: 4.9, h: 1.2, size: 13.5, gap: 8 });
const ROWS = [["Yüzey çifti", "μs", "μk"], ["Buz – çelik", "0,10", "0,03"],
  ["Ahşap – ahşap", "0,50", "0,35"], ["Çelik – çelik", "0,70", "0,60"],
  ["Lastik – kuru asfalt", "0,90", "0,70"]];
ROWS.forEach((r, i) => {
  const y = 4.2 + i * 0.44;
  if (i > 0) {
    s.addShape("roundRect", { x: M, y: y, w: 7.4, h: 0.4, rectRadius: 0.06,
      fill: { color: i % 2 ? C.white : C.softer }, line: { color: C.line, width: 1 } });
  }
  [[M + 0.3, 3.4], [M + 4.0, 1.4], [M + 5.6, 1.4]].forEach((c, j) => {
    s.addText(r[j], { x: c[0], y: y, w: c[1], h: 0.4, valign: "middle",
      fontFace: i === 0 ? F.body : (j === 0 ? F.body : "Courier New"),
      fontSize: i === 0 ? 10.5 : 12, bold: i === 0 || j === 0,
      color: i === 0 ? C.dim : (j === 0 ? C.ink : C.muted), charSpacing: i === 0 ? 1 : 0,
      isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M + 7.8, y: 4.2, w: CW - 7.8, h: 2.2, fill: C.softer });
T.body(s, "Aynı kütleli bir tuğlayı yan yatırmak sürtünmeyi değiştirmez: alan büyüdükçe birim " +
  "alana düşen basınç azalır, toplam sürtünme aynı kalır.\n\nHızla belirgin biçimde artan kuvvet " +
  "sürtünme değil, hava direncidir (Konu 05).", { x: M + 8.15, y: 4.45, w: 3.3, h: 1.8, size: 12.5 });
T.footer(s, FOOT, 6);
s.addNotes("μ'nün birimsiz olduğunu ve iki yüzeyin ortak özelliği olduğunu vurgula. 'Ahşabın sürtünme katsayısı' demek eksik bir ifadedir.");

/* 7 · eğik düzlem */
s = T.light(p);
T.head(s, 6, "Eğik düzlem: açıyı ölçmek, μ'yü ölçmektir", C.rose);
T.lede(s, "Eğim arttıkça paralel bileşen büyür, dik bileşen küçülür.");
T.card(s, { x: M, y: 1.95, w: 5.4, h: 4.45, fill: C.softer });
const SX = M + 0.7, SY = 5.55, SL = 4.0, SH = 2.2;
s.addShape("line", { x: SX, y: SY, w: SL, h: 0, line: { color: C.line, width: 2 } });
s.addShape("line", { x: SX, y: SY - SH, w: 0, h: SH, line: { color: C.line, width: 2 } });
s.addShape("line", { x: SX, y: SY - SH, w: SL, h: SH, line: { color: C.dim, width: 2 } });
s.addShape("roundRect", { x: SX + 1.55, y: SY - 1.25, w: 0.62, h: 0.42, rectRadius: 0.06,
  fill: { color: "C9D8F5" }, line: { color: C.blue, width: 1.2 }, rotate: 29 });
s.addShape("line", { x: SX + 1.86, y: SY - 0.95, w: 0, h: 0.95,
  line: { color: C.violet, width: 2.5, endArrowType: "triangle" } });
s.addText("θ", { x: SX + 3.35, y: SY - 0.42, w: 0.3, h: 0.3, fontFace: F.body, fontSize: 14,
  bold: true, color: C.violet, isTextBox: true, margin: 0 });
s.addText("G", { x: SX + 1.62, y: SY + 0.02, w: 0.6, h: 0.3, fontFace: F.body, fontSize: 12,
  bold: true, color: C.violet, isTextBox: true, margin: 0 });
T.formula(s, "tanθ(kritik) = μs", { x: M + 0.45, y: 2.2, w: 4.5, h: 0.7, size: 16,
  fill: "FBE9EE", color: C.rose });
[["F(paralel) = m·g·sinθ", "eğim boyunca aşağı çeken bileşen"],
 ["N = m·g·cosθ", "eğime dik denge"],
 ["f(maks) = μs·m·g·cosθ", "kaymayı engelleyen en büyük kuvvet"],
 ["a = g·(sinθ − μk·cosθ)", "kayma başladıktan sonra"]].forEach((f, i) => {
  const y = 1.95 + i * 1.0;
  T.formula(s, f[0], { x: M + 5.8, y: y, w: 3.5, h: 0.6, size: 12.5 });
  s.addText(f[1], { x: M + 9.45, y: y, w: 2.1, h: 0.6, valign: "middle", fontFace: F.body,
    fontSize: 10.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 5.8, y: 5.95, w: CW - 5.8, h: 0.85, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Kütle bağıntılarda yok: ", options: { bold: true, color: C.ink } },
  { text: "ağır da olsa hafif de olsa aynı açıda kayar.", options: { color: C.muted } }],
  { x: M + 6.15, y: 5.95, w: 5.2, h: 0.85, valign: "middle", fontFace: F.body, fontSize: 12.5,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("Laboratuvarda μ ölçmenin en kolay yolu: eğimi yavaşça artır, kayma açısını ölç, tanjantını al.");

/* 8 · fren mesafesi */
s = T.light(p);
T.head(s, 7, "Fren mesafesi", C.blue);
T.lede(s, "Fren mesafesi hızın karesiyle artar; tepki mesafesi ise hızla doğru orantılıdır.");
const VX = [], D1 = [], D2 = [];
for (let i = 0; i <= 30; i++) {
  const v = i * 5;
  VX.push(v);
  const ms = v / 3.6;
  D1.push(+((ms * ms) / (2 * 0.8 * 9.81)).toFixed(1));
  D2.push(+((ms * ms) / (2 * 0.2 * 9.81)).toFixed(1));
}
s.addChart(p.ChartType.scatter,
  [{ name: "v", values: VX }, { name: "kuru asfalt (μ = 0,8)", values: D1 },
   { name: "karlı yol (μ = 0,2)", values: D2 }],
  Object.assign(T.chartOpts({ colors: [C.blue, C.rose], extra: {
    title: "Fren mesafesinin hıza göre değişimi",
    catAxisTitle: "hız (km/h)", valAxisTitle: "fren mesafesi (m)", valAxisMinVal: 0,
    showLegend: true, legendPos: "b", legendFontFace: F.body, legendFontSize: 11,
    legendColor: C.muted } }),
  { x: M, y: 1.95, w: 7.2, h: 4.45 }));
T.formula(s, "d = v² / (2·μ·g)", { x: M + 7.55, y: 1.95, w: CW - 7.55, h: 0.7, size: 15 });
[["Hız 2 katı", "mesafe 4 katı"], ["μ yarıya iner", "mesafe 2 katı"],
 ["Tepki süresi 1 s", "+ v · 1 s"]].forEach((r, i) => {
  const y = 2.9 + i * 0.85;
  T.card(s, { x: M + 7.55, y: y, w: CW - 7.55, h: 0.72 });
  s.addText(r[0], { x: M + 7.85, y: y, w: 2.0, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 12.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.85, y: y, w: 1.7, h: 0.72, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 12.5, color: C.rose, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.55, y: 5.5, w: CW - 7.55, h: 0.9, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "ABS ", options: { bold: true, color: C.ink } },
  { text: "tekerleği kilitlenme sınırında tutar: daha büyük olan statik sürtünmeden yararlanır.",
    options: { color: C.muted } }],
  { x: M + 7.9, y: 5.5, w: 3.4, h: 0.9, valign: "middle", fontFace: F.body, fontSize: 11.5,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 8);
s.addNotes("Grafikteki iki eğri arasındaki fark, kışlık lastik ve hız sınırı tartışmasının fizik karşılığıdır.");

/* 9 · fayda / zarar */
s = T.light(p);
T.head(s, 8, "Faydaları ve zararları", C.violet);
T.lede(s, "İstemediğimiz yerde azaltırız, istediğimiz yerde artırırız.");
[["Faydalı", C.lime, ["Yürümek ve koşmak", "Fren yapmak, virajı dönmek",
  "Vida, çivi ve düğümün tutması", "Elimizle bir şey kavramak"]],
 ["Zararlı", C.rose, ["Makine parçalarının aşınması", "Isınma ve enerji kaybı",
  "Verimin düşmesi", "Yakıt tüketiminin artması"]]].forEach((g, i) => {
  const x = M + i * 6.1;
  T.card(s, { x: x, y: 1.95, w: 5.8, h: 2.9, fill: i ? "FBE9EE" : "EAF7DC",
    line: i ? "F2C9D4" : "CFE8B2" });
  s.addText(g[0], { x: x + 0.35, y: 2.15, w: 5.1, h: 0.4, fontFace: F.body, fontSize: 15.5,
    bold: true, color: g[1], isTextBox: true, margin: 0 });
  T.bullets(s, g[2], { x: x + 0.35, y: 2.62, w: 5.0, h: 2.0, size: 12.5, gap: 7 });
});
[["Azaltmak için", "yağ · rulman · hava yastığı · cilalı yüzey", C.blue],
 ["Artırmak için", "tırtıklı yüzey · kışlık lastik · reçine · zımpara", C.amber]].forEach((r, i) => {
  const y = 5.1 + i * 0.75;
  T.card(s, { x: M, y: y, w: CW, h: 0.65, fill: C.softer });
  s.addText(r[0], { x: M + 0.3, y: y, w: 2.4, h: 0.65, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: r[2], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 2.8, y: y, w: 8.6, h: 0.65, valign: "middle", fontFace: F.body,
    fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 9);
s.addNotes("Öğrencilerden kendi örneklerini istemek için iyi bir slayt.");

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

ornek(9, "Çözümlü örnek · kutu hareket eder mi?",
  "Yatay zeminde duran 20 kg'lık kutu için μs = 0,5 ve μk = 0,4'tür.\n\n" +
  "(a) 80 N uygulanırsa sürtünme kaç N olur?\n(b) 120 N uygulanırsa ivme ne olur?",
  "(a) 80 N · (b) 2 m/s²",
  [["1", "N = m·g = 200 N → statik eşik μs·N = 100 N"],
   ["a", "80 N < 100 N → kutu hareket etmez, f = 80 N (uygulanan kuvvete eşit), a = 0"],
   ["b", "120 N > 100 N → kayma başlar, f = μk·N = 0,4 · 200 = 80 N"],
   ["2", "a = (120 − 80) / 20 = 2 m/s²"]],
  "Önce eşiği hesapla, sonra karşılaştır. Bu sıra bütün sürtünme problemlerinde aynıdır.",
  10, C.blue);

ornek(10, "Çözümlü örnek · kritik açı",
  "Eğimi yavaşça artırılan bir düzlemde cisim 37°'de kaymaya başlıyor.\n\n" +
  "(a) μs kaçtır?\n(b) μk = 0,5 ise kayarken ivmesi nedir?\n\n(sin37° = 0,6 · cos37° = 0,8)",
  "(a) 0,75 · (b) 2 m/s²",
  [["a", "Kayma sınırında tanθ = μs → μs = 0,6 / 0,8 = 0,75"],
   ["b", "a = g·(sinθ − μk·cosθ) = 10·(0,6 − 0,5·0,8)"],
   ["2", "a = 10 · 0,2 = 2 m/s²"],
   ["3", "Kütle hiçbir adımda kullanılmadı: sonuç kütleden bağımsızdır."]],
  "Bu, laboratuvarda μ ölçme yöntemidir. Öğrenciye 'peki kütleyi iki katına çıkarsak?' diye sor.",
  11, C.rose);

ornek(11, "Çözümlü örnek · fren mesafesi",
  "72 km/h ile giden araç, μ = 0,5 olan yolda fren yapıyor. Tepki süresi 1 s'dir.\n\n" +
  "(a) Toplam durma mesafesi nedir?\n(b) Hız iki katına çıkarsa fren mesafesi ne olur?",
  "(a) 60 m · (b) 160 m",
  [["1", "72 km/h = 20 m/s"],
   ["a", "Tepki: 20 · 1 = 20 m · Fren: v²/(2μg) = 400/10 = 40 m → toplam 60 m"],
   ["b", "v = 40 m/s → fren mesafesi 1600/10 = 160 m"],
   ["2", "Hız 2 katına çıktı, fren mesafesi 4 katına çıktı (v² bağımlılığı)."]],
  "Tepki mesafesi hızla doğru, fren mesafesi hızın karesiyle orantılı. İkisini ayrı hesaplatmak önemli.",
  12, C.amber);

/* 13 · hatalar */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
[["Sürtünme her zaman hareketi engeller", "Bağıl kaymaya zıttır; yürümeyi ve frenlemeyi o sağlar."],
 ["f = μ·N her durumda geçerlidir", "Statikte f uygulanan kuvvete eşittir; μs·N üst sınırdır."],
 ["Temas alanı büyükse sürtünme büyüktür", "Alan bağıntıda yoktur."],
 ["Kinetik sürtünme hızla artar", "Yaklaşık sabittir; hızla artan kuvvet hava direncidir."],
 ["N her zaman m·g'dir", "Eğik düzlemde m·g·cosθ; asansörde de değişir."],
 ["Fren mesafesi hızla orantılıdır", "Hızın karesiyle artar."]].forEach((h, i) => {
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
s.addNotes("İlk iki madde en kritik olanlar; f–F grafiğine dönerek göster.");

/* 14 · özet */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["Statik: eşiğe kadar dengeler", "f uygulanan kuvvete eşittir, μs·N'yi aşamaz."],
 ["Kinetik: sabit ve daha küçük", "Kayma başlayınca f = μk·N olur; μk < μs."],
 ["Alana ve hıza bağlı değil", "Yalnızca normal kuvvete ve yüzey çiftine bağlıdır."],
 ["Kritik açı μ'yü verir", "tanθ = μs; fren mesafesi ise v²/(2μg)."]
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
s.addText([{ text: "Sürtünme laboratuvarı, eğik düzlem ve fren mesafesi deneyi:  ",
  options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/surtunme-kuvveti.html", options: { color: C.limeBright, bold: true } }],
  { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body, fontSize: 13,
    isTextBox: true, margin: 0 });
s.addNotes("Kapanışta siteyi aç: kuvveti yavaşça artırıp kopuş anını canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/surtunme-kuvveti.pptx" })
  .then(f => console.log("yazıldı:", f));
