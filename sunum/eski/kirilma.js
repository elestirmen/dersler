const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const B = require("./blok.js");
const { C, F, W, M } = T;
const CW = W - M * 2;

const p = T.deck(new pptxgen(), "Kırılma", "Fizik · Optik");
const FOOT = "Optik · Konu 04 · Kırılma";

let s = B.kapak(p, {
  ust: "OPTİK · KONU 04",
  baslik: "Işığın kırılması",
  lede: "Işık bir ortamdan diğerine geçerken hız değiştirir; hız değişince de yön değiştirir. " +
    "Suya sokulan kaşıktan fiber optik kabloya kadar her şey buna dayanır.",
  formul: "n = c / v          n₁·sin i = n₂·sin r          sin θ(sınır) = n₂ / n₁",
  link: "dersler.perinet.org/kirilma.html",
  not: "Açılışta bardağa sokulan kalemi göster: kırılmış gibi görünmesi tam da bu konunun sorusu."
});
s.addShape("rect", { x: 9.3, y: 3.75, w: 3.6, h: 1.7, fill: { color: "1B2544" },
  line: { color: "2C3860", width: 1 } });
s.addShape("line", { x: 9.9, y: 2.5, w: 1.2, h: 1.25, line: { color: "FFE08A", width: 3,
  endArrowType: "triangle" } });
s.addShape("line", { x: 11.1, y: 3.75, w: 0.6, h: 1.4, line: { color: "B9EE63", width: 3,
  endArrowType: "triangle" } });
s.addShape("line", { x: 11.1, y: 2.9, w: 0, h: 2.8, line: { color: "6A7798", width: 1,
  dashType: "dash" } });
s.addText("hava", { x: 9.3, y: 3.42, w: 1.2, h: 0.3, fontFace: F.body, fontSize: 11,
  color: "6A7798", isTextBox: true, margin: 0 });
s.addText("su", { x: 9.4, y: 4.4, w: 1.0, h: 0.3, fontFace: F.body, fontSize: 11,
  color: "6A7798", isTextBox: true, margin: 0 });

B.buDerste(p, {
  foot: FOOT, sayfa: 2, lede: "Altı başlık: kırılma indisinden tam yansımaya.",
  kartlar: [
    ["Kırılma indisi", "n = c/v; ışık yoğun ortamda yavaştır.", C.blue],
    ["Snell yasası", "n₁·sin i = n₂·sin r.", C.violet],
    ["Hız ve dalga boyu", "İkisi de değişir, frekans değişmez.", C.lime],
    ["Tam yansıma", "Sınır açıdan sonra ışık ortamı terk edemez.", C.amber],
    ["Yandan kayma", "Paralel kenarlı levhada doğrultu korunur.", C.rose],
    ["Günlük örnekler", "Serap, gökkuşağı, mercekler, fiber.", C.blue]
  ],
  not: "Bu konu optiğin geri kalanının temeli; mercekler ve prizmalar buradan türüyor."
});

/* 3 · kırılma indisi */
s = T.light(p);
T.head(s, 2, "Kırılma indisi", C.blue);
T.lede(s, "Işığın ortamdaki hızı, boşluktakinin kaç katı yavaşladı?");
T.formula(s, "n = c / v          c = 3·10⁸ m/s          n ≥ 1", { x: M, y: 1.95, w: 6.4,
  h: 0.8, size: 16 });
B.tablo(s, [
  ["Ortam", "n", "Işığın hızı"],
  ["Boşluk / hava", "1,00", "3,00·10⁸ m/s"],
  ["Su", "1,33", "2,26·10⁸ m/s"],
  ["Cam", "1,50", "2,00·10⁸ m/s"],
  ["Elmas", "2,42", "1,24·10⁸ m/s"]
], { x: M, y: 2.95, w: 6.4, step: 0.72, size: 12.5, mono: true,
     cols: [[M + 0.3, 2.4], [M + 2.8, 1.0], [M + 3.9, 2.3]] });
T.card(s, { x: M + 6.8, y: 1.95, w: CW - 6.8, h: 2.1, fill: "EAF0FD", line: "C7D7F7" });
s.addText("Optik yoğunluk", { x: M + 7.15, y: 2.15, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.blue, isTextBox: true, margin: 0 });
T.body(s, "İndisi büyük olan ortama çok yoğun, küçük olana az yoğun ortam denir. " +
  "Buradaki yoğunluk kütle yoğunluğu değil, optik yoğunluktur.",
  { x: M + 7.15, y: 2.6, w: 4.3, h: 1.3, size: 12.5 });
T.card(s, { x: M + 6.8, y: 4.2, w: CW - 6.8, h: 2.2, fill: C.softer });
s.addText("Neden yön değişir?", { x: M + 7.15, y: 4.4, w: 4.4, h: 0.4, fontFace: F.body,
  fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Dalga cephesinin bir ucu sınıra önce varıp yavaşlar, öteki ucu hâlâ hızlıdır. " +
  "Bu hız farkı cepheyi döndürür — ışının sapmasının sebebi budur.",
  { x: M + 7.15, y: 4.85, w: 4.3, h: 1.4, size: 12.5 });
T.footer(s, FOOT, 3);
s.addNotes("Cephe modeli, yürüyen sıra benzetmesiyle anlatılabilir: bir kanat çamura girince sıra döner.");

/* 4 · Snell */
s = T.light(p);
T.head(s, 3, "Snell yasası", C.violet);
T.lede(s, "Kırılma açısı, gelme açısına doğrusal değil sinüsle bağlıdır.");
const II = [], RR1 = [], RR2 = [];
for (let i = 0; i <= 89; i++) {
  II.push(i);
  const s1 = Math.sin((i * Math.PI) / 180) / 1.33;
  RR1.push(+((Math.asin(Math.min(s1, 1)) * 180) / Math.PI).toFixed(1));
  const s2 = Math.min(1.33 * Math.sin((i * Math.PI) / 180), 1);
  RR2.push(+((Math.asin(s2) * 180) / Math.PI).toFixed(1));
}
s.addChart(p.ChartType.scatter,
  [{ name: "i", values: II }, { name: "havadan suya", values: RR1 },
   { name: "sudan havaya", values: RR2 }],
  Object.assign(T.chartOpts({ colors: [C.blue, C.rose], extra: {
    title: "Kırılma açısı – gelme açısı",
    catAxisTitle: "gelme açısı i (°)", valAxisTitle: "kırılma açısı r (°)",
    valAxisMinVal: 0, valAxisMaxVal: 90, showLegend: true, legendPos: "b",
    legendFontFace: F.body, legendFontSize: 11, legendColor: C.muted } }),
  { x: M, y: 1.95, w: 6.6, h: 4.45 }));
T.formula(s, "n₁ · sin i = n₂ · sin r", { x: M + 6.95, y: 1.95, w: CW - 6.95, h: 0.7,
  size: 15, fill: "F1EDFB", color: C.violet });
T.bullets(s, [
  "Az yoğundan çok yoğuna: ışın normale yaklaşır (r < i).",
  "Çok yoğundan az yoğuna: normalden uzaklaşır (r > i).",
  "Dik gelişte (i = 0) kırılma olmaz; yalnızca hız değişir.",
  "Sudan havaya eğrisi 48,8°'de 90°'ye ulaşır: sınır açı.",
  "Açılar her zaman normalle ölçülür."],
  { x: M + 6.95, y: 2.9, w: CW - 6.95, h: 3.4, size: 12.5, gap: 15 });
T.footer(s, FOOT, 4);
s.addNotes("İki eğrinin birbirinin aynası olması güzel bir tartışma: ışık yolu tersinirdir.");

/* 5 · değişen ve değişmeyen */
s = T.light(p);
T.head(s, 4, "Ne değişir, ne değişmez?", C.lime);
T.lede(s, "Kırılmanın en çok karıştırılan kısmı.");
B.tablo(s, [
  ["Büyüklük", "Kırılmada", "Bağıntı"],
  ["Frekans (f)", "DEĞİŞMEZ — kaynağa bağlıdır", "f₁ = f₂"],
  ["Hız (v)", "değişir", "v = c / n"],
  ["Dalga boyu (λ)", "değişir", "λ = λ₀ / n"],
  ["Renk", "değişmez (frekans sabit)", "—"],
  ["Doğrultu", "eğik gelişte değişir", "Snell yasası"]
], { x: M, y: 2.0, w: CW, step: 0.76, size: 13, vurgu: 1,
     cols: [[M + 0.3, 3.0], [M + 3.4, 5.4], [M + 8.9, 2.9]] });
T.formula(s, "v = λ · f        n₁/n₂ = v₂/v₁ = λ₂/λ₁", { x: M, y: 5.85, w: CW, h: 0.75,
  size: 16, fill: "EAF7DC", color: C.lime });
T.footer(s, FOOT, 5);
s.addNotes("Frekansın sabit kalması kaynağa bağlı olmasından gelir; ortam frekansı değiştiremez.");

/* 6 · tam yansıma */
s = T.light(p);
T.head(s, 5, "Tam yansıma ve sınır açı", C.amber);
T.lede(s, "Çok yoğundan az yoğuna geçerken açı büyütülürse ışık hapsolur.");
T.formula(s, "sin θ(sınır) = n₂ / n₁        yalnızca n₁ > n₂ ise", { x: M, y: 1.95, w: 6.5,
  h: 0.8, size: 15, fill: "FDF4E3", color: C.amber });
B.tablo(s, [
  ["Geçiş", "Sınır açı", "Sonuç"],
  ["Su → hava", "48,8°", "havuz yüzeyi aynalaşır"],
  ["Cam → hava", "41,8°", "prizma ve fiberde kullanılır"],
  ["Elmas → hava", "24,4°", "elmasın parıltısı"]
], { x: M, y: 2.95, w: 6.5, step: 0.74, size: 12.5, mono: true,
     cols: [[M + 0.3, 2.3], [M + 2.7, 1.5], [M + 4.3, 2.0]] });
T.bullets(s, [
  "Gelme açısı büyüdükçe kırılan ışın yüzeye yaklaşır.",
  "Sınır açıda kırılma açısı tam 90° olur.",
  "Sınır açıdan büyük açılarda ışık ortamı terk edemez.",
  "Tam yansımada enerji kaybı yoktur; ışığın tamamı yansır.",
  "Fiber optik, elmas parıltısı ve serap bu olayla açıklanır."],
  { x: M + 6.85, y: 2.0, w: CW - 6.85, h: 3.2, size: 13, gap: 16 });
T.card(s, { x: M + 6.85, y: 5.4, w: CW - 6.85, h: 1.0, fill: "FCECF0", line: "F3C9D4" });
s.addText([{ text: "Elmas neden parlar? ", options: { bold: true, color: C.rose } },
  { text: "24,4°'lik küçük sınır açı yüzünden içeri giren ışık defalarca tam yansır ve " +
    "ancak belirli yüzlerden çıkar.", options: { color: C.muted } }],
  { x: M + 7.15, y: 5.4, w: 4.5, h: 1.0, valign: "middle", fontFace: F.body, fontSize: 12,
    isTextBox: true, margin: 0 });
T.footer(s, FOOT, 6);
s.addNotes("Havuz dibinden yukarı bakınca yüzeyin ayna gibi görünmesi tam yansımanın günlük kanıtı.");

/* 7 · günlük hayat */
B.kartlar6(p, {
  foot: FOOT, sayfa: 7, no: 6, tone: C.blue, baslik: "Günlük hayatta kırılma",
  lede: "Aynı yasa, çok farklı görüntüler.",
  kartlar: [
    ["Kırık görünen kaşık", "Sudan gelen ışınlar yüzeyde kırılır; kaşık kırılmış görünür.",
     "görünür derinlik", C.blue],
    ["Sığ görünen havuz", "Dip, gerçek derinliğin dörtte üçünde görünür.", "h′ = h/n", C.violet],
    ["Serap", "Sıcak hava katmanlarının indisi farklıdır; ışık kıvrılır.",
     "kademeli kırılma", C.lime],
    ["Gökkuşağı", "Su damlasında kırılma + tam yansıma + kırılma.", "42°", C.amber],
    ["Gözlük ve mercekler", "Kırılmayı kontrollü kullanır.", "P = 1/f", C.rose],
    ["Fiber optik", "Tam yansımayla ışığı kilometrelerce taşır.", "n₁ > n₂", C.blue]
  ],
  not: "Serap açıklaması sınıfın ilgisini çekiyor; asfalttaki 'su birikintisi' örneğini ver."
});

B.ornek(p, { foot: FOOT, sayfa: 8, no: 7, tone: C.violet,
  baslik: "Çözümlü örnek · Snell yasası",
  lede: "sin53° = 0,8 ve sin37° = 0,6 alınmıştır.",
  soru: "Havadan (n = 1) suya (n = 4/3) 53° ile giren ışının kırılma açısını bulunuz.",
  cevap: "37°",
  adimlar: [
    ["1", "n₁·sin i = n₂·sin r → 1 · 0,8 = (4/3) · sin r"],
    ["2", "sin r = 0,8 · 3/4 = 0,6"],
    ["3", "r = 37°"],
    ["!", "Işın normale yaklaştı: su daha yoğun olduğu için beklenen sonuç."]],
  not: "53–37 üçgeni Türkiye müfredatında standart; sinüs değerlerini ezberletmek işe yarıyor." });

B.ornek(p, { foot: FOOT, sayfa: 9, no: 8, tone: C.lime,
  baslik: "Çözümlü örnek · hız ve dalga boyu",
  lede: "Frekansın değişmediğine dikkat.",
  soru: "Dalga boyu havada 600 nm olan ışık, kırılma indisi 1,5 olan cama giriyor.\n\n" +
    "Camdaki hızı, dalga boyu ve frekansı nedir?",
  cevap: "2·10⁸ m/s · 400 nm · 5·10¹⁴ Hz",
  adimlar: [
    ["1", "v = c/n = 3·10⁸ / 1,5 = 2·10⁸ m/s"],
    ["2", "λ = λ₀/n = 600/1,5 = 400 nm"],
    ["3", "f = v/λ = 2·10⁸ / 400·10⁻⁹ = 5·10¹⁴ Hz"],
    ["!", "Havadaki frekans da 3·10⁸/600·10⁻⁹ = 5·10¹⁴ Hz ✓ frekans değişmedi."]],
  not: "Son adımdaki kontrol, 'frekans değişmez' kuralını sayıyla kanıtlıyor." });

B.ornek(p, { foot: FOOT, sayfa: 10, no: 9, tone: C.amber,
  baslik: "Çözümlü örnek · sınır açı ve yandan kayma",
  lede: "İki klasik hesap.",
  soru: "(a) Kırılma indisi 2 olan ortamdan havaya geçişte sınır açı kaçtır?\n\n" +
    "(b) 6 cm kalınlığındaki cam levhaya (n = 1,5) 50° ile gelen ışının yandan kayması " +
    "ne kadardır?",
  cevap: "(a) 30° · (b) ≈ 2,3 cm",
  adimlar: [
    ["a", "sin θ = n₂/n₁ = 1/2 = 0,5 → θ = 30°"],
    ["b", "sin r = sin50°/1,5 = 0,511 → r ≈ 30,7°"],
    ["2", "d = t·sin(i − r)/cos r = 6 · sin19,3° / cos30,7°"],
    ["3", "d = 6 · 0,331 / 0,860 ≈ 2,3 cm; çıkan ışın gelene paraleldir."]],
  not: "Yandan kayma formülü ezberlenmek yerine geometriden çıkarılmalı; tahtada üçgeni çiz." });

B.hatalar(p, { foot: FOOT, sayfa: 11, no: 10, maddeler: [
  ["Frekansın değiştiğini sanmak", "Frekans değişmez; hız ve dalga boyu değişir."],
  ["Dik gelen ışın kırılır sanmak", "i = 0 ise doğrultu korunur, yalnızca hız değişir."],
  ["Tam yansımayı her geçişte aramak", "Yalnızca çok yoğundan az yoğuna geçişte olur."],
  ["Açıları yüzeyle ölçmek", "Kırılmada da açılar normalle ölçülür."],
  ["Optik yoğunluğu kütle yoğunluğu sanmak", "Kastedilen kırılma indisidir."],
  ["Levhadan çıkan ışının saptığını sanmak", "Paralel kenarlı levhada çıkan ışın gelene paraleldir."]
], not: "İlk madde en yaygın; 'ortam frekansı değiştiremez' cümlesini tekrarlat." });

B.ozet(p, {
  maddeler: [
    ["İndis hız oranıdır", "n = c/v; büyük indis, yavaş ışık."],
    ["Snell yasası yönü verir", "n₁·sin i = n₂·sin r; yoğuna girerken normale yaklaşır."],
    ["Frekans sabit kalır", "Değişen hız ve dalga boyudur; renk değişmez."],
    ["Sınır açıdan sonra hapis", "Çok yoğundan az yoğuna geçişte tam yansıma olur."]],
  linkMetin: "Snell laboratuvarı, tam yansıma ve yandan kayma:",
  link: "dersler.perinet.org/kirilma.html",
  not: "Kapanışta tam yansıma bölümünde açıyı yavaşça büyüt; kırılan ışının sönüşünü izletmek etkili."
});

p.writeFile({ fileName: "/opt/dersler/dist/sunum/kirilma.pptx" })
  .then(f => console.log("yazıldı:", f));
