# Dersler

Etkileşimli ders anlatımları için sade, statik bir öğrenme alanı.
İçerik **ders → ünite → konu** hiyerarşisiyle düzenlenir.
Derleme adımı, paket bağımlılığı ve JavaScript çatısı yok: her sayfa kendi
stilini ve betiğini taşıyan tek bir HTML dosyası.

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

Ana sayfa üniteyi bir blok olarak gösterir, konuları numaralandırır ve arama
kutusuyla süzer. Her konu sayfası künyesinde üniteye döner, altında önceki ve
sonraki konuya geçiş şeridi taşır.

### Konu 01 · Serbest düşme

Dört etkileşimli deney, canlı grafikler ve konunun tamamını anlatan bir modal:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Düşme laboratuvarı | Yükseklik, yukarı fırlatma hızı, gökcismi (Dünya/Ay/Mars/Jüpiter) ve zaman ölçeği ayarlanır. Strobo izleri, hız–ivme okları, 8 kat ağır ikinci cisim. Altında **x–t, v–t, a–t** grafikleri canlı çizilir. |
| 02 | Tüy ve bilye | Havalı tüpte tüy limit hıza takılır, vakumlu tüpte ikisi aynı anda iner. Karesel sürtünme modeli sayısal olarak çözülür. |
| 03 | 1 : 3 : 5 kuralı | Eşit zaman aralıkları adım adım açılır; çubuklar tek sayı oranını, toplamlar 1:4:9:16:25'i gösterir. |
| 04 | Cetvelle tepki süresi | Cetvel habersizce bırakılır, boşluk tuşuyla yakalanır; düşme mesafesinden `t = √(2d/g)` hesaplanır. |
| 05 | Hızlı kontrol | Beş soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı modalı tanımdan formül türetmelerine, grafik yorumundan çözümlü
örneklere ve sık yapılan hatalara kadar dokuz başlık içerir.

### Konu 02 · İki boyutta sabit ivmeli hareket

Atış hareketlerini yatay ve düşey bileşenlerine ayırarak gösteren dört
etkileşimli bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Atış laboratuvarı | Sürat, açı, atış yüksekliği, gökcismi ve zaman ölçeği ayarlanır. Strobo izleri, hız bileşeni okları (v, vₓ, v_y ve g) ve yörüngenin yatay/düşey izdüşümleri. Altında **x–t, y–t, vₓ–t, v_y–t** grafikleri canlı çizilir. |
| 02 | Bırakılan ve atılan | Aynı yükseklikten biri bırakılır, biri yatay atılır; kesikli çizgiler her an iki cismi aynı yükseklikte birleştirir. Bağımsızlık ilkesinin doğrudan gösterimi. |
| 03 | Menzil ve açı | Aynı süratle 15°–75° arası beş açı sırayla atılır; tümler açıların aynı noktaya düştüğü, 45°'nin en uzağa gittiği ekranda kalır. |
| 04 | Hedefi vur | Rastgele uzaklık ve yükseklikteki hedefe açı + sürat ayarlanarak atış yapılır. İpucu düğmesi o açı için gereken sürati formülden hesaplar. |
| 05 | Hızlı kontrol | Beş soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı modalı bağımsızlık ilkesinden vektörel bağıntılara, yatay ve
eğik atıştan yörünge denklemine, çözümlü örneklerden sık yapılan hatalara
kadar dokuz başlık içerir.

### Konu 03 · Newton'un hareket yasaları

Kuvveti ve sonucunu ölçülebilir hâle getiren dört etkileşimli bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Kuvvet laboratuvarı | Uygulanan kuvvet, kütle ve zemin (μ) ayarlanır; kutunun üzerinde **serbest cisim diyagramı** (F, f, N, G) canlı çizilir. Statik sürtünme eşiği aşılmazsa kutu kıpırdamaz. Altında **ΣF–t, a–t, v–t, x–t** grafikleri. |
| 02 | Sürtünmeyi azaltınca | Aynı hızla itilen dört disk halı, parke, buz ve sürtünmesiz ortamda; durma mesafeleri `d = v²/(2μg)`. Sürtünmesiz şerit hiç durmaz — 1. yasanın deneysel yüzü. |
| 03 | Etki ve tepki | İki araba birbirini iter; kuvvetler eşit, ivmeler kütleyle ters orantılı. Ayrılma hızlarının oranı kütle oranının tersidir. |
| 04 | Asansörde görünen ağırlık | Kütle ve asansör durumu seçilir; `N = m(g + a)` ile tartının yazdığı değer değişir, serbest düşmede sıfırlanır. |
| 05 | Hızlı kontrol | Beş soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı modalı net kuvvetten serbest cisim diyagramına, sürtünmeden
asansör problemlerine kadar dokuz başlık ve dört çözümlü örnek içerir.

### Konu 04 · Sürtünme kuvveti

Statik ve kinetik sürtünmeyi ölçülebilir hâle getiren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Sürtünme laboratuvarı | Kuvvet yavaşça artırılır; sürtünme uygulanan kuvvete eşit büyür, eşiği aşınca kinetik değerine düşer. Yanında **f–F** ve **a–F** grafikleri canlı çizilir. |
| 02 | Eğik düzlemde kritik açı | Eğim yavaşça artırılır; kayma açısının tanjantı doğrudan μs'yi verir. |
| 03 | Temas alanı | Aynı kütleli üç farklı yüzey aynı noktada durur: f = μ·N bağıntısında alan yoktur. |
| 04 | Fren mesafesi | Hız, tepki süresi ve yol durumu seçilir; tepki + fren mesafesi ayrı ayrı gösterilir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Konu 05 · Limit hız

Hava direncinin hıza bağlılığını ve denge hızını gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Hava direnci laboratuvarı | Kütle ve yüzey alanı seçilir; hız `v = v(limit)·tanh(gt/v(limit))` ile doyar. **v–t** ve **a–t** grafikleri, hava direncisiz ikizle birlikte. |
| 02 | Paraşüt açılıyor | Sayısal çözüm; v–t eğrisinde iki plato (55 m/s ve 5,1 m/s). |
| 03 | Kâğıt deneyi | Aynı kütleli açık ve buruşturulmuş kâğıt ile bilye; belirleyici olan m/A oranı. |
| 04 | Neye bağlı? | Limit hızın kütle ve alana bağlılığı iki eğri üzerinde canlı gösterilir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Konu 06 · Düzgün çembersel hareket

Sabit süratli ama ivmeli hareketi gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Çember laboratuvarı | Yarıçap, periyot ve kütle ayarlanır; hız teğet, ivme merkeze doğru çizilir. **a–v** ve **a–r** grafikleri. |
| 02 | İpi kes | İp kesildiğinde cisim teğet doğrultuda gider; "merkezden dışarı" sanısı da çizilir. |
| 03 | Aynı disk | Üç farklı yarıçaptaki nokta: T ve ω ortak, v ve a farklı. |
| 04 | Virajda savrulma | Gereken merkezcil kuvvet ile sürtünme sınırı karşılaştırılır; sınır hız √(μgr). |
| 05 | Hızlı kontrol | Beş soruluk test. |

## Sunumlar

Her iki ders için, sitede indirilebilir 14 slaytlık PowerPoint dosyaları:

| # | Sunum | Bağlantı |
|---|---|---|
| 01 | Serbest düşme | [dersler.perinet.org/sunum/serbest-dusme.pptx](https://dersler.perinet.org/sunum/serbest-dusme.pptx) |
| 02 | İki boyutta sabit ivmeli hareket | [dersler.perinet.org/sunum/iki-boyutta-hareket.pptx](https://dersler.perinet.org/sunum/iki-boyutta-hareket.pptx) |
| 03 | Newton'un hareket yasaları | [dersler.perinet.org/sunum/newton-yasalari.pptx](https://dersler.perinet.org/sunum/newton-yasalari.pptx) |
| 04 | Sürtünme kuvveti | [dersler.perinet.org/sunum/surtunme-kuvveti.pptx](https://dersler.perinet.org/sunum/surtunme-kuvveti.pptx) |
| 05 | Limit hız | [dersler.perinet.org/sunum/limit-hiz.pptx](https://dersler.perinet.org/sunum/limit-hiz.pptx) |
| 06 | Düzgün çembersel hareket | [dersler.perinet.org/sunum/cembersel-hareket.pptx](https://dersler.perinet.org/sunum/cembersel-hareket.pptx) |

Grafikler PowerPoint'in kendi grafik nesneleridir, her slaytta konuşmacı notu
vardır. Dosyalar `sunum/*.js` betikleriyle üretilir; ayrıntılar
[`sunum/README.md`](sunum/README.md) içinde.

## Ortak davranış

Sayfalar açık temayla açılır, üst bardaki düğmeyle koyu temaya geçer ve seçim
tarayıcıda saklanır. Tuval renkleri CSS değişkenlerinden okunduğu için
animasyonlar tema değişiminde yeniden çizilir. Sahneye tıklayarak ya da
**boşluk** ile başlat/durdur, **R** ile sıfırla.

## Yapı

```
dist/                        yayınlanan kök (nginx bunu sunar)
  index.html                 giriş sayfası (arama + konu filtresi)
  serbest-dusme.html         konu 01 · serbest düşme
  iki-boyutta-hareket.html   konu 02 · iki boyutta sabit ivmeli hareket
  newton-yasalari.html       konu 03 · Newton'un hareket yasaları
  surtunme-kuvveti.html      konu 04 · sürtünme kuvveti
  limit-hiz.html             konu 05 · limit hız
  cembersel-hareket.html     konu 06 · düzgün çembersel hareket
  sunum/*.pptx               indirilebilir ders sunumları
sunum/                       sunumların kaynağı (pptxgenjs betikleri)
  tema.js                    ortak renk, yazı tipi ve yerleşim yardımcıları
deploy/
  docker-compose.yml         nginx:alpine konteyneri, dist/ salt-okunur bağlı
  nginx.conf                 statik sunum, kökte no-cache, varlıklarda uzun önbellek
  yayina-al.sh               Cloudflare CNAME + NPM proxy host + Let's Encrypt
```

## Yerel çalıştırma

```bash
python3 -m http.server 8000 --directory dist
```

Ardından <http://127.0.0.1:8000> adresini aç. Başka bir şey gerekmiyor.

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
kaydedildiği anda yayında olur. Ortak tema değişkenleri, tuval yardımcıları ve
konu anlatımı modalı her sayfanın kendi `<style>` / `<script>` bloğunda
tanımlıdır; var olan ders sayfalarından biri başlangıç noktası olarak
kopyalanabilir.
