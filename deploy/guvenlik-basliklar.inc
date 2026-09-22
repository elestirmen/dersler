# Her yanıtta bulunması gereken güvenlik başlıkları.
#
# Ayrı dosya olmasının nedeni: nginx'te bir location kendi add_header'ını
# tanımladığı anda üst düzeydekilerin tamamını kaybeder. Başlık eklemesi
# gereken her location bu dosyayı include ederek onları geri getirir.
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
