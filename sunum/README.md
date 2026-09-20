# Sunumlar

Ders sayfalarıyla aynı paleti ve dili kullanan, 16:9 PowerPoint sunumları.
On sekiz konunun her biri için bir deste; **her deste, o konunun "Konu
anlatımı" modalından üretilir** ve onunla birebir aynıdır: aynı dokuz başlık,
aynı sırada; aynı formüller, tablolar ve çizimler; aynı çözümlü örnekler ve sık
yapılan hatalar. Konuşmacı notu, ilgili bölümün anlatım metninin kendisidir.

Çıktılar doğrudan yayınlanan köke, `dist/sunum/` altına yazılır; yani üretildiği
anda `dersler.perinet.org/sunum/...` adresinden indirilebilir. Ders sayfalarındaki
**Sunum (PPTX)** düğmesi ve giriş sayfasındaki *Sunumlar* bölümü buraya bakar;
`dersler-sunumlar.zip` on sekizini bir arada verir.

## Bir destenin yapısı

| Slayt | Kaynağı (konu sayfasında) |
|---|---|
| Kapak | Sayfa başlığı, künye, giriş paragrafı, temel bağıntılar |
| Başlarken | Konu anlatımının açılış sorusu (`.lead-in`), büyük puntoyla |
| Bu derste | Dokuz bölüm başlığı ve her birinin ilk cümlesi |
| 01–07 · Bölümler | Bölümün paragrafları (her cümle bir madde), formül kutuları, uyarı kutuları, tablolar; sağda bölümün çizimi ve alt yazısı. Uzun bölüm dengeli biçimde iki slayta bölünür |
| 08 · Çözümlü örnekler | Her örnek bir slayt: soru solda, adımlar sağda numaralı kartlarda; kart yükseklikleri içeriğe göre |
| 09 · Sık yapılan hatalar | İki sütunlu ✗ / ✓ kartları |
| Özetle | "Aklında kalsın" (sayfa künyesindeki dört gerçek), temel bağıntılar, sayfa bağlantısı ve sıradaki konu |

Yazı boyutu bölümün uzunluğuna göre 16 pt ile 12 pt arasında seçilir; kısa
bölümlerde çizim genişler. Çizimler konu anlatımındaki SVG'lerin açık temada
2× çözünürlükte alınmış PNG kopyalarıdır, bu yüzden sayfadakiyle aynı görünür.

## Yeniden üretmek

Tek kaynak konu sayfalarıdır; bir sayfanın konu anlatımı değişince desteyi
yeniden üretmek yeterlidir. Küresel paketler: `pptxgenjs` ve `puppeteer`
(çizimleri PNG'ye çevirmek ve modalı okumak için).

```bash
npm install -g pptxgenjs puppeteer
cd /opt/dersler
NODE_PATH=$(npm root -g) node sunum/uret.js                    # 18 deste → dist/sunum
NODE_PATH=$(npm root -g) node sunum/uret.js --konu kirilma     # tek konu
cd dist/sunum && rm -f dersler-sunumlar.zip && zip -q -X dersler-sunumlar.zip *.pptx
```

`--cikti DIR` çıktıyı başka bir klasöre yazar (yayına almadan denemek için),
`--sekiller DIR` çizim PNG'lerinin önbelleğini seçer.

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
