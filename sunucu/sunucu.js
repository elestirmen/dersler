// Dersler kapısı — erişim denetimi yapan küçük HTTP servisi.
//
// Statik dosyaları hâlâ nginx sunar; bu servis yalnızca "bu ziyaretçi bu
// dosyayı görebilir mi?" sorusuna cevap verir (nginx auth_request), giriş ve
// yönetim sayfalarını üretir. Bağımlılık yok: sadece Node standart kütüphanesi.
//
//   node sunucu/sunucu.js
//
// Ortam değişkenleri:
//   KAPI_PORT      dinlenecek port (varsayılan 8080)
//   KAPI_VERI      veri dosyası (varsayılan /veri/veri.json)
//   KAPI_KOK       yayınlanan dizin, salt okunur (varsayılan /dist); kataloğa
//                  girmemiş bir dosyanın gerçekten var olup olmadığını anlamak için
//   KAPI_PAROLA    ilk açılışta kullanılacak yönetici parolası (isteğe bağlı)

import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ACIK_SAYFALAR, TUM_SLUGLAR, UNITELER, konuVarMi } from "./konular.js";
import { Depo, kodUret } from "./depo.js";
import {
  CEREZ_ADI,
  DenemeSayaci,
  cerezKur,
  cerezSil,
  cerezleriAyristir,
  coz,
  imzala,
  parolaDogru,
  parolaOzetle,
} from "./kimlik.js";

const BURASI = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.KAPI_PORT || 8080);
const VERI_YOLU = process.env.KAPI_VERI || "/veri/veri.json";
const KOK = process.env.KAPI_KOK || "/dist";

// Kök bağlanmamışsa "dosya yok" cevabına güvenilemez: o zaman kataloğa girmemiş
// her dosya kapalı tutulur (yanlış yapılandırma kapıyı açmasın, kapatsın).
const KOK_HAZIR = existsSync(join(KOK, "index.html"));

const OGRENCI_OMUR_GUN = 30;
const YONETICI_OMUR_GUN = 0.5;

const depo = new Depo(VERI_YOLU);
depo.hazirla();
ilkParolayiKur();

const kodSayaci = new DenemeSayaci(12, 10 * 60 * 1000);
const parolaSayaci = new DenemeSayaci(6, 15 * 60 * 1000);

const SAYFALAR = {
  giris: readFileSync(join(BURASI, "sayfa", "giris.html"), "utf8"),
  yonetim: readFileSync(join(BURASI, "sayfa", "yonetim.html"), "utf8"),
  // QR kodu için Kazuhiko Arase'nin qrcode-generator'ı (MIT), değiştirilmeden.
  qrcode: readFileSync(join(BURASI, "sayfa", "qrcode.js"), "utf8"),
};

// ---------------------------------------------------------------- yardımcılar

function ilkParolayiKur() {
  if (depo.veri.yoneticiParolaOzeti) return;
  const parola = process.env.KAPI_PAROLA || kodUret("YON").replace("-", "");
  depo.veri.yoneticiParolaOzeti = parolaOzetle(parola);
  depo.yaz();
  if (!process.env.KAPI_PAROLA) {
    const not = join(dirname(VERI_YOLU), "ilk-parola.txt");
    try {
      writeFileSync(not, `${parola}\n`, { mode: 0o600 });
    } catch {
      /* yazılamazsa günlükteki satır yeter */
    }
    console.log(`[kapı] yönetici parolası üretildi: ${parola}  (ayrıca ${not})`);
  }
}

function istemci(istek) {
  // Cloudflare bu başlığı kendisi koyar ve istemcinin gönderdiğini ezer; XFF
  // zincirinin başı ise uydurulabilir. Deneme sayacı için önce buna bakılır.
  const cf = istek.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf) return cf.trim();
  const iletilen = istek.headers["x-forwarded-for"];
  if (typeof iletilen === "string" && iletilen) return iletilen.split(",")[0].trim();
  return istek.socket.remoteAddress || "?";
}

// Durum değiştiren istekler yalnızca sitenin kendi sayfalarından gelebilir.
// Çerez zaten SameSite=Lax; bu, başlık gönderen eski tarayıcılar için ikinci
// kat. Origin yoksa (curl, betik) istek geçer — tarayıcı saldırısı değildir.
function ayniKokenMi(istek) {
  const koken = istek.headers.origin;
  if (!koken) return true;
  try {
    return new URL(koken).host === istek.headers.host;
  } catch {
    return false;
  }
}

function oturum(istek) {
  const cerez = cerezleriAyristir(istek.headers.cookie)[CEREZ_ADI];
  return coz(cerez, depo.veri.gizliAnahtar);
}

function govde(istek, sinir = 16 * 1024) {
  return new Promise((coz_, hata) => {
    let veri = "";
    istek.on("data", (parca) => {
      veri += parca;
      if (veri.length > sinir) {
        hata(new Error("gövde çok büyük"));
        istek.destroy();
      }
    });
    istek.on("end", () => {
      if (!veri) return coz_({});
      try {
        coz_(JSON.parse(veri));
      } catch {
        coz_(null);
      }
    });
    istek.on("error", hata);
  });
}

function json(cevap, kod, veri, cerez) {
  const basliklar = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
  if (cerez) basliklar["set-cookie"] = cerez;
  cevap.writeHead(kod, basliklar);
  cevap.end(JSON.stringify(veri));
}

function html(cevap, govdeMetni) {
  cevap.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex",
  });
  cevap.end(govdeMetni);
}

function bos(cevap, kod) {
  cevap.writeHead(kod, { "cache-control": "no-store" });
  cevap.end();
}

// Katalog sırasında, tekrarsız.
function sirala(liste) {
  const kume = new Set(liste);
  return TUM_SLUGLAR.filter((s) => kume.has(s));
}

// ------------------------------------------------------------------ yetkiler

// Bir ders kodunun bugün geçerli olup olmadığı. Sebep, günlükte ve giriş
// ekranında ne yazılacağını belirler.
function kodDurumu(kayit) {
  if (!kayit) return { tamam: false, sebep: "yok" };
  if (kayit.etkin === false) return { tamam: false, sebep: "kapali" };
  if (kayit.bitis) {
    // Bitiş günü dahil: o günün sonuna kadar geçerli.
    const son = new Date(`${kayit.bitis}T23:59:59`);
    if (!Number.isNaN(son.valueOf()) && son.valueOf() < Date.now()) {
      return { tamam: false, sebep: "suresi-doldu" };
    }
  }
  return { tamam: true, sebep: "" };
}

// Kod gerekmeden herkesin elindeki hak.
function herkesinHakki() {
  const h = depo.veri.herkeseAcik || {};
  const konular = sirala(Array.isArray(h.konular) ? h.konular.filter(konuVarMi) : []);
  return { konular, indirilebilir: h.indirme === true ? konular : [] };
}

// Görülebilir ve indirilebilir konu kümelerinden erişim kaydı kurar. İndirme
// hakkı görme hakkının alt kümesidir; toplu paket ancak hepsi indirilebilirse.
function hakKur(temel, konular, indirilebilir) {
  const gor = sirala(konular);
  const indir = sirala(indirilebilir).filter((s) => gor.includes(s));
  return { ...temel, konular: gor, indirilebilir: indir, toplu: indir.length === TUM_SLUGLAR.length };
}

// Ziyaretçinin elindeki erişim: herkese açık konular + (varsa) kodunun
// konuları. Yönetici her şeyi görür.
function erisim(yuk) {
  const herkes = herkesinHakki();
  if (yuk?.tip === "yonetici") {
    return hakKur({ rol: "yonetici", ad: "Yönetici" }, TUM_SLUGLAR, TUM_SLUGLAR);
  }
  if (yuk?.tip === "ogrenci") {
    const kayit = depo.kodBul(yuk.kod);
    const durum = kodDurumu(kayit);
    if (durum.tamam) {
      const kendi = kayit.konular.filter(konuVarMi);
      return hakKur(
        { rol: "ogrenci", kod: kayit.kod, ad: kayit.ad || kayit.kod },
        [...herkes.konular, ...kendi],
        [...herkes.indirilebilir, ...(kayit.indirme !== false ? kendi : [])],
      );
    }
    // Elinde artık geçmeyen bir kod var: giriş ekranı nedenini söyleyebilsin.
    const sebep = kayit ? durum.sebep : "silindi";
    return hakKur({ rol: "yok", sebep }, herkes.konular, herkes.indirilebilir);
  }
  return hakKur({ rol: "yok", sebep: null }, herkes.konular, herkes.indirilebilir);
}

// "/a/../sunum/x.pptx" gibi yolları nginx'in sunacağı hâle indirger; aksi
// hâlde kapı başka bir yola bakarken nginx başka bir dosyayı verebilir.
function yoluDuzle(yol) {
  const yigin = [];
  for (const parca of yol.split("/")) {
    if (!parca || parca === ".") continue;
    if (parca === "..") yigin.pop();
    else yigin.push(parca);
  }
  return `/${yigin.join("/")}`;
}

// Kataloğa girmemiş bir dosya gerçekten yayında mı? Yoksa kapı geçirir ve
// 404'ü nginx verir; varsa kapalı tutulur. Dizin okunamıyorsa "var" sayılır:
// şüphede kapı kapalı kalır.
function dosyaVarMi(duzYol) {
  if (!KOK_HAZIR) return true;
  try {
    return statSync(join(KOK, duzYol)).isFile();
  } catch (hata) {
    return hata.code !== "ENOENT" && hata.code !== "ENOTDIR";
  }
}

const uyarilanlar = new Set();
function katalogdisi(duzYol) {
  if (!uyarilanlar.has(duzYol)) {
    uyarilanlar.add(duzYol);
    console.warn(`[kapı] konular.js'te olmayan dosya kapalı tutuldu: ${duzYol}`);
  }
}

// İstenen yol için karar: 204 geç, 401 giriş gerek, 403 yetki yok.
function yolKarari(hamYol, hak) {
  if (hamYol === null) return 403; // çözülemeyen yol: şüphede kapalı
  const duz = yoluDuzle(hamYol);
  // nginx'in ~* eşleşmesi büyük/küçük harfe duyarsız; kapı daha gevşek davranıp
  // "/Mercekler.HTML" gibi bir yolu tanımaz duruma düşmemeli.
  const yol = duz.toLowerCase();
  const parcalar = yol.split("/").filter(Boolean);
  const dosya = parcalar[parcalar.length - 1] || "index.html";

  if (parcalar.length <= 1 && (yol === "/" || ACIK_SAYFALAR.has(dosya))) return 204;
  if (hak.rol === "yonetici") return 204;

  const reddet = hak.rol === "yok" ? 401 : 403;

  if (parcalar[0] === "sunum") {
    if (parcalar.length === 2 && dosya.endsWith(".zip")) return hak.toplu ? 204 : reddet;
    const slug = dosya.endsWith(".pptx") ? dosya.slice(0, -5) : "";
    if (parcalar.length === 2 && konuVarMi(slug)) return hak.indirilebilir.includes(slug) ? 204 : reddet;
  } else if (dosya.endsWith(".html")) {
    const slug = dosya.slice(0, -5);
    if (parcalar.length === 1 && konuVarMi(slug)) return hak.konular.includes(slug) ? 204 : reddet;
  } else {
    return 204; // korunan location'lar yalnızca .html ve /sunum/ için sorar
  }

  if (!dosyaVarMi(duz)) return 204;
  katalogdisi(duz);
  return reddet;
}

// -------------------------------------------------------------------- uçlar

async function ogrenciGirisi(istek, cevap) {
  const adres = istemci(istek);
  if (kodSayaci.asildiMi(adres)) return json(cevap, 429, { hata: "cok-deneme" });

  const veri = await govde(istek);
  const kayit = depo.kodBul(veri?.kod);
  const durum = kodDurumu(kayit);
  if (!durum.tamam) {
    kodSayaci.basarisiz(adres);
    return json(cevap, 401, { hata: durum.sebep });
  }

  kodSayaci.basarili(adres);
  kayit.sonGiris = new Date().toISOString();
  kayit.girisSayisi = (kayit.girisSayisi || 0) + 1;
  depo.yaz();

  const jeton = imzala(
    { tip: "ogrenci", kod: kayit.kod, sona: Date.now() + OGRENCI_OMUR_GUN * 864e5 },
    depo.veri.gizliAnahtar,
  );
  json(cevap, 200, { tamam: true, ad: kayit.ad || kayit.kod }, cerezKur(jeton, OGRENCI_OMUR_GUN));
}

async function yoneticiGirisi(istek, cevap) {
  const adres = istemci(istek);
  if (parolaSayaci.asildiMi(adres)) return json(cevap, 429, { hata: "cok-deneme" });

  const veri = await govde(istek);
  if (!parolaDogru(String(veri?.parola || ""), depo.veri.yoneticiParolaOzeti)) {
    parolaSayaci.basarisiz(adres);
    return json(cevap, 401, { hata: "parola" });
  }

  parolaSayaci.basarili(adres);
  const jeton = imzala(
    { tip: "yonetici", sona: Date.now() + YONETICI_OMUR_GUN * 864e5 },
    depo.veri.gizliAnahtar,
  );
  json(cevap, 200, { tamam: true }, cerezKur(jeton, YONETICI_OMUR_GUN));
}

function kodTemizle(ham) {
  return String(ham || "")
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 32);
}

// Elle verilen kod: 6–32 karakter, harf/rakam ile başlayıp biter. Kısa bir kod
// deneme sınırına rağmen tahmin edilebilir olurdu.
const KOD_BICIMI = /^[A-Z0-9][A-Z0-9-]{4,30}[A-Z0-9]$/;

// Panelden gelen alanları doğrular. "kismi" iken yalnızca gönderilen alanlar
// döner (güncelleme), değilse eksikler varsayılanla dolar (yeni kod).
function alanlariAyikla(veri, kismi) {
  const alanlar = {};
  const var_ = (ad) => Object.prototype.hasOwnProperty.call(veri, ad);

  if (!kismi || var_("ad")) alanlar.ad = String(veri.ad || "").trim().slice(0, 80);
  if (!kismi || var_("konular")) {
    alanlar.konular = sirala(Array.isArray(veri.konular) ? veri.konular.filter(konuVarMi) : []);
    if (alanlar.konular.length === 0) return { hata: "konu-yok" };
  }
  if (!kismi || var_("indirme")) alanlar.indirme = veri.indirme !== false;
  if (!kismi || var_("etkin")) alanlar.etkin = veri.etkin !== false;
  if (!kismi || var_("bitis")) {
    const b = veri.bitis;
    if (b === null || b === undefined || b === "") alanlar.bitis = null;
    else if (/^\d{4}-\d{2}-\d{2}$/.test(b) && !Number.isNaN(new Date(`${b}T00:00:00`).valueOf())) alanlar.bitis = b;
    else return { hata: "tarih" };
  }
  return { alanlar };
}

async function kodEkle(istek, cevap) {
  const veri = await govde(istek);
  if (!veri) return json(cevap, 400, { hata: "bicim" });
  const { alanlar, hata } = alanlariAyikla(veri, false);
  if (hata) return json(cevap, 400, { hata });

  let kod = kodTemizle(veri.kod);
  if (!kod) {
    do {
      kod = kodUret();
    } while (depo.kodBul(kod));
  } else if (!KOD_BICIMI.test(kod)) {
    return json(cevap, 400, { hata: "kod-gecersiz" });
  } else if (depo.kodBul(kod)) {
    // Var olan kod sessizce ezilmesin: yeni kod oluşturmak güncellemek değildir.
    return json(cevap, 409, { hata: "kod-var" });
  }

  const kayit = { kod, ...alanlar, olusturma: new Date().toISOString(), sonGiris: null, girisSayisi: 0 };
  depo.kodEkle(kayit);
  json(cevap, 200, { tamam: true, kayit });
}

async function kodGuncelle(istek, cevap) {
  const veri = await govde(istek);
  if (!veri) return json(cevap, 400, { hata: "bicim" });
  const kayit = depo.kodBul(veri.kod);
  if (!kayit) return json(cevap, 404, { hata: "kod-yok" });
  const { alanlar, hata } = alanlariAyikla(veri, true);
  if (hata) return json(cevap, 400, { hata });
  Object.assign(kayit, alanlar);
  depo.yaz();
  json(cevap, 200, { tamam: true, kayit });
}

async function herkeseAcikKaydet(istek, cevap) {
  const veri = await govde(istek);
  if (!veri) return json(cevap, 400, { hata: "bicim" });
  depo.veri.herkeseAcik = {
    konular: sirala(Array.isArray(veri.konular) ? veri.konular.filter(konuVarMi) : []),
    indirme: veri.indirme === true,
  };
  depo.yaz();
  json(cevap, 200, { tamam: true, herkeseAcik: depo.veri.herkeseAcik });
}

async function parolaDegistir(istek, cevap) {
  const veri = await govde(istek);
  if (!parolaDogru(String(veri?.eski || ""), depo.veri.yoneticiParolaOzeti)) {
    return json(cevap, 401, { hata: "parola" });
  }
  const yeni = String(veri?.yeni || "");
  if (yeni.length < 8) return json(cevap, 400, { hata: "kisa" });
  depo.veri.yoneticiParolaOzeti = parolaOzetle(yeni);
  depo.yaz();
  json(cevap, 200, { tamam: true });
}

// Ana sayfa ve konu sayfaları neyi kilitli göstereceğini buradan öğrenir.
// Yönetici ?onizleme=herkes ya da ?onizleme=KOD ile başkasının gözünden bakar.
function durumCevabi(yuk, istenen) {
  let hak = erisim(yuk);
  let onizleme = null;
  if (istenen && yuk?.tip === "yonetici") {
    if (istenen === "herkes") {
      hak = erisim(null);
      onizleme = { tur: "herkes" };
    } else {
      const kayit = depo.kodBul(istenen);
      if (kayit) {
        hak = erisim({ tip: "ogrenci", kod: kayit.kod });
        onizleme = { tur: "kod", kod: kayit.kod, ad: kayit.ad || kayit.kod, sebep: kodDurumu(kayit).sebep || null };
      }
    }
  }
  return {
    rol: hak.rol,
    ad: hak.ad || null,
    kod: hak.kod || null,
    konular: hak.konular,
    indirilebilir: hak.indirilebilir,
    toplu: hak.toplu,
    herkeseAcik: herkesinHakki().konular,
    sebep: hak.sebep || null,
    onizleme,
  };
}

// ------------------------------------------------------------------ yönlendirme

async function yonlendir(istek, cevap) {
  let adres;
  try {
    adres = new URL(istek.url, "http://kapi");
  } catch {
    return bos(cevap, 400);
  }
  const yol = adres.pathname;
  const yontem = istek.method || "GET";

  if (yontem === "POST" && !ayniKokenMi(istek)) {
    return json(cevap, 403, { hata: "koken" });
  }

  const yuk = oturum(istek);

  // nginx auth_request buraya sorar; gövde ve yanıt gövdesi yoktur.
  if (yol === "/yetki") {
    const ozgun = String(istek.headers["x-ozgun-uri"] || "/");
    let hedef;
    try {
      hedef = decodeURIComponent(new URL(ozgun, "http://kapi").pathname);
    } catch {
      hedef = null;
    }
    return bos(cevap, yolKarari(hedef, erisim(yuk)));
  }

  if (yol === "/durum") return json(cevap, 200, durumCevabi(yuk, adres.searchParams.get("onizleme")));

  if (yol === "/giris") {
    if (yontem === "POST") return ogrenciGirisi(istek, cevap);
    return html(cevap, SAYFALAR.giris);
  }

  if (yol === "/cikis") {
    cevap.writeHead(302, { location: "/", "set-cookie": cerezSil(), "cache-control": "no-store" });
    return cevap.end();
  }

  if (yol === "/yonetim" || yol === "/yonetim/") return html(cevap, SAYFALAR.yonetim);

  if (yol === "/yonetim/qrcode.js") {
    cevap.writeHead(200, {
      "content-type": "text/javascript; charset=utf-8",
      "cache-control": "public, max-age=86400",
    });
    return cevap.end(SAYFALAR.qrcode);
  }

  if (yol === "/yonetim/giris" && yontem === "POST") return yoneticiGirisi(istek, cevap);

  if (yol === "/yonetim/cikis" && yontem === "POST") {
    return json(cevap, 200, { tamam: true }, cerezSil());
  }

  // Buradan sonrası yalnızca yöneticiye.
  if (yol.startsWith("/yonetim/")) {
    if (yuk?.tip !== "yonetici") return json(cevap, 401, { hata: "yetki" });

    if (yol === "/yonetim/veri" && yontem === "GET") {
      return json(cevap, 200, {
        uniteler: UNITELER,
        kodlar: depo.veri.kodlar,
        herkeseAcik: { konular: herkesinHakki().konular, indirme: depo.veri.herkeseAcik?.indirme === true },
      });
    }
    if (yontem === "POST") {
      if (yol === "/yonetim/kod") return kodEkle(istek, cevap);
      if (yol === "/yonetim/kod-guncelle") return kodGuncelle(istek, cevap);
      if (yol === "/yonetim/kod-sil") {
        const veri = await govde(istek);
        return json(cevap, 200, { tamam: depo.kodSil(kodTemizle(veri?.kod)) });
      }
      if (yol === "/yonetim/herkese-acik") return herkeseAcikKaydet(istek, cevap);
      if (yol === "/yonetim/parola") return parolaDegistir(istek, cevap);
    }
    return json(cevap, 404, { hata: "yok" });
  }

  bos(cevap, 404);
}

// Bütün istek tek bir try içinde: bir istekteki beklenmedik hata yalnızca o
// isteği 500'e düşürür, süreci değil.
const sunucu = createServer(async (istek, cevap) => {
  try {
    await yonlendir(istek, cevap);
  } catch (hata) {
    console.error("[kapı] istek hatası:", hata.message);
    if (!cevap.headersSent) bos(cevap, 500);
    else cevap.end();
  }
});

// Son emniyet: gözden kaçan bir söz reddi süreci düşürmesin, günlüğe düşsün.
process.on("unhandledRejection", (hata) => {
  console.error("[kapı] yakalanmamış hata:", hata?.stack || hata);
});

sunucu.listen(PORT, () => {
  console.log(`[kapı] ${PORT} portunda; veri: ${VERI_YOLU}; kök: ${KOK}; ${depo.veri.kodlar.length} ders kodu`);
  if (!KOK_HAZIR) {
    console.warn(`[kapı] UYARI: ${KOK}/index.html okunamıyor; kataloğa girmemiş her dosya kapalı tutulacak`);
  }
});

for (const isaret of ["SIGTERM", "SIGINT"]) {
  process.on(isaret, () => sunucu.close(() => process.exit(0)));
}
