const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Düzlem aynalar", "Fizik · Optik");
const FOOT = "Optik · Konu 02 · Düzlem aynalar";

/* 1 · kapak */
let s = B.kapak(p, {
  ust: "OPTİK · KONU 02",
  baslik: "Düzlem aynalar",
  lede: "Aynadaki görüntünüz orada değildir: ışınların uzantılarının kesiştiği yerdedir. " +
    "Tek bir kural — gelme açısı = yansıma açısı — hepsini açıklar.",
  formul: "i = r          d(cisim) = d(görüntü)          n = 360/α − 1",
  link: "dersler.perinet.org/duzlem-aynalar.html",
  not: "Açılışta sor: 'Aynada kendinizi görmek için aynanın boyunuz kadar olması gerekir mi?'"
});
s.addShape("rect", { x: 11.5, y: 2.4, w: 0.16, h: 2.6, fill: { color: "82AAFF" },
  line: { type: "none" } });
s.addShape("line", { x: 9.6, y: 2.9, w: 1.9, h: 0.8, line: { color: "FFE08A", width: 3,
  endArrowType: "triangle" } });
s.addShape("line", { x: 9.6, y: 3.7, w: 1.9, h: 0.8, flipV: true,
  line: { color: "B9EE63", width: 3, beginArrowType: "triangle" } });
s.addShape("line", { x: 11.5, y: 2.6, w: 0, h: 2.2, line: { color: "6A7798", width: 1,
  dashType: "dash" } });
s.addText("i = r", { x: 10.2, y: 5.2, w: 2.6, h: 0.3, align: "center", fontFace: "Courier New",
  fontSize: 13, bold: true, color: "B9EE63", isTextBox: true, margin: 0 });

/* 2 · bu derste */
B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: yansıma yasasından boy aynasına.",
  kartlar: [
    ["Yansıma yasası", "Gelme açısı = yansıma açısı; açılar normalle ölçülür.", C.blue],
    ["Düzgün ve dağınık", "Pürüzsüz yüzey görüntü verir, pürüzlü vermez.", C.violet],
    ["Görüntünün özellikleri", "Sanal, düz, eşit boyda, eşit uzaklıkta.", C.lime],
    ["Hareket ve hız", "Cisim v ile yaklaşırsa aralarındaki hız 2v.", C.amber],
    ["Aynanın dönmesi", "Ayna α dönerse yansıyan ışın 2α döner.", C.rose],
    ["İki ayna", "n = 360/α − 1 görüntü oluşur.", C.blue]
  ],
  not: "Konunun tamamı tek bir yasadan türüyor; her başlıkta i = r'ye geri dön."
});

/* 3 · yansıma yasası */
s = T.light(p);
T.head(s, 2, "Yansıma yasası", C.blue);
T.lede(s, "İki kural, bütün konuyu taşır.");
T.formula(s, "i = r        gelen ışın, yansıyan ışın ve normal aynı düzlemdedir", {
  x: M, y: 1.95, w: CW, h: 0.8, size: 16 });
[["Düzgün (aynasal) yansıma", "Pürüzsüz yüzeyde paralel ışınlar paralel yansır; görüntü oluşur.",
  "ayna, durgun su, cilalı metal", C.lime],
 ["Dağınık yansıma", "Pürüzlü yüzeyde her ışın farklı yöne gider; görüntü oluşmaz ama cisim " +
  "her yönden görünür.", "kâğıt, duvar, kumaş", C.amber]
].forEach((r, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 3.0, w: 5.85, h: 2.1 });
  s.addText(r[0], { x: x + 0.35, y: 3.2, w: 5.1, h: 0.45, fontFace: F.body, fontSize: 15,
    bold: true, color: r[3], isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: x + 0.35, y: 3.72, w: 5.1, h: 0.95, size: 12.5 });
  s.addText(r[2], { x: x + 0.35, y: 4.62, w: 5.1, h: 0.35, fontFace: "Courier New",
    fontSize: 11.5, bold: true, color: r[3], isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.35, w: CW, h: 1.05, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Açılar normalle ölçülür. ", options: { bold: true, color: C.amber } },
  { text: "“Işın yüzeyle 30° açı yapıyor” denirse gelme açısı 30° değil, 60°'dir. " +
    "Her iki yansıma türünde de yasa her ışın için ayrı ayrı geçerlidir.",
    options: { color: C.muted } }],
  { x: M + 0.35, y: 5.35, w: CW - 0.7, h: 1.05, valign: "middle", fontFace: F.body,
    fontSize: 13, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 3);
s.addNotes("Dağınık yansımada da i = r geçerlidir; fark yüzeyin normallerinin farklı yönlere bakmasıdır.");

/* 4 · görüntünün özellikleri */
s = T.light(p);
T.head(s, 3, "Düzlem aynada görüntü", C.violet);
T.lede(s, "Beş özellik ve dört adımlık çizim.");
B.tablo(s, [
  ["Özellik", "Düzlem aynada"],
  ["Türü", "sanal (perdeye düşmez)"],
  ["Yönü", "düz (ters değil)"],
  ["Boyu", "cisimle eşit"],
  ["Yeri", "aynanın arkasında, eşit uzaklıkta"],
  ["Simetri", "sağ–sol yer değiştirmiş görünür"]
], { x: M, y: 1.95, w: 6.4, step: 0.72, size: 12.5,
     cols: [[M + 0.3, 2.0], [M + 2.4, 3.8]] });
T.card(s, { x: M + 6.8, y: 1.95, w: CW - 6.8, h: 4.35, fill: C.softer });
s.addText("Görüntü nasıl çizilir?", { x: M + 7.15, y: 2.2, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.bullets(s, [
  "Cisimden aynaya iki ışın gönder.",
  "Her birini i = r ile yansıt.",
  "Yansıyan ışınları geriye, kesikli uzat.",
  "Uzantıların kesiştiği nokta görüntüdür.",
  "Kısayol: cismin ayna düzlemine göre simetriğini al."],
  { x: M + 7.15, y: 2.75, w: 4.3, h: 3.3, size: 12.5, gap: 13 });
T.footer(s, FOOT, 4);
s.addNotes("Simetri kısayolu hızlıdır ama önce ışın çizimini yaptır; yoksa 'neden' sorusu havada kalır.");

/* 5 · hareket ve dönme */
s = T.light(p);
T.head(s, 4, "Hareket ve aynanın dönmesi", C.amber);
T.lede(s, "Cisim hareket ederse görüntü, ayna dönerse ışın ne yapar?");
const RA = [], RB = [];
for (let i = 0; i <= 45; i++) { RA.push(i); RB.push(2 * i); }
s.addChart(p.ChartType.scatter, [{ name: "α", values: RA }, { name: "dönme", values: RB }],
  Object.assign(T.chartOpts({ colors: [C.rose], extra: {
    title: "Yansıyan ışının dönmesi = 2 × aynanın dönmesi",
    catAxisTitle: "aynanın dönme açısı α (°)", valAxisTitle: "ışının dönmesi (°)",
    valAxisMinVal: 0, valAxisMaxVal: 90 } }),
  { x: M, y: 1.95, w: 6.4, h: 4.45 }));
[["Cisim aynaya v ile yaklaşır", "görüntü de v ile yaklaşır", "aralarındaki hız 2v", C.blue],
 ["Cisim aynaya paralel gider", "görüntü aynı yönde, aynı hızla", "bağıl hız 0", C.violet],
 ["Ayna cisme v ile yaklaşır", "görüntü 2v ile yaklaşır", "ayna hareketi iki katı", C.lime],
 ["Ayna α kadar döner", "yansıyan ışın 2α döner", "hassas ölçümde kullanılır", C.rose]
].forEach((r, i) => {
  const y = 1.95 + i * 1.14;
  T.card(s, { x: M + 6.75, y: y, w: CW - 6.75, h: 1.0 });
  s.addText(r[0], { x: M + 7.05, y: y + 0.08, w: 4.4, h: 0.36, fontFace: F.body, fontSize: 12.5,
    bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 7.05, y: y + 0.44, w: 4.4, h: 0.32, fontFace: F.body, fontSize: 12,
    color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 7.05, y: y + 0.72, w: 4.4, h: 0.26, fontFace: "Courier New",
    fontSize: 10.5, bold: true, color: r[3], isTextBox: true, margin: 0 });
});
T.footer(s, FOOT, 5);
s.addNotes("2α sonucu şaşırtıcı gelir; tahtada normalin de α döndüğünü çizerek göster.");

/* 6 · iki ayna */
s = T.light(p);
T.head(s, 5, "İki ayna arasındaki görüntüler", C.lime);
T.lede(s, "Görüntüler bir çember üzerinde eşit aralıklarla dizilir.");
T.formula(s, "n = 360 / α − 1", { x: M, y: 1.95, w: 6.4, h: 0.8, size: 18,
  fill: "EAF7DC", color: C.lime });
B.tablo(s, [
  ["Aynalar arası açı", "360 / α", "Görüntü sayısı"],
  ["180°", "2", "1"],
  ["120°", "3", "2"],
  ["90°", "4", "3"],
  ["60°", "6", "5"],
  ["45°", "8", "7"],
  ["30°", "12", "11"]
], { x: M, y: 2.9, w: 6.4, step: 0.545, size: 12.5, mono: true,
     cols: [[M + 0.3, 2.6], [M + 3.0, 1.6], [M + 4.7, 1.6]] });
T.card(s, { x: M + 6.8, y: 1.95, w: CW - 6.8, h: 2.2, fill: C.softer });
s.addText("Neden bir eksik?", { x: M + 7.15, y: 2.15, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Cisim ve görüntüleri toplam 360/α noktadır. Bunlardan biri cismin kendisi " +
  "olduğu için görüntü sayısı bir eksiktir.", { x: M + 7.15, y: 2.6, w: 4.3, h: 1.3, size: 12.5 });
T.card(s, { x: M + 6.8, y: 4.35, w: CW - 6.8, h: 2.0, fill: "FCECF0", line: "F3C9D4" });
s.addText("Özel durumlar", { x: M + 7.15, y: 4.55, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.rose, isTextBox: true, margin: 0 });
T.body(s, "α = 0° (paralel aynalar): sonsuz görüntü — berber aynası.\n\n" +
  "360/α tam bölünmezse görüntü sayısı bölümün tam kısmıdır; 360/α tek sayı çıkarsa cismin " +
  "açıortay üzerinde olup olmaması sonucu değiştirir.",
  { x: M + 7.15, y: 5.0, w: 4.3, h: 1.2, size: 12 });
T.footer(s, FOOT, 6);
s.addNotes("Berber aynası örneği sınıfta hemen karşılık buluyor: iki paralel ayna arası sonsuz görüntü.");

/* 7 · boy aynası */
s = T.light(p);
T.head(s, 6, "Boy aynası: yarısı yeter", C.blue);
T.lede(s, "Kendini tepeden tırnağa görmek için gereken en küçük ayna.");
T.formula(s, "L = h / 2        alt kenar = göz yüksekliği / 2        uzaklıktan bağımsız", {
  x: M, y: 1.95, w: CW, h: 0.8, size: 15 });
[["Neden yarısı?", "Başın tepesinden gelen ışın, göz ile tepe arasının ortasından yansır; " +
  "ayaktan gelen ışın da göz ile ayak arasının ortasından. Aradaki mesafe boyun yarısıdır."],
 ["Neden uzaklık etkilemez?", "Uzaklaştıkça ışınların aynaya çarptığı noktalar da " +
  "aynı oranda yakınlaşır; iki etki birbirini götürür."],
 ["Nereye asılmalı?", "Aynanın alt kenarı, göz yüksekliğinin yarısında olmalıdır. " +
  "170 cm boy ve 160 cm göz yüksekliği için: 85 cm'lik ayna, alt kenarı 80 cm'de."]
].forEach((r, i) => {
  const y = 3.0 + i * 1.18;
  T.card(s, { x: M, y: y, w: CW, h: 1.05 });
  s.addText(r[0], { x: M + 0.35, y: y, w: 2.7, h: 1.05, valign: "middle", fontFace: F.body,
    fontSize: 13.5, bold: true, color: C.blue, isTextBox: true, margin: 0 });
  T.body(s, r[1], { x: M + 3.2, y: y + 0.16, w: CW - 3.6, h: 0.8, size: 12.5 });
});
T.footer(s, FOOT, 7);
s.addNotes("Sınıfta deneyin: bir öğrenciyi aynaya yaklaştırıp uzaklaştırın, gördüğü alan değişmiyor.");

/* 8–10 · örnekler */
B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.blue,
  baslik: "Çözümlü örnek · yüzeyle yapılan açı",
  lede: "Açılar normalle ölçülür.",
  soru: "Bir ışın düzlem aynanın yüzeyiyle 25° açı yapacak şekilde geliyor.\n\n" +
    "Gelme açısı, yansıma açısı ve iki ışın arasındaki açı kaç derecedir?",
  cevap: "65° · 65° · 130°",
  adimlar: [
    ["1", "Gelme açısı normalle ölçülür: i = 90° − 25° = 65°"],
    ["2", "Yansıma açısı: r = i = 65°"],
    ["3", "Gelen ve yansıyan ışın arasındaki açı: i + r = 130°"],
    ["!", "Işın yüzeye dik gelseydi (i = 0) geldiği yoldan geri dönerdi."]],
  not: "Yüzey–normal karışıklığı bu konuda en çok puan kaybettiren ayrıntı." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.rose,
  baslik: "Çözümlü örnek · aynanın dönmesi",
  lede: "Gelen ışın sabittir.",
  soru: "Sabit bir ışın demeti düzlem aynaya düşerken ayna 12° döndürülüyor.\n\n" +
    "Yansıyan ışın kaç derece döner?",
  cevap: "24°",
  adimlar: [
    ["1", "Ayna α = 12° dönerse normal de 12° döner."],
    ["2", "Gelme açısı 12° değişir; yansıma açısı da 12° değişir."],
    ["3", "Yansıyan ışının dönmesi: 2α = 24°"],
    ["!", "Bu özellik, küçük dönmeleri iki katına büyüterek ölçen aletlerde kullanılır."]],
  not: "Ölçüm aleti bağlantısı (galvanometre aynası) konuyu gerçek dünyaya bağlıyor." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.lime,
  baslik: "Çözümlü örnek · boy aynası ve iki ayna",
  lede: "İki klasik hesap bir arada.",
  soru: "(a) Boyu 180 cm, göz yüksekliği 170 cm olan kişi için gereken ayna boyu ve " +
    "alt kenarın yerden yüksekliği nedir?\n\n" +
    "(b) Aralarında 40° açı bulunan iki ayna arasındaki cismin kaç görüntüsü oluşur?",
  cevap: "(a) 90 cm · 85 cm — (b) 8",
  adimlar: [
    ["a", "Ayna boyu = h/2 = 180/2 = 90 cm"],
    ["2", "Alt kenar = göz yüksekliği / 2 = 170/2 = 85 cm"],
    ["b", "360/40 = 9 → n = 9 − 1 = 8 görüntü"],
    ["!", "Kişinin aynaya uzaklığı (a) şıkkındaki sonuçları değiştirmez."]],
  not: "İki klasik soru tipini bir slaytta toplamak tekrar için elverişli." });

/* 11 · hatalar */
B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["Açıyı yüzeyle ölçmek", "Gelme ve yansıma açıları normalle ölçülür."],
  ["Görüntüyü gerçek sanmak", "Düzlem aynada görüntü sanaldır; perdeye düşmez."],
  ["Ayna α dönünce ışın α döner", "Yansıyan ışın 2α döner."],
  ["Boy aynasında uzaklığın etkisi var", "Gereken boy h/2'dir; uzaklıktan bağımsızdır."],
  ["360/α'yı görüntü sayısı sanmak", "Bu sayı cismi de içerir; görüntü bir eksiktir."],
  ["Ayna altı üstü ters çevirir", "Ayna önü arkayı ters çevirir; sağ–sol izlenimi bunun sonucudur."]
], not: "Son madde tartışma açar; birkaç dakika ayırmaya değer." });

/* 12 · özet */
B.ozet(p, {
  maddeler: [
    ["Tek yasa: i = r", "Açılar normalle ölçülür; gelen, yansıyan ve normal aynı düzlemdedir."],
    ["Görüntü sanal ve simetriktir", "Aynanın arkasında, eşit uzaklıkta, eşit boyda ve düz."],
    ["Dönmede iki kat", "Ayna α dönerse yansıyan ışın 2α döner."],
    ["Sayılar bağıntıyla gelir", "Ayna boyu h/2; iki aynada n = 360/α − 1."]],
  linkMetin: "Yansıma laboratuvarı, iki ayna ve boy aynası:",
  link: "dersler.perinet.org/duzlem-aynalar.html",
  not: "Kapanışta iki ayna bölümünü aç; açıyı değiştirip görüntü sayısını sınıfa saydır."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/duzlem-aynalar.pptx" })
  .then(f => console.log("yazıldı:", f));
