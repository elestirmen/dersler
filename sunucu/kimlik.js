// Oturum ve parola işleri.
//
// Oturum sunucuda tutulmaz: çerezin içeriği HMAC ile imzalanır, doğrulama
// imzayı yeniden hesaplamaktan ibarettir. Böylece servis yeniden başlayınca
// kimse dışarı düşmez ve bellekte oturum tablosu taşımaya gerek kalmaz.

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const CEREZ_ADI = "dersler_oturum";

function esit(a, b) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function imzala(yuk, anahtar) {
  const govde = Buffer.from(JSON.stringify(yuk)).toString("base64url");
  const imza = createHmac("sha256", anahtar).update(govde).digest("base64url");
  return `${govde}.${imza}`;
}

export function coz(jeton, anahtar) {
  if (typeof jeton !== "string" || !jeton.includes(".")) return null;
  const [govde, imza] = jeton.split(".", 2);
  const beklenen = createHmac("sha256", anahtar).update(govde).digest("base64url");
  if (!imza || !esit(imza, beklenen)) return null;
  try {
    const yuk = JSON.parse(Buffer.from(govde, "base64url").toString("utf8"));
    if (typeof yuk?.sona === "number" && yuk.sona < Date.now()) return null;
    return yuk;
  } catch {
    return null;
  }
}

// Bozuk yüzde kodlaması (ör. "%E0%A4%A") decodeURIComponent'ı patlatır; tek bir
// kötü başlık süreci düşürmesin diye o değer yok sayılır.
export function cerezleriAyristir(baslik) {
  const sonuc = {};
  if (typeof baslik !== "string" || !baslik) return sonuc;
  for (const parca of baslik.split(";")) {
    const i = parca.indexOf("=");
    if (i < 0) continue;
    try {
      sonuc[parca.slice(0, i).trim()] = decodeURIComponent(parca.slice(i + 1).trim());
    } catch {
      /* bozuk değer: yok say */
    }
  }
  return sonuc;
}

export function cerezKur(deger, omurGun) {
  const yas = Math.round(omurGun * 24 * 60 * 60);
  return `${CEREZ_ADI}=${encodeURIComponent(deger)}; Path=/; Max-Age=${yas}; HttpOnly; SameSite=Lax; Secure`;
}

export function cerezSil() {
  return `${CEREZ_ADI}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`;
}

// ---- parola ----

export function parolaOzetle(parola) {
  const tuz = randomBytes(16);
  const ozet = scryptSync(parola, tuz, 64);
  return `scrypt$${tuz.toString("base64url")}$${ozet.toString("base64url")}`;
}

export function parolaDogru(parola, kayit) {
  if (typeof kayit !== "string" || !kayit.startsWith("scrypt$")) return false;
  const [, tuz, ozet] = kayit.split("$");
  try {
    return esit(scryptSync(parola, Buffer.from(tuz, "base64url"), 64), Buffer.from(ozet, "base64url"));
  } catch {
    return false;
  }
}

// ---- deneme sınırı ----
//
// Kod ve parola denemeleri kaba kuvvetle taranmasın diye adres başına sayılır.
// Sayaçlar bellekte; servis yeniden başlayınca sıfırlanır, bu kadarı yeter.

export class DenemeSayaci {
  constructor(sinir, pencereMs) {
    this.sinir = sinir;
    this.pencereMs = pencereMs;
    this.kayitlar = new Map();
  }

  #temizle(simdi) {
    for (const [anahtar, kayit] of this.kayitlar) {
      if (kayit.sifirlanma <= simdi) this.kayitlar.delete(anahtar);
    }
  }

  asildiMi(anahtar) {
    const simdi = Date.now();
    this.#temizle(simdi);
    const kayit = this.kayitlar.get(anahtar);
    return Boolean(kayit && kayit.sayi >= this.sinir);
  }

  basarisiz(anahtar) {
    const simdi = Date.now();
    const kayit = this.kayitlar.get(anahtar);
    if (!kayit || kayit.sifirlanma <= simdi) {
      this.kayitlar.set(anahtar, { sayi: 1, sifirlanma: simdi + this.pencereMs });
    } else {
      kayit.sayi += 1;
    }
  }

  basarili(anahtar) {
    this.kayitlar.delete(anahtar);
  }
}
