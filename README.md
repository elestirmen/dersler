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

Ana sayfa her üniteyi bir blok olarak gösterir, konuları numaralandırır; arama
kutusu ve ünite süzgeçleriyle daraltılır. Her konu sayfası künyesinde üniteye
döner, altında önceki ve sonraki konuya geçiş şeridi taşır.

### Konu 01 · Serbest düşme

Dört etkileşimli deney, canlı grafikler ve konunun tamamını anlatan bir modal:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Düşme laboratuvarı | Yükseklik **cisim yukarı aşağı sürüklenerek** de seçilir; yukarı fırlatma hızı, gökcismi (Dünya/Ay/Mars/Jüpiter) ve zaman ölçeği ayarlanır. Strobo izleri, hız–ivme okları, 8 kat ağır ikinci cisim. Altında **x–t, v–t, a–t** grafikleri canlı çizilir. |
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
| 01 | Atış laboratuvarı | Sürat ve açı **hız okunun ucu sürüklenerek** de ayarlanır; atış yüksekliği, gökcismi ve zaman ölçeği kaydırıcılarla seçilir. Strobo izleri, hız bileşeni okları (v, vₓ, v_y ve g) ve yörüngenin yatay/düşey izdüşümleri. Altında **x–t, y–t, vₓ–t, v_y–t** grafikleri canlı çizilir. |
| 02 | Bırakılan ve atılan | Aynı yükseklikten biri bırakılır, biri yatay atılır; kesikli çizgiler her an iki cismi aynı yükseklikte birleştirir. Bağımsızlık ilkesinin doğrudan gösterimi. |
| 03 | Menzil ve açı | Aynı süratle 15°–75° arası beş açı sırayla atılır (sıradaki atışın yolu soluk önizlemeyle görünür); tümler açıların aynı noktaya düştüğü, 45°'nin en uzağa gittiği ekranda kalır. |
| 04 | Hedefi vur | Rastgele uzaklık ve yükseklikteki hedefe açı + sürat ayarlanarak atış yapılır. İpucu düğmesi o açı için gereken sürati formülden hesaplar. |
| 05 | Hızlı kontrol | Beş soruluk test, anında geri bildirim ve açıklama. |

Konu anlatımı modalı bağımsızlık ilkesinden vektörel bağıntılara, yatay ve
eğik atıştan yörünge denklemine, çözümlü örneklerden sık yapılan hatalara
kadar dokuz başlık içerir.

### Konu 03 · Newton'un hareket yasaları

Kuvveti ve sonucunu ölçülebilir hâle getiren dört etkileşimli bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Kuvvet laboratuvarı | Uygulanan kuvvet **F okunun ucu sürüklenerek** de ayarlanır; kütle ve zemin (μ) seçilir; kutunun üzerinde **serbest cisim diyagramı** (F, f, N, G) canlı çizilir. Statik sürtünme eşiği aşılmazsa kutu kıpırdamaz. Altında **ΣF–t, a–t, v–t, x–t** grafikleri. |
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
| 02 | Eğik düzlemde kritik açı | Eğim, **tepesinden sürüklenerek** ya da kaydırıcıyla artırılır; kayma açısının tanjantı doğrudan μs'yi verir. |
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
| 01 | Çember laboratuvarı | Yarıçap **top içeri dışarı sürüklenerek**, periyot ve kütle kaydırıcıyla ayarlanır; hız teğet, ivme merkeze doğru çizilir. **a–v** ve **a–r** grafikleri. |
| 02 | İpi kes | İp kesildiğinde cisim teğet doğrultuda gider; "merkezden dışarı" sanısı da çizilir. |
| 03 | Aynı disk | Üç farklı yarıçaptaki nokta: T ve ω ortak, v ve a farklı. |
| 04 | Virajda savrulma | Gereken merkezcil kuvvet ile sürtünme sınırı karşılaştırılır; sınır hız √(μgr). |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Elektrik ve Manyetizma · Konu 01 · Elektriksel kuvvet ve alan

Yüklerin birbirine dokunmadan uyguladığı kuvveti ve alan kavramını kuran dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Coulomb laboratuvarı | İki yükün büyüklüğü ve işareti seçilir, aralarındaki uzaklık **yükler sürüklenerek** de değiştirilir; kuvvet okları ve çekme/itme canlı gösterilir. **F–r** (ters kare) ve **F–q** (doğru orantı) grafikleri. |
| 02 | Alan haritası | Izgara üzerinde alan okları çizilir; tek yük, dipol ve aynı işaretli iki yük seçilebilir. Tıklanan noktaya test yükü konur, gördüğü kuvvet okla gösterilir. |
| 03 | Alanın sıfırlandığı nokta | İkinci yükün değeri değiştirilir, **prob eksende sürüklenir**; bileşke alanın sıfırlandığı nokta sayısal taramayla bulunur ve işaretlenir. |
| 04 | Paralel levhalar | `E = V/d` ile düzgün alan kurulur; elektron ya da proton atılır, parabolik yörünge ve levhaya çarpma izlenir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Elektrik ve Manyetizma · Konu 02 · Manyetik alan ve manyetik kuvvet

Akımın ürettiği alanı ve alanın uyguladığı kuvveti gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Telin manyetik alanı | Akım kaydırıcıyla, uzaklık **pusula sürüklenerek** ayarlanır; `B = 2·10⁻⁷·I/r` halkaları ve pusula iğnesi çizilir. **B–r** ve **B–I** grafikleri. |
| 02 | Tele etkiyen kuvvet | Alan, akım ve açı değiştirilir; `F = B·I·L·sinα` kuvvet oku ve sinüs eğrisi aynı sahnede gösterilir. |
| 03 | Dairesel hareket | Alana dik giren elektron/protonun yarıçapı `r = mv/(qB)` ve periyodu `T = 2πm/(qB)`; ölçek çubuğuyla birlikte. |
| 04 | Sağ el kuralı alıştırması | Rastgele akım–alan çiftleri için kuvvet yönü sorulur; puan ve doğruluk oranı tutulur. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Elektrik ve Manyetizma · Konu 03 · İndüksiyon akımı

Değişen akının akım doğurmasını dört ayrı deneyle gösteren bölümler:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Mıknatıs ve bobin | Mıknatıs bobinden geçirilir ya da **elle sürüklenerek** ileri geri oynatılır; akı çan eğrisi, indüklenen emk ve galvanometre iğnesi eşzamanlı çizilir. **Φ–t** ve **ε–t** grafikleri. |
| 02 | Jeneratör | Dönen çerçevede `Φ = B·A·cosωt` ve `ε = N·B·A·ω·sinωt`; çeyrek periyotluk faz farkı grafikte görünür. |
| 03 | Hareketli çubuk | `ε = B·L·v`, `I = ε/R` ve karşı kuvvet `F = B·I·L` hesaplanır; mekanik güç ile elektriksel güç karşılaştırılır. |
| 04 | Bakır boru | Aynı mıknatıs plastik ve bakır borudan bırakılır: 0,49 s'e karşı 5,5 s. Lenz yasasının en çarpıcı gösterimi. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Elektrik ve Manyetizma · Konu 04 · Transformatörler

Gerilim–akım dönüşümünü ve enerji iletimini gösteren dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Transformatör laboratuvarı | Giriş gerilimi, primer/sekonder sarım sayısı ve yük direnci ayarlanır; nüve, bobinler ve ölçüm değerleri canlı çizilir. **V₂–N₂** (doğru orantı) ve **V₂–N₁** (ters orantı) grafikleri. |
| 02 | Güç ve verim | Giren güç ve verim değiştirilir; çıkan güç, kayıp ve ısıya dönüşen pay çubuklarda gösterilir. |
| 03 | Enerji iletimi | 1 MW gücün iletiminde gerilim ve hat direnci değiştirilir; `I = P/V` ve `P(kayıp) = I²R` ile kayıp oranı hesaplanır, santral–şehir hattı canlandırılır. |
| 04 | Hedef gerilim | Verilen `V₁` ve `N₁` için istenen çıkışı üretecek sekonder sarımı bulunur; %2 tolerans, deneme listesi ve başarı oranı. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 01 · Işık şiddeti, ışık akısı ve aydınlanma

Kandela, lümen ve lüksü birbirinden ayıran dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Aydınlanma laboratuvarı | Kaynağın şiddeti, yüksekliği ve ölçüm yüzeyinin eğimi ayarlanır; `E = I·cosθ/d²` canlı hesaplanır. **E–d** (ters kare) ve **E–I** (doğru orantı) grafikleri. |
| 02 | Ters kare yasası | Perde uzaklaştıkça aynı akının 1, 4, 9 birim kareye yayılması; karşıdan görünüm ızgarasıyla. |
| 03 | Fotometre | İki lambanın arasındaki ekran kaydırılır; eşit aydınlanma noktası `x/(L−x) = √(I₁/I₂)` ile bulunur, iki eğri tek panelde çizilir. |
| 04 | Oda aydınlatma tasarımı | Kullanım amacı, oda alanı ve ampul lümeni seçilir; gereken toplam akı ve ampul sayısı hesaplanır, oda üstten çizilir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 02 · Düzlem aynalar

Tek bir yasadan (i = r) türeyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Yansıma laboratuvarı | Gelme açısı ve aynanın dönme açısı ayarlanır; normal, açı yayları ve aynanın ilk yeri çizilir. Yansıyan ışının dönmesinin `2α` olduğu grafikle gösterilir. |
| 02 | Görüntü oluşumu | Cisim konumlandırılır; iki ışın göze gider, uzantıları aynanın arkasındaki sanal görüntüde kesişir. Yaklaşma animasyonunda bağıl hızın `2v` olduğu okunur. |
| 03 | İki ayna | Aynalar arası açı seçilir; görüntüler çember üzerinde ardışık yansımalarla hesaplanıp çizilir, `n = 360/α − 1` doğrulanır. |
| 04 | Boy aynası | Boy ve aynaya uzaklık değiştirilir; baş ve ayaktan gelen ışınlarla gereken `h/2`'lik ayna ve alt kenar yüksekliği bulunur. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 03 · Küresel aynalar

Çukur ve tümsek aynayı tek düzenekte toplayan dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Işın çizimi laboratuvarı | Ayna türü, yarıçap, cisim uzaklığı ve boyu ayarlanır; üç asal ışın yayın üzerinde gerçek kesişim noktalarıyla çizilir, sanal görüntüde uzantılar kesikli gösterilir. **\|b\|–a** ve **m–a** grafikleri. |
| 02 | Beş cisim konumu | Merkezin ötesinden odak içine beş konum; görüntünün yeri, türü ve boyu eşzamanlı güncellenir, "sırayla göster" ile tur atar. |
| 03 | Tümsek ayna | Güvenlik aynasının görüş açısı, aynı boyuttaki düzlem aynayla karşılaştırılır; görüntünün hep sanal, düz ve küçük olduğu görülür. |
| 04 | Hedef büyütme | İstenen büyütme ve görüntü türü için cisim uzaklığı bulunur; %5 tolerans, deneme listesi ve başarı oranı. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 04 · Kırılma

Snell yasasını dört ayrı yüzüyle gösteren bölümler:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Snell laboratuvarı | İki ortam (hava/su/cam/elmas) ve gelme açısı seçilir; gelen, yansıyan ve kırılan ışın açı yaylarıyla çizilir. Kırılma açısı–gelme açısı eğrisi, sınır açı işaretiyle. |
| 02 | Tam yansıma | Yoğun ortamın indisi ve gelme açısı değiştirilir; sınır açıya yaklaşırken kırılan ışın sönükleşir, aşıldığında tamamen yansır. |
| 03 | Hız ve dalga boyu | Dalga cepheleri sınırda sıklaşarak yön değiştirir; `v = c/n`, `λ = λ₀/n` ve frekansın değişmediği vurgulanır. |
| 04 | Yandan kayma | Paralel kenarlı levhada `d = t·sin(i−r)/cos r` ölçülür; çıkan ışının gelene paralel olduğu çizimle gösterilir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 05 · Görünür derinlik

Kırılmanın günlük sonuçlarını işleyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Havuz laboratuvarı | Derinlik ve sıvı seçilir; dik ve eğik ışının kırılması, uzantıların kesiştiği görünen derinlik çizilir. **h′–h** ve **h′–n** grafikleri. |
| 02 | Balığa nişan almak | Rastgele derinlikteki balığın görünen yeri hesaplanır; nişan açısıyla mızrak atılır, sapma santimetre cinsinden bildirilir. |
| 03 | Sudan havaya bakış | Su altındaki gözlemci için `h′ = n·h`; cismin uzaklaşmış görünmesi ışın çizimiyle gösterilir. |
| 04 | Cam levha | Levhanın kalınlığı ve indisi değiştirilir; altındaki yazının `t(1 − 1/n)` kadar yükselmesi ölçülür. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 06 · Fiber optik

Tam yansımanın mühendislik uygulaması, dört bölümde:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Fiber laboratuvarı | Çekirdek ve kılıf indisleri ile giriş açısı ayarlanır; ışık ya zikzak çizerek taşınır ya da kılıfa kaçar. Sınır açı ve duvara geliş açısı karşılaştırılır. |
| 02 | Kabul açısı | `NA = √(n₁²−n₂²)` ve kabul konisi çizilir; koninin içinden ve dışından gelen iki ışının akıbeti gösterilir. |
| 03 | Sinyal gecikmesi | Kablo uzunluğuna göre `v = c/n₁`, varış süresi ve mod dağılımından doğan gecikme farkı hesaplanır. |
| 04 | Bükülme sınırı | Bükülme yarıçapı küçültülür; `R(min) = a(n₁+n₂)/(n₁−n₂)` altına inince ışığın sızdığı canlandırılır. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 07 · Prizmalar

İki kırılmanın sonuçlarını işleyen dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Prizmada sapma | Tepe açısı, gelme açısı ve indis ayarlanır; ışın yolu vektörel olarak çizilir, `δ = i₁ + i₂ − A` ölçülür. δ–i₁ eğrisi ve en küçük sapma işareti. |
| 02 | Renklere ayrılma | Altı renk kendi indisiyle ayrı ayrı izlenir; perdeye düşen tayf büyütülmüş bir şerit olarak gösterilir. |
| 03 | Tam yansımalı prizma | 45° prizmada ışığın 90° ya da 180° döndürülmesi; indis düşürülünce tam yansımanın bozulması. |
| 04 | Gökkuşağı | Su damlasında kırılma + iç yansıma + kırılma; sapma–çarpma parametresi eğrisinin en küçüğü 42°'lik gökkuşağı açısını verir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

### Optik · Konu 08 · Mercekler

Ünitenin kapanışı, dört bölüm:

| # | Bölüm | Ne yapıyor |
|---|---|---|
| 01 | Işın çizimi laboratuvarı | İnce/kalın kenarlı seçimi, odak uzaklığı, cisim uzaklığı ve boyu; asal ışınlar ve görüntü çizilir, mercek gücü diyoptri olarak okunur. **\|b\|–a** ve **m–a** grafikleri. |
| 02 | Beş cisim konumu | Her konum bir optik aletle eşleştirilir: fotoğraf makinesi, fotokopi, projeksiyon, projektör, büyüteç. |
| 03 | Göz kusurları | Miyop ve hipermetrop göz modeli; odağın retinanın önüne/arkasına düşmesi ve gözlük takılınca düzelmesi, gereken diyoptriyle birlikte. |
| 04 | Perdeye net görüntü | Cisim–perde uzaklığı sabitken mercek kaydırılır; `D > 4f` olduğunda iki net konumun bulunduğu bulanıklık göstergesiyle gösterilir. |
| 05 | Hızlı kontrol | Beş soruluk test. |

## Sunumlar

On sekiz konunun her biri için, sitede indirilebilir 11–14 slaytlık PowerPoint dosyaları:

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

Grafikler PowerPoint'in kendi grafik nesneleridir, her slaytta konuşmacı notu
vardır. Dosyalar `sunum/*.js` betikleriyle üretilir; ayrıntılar
[`sunum/README.md`](sunum/README.md) içinde.

## Ortak davranış

Sayfalar açık temayla açılır, üst bardaki düğmeyle koyu temaya geçer ve seçim
tarayıcıda saklanır. Tuval renkleri CSS değişkenlerinden okunduğu için
animasyonlar tema değişiminde yeniden çizilir.

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
(gövdenin üstüne binmez), grafiklerde eksen adı son değer etiketiyle çakışmaz,
sürükleme ipucu sahneyi kapatmayacak köşeye yerleşir ve dar ekranlarda uzun
rozetler kısalır.

## Yapı

```
dist/                        yayınlanan kök (nginx bunu sunar)
  index.html                 giriş sayfası (arama + ünite filtresi)
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
  sunum/*.pptx               indirilebilir ders sunumları
sunum/                       sunumların kaynağı (pptxgenjs betikleri)
  tema.js                    ortak renk, yazı tipi ve yerleşim yardımcıları
  blok.js                    tekrar eden slayt düzenleri (kapak, örnek, hatalar, özet)
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
