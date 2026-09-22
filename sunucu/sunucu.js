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
//   KAPI_PAROLA    ilk açılışta kullanılacak yönetici parolası (isteğe bağlı)

import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
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

// Ziyaretçinin elindeki erişim: yönetici her şeyi görür.
function erisim(yuk) {
  if (yuk?.tip === "yonetici") {
    return { rol: "yonetici", ad: "Yönetici", konular: TUM_SLUGLAR, indirme: true };
  }
  if (yuk?.tip === "ogrenci") {
    const kayit = depo.kodBul(yuk.kod);
    const durum = kodDurumu(kayit);
    if (!durum.tamam) return { rol: "yok", sebep: durum.sebep };
    return {
      rol: "ogrenci",
      kod: kayit.kod,
      ad: kayit.ad || kayit.kod,
      konular: kayit.konular.filter(konuVarMi),
      indirme: kayit.indirme !== false,
    };
  }
  return { rol: "yok", sebep: "yok" };
}

// "/a/../sunum/x.pptx" gibi yolları nginx'in sunacağı hâle indirger; aksi
// hâlde kapı başka bir yola bakarken nginx başka bir dosyayı verebilir.
function yoluDuzle(yol) {
  const yiginn = [];
  for (const parca of yol.split("/")) {
    if (!parca || parca === ".") continue;
    if (parca === "..") yiginn.pop();
    else yiginn.push(parca);
  }
  return `/${yiginn.join("/")}`;
}

// İstenen yol için karar: 204 geç, 401 giriş gerek, 403 yetki yok.
function yolKarari(hamYol, hak) {
  // nginx'in ~* eşleşmesi büyük/küçük harfe duyarsız; kapı daha gevşek davranıp
  // "/Mercekler.HTML" gibi bir yolu tanımaz duruma düşmemeli.
  const yol = yoluDuzle(hamYol).toLowerCase();
  const parcalar = yol.split("/").filter(Boolean);
  const dosya = parcalar[parcalar.length - 1] || "index.html";

  if (yol === "/" || ACIK_SAYFALAR.has(dosya)) return 204;

  if (dosya.endsWith(".html")) {
    const slug = dosya.slice(0, -5);
    if (!konuVarMi(slug)) return 204; // tanınmayan sayfa; 404'ü nginx versin
    if (hak.rol === "yok") return 401;
    return hak.konular.includes(slug) ? 204 : 403;
  }

  if (parcalar[0] === "sunum") {
    if (hak.rol === "yok") return 401;
    if (!hak.indirme) return 403;
    if (dosya.endsWith(".zip")) {
      // Toplu paket bütün desteleri taşır; ancak hepsi açıksa verilir.
      return TUM_SLUGLAR.every((s) => hak.konular.includes(s)) ? 204 : 403;
    }
    const slug = dosya.replace(/\.pptx$/i, "");
    if (!konuVarMi(slug)) return 204;
    return hak.konular.includes(slug) ? 204 : 403;
  }

  return 204;
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

async function kodKaydet(istek, cevap) {
  const veri = await govde(istek);
  if (!veri) return json(cevap, 400, { hata: "bicim" });

  const konular = Array.isArray(veri.konular) ? veri.konular.filter(konuVarMi) : [];
  const ad = String(veri.ad || "").trim().slice(0, 80);
  const bitis = /^\d{4}-\d{2}-\d{2}$/.test(veri.bitis || "") ? veri.bitis : null;
  const alanlar = {
    ad,
    konular,
    indirme: veri.indirme !== false,
    bitis,
    etkin: veri.etkin !== false,
  };

  const mevcut = veri.kod ? depo.kodBul(veri.kod) : null;
  if (mevcut) {
    Object.assign(mevcut, alanlar);
    depo.yaz();
    return json(cevap, 200, { tamam: true, kod: mevcut.kod });
  }

  let kod = kodTemizle(veri.kod);
  if (!kod) {
    do {
      kod = kodUret();
    } while (depo.kodBul(kod));
  } else if (depo.kodBul(kod)) {
    return json(cevap, 409, { hata: "kod-var" });
  }

  depo.kodEkle({
    kod,
    ...alanlar,
    olusturma: new Date().toISOString(),
    sonGiris: null,
    girisSayisi: 0,
  });
  json(cevap, 200, { tamam: true, kod });
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

// ------------------------------------------------------------------ yönlendirme

const sunucu = createServer(async (istek, cevap) => {
  let yol;
  try {
    yol = new URL(istek.url, "http://kapi").pathname;
  } catch {
    return bos(cevap, 400);
  }
  const yontem = istek.method || "GET";
  const yuk = oturum(istek);

  if (yontem === "POST" && !ayniKokenMi(istek)) {
    return json(cevap, 403, { hata: "koken" });
  }

  try {
    // nginx auth_request buraya sorar; gövde ve yanıt gövdesi yoktur.
    if (yol === "/yetki") {
      const ozgun = String(istek.headers["x-ozgun-uri"] || "/");
      let hedef;
      try {
        hedef = decodeURIComponent(new URL(ozgun, "http://kapi").pathname);
      } catch {
        hedef = "/";
      }
      return bos(cevap, yolKarari(hedef, erisim(yuk)));
    }

    // Ana sayfanın hangi konuları kilitli göstereceğini buradan öğrenir.
    if (yol === "/durum") {
      const hak = erisim(yuk);
      return json(cevap, 200, {
        rol: hak.rol,
        ad: hak.ad || null,
        kod: hak.kod || null,
        konular: hak.konular || [],
        indirme: Boolean(hak.indirme),
        toplu: Boolean(hak.indirme) && TUM_SLUGLAR.every((s) => (hak.konular || []).includes(s)),
      });
    }

    if (yol === "/giris") {
      if (yontem === "POST") return ogrenciGirisi(istek, cevap);
      return html(cevap, SAYFALAR.giris);
    }

    if (yol === "/cikis") {
      cevap.writeHead(302, { location: "/", "set-cookie": cerezSil(), "cache-control": "no-store" });
      return cevap.end();
    }

    if (yol === "/yonetim" || yol === "/yonetim/") return html(cevap, SAYFALAR.yonetim);

    if (yol === "/yonetim/giris" && yontem === "POST") return yoneticiGirisi(istek, cevap);

    if (yol === "/yonetim/cikis" && yontem === "POST") {
      return json(cevap, 200, { tamam: true }, cerezSil());
    }

    // Buradan sonrası yalnızca yöneticiye.
    if (yol.startsWith("/yonetim/")) {
      if (yuk?.tip !== "yonetici") return json(cevap, 401, { hata: "yetki" });

      if (yol === "/yonetim/veri" && yontem === "GET") {
        return json(cevap, 200, { uniteler: UNITELER, kodlar: depo.veri.kodlar });
      }
      if (yol === "/yonetim/kod" && yontem === "POST") return kodKaydet(istek, cevap);
      if (yol === "/yonetim/kod-sil" && yontem === "POST") {
        const veri = await govde(istek);
        return json(cevap, 200, { tamam: depo.kodSil(kodTemizle(veri?.kod)) });
      }
      if (yol === "/yonetim/parola" && yontem === "POST") return parolaDegistir(istek, cevap);
      return json(cevap, 404, { hata: "yok" });
    }

    bos(cevap, 404);
  } catch (hata) {
    console.error("[kapı] istek hatası:", hata.message);
    if (!cevap.headersSent) bos(cevap, 500);
    else cevap.end();
  }
});

sunucu.listen(PORT, () => {
  console.log(`[kapı] ${PORT} portunda; veri: ${VERI_YOLU}; ${depo.veri.kodlar.length} ders kodu`);
});

for (const isaret of ["SIGTERM", "SIGINT"]) {
  process.on(isaret, () => sunucu.close(() => process.exit(0)));
}
