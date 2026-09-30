# Sunumlar

Ders sayfalarıyla aynı paleti ve dili kullanan, 16:9 PowerPoint sunumları.
On sekiz konunun her biri için bir deste; **her deste, o konunun "Konu
anlatımı" modalından üretilir** ve onun dört basamaklı yolunu izler (Temel →
Orta → İleri → Pekiştir): aynı başlıklar, formüller, tablolar, çizimler ve
görseller, aynı "Düşün" soruları, kolaydan zora aynı çözümlü örnekler.
Slaytta az metin durur; anlatımın paragrafları konuşmacı notundadır.

Çıktılar doğrudan yayınlanan köke, `dist/sunum/` altına yazılır; yani üretildiği
anda `dersler.perinet.org/sunum/...` adresinden indirilebilir. Ders sayfalarındaki
**Sunum (PPTX)** düğmesi ve giriş sayfasındaki *Sunumlar* bölümü buraya bakar;
`dersler-sunumlar.zip` on sekizini bir arada verir.

## Bir destenin yapısı

| Slayt | Kaynağı (konu sayfasında) |
|---|---|
| Kapak | Koyu zemin; solda künye, başlık, giriş paragrafı ve dört basamak şeridi, sağda konunun **giriş görseli** (kenarı zemine karışır) |
| Başlarken | Konu anlatımının açılış sorusu (`.lead-in`'in harita cümlesinden önceki kısmı), büyük puntoyla |
| Bu derste | Dört sütun: her basamağın adı, açıklaması ve başlıkları |
| Basamak ayracı | Koyu zemin, büyük numara, basamağın adı, açıklaması ve başlıkları; sağda 1'de günlük görsel, 2'de temel bağıntılar, 3'te uygulama görseli, 4'te zorluk rozetli örnek listesi |
| Bölüm | Başlık, altında **Kısaca** bandı (bölümün özet cümlesi), gövdede listeler, formül kutuları, tablolar, uyarı kutuları; sağda bölümün çizimi. Gövde slaytın yarısını doldurmuyorsa anlatımın paragrafları bütün hâlinde eklenir; uzun bölüm dengeli biçimde iki slayta bölünür |
| Düşün → Cevap | Soru slaytı (büyük soru işareti, "Cevap bir sonraki slaytta"), ardından cevap slaytı. Deste başına en çok altı çift: önce her basamaktan biri, sonra sırayla; kalanlar bölüm notunda |
| Çözümlü örnek | Her örnek bir slayt: sağ üstte **Kolay / Orta / Zor** rozeti, soru solda, adımlar sağda numaralı kartlarda |
| Sık yapılan hatalar | İki sütunlu ✗ / ✓ kartları; altıdan çok madde iki slayta bölünür |
| Özetle | "Aklında kalsın" (sayfa künyesindeki dört gerçek), temel bağıntılar, sayfa bağlantısı ve sıradaki konu |

Bir deste 38–47 slayttır. Başlık rengi basamağı söyler (yeşil, mavi, mor,
turuncu), sağ üstte "2 / 4 ORTA" gibi bir etiket durur. Yazı boyutu içeriğe göre
seçilir; uzun başlıklar tek satıra sığacak kadar küçülür. Çizimler konu
anlatımındaki SVG'lerin açık temada 2× çözünürlükte alınmış PNG kopyalarıdır;
görseller özgün PNG'lerden (`gorsel/ham/`, yoksa `dist/gorsel/*.webp`) ImageMagick ile
slayt çerçevesinin oranına kırpılır ve "Yapay zekâ ile üretildi" etiketi taşır.

## Yeniden üretmek

Tek kaynak konu sayfalarıdır; bir sayfanın konu anlatımı değişince desteyi
yeniden üretmek yeterlidir. Küresel paketler: `pptxgenjs` ve `puppeteer`
(çizimleri PNG'ye çevirmek ve modalı okumak için); görselleri kırpmak için
ImageMagick (`magick`).

```bash
npm install -g pptxgenjs puppeteer
cd /opt/dersler
NODE_PATH=$(npm root -g) node sunum/uret.js                    # 18 deste → dist/sunum
NODE_PATH=$(npm root -g) node sunum/uret.js --konu kirilma     # tek konu
cd dist/sunum && rm -f dersler-sunumlar.zip && zip -q -X dersler-sunumlar.zip *.pptx
```

`--cikti DIR` çıktıyı başka bir klasöre yazar (yayına almadan denemek için),
`--kok DIR` konu sayfalarını `dist` yerine bir kopyadan okur, `--sekiller DIR`
çizim ve kırpılmış görsel önbelleğini seçer.

## Yerleşimi doğrulamak

Sunucuda PowerPoint yok; bu yüzden `uret.js --onizleme DIR` her slaydın kutularını
kaydeder, `onizleme.js` de bunları aynı inç ölçüleriyle HTML'de yeniden çizer
(Calibri/Cambria yerine aynı ölçülerdeki Carlito/Caladea), slayt başına PNG alır
ve taşan metin kutularını raporlar:

```bash
NODE_PATH=$(npm root -g) node sunum/uret.js --cikti /tmp/d --onizleme /tmp/d/on
NODE_PATH=$(npm root -g) node sunum/onizleme.js --girdi /tmp/d/on --ekran
```

Rapor "tümü temiz" demiyorsa ilgili slaytın PNG'sine bakıp `uret.js` içindeki
ölçü sabitlerini düzeltin.

## Dosyalar

| Dosya | İş |
|---|---|
| `uret.js` | Konu sayfasını puppeteer ile okur, çizimleri PNG'ye çevirir, desteyi kurar |
| `onizleme.js` | Kaydedilen slaytları HTML'de çizer, ekran görüntüsü alır, taşma raporlar |
| `tema.js` | Renkler, yazı tipleri, kart / formül / başlık / alt bilgi / motif yardımcıları |
| `blok.js` | Kapak, "bu derste", çözümlü örnek, hatalar, özet ve tablo düzenleri |
| `eski/` | Eylül 2026 öncesinin elle yazılmış konu betikleri; üretimde değil |
