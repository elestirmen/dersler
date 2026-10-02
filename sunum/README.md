# Sunumlar

Ders sayfalarıyla aynı paleti ve dili kullanan, 16:9 PowerPoint sunumları.
Yirmi altı konunun (fizik 18, kimya 8) her biri için bir deste; **her deste, o konunun "Konu
anlatımı" modalından üretilir** ve onun dört basamaklı yolunu izler (Temel →
Orta → İleri → Pekiştir): aynı başlıklar, formüller, tablolar, çizimler ve
görseller, aynı "Düşün" soruları, kolaydan zora aynı çözümlü örnekler.
Anlatımın kendisi slaytlardadır, küçük parçalara bölünmüş olarak; deste
başına 100'ü aşkın slayt.

Çıktılar doğrudan yayınlanan köke, `dist/sunum/` altına yazılır; yani üretildiği
anda `dersler.perinet.org/sunum/...` adresinden indirilebilir. Ders sayfalarındaki
**Sunum (PPTX)** düğmesi ve giriş sayfasındaki *Sunumlar* bölümü buraya bakar;
`dersler-sunumlar.zip` hepsini bir arada verir. Kapaktaki ders adı ("Dersler · fizik",
"Dersler · kimya") konu sayfasının marka satırından okunur.

## Bir destenin yapısı

Desteler başarısı düşük sınıflar düşünülerek **küçük adımlıdır**: her slaytta bir fikir, büyük
punto (metin 22 pt), anlatımın kendisi slaytta.

| Slayt | Kaynağı (konu sayfasında) |
|---|---|
| Kapak | Koyu zemin; solda künye, başlık, giriş paragrafı ve dört basamak şeridi, sağda konunun **giriş görseli** |
| Başlarken | Konu anlatımının açılış sorusu |
| Bu derste | Dört sütun: her basamağın adı, açıklaması ve başlıkları |
| Önce hatırlayalım | `div.hatirla`: konudan önce bilinmesi gerekenler, slayt başına en çok üç kart |
| Basamak ayracı | Koyu zemin, büyük numara, basamağın adı ve başlıkları; sağda günlük ya da uygulama görseli, temel bağıntılar ya da zorluk rozetli örnek listesi |
| Anlatım | Bölümün paragrafları, listeleri, formülleri, tabloları ve uyarıları **sırasıyla**, slayta sığan parçalara bölünerek (paragraf cümle cümle, liste en çok dört madde, tablo en çok altı satır); sağ üstte "ADIM 2 / 5" sayacı |
| Şekil | Her çizim ve görsel kendi slaytında, büyük, alt yazısıyla |
| Kısaca | Bölümün özeti tek başına, büyük: "Bu bölümde öğrendik" |
| Düşün → Cevap | Her Düşün sorusu için bir soru ve bir cevap slaytı |
| Çözümlü örnek | Önce **soru** slaytı (soru ve altında büyük durum çizimi, Kolay / Orta / Zor rozeti), sonra **verilenler ve istenen** slaytı, sonra **çözüm** slaytları (slayt başına en çok üç adım, dengeli) |
| Sıra sende → Cevap | Her alıştırma için soru ve cevap slaytı |
| Sık yapılan hatalar | Slayt başına dört ✗ / ✓ kartı |
| Özetle | "Aklında kalsın", temel bağıntılar, sayfa bağlantısı ve sıradaki konu |

Başlık rengi basamağı söyler (yeşil, mavi, mor, turuncu). Konuşmacı notu her slaytta o slaytın
metnini ve öğretmene kısa bir yönerge taşır. Çizimler konu anlatımındaki SVG'lerin açık temada 2×
çözünürlükte alınmış PNG kopyalarıdır; görseller özgün PNG'lerden (`gorsel/ham/`, yoksa
`dist/gorsel/*.webp`) ImageMagick ile slayt çerçevesinin oranına kırpılır.

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
