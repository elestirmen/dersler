// Konu kataloğu — kapının tanıdığı tek gerçek liste.
//
// Sıra ve adlar dist/index.html ile birebir aynıdır; yeni bir konu eklenince
// buraya da eklenmelidir, yoksa kapı o sayfayı tanımaz ve kimseye açılmaz.

export const UNITELER = [
  {
    kod: "kuvvet-ve-hareket",
    ad: "Kuvvet ve Hareket",
    konular: [
      { slug: "serbest-dusme", ad: "Serbest düşme" },
      { slug: "iki-boyutta-hareket", ad: "İki boyutta sabit ivmeli hareket" },
      { slug: "newton-yasalari", ad: "Newton'un hareket yasaları" },
      { slug: "surtunme-kuvveti", ad: "Sürtünme kuvveti" },
      { slug: "limit-hiz", ad: "Limit hız" },
      { slug: "cembersel-hareket", ad: "Düzgün çembersel hareket" },
    ],
  },
  {
    kod: "elektrik-ve-manyetizma",
    ad: "Elektrik ve Manyetizma",
    konular: [
      { slug: "elektriksel-kuvvet", ad: "Elektriksel kuvvet ve elektriksel alan" },
      { slug: "manyetik-alan", ad: "Manyetik alan ve manyetik kuvvet" },
      { slug: "induksiyon-akimi", ad: "İndüksiyon akımı" },
      { slug: "transformatorler", ad: "Transformatörler" },
    ],
  },
  {
    kod: "optik",
    ad: "Optik",
    konular: [
      { slug: "isik-siddeti", ad: "Işık şiddeti, ışık akısı ve aydınlanma" },
      { slug: "duzlem-aynalar", ad: "Düzlem aynalar" },
      { slug: "kuresel-aynalar", ad: "Küresel aynalar" },
      { slug: "kirilma", ad: "Kırılma" },
      { slug: "gorunur-derinlik", ad: "Görünür derinlik" },
      { slug: "fiber-optik", ad: "Fiber optik" },
      { slug: "prizmalar", ad: "Prizmalar" },
      { slug: "mercekler", ad: "Mercekler" },
    ],
  },
];

// Düz liste: ["serbest-dusme", "iki-boyutta-hareket", ...]
export const TUM_SLUGLAR = UNITELER.flatMap((u) => u.konular.map((k) => k.slug));

// Kapı dışında kalan, herkese açık sayfalar.
export const ACIK_SAYFALAR = new Set(["index.html", "404.html"]);

export function konuVarMi(slug) {
  return TUM_SLUGLAR.includes(slug);
}
