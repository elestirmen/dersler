#!/bin/bash
# Konu anlatımı illüstrasyonlarını Codex'le ve $imagegen becerisinin yerleşik image_gen aracıyla
# üretir. Model görseli üretir, kendisi inceler (bilimsel doğruluk, yazı, eller/geometri,
# kompozisyon), kusur varsa istemi düzeltip yeniden üretir (en çok 3 deneme) ve en iyisini seçer.
# Model ve akıl yürütme düzeyi ~/.codex/config.toml'dan gelir (2026-10: gpt-6.1-sol); başka bir
# model denemek için MODEL=<ad>.
#
#   bash gorsel/uret.sh serbest-dusme-giris          # tek görsel
#   bash gorsel/uret.sh --hepsi                       # istekler.json'daki görseller, 6'sı aynı anda
#   CIKTI=/baska/dizin bash gorsel/uret.sh <id>       # ham/ yerine başka bir yere
#   DERS=kimya ISTEK=gorsel/istekler-kimya.json bash gorsel/uret.sh --hepsi   # kimya görselleri
#
# Çıktı ham/<id>.png (depoya girmez). Codex görselleri $CODEX_HOME/generated_images/<oturum>/
# altına yazar; seçilen deneme oturumun KENDİ klasöründen alınır (paylaşılan klasörde eşzamanlı
# oturumlar birbirinin görselini kapabilir). Sonra: bash gorsel/donustur.sh (→ dist/gorsel, yayın).
D=$(cd "$(dirname "$0")" && pwd)
OUTD="${CIKTI:-$D/ham}"
ISTEK="${ISTEK:-$D/istekler.json}"     # ek görseller için: ISTEK=gorsel/istekler-ek.json
DERS="${DERS:-fizik}"                  # fizik | kimya: istemdeki ders adı ve doğruluk şartı
if [ "$1" = "--hepsi" ]; then
  python3 -c "import json; print('\n'.join(x['id'] for x in json.load(open('$ISTEK'))))" | ISTEK="$ISTEK" xargs -P "${PARALEL:-6}" -I{} bash "$D/uret.sh" {}
  exit
fi
id=$1
sahne=$(python3 -c "import json,sys; print(next((x['sahne'] for x in json.load(open('$ISTEK')) if x['id']=='$id'), ''))")
[ -z "$sahne" ] && { echo "$(basename "$ISTEK")'da yok: $id"; exit 1; }
# her stil kendi iş ve günlük klasörünü kullanır; aynı konunun iki stili aynı anda koşabilir
L="$D/log/${STIL:-foto}"; W="$D/is/${STIL:-foto}/$id"; mkdir -p "$W" "$OUTD" "$L"
# STIL=foto | illustrasyon (varsayılan: foto — iki üslup karşılaştırıldı, sinematik gerçekçi olan daha kaliteli çıktı)
if [ "${STIL:-foto}" = "foto" ]; then
STIL_SATIRLARI="Use case: photorealistic-natural
Asset type: lesson hero image (web modal at 3:2 and a 16:9 slide; edges may be cropped slightly)
Primary request / scene and subject: $sahne
Style/medium: premium cinematic photograph, true-to-life materials and textures, rich natural detail, professional editorial quality (the look of a top science-magazine feature photo)
Composition/framing: landscape 3:2, main subject large and clearly readable in the central area, clean uncluttered background, a little breathing room at the edges
Lighting/mood: natural, luminous and cinematic, gentle contrast
Color palette: natural, rich and harmonious; a subtle cool blue-violet accent is welcome but not required"
else
STIL_SATIRLARI="Use case: illustration-story
Asset type: one image of a cohesive series of lesson hero illustrations (web modal at 3:2 and a 16:9 slide; edges may be cropped slightly)
Primary request / scene and subject: $sahne
Style/medium: premium hand-painted editorial illustration, like a feature illustration in a high-end science magazine: painterly digital gouache with refined, visible brushwork and a subtle paper grain; confident draughtsmanship, accurate anatomy, perspective and proportions; real depth, atmosphere and fine detail. Not flat vector, not cartoon, not anime, not a 3D render.
Composition/framing: landscape 3:2, main subject large and clearly readable in the central area, clean uncluttered background, a little breathing room at the edges
Lighting/mood: luminous, atmospheric, gently cinematic light with soft glow and clear light direction
Color palette: cohesive series palette of deep navy and ink-blue shadows, cobalt and violet atmosphere, warm amber highlights and a small touch of fresh lime; natural colours where the subject needs them (skin, apples, grass, sky)"
fi
if [ "$DERS" = "kimya" ]; then BILIM="kimya ve fizik"; SCIENCE="chemistry and physics"; else BILIM="fizik"; SCIENCE="physics"; fi
prompt="\$imagegen becerisini kullan: varsayılan yerleşik image_gen aracı (CLI yedeğine geçme). Görev: bir lise $DERS dersi için YÜKSEK KALİTELİ tek bir görsel.

1. İstemi becerinin ortak şablonuyla (Use case / Asset type / Primary request / Scene / Subject / Style / Composition / Lighting / Palette / Materials / Constraints / Avoid) aşağıdaki bilgilerden kur; sahnedeki $BILIM ayrıntılarını aynen koru.
2. image_gen ile üret.
3. Çıkan görseli dikkatle incele: (a) sahnedeki $BILIM şartları tam olarak sağlanıyor mu, (b) görselde hiç yazı, harf, rakam, logo, tabela yok mu, (c) eller, yüzler, parmaklar, nesne geometrisi ve yansımalar kusursuz mu, (d) kompozisyon temiz ve özne büyük mü, (e) genel kalite premium mu (plastik, çizgi film, bulanık, yapay görünüm yok).
4. Bir kusur varsa istemde o kusuru hedefleyen tek bir değişiklik yapıp yeniden üret. En çok 3 deneme; kusursuz bir deneme çıkınca dur.
5. Dosya kopyalama yapma, base64 yazma, komut çalıştırma: araç görselleri kendisi kaydediyor.

$STIL_SATIRLARI
Constraints: the $SCIENCE must be exactly right as described; absolutely no text, letters, numbers, labels, logos, signs or watermarks anywhere
Avoid: cheap clip-art or stock-vector look, cartoon, anime, 3D toy look, oversaturation, plastic skin, extra or fused fingers, warped hands or faces, duplicated or floating objects, distorted geometry, blur, noise, AI artifacts

Son mesajın tek satır: SEÇİLEN: <en iyi denemenin sırası, 1'den başlar> — <kısa gerekçe>"
t0=$(date +%s)
MODEL_ARG=(); [ -n "$MODEL" ] && MODEL_ARG=(-m "$MODEL")
codex exec "${MODEL_ARG[@]}" --skip-git-repo-check -s workspace-write -C "$W" -o "$W/last.txt" "$prompt" < /dev/null > "$L/$id.log" 2>&1
rc=$?
sid=$(grep -m1 "^session id:" "$L/$id.log" | awk '{print $3}')
GD="${CODEX_HOME:-$HOME/.codex}/generated_images/$sid"
mapfile -t denemeler < <(ls -tr "$GD"/*.png 2>/dev/null)
n=${#denemeler[@]}
sec=$(grep -o "SEÇİLEN: *[0-9]*" "$W/last.txt" 2>/dev/null | grep -o "[0-9]*$" | head -1)
[ -z "$sec" ] || [ "$sec" -lt 1 ] || [ "$sec" -gt "$n" ] && sec=$n
if [ "$n" -gt 0 ]; then
  cp "${denemeler[$((sec-1))]}" "$OUTD/$id.png"
  echo "✓ $id $(( $(date +%s)-t0 ))s · $n deneme, seçilen $sec · $(tail -1 "$W/last.txt" 2>/dev/null | cut -c1-120)"
else
  echo "✗ $id (rc=$rc, oturumda görsel yok)"
fi
