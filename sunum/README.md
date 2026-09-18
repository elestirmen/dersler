# Sunumlar

Ders sayfalarıyla aynı paleti ve dili kullanan, 16:9 PowerPoint sunumları.
Her sunum 13–14 slayttır ve her slaytta konuşmacı notu vardır.

Çıktılar doğrudan yayınlanan köke, `dist/sunum/` altına yazılır; yani üretildiği
anda `dersler.perinet.org/sunum/...` adresinden indirilebilir. Ders sayfalarındaki
**Sunum (PPTX)** düğmesi ve giriş sayfasındaki *Sunumlar* bölümü buraya bakar.

| Dosya (`dist/sunum/`) | Konu |
|---|---|
| `serbest-dusme.pptx` | Serbest düşme — tanım, kütlenin sadeleşmesi, bağıntılar, grafikler, 1:3:5, düşey atış, limit hız, iki çözümlü örnek |
| `iki-boyutta-hareket.pptx` | İki boyutta sabit ivmeli hareket — bağımsızlık ilkesi, bileşenler, yatay/eğik atış, menzil–açı, dört grafik, yörünge denklemi, iki çözümlü örnek |
| `newton-yasalari.pptx` | Newton'un hareket yasaları — net kuvvet, üç yasa, serbest cisim diyagramı, sürtünme grafiği, asansör tablosu, üç çözümlü örnek |
| `surtunme-kuvveti.pptx` | Sürtünme kuvveti — statik/kinetik, f–F grafiği, μ tablosu, eğik düzlem, fren mesafesi eğrileri, üç çözümlü örnek |
| `limit-hiz.pptx` | Limit hız — hava direnci, denge tablosu, v–t doyma eğrisi, m ve A bağımlılığı, paraşüt eğrisi, üç çözümlü örnek |
| `cembersel-hareket.pptx` | Düzgün çembersel hareket — periyot/frekans, v ve a bağıntıları, merkezcil kuvvet tablosu, merkezkaç yanılgısı, viraj eğrileri, üç çözümlü örnek |
| `elektriksel-kuvvet.pptx` | Elektriksel kuvvet ve alan — yük, Coulomb yasası, F–r eğrisi, alan tanımı ve E–r eğrileri, alan çizgileri, paralel levhalar, üç çözümlü örnek |
| `manyetik-alan.pptx` | Manyetik alan ve kuvvet — tesla ölçeği, telin alanı ve B–r eğrisi, sağ el kuralları, F–α sinüs eğrisi, dairesel hareket, üç çözümlü örnek |
| `induksiyon-akimi.pptx` | İndüksiyon akımı — manyetik akı, Faraday yasası ve Φ–t eğrisi, Lenz yasası, hareketli çubuk, jeneratörde faz farkı, üç çözümlü örnek |
| `transformatorler.pptx` | Transformatörler — yapı ve çalışma ilkesi, V₂–N₂ doğrusu, güç korunumu tablosu, verim sütun grafiği, iletim kaybı eğrisi, üç çözümlü örnek |

Grafikler PowerPoint'in kendi grafik nesneleridir (resim değil), yani sunum
içinde düzenlenebilir.

## Yeniden üretmek

Dosyalar `pptxgenjs` ile üretilir; `.js` dosyaları tek kaynaktır, `.pptx`
çıktıları onlardan doğar. Depoda paket bağımlılığı tutulmaz:

```bash
npm install -g pptxgenjs
cd /opt/dersler/sunum
NODE_PATH=$(npm root -g) node serbest-dusme.js
NODE_PATH=$(npm root -g) node iki-boyutta-hareket.js
NODE_PATH=$(npm root -g) node newton-yasalari.js
NODE_PATH=$(npm root -g) node surtunme-kuvveti.js
NODE_PATH=$(npm root -g) node limit-hiz.js
NODE_PATH=$(npm root -g) node cembersel-hareket.js
NODE_PATH=$(npm root -g) node elektriksel-kuvvet.js
NODE_PATH=$(npm root -g) node manyetik-alan.js
NODE_PATH=$(npm root -g) node induksiyon-akimi.js
NODE_PATH=$(npm root -g) node transformatorler.js
```

`tema.js` ortak renkleri, yazı tiplerini ve kart/formül/başlık yardımcılarını
tutar; yeni bir sunum eklerken oradan başlanabilir.
