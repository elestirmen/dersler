const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Mercekler", "Fizik · Optik");
const FOOT = "Optik · Konu 08 · Mercekler";

let s = B.kapak(p, {
  ust: "OPTİK · KONU 08",
  baslik: "Mercekler ve görme",
  lede: "Mercek, ışığı kırarak toplayan ya da dağıtan saydam bir cisimdir. Gözlükten " +
    "mikroskoba, fotoğraf makinesinden gözün kendisine kadar hepsi aynı denklemle çalışır.",
  formul: "1/f = 1/a + 1/b          m = |b / a|          P = 1 / f",
  link: "dersler.perinet.org/mercekler.html",
  not: "Açılışta gözlüğü olan öğrencilere numaralarını sor: eksi mi artı mı, neden?"
});
s.addShape("ellipse", { x: 11.0, y: 2.7, w: 0.75, h: 2.2, fill: { color: "1B2544" },
  line: { color: "82AAFF", width: 2 } });
[3.2, 3.8, 4.4].forEach(y => {
  s.addShape("line", { x: 9.2, y: y, w: 1.9, h: 0, line: { color: "FFE08A", width: 2.2 } });
});
s.addShape("line", { x: 11.7, y: 3.2, w: 1.1, h: 0.6, line: { color: "B9EE63", width: 2.2 } });
s.addShape("line", { x: 11.7, y: 3.8, w: 1.1, h: 0, line: { color: "B9EE63", width: 2.2 } });
s.addShape("line", { x: 11.7, y: 3.8, w: 1.1, h: 0.6, flipV: true,
  line: { color: "B9EE63", width: 2.2 } });
s.addShape("ellipse", { x: 12.72, y: 3.72, w: 0.16, h: 0.16, fill: { color: "FF8FA3" },
  line: { type: "none" } });
s.addText("F", { x: 12.55, y: 3.95, w: 0.5, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 11, bold: true, color: "FF8FA3", isTextBox: true, margin: 0 });

B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: mercek türlerinden göz kusurlarına.",
  kartlar: [
    ["Mercek türleri", "İnce kenarlı toplar, kalın kenarlı dağıtır.", C.blue],
    ["Asal ışınlar", "Paralel, merkezden ve odaktan geçen ışınlar.", C.violet],
    ["Beş cisim konumu", "2f dışından odak içine.", C.lime],
    ["Mercek denklemi", "1/f = 1/a + 1/b ve büyütme.", C.amber],
    ["Mercek gücü", "P = 1/f; birimi diyoptri.", C.rose],
    ["Göz ve kusurları", "Miyop, hipermetrop ve gözlük numarası.", C.blue]
  ],
  not: "Küresel aynalarla aynı denklem; farkı yansıma yerine kırılma olması. Bu bağı kur."
});

/* 3 · mercek türleri */
s = T.light(p);
T.head(s, 2, "Mercek türleri", C.blue);
T.lede(s, "Adı kenarından gelir, davranışı ortasından.");
[["İnce kenarlı (yakınsak)", "Ortası kalın, kenarları incedir. Asal eksene paralel gelen " +
  "ışınları odakta toplar.", "f > 0 · toplayıcı", "büyüteç, gözlük, fotoğraf makinesi", C.lime],
 ["Kalın kenarlı (ıraksak)", "Ortası ince, kenarları kalındır. Işınları dağıtır; uzantıları " +
  "odakta kesişir.", "f < 0 · dağıtıcı", "miyop gözlüğü, kapı dürbünü", C.rose]
].forEach((r, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 1.95, w: 5.85, h: 2.8 });
  s.addText(r[0], { x: x + 0.35, y: 2.15, w: 5.1, h: 0.5, fontFace: F.body, fontSize: 16,
    bold: true, color: r[4], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: x + 0.35, y: 2.7, w: 5.1, h: 1.0, size: 12.5 });
  s.addText(r[2], { x: x + 0.35, y: 3.75, w: 5.1, h: 0.4, fontFace: "Courier New",
    fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[3], { x: x + 0.35, y: 4.15, w: 5.1, h: 0.4, fontFace: F.body, fontSize: 11.5,
    color: C.dim, isTextBox: true, margin: 0 });
});
T.formula(s, "P = 1 / f  (f metre cinsinden)        birimi diyoptri (D)", { x: M, y: 4.95,
  w: CW, h: 0.75, size: 15 });
T.card(s, { x: M, y: 5.9, w: CW, h: 0.7, fill: C.softer });
s.addText([{ text: "Gözlük numarası: ", options: { bold: true, color: C.ink } },
  { text: "Odak uzaklığı 50 cm olan ince kenarlı merceğin gücü +2 diyoptridir. " +
    "Kalın kenarlı merceklerde güç negatiftir.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.9, w: CW - 0.7, h: 0.7, valign: "middle", fontFace: F.body,
    fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 3);
s.addNotes("Diyoptri hesabında f'nin metre olması şart; santimetre kullanan öğrenci 100 kat sapar.");

/* 4 · asal ışınlar */
s = T.light(p);
T.head(s, 3, "Asal ışınlar", C.violet);
T.lede(s, "İnce kenarlı mercekte üç ışından ikisi yeter.");
[["1", "Asal eksene paralel gelen ışın", "kırıldıktan sonra odaktan geçer", C.blue],
 ["2", "Merkezden geçen ışın", "doğrultusunu korur", C.violet],
 ["3", "Odaktan geçerek gelen ışın", "kırıldıktan sonra eksene paralel gider", C.lime]
].forEach((r, i) => {
  const y = 1.95 + i * 1.22;
  T.card(s, { x: M, y: y, w: 7.3, h: 1.08 });
  s.addShape("ellipse", { x: M + 0.35, y: y + 0.32, w: 0.45, h: 0.45, fill: { color: r[3] },
    line: { type: "none" } });
  s.addText(r[0], { x: M + 0.35, y: y + 0.32, w: 0.45, h: 0.45, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 1.0, y: y, w: 3.0, h: 1.08, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 4.1, y: y, w: 3.0, h: 1.08, valign: "middle", fontFace: F.body,
    fontSize: 12.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.65, y: 1.95, w: CW - 7.65, h: 3.66, fill: "FCECF0", line: "F3C9D4" });
s.addText("Kalın kenarlı mercekte", { x: M + 8.0, y: 2.2, w: 3.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "Paralel gelen ışın, merceğin önündeki odaktan geliyormuş gibi dağılır.\n\n" +
  "Görüntü, bu uzantıların kesişmesiyle oluşur: her zaman sanal, düz ve küçüktür.\n\n" +
  "Merkezden geçen ışın burada da doğrultusunu korur.",
  { x: M + 8.0, y: 2.75, w: 3.3, h: 2.7, size: 12.5 });
T.card(s, { x: M, y: 5.7, w: CW, h: 0.7, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Gerçek mi sanal mı? ", options: { bold: true, color: C.lime } },
  { text: "Işınların kendisi kesişiyorsa gerçek (perdeye düşer), yalnızca uzantıları " +
    "kesişiyorsa sanal görüntü oluşur.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.7, w: CW - 0.7, h: 0.7, valign: "middle", fontFace: F.body,
    fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Merkezden geçen ışın en kolayı; çizime hep ondan başlatmak öğrenciyi rahatlatıyor.");

/* 5 · beş durum */
s = T.light(p);
T.head(s, 4, "İnce kenarlı mercekte beş cisim konumu", C.lime);
T.lede(s, "Her konum bir optik aletin çalışma düzenidir.");
B.tablo(s, [
  ["Cismin yeri", "Görüntünün yeri", "Özellikleri", "Kullanım"],
  ["2f dışında", "f – 2f arası", "gerçek, ters, küçük", "fotoğraf makinesi"],
  ["2f'de", "2f'de", "gerçek, ters, eşit", "fotokopi"],
  ["f – 2f arası", "2f dışında", "gerçek, ters, büyük", "projeksiyon"],
  ["Odakta", "sonsuzda", "görüntü oluşmaz", "projektör"],
  ["Odak içinde", "cisim tarafında", "sanal, düz, büyük", "büyüteç"]
], { x: M, y: 2.0, w: CW, step: 0.78, size: 12.5,
     cols: [[M + 0.3, 2.6], [M + 3.0, 2.7], [M + 5.8, 3.2], [M + 9.1, 2.7]] });
T.card(s, { x: M, y: 6.0, w: CW, h: 0.6, fill: C.softer });
s.addText([{ text: "Projeksiyonda slayt neden ters konur? ", options: { bold: true, color: C.ink } },
  { text: "Cisim f ile 2f arasında olduğu için görüntü ters düşer; slayt ters konarak " +
    "perdede düz görünmesi sağlanır.", options: { color: C.muted } }],
  { x: M + 0.35, y: 6.0, w: CW - 0.7, h: 0.6, valign: "middle", fontFace: F.body,
    fontSize: 12, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Her satırı bir aletle eşleştirmek tabloyu ezber olmaktan çıkarıyor.");

/* 6 · mercek denklemi grafik */
s = T.light(p);
T.head(s, 5, "Mercek denklemi", C.amber);
T.lede(s, "Cisim yaklaştıkça görüntü uzaklaşır ve büyür.");
const AA = [], BB = [], MM = [];
for (let i = 21; i <= 200; i++) {
  AA.push(i);
  BB.push(+((i * 20) / (i - 20)).toFixed(1));
  MM.push(+(20 / (i - 20)).toFixed(2));
}
s.addChart(p.ChartType.scatter, [{ name: "a", values: AA }, { name: "b", values: BB }],
  Object.assign(T.chartOpts({ colors: [C.amber], extra: {
    title: "f = 20 cm olan ince kenarlı mercekte görüntü uzaklığı",
    catAxisTitle: "cisim uzaklığı a (cm)", valAxisTitle: "görüntü uzaklığı b (cm)",
    valAxisMinVal: 0, valAxisMaxVal: 120 } }),
  { x: M, y: 1.95, w: 6.5, h: 4.45 }));
T.formula(s, "1/f = 1/a + 1/b\nm = |b / a|", { x: M + 6.85, y: 1.95, w: CW - 6.85, h: 0.95,
  size: 14, fill: "FDF4E3", color: C.amber });
T.bullets(s, [
  "İnce kenarlıda f pozitif, kalın kenarlıda negatiftir.",
  "b pozitifse görüntü merceğin öbür tarafında ve gerçektir.",
  "b negatifse görüntü cisimle aynı tarafta ve sanaldır.",
  "a = 2f iken b = 2f ve büyütme 1 olur.",
  "a odağa yaklaşınca b sonsuza gider: görüntü oluşmaz."],
  { x: M + 6.85, y: 3.1, w: CW - 6.85, h: 3.2, size: 12.5, gap: 15 });
T.footer(s, FOOT, 6);
s.addNotes("Aynalardaki grafiğin aynısı; iki konu arasındaki simetriyi göstermek için yan yana koy.");

/* 7 · göz */
s = T.light(p);
T.head(s, 6, "Göz ve göz kusurları", C.rose);
T.lede(s, "Görüntü retinaya düşmelidir; düşmezse mercek devreye girer.");
[["Miyop", "Göz çok kırıcıdır ya da göz küresi uzundur; görüntü retinanın ÖNÜNDE oluşur.",
  "uzağı göremez", "kalın kenarlı · eksi numara", C.rose],
 ["Hipermetrop", "Göz yeterince kırıcı değildir; görüntü retinanın ARKASINA düşer.",
  "yakını göremez", "ince kenarlı · artı numara", C.blue]
].forEach((r, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 1.95, w: 5.85, h: 2.5 });
  s.addText(r[0], { x: x + 0.35, y: 2.15, w: 5.1, h: 0.5, fontFace: F.body, fontSize: 16,
    bold: true, color: r[4], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: x + 0.35, y: 2.7, w: 5.1, h: 0.9, size: 12.5 });
  s.addText(r[2], { x: x + 0.35, y: 3.6, w: 2.4, h: 0.4, fontFace: F.body, fontSize: 12.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[3], { x: x + 2.8, y: 3.6, w: 2.65, h: 0.4, align: "right",
    fontFace: "Courier New", fontSize: 11.5, bold: true, color: r[4], isTextBox: true, margin: 0 });
});
T.formula(s, "miyop: P = −1 / d(uzak nokta)        hipermetrop: P = 1/0,25 − 1/d(yakın nokta)", {
  x: M, y: 4.65, w: CW, h: 0.8, size: 14, fill: "FCECF0", color: C.rose });
[["Astigmat", "Kornea küresel değildir; silindirik camla düzeltilir."],
 ["Presbiyopi", "Yaşla birlikte uyum (akomodasyon) yeteneğinin azalmasıdır."]
].forEach((r, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 5.6, w: 5.85, h: 0.8, fill: C.softer });
  s.addText(r[0], { x: x + 0.35, y: 5.6, w: 1.6, h: 0.8, valign: "middle", fontFace: F.body,
    fontSize: 12.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: x + 2.0, y: 5.6, w: 3.5, h: 0.8, valign: "middle", fontFace: F.body,
    fontSize: 11.5, color: C.muted, isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 7);
s.addNotes("Miyop = eksi, hipermetrop = artı eşlemesi sınavda doğrudan soruluyor.");

B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.amber,
  baslik: "Çözümlü örnek · gerçek görüntü",
  lede: "İnce kenarlı mercek.",
  soru: "Odak uzaklığı 20 cm olan ince kenarlı merceğin 30 cm önüne bir cisim konuyor.\n\n" +
    "Görüntünün yeri ve büyütmesi nedir?",
  cevap: "b = 60 cm · m = 2 (gerçek, ters)",
  adimlar: [
    ["1", "1/20 = 1/30 + 1/b → 1/b = 1/20 − 1/30 = (3 − 2)/60 = 1/60"],
    ["2", "b = 60 cm; pozitif olduğu için görüntü gerçek ve merceğin öbür tarafında."],
    ["3", "m = |b/a| = 60/30 = 2 → ters ve iki kat büyük."],
    ["!", "Cisim f ile 2f arasında: projeksiyon düzeni."]],
  not: "Sonucu tabloyla karşılaştır: f–2f arası → 2f dışında, gerçek, ters, büyük ✓" });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.lime,
  baslik: "Çözümlü örnek · büyüteç",
  lede: "Cisim odağın içinde.",
  soru: "Odak uzaklığı 15 cm olan merceğin 10 cm önündeki cismin görüntüsü nasıldır?",
  cevap: "b = −30 cm · m = 3 (sanal, düz)",
  adimlar: [
    ["1", "1/15 = 1/10 + 1/b → 1/b = 1/15 − 1/10 = (2 − 3)/30 = −1/30"],
    ["2", "b = −30 cm: eksi işaret görüntünün cisimle aynı tarafta, yani sanal olduğunu gösterir."],
    ["3", "m = |−30/10| = 3 → düz ve üç kat büyük."],
    ["!", "Büyüteçle okurken gördüğünüz görüntü tam olarak budur."]],
  not: "Büyüteci sınıfa getir: cismi odağın dışına çıkarınca görüntünün ters döndüğünü göster." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.rose,
  baslik: "Çözümlü örnek · kalın kenarlı ve gözlük",
  lede: "İki hesap bir arada.",
  soru: "(a) Odak uzaklığı 20 cm olan kalın kenarlı merceğin 30 cm önündeki cismin görüntüsü " +
    "nerededir?\n\n(b) Uzak noktası 50 cm olan miyop göz için gözlük numarası nedir?",
  cevap: "(a) b = −12 cm, m = 0,4 · (b) −2 diyoptri",
  adimlar: [
    ["a", "Kalın kenarlıda f = −20 cm: 1/(−20) = 1/30 + 1/b → 1/b = −5/60"],
    ["2", "b = −12 cm → sanal; m = 12/30 = 0,4 → düz ve küçük."],
    ["b", "Gözlük, sonsuzdaki cismi uzak noktaya düşürmelidir: f = −50 cm = −0,5 m"],
    ["3", "P = 1/f = −2 diyoptri; eksi numara kalın kenarlı mercek demektir."]],
  not: "Gözlük numarasının işareti ile mercek türü arasındaki bağı burada tekrar vurgula." });

B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["İnce kenarlıyı ince mercek sanmak", "Adı kenarından gelir; ortası kalındır ve toplar."],
  ["Kalın kenarlıda gerçek görüntü aramak", "Görüntü her zaman sanal, düz ve küçüktür."],
  ["Miyopa ince kenarlı cam vermek", "Miyop, kalın kenarlı (eksi numaralı) camla düzeltilir."],
  ["Diyoptriyi santimetreyle hesaplamak", "P = 1/f bağıntısında f metre cinsinden olmalıdır."],
  ["Sanal görüntüyü perdeye düşürmek", "Yalnızca gerçek görüntüler perdeye düşer."],
  ["Cisim odaktayken görüntü oluşur sanmak", "Işınlar paralel çıkar; görüntü sonsuzdadır."]
], not: "Dördüncü madde hesap hatası değil birim hatası; sınavda çok görülüyor." });

B.ozet(p, {
  maddeler: [
    ["Kenarı ince olan toplar", "İnce kenarlı f > 0, kalın kenarlı f < 0."],
    ["İki ışın yeter", "Paralel → odaktan; merkezden geçen → doğrultusunu korur."],
    ["Tek denklem her şeyi verir", "1/f = 1/a + 1/b, m = |b/a|, P = 1/f."],
    ["Göz de bir mercektir", "Miyop kalın kenarlıyla, hipermetrop ince kenarlıyla düzeltilir."]],
  linkMetin: "Işın çizimi laboratuvarı, göz kusurları ve perdeye net görüntü:",
  link: "dersler.perinet.org/mercekler.html",
  not: "Kapanışta 'perdeye net görüntü düşür' bölümünü aç: iki net konumun varlığı sınıfı şaşırtıyor."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/mercekler.pptx" })
  .then(f => console.log("yazıldı:", f));
