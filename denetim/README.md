# Deney denetimi

On sekiz konu sayfasının etkileşimli deneylerini gerçek bir tarayıcıda
(puppeteer) çalıştırır ve bozulmaları sayar. Sayfalar diskten, sahte bir kaynak
(`https://dersler.test`) altında sunulur: kapıya, yönetici parolasına ya da
çalışan bir sunucuya gerek yoktur, arka planda süreç kalmaz. Her sayfa taze bir
tarayıcıda açılır.

```bash
NODE_PATH=$(npm root -g) node denetim/deney.js                      # 18 konu
NODE_PATH=$(npm root -g) node denetim/deney.js --konu kirilma       # tek konu
NODE_PATH=$(npm root -g) node denetim/deney.js --kok /tmp/kopya     # dist'in bir kopyası
NODE_PATH=$(npm root -g) node denetim/deney.js --ekran /tmp/denetim # görüntüler
```

On sekiz sayfa yaklaşık altı dakika sürer (sayfa başına ~20 sn); `--ekran` ile
iki katına yakın.

Her sayfa önce 1280 px genişlikte açılır. Tuvalli her bölüm ekranın ortasına
getirilir, birincil düğmesine ("Bırak", "Döndür", "At"…) basılır ve kare
maliyeti ölçülür. Hepsi başlatıldıktan sonra sayfanın sonuna inilir; ardından
görünüm 390 px'lik telefona geçer ve yalnızca yüksekliği değiştirilir.

| Sütun | Ne sayar | Sınır |
|---|---|---|
| deney | başlatılan / tuvalli bölüm | bilgi |
| hata | sayfa ve konsol hataları; eksik yerel dosya da sayılır, dış yazı tiplerinin ağ hataları sayılmaz | 0 |
| boş | ilk çizimden sonra boş kalan tuval | 0 |
| taşma | 390 px'te yatay taşma (px) | 0 |
| sıfırlama | yalnızca yükseklik değişince (mobil adres çubuğu) yeniden kurulan tuval | 0 |
| ekran dışı | sayfa sonundayken, hiçbir deney görünmezken 2 sn'de çalışan kare | 0 |
| en kötü kare | tek bir animasyon karesinin çizime harcadığı en uzun süre | 25 ms |

Bir sınır aşılırsa satır ✗ ile başlar ve araç 1 koduyla biter; konu sayfası
bulunamazsa 2 ile.

Birincil düğmesi olmayan bölüm başlatılmaz: bunlar kaydırıcı ya da sürüklemeyle
çizilen sahnelerdir (şu an 72 bölümün 29'u; "deney" sütununda görünür). İlk
çizimleri, taşmaları ve yeniden kurulmaları yine denetlenir.

## Aracın kendisini sınamak

Ortak animasyon kodunun eski sürümü aracın aradığı iki hatayı taşır:

```bash
mkdir -p /tmp/eski && git archive 371054a dist | tar -x -C /tmp/eski
NODE_PATH=$(npm root -g) node denetim/deney.js --kok /tmp/eski/dist
```

On sekiz sayfanın hepsi ✗ çıkar: yalnızca yükseklik değişince de 91 tuvalin
hepsi yeniden kurulur, dokuz sayfada da başlatılan animasyon deney ekrandan
çıktıktan sonra çizmeyi sürdürür (2 sn'de toplam 865 kare). Bugünkü `dist/` aynı
denetimden temiz çıkar.

## Görüntüler

`--ekran DİZİN` her deneyin tuvalini, birincil düğmesine basıldıktan ~2 sn sonra
1280 ve 390 px'te `DİZİN/1280/` ve `DİZİN/390/` altına kaydeder ve her genişlik
için hepsini bir arada gösteren bir pano çıkarır (`pano-1280.png`,
`pano-390.png`). Etiket çakışmaları en çok 390 px'te görünür. Çekimden önce
yapışkan başlık, "↑" düğmesi ve "İçeriğe geç" bağlantısı gizlenir; yer
kaplamaları korunur, yerleşim değişmez.

## Değişiklik yaparken

`dist/`e yazılan dosya anında yayındadır. Deneyleri etkileyen bir değişikliği
önce bir kopyada deneyin, temiz çıkarsa `dist/`e taşıyın:

```bash
mkdir -p /tmp/kopya && cp -a dist/. /tmp/kopya/
# … /tmp/kopya içinde değiştir …
NODE_PATH=$(npm root -g) node denetim/deney.js --kok /tmp/kopya
```

## Yanıltabilecekler

- Kare süreleri GPU'suz (yazılımla) çizen headless tarayıcıda ölçülür ve oynar;
  aynı anda başka ağır bir iş çalışıyorsa 25 ms sınırı yanlışlıkla aşılabilir.
  İki sürümü karşılaştırırken birkaç kez, sırayla ölçün; tek ölçümdeki fark
  gerileme sayılmaz.
- "Ekran dışı" bilerek sayfa sonunda ölçülür: sayfanın başında ilk laboratuvar
  bölümü görünür durumdadır, oradaki kareler iş sayılmaz.
- Denetimde ziyaretçi yönetici gibi görünür (her konu açık, kilit yok). Erişim
  arayüzü (`erisim.js`) ve kapı burada sınanmaz; kapının denemesi için
  [`sunucu/README.md`](../sunucu/README.md).
