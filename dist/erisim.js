/* ================= erişim arayüzü =================
   Ana sayfa ve on sekiz konu sayfası bu dosyayı paylaşır. Kapıya (/durum)
   ziyaretçinin neyi görüp neyi indirebileceğini sorar ve sayfayı buna göre
   düzenler: kilitli konular işaretlenir, indirilemeyecek sunumlar indirme
   düğmesi gibi durmaz.

   Buradaki her şey yalnızca görünürlük içindir. Asıl denetim sunucuda, nginx
   auth_request ile yapılır; bu betik devre dışı kalsa bile kapalı bir dosya
   açılmaz. */
(function () {
  "use strict";

  var KILIT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" /></svg>';

  var SEBEP = {
    "suresi-doldu": "Kodunuzun süresi doldu.",
    kapali: "Kodunuz öğretmen tarafından kapatıldı.",
    silindi: "Kodunuz artık geçerli değil.",
  };

  function hepsi(secici, kok) {
    return Array.prototype.slice.call((kok || document).querySelectorAll(secici));
  }

  function kilitSvg(sinif) {
    var kap = document.createElement("span");
    kap.innerHTML = KILIT;
    if (sinif) kap.firstChild.setAttribute("class", sinif);
    return kap.firstChild;
  }

  function kilitRozeti(metin) {
    var s = document.createElement("span");
    s.className = "kilit";
    s.innerHTML = KILIT;
    s.append(document.createTextNode(metin || "Kod gerekli"));
    return s;
  }

  /* Ekranda görünmeyen, yalnızca ekran okuyucunun duyduğu ek. */
  function duyulan(metin) {
    var s = document.createElement("span");
    s.className = "duyulan";
    s.textContent = metin;
    return s;
  }

  /* Sınıf adı öğretmenin yazdığı serbest metindir; HTML olarak değil, metin
     olarak yerleştirilir. */
  function cumle(kap, parcalar) {
    kap.textContent = "";
    parcalar.forEach(function (p) {
      if (!p) return;
      if (p.kalin) {
        var b = document.createElement("b");
        b.textContent = p.metin;
        kap.append(b);
      } else {
        kap.append(document.createTextNode(p.metin));
      }
    });
  }

  function slugu(bag) {
    var href = bag.getAttribute("href") || "";
    return href.replace(/^.*\//, "").replace(/\.(html|pptx)$/i, "").toLowerCase();
  }

  function girisHedefi(href) {
    return "/giris?hedef=" + encodeURIComponent(href.charAt(0) === "/" ? href : "/" + href);
  }

  /* Bir indirme bağlantısını kilitli katalog kaydına çevirir: indirme niteliği
     kalkar, büyük indirme oku kilide döner, hedef giriş ekranı olur. */
  function kilitle(bag, rozetKabi) {
    var hedef = bag.getAttribute("href") || "";
    bag.classList.add("kilitli");
    bag.removeAttribute("download");
    var simge = bag.querySelector(".ic svg");
    if (simge) simge.replaceWith(kilitSvg());
    bag.href = girisHedefi(hedef);
    if (!bag.querySelector(".kilit")) rozetKabi.append(kilitRozeti());
  }

  /* Kapı yeniden başlarken eski biçimde cevap gelebilir; ikisi de çalışsın. */
  function uyumla(d) {
    d.konular = d.konular || [];
    if (!d.indirilebilir) d.indirilebilir = d.indirme ? d.konular.slice() : [];
    d.herkeseAcik = d.herkeseAcik || [];
    return d;
  }

  function acikMi(d, slug) { return d.konular.indexOf(slug) >= 0; }
  function inerMi(d, slug) { return d.indirilebilir.indexOf(slug) >= 0; }

  /* Ünite başına açık/toplam sayısından ana sayfanın üst katmanlarını
     işaretler: ünite başlıkları, ilk ekrandaki süzgeç düğmeleri ve açılış
     kartı. Kartlara inmeden hangi ünitenin açık olduğu okunur. */
  function isaretle(d, unite, acikKart, kartSayisi) {
    function durumu(id) {
      var u = unite[id];
      if (!u) return null;
      return u.acik === u.toplam ? "acik" : u.acik === 0 ? "kilitli" : "kismi";
    }

    hepsi("article.unit").forEach(function (blok) {
      var durum = durumu(blok.id);
      var kunye = blok.querySelector(".unit-meta");
      if (!durum || !kunye || kunye.querySelector(".erisim-durum")) return;
      var u = unite[blok.id];
      blok.dataset.erisim = durum;
      var satir = document.createElement("span");
      satir.className = "erisim-durum " + durum;
      if (durum === "kilitli") satir.append(kilitSvg(), document.createTextNode("Kod gerekli"));
      else if (durum === "kismi") satir.textContent = u.acik + " açık · " + (u.toplam - u.acik) + " kodla";
      else satir.textContent = "Hepsi açık";
      /* "… konu çalışıldı" satırı varsa onun üstüne */
      kunye.insertBefore(satir, kunye.querySelector(".prog"));
    });

    hepsi("#filters button[data-unit]").forEach(function (dugme) {
      var durum = durumu(dugme.dataset.unit);
      if (!durum || dugme.dataset.erisim) return;
      var u = unite[dugme.dataset.unit];
      dugme.dataset.erisim = durum;
      if (durum === "kilitli") {
        dugme.append(kilitSvg("erisim-simge"), duyulan(" (kod gerekli)"));
      } else if (durum === "kismi") {
        var sayi = document.createElement("span");
        sayi.className = "erisim-sayi";
        sayi.setAttribute("aria-hidden", "true");
        sayi.textContent = u.acik + "/" + u.toplam;
        dugme.append(sayi, duyulan(" (" + u.acik + " konu açık)"));
      } else {
        var nokta = document.createElement("span");
        nokta.className = "erisim-nokta";
        nokta.setAttribute("aria-hidden", "true");
        dugme.prepend(nokta);
        dugme.append(duyulan(" (açık)"));
      }
    });

    /* Açılış kartı yeni üniteyi (ya da kaldığın konuyu) öne çıkarır; orası
       kapalıysa bunu söylesin, alt satır da kaç konunun açık olduğunu. */
    var vitrin = document.querySelector(".latest");
    if (!vitrin || vitrin.querySelector(".kilit")) return;
    var vitrinBag = vitrin.querySelector(".button");
    var hedef = vitrinBag ? vitrinBag.getAttribute("href") || "" : "";
    var kapali = hedef.charAt(0) === "#"
      ? durumu(hedef.slice(1)) === "kilitli"
      : !acikMi(d, slugu(vitrinBag));
    if (kapali) {
      var baslik = vitrin.querySelector("h2");
      if (baslik) baslik.after(kilitRozeti());
    }
    var durumYazisi = vitrin.querySelector(".status");
    if (durumYazisi && !vitrin.classList.contains("continue")) {
      durumYazisi.textContent = acikKart + " / " + kartSayisi + " konu açık";
    }
  }

  /* ------------------------------------------------------------ ana sayfa */

  function anaSayfa(d) {
    var serit = document.getElementById("erisim-serit");
    var metin = document.getElementById("erisim-metin");
    var eylem = document.getElementById("erisim-eylem");
    var ustBag = document.getElementById("erisim-link");
    var ustMetin = document.getElementById("erisim-link-metin");
    var girisli = d.rol === "ogrenci" || d.rol === "yonetici";

    /* ---- konu kartları: kapalı olan görünür kalır, kilitli işaretlenir ---- */
    var kartSayisi = 0;
    var acikKart = 0;
    var unite = {};   /* ünite kimliği → { toplam, acik } */
    hepsi("article.lesson").forEach(function (kart) {
      var bag = kart.querySelector("h3 a");
      if (!bag) return;
      var slug = slugu(bag);
      var sunum = kart.querySelector("a.pill");
      var u = unite[kart.dataset.unit] || (unite[kart.dataset.unit] = { toplam: 0, acik: 0 });
      kartSayisi++;
      u.toplam++;
      if (acikMi(d, slug)) {
        acikKart++;
        u.acik++;
      } else if (!kart.classList.contains("kilitli")) {
        kart.classList.add("kilitli");
        /* İmleçteki konu simgesinin yanına kilit konur; hangisinin görüneceğine
           stil karar verir (ayrım varken kilit, yokken konu simgesi). */
        var imlec = kart.querySelector(".mark");
        if (imlec) imlec.append(kilitSvg("kilit-simge"));
        /* "Konuya git" yerine durum: kartın eylem köşesi kilitli olduğunu söyler. */
        var git = kart.querySelector(".go");
        if (git) git.replaceWith(kilitRozeti("Ders koduyla açılır"));
        bag.append(duyulan(" (kod gerekli)"));
      }
      if (sunum && !inerMi(d, slug)) sunum.remove();
    });

    /* Açık ve kapalı bir aradaysa kapalılar renksizleşir, açıklar renkli kalır:
       hangisinin açıldığı bir bakışta görünür. Hepsi aynı durumdaysa ayrım
       yapılacak bir şey yoktur, sayfa olduğu gibi kalır. */
    var ayrimli = acikKart > 0 && acikKart < kartSayisi;
    document.documentElement.classList.toggle("erisim-ayrimli", ayrimli);

    /* Ünite, süzgeç ve açılış kartı işaretleri de yalnızca ayrım varken
       konur: hepsi kapalıyken üç kez "kod gerekli" demek, şeridin zaten
       söylediğini tekrarlamaktır. */
    if (ayrimli) isaretle(d, unite, acikKart, kartSayisi);

    /* ---- sunum ızgarası ---- */
    var kalan = 0;
    hepsi("a.dl").forEach(function (bag) {
      if (inerMi(d, slugu(bag))) { kalan++; return; }
      /* Girişi olana kapalı bir bağlantı göstermenin anlamı yok. */
      if (girisli) return bag.remove();
      /* Girişi olmayana katalog kalsın, ama indirme düğmesi gibi durmasın. */
      kilitle(bag, bag.querySelector("span:last-child") || bag);
      kalan++;
    });

    hepsi('a[href$="dersler-sunumlar.zip"]').forEach(function (bag) {
      if (d.toplu) return;
      var kap = bag.closest(".dl-all");
      /* Girişi olana ya da kutu dışındaki (alt bilgi) bağlantıya kilit
         göstermenin anlamı yok; bağlantı, varsa kutusuyla birlikte kalkar. */
      if (girisli || !kap) return (kap || bag).remove();
      var cumleKap = kap.querySelector("span");
      if (cumleKap) {
        cumle(cumleKap, [
          { metin: "Hepsi bir arada:", kalin: true },
          { metin: " on sekiz sunum tek ZIP dosyasında — ders koduyla açılır." },
        ]);
      }
      bag.textContent = "";
      bag.append(kilitSvg(), document.createTextNode("Kod gir"));
      bag.removeAttribute("download");
      bag.href = "/giris";
    });

    var bolum = document.getElementById("sunumlar");
    if (girisli && bolum) {
      if (kalan === 0) {
        bolum.hidden = true;
        hepsi('a[href="#sunumlar"]').forEach(function (a) { a.remove(); });
      } else {
        var giris = bolum.querySelector(".section-heading p");
        if (giris) {
          giris.textContent =
            "Size açık " + kalan + " sunum: her biri 16–19 slayt, konu anlatımıyla " +
            "birebir aynı bölümler ve her slaytta konuşmacı notu.";
        }
      }
    }

    /* ---- şerit ve üst bar ---- */
    if (!serit) return;
    serit.classList.toggle("onizleme", Boolean(d.onizleme));
    eylem.hidden = false;

    var toplam = hepsi("article.lesson").length || 18;
    var n = d.konular.length;
    var k = d.indirilebilir.length;

    if (d.onizleme) {
      var kim = d.onizleme.tur === "herkes"
        ? [{ metin: "Önizleme: ", kalin: true }, { metin: "kodu olmayan bir ziyaretçi sayfayı böyle görür." }]
        : [
            { metin: "Önizleme: ", kalin: true },
            { metin: d.onizleme.ad || d.onizleme.kod, kalin: true },
            { metin: " (" + d.onizleme.kod + ") sayfayı böyle görür." },
            d.onizleme.sebep
              ? { metin: " Bu kod şu an geçmiyor; yalnızca herkese açık konular görünür." }
              : null,
          ];
      cumle(metin, kim);
      eylem.textContent = "Önizlemeyi kapat";
      eylem.href = "/yonetim";
      ustMetin.textContent = "Önizleme";
      ustBag.href = "/yonetim";
    } else if (d.rol === "yonetici") {
      cumle(metin, [
        { metin: "Yönetici", kalin: true },
        { metin: " olarak giriş yaptınız; bütün konular ve sunumlar açık." },
      ]);
      eylem.textContent = "Yönetim";
      eylem.href = "/yonetim";
      ustMetin.textContent = "Yönetim";
      ustBag.href = "/yonetim";
    } else if (d.rol === "ogrenci") {
      cumle(metin, [
        { metin: d.ad || d.kod, kalin: true },
        {
          metin: " için " + n + " konu açık. " +
            (k === 0 ? "Sunum indirme kapalı." : k === n ? "Sunumlar indirilebilir." : k + " konunun sunumu indirilebilir."),
        },
      ]);
      eylem.textContent = "Çıkış";
      eylem.href = "/cikis";
      /* Sınıf adına tıklamak çıkış yapmasın: oturum sayfasına gider. */
      ustMetin.textContent = d.ad || d.kod;
      ustBag.href = "/giris";
      ustBag.title = "Oturum";
    } else {
      var parcalar = [];
      if (SEBEP[d.sebep]) parcalar.push({ metin: SEBEP[d.sebep] + " ", kalin: true });
      if (n >= toplam) {
        parcalar.push({ metin: "Bütün konular herkese açık. " });
        parcalar.push({ metin: d.toplu ? "Sunumlar da indirilebilir." : "Sunumları indirmek için ders kodu gerekir." });
      } else if (n > 0) {
        parcalar.push({ metin: n + " konu", kalin: true });
        parcalar.push({ metin: " herkese açık; diğerleri ders koduyla açılır." });
      } else {
        parcalar.push({ metin: "Konu sayfaları ve sunumlar " });
        parcalar.push({ metin: "ders koduyla", kalin: true });
        parcalar.push({ metin: " açılır. Öğretmeninizin verdiği kodu girin; kod bu tarayıcıda açık kalır." });
      }
      cumle(metin, parcalar);
      eylem.textContent = d.sebep ? "Yeni kod gir" : "Kod gir";
      eylem.href = "/giris";
      /* Açılacak bir şey kalmadıysa düğme de kalmasın. */
      eylem.hidden = n >= toplam && d.toplu;
    }

    serit.hidden = false;

    /* Arama betiği dizilerini tazelesin, sayaçlar doğru kalsın. */
    var q = document.getElementById("q");
    if (q) q.dispatchEvent(new Event("input"));
  }

  /* --------------------------------------------------------- konu sayfası */

  function konuSayfasi(d) {
    var slug = location.pathname.replace(/^.*\//, "").replace(/\.html$/i, "").toLowerCase();
    if (inerMi(d, slug)) return;
    var girisli = d.rol === "ogrenci" || d.rol === "yonetici";
    hepsi('a[href^="sunum/"], a[href^="/sunum/"]').forEach(function (a) {
      /* Kodu olan ama indirme izni olmayana, ya da alt bilgideki ikinci
         bağlantıya kilit göstermenin anlamı yok. */
      if (girisli || !a.classList.contains("button")) return a.remove();
      /* Kodu olmayan (konu herkese açık): düğme kalır, kilide döner. */
      var hedef = a.getAttribute("href") || "";
      a.removeAttribute("download");
      a.href = girisHedefi(hedef);
      a.textContent = "";
      a.append(document.createTextNode("Sunum için kod gir"), kilitSvg());
    });
  }

  /* ---------------------------------------------------------------- başla */

  var onizleme = new URLSearchParams(location.search).get("onizleme");
  var adres = "/durum" + (onizleme ? "?onizleme=" + encodeURIComponent(onizleme) : "");

  fetch(adres, { headers: { accept: "application/json" }, credentials: "same-origin" })
    .then(function (c) { return c.ok ? c.json() : null; })
    .then(function (d) {
      if (!d) return;
      uyumla(d);
      if (document.getElementById("erisim-serit")) anaSayfa(d);
      else konuSayfasi(d);
    })
    .catch(function () { /* kapı yanıt vermiyorsa sayfa olduğu gibi kalır */ });
})();
