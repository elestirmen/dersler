const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Işık şiddeti, ışık akısı ve aydınlanma", "Fizik · Optik");
const FOOT = "Optik · Konu 01 · Işık şiddeti, akı ve aydınlanma";

/* 1 · kapak */
let s = B.kapak(p, {
  ust: "OPTİK · KONU 01",
  baslik: "Işık şiddeti ve aydınlanma",
  lede: "Bir lambanın yaydığı akı, belli bir yöne gönderdiği şiddet ve yüzeyde ölçülen " +
    "aydınlanma üç ayrı büyüklüktür. Aralarındaki bağ, uzaklığın karesidir.",
  formul: "I = Φ / ω          E = Φ / A          E = I · cosθ / d²",
  link: "dersler.perinet.org/isik-siddeti.html",
  not: "Açılışta sor: 'Ampul kutusunda yazan 800 lümen ne demek? Peki masamıza ne kadarı düşüyor?'"
});
s.addShape("ellipse", { x: 11.0, y: 2.6, w: 0.7, h: 0.7, fill: { color: "FFE08A" },
  line: { type: "none" } });
[0, 1, 2, 3, 4, 5, 6, 7].forEach(i => {
  const a = (i / 8) * Math.PI * 2;
  s.addShape("line", { x: 11.35 + Math.cos(a) * 0.5, y: 2.95 + Math.sin(a) * 0.5,
    w: Math.abs(Math.cos(a)) * 0.3 + 0.001, h: Math.abs(Math.sin(a)) * 0.3 + 0.001,
    flipH: Math.cos(a) < 0, flipV: Math.sin(a) < 0,
    line: { color: "FFE08A", width: 2 } });
});
s.addShape("line", { x: 10.2, y: 4.5, w: 2.3, h: 0, line: { color: "6A7798", width: 3 } });
s.addText("E = I / d²", { x: 9.9, y: 4.75, w: 2.9, h: 0.3, align: "center", fontFace: "Courier New",
  fontSize: 12, bold: true, color: "9C8CFF", isTextBox: true, margin: 0 });

/* 2 · bu derste */
B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: kandeladan lükse.",
  kartlar: [
    ["Işık akısı", "Kaynağın yaydığı toplam ışık: lümen.", C.blue],
    ["Işık şiddeti", "Bir yöne gönderilen akı: kandela.", C.violet],
    ["Katı açı", "Steradyan; tüm uzay 4π sr.", C.lime],
    ["Aydınlanma", "Yüzeye düşen akı: lüks.", C.amber],
    ["Ters kare yasası", "E = I/d²; uzaklıkla hızla azalır.", C.rose],
    ["Eğik yüzey", "cosθ çarpanı ve mevsimler.", C.blue]
  ],
  not: "Bu konu ölçü birimleriyle yüklü; her birimin neyin ölçüsü olduğunu tekrar tekrar vurgula."
});

/* 3 · üç büyüklük */
s = T.light(p);
T.head(s, 2, "Üç büyüklük, üç birim", C.blue);
T.lede(s, "Hangisi kaynağın, hangisi yüzeyin özelliği?");
B.tablo(s, [
  ["Büyüklük", "Simge", "Birim", "Tanımı", "Kimin özelliği"],
  ["Işık akısı", "Φ", "lümen (lm)", "birim zamanda yayılan ışık", "kaynağın"],
  ["Işık şiddeti", "I", "kandela (cd)", "birim katı açıya düşen akı", "kaynağın, bir yönde"],
  ["Aydınlanma şiddeti", "E", "lüks (lx)", "birim alana düşen akı", "yüzeyin"]
], { x: M, y: 1.95, w: CW, step: 0.80, size: 12.5,
     cols: [[M + 0.3, 2.5], [M + 2.9, 0.6], [M + 3.6, 1.9], [M + 5.6, 3.4], [M + 9.2, 2.6]] });
T.formula(s, "I = Φ / ω        Φ(toplam) = 4π · I        E = Φ / A = I / d²", {
  x: M, y: 5.2, w: CW, h: 0.75, size: 16 });
T.card(s, { x: M, y: 6.08, w: CW, h: 0.55, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Watt ≠ lümen: ", options: { bold: true, color: C.amber } },
  { text: "watt ampulün çektiği elektrik gücü, lümen yaydığı ışıktır. 10 W'lık LED ile " +
    "60 W'lık akkor ampul aynı akıyı (≈ 800 lm) verir.", options: { color: C.muted } }],
  { x: M + 0.35, y: 6.08, w: CW - 0.7, h: 0.55, valign: "middle", fontFace: F.body,
    fontSize: 11.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 3);
s.addNotes("Tablodaki son sütun en kritik ayrım: aydınlanma kaynağın değil yüzeyin özelliğidir.");

/* 4 · katı açı */
s = T.light(p);
T.head(s, 3, "Katı açı ve steradyan", C.violet);
T.lede(s, "Düzlemde açı radyan ile ölçülür; uzayda katı açı steradyan ile.");
T.formula(s, "ω = A / r²        tüm küre: ω = 4πr²/r² = 4π ≈ 12,57 sr", { x: M, y: 1.95,
  w: CW, h: 0.8, size: 16, fill: "F1EDFB", color: C.violet });
[["Düzlem açı", "θ = yay / yarıçap", "birimi radyan (rad)", "tam çember 2π rad", C.blue],
 ["Katı açı", "ω = alan / yarıçap²", "birimi steradyan (sr)", "tüm uzay 4π sr", C.violet]
].forEach((r, i) => {
  const x = M + i * (5.85 + 0.23);
  T.card(s, { x: x, y: 3.0, w: 5.85, h: 2.0 });
  s.addText(r[0], { x: x + 0.35, y: 3.2, w: 5.1, h: 0.45, fontFace: F.body, fontSize: 16,
    bold: true, color: r[4], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: x + 0.35, y: 3.7, w: 5.1, h: 0.4, fontFace: "Courier New",
    fontSize: 14, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  T.body(s, r[2] + "\n" + r[3], { x: x + 0.35, y: 4.15, w: 5.1, h: 0.75, size: 12.5 });
});
T.card(s, { x: M, y: 5.25, w: CW, h: 1.15, fill: C.softer });
s.addText([{ text: "Örnek: ", options: { bold: true, color: C.ink } },
  { text: "Işık şiddeti 100 cd olan kaynak 0,5 sr'lik koniye 100 · 0,5 = 50 lm akı gönderir; " +
    "her yöne eşit yayıyorsa toplam akısı 4π · 100 ≈ 1256 lm'dir.", options: { color: C.muted } }],
  { x: M + 0.35, y: 5.25, w: CW - 0.7, h: 1.15, valign: "middle", fontFace: F.body,
    fontSize: 13, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 4);
s.addNotes("Katı açı soyut geliyorsa el feneri konisini örnek göster: koni ne kadar darsa katı açı o kadar küçük.");

/* 5 · ters kare */
s = T.light(p);
T.head(s, 4, "Ters kare yasası", C.rose);
T.lede(s, "Aynı akı, uzaklaştıkça daha büyük bir alana yayılır.");
const DD = [], EE = [];
for (let i = 5; i <= 80; i++) { const d = i / 10; DD.push(d); EE.push(+(400 / (d * d)).toFixed(1)); }
s.addChart(p.ChartType.scatter, [{ name: "d", values: DD }, { name: "E", values: EE }],
  Object.assign(T.chartOpts({ colors: [C.rose], extra: {
    title: "I = 400 cd için aydınlanma – uzaklık",
    catAxisTitle: "uzaklık d (m)", valAxisTitle: "E (lüks)", valAxisMinVal: 0,
    valAxisMaxVal: 500 } }),
  { x: M, y: 1.95, w: 6.6, h: 4.45 }));
T.formula(s, "E = Φ / (4π·d²) = I / d²", { x: M + 6.95, y: 1.95, w: CW - 6.95, h: 0.7,
  size: 14, fill: "FCECF0", color: C.rose });
[["d 2 katına çıkarsa", "E dörtte bire iner", C.rose],
 ["d 3 katına çıkarsa", "E dokuzda bire iner", C.violet],
 ["Aynı koni", "1 · 4 · 9 kareyi aydınlatır", C.blue]].forEach((r, i) => {
  const y = 2.85 + i * 0.8;
  T.card(s, { x: M + 6.95, y: y, w: CW - 6.95, h: 0.68, fill: C.softer });
  s.addText(r[0], { x: M + 7.25, y: y, w: 2.5, h: 0.68, valign: "middle", fontFace: F.body,
    fontSize: 12, color: C.muted, isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.7, y: y, w: 2.1, h: 0.68, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 12, bold: true, color: r[2], isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 6.95, y: 5.35, w: CW - 6.95, h: 1.05, fill: "FDF4E3", line: "F0DCB4" });
s.addText([{ text: "Yalnızca noktasal kaynak için. ", options: { bold: true, color: C.amber } },
  { text: "Uzun flüoresan tüpün ya da aydınlatılmış tavanın altında aydınlanma bu kadar hızlı azalmaz.",
    options: { color: C.muted } }],
  { x: M + 7.25, y: 5.35, w: 4.5, h: 1.05, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("Eğrinin başlangıçtaki dikliği önemli: lambayı 50 cm yaklaştırmak masada büyük fark yaratır.");

/* 6 · eğik yüzey */
s = T.light(p);
T.head(s, 5, "Eğik yüzeyler: cosθ", C.amber);
T.lede(s, "Işık yüzeye dik gelmiyorsa aynı akı daha geniş alana yayılır.");
const AA = [], AE = [];
for (let i = 0; i <= 85; i++) { AA.push(i); AE.push(+(100 * Math.cos((i * Math.PI) / 180)).toFixed(2)); }
s.addChart(p.ChartType.scatter, [{ name: "θ", values: AA }, { name: "E", values: AE }],
  Object.assign(T.chartOpts({ colors: [C.amber], extra: {
    title: "I = 400 cd, d = 2 m için aydınlanma – eğim açısı",
    catAxisTitle: "yüzeyin eğim açısı θ (°)", valAxisTitle: "E (lüks)",
    valAxisMinVal: 0, valAxisMaxVal: 120 } }),
  { x: M, y: 1.95, w: 6.6, h: 4.45 }));
T.formula(s, "E = I · cosθ / d²", { x: M + 6.95, y: 1.95, w: CW - 6.95, h: 0.7, size: 16,
  fill: "FDF4E3", color: C.amber });
T.bullets(s, [
  "θ = 0° (dik geliş): E en büyüktür.",
  "θ = 60°: cos60° = 0,5 → aydınlanma yarıya iner.",
  "θ = 90°: ışık yüzeye teğet, E = 0.",
  "Mevsimlerin sebebi de budur: kışın ışınlar yere daha eğik gelir.",
  "Güneş panelleri bu yüzden eğimli monte edilir."],
  { x: M + 6.95, y: 2.9, w: CW - 6.95, h: 3.4, size: 13, gap: 16 });
T.footer(s, FOOT, 6);
s.addNotes("Mevsim bağlantısı bu slaytın en akılda kalıcı kısmı; dünya eksen eğikliğini hatırlat.");

/* 7 · günlük değerler */
s = T.light(p);
T.head(s, 6, "Ne kadar aydınlık yeter?", C.lime);
T.lede(s, "Aydınlatma tasarımı, gereken lüksten başlar.");
B.tablo(s, [
  ["Ortam", "Aydınlanma", "Örnek"],
  ["Dolunaylı gece", "≈ 0,25 lx", "yolu seçebilirsin"],
  ["Sokak aydınlatması", "10 – 20 lx", "yön bulmaya yeter"],
  ["Oturma odası", "100 – 200 lx", "genel aydınlatma"],
  ["Sınıf, ofis, okuma masası", "300 – 500 lx", "okuma ve yazma"],
  ["Atölye, mutfak tezgâhı", "500 – 750 lx", "ince iş"],
  ["Doğrudan güneş ışığı", "≈ 100 000 lx", "dış ortam"]
], { x: M, y: 1.95, w: 7.3, step: 0.66, size: 12.5,
     cols: [[M + 0.3, 3.2], [M + 3.5, 1.9], [M + 5.4, 1.8]] });
T.card(s, { x: M + 7.7, y: 1.95, w: CW - 7.7, h: 4.6, fill: "EAF7DC", line: "CFE8B2" });
s.addText("Φ = E · A", { x: M + 8.05, y: 2.2, w: 3.4, h: 0.5, fontFace: "Courier New",
  fontSize: 18, bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "16 m²'lik bir çalışma odasını 500 lx düzeyinde aydınlatmak için:\n\n" +
  "Φ = 500 · 16 = 8000 lümen gerekir.\n\n" +
  "800 lümenlik LED ampullerle bu, 10 ampul demektir. Ampul seçerken bakılacak değer " +
  "watt değil, kutudaki lümen sayısıdır.",
  { x: M + 8.05, y: 2.85, w: 3.4, h: 3.4, size: 12.5 });
T.footer(s, FOOT, 7);
s.addNotes("Sınıfın aydınlanmasını tahmin ettir, sonra telefonla ölçtür: çoğu telefonda ışık sensörü var.");

/* 8–10 · örnekler */
B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.blue,
  baslik: "Çözümlü örnek · aydınlanma ve uzaklık",
  lede: "Noktasal kaynak kabul edilmiştir.",
  soru: "Işık şiddeti 200 cd olan lamba masanın 2 m üzerindedir.\n\n" +
    "(a) Masadaki aydınlanma nedir?\n(b) Lamba 4 m'ye çıkarılırsa ne olur?",
  cevap: "(a) 50 lx · (b) 12,5 lx",
  adimlar: [
    ["a", "E = I/d² = 200 / 2² = 200/4 = 50 lüks"],
    ["b", "Uzaklık 2 katına çıktı → aydınlanma dörtte bire iner"],
    ["2", "E = 200/16 = 12,5 lüks"],
    ["!", "Kısayol: 50/4 = 12,5. Ters kare yasasında oranla düşünmek hesabı kısaltır."]],
  not: "Oranla düşünmeyi öğret: formülü baştan kurmak yerine 'kaç kat' sorusu daha hızlı." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.violet,
  baslik: "Çözümlü örnek · akı ve katı açı",
  lede: "4π ≈ 12,57 alınmıştır.",
  soru: "Her yöne eşit ışık yayan bir kaynağın ışık şiddeti 100 cd'dır.\n\n" +
    "(a) Toplam ışık akısı nedir?\n(b) 0,5 sr'lik koniye gönderdiği akı nedir?",
  cevap: "(a) ≈ 1256 lm · (b) 50 lm",
  adimlar: [
    ["a", "Φ = 4π·I = 4 · 3,14 · 100 ≈ 1256 lümen"],
    ["b", "Φ = I·ω = 100 · 0,5 = 50 lümen"],
    ["!", "Katı açı hatırlatması: ω = A/r²; tüm küre için 4πr²/r² = 4π sr."]],
  not: "Şiddeti doğrudan akı sanmak en yaygın hata; aradaki 4π çarpanını vurgula." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.amber,
  baslik: "Çözümlü örnek · fotometre",
  lede: "İki lamba arasındaki eşit aydınlanma noktası.",
  soru: "Aralarında 3 m olan iki lambadan biri 400 cd, diğeri 100 cd'dır.\n\n" +
    "Bir ekranın iki yüzü nerede eşit aydınlanır?",
  cevap: "400 cd'lık lambadan 2 m",
  adimlar: [
    ["1", "Eşitlik: I₁/x² = I₂/(L−x)²"],
    ["2", "Karekök: √I₁/x = √I₂/(L−x) → 20/x = 10/(3−x)"],
    ["3", "60 − 20x = 10x → x = 2 m"],
    ["!", "Kontrol: 400/4 = 100 lx ve 100/1 = 100 lx ✓"]],
  not: "Karekök adımı atlanırsa denklem karmaşıklaşır; tahtada mutlaka o adımı göster." });

/* 11 · hatalar */
B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["Watt ile lümeni karıştırmak", "Watt çekilen elektrik gücü, lümen yayılan ışık akısıdır."],
  ["Aydınlanmayı kaynağın özelliği sanmak", "Aydınlanma yüzeyin özelliğidir; uzaklıkla değişir."],
  ["E ile 1/d ters orantı kurmak", "Bağıntı 1/d² şeklindedir: uzaklığın karesiyle."],
  ["cosθ çarpanını unutmak", "Eğik yüzeyde aydınlanma cosθ kadar azalır."],
  ["Toplam akıyı I'ya eşitlemek", "Noktasal kaynakta Φ = 4π·I'dır (≈ 12,6 katı)."],
  ["Ters kare yasasını her kaynağa uygulamak", "Yasa yalnızca noktasal kaynaklar içindir."]
], not: "İlk iki madde birim karmaşasından geliyor; birim analizini tahtada tekrarla." });

/* 12 · özet */
B.ozet(p, {
  maddeler: [
    ["Üç büyüklük, üç birim", "Akı lümen, şiddet kandela, aydınlanma lüks."],
    ["Akı ile şiddet arasında 4π var", "Noktasal kaynakta Φ = 4π·I."],
    ["Aydınlanma ters kareyle azalır", "E = I/d²: uzaklık 2 katına çıkarsa E dörtte bire."],
    ["Eğim cosθ kadar azaltır", "E = I·cosθ/d²; mevsimlerin de sebebi budur."]],
  linkMetin: "Aydınlanma laboratuvarı, fotometre ve oda tasarımı:",
  link: "dersler.perinet.org/isik-siddeti.html",
  not: "Kapanışta oda aydınlatma tasarımı bölümünü aç; sınıfın kendi odasını hesaplatmak iyi bir ödev."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/isik-siddeti.pptx" })
  .then(f => console.log("yazıldı:", f));
