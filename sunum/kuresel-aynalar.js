const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Küresel aynalar", "Fizik · Optik");
const FOOT = "Optik · Konu 03 · Küresel aynalar";

let s = B.kapak(p, {
  ust: "OPTİK · KONU 03",
  baslik: "Küresel aynalar",
  lede: "Çukur ayna ışığı toplar, tümsek ayna dağıtır. Görüntünün yerini, boyunu ve yönünü " +
    "üç asal ışın ya da tek bir denklem söyler.",
  formul: "f = r / 2          1/f = 1/a + 1/b          m = |b / a|",
  link: "dersler.perinet.org/kuresel-aynalar.html",
  not: "Açılışta çukur kaşığın iç ve dış yüzüne baktır: biri ters, öteki düz görüntü verir."
});
s.addShape("arc", { x: 10.6, y: 2.5, w: 2.2, h: 2.6, line: { color: "82AAFF", width: 5 },
  rotate: 90 });
s.addShape("line", { x: 9.3, y: 3.8, w: 2.4, h: 0, line: { color: "6A7798", width: 1,
  dashType: "dash" } });
s.addShape("ellipse", { x: 10.55, y: 3.68, w: 0.24, h: 0.24, fill: { color: "FF8FA3" },
  line: { type: "none" } });
s.addText("F", { x: 10.4, y: 3.95, w: 0.5, h: 0.3, align: "center", fontFace: F.body,
  fontSize: 11, bold: true, color: "FF8FA3", isTextBox: true, margin: 0 });
s.addText("f = r / 2", { x: 9.6, y: 5.2, w: 3.0, h: 0.3, align: "center",
  fontFace: "Courier New", fontSize: 13, bold: true, color: "B9EE63", isTextBox: true, margin: 0 });

B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: odak noktasından güvenlik aynasına.",
  kartlar: [
    ["Temel kavramlar", "Tepe, merkez, odak ve asal eksen; f = r/2.", C.blue],
    ["Asal ışınlar", "Üç ışından ikisi görüntüyü bulmaya yeter.", C.violet],
    ["Beş cisim konumu", "Merkezin ötesinden odak içine.", C.lime],
    ["Ayna denklemi", "1/f = 1/a + 1/b ve işaret kuralı.", C.amber],
    ["Büyütme", "m = |b/a|; gerçek görüntü ters, sanal düz.", C.rose],
    ["Tümsek ayna", "Her zaman sanal, düz, küçük; geniş görüş.", C.blue]
  ],
  not: "Çizim ve denklem birbirini doğrular; ikisini de her örnekte yan yana kullan."
});

/* 3 · temel kavramlar */
s = T.light(p);
T.head(s, 2, "Temel kavramlar", C.blue);
T.lede(s, "Küresel aynanın haritası.");
[["Tepe noktası (T)", "aynanın orta noktası", C.dim],
 ["Merkez (M)", "aynanın ait olduğu kürenin merkezi", C.violet],
 ["Odak (F)", "tepe ile merkezin tam ortası", C.rose],
 ["Asal eksen", "tepe ile merkezden geçen doğru", C.blue],
 ["Eğrilik yarıçapı (r)", "tepe ile merkez arası uzaklık", C.lime]
].forEach((r, i) => {
  const y = 1.95 + i * 0.88;
  T.card(s, { x: M, y: y, w: 7.1, h: 0.76 });
  s.addText(r[0], { x: M + 0.3, y: y, w: 2.9, h: 0.76, valign: "middle", fontFace: F.body,
    fontSize: 13, bold: true, color: r[2], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 3.3, y: y, w: 3.6, h: 0.76, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.45, y: 1.95, w: CW - 7.45, h: 2.2, fill: "EAF0FD", line: "C7D7F7" });
s.addText("Çukur ayna", { x: M + 7.8, y: 2.15, w: 3.4, h: 0.4, fontFace: F.body, fontSize: 15,
  bold: true, color: C.blue, isTextBox: true, margin: 0 });
T.body(s, "İç yüzeyi yansıtıcıdır. Asal eksene paralel gelen ışınları odakta toplar: " +
  "toplayıcı aynadır. Odak ve merkez aynanın önündedir.",
  { x: M + 7.8, y: 2.6, w: 3.3, h: 1.4, size: 12.5 });
T.card(s, { x: M + 7.45, y: 4.3, w: CW - 7.45, h: 2.1, fill: "FCECF0", line: "F3C9D4" });
s.addText("Tümsek ayna", { x: M + 7.8, y: 4.5, w: 3.4, h: 0.4, fontFace: F.body, fontSize: 15,
  bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "Dış yüzeyi yansıtıcıdır. Işınları dağıtır; uzantıları aynanın arkasındaki odakta " +
  "kesişir. Odak ve merkez aynanın arkasındadır.",
  { x: M + 7.8, y: 4.95, w: 3.3, h: 1.3, size: 12.5 });
T.formula(s, "f = r / 2   ·   çukur aynada f > 0, tümsek aynada f < 0", {
  x: M, y: 6.3, w: 7.1, h: 0.45, size: 12.5 });
T.footer(s, FOOT, 3);
s.addNotes("f = r/2 bağıntısı bu konunun en çok unutulan ayrıntısı; tahtada bir kez türetmeye değer.");

/* 4 · asal ışınlar */
s = T.light(p);
T.head(s, 3, "Asal ışınlar", C.violet);
T.lede(s, "Üç ışından ikisi görüntüyü bulmaya yeter.");
[["1", "Asal eksene paralel gelen ışın", "yansıdıktan sonra odaktan geçer",
  "tümsekte odaktan geliyormuş gibi görünür", C.blue],
 ["2", "Odaktan geçerek gelen ışın", "yansıdıktan sonra asal eksene paralel gider",
  "el fenerinin çalışma ilkesi", C.violet],
 ["3", "Merkezden geçen ışın", "aynaya dik geldiği için kendi üzerinden döner",
  "en kolay çizilen ışın", C.lime]
].forEach((r, i) => {
  const y = 1.95 + i * 1.3;
  T.card(s, { x: M, y: y, w: CW, h: 1.15 });
  s.addShape("ellipse", { x: M + 0.35, y: y + 0.35, w: 0.45, h: 0.45, fill: { color: r[4] },
    line: { type: "none" } });
  s.addText(r[0], { x: M + 0.35, y: y + 0.35, w: 0.45, h: 0.45, align: "center",
    valign: "middle", fontFace: F.body, fontSize: 12, bold: true, color: C.white,
    isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 1.0, y: y + 0.12, w: 3.9, h: 0.45, valign: "middle",
    fontFace: F.body, fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 5.0, y: y + 0.12, w: 4.3, h: 0.45, valign: "middle",
    fontFace: F.body, fontSize: 13, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[3], { x: M + 1.0, y: y + 0.62, w: 8.3, h: 0.4, valign: "middle",
    fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.9, w: CW, h: 0.72, fill: "EAF7DC", line: "CFE8B2" });
s.addText([{ text: "Görüntü nerede? ", options: { bold: true, color: C.lime } },
  { text: "İki ışının kendisi kesişiyorsa görüntü gerçektir ve perdeye düşürülebilir. " +
    "Yalnızca uzantıları kesişiyorsa görüntü sanaldır.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.9, w: CW - 0.7, h: 0.72, valign: "middle", fontFace: F.body,
    fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Üçüncü ışın çizimi kontrol etmek için idealdir: üçü de aynı noktada kesişmeli.");

/* 5 · beş durum */
s = T.light(p);
T.head(s, 4, "Çukur aynada beş cisim konumu", C.lime);
T.lede(s, "Cisim aynaya yaklaştıkça görüntü uzaklaşır ve büyür.");
B.tablo(s, [
  ["Cismin yeri", "Görüntünün yeri", "Türü", "Yönü", "Boyu"],
  ["Merkezin ötesinde", "odak – merkez arası", "gerçek", "ters", "küçük"],
  ["Merkezde", "merkezde", "gerçek", "ters", "eşit"],
  ["Merkez – odak arası", "merkezin ötesinde", "gerçek", "ters", "büyük"],
  ["Odakta", "sonsuzda", "—", "—", "görüntü yok"],
  ["Odak ile tepe arası", "aynanın arkasında", "sanal", "düz", "büyük"]
], { x: M, y: 2.0, w: CW, step: 0.78, size: 12.5,
     cols: [[M + 0.3, 3.1], [M + 3.5, 3.1], [M + 6.7, 1.5], [M + 8.3, 1.3], [M + 9.7, 2.1]] });
T.card(s, { x: M, y: 6.0, w: CW, h: 0.6, fill: C.softer });
s.addText([{ text: "Kural: ", options: { bold: true, color: C.ink } },
  { text: "Gerçek görüntüler her zaman ters, sanal görüntüler her zaman düzdür. " +
    "Bu iki cümle, çizim yapmadan da yönü söyler.", options: { color: C.muted } }],
  { x: M + 0.35, y: 6.0, w: CW - 0.7, h: 0.6, valign: "middle", fontFace: F.body,
    fontSize: 12, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Tabloyu ezberletmek yerine 'cisim yaklaşır → görüntü uzaklaşır ve büyür' kuralını tekrarlat.");

/* 6 · ayna denklemi + grafik */
s = T.light(p);
T.head(s, 5, "Ayna denklemi", C.amber);
T.lede(s, "Çizim olmadan da görüntünün yeri bulunur.");
const AA = [], BB = [];
for (let i = 21; i <= 200; i++) { AA.push(i); BB.push(+((i * 20) / (i - 20)).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "a", values: AA }, { name: "b", values: BB }],
  Object.assign(T.chartOpts({ colors: [C.amber], extra: {
    title: "f = 20 cm olan çukur aynada görüntü uzaklığı",
    catAxisTitle: "cisim uzaklığı a (cm)", valAxisTitle: "görüntü uzaklığı b (cm)",
    valAxisMinVal: 0, valAxisMaxVal: 120 } }),
  { x: M, y: 1.95, w: 6.6, h: 4.45 }));
T.formula(s, "1/f = 1/a + 1/b\nm = |b / a|", { x: M + 6.95, y: 1.95, w: CW - 6.95, h: 0.95,
  size: 14, fill: "FDF4E3", color: C.amber });
T.bullets(s, [
  "Çukur aynada f pozitif, tümsek aynada negatiftir.",
  "b pozitifse görüntü aynanın önünde ve gerçektir.",
  "b negatifse görüntü aynanın arkasında ve sanaldır.",
  "a odak uzaklığına yaklaşınca b sonsuza gider.",
  "a = 2f iken b = 2f ve m = 1 olur."],
  { x: M + 6.95, y: 3.1, w: CW - 6.95, h: 3.2, size: 12.5, gap: 15 });
T.footer(s, FOOT, 6);
s.addNotes("Grafikteki dikey asimptot a = f'dir; öğrenciye 'burada ne oluyor?' diye sor.");

/* 7 · tümsek ayna ve kullanım */
B.kartlar6(p, {
  foot: FOOT, sayfa: 7, no: 6, tone: C.rose, baslik: "Nerede kullanılır?",
  lede: "Çukur ayna toplar, tümsek ayna geniş açı verir.",
  kartlar: [
    ["Diş hekimi aynası", "Çukur ayna; diş odak içinde kalır, büyük ve düz görünür.",
     "çukur · sanal", C.blue],
    ["Makyaj aynası", "Yüz odak içindeyken büyütülmüş düz görüntü verir.", "çukur · sanal", C.violet],
    ["El feneri ve far", "Ampul odağa konur; yansıyan ışınlar paralel çıkar.",
     "çukur · paralel", C.lime],
    ["Güneş fırını", "Paralel gelen güneş ışınları odakta toplanır.", "çukur · gerçek", C.amber],
    ["Araç yan aynası", "Tümsek ayna; görüntü küçük ama görüş alanı geniştir.",
     "tümsek · sanal", C.rose],
    ["Güvenlik aynası", "Market ve otopark köşelerinde geniş alanı tek bakışta gösterir.",
     "tümsek · sanal", C.blue]
  ],
  not: "Yan aynadaki 'cisimler göründüğünden daha yakındır' uyarısını sınıfa sor: neden yazıyor?"
});

B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.blue,
  baslik: "Çözümlü örnek · çukur aynada gerçek görüntü",
  lede: "Önce f = r/2.",
  soru: "Eğrilik yarıçapı 60 cm olan çukur aynanın önüne 45 cm uzaklığa bir cisim konuyor.\n\n" +
    "Görüntünün yerini ve büyütmesini bulunuz.",
  cevap: "b = 90 cm · m = 2 (gerçek, ters)",
  adimlar: [
    ["1", "f = r/2 = 60/2 = 30 cm"],
    ["2", "1/30 = 1/45 + 1/b → 1/b = 1/30 − 1/45 = (3 − 2)/90 = 1/90"],
    ["3", "b = 90 cm; pozitif olduğu için görüntü gerçek ve aynanın önünde."],
    ["4", "m = |b/a| = 90/45 = 2 → görüntü ters ve iki kat büyüktür."]],
  not: "Cisim f ile 2f arasında olduğu için sonucun 'gerçek, ters, büyük' çıkması beklenir." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.violet,
  baslik: "Çözümlü örnek · odağın içinde",
  lede: "Eksi işaret ne anlatır?",
  soru: "Odak uzaklığı 20 cm olan çukur aynanın önüne 10 cm uzaklığa bir cisim konuyor.\n\n" +
    "Görüntü nerede oluşur ve nasıldır?",
  cevap: "b = −20 cm · m = 2 (sanal, düz)",
  adimlar: [
    ["1", "1/20 = 1/10 + 1/b → 1/b = 1/20 − 1/10 = −1/20"],
    ["2", "b = −20 cm: eksi işaret görüntünün aynanın arkasında olduğunu gösterir."],
    ["3", "m = |−20/10| = 2 → düz ve iki kat büyük."],
    ["!", "Makyaj ve tıraş aynaları tam olarak böyle çalışır."]],
  not: "Eksi işaretin 'hata' değil 'bilgi' olduğunu vurgula." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.rose,
  baslik: "Çözümlü örnek · tümsek ayna",
  lede: "Tümsek aynada f negatiftir.",
  soru: "Eğrilik yarıçapı 40 cm olan tümsek aynanın 60 cm önünde bir cisim vardır.\n\n" +
    "Görüntünün yeri ve büyütmesi nedir?",
  cevap: "b = −15 cm · m = 0,25",
  adimlar: [
    ["1", "Tümsek aynada f = −r/2 = −20 cm"],
    ["2", "1/(−20) = 1/60 + 1/b → 1/b = −1/20 − 1/60 = −4/60"],
    ["3", "b = −15 cm → sanal, aynanın arkasında"],
    ["4", "m = |−15/60| = 0,25 → düz ve dörtte bir boyunda."]],
  not: "Tümsek aynada sonucun her zaman sanal-düz-küçük çıkması bir kontrol noktasıdır." });

B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["f = r sanmak", "Odak uzaklığı yarıçapın yarısıdır: f = r/2."],
  ["Tümsek aynada gerçek görüntü aramak", "Tümsek aynada görüntü her zaman sanal, düz, küçüktür."],
  ["Sanal görüntüyü perdeye düşürmek", "Sanal görüntü perdede oluşmaz; yalnızca aynada görülür."],
  ["Eksi işareti hata sanmak", "b < 0, görüntünün aynanın arkasında olduğunu söyler."],
  ["Cisim odaktayken görüntü odakta", "Yansıyan ışınlar paralel olur; görüntü sonsuzdadır."],
  ["Büyütmeyi boy farkı sanmak", "Büyütme bir orandır: görüntü boyu / cisim boyu."]
], not: "Birinci ve dördüncü madde en sık görülenler; sınav öncesi tekrar ettir." });

B.ozet(p, {
  maddeler: [
    ["Odak yarıçapın yarısıdır", "f = r/2; çukurda pozitif, tümsekte negatif."],
    ["İki asal ışın yeter", "Paralel → odaktan; merkezden → kendi üzerinden."],
    ["Tek denklem her şeyi verir", "1/f = 1/a + 1/b ve m = |b/a|."],
    ["Tümsek ayna hep aynı", "Sanal, düz, küçük; ama görüş alanı geniş."]],
  linkMetin: "Işın çizimi laboratuvarı, beş durum ve güvenlik aynası:",
  link: "dersler.perinet.org/kuresel-aynalar.html",
  not: "Kapanışta beş durum turunu oynat: cisim yürürken görüntünün nasıl kaçtığını izlesinler."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/kuresel-aynalar.pptx" })
  .then(f => console.log("yazıldı:", f));
