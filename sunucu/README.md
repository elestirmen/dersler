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

Korunan yanıtlar `Cache-Control: private, no-store` taşır: yetki origin'de
denetlendiği için yanıtın CDN'de ya da vekilde saklanması kapıyı delerdi
(ayrıntı: ana README'deki "Önbellek tuzağı").

| Yol | Kim görür |
|---|---|
| `/`, `index.html`, simgeler, `robots.txt` | herkes |
| `*.html` (18 konu sayfası) | kodunda o konu açık olanlar |
| `/sunum/*.pptx` | kodunda o konu açık **ve** indirme izni olanlar |
| `/sunum/dersler-sunumlar.zip` | tüm konuları açık **ve** indirme izinli kodlar |
| `/yonetim/*` | yönetici parolasıyla girenler |

## Uçlar

| Yol | İş |
|---|---|
| `GET /yetki` | nginx `auth_request` hedefi; yalnızca 204/401/403 döner |
| `GET /durum` | ana sayfanın kilitleri çizmesi için erişim özeti |
| `GET/POST /giris` | öğrenci giriş ekranı ve kod denetimi |
| `GET /cikis` | çerezi siler |
| `GET /yonetim` | yönetim paneli (tek sayfa) |
| `POST /yonetim/giris`, `/cikis`, `/kod`, `/kod-sil`, `/parola` | panel API'si |

## Oturum

Çerez sunucuda saklanmaz: içeriği HMAC ile imzalanır (`kimlik.js`), doğrulama
imzayı yeniden hesaplamaktan ibarettir. Servis yeniden başlayınca kimse dışarı
düşmez. Öğrenci çerezi 30 gün, yönetici çerezi 12 saat yaşar; çerez `Secure`
olduğu için **düz http üzerinden çalışmaz** (site zaten NPM arkasında https).

Kod başına deneme sınırı vardır: aynı adresten 10 dakikada 12 kod, 15 dakikada
6 parola denemesi. Adres, Cloudflare'ın koyduğu `CF-Connecting-IP` başlığından
okunur; `X-Forwarded-For` zincirinin başı istemci tarafından uydurulabildiği
için ona ikinci sırada bakılır.

Durum değiştiren isteklerde `Origin` başlığı denetlenir: başlık varsa `Host` ile
aynı olmalıdır. Çerez zaten `SameSite=Lax` olduğu için tarayıcı çapraz siteden
POST'a çerez iliştirmez; bu denetim eski tarayıcılar için ikinci kattır.
`Origin` göndermeyen istemciler (curl, betik) etkilenmez.

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
  "kodlar": [
    { "kod": "DRS-K7M2PX", "ad": "11-A Fizik", "konular": ["mercekler"],
      "indirme": true, "bitis": "2027-01-15", "etkin": true,
      "olusturma": "…", "sonGiris": "…", "girisSayisi": 3 }
  ]
}
```

İlk açılışta yönetici parolası üretilir; `docker logs dersler-kapi` ile ve
`/opt/dersler/veri/ilk-parola.txt` dosyasında görünür. Panelden değiştirilir.
Parola dışarıdan da verilebilir: `KAPI_PAROLA=… docker compose up -d`.

## Değişiklikten sonra

`sayfa/*.html` ve `*.js` dosyaları servis açılırken okunur; düzenledikten sonra
kapıyı yeniden başlatmak gerekir:

```bash
docker restart dersler-kapi
```

nginx tarafındaki değişiklik için `docker exec dersler-web nginx -s reload`
yeter — `deploy/` dizini conf.d olarak bağlı olduğu için dosya anında görünür.

## Yeni konu eklenince

`konular.js` içindeki listeye eklemek gerekir; kapı tanımadığı sayfayı hiçbir
koda açmaz. Liste `dist/index.html` ile aynı sırada tutulur.

## Yerel deneme

```bash
KAPI_PORT=8099 KAPI_VERI=/tmp/veri.json KAPI_PAROLA=deneme node sunucu.js
curl -H 'X-Ozgun-URI: /mercekler.html' -o /dev/null -w '%{http_code}\n' localhost:8099/yetki
```
