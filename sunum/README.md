# Sunumlar

Ders sayfalarıyla aynı paleti ve dili kullanan, 16:9 PowerPoint sunumları.
Her sunum 14 slayttır ve her slaytta konuşmacı notu vardır.

Çıktılar doğrudan yayınlanan köke, `dist/sunum/` altına yazılır; yani üretildiği
anda `dersler.perinet.org/sunum/...` adresinden indirilebilir. Ders sayfalarındaki
**Sunum (PPTX)** düğmesi ve giriş sayfasındaki *Sunumlar* bölümü buraya bakar.

| Dosya (`dist/sunum/`) | Konu |
|---|---|
| `serbest-dusme.pptx` | Serbest düşme — tanım, kütlenin sadeleşmesi, bağıntılar, grafikler, 1:3:5, düşey atış, limit hız, iki çözümlü örnek |
| `iki-boyutta-hareket.pptx` | İki boyutta sabit ivmeli hareket — bağımsızlık ilkesi, bileşenler, yatay/eğik atış, menzil–açı, dört grafik, yörünge denklemi, iki çözümlü örnek |

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
```

`tema.js` ortak renkleri, yazı tiplerini ve kart/formül/başlık yardımcılarını
tutar; yeni bir sunum eklerken oradan başlanabilir.
