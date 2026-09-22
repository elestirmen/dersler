# Kod arkasındaki yollar: paylaşımlı önbelleklerde durmamalı.
#
# Site Cloudflare üzerinden yayınlanıyor ve Cloudflare .pptx/.zip gibi uzantıları
# uzantısına bakarak kendiliğinden önbelleğe alır. Yetkili bir öğrencinin indirdiği
# deste kenarda saklanıp sonraki anonim isteğe verilebilir — kapı bu noktada
# tamamen devre dışı kalır. "private" bunu keser: yanıtı yalnızca isteği yapan
# tarayıcı saklayabilir, ne CDN ne de vekil.
#
# "no-store" yerine "private, no-cache": ikisi de paylaşımlı önbelleği yasaklar,
# ama no-store tarayıcının geri/ileri önbelleğini (bfcache) de kapatır ve konu
# sayfalarındaki deney durumu geri tuşunda sıfırlanır. no-cache ile tarayıcı
# kopyayı saklar, kullanmadan önce sunucuya sorar — yetki kalkmışsa o istek
# giriş ekranına düşer.
include /etc/nginx/conf.d/guvenlik-basliklar.inc;
add_header Cache-Control "private, no-cache" always;
add_header X-Robots-Tag "noindex" always;
expires off;
