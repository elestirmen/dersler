// Veri deposu — tek bir JSON dosyası, bellekte tutulur, atomik yazılır.
//
// Veri hacmi bir avuç ders kodundan ibaret olduğu için veritabanı yok; dosya
// geçici bir ada yazılıp rename ile yerine konur, böylece yarım dosya kalmaz.

import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Her çağrıda taze nesne: varsayılanlar paylaşılıp yanlışlıkla değişmesin.
function bos() {
  return {
    surum: 1,
    gizliAnahtar: "",
    yoneticiParolaOzeti: "",
    // Kod gerekmeden herkesin gördüğü konular; indirme ayrı bir izin.
    herkeseAcik: { konular: [], indirme: false },
    kodlar: [],
  };
}

export class Depo {
  constructor(yol) {
    this.yol = yol;
    this.veri = this.#oku();
  }

  #oku() {
    let ham;
    try {
      ham = JSON.parse(readFileSync(this.yol, "utf8"));
    } catch (hata) {
      if (hata.code !== "ENOENT") {
        throw new Error(`Veri dosyası okunamadı (${this.yol}): ${hata.message}`);
      }
      return bos();
    }
    const varsayilan = bos();
    return {
      ...varsayilan,
      ...ham,
      herkeseAcik: { ...varsayilan.herkeseAcik, ...(ham.herkeseAcik || {}) },
      kodlar: Array.isArray(ham.kodlar) ? ham.kodlar : [],
    };
  }

  yaz() {
    mkdirSync(dirname(this.yol), { recursive: true });
    const gecici = `${this.yol}.${process.pid}.gecici`;
    writeFileSync(gecici, JSON.stringify(this.veri, null, 2) + "\n", { mode: 0o600 });
    renameSync(gecici, this.yol);
  }

  // İlk açılışta eksik olanları tamamlar; bir şey üretildiyse true döner.
  hazirla() {
    let degisti = false;
    if (!this.veri.gizliAnahtar) {
      this.veri.gizliAnahtar = randomBytes(32).toString("base64url");
      degisti = true;
    }
    if (degisti) this.yaz();
    return degisti;
  }

  kodBul(kod) {
    const aranan = String(kod || "").trim().toUpperCase();
    if (!aranan) return null;
    return this.veri.kodlar.find((k) => k.kod === aranan) || null;
  }

  kodEkle(kayit) {
    this.veri.kodlar.push(kayit);
    this.yaz();
  }

  kodSil(kod) {
    const oncesi = this.veri.kodlar.length;
    this.veri.kodlar = this.veri.kodlar.filter((k) => k.kod !== kod);
    if (this.veri.kodlar.length === oncesi) return false;
    this.yaz();
    return true;
  }
}

// Karıştırılması kolay harfler (0/O, 1/I/L) dışarıda bırakılır; kod tahtaya
// yazıldığında veya sesli okunduğunda yanlış anlaşılmasın.
const ALFABE = "ACDEFGHJKMNPRTUVWXYZ2346789";

export function kodUret(onek = "DRS") {
  const govde = Array.from(randomBytes(6))
    .map((b) => ALFABE[b % ALFABE.length])
    .join("");
  return `${onek}-${govde}`;
}
