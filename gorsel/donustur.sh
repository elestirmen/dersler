#!/bin/bash
# ham/<id>.png → dist/gorsel/<id>.webp (1536×1024) ve <id>-800.webp; yalnızca yeni ya da değişmiş olanlar.
# Dikkat: dist doğrudan yayındır; dönüştürülen görsel anında sitededir.
D=$(cd "$(dirname "$0")" && pwd); O="${1:-$D/../dist/gorsel}"; mkdir -p "$O"
for f in "$D"/ham/*.png; do
  id=$(basename "$f" .png)
  file -b "$f" | grep -q '^PNG' || { echo "✗ $id: PNG değil"; continue; }
  [ "$O/$id.webp" -nt "$f" ] && continue
  magick "$f" -resize 1536x1024^ -gravity center -extent 1536x1024 -strip -quality 88 -define webp:method=6 "$O/$id.webp"
  magick "$f" -resize 800x533^ -gravity center -extent 800x533 -strip -quality 84 -define webp:method=6 "$O/$id-800.webp"
  echo "✓ $id $(du -k "$O/$id.webp" | cut -f1)K / $(du -k "$O/$id-800.webp" | cut -f1)K"
done
