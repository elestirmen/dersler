# Dersler

Etkileşimli ders anlatımları için sade, statik bir öğrenme alanı.
İçerik **ders → ünite → konu** hiyerarşisiyle düzenlenir: Fizik (üç ünite, 18 konu) ve
Kimya (iki ünite, 8 konu).
Derleme adımı, paket bağımlılığı ve JavaScript çatısı yok: her sayfa kendi
stilini ve betiğini taşıyan tek bir HTML dosyası. Ortak tasarım dili
(`stil/`) tüm sayfalarda aynıdır; yirmi altı konu sayfası bire bir aynı stil
bloğunu paylaşır.

**Canlı:** [dersler.perinet.org](https://dersler.perinet.org)

## İçerik

### Fizik · Kuvvet ve Hareket ünitesi

Konular Maarif Modeli müfredatındaki sırayla; her konu tek bir HTML dosyası ve
bir sunum:

| # | Konu | Sayfa | Sunum |
|---|---|---|---|
| 01 | Serbest düşme | [`dist/serbest-dusme.html`](dist/serbest-dusme.html) | [`dist/sunum/serbest-dusme.pptx`](dist/sunum/serbest-dusme.pptx) |
| 02 | İki boyutta sabit ivmeli hareket | [`dist/iki-boyutta-hareket.html`](dist/iki-boyutta-hareket.html) | [`dist/sunum/iki-boyutta-hareket.pptx`](dist/sunum/iki-boyutta-hareket.pptx) |
| 03 | Newton'un hareket yasaları | [`dist/newton-yasalari.html`](dist/newton-yasalari.html) | [`dist/sunum/newton-yasalari.pptx`](dist/sunum/newton-yasalari.pptx) |
| 04 | Sürtünme kuvveti | [`dist/surtunme-kuvveti.html`](dist/surtunme-kuvveti.html) | [`dist/sunum/surtunme-kuvveti.pptx`](dist/sunum/surtunme-kuvveti.pptx) |
| 05 | Limit hız | [`dist/limit-hiz.html`](dist/limit-hiz.html) | [`dist/sunum/limit-hiz.pptx`](dist/sunum/limit-hiz.pptx) |
| 06 | Düzgün çembersel hareket | [`dist/cembersel-hareket.html`](dist/cembersel-hareket.html) | [`dist/sunum/cembersel-hareket.pptx`](dist/sunum/cembersel-hareket.pptx) |

### Fizik · Elektrik ve Manyetizma ünitesi

| # | Konu | Sayfa | Sunum |
|---|---|---|---|
| 01 | Elektriksel kuvvet ve elektriksel alan | [`dist/elektriksel-kuvvet.html`](dist/elektriksel-kuvvet.html) | [`dist/sunum/elektriksel-kuvvet.pptx`](dist/sunum/elektriksel-kuvvet.pptx) |
| 02 | Manyetik alan ve manyetik kuvvet | [`dist/manyetik-alan.html`](dist/manyetik-alan.html) | [`dist/sunum/manyetik-alan.pptx`](dist/sunum/manyetik-alan.pptx) |
| 03 | İndüksiyon akımı | [`dist/induksiyon-akimi.html`](dist/induksiyon-akimi.html) | [`dist/sunum/induksiyon-akimi.pptx`](dist/sunum/induksiyon-akimi.pptx) |
| 04 | Transformatörler | [`dist/transformatorler.html`](dist/transformatorler.html) | [`dist/sunum/transformatorler.pptx`](dist/sunum/transformatorler.pptx) |

### Fizik · Optik ünitesi

| # | Konu | Sayfa | Sunum |
|---|---|---|---|
| 01 | Işık şiddeti, ışık akısı ve aydınlanma | [`dist/isik-siddeti.html`](dist/isik-siddeti.html) | [`dist/sunum/isik-siddeti.pptx`](dist/sunum/isik-siddeti.pptx) |
| 02 | Düzlem aynalar | [`dist/duzlem-aynalar.html`](dist/duzlem-aynalar.html) | [`dist/sunum/duzlem-aynalar.pptx`](dist/sunum/duzlem-aynalar.pptx) |
| 03 | Küresel aynalar | [`dist/kuresel-aynalar.html`](dist/kuresel-aynalar.html) | [`dist/sunum/kuresel-aynalar.pptx`](dist/sunum/kuresel-aynalar.pptx) |
| 04 | Kırılma | [`dist/kirilma.html`](dist/kirilma.html) | [`dist/sunum/kirilma.pptx`](dist/sunum/kirilma.pptx) |
| 05 | Görünür derinlik | [`dist/gorunur-derinlik.html`](dist/gorunur-derinlik.html) | [`dist/sunum/gorunur-derinlik.pptx`](dist/sunum/gorunur-derinlik.pptx) |
| 06 | Fiber optik | [`dist/fiber-optik.html`](dist/fiber-optik.html) | [`dist/sunum/fiber-optik.pptx`](dist/sunum/fiber-optik.pptx) |
| 07 | Prizmalar | [`dist/prizmalar.html`](dist/prizmalar.html) | [`dist/sunum/prizmalar.pptx`](dist/sunum/prizmalar.pptx) |
| 08 | Mercekler | [`dist/mercekler.html`](dist/mercekler.html) | [`dist/sunum/mercekler.pptx`](dist/sunum/mercekler.pptx) |

### Kimya · Kimyasal Tepkimelerde Enerji ünitesi

11. sınıf kimya, 1. tema (Etkileşim). Konuların sırası ve kapsamı Maarif Modeli kazanımlarını
(KİM.11.1.1–11.1.8) ve okulda kullanılan konu anlatım fasikülünü (Fasikül 1–8) izler. Fasikül
yalnızca kapsam rehberidir: metinler, örnekler, çizimler ve sayılar özgündür; fasikülde hatalı
olan değerler (ör. H₂'nin yanma ısısı) kullanılmadı.

| # | Konu | Sayfa | Sunum |
|---|---|---|---|
| 01 | Tepkimelerde enerji değişimi | [`dist/enerji-degisimi.html`](dist/enerji-degisimi.html) | [`dist/sunum/enerji-degisimi.pptx`](dist/sunum/enerji-degisimi.pptx) |
| 02 | Bağ enerjileri ve tepkime entalpisi | [`dist/bag-enerjisi.html`](dist/bag-enerjisi.html) | [`dist/sunum/bag-enerjisi.pptx`](dist/sunum/bag-enerjisi.pptx) |
| 03 | Standart oluşum ve tepkime entalpisi | [`dist/olusum-entalpisi.html`](dist/olusum-entalpisi.html) | [`dist/sunum/olusum-entalpisi.pptx`](dist/sunum/olusum-entalpisi.pptx) |

### Kimya · Kimyasal Tepkimelerde Hız ünitesi

| # | Konu | Sayfa | Sunum |
|---|---|---|---|
| 01 | Tepkimelerin gerçekleşme şartları | [`dist/carpisma-teorisi.html`](dist/carpisma-teorisi.html) | [`dist/sunum/carpisma-teorisi.pptx`](dist/sunum/carpisma-teorisi.pptx) |
| 02 | Ortalama tepkime hızı | [`dist/tepkime-hizi.html`](dist/tepkime-hizi.html) | [`dist/sunum/tepkime-hizi.pptx`](dist/sunum/tepkime-hizi.pptx) |
| 03 | Tepkime hızına etki eden faktörler | [`dist/hiz-faktorleri.html`](dist/hiz-faktorleri.html) | [`dist/sunum/hiz-faktorleri.pptx`](dist/sunum/hiz-faktorleri.pptx) |
| 04 | Katalizör ve temas yüzeyi | [`dist/katalizor.html`](dist/katalizor.html) | [`dist/sunum/katalizor.pptx`](dist/sunum/katalizor.pptx) |
| 05 | Hız denklemi | [`dist/hiz-denklemi.html`](dist/hiz-denklemi.html) | [`dist/sunum/hiz-denklemi.pptx`](dist/sunum/hiz-denklemi.pptx) |

Ana sayfada dersler birbirinden ayrı durur: girişin altında her dersin kendi rengi, simgesi ve
sayılarıyla bir **ders kartı** var (Fizik mavi, Kimya camgöbeği); kart seçilince altında yalnız
o dersin **paneli** görünür — büyük renkli ders başlığı, dersin kendi ünite süzgeçleri, sonra
üniteler ve numaralı konular. Sunumlar bölümü de seçili dersin destelerini gösterir (üstünde
aynı seçim için küçük bir düğme grubu). Seçim tarayıcıda hatırlanır; adresteki `#kimya` ya da
`#optik` gibi bir parça o dersi açıp oraya kaydırır. Arama kutusu bütün derslerde arar: sonuçlar
ders başlıklarıyla ayrılır, kartlarda her dersin sonuç sayısı görünür. Betik yoksa bütün dersler
alt alta durur. Kartlardaki ve panellerdeki ünite/konu/deney sayılarını betik sayfadaki konu
kartlarından sayar. Her konu sayfası künyesinde üniteye döner (`index.html#<ünite>`), altında
önceki ve sonraki konuya geçiş şeridi taşır.

## Konu sayfası: üç adım

Her konu sayfası aynı yolu gösterir: **1 Oku** (konu anlatımı) → **2 Dene** (dört deney) →
**3 Sına** (hızlı kontrol). Giriş yalnızca başlık, bir cümle ve iki düğmeden oluşur ("Başla:
konu anlatımı", "Deneylere geç"); sağdaki **"Bu sayfada · üç adım"** kartı (`aside.hero-card.yol`,
`ol.adimlar`) adımları listeler, tıklanınca oraya götürür. Üst barda bölüm adları yerine aynı üç
adım durur (`.header-nav .step`); kaydırdıkça etkin adım koyulaşır. Anlatım açıldığında Oku,
test bitirildiğinde Sına adımı ✓ alır (tarayıcıdaki `dersler-okundu` ve `dersler-skor`
kayıtları). Konunun temel bağıntıları girişin altında katlı **Formüller** kutusunda durur
(`details.formuller`; düzlem aynalarda "Kurallar"), laboratuvar panelindeki küçük istatistikler
de **Ayrıntılar** altındadır (`details.ayrinti`). 2 Ekim 2026'dan önce giriş aynı formülleri
üç kez (cümle, çipler, kart), anlatım girişini de üç kez gösteriyordu; ilk ekranda okunacak
şey azaltıldı, bilgi silinmedi.

Anlatım penceresi dört **basamak sekmesiyle** açılır (`.basamaklar`: Temel · Orta · İleri ·
Pekiştir); başlık çipleri (`.chips[data-aktif]`) yalnız seçili basamağınkileri gösterir, okudukça
sekme kendiliğinden ilerler. Hızlı kontrol **bir seferde tek soru** gösterir: üstte soru sayısı
kadar parçalı ilerleme çubuğu (`.q-progress`, yeşil doğru / kırmızı yanlış), cevaptan sonra
açıklama ve "Sonraki soru"; son sorudan sonra sonuç kutusu (`.q-ozet`) ve bütün sorular
cevaplarıyla gözden geçirme için açılır. `denetim/anlatim.js` sekmeleri, adım kartını ve eski
giriş öğelerinin kalmadığını da denetler.

## Konu anlatımı: dört basamak, kolaydan zora

Her konu sayfasındaki **Konu anlatımı** penceresi (`<dialog id="konu">`) konunun yazılı
anlatımıdır ve yirmi altı konuda aynı yolu izler: önce sezgi, sonra bağıntılar, sonra
derinleşme, en sonda pekiştirme. Konu başına 12–15 başlık ve yaklaşık 3 000–4 500 sözcük;
eski dokuz başlıklık anlatımın 2,5–5 katı. Eski anlatımdaki bilgi, çizim, örnek ve hata
maddelerinin hepsi yerinde duruyor; üstüne kuruldu.

| Basamak | Ne var | Renk |
|---|---|---|
| Giriş | Merak uyandıran bir soru ve anlatımın haritası, altında konunun giriş görseli | mor |
| **1 · Temel** | Günlük bir gözlemle açılır ("Önce gözlemle: …"), formül yok; tanım, temel kavramlar, sezgi ve benzetmeler. Günlük hayat görseli burada | yeşil |
| **2 · Orta** | Bağıntılar ve nereden geldikleri (adım adım türetme), birim kontrolü, grafikler; "Sayılarla hisset" bölümünde tanıdık değerlerle bir tablo | mavi |
| **3 · İleri** | İnce durumlar, modelin sınırları, birleşik durumlar; son başlık "… gerçek dünyada", uygulama görseliyle | mor |
| **4 · Pekiştir** | Kolaydan zora 6–8 çözümlü örnek (her biri **Kolay / Orta / Zor** rozetli) ve 6–8 sık yapılan hata | turuncu |

**Başarısı düşük öğrenciler için destek blokları** her konuda aynıdır:

| Blok | Nerede | Ne yapar |
|---|---|---|
| **Önce hatırlayalım** (`div.hatirla`) | Temel bandının hemen ardında | Konuya girmeden önce bilinmesi gereken 3–5 kavram (hız, kuvvet, açı, karekök…), çok sade dille |
| **Formüldeki harfler** (`table.tbl.semboller`) | Orta basamakta, ana formüllerin hemen ardında | Sembol · Anlamı · Birimi tablosu |
| **Verilenler / İstenen** (`p.verilen`, `p.istenen`) | Her çözümlü örneğin sorusunun altında | Çözüme başlamadan soruyu parçalara ayırır; gizli verileri de yazar (“serbest bırakılıyor” → v₀ = 0) |
| **Sıra sende** (`details.alistirma`) | Çözümlü örneklerden sonra | 4–5 yeni soru, kolaydan zora; cevap kapalıdır, açınca kısa çözüm görünür |

**Açıklayıcı çizimler.** Fotoğraflar atmosfer katar, konuyu SVG çizimler anlatır. Basamak 1–3'teki
her öğretici bölümde en az bir çizim (`figure.fig`) vardır; her çözümlü örneğin İstenen satırının
hemen ardında da sorudaki durumu gösteren bir **durum çizimi** bulunur: cisimler, verilen değerler
etiketli, istenen büyüklükler “?” ile; cevap çizimde gösterilmez. Sunumda bu çizim örneğin ilk
slaytında, sorunun altında büyük durur. `denetim/anlatim.js` iki kuralı da denetler.

Basamak 1–3'teki her başlık bir **Kısaca** kutusuyla biter: bölümü tek başına okunabilecek
bir iki cümlede özetler; sunumda da o bölüm slaytının başlık cümlesi olur. Aralara cevabı
kapalı **Düşün** soruları serpiştirilmiştir (konu başına 5–10); öğrenci tahmin eder, sonra
açıp nedenini okur. Başlık çipleri ait oldukları basamağın rengini taşır ve yalnız seçili basamağınkiler
görünür; telefonda tek satırda yatay kayar.

Yapıyı `denetim/anlatim.js` denetler (basamak sırası ve sayıları, her bölümde bir Kısaca,
her basamakta Düşün, örneklerin zorluk sırası, görsel dosyaları, çip–başlık eşleşmesi,
çizim taşmaları ve modalın 390 px'te yatay taşmaması):

```bash
NODE_PATH=$(npm root -g) node denetim/anlatim.js              # bütün konular (26)
NODE_PATH=$(npm root -g) node denetim/anlatim.js kirilma
```

Anlatımda kullanılan bloklar: `p.lead-in`, `div.basamak` (`data-basamak="1–4"`, içinde
`<b>Temel|Orta|İleri|Pekiştir</b>` ve `<span>` açıklama), `h3` (kimlikleri `k1…kN`), `p`,
`h4`, `ul`/`ol`, `table.tbl`, `div.formula`, `div.callout` (`warn`), `figure.fig` (SVG
çizim), `figure.foto` (görsel), `p.kisaca` (`<b>Kısaca:</b>` ile başlar),
`details.dusun` (`<summary>Düşün: …?</summary>` + cevap), `details` örnek
(`<summary data-zorluk="kolay|orta|zor">Örnek n — …</summary>`, `p.verilen`, `p.istenen`,
`ol.steps`), `div.hatirla` (`<b>Önce hatırlayalım</b>` + `ul`), `table.tbl.semboller`
(Sembol · Anlamı · Birimi, önünde `h4`), `<h4>Sıra sende</h4>` ve `details.alistirma`
(`<summary data-zorluk="…">Sıra sende n: …</summary>` + `<p><b>Cevap:</b> …</p>`). Ek görseller
`gorsel/<konu>-ek1…ek3.webp` adını taşır ve basamak 1–3'teki çizimsiz bölümlerde durur. Sunum üreticisi
bu blokları tanır; yeni bir blok türü eklenirse `sunum/uret.js` de güncellenmelidir.

## Konu anlatımı görselleri

Her konunun anlatımında üç temel görsel var (fizikte 54, kimyada 24; kimyada ayrıca 4 ek görsel): **giriş** (konunun simge sahnesi: Ay'da
çekiç ve tüy, gökkuşağı, düşme kulesi…), **günlük** (Temel basamağın gözlemi) ve **uygulama**
("gerçek dünyada" bölümü). Hepsi **Codex'in `$imagegen` becerisiyle** üretildi: fizik görselleri
`gpt-6-luna` modeli en yüksek akıl yürütme düzeyinde, kimya görselleri `gpt-6.1-sol` ile
(`uret.sh` modeli artık `~/.codex/config.toml`'dan alır) (yerleşik `image_gen` aracı, `gpt-image`;
PNG'lerde OpenAI imzalı C2PA kaynak bilgisi var). Sitede ve slaytlarda üzerlerinde etiket yoktur.

Üslup **sinematik, gerçekçi**: aynı sahneler premium bir resimli üslupla da denendi, gerçekçi
olan daha kaliteli ve daha uyumlu çıktı. Her görselde model önce istemi becerinin şablonuyla
kurar, görseli üretir, sonra kendisi inceler (sahnedeki fizik şartları, yazı/harf olmaması,
eller ve geometri, kompozisyon) ve kusur varsa istemi o kusura yönelik düzeltip yeniden üretir;
en çok üç deneme, en iyisi seçilir. 54 görselin 45'i en az bir kez yeniden üretildi.

Görseller atmosfer ve bağlam içindir, fiziğin kendisini SVG çizimler taşır. Yine de her görsel
fizik açısından ayrıca gözle denetlendi: 90°'lik iki aynada tam üç görüntü, gökkuşağında güneşin
gözlemcinin arkasında olması (gölgeler yaya doğru uzanır), prizmada ışığın tabana doğru kırılıp
kırmızının en az sapması, itişen patencilerin zıt yönlere kayması, bardaktaki kaşığın su
yüzeyinde kırık görünmesi. Görüntü modeli strobo aralıklarını tam tutturamadığı için serbest
düşmenin elma görselinde elmaların konumları üretimden sonra **y = ½·g·t²'ye göre yeniden
yerleştirildi** (aralıklar tam 1 : 3 : 5; arka plan OpenCV ile dolduruldu); alt yazısı bunu
söyler.

| Dosya | İş |
|---|---|
| `gorsel/istekler.json` | fiziğin 54 sahne tarifi (İngilizce; fiziksel ayrıntılar açıkça yazılı) |
| `gorsel/istekler-kimya.json`, `istekler-kimya-ek.json` | kimyanın 24 + 4 sahne tarifi; `DERS=kimya ISTEK=gorsel/istekler-kimya.json bash gorsel/uret.sh --hepsi` |
| `gorsel/uret.sh` | Codex'i `$imagegen` ile çalıştırır (model config'ten, `MODEL=` ile değişir; `DERS=fizik\|kimya` istemdeki ders ve doğruluk şartı); üret–incele–düzelt döngüsü ve üslup (`STIL=foto`, varsayılan; `STIL=illustrasyon` da var) istemin içinde |
| `gorsel/donustur.sh` | `ham/*.png` → `dist/gorsel/<konu>-<ad>.webp` (1536 px) ve `-800.webp` |
| `gorsel/ham/` | özgün PNG'ler (depoya girmez; sunucuda durur). Sunum üreticisi slayt görsellerini WebP'den değil bunlardan kırpar |

```bash
bash gorsel/uret.sh kirilma-giris      # tek görseli yeniden üret (≈2–5 dk, en çok 3 deneme)
bash gorsel/donustur.sh                # WebP'ye çevir → dist/gorsel (anında yayında)
```

Codex görseli `$CODEX_HOME/generated_images/<oturum>/` altına yazar. Aynı anda çalışan
oturumlar bu paylaşılan klasörde birbirinin görselini kopyalayabildiği için `uret.sh` dosyayı
her zaman oturumun **kendi** klasöründen alır; 54'lük ilk üretimde bir görsel bu yüzden başka
bir konunun görseliyle karışmıştı.

Sayfada görseller `srcset` (800 / 1536 px), `loading="lazy"` ve sabit `width`/`height` ile
gelir; modal açılmadan indirilmez. `dist/gorsel/` kapının arkasında değildir (7 gün önbellek).

**Görsel değişince adresi de değiştir.** Cloudflare `.webp` dosyalarını kenarda, tarayıcılar
kendi önbelleğinde 7 gün saklar; aynı adla yazılan yeni görsel günlerce eskisi olarak görünür
(30 Eylül 2026'da tam olarak böyle oldu). Adresler bu yüzden `?v=N` taşır: bir görseli yeniden
ürettiğinde o konunun sayfasındaki `src` ve `srcset` sürümünü artır. `denetim/anlatim.js`
`src` ile `srcset`in aynı sürümü taşıdığını denetler.

### Konu 01 · Serbest düşme

Dört etkileşimli deney, canlı grafikler ve konunun tamamını anlatan bir modal:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Düşme laboratuvarı | Yükseklik **cisim yukarı aşağı sürüklenerek** de seçilir; yukarı fırlatma hızı, gökcismi (Dünya/Ay/Mars/Jüpiter) ve zaman ölçeği ayarlanır. Strobo izleri, hız–ivme okları, 8 kat ağır ikinci cisim. Altında **x–t, v–t, a–t** grafikleri canlı çizilir. |
| 02 | Tüy ve bilye | Havalı tüpte tüy limit hıza takılır, vakumlu tüpte ikisi aynı anda iner. Karesel sürtünme modeli sayısal olarak çözülür. |
| 03 | 1 : 3 : 5 kuralı | Eşit zaman aralıkları adım adım açılır; çubuklar tek sayı oranını, toplamlar 1:4:9:16:25'i gösterir. |
| 04 | Cetvelle tepki süresi | Cetvel habersizce bırakılır, boşluk tuşuyla yakalanır; düşme mesafesinden `t = √(2d/g)` hesaplanır. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta on iki başlık, yedi çizim ve üç görsel içerir: düşen
elmanın strobo gözleminden formül türetmelerine, grafik yorumundan düşey atışa ve düşme
kulelerine; kolaydan zora altı çözümlü örnek ve sekiz sık yapılan hata.

### Konu 02 · İki boyutta sabit ivmeli hareket

Atış hareketlerini yatay ve düşey bileşenlerine ayırarak gösteren dört
etkileşimli bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Atış laboratuvarı | Sürat ve açı **hız okunun ucu sürüklenerek** de ayarlanır; atış yüksekliği, gökcismi ve zaman ölçeği kaydırıcılarla seçilir. Strobo izleri, hız bileşeni okları (v, vₓ, v_y ve g) ve yörüngenin yatay/düşey izdüşümleri. Altında **x–t, y–t, vₓ–t, v_y–t** grafikleri canlı çizilir. |
| 02 | Bırakılan ve atılan | Aynı yükseklikten biri bırakılır, biri yatay atılır; kesikli çizgiler her an iki cismi aynı yükseklikte birleştirir. Bağımsızlık ilkesinin doğrudan gösterimi. |
| 03 | Menzil ve açı | Aynı süratle 15°–75° arası beş açı sırayla atılır (sıradaki atışın yolu soluk önizlemeyle görünür); tümler açıların aynı noktaya düştüğü, 45°'nin en uzağa gittiği ekranda kalır. |
| 04 | Hedefi vur | Rastgele uzaklık ve yükseklikteki hedefe açı + sürat ayarlanarak atış yapılır. İpucu düğmesi o açı için gereken sürati formülden hesaplar. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta on beş başlık, yedi çizim ve üç görsel içerir:
bağımsızlık ilkesinden vektörel bağıntılara, yatay ve eğik atıştan yörünge denklemine,
yüksekten atıştan düşen hedefe nişan almaya; kolaydan zora yedi çözümlü örnek.

### Konu 03 · Newton'un hareket yasaları

Kuvveti ve sonucunu ölçülebilir hâle getiren dört etkileşimli bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Kuvvet laboratuvarı | Uygulanan kuvvet **F okunun ucu sürüklenerek** de ayarlanır; kütle ve zemin (μ) seçilir; kutunun üzerinde **serbest cisim diyagramı** (F, f, N, G) canlı çizilir. Statik sürtünme eşiği aşılmazsa kutu kıpırdamaz. Altında **ΣF–t, a–t, v–t, x–t** grafikleri. |
| 02 | Sürtünmeyi azaltınca | Aynı hızla itilen dört disk halı, parke, buz ve sürtünmesiz ortamda; durma mesafeleri `d = v²/(2μg)`. Sürtünmesiz şerit hiç durmaz — 1. yasanın deneysel yüzü. |
| 03 | Etki ve tepki | İki araba birbirini iter; kuvvetler eşit, ivmeler kütleyle ters orantılı. Ayrılma hızlarının oranı kütle oranının tersidir. |
| 04 | Asansörde görünen ağırlık | Kütle ve asansör durumu seçilir; `N = m(g + a)` ile tartının yazdığı değer değişir, serbest düşmede sıfırlanır. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta on beş başlık, yedi çizim ve üç görsel içerir: net
kuvvetten serbest cisim diyagramına, sürtünmeden asansöre ve birlikte hareket eden
cisimlere; kolaydan zora yedi çözümlü örnek.

### Konu 04 · Sürtünme kuvveti

Statik ve kinetik sürtünmeyi ölçülebilir hâle getiren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Sürtünme laboratuvarı | Kuvvet yavaşça artırılır; sürtünme uygulanan kuvvete eşit büyür, eşiği aşınca kinetik değerine düşer. Yanında **f–F** ve **a–F** grafikleri canlı çizilir. |
| 02 | Eğik düzlemde kritik açı | Eğim, **tepesinden sürüklenerek** ya da kaydırıcıyla artırılır; kayma açısının tanjantı doğrudan μs'yi verir. |
| 03 | Temas alanı | Aynı kütleli üç farklı yüzey aynı noktada durur: f = μ·N bağıntısında alan yoktur. |
| 04 | Fren mesafesi | Hız, tepki süresi ve yol durumu seçilir; tepki + fren mesafesi ayrı ayrı gösterilir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Konu 05 · Limit hız

Hava direncinin hıza bağlılığını ve denge hızını gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Hava direnci laboratuvarı | Kütle ve yüzey alanı seçilir; hız `v = v(limit)·tanh(gt/v(limit))` ile doyar. **v–t** ve **a–t** grafikleri, hava direncisiz ikizle birlikte. |
| 02 | Paraşüt açılıyor | Sayısal çözüm; v–t eğrisinde iki plato (55 m/s ve 5,1 m/s). |
| 03 | Kâğıt deneyi | Aynı kütleli açık ve buruşturulmuş kâğıt ile bilye; belirleyici olan m/A oranı. |
| 04 | Neye bağlı? | Limit hızın kütle ve alana bağlılığı iki eğri üzerinde canlı gösterilir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Konu 06 · Düzgün çembersel hareket

Sabit süratli ama ivmeli hareketi gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Çember laboratuvarı | Yarıçap **top içeri dışarı sürüklenerek**, periyot ve kütle kaydırıcıyla ayarlanır; hız teğet, ivme merkeze doğru çizilir. **a–v** ve **a–r** grafikleri. |
| 02 | İpi kes | İp kesildiğinde cisim teğet doğrultuda gider; "merkezden dışarı" sanısı da çizilir. |
| 03 | Aynı disk | Üç farklı yarıçaptaki nokta: T ve ω ortak, v ve a farklı. |
| 04 | Virajda savrulma | Gereken merkezcil kuvvet ile sürtünme sınırı karşılaştırılır; sınır hız √(μgr). |
| 05 | Hızlı kontrol | On soruluk test. |

### Elektrik ve Manyetizma · Konu 01 · Elektriksel kuvvet ve alan

Yüklerin birbirine dokunmadan uyguladığı kuvveti ve alan kavramını kuran dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Coulomb laboratuvarı | İki yükün büyüklüğü ve işareti seçilir, aralarındaki uzaklık **yükler sürüklenerek** de değiştirilir; kuvvet okları ve çekme/itme canlı gösterilir. **F–r** (ters kare) ve **F–q** (doğru orantı) grafikleri. |
| 02 | Alan haritası | Izgara üzerinde alan okları çizilir; tek yük, dipol ve aynı işaretli iki yük seçilebilir. Tıklanan noktaya test yükü konur, gördüğü kuvvet okla gösterilir. |
| 03 | Alanın sıfırlandığı nokta | İkinci yükün değeri değiştirilir, **prob eksende sürüklenir**; bileşke alanın sıfırlandığı nokta sayısal taramayla bulunur ve işaretlenir. |
| 04 | Paralel levhalar | `E = V/d` ile düzgün alan kurulur; elektron ya da proton atılır, parabolik yörünge ve levhaya çarpma izlenir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Elektrik ve Manyetizma · Konu 02 · Manyetik alan ve manyetik kuvvet

Akımın ürettiği alanı ve alanın uyguladığı kuvveti gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Telin manyetik alanı | Akım kaydırıcıyla, uzaklık **pusula sürüklenerek** ayarlanır; `B = 2·10⁻⁷·I/r` halkaları ve pusula iğnesi çizilir. **B–r** ve **B–I** grafikleri. |
| 02 | Tele etkiyen kuvvet | Alan, akım ve açı değiştirilir; `F = B·I·L·sinα` kuvvet oku ve sinüs eğrisi aynı sahnede gösterilir. |
| 03 | Dairesel hareket | Alana dik giren elektron/protonun yarıçapı `r = mv/(qB)` ve periyodu `T = 2πm/(qB)`; ölçek çubuğuyla birlikte. |
| 04 | Sağ el kuralı alıştırması | Rastgele akım–alan çiftleri için kuvvet yönü sorulur; puan ve doğruluk oranı tutulur. |
| 05 | Hızlı kontrol | On soruluk test. |

### Elektrik ve Manyetizma · Konu 03 · İndüksiyon akımı

Değişen akının akım doğurmasını dört ayrı deneyle gösteren bölümler:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Mıknatıs ve bobin | Mıknatıs bobinden geçirilir ya da **elle sürüklenerek** ileri geri oynatılır; akı çan eğrisi, indüklenen emk ve galvanometre iğnesi eşzamanlı çizilir. **Φ–t** ve **ε–t** grafikleri. |
| 02 | Jeneratör | Dönen çerçevede `Φ = B·A·cosωt` ve `ε = N·B·A·ω·sinωt`; çeyrek periyotluk faz farkı grafikte görünür. |
| 03 | Hareketli çubuk | `ε = B·L·v`, `I = ε/R` ve karşı kuvvet `F = B·I·L` hesaplanır; mekanik güç ile elektriksel güç karşılaştırılır. |
| 04 | Bakır boru | Aynı mıknatıs plastik ve bakır borudan bırakılır: 0,49 s'e karşı 5,5 s. Lenz yasasının en çarpıcı gösterimi. |
| 05 | Hızlı kontrol | On soruluk test. |

### Elektrik ve Manyetizma · Konu 04 · Transformatörler

Gerilim–akım dönüşümünü ve enerji iletimini gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Transformatör laboratuvarı | Giriş gerilimi, primer/sekonder sarım sayısı ve yük direnci ayarlanır; nüve, bobinler ve ölçüm değerleri canlı çizilir. **V₂–N₂** (doğru orantı) ve **V₂–N₁** (ters orantı) grafikleri. |
| 02 | Güç ve verim | Giren güç ve verim değiştirilir; çıkan güç, kayıp ve ısıya dönüşen pay çubuklarda gösterilir. |
| 03 | Enerji iletimi | 1 MW gücün iletiminde gerilim ve hat direnci değiştirilir; `I = P/V` ve `P(kayıp) = I²R` ile kayıp oranı hesaplanır, santral–şehir hattı canlandırılır. |
| 04 | Hedef gerilim | Verilen `V₁` ve `N₁` için istenen çıkışı üretecek sekonder sarımı bulunur; %2 tolerans, deneme listesi ve başarı oranı. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 01 · Işık şiddeti, ışık akısı ve aydınlanma

Kandela, lümen ve lüksü birbirinden ayıran dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Aydınlanma laboratuvarı | Kaynağın şiddeti, yüksekliği ve ölçüm yüzeyinin eğimi ayarlanır; `E = I·cosθ/d²` canlı hesaplanır. **E–d** (ters kare) ve **E–I** (doğru orantı) grafikleri. |
| 02 | Ters kare yasası | Perde uzaklaştıkça aynı akının 1, 4, 9 birim kareye yayılması; karşıdan görünüm ızgarasıyla. |
| 03 | Fotometre | İki lambanın arasındaki ekran kaydırılır; eşit aydınlanma noktası `x/(L−x) = √(I₁/I₂)` ile bulunur, iki eğri tek panelde çizilir. |
| 04 | Oda aydınlatma tasarımı | Kullanım amacı, oda alanı ve ampul lümeni seçilir; gereken toplam akı ve ampul sayısı hesaplanır, oda üstten çizilir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 02 · Düzlem aynalar

Tek bir yasadan (i = r) türeyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Yansıma laboratuvarı | Gelme açısı ve aynanın dönme açısı ayarlanır; normal, açı yayları ve aynanın ilk yeri çizilir. Yansıyan ışının dönmesinin `2α` olduğu grafikle gösterilir. |
| 02 | Görüntü oluşumu | Cisim konumlandırılır; iki ışın göze gider, uzantıları aynanın arkasındaki sanal görüntüde kesişir. Yaklaşma animasyonunda bağıl hızın `2v` olduğu okunur. |
| 03 | İki ayna | Aynalar arası açı seçilir; görüntüler çember üzerinde ardışık yansımalarla hesaplanıp çizilir, `n = 360/α − 1` doğrulanır. |
| 04 | Boy aynası | Boy ve aynaya uzaklık değiştirilir; baş ve ayaktan gelen ışınlarla gereken `h/2`'lik ayna ve alt kenar yüksekliği bulunur. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 03 · Küresel aynalar

Çukur ve tümsek aynayı tek düzenekte toplayan dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Işın çizimi laboratuvarı | Ayna türü, yarıçap, cisim uzaklığı ve boyu ayarlanır; üç asal ışın yayın üzerinde gerçek kesişim noktalarıyla çizilir, sanal görüntüde uzantılar kesikli gösterilir. **\|b\|–a** ve **m–a** grafikleri. |
| 02 | Beş cisim konumu | Merkezin ötesinden odak içine beş konum; görüntünün yeri, türü ve boyu eşzamanlı güncellenir, "sırayla göster" ile tur atar. |
| 03 | Tümsek ayna | Güvenlik aynasının görüş açısı, aynı boyuttaki düzlem aynayla karşılaştırılır; görüntünün hep sanal, düz ve küçük olduğu görülür. |
| 04 | Hedef büyütme | İstenen büyütme ve görüntü türü için cisim uzaklığı bulunur; %5 tolerans, deneme listesi ve başarı oranı. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 04 · Kırılma

Snell yasasını dört ayrı yüzüyle gösteren bölümler:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Snell laboratuvarı | İki ortam (hava/su/cam/elmas) ve gelme açısı seçilir; gelen, yansıyan ve kırılan ışın açı yaylarıyla çizilir. Kırılma açısı–gelme açısı eğrisi, sınır açı işaretiyle. |
| 02 | Tam yansıma | Yoğun ortamın indisi ve gelme açısı değiştirilir; sınır açıya yaklaşırken kırılan ışın sönükleşir, aşıldığında tamamen yansır. |
| 03 | Hız ve dalga boyu | Dalga cepheleri sınırda sıklaşarak yön değiştirir; `v = c/n`, `λ = λ₀/n` ve frekansın değişmediği vurgulanır. |
| 04 | Yandan kayma | Paralel kenarlı levhada `d = t·sin(i−r)/cos r` ölçülür; çıkan ışının gelene paralel olduğu çizimle gösterilir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 05 · Görünür derinlik

Kırılmanın günlük sonuçlarını işleyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Havuz laboratuvarı | Derinlik ve sıvı seçilir; dik ve eğik ışının kırılması, uzantıların kesiştiği görünen derinlik çizilir. **h′–h** ve **h′–n** grafikleri. |
| 02 | Balığa nişan almak | Rastgele derinlikteki balığın görünen yeri hesaplanır; nişan açısıyla mızrak atılır, sapma santimetre cinsinden bildirilir. |
| 03 | Sudan havaya bakış | Su altındaki gözlemci için `h′ = n·h`; cismin uzaklaşmış görünmesi ışın çizimiyle gösterilir. |
| 04 | Cam levha | Levhanın kalınlığı ve indisi değiştirilir; altındaki yazının `t(1 − 1/n)` kadar yükselmesi ölçülür. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 06 · Fiber optik

Tam yansımanın mühendislik uygulaması, dört bölümde:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Fiber laboratuvarı | Çekirdek ve kılıf indisleri ile giriş açısı ayarlanır; ışık ya zikzak çizerek taşınır ya da kılıfa kaçar. Sınır açı ve duvara geliş açısı karşılaştırılır. |
| 02 | Kabul açısı | `NA = √(n₁²−n₂²)` ve kabul konisi çizilir; koninin içinden ve dışından gelen iki ışının akıbeti gösterilir. |
| 03 | Sinyal gecikmesi | Kablo uzunluğuna göre `v = c/n₁`, varış süresi ve mod dağılımından doğan gecikme farkı hesaplanır. |
| 04 | Bükülme sınırı | Bükülme yarıçapı küçültülür; `R(min) = a(n₁+n₂)/(n₁−n₂)` altına inince ışığın sızdığı canlandırılır. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 07 · Prizmalar

İki kırılmanın sonuçlarını işleyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Prizmada sapma | Tepe açısı, gelme açısı ve indis ayarlanır; ışın yolu vektörel olarak çizilir, `δ = i₁ + i₂ − A` ölçülür. δ–i₁ eğrisi ve en küçük sapma işareti. |
| 02 | Renklere ayrılma | Altı renk kendi indisiyle ayrı ayrı izlenir; perdeye düşen tayf büyütülmüş bir şerit olarak gösterilir. |
| 03 | Tam yansımalı prizma | 45° prizmada ışığın 90° ya da 180° döndürülmesi; indis düşürülünce tam yansımanın bozulması. |
| 04 | Gökkuşağı | Su damlasında kırılma + iç yansıma + kırılma; sapma–çarpma parametresi eğrisinin en küçüğü 42°'lik gökkuşağı açısını verir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Optik · Konu 08 · Mercekler

Ünitenin kapanışı, dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Işın çizimi laboratuvarı | İnce/kalın kenarlı seçimi, odak uzaklığı, cisim uzaklığı ve boyu; asal ışınlar ve görüntü çizilir, mercek gücü diyoptri olarak okunur. **\|b\|–a** ve **m–a** grafikleri. |
| 02 | Beş cisim konumu | Her konum bir optik aletle eşleştirilir: fotoğraf makinesi, fotokopi, projeksiyon, projektör, büyüteç. |
| 03 | Göz kusurları | Miyop ve hipermetrop göz modeli; odağın retinanın önüne/arkasına düşmesi ve gözlük takılınca düzelmesi, gereken diyoptriyle birlikte. |
| 04 | Perdeye net görüntü | Cisim–perde uzaklığı sabitken mercek kaydırılır; `D > 4f` olduğunda iki net konumun bulunduğu bulanıklık göstergesiyle gösterilir. |
| 05 | Hızlı kontrol | On soruluk test. |

### Kimya · Enerji · Konu 01 · Tepkimelerde enerji değişimi

Isı alan ve ısı veren olayları ölçülebilir kılan dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Kalorimetre laboratuvarı | Köpük bardakta beş olay: NaOH, CaCl₂, NH₄NO₃ ve NH₄Cl'nin çözünmesi, HCl + NaOH nötrleşmesi. Madde miktarı ve su kütlesi seçilir; **Ekle** ile sıcaklık ΔT = −n·ΔH/(m·c) değerine üstel yaklaşır. Sistem–çevre ısı okları, q ve ΔH okumaları; **T–t** grafiği sürüklenerek okunur. |
| 02 | Isı alır mı, verir mi? | 22 kartlık sınıflandırma oyunu (fiziksel ve kimyasal olaylar): cevaptan sonra ısı okları, entalpi diyagramı, ΔH ve gerekçe; puan tutulur. |
| 03 | Yakıtları karşılaştır | On yakıt mol ve gram başına; 1 kg suyu 20 °C'den 100 °C'ye ısıtmak için verime göre gereken yakıt, çıkan CO₂ ve gaz hacmi. |
| 04 | Besinlerin enerjisi | Altı besinli kahvaltı tabağı: toplam kJ ve kcal, yağın payı ve yaklaşık yürüyüş süresi. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 21 çizim ve 4 görsel içerir.

### Kimya · Enerji · Konu 02 · Bağ enerjileri ve tepkime entalpisi

Kırılan ve oluşan bağlardan tepkime ısısına giden dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Bağ kır, bağ kur | Altı tepkimede bağlar tek tek kırılır ve yeniden kurulur; altta enerji merdiveni: Σkırılan, Σoluşan ve ΔH. Adım adım ilerletilebilir. |
| 02 | Bağın gücü ve uzunluğu | Sekiz bağın potansiyel enerji–uzaklık eğrisi; atom **sürüklenerek** uzaklaştırılır. Kuyunun dibi bağ enerjisi, yeri bağ uzunluğudur. |
| 03 | Bilinmeyen bağ enerjisi | On soruluk bulmaca: ΔH ve öteki bağlardan bilinmeyen bağ bulunur; ±%2 tolerans, ipucu ve adım adım çözüm. |
| 04 | Hesap ne kadar doğru? | Bağ enerjileriyle hesaplanan ΔH ile oluşum entalpilerinden gelen ölçülen değer yan yana; farkın nedenleri (ortalama değer, hâl değişimi). |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 21 çizim ve 3 görsel içerir.

### Kimya · Enerji · Konu 03 · Standart oluşum ve tepkime entalpisi

Elementlerin sıfır noktasından tepkime ısısına giden dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Oluşum entalpisi laboratuvarı | Sekiz tepkime; entalpi diyagramında girenler → elementler (0) → ürünler yolu **Yolu göster** ile canlanır, hesap tablosu satır satır vurgulanır. |
| 02 | Kararlılık çizelgesi | ΔH°f çubukları sıfırın altında ve üstünde; dokunulan maddenin oluşum denklemi ve yorumu; allotroplar (grafit/elmas, O₂/O₃). |
| 03 | Fiziksel hâl farkı | H₂, CH₄ ve C₃H₈ yanmasında ürün suyun hâli (buz, sıvı, buhar): ΔH farkı ve moleküllerin düzeni. |
| 04 | Ne kadar ısı? | Gram, NK'da litre ya da mol ile ısı hesabı; **Hedef ısı** görevi, ±%2. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 21 çizim ve 3 görsel içerir.

### Kimya · Hız · Konu 01 · Tepkimelerin gerçekleşme şartları

Çarpışma teorisini ve aktifleşme enerjisini gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Çarpışma kutusu | A ve B tanecikleri çarpışır; çarpışma doğrultusundaki bağıl kinetik enerji eşikle karşılaştırılır, yönelim şartı açılıp kapatılır. Ürün–zaman grafiği ve çarpışma dökümü. |
| 02 | Doğru uç, doğru yön | CO + NO₂: CO **sürüklenerek** yöneltilir; etkin çarpışmada aktifleşmiş kompleks ve CO₂ + NO oluşur, değilse esnek sekme. |
| 03 | Enerji tepesi | Potansiyel enerji grafiğinde top enerjinin korunumuyla tepeye tırmanır; Ea(ileri), Ea(geri) ve ΔH okları. |
| 04 | Kendini sürdüren tepkime | Izgarada kıvılcımla başlayan tepkime: ekzotermikte açığa çıkan ısı komşulara yeterse yayılır; endotermikte yalnız ısıtıcının altı tepkir. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 20 çizim ve 3 görsel içerir.

### Kimya · Hız · Konu 02 · Ortalama tepkime hızı

Hızın tanımını, ölçümünü ve birimlerini işleyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Derişim–zaman laboratuvarı | 2N₂O₅ → 4NO₂ + O₂: üç derişim eğrisi; iki zaman işaretçisi **sürüklenerek** kesen ve ortalama hızlar; teğetle anlık hız. |
| 02 | Katsayılar ve hızlar | Dört tepkimede bir maddenin hızı verilir; bütün maddelerin hızları katsayı oranında bloklarla gösterilir. |
| 03 | Hızı ölçmek | Mg + HCl gaz şırıngasıyla ya da CaCO₃ + HCl teraziyle: 10 s'de bir tablo satırı, aralık hızları ve mol/s. |
| 04 | Aynı hız, farklı birimler | On iki soruluk dönüşüm bulmacası: g/s, mol/s, L/s (NK), M/s. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 19 çizim ve 4 görsel içerir.

### Kimya · Hız · Konu 03 · Tepkime hızına etki eden faktörler

Maddenin cinsi ve hâli, derişim ve sıcaklık; dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Derişim laboratuvarı | Pistonlu kapta A–B çarpışmaları sayılır; çarpışma sıklığı [A]·[B] ile orantılıdır. Piston **sürüklenir**. |
| 02 | Sıcaklık ve enerji dağılımı | T₁ ve T₂ dağılımları, eşiği aşan paylar ve hız oranı; hazır sıcaklıklar (buzdolabı, oda, ateşli hasta, kaynar su). |
| 03 | Maddenin cinsi | HCl'de Mg, Zn, Fe ve Cu; ikinci kipte Ag⁺ + Cl⁻ anında çöker. |
| 04 | Fiziksel hâl | Pb(NO₃)₂ + 2KI: katı + katı ile çözelti + çözelti; iyonların yakın görünümü ve PbI₂ kütlesi–zaman grafiği. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 19 çizim ve 4 görsel içerir.

### Kimya · Hız · Konu 04 · Katalizör ve temas yüzeyi

Katalizörün açtığı yolu ve temas yüzeyini gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Katalizör laboratuvarı | Potansiyel enerji eğrileri ve kinetik enerji dağılımı yan yana; tepe ya da eşik **sürüklenince** Ea(ileri) ve Ea(geri) aynı miktar değişir, ΔH sabit kalır. Katalizör ya da inhibitör. |
| 02 | Hidrojen peroksit ve katalizör | Katalizörsüz, MnO₂, KI ve patates: O₂ hacmi–zaman eğrileri; son hacim aynı, MnO₂ kütlesi değişmez. |
| 03 | Temas yüzeyi | 2 cm'lik mermer küp k³ parçaya bölünür (yüzey 24·k cm²); tek parça ile bölünmüş mermerin yarışı. |
| 04 | Katalizör yüzeyinde | Katalitik konvertör benzetimi: CO ve O₂ platine tutunur, CO₂ oluşup ayrılır; zehirlenme anahtarı. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 20 çizim ve 4 görsel içerir.

### Kimya · Hız · Konu 05 · Hız denklemi

Hız denklemini deneyle bulan ve basamakları ayıran dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Başlangıç hızları laboratuvarı | Gizli dereceli tepkimede deney kurulur, başlangıç hızları tabloya yazılır; a ve b tahmin edilir, doğruysa k birimiyle hesaplanır. |
| 02 | Derece ve grafik | 0., 1. ve 2. derecede Hız–[X] eğrisi; nokta **sürüklenir**, "2 katına çık" ×2ⁿ'i gösterir. |
| 03 | Hacim değişince | Piston **sürüklenerek** hacim değişir; hız çarpanı (V₀/V)ⁿ; katı tepken hız denkleminde yer almaz. |
| 04 | Çok basamaklı tepkime | Üç mekanizma bant benzetimiyle; ürün hızı en yavaş basamağa eşit kalır, ara ürün sayılır; çok tepeli potansiyel enerji eğrisi. |
| 05 | Hızlı kontrol | On soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı dört basamakta 21 çizim ve 3 görsel içerir.

## Kimya bölümü: ortak kurallar

Kimya sayfaları fizik sayfalarıyla aynı iskeleti, aynı stil bloğunu ve aynı tuval altyapısını
(`kit`, tek animasyon döngüsü, `surukle`, grafik panelleri) taşır; marka satırında "kimya" yazar.
Betik bloklarında ayrıca **kimya yardımcıları** vardır: `formul` (CH4 → CH₄), `atom`, `bag`,
`molekul` ve sık kullanılan molekül şablonları (`MOL`), `okDikey`, potansiyel enerji–tepkime
koordinatı paneli (`peDeger`, `pePanel`; kısımlar kosinüs eğrisiyle birleşir, tepe tam Ea
seviyesindedir) ve kinetik enerji dağılımı paneli (`dagilim`, `esikUstu`, `mbPanel`; üç boyutlu
ideal gaz dağılımı, eşik üstü pay erfc ile).

Atomların renkleri alışılmış CPK renkleridir ve tema belirteçlerinden gelir (`--c-atom-h`,
`--c-atom-c`, `--c-atom-o`, `--c-atom-n`, `--c-atom-cl`, … ; X, Y, Z genel tanecikler mor,
turuncu, camgöbeği). SVG çizimlerde atom `circle.at.at-o`, üstündeki sembol `text.atl`
(açık renkli atomlarda `atl dk`); koyu temada bütün semboller kendiliğinden koyu yazılır
(karşıtlık ≥ 6 : 1).

Çizimlerde renklerin anlamı: mavi girenler, yeşil ürünler ve sonuç, sarı ısı/enerji ve ΔH, mor
aktifleşmiş kompleks, katalizörlü yol ya da ikinci sıcaklık, kırmızı enerji engeli (Ea), kırılan
bağ ya da yanlış. Enerji grafiklerinde seviyeler ve ok boyları değerlerle orantılıdır.

Bütün konularda aynı veri kullanılır: ortalama bağ enerjileri (C=O genel 745, CO₂'deki 799),
standart oluşum entalpileri, yakıtların molar ve gram başına yanma ısıları (gram başına değerler
tam sayılı mol kütleleriyle: H₂ 142,9 · CH₄ 55,6 · C₃H₈ 50,5 kJ/g), besin enerjileri (17 / 17 /
37 kJ/g), su için c = 4,18 J/(g·°C), NK'da 22,4 L/mol. Gösterim: hâl simgeleri (k), (s), (g),
(suda); ondalık virgül; bilimsel gösterim 2,0·10⁻³; dört haneli sayılarda binlik ayraç yok, beş
ve daha çok hanede dar bölünmez boşluk; "25 °C'de". Lise kabulleri fasikülle uyumludur:
sıcaklık, katalizör ve temas yüzeyi k'yı değiştirir, derişim değiştirmez; katalizör Ea(ileri) ve
Ea(geri)'yi aynı miktar düşürür, ΔH'yi değiştirmez; katı ve saf sıvılar hız denkleminde yer almaz.

Her konu yazıldıktan sonra bağımsız bir kimya hakeminden geçti (bütün sayılar yeniden
hesaplandı, çizimler koordinattan ölçüldü, deney okumaları tarayıcıda denendi); bulunan hatalar
düzeltildi.

## Sunumlar

Yirmi altı konunun her biri için, sitede indirilebilir 117–157 slaytlık PowerPoint
dosyaları. Her deste o konunun **konu anlatımından üretilir** ve onun dört basamaklı
yolunu izler: aynı başlıklar, formüller, tablolar, çizimler ve görseller, aynı
"Düşün" soruları ve kolaydan zora aynı çözümlü örnekler. Slaytta az metin kalır:
bölüm slaytının başlık cümlesi anlatımdaki "Kısaca" kutusudur; paragraflar
konuşmacı notundadır.

| # | Sunum | Bağlantı |
|---|---|---|
| 01 | Serbest düşme | [dersler.perinet.org/sunum/serbest-dusme.pptx](https://dersler.perinet.org/sunum/serbest-dusme.pptx) |
| 02 | İki boyutta sabit ivmeli hareket | [dersler.perinet.org/sunum/iki-boyutta-hareket.pptx](https://dersler.perinet.org/sunum/iki-boyutta-hareket.pptx) |
| 03 | Newton'un hareket yasaları | [dersler.perinet.org/sunum/newton-yasalari.pptx](https://dersler.perinet.org/sunum/newton-yasalari.pptx) |
| 04 | Sürtünme kuvveti | [dersler.perinet.org/sunum/surtunme-kuvveti.pptx](https://dersler.perinet.org/sunum/surtunme-kuvveti.pptx) |
| 05 | Limit hız | [dersler.perinet.org/sunum/limit-hiz.pptx](https://dersler.perinet.org/sunum/limit-hiz.pptx) |
| 06 | Düzgün çembersel hareket | [dersler.perinet.org/sunum/cembersel-hareket.pptx](https://dersler.perinet.org/sunum/cembersel-hareket.pptx) |

Elektrik ve Manyetizma ünitesi:

| # | Sunum | Bağlantı |
|---|---|---|
| 01 | Elektriksel kuvvet ve alan | [dersler.perinet.org/sunum/elektriksel-kuvvet.pptx](https://dersler.perinet.org/sunum/elektriksel-kuvvet.pptx) |
| 02 | Manyetik alan ve manyetik kuvvet | [dersler.perinet.org/sunum/manyetik-alan.pptx](https://dersler.perinet.org/sunum/manyetik-alan.pptx) |
| 03 | İndüksiyon akımı | [dersler.perinet.org/sunum/induksiyon-akimi.pptx](https://dersler.perinet.org/sunum/induksiyon-akimi.pptx) |
| 04 | Transformatörler | [dersler.perinet.org/sunum/transformatorler.pptx](https://dersler.perinet.org/sunum/transformatorler.pptx) |

Optik ünitesi:

| # | Sunum | Bağlantı |
|---|---|---|
| 01 | Işık şiddeti, akı ve aydınlanma | [dersler.perinet.org/sunum/isik-siddeti.pptx](https://dersler.perinet.org/sunum/isik-siddeti.pptx) |
| 02 | Düzlem aynalar | [dersler.perinet.org/sunum/duzlem-aynalar.pptx](https://dersler.perinet.org/sunum/duzlem-aynalar.pptx) |
| 03 | Küresel aynalar | [dersler.perinet.org/sunum/kuresel-aynalar.pptx](https://dersler.perinet.org/sunum/kuresel-aynalar.pptx) |
| 04 | Kırılma | [dersler.perinet.org/sunum/kirilma.pptx](https://dersler.perinet.org/sunum/kirilma.pptx) |
| 05 | Görünür derinlik | [dersler.perinet.org/sunum/gorunur-derinlik.pptx](https://dersler.perinet.org/sunum/gorunur-derinlik.pptx) |
| 06 | Fiber optik | [dersler.perinet.org/sunum/fiber-optik.pptx](https://dersler.perinet.org/sunum/fiber-optik.pptx) |
| 07 | Prizmalar | [dersler.perinet.org/sunum/prizmalar.pptx](https://dersler.perinet.org/sunum/prizmalar.pptx) |
| 08 | Mercekler | [dersler.perinet.org/sunum/mercekler.pptx](https://dersler.perinet.org/sunum/mercekler.pptx) |

Kimya · Kimyasal Tepkimelerde Enerji ünitesi:

| # | Sunum | Bağlantı |
|---|---|---|
| 01 | Tepkimelerde enerji değişimi | [dersler.perinet.org/sunum/enerji-degisimi.pptx](https://dersler.perinet.org/sunum/enerji-degisimi.pptx) |
| 02 | Bağ enerjileri ve tepkime entalpisi | [dersler.perinet.org/sunum/bag-enerjisi.pptx](https://dersler.perinet.org/sunum/bag-enerjisi.pptx) |
| 03 | Standart oluşum ve tepkime entalpisi | [dersler.perinet.org/sunum/olusum-entalpisi.pptx](https://dersler.perinet.org/sunum/olusum-entalpisi.pptx) |

Kimya · Kimyasal Tepkimelerde Hız ünitesi:

| # | Sunum | Bağlantı |
|---|---|---|
| 01 | Tepkimelerin gerçekleşme şartları | [dersler.perinet.org/sunum/carpisma-teorisi.pptx](https://dersler.perinet.org/sunum/carpisma-teorisi.pptx) |
| 02 | Ortalama tepkime hızı | [dersler.perinet.org/sunum/tepkime-hizi.pptx](https://dersler.perinet.org/sunum/tepkime-hizi.pptx) |
| 03 | Tepkime hızına etki eden faktörler | [dersler.perinet.org/sunum/hiz-faktorleri.pptx](https://dersler.perinet.org/sunum/hiz-faktorleri.pptx) |
| 04 | Katalizör ve temas yüzeyi | [dersler.perinet.org/sunum/katalizor.pptx](https://dersler.perinet.org/sunum/katalizor.pptx) |
| 05 | Hız denklemi | [dersler.perinet.org/sunum/hiz-denklemi.pptx](https://dersler.perinet.org/sunum/hiz-denklemi.pptx) |

Her deste giriş görselli bir kapakla açılır; açılış sorusu ve dört sütunlu
"bu derste" haritasından sonra her basamak koyu bir ayraç slaytıyla başlar (numara,
açıklama, başlıklar; sağda günlük ya da uygulama görseli, temel bağıntılar ya da
zorluk rozetli örnek listesi). Bölüm slaytlarında başlığın altında "Kısaca" bandı, sağda
ilgili çizim durur; "Düşün" soruları soru ve cevap olarak iki slayta ayrılır (deste
başına en çok altı çift). Örnek başına bir çözüm slaydı (Kolay / Orta / Zor rozetiyle),
iki sütunlu hata kartları ve özetle kapanır; tablolar PowerPoint'in kendi tablo
nesneleridir. Yirmi altı dosya
tek seferde (yaklaşık 72 MB)
[dersler.perinet.org/sunum/dersler-sunumlar.zip](https://dersler.perinet.org/sunum/dersler-sunumlar.zip)
adresinden de indirilebilir. Dosyalar `sunum/*.js` betikleriyle üretilir;
ayrıntılar [`sunum/README.md`](sunum/README.md) içinde.

## Konu anlatımı çizimleri

Yirmi altı konunun her birinde konu anlatımı modalı 16–21 **satır içi SVG
çizimle** birlikte gelir; toplam 492 çizim (fizikte 330, kimyada 162). Her biri o başlığın mekanizmasını
gösterir: strobo izleri, serbest cisim diyagramları, ışın çizimleri, alan
haritaları, vektör üçgenleri, karşılaştırma çubukları ve grafikler. Altlarındaki
açıklama, çizimin ne söylediğini bir paragrafta bağlar. Modalın başında ayrıca
konuyu günlük bir soruyla açan kısa bir giriş bloğu vardır.

Çizimlerin ortak bir dili var ve tamamı CSS değişkenlerinden renk aldığı için
tema değişiminde kendiliğinden uyum sağlar:

| Renk | Anlamı |
|---|---|
| Mavi | hız, akım, ana büyüklük |
| Sarı | kuvvet, alan, ağırlık, ışık |
| Yeşil | net kuvvet, sonuç, "doğru" |
| Mor | ikinci durum, görüntü, indüklenen |
| Kırmızı | karşı kuvvet, kayıp, "yanlış" |

Teknik olarak: ortak `.fig` kartı, `480` birimlik `viewBox`, paylaşılan ok
başlıkları (`<marker>`), `role="img"` ve açıklayıcı `aria-label`. Dar ekranda
çizim 292 piksele iner, yatay kaydırma oluşmaz.

## Tasarım dili

Sayfalar tek bir belirteç kümesinden beslenir; renk, gölge, köşe yarıçapı ve
yazı tipi seçimleri `:root` üzerindeki CSS değişkenlerinde durur ve koyu tema
aynı değişkenleri yeniden tanımlar.

| Katman | Seçim |
|---|---|
| Başlıklar | **Fraunces** (değişken serif, `opsz` ekseni açık, vurgu sözcüğü italik) |
| Metin ve arayüz | **Inter** (`cv11`, `ss01`; sayısal okumalarda `tabular-nums`) |
| Formül ve kod | **JetBrains Mono** |
| Ana düğme | Mürekkep rengi zemin, beyaz yazı; koyu temada tersi |
| Yüzeyler | Beyaz kart, ince çizgi, lacivert tonlu katmanlı gölge, üst kenarda 1 px ışık |
| Zemin | Yumuşak radyal yıkamalar + `%4` opaklıkta SVG kâğıt dokusu |
| Hareket | Bölümler görünüme girince belirir; tema düğmesi View Transitions ile dairesel geçiş yapar; `prefers-reduced-motion` tümünü kapatır |

Renklerin anlamı (mavi hız / akım, sarı kuvvet / alan, yeşil sonuç, mor ikinci
durum, kırmızı karşı kuvvet) tuvallerde ve 122 çizimde aynıdır; tema
değişiminde tuvaller CSS değişkenlerini yeniden okuyup çizer.

Ana sayfada hero arkasında eşit zaman aralıklı strobo izleriyle üç atış yayı
canlı çizilir (tuval, düşük alfa; sekme görünmezken ve azaltılmış harekette
durur). Konu sayfalarında `Boşluk` ve `R` kısayolları alt bilgide hatırlatılır.
Klavye kullanıcıları için her sayfanın başında "İçeriğe geç" bağlantısı vardır.

Paylaşım için her sayfada Open Graph / Twitter kartı etiketleri ve ortak bir
`og.png` bulunur; site `manifest.webmanifest` ile ana ekrana eklenebilir,
`sitemap.xml` ve `robots.txt` taşır, bilinmeyen adresler özel `404.html`
sayfasına düşer.

## Ortak davranış

Sayfalar açık temayla açılır, üst bardaki düğmeyle koyu temaya geçer ve seçim
tarayıcıda saklanır. Tuval renkleri CSS değişkenlerinden okunduğu için
animasyonlar tema değişiminde yeniden çizilir.

Her konunun **Hızlı kontrol** testi on sorudur (2 Ekim 2026'ya kadar beşti): kolaydan zora
sıralıdır, en az ikisi sayfadaki deneylere dayanır; her sorunun dört seçeneği ve cevaptan sonra
açılan, nedenini anlatan kısa bir açıklaması vardır. Çeldiriciler tipik hatalardan doğar (kareyi
unutmak, birim çevirmemek, işaret…); doğru cevaplar A–D arasında dengeli dağılır (her harf 2–3
kez). Sorular sayfa betiğindeki `DATA` dizisindedir (`q`, `o`, `a`, `why`): `q` HTML olarak
basılır (yalnız `<br>`, `<b>`, `<i>`; olumsuz kök `<b>` ile vurgulanır), seçenekler ve açıklama
düz metin. Bitiş cümlesi doğru sayısının %60 eşiğine göre seçilir. Sorular tek tek gösterilir; yine
de bir açıklama başka bir sorunun cevabını ele vermemelidir, çünkü bitişteki gözden geçirmede
hepsi birlikte görünür.

Hızlı kontrol testi tamamlanınca sonuç (`doğru / toplam`, tarih) yalnızca o
tarayıcının `localStorage` alanına yazılır (`dersler-skor`); sayfa yeniden
açıldığında skor kutusunda "Son sonucun" rozeti görünür. Ana sayfa aynı kaydı
okuyup konu kartlarına ✓ rozetini, ünite künyesine "n konu çalışıldı" satırını
ekler ve sağ üstteki kartı "Kaldığın yer" kartına çevirir. Sunucuya hiçbir şey
gitmez. Beş soruluk dönemden kalan sonuçlar `x / 5` olarak görünür; test yeniden
çözülünce güncellenir.

Deneylerde ortak etkileşimler:

| Ne | Nasıl |
|---|---|
| Başlat / durdur | Sahneye tıkla ya da **boşluk** tuşuna bas |
| Sıfırla | **R** tuşu ya da bölümdeki *Sıfırla* düğmesi |
| Hazır deney | Bölümün üstündeki çipler; tek tıkla anlamlı bir düzen kurar |
| Doğrudan sürükleme | 16 sahnede tutamak var: kuvvet okunun ucu, eğimin tepesi, çembersel harekette top, pusula, mıknatıs, prob, hız oku, cisim, lamba, ekran, mercek. İmleç `grab` olur, ilk kullanımda sahnede ipucu belirir ve sürükleme ilgili kaydırıcıyı sürer |
| Değer girişi | Kaydırıcılar klavyeyle de kullanılır (ok tuşları); dokunmatik ekranda tutamaklar büyür |

Bu davranışlar üç ünitenin tamamında aynıdır: her deneyde sahneye tıklamak ya da
**boşluk** tuşuna basmak deneyi tam bir kez başlatır, **R** sıfırlar. Sürükleme
tutamağı olan sahnelerde sürüklemenin hemen ardından gelen tıklama yutulur, yani
tutamağı bırakmak deneyi başlatmaz; sahnenin boş bir yerine tıklamak yine başlatır.

Sürüklenebilir sahnelerde `touch-action` eksene göre ayarlanır: yatay sürüklenen
sahnelerde dikey kaydırma serbest kalır, dikey sürüklenenlerde dokunmatik
sürükleme kapatılır ki sayfa parmakla kaydırılabilsin. Bölüm özet cümleleri
(`.verdict`) `aria-live="polite"` taşır; tuvaller `role="img"` ve açıklayıcı
etiketle sunulur.

Çizim düzeni de ortaktır: ok etiketleri okun ucunun hemen ötesine hizalanır
(gövdenin üstüne binmez), grafiklerde eksen sayıları hem sağdaki eksen adıyla hem
soldaki eğri adlarıyla çakışınca atlanır, sürükleme ipucu sahneyi kapatmayacak
köşeye yerleşir ve dar ekranlarda uzun rozetler kısalır. Etiketler, üstlerinden
geçebilecek oklardan ve ışınlardan sonra çizilir; bir etiket dar tuvalde başka
bir etiketle ya da rozetle çakışacaksa yer değiştirir (ör. aynaya çok yaklaşan
cismin ölçüleri aynanın iki yanına ayrılır).

Animasyon altyapısı yirmi altı sayfada birebir aynıdır (`kit`, tek
`requestAnimationFrame` döngüsü, `surukle`):

- Döngü gerçek geçen süreyle ilerler, kare hızından bağımsızdır; kare başına 50 ms
  ile sınırlanır, sekmeye dönünce sahne sıçramaz. Oynayan bir şey yokken durur.
- **Ekrandan çıkan deney bekler.** Hangi deneyin hangi bölüme çizdiği ilk karesinde
  tuvalinden öğrenilir; bölüm tamamen görünmez olunca o deney çağrılmaz, zamanı da
  ilerlemez, geri gelince kaldığı yerden sürer. "Durdur"a basılana kadar dönen
  sahneler eskiden başka bölüme geçilince de görünmeyen tuvale çiziyordu.
- **Bir deneydeki hata yalnızca onu durdurur.** Hata konsola yazılır, öteki
  deneyler çalışmayı sürdürür; eskiden tek bir hata sayfadaki bütün deneyleri
  yenilenene kadar donduruyordu.
- Tuval yalnızca genişlik, yükseklik ya da piksel yoğunluğu gerçekten değişince
  yeniden kurulur. Mobilde adres çubuğu açılıp kapandıkça gelen, yerleşimi
  değiştirmeyen `resize` olayları eskiden sitedeki 91 tuvalin hepsini sıfırlatıp
  yeniden çizdiriyordu. Tema değişince tuvaller yine yeni renklerle çizilir.

Hızlı testte cevaptan sonra odak açıklamaya taşınır ve sonuç ("Doğru." ya da
"Yanlış; doğru cevap C.") ekran okuyucu için metin olarak da yazılır; bitiş cümlesi
canlı bölgedir. Ana sayfanın arka planındaki atış yaylarının kenar sönümü tuvale
her karede ikinci bir geçiş olarak değil, CSS maskesi olarak uygulanır.

## Yapı

```
dist/                        yayınlanan kök (nginx bunu sunar)
  index.html                 giriş sayfası (ders kartları, ders panelleri, arama)
  serbest-dusme.html         1. ünite · konu 01 · serbest düşme
  iki-boyutta-hareket.html   1. ünite · konu 02 · iki boyutta sabit ivmeli hareket
  newton-yasalari.html       1. ünite · konu 03 · Newton'un hareket yasaları
  surtunme-kuvveti.html      1. ünite · konu 04 · sürtünme kuvveti
  limit-hiz.html             1. ünite · konu 05 · limit hız
  cembersel-hareket.html     1. ünite · konu 06 · düzgün çembersel hareket
  elektriksel-kuvvet.html    2. ünite · konu 01 · elektriksel kuvvet ve alan
  manyetik-alan.html         2. ünite · konu 02 · manyetik alan ve kuvvet
  induksiyon-akimi.html      2. ünite · konu 03 · indüksiyon akımı
  transformatorler.html      2. ünite · konu 04 · transformatörler
  isik-siddeti.html          3. ünite · konu 01 · ışık şiddeti ve aydınlanma
  duzlem-aynalar.html        3. ünite · konu 02 · düzlem aynalar
  kuresel-aynalar.html       3. ünite · konu 03 · küresel aynalar
  kirilma.html               3. ünite · konu 04 · kırılma
  gorunur-derinlik.html      3. ünite · konu 05 · görünür derinlik
  fiber-optik.html           3. ünite · konu 06 · fiber optik
  prizmalar.html             3. ünite · konu 07 · prizmalar
  mercekler.html             3. ünite · konu 08 · mercekler
  enerji-degisimi.html       kimya 1. ünite · konu 01 · tepkimelerde enerji değişimi
  bag-enerjisi.html          kimya 1. ünite · konu 02 · bağ enerjileri ve tepkime entalpisi
  olusum-entalpisi.html      kimya 1. ünite · konu 03 · standart oluşum ve tepkime entalpisi
  carpisma-teorisi.html      kimya 2. ünite · konu 01 · tepkimelerin gerçekleşme şartları
  tepkime-hizi.html          kimya 2. ünite · konu 02 · ortalama tepkime hızı
  hiz-faktorleri.html        kimya 2. ünite · konu 03 · tepkime hızına etki eden faktörler
  katalizor.html             kimya 2. ünite · konu 04 · katalizör ve temas yüzeyi
  hiz-denklemi.html          kimya 2. ünite · konu 05 · hız denklemi
  404.html                   özel hata sayfası (nginx error_page)
  erisim.js                  erişim arayüzü: kilitler, indirme düğmeleri (her sayfada)
  favicon.svg, icon-*.png    site simgesi; apple-touch-icon.png ve maskable ikon
  og.png                     paylaşım kartı görseli (1200×630)
  gorsel/*.webp              konu anlatımı görselleri (fizik 54, kimya 28; 1536 px ve 800 px; kapısız)
  manifest.webmanifest       ana ekrana ekleme
  sitemap.xml, robots.txt    arama motorları (yalnızca ana sayfa bildirilir)
  sunum/*.pptx               indirilebilir ders sunumları
  sunum/dersler-sunumlar.zip yirmi altı sunum tek dosyada
stil/                        ortak tasarım dilinin kaynağı
  konu.css                   konu sayfalarının tamamında birebir aynı stil bloğu
  anasayfa.css               ana sayfaya özgü bileşenler (konu.css tabanının üstüne)
  uygula.js                  iki dosyayı dist/ içindeki <style> bloklarına yazar
sunum/                       sunumların üreticisi (pptxgenjs + puppeteer)
  uret.js                    konu anlatımını okur, çizimleri PNG'ye çevirir, desteleri kurar
  onizleme.js                slaytları HTML'de yeniden çizip taşma raporlar (QA)
  tema.js                    ortak renk, yazı tipi ve yerleşim yardımcıları
  blok.js                    tekrar eden slayt düzenleri (kapak, örnek, hatalar, özet)
  eski/                      önceki elle yazılmış konu betikleri (üretimde değil)
denetim/                     deneylerin tarayıcıda denetimi (puppeteer)
  deney.js                   hata, boş tuval, taşma, sıfırlama, ekran dışı çizim, takılma
  anlatim.js                 konu anlatımının yapısı: basamaklar, Kısaca, Düşün, örnekler, görseller, 390 px
gorsel/                      görsellerin üreticisi (Codex $imagegen)
  istekler.json              fiziğin 54 sahne tarifi
  istekler-kimya*.json       kimyanın 24 + 4 sahne tarifi
  uret.sh                    codex exec ile tek görsel ya da hepsi (--hepsi)
  donustur.sh                ham PNG → dist/gorsel/*.webp
  ham/                       özgün PNG'ler (depoya girmez)
sunucu/                      erişim kapısı (Node, bağımlılıksız)
  sunucu.js                  yetki kararı, giriş ve yönetim uçları
  kimlik.js                  imzalı çerez, scrypt parola, deneme sınırı
  depo.js                    veri.json okuma/atomik yazma, kod üretimi
  konular.js                 kapının tanıdığı konu kataloğu
  sayfa/giris.html           öğrencinin kod girdiği ekran ve oturum durumu
  sayfa/yonetim.html         yönetim paneli: herkese açık konular, ders kodları
  sayfa/qrcode.js            QR üreticisi (qrcode-generator 2.0.4, MIT, değiştirilmeden)
veri/                        kapının verisi (depoda değil, sunucuda durur)
  veri.json                  ders kodları, çerez anahtarı, parola özeti
deploy/
  docker-compose.yml         nginx:alpine + node:22-alpine kapı, dist/ salt-okunur bağlı
  nginx.conf                 statik sunum, auth_request ile erişim denetimi, 404 sayfası
  guvenlik-basliklar.inc     her yanıtta bulunan güvenlik başlıkları
  korunan-basliklar.inc      kod arkasındaki yollar: private, no-cache + noindex
  kapi-basliklar.inc         kapıya giden isteklerin ortak başlıkları
  yayina-al.sh               Cloudflare CNAME + NPM proxy host + Let's Encrypt
  onbellek-temizle.sh        korunan adresleri Cloudflare kenar önbelleğinden düşürür
```

Ortak stili değiştirmek için `stil/konu.css` ya da `stil/anasayfa.css`
düzenlenir ve

```bash
node stil/uygula.js
```

çalıştırılır; betik yirmi altı konu sayfasının ve ana sayfanın `<style>` bloğunu
yeniler, başka hiçbir şeye dokunmaz. Konu sayfalarına özel bir stil gerekirse
ilgili sayfanın kendi bloğuna değil, `konu.css` içine yazılmalıdır; aksi hâlde
bir sonraki uygulamada silinir.

## Erişim: herkese açık konular ve ders kodları

Ana sayfa herkese açıktır. Konu sayfaları ve sunumlar için iki yol var:

- **Herkese açık konular:** öğretmenin seçtiği konuları kod girmeden herkes
  görür; bu konuların sunumlarının herkesçe indirilip indirilemeyeceği ayrı bir
  ayardır. Arama motorlarına yine kapalı kalırlar.
- **Ders kodları:** geri kalan konular ders koduyla açılır. Kod bir öğrenciye
  değil bir sınıfa karşılık gelir ve üç şeyi taşır: hangi konuların açık olduğu,
  sunumların indirilip indirilemeyeceği, son geçerlilik günü.

Bir öğrencinin gördüğü, ikisinin birleşimidir.

Denetim tarayıcıda değil sunucuda yapılır. nginx her korunan istek için
`auth_request` ile kapıya sorar; kapı 204 derse dosyayı nginx verir, 401/403
derse ziyaretçi giriş ekranına düşer. Sayfalardaki kilit işaretleri yalnızca
görünürlük içindir — adresi doğrudan yazmak da işe yaramaz. Bu işaretleri ana
sayfa ile yirmi altı konu sayfasının paylaştığı
[`dist/erisim.js`](dist/erisim.js) koyar: kapalı konular "Kod gerekli"
rozetiyle görünür, indirilemeyecek bir sunum indirme düğmesi gibi durmaz (kodu
olmayana kilit, kodu olup izni olmayana hiç görünmez).

Bir kısmı açık bir kısmı kapalıyken **açık konular renkli, kapalı konular gri**
görünür; hangisinin açıldığı bir bakışta okunur. Renk kartın `--tone`
değişkeninden geldiği için kapalı kartta o değişken nötre çekilir — imleç
kutusu, etiket ve arka plan tonu birden griye döner. Hepsi açık ya da hepsi
kapalıyken ayrım yapılacak bir şey olmadığından sayfa olduğu gibi kalır.

**Öğretmen** `/yonetim` adresinden parolayla girer, kod oluşturur; kod
oluşunca paylaşım penceresi açılır: QR, giriş bağlantısı
(`…/giris?kod=DRS-K7M2PX`) ve sınıfta **tahtaya yansıt**. Öğrenci QR'ı okutur
ya da bağlantıyı açar, kod alanı dolu gelir, **Derse gir** der; kod o
tarayıcıda 30 gün açık kalır. **Önizle**, ana sayfayı bir sınıfın ya da kodsuz
bir ziyaretçinin gözünden gösterir. Giriş ekranı kodun neden geçmediğini
(süresi doldu, kapatıldı, silindi) söyler; zaten girişli olan öğrenciye hangi
kodla girdiğini gösterir.

İlk yönetici parolası kapı ilk açıldığında üretilir:

```bash
docker logs dersler-kapi | head -1
```

Panelden değiştirilebilir. Ayrıntılar: [`sunucu/README.md`](sunucu/README.md).

Kapının koruyamayacağı tek şey, ekranda gösterilen içeriğin kopyalanmasıdır;
"indirme kapalı" pptx dosyasını dağıtmamak demektir, kopyalanamaz demek değil.

### Önbellek tuzağı

Site Cloudflare üzerinden yayınlanıyor ve Cloudflare `.pptx`/`.zip` gibi
dosyaları **uzantısına bakarak** kenarda saklar. Yetki denetimi origin'de
yapıldığı için, yetkili bir öğrencinin indirdiği deste kenarda kalır ve sonraki
anonim isteğe oradan verilir; kapı bu noktada tamamen devre dışı kalır. Bu
yüzden korunan yollar `Cache-Control: private, no-cache` ile verilir
([`deploy/korunan-basliklar.inc`](deploy/korunan-basliklar.inc)). Denetlemek
için, kod olmadan:

```bash
curl -sI https://dersler.perinet.org/sunum/mercekler.pptx | grep -i "HTTP\|cf-cache-status"
```

Beklenen: `302` ve `BYPASS`. `200` ve `HIT` görünüyorsa o dosyanın eski bir
kopyası kenarda duruyordur; kendiliğinden en çok 24 saatte düşer, hemen
düşürmek için:

```bash
bash deploy/onbellek-temizle.sh
```

Betik Cloudflare belirtecinde **Cache Purge** izni ister; izin yoksa aynı iş
Cloudflare panelinde Caching → Configuration → Purge Custom URLs ekranından
yapılır.

Aynı nedenle 404 yanıtları `no-store` taşır: nginx'in `expires` yönergesi 404'e
uygulanmaz ve başlıksız bir 404'ü Cloudflare `.js`/`.pptx` gibi uzantılarda
birkaç dakika saklar; yeni eklenen bir dosya bile bir süre yok görünürdü.

## Yerel çalıştırma

```bash
python3 -m http.server 8000 --directory dist
```

Ardından <http://127.0.0.1:8000> adresini aç. İçeriğe bakmak için başka bir şey
gerekmiyor: bu sunucuda kapı yoktur, bütün sayfalar açıktır. Kapıyı da denemek
için ikinci bir kabukta:

```bash
KAPI_PORT=8099 KAPI_VERI=/tmp/veri.json KAPI_PAROLA=deneme node sunucu/sunucu.js
```

Kapının çerezi `Secure` olduğu için giriş akışı düz http üzerinde tamamlanmaz;
uçlar yine `curl` ile denenebilir.

## Deneyleri denetlemek

Sunumlar için `sunum/onizleme.js` neyse, deneyler için `denetim/deney.js` odur:
yirmi altı sayfayı gerçek bir tarayıcıda (puppeteer) açar, her deneyi başlatır ve
bozulmaları sayar.

```bash
NODE_PATH=$(npm root -g) node denetim/deney.js
```

Sayılanlar: sayfa ve konsol hataları, ilk çizimde boş kalan tuval, 390 px'te
yatay taşma, yalnızca yükseklik değişince yeniden kurulan tuval (mobil adres
çubuğu), ekran dışındayken çizilen kare ve 25 ms'yi aşan kare. Biri çıkan satır
✗ ile işaretlenir ve araç 1 koduyla biter. Sayfalar diskten sunulur; kapı ya da
çalışan bir sunucu gerekmez. Tek konu (`--konu`), `dist/` dışında bir kopya
(`--kok`) ve etiket çakışmalarına bakmak için görüntüler (`--ekran`):
[`denetim/README.md`](denetim/README.md).

## Yayına alma

Konteyneri başlat:

```bash
docker compose -f deploy/docker-compose.yml up -d
```

Site `npm-net` ağında durur ve dışarıya port açmaz; 80/443'ü Nginx Proxy
Manager karşılar. DNS kaydını ve proxy host'u kurmak için (yeniden
çalıştırılabilir, var olan kayda dokunmaz):

```bash
NPM_EMAIL=yonetici@ornek.com bash deploy/yayina-al.sh
```

Betik NPM şifresini sorar ya da `NPM_PASS_FILE` ile dosyadan okur; Cloudflare
token'ını `~/.config/cloudflare/token.env` içinden alır. Hiçbir sır depoda
tutulmaz.

## Yeni konu eklemek

`dist/` altına yeni bir HTML dosyası koymak ve `dist/index.html` içindeki ilgili
ünitenin konu ızgarasına bir kart (numarası, etiketi ve `data-tags` arama
anahtarlarıyla) eklemek yeterli. Yeni bir ünite, `.unit` bloğunun kopyasıdır;
konu sayfalarındaki önceki/sonraki şeridi de güncellenmelidir — dizin konteynere bağlı olduğu için dosya
kaydedildiği anda yayında olur. Tuval yardımcıları ve konu anlatımı modalı her
sayfanın kendi `<script>` bloğunda tanımlıdır; stil bloğu `stil/konu.css`
kaynağından gelir. Var olan ders sayfalarından biri başlangıç noktası olarak
kopyalanabilir; yeni sayfanın `<title>`, açıklaması, künye satırı ve alt bilgisi
güncellenmelidir. Konu sayfaları arama motorlarına kapalı olduğu için
`sitemap.xml` yalnızca ana sayfayı bildirir; oraya bir şey eklenmez. Buna
karşılık iki şey şarttır:

- **`sunucu/konular.js` listesine eklemek** — eklenmezse kapı sayfayı yalnızca
  yöneticiye açar ve günlüğe "konular.js'te olmayan dosya kapalı tutuldu" yazar.
- Sayfanın sonunda `<script src="erisim.js" defer></script>` bulunması (var olan
  bir sayfadan kopyalanınca gelir) — yoksa indirme düğmesi, izni olmayana da
  indirme düğmesi gibi görünür.

Denetim aracı yeni sayfayı kendiliğinden bulur; tek başına denetlemek için
`NODE_PATH=$(npm root -g) node denetim/deney.js --konu yeni-konu` (dosya adı,
`.html` olmadan; bkz. "Deneyleri denetlemek").

Yeni kart, dersinin panelinde (`.ders-panel`) ilgili ünitenin ızgarasına girer; sunum kartı
`data-ders` ile dersinin sunum etiketinin (`p.dl-ders`) arkasına.

Konu anlatımı dört basamaklı yapıya uymalıdır (bkz. "Konu anlatımı: dört basamak"):
üç görsel için `gorsel/istekler.json`'a `<konu>-giris`, `-gunluk`, `-uygulama`
sahnelerini ekleyip `bash gorsel/uret.sh <id>` ve `bash gorsel/donustur.sh` çalıştır, sonra
`NODE_PATH=$(npm root -g) node denetim/anlatim.js yeni-konu` ile yapıyı denetle. Sunum
üreticisi yeni sayfayı da kendiliğinden bulur.

## Yeni ders eklemek

Matematik, Türkçe gibi yeni bir ders ana sayfada kendi kartı ve paneliyle durur:

1. **Renk:** `stil/anasayfa.css` "ders renkleri" bölümüne iki temada da `--d-<ders>` ekle
   (açık temada beyaz zeminde en az 4,5:1), sonra `node stil/uygula.js`.
2. **Kart:** `dist/index.html` içinde `nav.ders-kartlar`'a bir `a.ders-kart` kopyala:
   `href="#<ders>"`, `data-ders="<ders>"`, `style="--ders: var(--d-<ders>)"`, simge (24×24
   çizgi SVG), sınıf, ad, ünite adları. Sayılar (`data-say`) betikçe yeniden sayılır.
3. **Panel:** katalogdaki son `.ders-panel`'in ardına `div.ders-panel` (`id` ve `data-ders` =
   ders kodu): `header.ders-bas` (simge, künye, `h2`, özet, sayılar), ünite süzgeci
   (`.filters`, her ünite için `data-unit` düğmesi), sonra `article.unit` blokları. Ünite
   kimlikleri sayfa genelinde tek olmalı; konu sayfalarının künyesi `index.html#<ünite>`'ye döner.
4. **Sunumlar:** `.ders-sec`'e `data-ders-sec="<ders>"` düğmesi; ızgaraya `p.dl-ders` etiketi ve
   `data-ders`'li sunum kartları. Alt bilgideki "Dersler" listesine bağlantı; üst barın
   `brand small` yazısı (ör. "fizik · kimya") ve 404 sayfası da güncellenir.
5. **Konu sayfaları:** `.site-header .brand small` dersin adını taşır — sunum üreticisi kapakta
   dersin adını oradan alır. Konular `sunucu/konular.js`'e yeni bir ünite bloğuyla girer
   (bkz. "Yeni konu eklemek"); kapıyı yeniden başlatınca kapalı başlarlar.

Ana sayfanın betiği dersleri panellerden okur; ders listesi, renk ya da sayı için koda dokunmak
gerekmez.
