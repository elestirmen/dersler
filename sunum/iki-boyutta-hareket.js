const pptxgen = require("pptxgenjs");
const T = require("./tema.js");
const { C, F, W, M } = T;

const p = T.deck(new pptxgen(), "İki boyutta sabit ivmeli hareket", "Fizik · Kuvvet ve Hareket");
const FOOT = "Kuvvet ve Hareket · Konu 03 · İki boyutta sabit ivmeli hareket";
const CW = W - M * 2;

/* ---------- 1 · kapak ---------- */
let s = T.dark(p);
s.addText("KUVVET VE HAREKET · KONU 03", {
  x: 0.95, y: 1.7, w: 6, h: 0.35, fontFace: F.body, fontSize: 13, bold: true,
  color: C.limeBright, charSpacing: 3, isTextBox: true, margin: 0
});
s.addText("İki boyutta\nsabit ivmeli hareket", {
  x: 0.9, y: 2.05, w: 8.0, h: 1.9, fontFace: F.head, fontSize: 42, bold: true,
  color: C.white, lineSpacingMultiple: 1.1, isTextBox: true, margin: 0
});
s.addText(
  "Havaya fırlatılan bir cisim iki hareketi aynı anda yapar: yatayda hiç " +
  "hızlanmadan gider, düşeyde serbest düşer. İkisi birbirine karışmaz; " +
  "tek ortak değişkenleri zamandır.", {
  x: 0.95, y: 4.25, w: 7.2, h: 1.1, fontFace: F.body, fontSize: 15.5,
  color: "C3CEE8", lineSpacingMultiple: 1.25, isTextBox: true, margin: 0
});
s.addText("x = v₀cosα · t      y = v₀sinα · t − ½g·t²", {
  x: 0.95, y: 5.55, w: 7.4, h: 0.5, fontFace: "Courier New", fontSize: 14, bold: true,
  color: C.limeBright, isTextBox: true, margin: 0
});
for (let k = 0; k <= 6; k++) {
  const xx = 9.35 + k * 0.5;
  const yy = 6.0 - 3.1 * (1 - Math.pow((k - 3) / 3, 2));
  s.addShape("ellipse", { x: xx, y: yy, w: 0.26, h: 0.26,
    fill: { color: C.limeBright, transparency: k === 3 ? 0 : 35 }, line: { type: "none" } });
}
s.addText("eşit zaman aralıkları · yatayda eşit, düşeyde artan", {
  x: 8.2, y: 6.45, w: 4.4, h: 0.3, align: "right", fontFace: F.body, fontSize: 10.5,
  color: "6A7798", isTextBox: true, margin: 0
});
T.footer(s, "dersler.perinet.org/iki-boyutta-hareket.html", null, true);
s.addNotes("Açılış sorusu: 'Masadan yuvarlanan bilye ile aynı anda bıraktığım bilye hangisi önce yere düşer?' Cevabı 4. slaytta vereceğiz; şimdilik tahmin aldır.");

/* ---------- 2 · bu derste ---------- */
s = T.light(p);
T.head(s, 1, "Bu derste", C.blue);
T.lede(s, "Altı başlık: ilkeden başlayıp çözümlü örneklere kadar.");
const AGENDA = [
  ["Bağımsızlık ilkesi", "Yatay ve düşey hareket birbirini etkilemez.", C.blue],
  ["Vektörel bağıntılar", "Bileşenlere ayırma: v₀cosα ve v₀sinα.", C.violet],
  ["Yatay atış", "Uçuş süresi yalnızca yüksekliğe bağlıdır.", C.lime],
  ["Eğik atış", "Tepe noktası, uçuş süresi ve simetri.", C.amber],
  ["Menzil ve açı", "45° en uzağa atar; tümler açılar eşitlenir.", C.rose],
  ["Yörünge ve grafikler", "Parabolün denklemi ve dört grafik.", C.blue]
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
  T.body(s, a[1], { x: x + 0.3, y: y + 0.95, w: 3.1, h: 0.9, size: 12.5 });
});
T.footer(s, FOOT, 2);
s.addNotes("Serbest düşmeyi bilen bir sınıf için bu konu yeni bir hareket değil: bilinen iki hareketin aynı anda çalışması.");

/* ---------- 3 · tanım ---------- */
s = T.light(p);
T.head(s, 2, "İki boyutta sabit ivmeli hareket", C.blue);
T.lede(s, "Cisim bir düzlemde hareket eder ve ivme vektörü büyüklükçe de yöncede de değişmez.");
T.card(s, { x: M, y: 1.95, w: 5.6, h: 2.1, fill: C.softer });
s.addText("Yatay eksen (x)", { x: M + 0.35, y: 2.15, w: 4.9, h: 0.4, fontFace: F.body,
  fontSize: 16, bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.formula(s, "aₓ = 0", { x: M + 0.35, y: 2.6, w: 1.5, h: 0.5, size: 14, fill: "EAF7DC",
  color: C.lime });
T.body(s, "İvme yoktur → düzgün doğrusal hareket.\nHız baştan sona sabittir.",
  { x: M + 2.05, y: 2.6, w: 3.2, h: 0.9, size: 13 });
T.body(s, "Eşit zamanlarda eşit yollar alınır.", { x: M + 0.35, y: 3.3, w: 4.9, h: 0.5,
  size: 12.5, color: C.dim });
T.card(s, { x: M + 6.0, y: 1.95, w: CW - 6.0, h: 2.1, fill: C.softer });
s.addText("Düşey eksen (y)", { x: M + 6.35, y: 2.15, w: 4.9, h: 0.4, fontFace: F.body,
  fontSize: 16, bold: true, color: C.violet, isTextBox: true, margin: 0 });
T.formula(s, "aᵧ = −g", { x: M + 6.35, y: 2.6, w: 1.5, h: 0.5, size: 14, fill: "F1EDFB",
  color: C.violet });
T.body(s, "Sabit ivmeli hareket → serbest düşme\nya da düşey atışın aynısı.",
  { x: M + 8.05, y: 2.6, w: 3.2, h: 0.9, size: 13 });
T.body(s, "Eşit zamanlarda 1 : 3 : 5 oranında yollar alınır.", { x: M + 6.35, y: 3.3,
  w: 4.9, h: 0.5, size: 12.5, color: C.dim });
T.card(s, { x: M, y: 4.3, w: CW, h: 2.1 });
s.addText("Yeni bir hareket öğrenmiyoruz", { x: M + 0.35, y: 4.5, w: 6, h: 0.4,
  fontFace: F.body, fontSize: 15.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Bildiğimiz iki hareketi aynı anda, aynı saatle çalıştırıyoruz. Bu yüzden " +
  "iki boyutlu bir soru, iki ayrı tek boyutlu soruya bölünür; sonuçlar zaman " +
  "üzerinden birleştirilir.", { x: M + 0.35, y: 4.95, w: 6.4, h: 1.2, size: 13.5 });
[["Atılan top", C.blue], ["Fışkıran su", C.violet], ["Masadan yuvarlanan bilye", C.lime]]
  .forEach((e, i) => {
    const y = 4.6 + i * 0.46;
    s.addShape("ellipse", { x: M + 7.3, y: y + 0.12, w: 0.16, h: 0.16,
      fill: { color: e[1] }, line: { type: "none" } });
    s.addText(e[0], { x: M + 7.65, y: y, w: 4.0, h: 0.4, valign: "middle", fontFace: F.body,
      fontSize: 13.5, color: C.muted, isTextBox: true, margin: 0 });
  });
s.addText("Hepsinde ivme aynı: g, aşağı yönde.", { x: M + 7.3, y: 5.98, w: 4.3, h: 0.3,
  fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 3);
s.addNotes("Tabloyu tahtaya da çiz: sol sütun yatay, sağ sütun düşey. Bütün problem çözümü bu iki sütunu ayrı ayrı doldurmaktan ibaret.");

/* ---------- 4 · bağımsızlık ---------- */
s = T.light(p);
T.head(s, 3, "Bağımsızlık ilkesi", C.violet);
T.lede(s, "Biri bırakılıyor, diğeri aynı anda yatay fırlatılıyor. Hangisi önce yere iner?");
T.card(s, { x: M, y: 1.95, w: 7.1, h: 4.45, fill: C.softer });
const X0 = M + 0.75, Y0 = 2.45, HH = 3.3, WW = 5.5;
s.addShape("rect", { x: M + 0.3, y: Y0, w: 0.4, h: HH + 0.25,
  fill: { color: "DCE3F2" }, line: { color: "C6D0E6", width: 1 } });
s.addShape("line", { x: M + 0.3, y: Y0 + HH + 0.25, w: 6.4, h: 0,
  line: { color: C.lime, width: 2 } });
for (let k = 0; k <= 4; k++) {
  const yy = Y0 + HH * ((k * k) / 16);
  const xb = X0 + (WW * k) / 4;
  if (k > 0) {
    s.addShape("line", { x: X0 + 0.1, y: yy + 0.11, w: xb - X0 - 0.1, h: 0,
      line: { color: C.violet, width: 1.25, dashType: "dash" } });
  }
  const last = k === 4;
  s.addShape("ellipse", { x: X0 - 0.11, y: yy, w: 0.22, h: 0.22,
    fill: { color: C.blue, transparency: last ? 0 : 55 }, line: { type: "none" } });
  s.addShape("ellipse", { x: xb - 0.11 + (k === 0 ? 0.26 : 0), y: yy, w: 0.22, h: 0.22,
    fill: { color: C.amber, transparency: last ? 0 : 55 }, line: { type: "none" } });
}
s.addText("bırakılan", { x: M + 0.35, y: 2.05, w: 1.5, h: 0.3, fontFace: F.body,
  fontSize: 11.5, bold: true, color: C.blue, isTextBox: true, margin: 0 });
s.addText("yatay atılan", { x: M + 5.1, y: 2.05, w: 1.7, h: 0.3, align: "right",
  fontFace: F.body, fontSize: 11.5, bold: true, color: C.amber, isTextBox: true, margin: 0 });
s.addText("kesikli çizgiler her an yatay → iki cisim aynı yükseklikte", {
  x: M + 0.3, y: 6.02, w: 6.5, h: 0.3, align: "center", fontFace: F.body, fontSize: 11.5,
  color: C.dim, isTextBox: true, margin: 0 });
T.card(s, { x: M + 7.5, y: 1.95, w: CW - 7.5, h: 2.1, fill: "EAF7DC", line: "CFE8B2" });
s.addText("İkisi de aynı anda iner", { x: M + 7.85, y: 2.18, w: 3.5, h: 0.4, fontFace: F.body,
  fontSize: 15.5, bold: true, color: C.lime, isTextBox: true, margin: 0 });
T.body(s, "Yatay hız düşmeyi ne hızlandırır ne yavaşlatır. Düşey hareketi yalnızca " +
  "g yönetir: t = √(2h / g).", { x: M + 7.85, y: 2.65, w: 3.4, h: 1.2, size: 13 });
T.card(s, { x: M + 7.5, y: 4.3, w: CW - 7.5, h: 2.1 });
s.addText("Neden böyle?", { x: M + 7.85, y: 4.52, w: 3.5, h: 0.4, fontFace: F.body,
  fontSize: 15.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Kuvvet (ağırlık) düşeydir, dolayısıyla ivme de düşeydir. Yatayda kuvvet " +
  "olmadığı için o doğrultuda hız değişemez. Bir bileşene etki eden kuvvet, diğer " +
  "bileşeni değiştiremez.", { x: M + 7.85, y: 4.98, w: 3.4, h: 1.3, size: 13 });
T.footer(s, FOOT, 4);
s.addNotes("Mümkünse sınıfta yap: masanın kenarından bir cetvelle iki bozuk parayı aynı anda fırlat. Ses tek gelir — ikisi aynı anda yere düşer.");

/* ---------- 5 · vektörel bağıntılar ---------- */
s = T.light(p);
T.head(s, 4, "Bileşenlere ayırma", C.lime);
T.lede(s, "Sabit ivmeli hareketin vektörel denklemleri, her eksende ayrı ayrı yazılır.");
T.card(s, { x: M, y: 1.95, w: 5.5, h: 4.45, fill: C.softer });
const OX = M + 0.95, OY = 5.75, VH = 2.05, VW = 3.0;
/* negatif genişlik/yükseklik geçersiz OOXML üretir; yukarı yön flipV ile verilir */
s.addShape("line", { x: OX, y: OY, w: VW + 0.25, h: 0,
  line: { color: C.lime, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: OX + VW, y: OY - VH, w: 0, h: VH, flipV: true,
  line: { color: C.amber, width: 3, endArrowType: "triangle" } });
s.addShape("line", { x: OX, y: OY - VH, w: VW, h: VH, flipV: true,
  line: { color: C.blue, width: 3.5, endArrowType: "triangle" } });
s.addShape("line", { x: OX, y: OY - VH, w: VW, h: 0,
  line: { color: C.dim, width: 1, dashType: "dash" } });
s.addText("v₀", { x: OX + 1.05, y: OY - 1.5, w: 0.6, h: 0.35, fontFace: F.body,
  fontSize: 15, bold: true, color: C.blue, isTextBox: true, margin: 0 });
s.addText("v₀·cosα", { x: OX + 0.85, y: OY + 0.1, w: 1.6, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.lime, isTextBox: true, margin: 0 });
s.addText("v₀·sinα", { x: OX + VW + 0.15, y: OY - 1.25, w: 1.4, h: 0.35, fontFace: F.body,
  fontSize: 13, bold: true, color: C.amber, isTextBox: true, margin: 0 });
s.addText("α", { x: OX + 0.52, y: OY - 0.44, w: 0.3, h: 0.35, fontFace: F.body,
  fontSize: 14, bold: true, color: C.violet, isTextBox: true, margin: 0 });
s.addText("Açı daima yatayla ölçülür", { x: M + 0.35, y: 2.15, w: 4.8, h: 0.35,
  fontFace: F.body, fontSize: 13.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.formula(s, "v = √(vₓ² + vᵧ²)   ·   tanθ = vᵧ / vₓ", { x: M + 0.35, y: 2.6, w: 4.8, h: 0.55,
  size: 12.5 });
const ROWS = [["", "Yatay (x)", "Düşey (y)"],
  ["İvme", "aₓ = 0", "aᵧ = −g"],
  ["Hız", "vₓ = v₀·cosα", "vᵧ = v₀·sinα − g·t"],
  ["Konum", "x = v₀·cosα·t", "y = y₀ + v₀·sinα·t − ½g·t²"]];
ROWS.forEach((r, i) => {
  const y = 2.0 + i * 0.72;
  if (i > 0) {
    s.addShape("roundRect", { x: M + 5.9, y: y, w: CW - 5.9, h: 0.62, rectRadius: 0.08,
      fill: { color: i % 2 ? C.white : C.softer }, line: { color: C.line, width: 1 } });
  }
  const cols = [[M + 6.15, 1.3, C.ink, i === 0], [M + 7.5, 2.1, C.lime, i === 0],
                [M + 9.6, 2.4, C.violet, i === 0]];
  r.forEach((txt, j) => {
    s.addText(txt, { x: cols[j][0], y: y, w: cols[j][1], h: 0.62, valign: "middle",
      fontFace: i === 0 ? F.body : "Courier New", fontSize: i === 0 ? 11.5 : 12,
      bold: i === 0 || j === 0, color: i === 0 ? C.dim : (j === 0 ? C.ink : cols[j][2]),
      charSpacing: i === 0 ? 1 : 0, isTextBox: true, margin: 0 });
  });
});
T.card(s, { x: M + 5.9, y: 4.95, w: CW - 5.9, h: 1.45, fill: "FDF4E3", line: "F0DCB4" });
s.addText([
  { text: "Bileşenler skaler toplanmaz. ", options: { bold: true, color: C.ink } },
  { text: "vₓ = 30 m/s ve vᵧ = 40 m/s ise sürat 70 değil, 50 m/s'dir. Dik üçgen kur.",
    options: { color: C.muted } }
], { x: M + 6.25, y: 4.95, w: CW - 6.6, h: 1.45, valign: "middle", fontFace: F.body,
  fontSize: 13.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 5);
s.addNotes("En sık hata sinüs–kosinüs karışması. Kural: açı hangi eksenle ölçülüyorsa, o eksendeki bileşen kosinüslüdür.");

/* ---------- 6 · yatay atış ---------- */
s = T.light(p);
T.head(s, 5, "Yatay atış", C.amber);
T.lede(s, "İlk hız yatay olduğu için v₀ᵧ = 0; düşey hareket tam bir serbest düşmedir.");
const hx = [], hy = [];
for (let i = 0; i <= 40; i++) {
  const t = (3 * i) / 40;
  hx.push(+(20 * t).toFixed(2));
  hy.push(+(45 - 5 * t * t).toFixed(2));
}
s.addChart(p.ChartType.scatter, [{ name: "x", values: hx }, { name: "yörünge", values: hy }],
  Object.assign(T.chartOpts({ colors: [C.amber], extra: {
    title: "45 m'den 20 m/s ile yatay atış (g = 10 m/s²)",
    catAxisTitle: "yatay uzaklık x (m)", valAxisTitle: "yükseklik y (m)",
    valAxisMinVal: 0, lineSize: 3 } }),
  { x: M, y: 1.95, w: 6.8, h: 4.45 }));
[["t = √(2h / g)", "uçuş süresi"], ["x = v₀ · √(2h / g)", "menzil"],
 ["v = √(v₀² + 2gh)", "çarpma sürati"]].forEach((f, i) => {
  T.formula(s, f[0], { x: M + 7.15, y: 1.95 + i * 0.92, w: 3.1, h: 0.66, size: 13.5,
    fill: "FDF4E3", color: C.amber });
  s.addText(f[1], { x: M + 10.35, y: 1.95 + i * 0.92, w: 1.6, h: 0.66, valign: "middle",
    fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.15, y: 4.75, w: CW - 7.15, h: 1.65, fill: C.softer });
s.addText("Süre atış hızından bağımsızdır", { x: M + 7.5, y: 4.95, w: 4.3, h: 0.4,
  fontFace: F.body, fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.body(s, "Topu ister hafifçe it, ister topla fırlat: aynı masadan aynı sürede iner. " +
  "Değişen tek şey ne kadar uzağa düştüğüdür.", { x: M + 7.5, y: 5.4, w: 4.2, h: 0.95,
  size: 13 });
T.footer(s, FOOT, 6);
s.addNotes("Yörünge yarım parabol. Strobo fotoğrafta yatay aralıklar eşit, düşey aralıklar 1:3:5:7 oranında büyür — iki diziyi birlikte göster.");

/* ---------- 7 · eğik atış ---------- */
s = T.light(p);
T.head(s, 6, "Eğik atış", C.blue);
T.lede(s, "v₀ = 25 m/s, α = 53°, g = 10 m/s² · vₓ = 15 m/s, v₀ᵧ = 20 m/s");
const ox2 = [], oy2 = [];
for (let i = 0; i <= 40; i++) {
  const t = (4 * i) / 40;
  ox2.push(+(15 * t).toFixed(2));
  oy2.push(+(20 * t - 5 * t * t).toFixed(2));
}
s.addChart(p.ChartType.scatter, [{ name: "x", values: ox2 }, { name: "yörünge", values: oy2 }],
  Object.assign(T.chartOpts({ colors: [C.blue], extra: {
    title: "Yörünge: tepe noktası 20 m, menzil 60 m",
    catAxisTitle: "yatay uzaklık x (m)", valAxisTitle: "yükseklik y (m)",
    valAxisMinVal: 0, lineSize: 3 } }),
  { x: M, y: 1.95, w: 6.8, h: 4.45 }));
[["t(tepe) = v₀·sinα / g", "2 s"], ["h(maks) = v₀²sin²α / (2g)", "20 m"],
 ["t(uçuş) = 2·v₀·sinα / g", "4 s"], ["R = v₀²·sin2α / g", "60 m"]].forEach((f, i) => {
  T.formula(s, f[0], { x: M + 7.15, y: 1.95 + i * 0.82, w: 3.35, h: 0.6, size: 12.5 });
  s.addText(f[1], { x: M + 10.6, y: 1.95 + i * 0.82, w: 1.35, h: 0.6, valign: "middle",
    fontFace: F.body, fontSize: 13, bold: true, color: C.lime, isTextBox: true, margin: 0 });
});
T.card(s, { x: M + 7.15, y: 5.3, w: CW - 7.15, h: 1.1, fill: "FDF4E3", line: "F0DCB4" });
s.addText([
  { text: "Tepe noktada hız sıfır değil: ", options: { bold: true, color: C.ink } },
  { text: "yalnızca vᵧ sıfırlanır, cisim vₓ = 15 m/s ile yatay ilerler.",
    options: { color: C.muted } }
], { x: M + 7.5, y: 5.3, w: 4.2, h: 1.1, valign: "middle", fontFace: F.body,
  fontSize: 12.5, isTextBox: true, margin: 0 });
T.footer(s, FOOT, 7);
s.addNotes("Simetriyi vurgula: çıkış süresi = iniş süresi, iniş açısı = atış açısı, aynı yükseklikte süratler eşit. Son iki formül yalnızca atış ve iniş aynı yükseklikteyse geçerli.");

/* ---------- 8 · menzil ve açı ---------- */
s = T.light(p);
T.head(s, 7, "Menzil ve açı", C.rose);
T.lede(s, "Aynı sürat (25 m/s), beş farklı açı. Tümler açılar aynı noktaya düşer.");
const gx = [];
for (let i = 0; i <= 52; i++) gx.push(+(i * 1.25).toFixed(2));
const series = [{ name: "x", values: gx }];
[15, 30, 45, 60, 75].forEach(a => {
  const r = (a * Math.PI) / 180;
  series.push({ name: a + "°", values: gx.map(x =>
    +Math.max(0, x * Math.tan(r) - (10 * x * x) / (2 * 625 * Math.cos(r) * Math.cos(r))).toFixed(2)) });
});
s.addChart(p.ChartType.scatter, series,
  Object.assign(T.chartOpts({ colors: [C.blue, C.lime, C.violet, C.amber, C.rose], extra: {
    title: "Aynı süratle atılan beş cismin yörüngeleri",
    catAxisTitle: "menzil (m)", valAxisTitle: "yükseklik (m)", valAxisMinVal: 0,
    lineSize: 2.5, showLegend: true, legendPos: "r", legendFontFace: F.body,
    legendFontSize: 11, legendColor: C.muted } }),
  { x: M, y: 1.9, w: 7.6, h: 4.5 }));
[["45°", "62,5 m", "en uzun menzil", C.violet],
 ["30° ve 60°", "54,1 m", "tümler açılar eşit", C.lime],
 ["15° ve 75°", "31,2 m", "tümler açılar eşit", C.blue]].forEach((r, i) => {
  const y = 1.95 + i * 1.12;
  T.card(s, { x: M + 7.95, y: y, w: CW - 7.95, h: 0.95 });
  s.addText(r[0], { x: M + 8.25, y: y + 0.14, w: 1.8, h: 0.34, valign: "middle",
    fontFace: F.body, fontSize: 14, bold: true, color: r[3], isTextBox: true, margin: 0 });
  s.addText(r[1], { x: M + 9.6, y: y, w: 1.3, h: 0.95, valign: "middle", align: "right",
    fontFace: F.body, fontSize: 15, bold: true, color: C.ink, isTextBox: true, margin: 0 });
  s.addText(r[2], { x: M + 8.25, y: y + 0.5, w: 3.0, h: 0.32, fontFace: F.body,
    fontSize: 10.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.formula(s, "R = v₀²·sin2α / g", { x: M + 7.95, y: 5.35, w: CW - 7.95, h: 0.55, size: 13,
  fill: "FBE9EE", color: C.rose });
T.body(s, "sin2α en büyük değerini 2α = 90° için alır → α = 45°.",
  { x: M + 7.95, y: 6.0, w: CW - 7.95, h: 0.4, size: 11.5 });
T.footer(s, FOOT, 8);
s.addNotes("Tümler açılarda menzil eşit ama uçuş süresi değil: 75° ile atılan top 15°'lik atıştan 3,7 kat uzun havada kalır. Basketbol ve top atışı örnekleri buraya çok oturuyor.");

/* ---------- 9 · dört grafik ---------- */
s = T.light(p);
T.head(s, 8, "Dört grafik, tek hareket", C.violet);
T.lede(s, "Aynı eğik atışın (v₀ = 25 m/s, α = 53°) zamana bağlı grafikleri.");
const tt = [], xs = [], ys = [], vxs = [], vys = [];
for (let i = 0; i <= 40; i++) {
  const t = (4 * i) / 40;
  tt.push(+t.toFixed(2));
  xs.push(+(15 * t).toFixed(2));
  ys.push(+(20 * t - 5 * t * t).toFixed(2));
  vxs.push(15);
  vys.push(+(20 - 10 * t).toFixed(2));
}
[["x – t · yatay konum", xs, C.blue, "m", "Doğru: eğimi vₓ, sabit."],
 ["y – t · yükseklik", ys, C.violet, "m", "Parabol: eğimi anlık vᵧ."],
 ["vₓ – t · yatay hız", vxs, C.lime, "m/s", "Yatay doğru: aₓ = 0."],
 ["vᵧ – t · düşey hız", vys, C.amber, "m/s", "Eğimi −g; sıfır kesişimi tepe noktası."]
].forEach((g, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = M + col * (5.85 + 0.23), y = 1.9 + row * 2.4;
  s.addChart(p.ChartType.scatter, [{ name: "t", values: tt }, { name: g[0], values: g[1] }],
    Object.assign(T.chartOpts({ colors: [g[2]], extra: {
      title: g[0], catAxisTitle: "t (s)", valAxisTitle: g[3], lineSize: 2.8 } }),
    { x: x, y: y, w: 5.85, h: 1.95 }));
  T.body(s, g[4], { x: x + 0.1, y: y + 1.97, w: 5.6, h: 0.35, size: 11.5, color: C.dim });
});
T.footer(s, FOOT, 9);
s.addNotes("Dört grafiği birlikte oku: soldakiler konum, sağdakiler hız. vᵧ–t'nin ekseni kestiği an tepe; o ana kadarki alan çıkılan yükseklik.");

/* ---------- 10 · yörünge denklemi ---------- */
s = T.light(p);
T.head(s, 9, "Yörünge neden parabol?", C.lime);
T.lede(s, "x ve y denklemlerinden zamanı yok edelim.");
[["x = v₀·cosα · t", "yataydaki hareket"],
 ["t = x / (v₀·cosα)", "zamanı x cinsinden yaz"],
 ["y = x·tanα − g·x² / (2·v₀²·cos²α)", "y denkleminde yerine koy"]].forEach((f, i) => {
  T.formula(s, f[0], { x: M, y: 1.95 + i * 1.15, w: 6.2, h: 0.78, size: i === 2 ? 14 : 15,
    fill: i === 2 ? "EAF7DC" : "EAF0FD", color: i === 2 ? C.lime : C.blue });
  s.addText(f[1], { x: M + 6.4, y: 1.95 + i * 1.15, w: 2.0, h: 0.78, valign: "middle",
    fontFace: F.body, fontSize: 11.5, color: C.dim, isTextBox: true, margin: 0 });
});
T.card(s, { x: M, y: 5.45, w: 8.6, h: 0.95, fill: C.softer });
s.addText([
  { text: "Sonuç y = ax − bx² biçiminde. ", options: { bold: true, color: C.ink } },
  { text: "Bir eksende zamanla doğrusal, diğerinde zamanın karesiyle değişen hareket → parabol.",
    options: { color: C.muted } }
], { x: M + 0.35, y: 5.45, w: 8.0, h: 0.95, valign: "middle", fontFace: F.body,
  fontSize: 13.5, isTextBox: true, margin: 0 });
T.card(s, { x: M + 8.85, y: 1.95, w: CW - 8.85, h: 4.45 });
s.addText("Grafik okuma", { x: M + 9.15, y: 2.15, w: 2.6, h: 0.4, fontFace: F.body,
  fontSize: 14.5, bold: true, color: C.ink, isTextBox: true, margin: 0 });
T.bullets(s, [
  "x – t doğru, eğimi vₓ",
  "y – t parabol",
  "vₓ – t zamana paralel",
  "vᵧ – t eğimi −g",
  "vᵧ = 0 anı tepe noktası",
  "vᵧ – t altındaki alan düşey yer değiştirme"
], { x: M + 9.15, y: 2.65, w: 2.5, h: 3.5, size: 12.5, gap: 9 });
T.footer(s, FOOT, 10);
s.addNotes("Türetmeyi tahtada da yap; öğrenciler 'parabol' kelimesini ezberden söylüyor ama nereden geldiğini bilmiyor.");

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
  const gap = 0.25, h = (4.45 - (adimlar.length - 1) * gap) / adimlar.length;
  adimlar.forEach((a, i) => {
    const y = 1.95 + i * (h + gap);
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

ornek(10, "Çözümlü örnek · yatay atış",
  "80 m yüksekliğindeki bir kuleden yatay doğrultuda 30 m/s süratle atılan cisim için:\n\n" +
  "(a) uçuş süresini,\n(b) menzili,\n(c) yere çarpma süratini bulunuz.",
  "4 s · 120 m · 50 m/s",
  [["a", "Düşey hareket serbest düşme:  80 = ½·10·t²  →  t² = 16  →  t = 4 s"],
   ["b", "Yatayda sabit hız:  x = 30 · 4 = 120 m"],
   ["c", "vᵧ = g·t = 40 m/s, vₓ = 30 m/s  →  v = √(30² + 40²) = 50 m/s\nYerle yaptığı açı: tanθ = 40/30  →  θ ≈ 53°"]],
  "Klasik 3-4-5 üçgeni. Öğrenciye 'yatay hız 60 m/s olsaydı süre değişir miydi' diye sor: hayır, yalnızca menzil 240 m olurdu.",
  11, C.amber);

ornek(11, "Çözümlü örnek · eğik atış",
  "Yerden 50 m/s süratle, yatayla 53° açı yapacak şekilde atılan cisim için:\n\n" +
  "(a) tepe noktasına çıkma süresini,\n(b) maksimum yüksekliği,\n(c) menzili bulunuz.\n\n" +
  "(sin53° = 0,8 · cos53° = 0,6)",
  "4 s · 80 m · 240 m",
  [["1", "Bileşenler:  v₀ₓ = 50·0,6 = 30 m/s,  v₀ᵧ = 50·0,8 = 40 m/s"],
   ["a", "Tepede vᵧ = 0:  0 = 40 − 10·t  →  t = 4 s"],
   ["b", "h = v₀ᵧ² / (2g) = 1600 / 20 = 80 m"],
   ["c", "Uçuş süresi 2·4 = 8 s  →  R = 30 · 8 = 240 m\nKontrol: R = v₀²·sin2α/g = 2500·0,96/10 = 240 m ✓"]],
  "Önce bileşenleri yaz, sonra her şey tek boyutlu hâle gelir. Menzil formülünü ezberletmek yerine 'yatay hız × uçuş süresi' olarak kurdur.",
  12, C.blue);

/* ---------- 13 · hatalar ---------- */
s = T.light(p);
T.head(s, 12, "Sık yapılan hatalar", C.rose);
T.lede(s, "Sınavda puan kaybettiren altı klasik.");
const HATA = [
  ["Tepe noktada hız sıfırdır", "Sıfırlanan yalnızca vᵧ'dir; vₓ = v₀cosα devam eder."],
  ["Yatay hız düşme süresini etkiler", "Etkilemez. Süre yalnızca düşey harekete bağlıdır."],
  ["İvme yörüngeye teğettir", "Teğet olan hızdır; ivme her noktada düşeydir ve g'dir."],
  ["R = v₀²sin2α/g her zaman geçerli", "Yalnızca atış ve iniş aynı yükseklikteyse."],
  ["v = vₓ + vᵧ", "Doğrusu v = √(vₓ² + vᵧ²); vektörler skaler toplanmaz."],
  ["45° her koşulda en uzağa atar", "Yükseklikten atışta optimum açı 45°'nin altındadır."]
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
s.addNotes("Bu altı madde, konunun sınav yüzü. Her birini bir önceki slayttaki örneklerle eşleştir.");

/* ---------- 14 · özet ---------- */
s = T.dark(p);
s.addText("Özetle", { x: M + 0.25, y: 1.1, w: 6, h: 0.9, fontFace: F.head, fontSize: 40,
  bold: true, color: C.white, isTextBox: true, margin: 0 });
[["İki hareket, tek saat", "Yatayda sabit hız, düşeyde g ivmesi; ortak olan yalnızca zaman."],
 ["Bileşenlere ayır", "v₀ₓ = v₀cosα, v₀ᵧ = v₀sinα. Sonrası iki tek boyutlu problem."],
 ["Yörünge paraboldür", "y = x·tanα − g·x²/(2v₀²cos²α)"],
 ["45° en uzun menzil", "Tümler açılar aynı menzili verir, ama uçuş süreleri farklıdır."]
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
  { text: "Atış laboratuvarı, menzil–açı karşılaştırması ve hedef vurma oyunu:  ",
    options: { color: "AEBBD6" } },
  { text: "dersler.perinet.org/iki-boyutta-hareket.html",
    options: { color: C.limeBright, bold: true } }
], { x: M + 0.6, y: 6.35, w: 10.3, h: 0.62, valign: "middle", fontFace: F.body,
  fontSize: 13, isTextBox: true, margin: 0 });
s.addNotes("Kapanışta siteyi aç: 03 numaralı bölümde beş açıyı sırayla attırıp tümler açıları canlı göster.");

p.writeFile({ fileName: "/opt/dersler/dist/sunum/iki-boyutta-hareket.pptx" })
  .then(f => console.log("yazıldı:", f));
