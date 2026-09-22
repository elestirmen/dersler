# Kapı — erişim denetimi

Site statik kalır: dosyaları nginx sunar. Bu klasördeki küçük Node servisi
yalnızca **"bu ziyaretçi bu dosyayı görebilir mi?"** sorusuna cevap verir,
giriş ekranını ve yönetim panelini üretir. Bağımlılık yok, derleme yok: tek
başına `node sunucu.js` ile çalışır.

## Nasıl işliyor

```
tarayıcı ──▶ nginx ──auth_request──▶ kapı  (204 / 401 / 403)
               │
               └── 204 ise dosyayı kendisi verir
```

Dosyalar hiçbir zaman kapının içinden akmaz; kapı yalnızca karar üretir. Kapı
düşerse konu sayfaları ve sunumlar kapanır, ana sayfa açık kalır.

Korunan yanıtlar `Cache-Control: private, no-cache` taşır: yetki origin'de
denetlendiği için yanıtın CDN'de ya da vekilde saklanması kapıyı delerdi
(ayrıntı: ana README'deki "Önbellek tuzağı").

Bir ziyaretçinin hakkı iki kaynağın birleşimidir: **herkese açık konular**
(kodsuz, herkes) ve **kodunun konuları**. İndirme hakkı ayrı tutulur ve her
zaman görme hakkının alt kümesidir.

| Yol | Kim görür |
|---|---|
| `/`, `index.html`, `404.html`, simgeler, `erisim.js` | herkes |
| `*.html` (18 konu sayfası) | konu herkese açıksa herkes; değilse kodunda o konu olanlar |
| `/sunum/*.pptx` | konu herkese açık **ve** herkese indirme açıksa herkes; değilse kodunda o konu **ve** indirme izni olanlar |
| `/sunum/dersler-sunumlar.zip` | on sekiz destenin hepsini indirebilenler |
| kataloğa girmemiş ama var olan dosya | yalnızca yönetici (bkz. aşağıda) |
| `/yonetim/*` | yönetici parolasıyla girenler |

Reddedilen ziyaretçinin kodu yoksa 401 (giriş ekranı), kodu varsa 403 (giriş
ekranı "bu konu kodunuza açık değil" der).

### Katalog dışı dosyalar: şüphede kapalı

Kapı yalnızca `konular.js` listesindeki konuları tanır. Tanımadığı bir `.html`
ya da `/sunum/` dosyası istenirse yayın dizininde (`KAPI_KOK`, konteynerde
`/dist`, salt okunur) gerçekten var mı diye bakar:

- **yoksa** geçirir, 404'ü nginx verir (yazım hatası giriş ekranına düşmesin);
- **varsa** kapalı tutar ve günlüğe bir kez yazar:
  `konular.js'te olmayan dosya kapalı tutuldu: /yeni-konu.html`.

Kök dizin okunamıyorsa (konteynere bağlanmamışsa) her katalog dışı dosya "var"
sayılır: yanlış yapılandırma kapıyı açmaz, kapatır; açılışta uyarı düşer.

## Uçlar

| Yol | İş |
|---|---|
| `GET /yetki` | nginx `auth_request` hedefi; yalnızca 204/401/403 döner |
| `GET /durum` | ana sayfa ve konu sayfalarının kilitleri çizmesi için erişim özeti |
| `GET /durum?onizleme=herkes\|KOD` | yalnızca yönetici: sayfaya kodsuz ziyaretçinin ya da bir sınıfın gözünden bakmak için |
| `GET/POST /giris` | öğrenci giriş ekranı (oturum durumunu da gösterir) ve kod denetimi |
| `GET /cikis` | çerezi siler |
| `GET /yonetim` | yönetim paneli (tek sayfa) |
| `GET /yonetim/qrcode.js` | paylaşım penceresinin QR üreticisi (aşağıda) |
| `POST /yonetim/giris`, `/yonetim/cikis` | yönetici oturumu |
| `GET /yonetim/veri` | üniteler, kodlar, herkese açık ayar |
| `POST /yonetim/kod` | **yeni** kod; elle verilen kod zaten varsa 409 (ezilmez) |
| `POST /yonetim/kod-guncelle` | var olan kodu günceller; yalnızca gönderilen alanlar değişir |
| `POST /yonetim/kod-sil` | kodu siler |
| `POST /yonetim/herkese-acik` | `{ konular, indirme }` — kodsuz açık konular |
| `POST /yonetim/parola` | yönetici parolasını değiştirir |

`/durum` cevabı:

```json
{
  "rol": "yok | ogrenci | yonetici",
  "ad": "11-A Fizik", "kod": "DRS-K7M2PX",
  "konular": ["serbest-dusme", "mercekler"],       // görebildikleri
  "indirilebilir": ["serbest-dusme"],               // destesini indirebildikleri
  "toplu": false,                                   // ZIP
  "herkeseAcik": ["serbest-dusme"],
  "sebep": null,        // elde geçmeyen kod varsa: suresi-doldu | kapali | silindi
  "onizleme": null      // yönetici önizlemesinde { tur, kod, ad, sebep }
}
```

Elle verilen kod 6–32 karakter olmalı (harf, rakam, çizgi; harf ya da rakamla
başlayıp biter). Kısa bir kod, deneme sınırına rağmen tahmin edilebilir olurdu.

## Oturum

Çerez sunucuda saklanmaz: içeriği HMAC ile imzalanır (`kimlik.js`), doğrulama
imzayı yeniden hesaplamaktan ibarettir. Servis yeniden başlayınca kimse dışarı
düşmez. Öğrenci çerezi 30 gün, yönetici çerezi 12 saat yaşar; çerez `Secure`
olduğu için **düz http üzerinden çalışmaz** (site zaten NPM arkasında https;
yerel denemede `localhost` tarayıcılarca güvenli sayılır).

Kod başına deneme sınırı vardır: aynı adresten 10 dakikada 12 kod, 15 dakikada
6 parola denemesi. Adres, Cloudflare'ın koyduğu `CF-Connecting-IP` başlığından
okunur; `X-Forwarded-For` zincirinin başı istemci tarafından uydurulabildiği
için ona ikinci sırada bakılır.

Durum değiştiren isteklerde `Origin` başlığı denetlenir: başlık varsa `Host` ile
aynı olmalıdır. Çerez zaten `SameSite=Lax` olduğu için tarayıcı çapraz siteden
POST'a çerez iliştirmez; bu denetim eski tarayıcılar için ikinci kattır.
`Origin` göndermeyen istemciler (curl, betik) etkilenmez.

Bütün istek tek bir `try` içinde işlenir ve bozuk yüzde kodlamalı çerezler yok
sayılır: tek bir kötü istek süreci düşüremez, yalnızca kendisi 500 alır.
Çözülemeyen bir yol `/yetki`'de 403 alır (şüphede kapalı).

**Parola unutulursa:** `veri.json` içindeki `yoneticiParolaOzeti` alanı boş
bırakılıp `docker restart dersler-kapi` çalıştırılır; kapı yeni bir parola üretip
günlüğe yazar. `gizliAnahtar` silinmemelidir — silinirse bütün öğrenciler dışarı
düşer. Yedeklenmesi gereken tek dosya budur.

## Veri

`/opt/dersler/veri/veri.json` — tek dosya, atomik yazılır:

```json
{
  "gizliAnahtar": "…",            // çerez imzası; silinirse herkes dışarı düşer
  "yoneticiParolaOzeti": "scrypt$…",
  "herkeseAcik": { "konular": ["serbest-dusme"], "indirme": false },
  "kodlar": [
    { "kod": "DRS-K7M2PX", "ad": "11-A Fizik", "konular": ["mercekler"],
      "indirme": true, "bitis": "2027-01-15", "etkin": true,
      "olusturma": "…", "sonGiris": "…", "girisSayisi": 3 }
  ]
}
```

`herkeseAcik` alanı olmayan eski dosyalar olduğu gibi okunur (hiçbir konu
herkese açık değil sayılır).

İlk açılışta yönetici parolası üretilir; `docker logs dersler-kapi` ile ve
`/opt/dersler/veri/ilk-parola.txt` dosyasında görünür. Panelden değiştirilir;
değiştirdikten sonra o dosya geçersizdir, silinebilir. Parola dışarıdan da
verilebilir: `KAPI_PAROLA=… docker compose up -d`.

## Yönetim paneli

Tek sayfa, bağımlılıksız; tasarım belirteçleri sitenin kendisiyle aynı, açık ve
koyu tema. Kodlar kart olarak listelenir: ünite başına dolum çubuğu, durum
(etkin / kapalı / süresi doldu / birkaç gün kaldı), son giriş, yerinde aç-kapa
anahtarı. Kod oluşturulunca paylaşım penceresi kendiliğinden açılır: QR, giriş
bağlantısı, telefonda sistem paylaşım menüsü ve **tahtaya yansıt** (tam ekran,
hep açık tema, büyük QR ve kod). **Önizle**, ana sayfayı o sınıfın ya da kodsuz
bir ziyaretçinin gözünden yeni sekmede açar.

QR kodunu `sayfa/qrcode.js` üretir: Kazuhiko Arase'nin
[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) 2.0.4
sürümü, MIT lisanslı, değiştirilmeden alındı (lisans başlığı dosyada). Panel
onu yalnızca paylaşım penceresi ilk açıldığında yükler; yüklenemezse QR kutusu
gizlenir, bağlantı ve kod yine çalışır.

## Değişiklikten sonra

`sayfa/*` ve `*.js` dosyaları servis açılırken okunur; düzenledikten sonra
kapıyı yeniden başlatmak gerekir:

```bash
docker restart dersler-kapi
```

nginx tarafındaki değişiklik için `docker exec dersler-web nginx -s reload`
yeter — `deploy/` dizini conf.d olarak bağlı olduğu için dosya anında görünür.

## Yeni konu eklenince

`konular.js` içindeki listeye eklemek şarttır: eklenmezse kapı yeni sayfayı
yalnızca yöneticiye açar (katalog dışı dosya kuralı) ve günlüğe uyarı yazar.
Liste `dist/index.html` ile aynı sırada tutulur.

## Yerel deneme

```bash
KAPI_PORT=18791 KAPI_VERI=/tmp/veri.json KAPI_KOK=../dist KAPI_PAROLA=deneme123 node sunucu.js
curl -H 'X-Ozgun-URI: /mercekler.html' -o /dev/null -w '%{http_code}\n' localhost:18791/yetki
```

8791 gibi yuvarlak portlar bu sunucuda başka süreçlerce kullanılıyor olabilir;
açılışta `EADDRINUSE` görürseniz başka bir port seçin.
