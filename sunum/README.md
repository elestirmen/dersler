# Sunumlar

Ders sayfalarıyla aynı paleti ve dili kullanan, 16:9 PowerPoint sunumları.
Her sunum 11–14 slayttır ve her slaytta konuşmacı notu vardır.

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
| `isik-siddeti.pptx` | Işık şiddeti, akı ve aydınlanma — üç büyüklük tablosu, katı açı, ters kare ve cosθ eğrileri, günlük değerler, üç çözümlü örnek |
| `duzlem-aynalar.pptx` | Düzlem aynalar — yansıma yasası, görüntü özellikleri, hareket ve 2α dönmesi, iki ayna tablosu, boy aynası, üç çözümlü örnek |
| `kuresel-aynalar.pptx` | Küresel aynalar — temel kavramlar, asal ışınlar, beş durum tablosu, b–a eğrisi, kullanım alanları, üç çözümlü örnek |
| `kirilma.pptx` | Kırılma — indis tablosu, Snell eğrileri, değişen/değişmeyen tablosu, tam yansıma, günlük örnekler, üç çözümlü örnek |
| `gorunur-derinlik.pptx` | Görünür derinlik — dört adımlık açıklama, h′–n eğrisi, sıvı tablosu, sudan havaya bakış, cam levha, üç çözümlü örnek |
| `fiber-optik.pptx` | Fiber optik — yapı ve ilke, kabul açısı eğrisi, sinyal süresi tablosu, kayıplar ve bakır karşılaştırması, üç çözümlü örnek |
| `prizmalar.pptx` | Prizmalar — sapma açısı, δ–i eğrisi ve en küçük sapma, dispersiyon tablosu, tam yansımalı prizma, gökkuşağı eğrisi, üç çözümlü örnek |
| `mercekler.pptx` | Mercekler — mercek türleri, asal ışınlar, beş durum tablosu, b–a eğrisi, göz kusurları, üç çözümlü örnek |

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
NODE_PATH=$(npm root -g) node isik-siddeti.js
NODE_PATH=$(npm root -g) node duzlem-aynalar.js
NODE_PATH=$(npm root -g) node kuresel-aynalar.js
NODE_PATH=$(npm root -g) node kirilma.js
NODE_PATH=$(npm root -g) node gorunur-derinlik.js
NODE_PATH=$(npm root -g) node fiber-optik.js
NODE_PATH=$(npm root -g) node prizmalar.js
NODE_PATH=$(npm root -g) node mercekler.js
```

`tema.js` ortak renkleri, yazı tiplerini ve kart/formül/başlık yardımcılarını;
`blok.js` ise tekrar eden slayt düzenlerini (kapak, "bu derste" ızgarası, altı
kartlık uygulama sayfası, çözümlü örnek, sık yapılan hatalar, özet ve tablo)
tutar. Yeni bir sunum bu ikisini `require` ederek birkaç yüz satırda yazılabilir;
konuya özgü slaytlar (grafikler, şemalar, tablolar) dosyanın kendisinde durur.
