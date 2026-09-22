#!/usr/bin/env bash
# Korunan yolları Cloudflare'ın kenar önbelleğinden düşürür.
#
# Neden gerekiyor: Cloudflare .pptx/.zip gibi uzantıları uzantısına bakarak
# saklar. Kapı kurulmadan önce kenara girmiş kopyalar, origin artık
# "private, no-store" dese bile TTL'leri dolana kadar (en çok 24 saat) anonim
# isteklere verilmeye devam eder. Bu betik onları hemen düşürür.
#
# Belirteçte **Cache Purge** izni olmalı (yayina-al.sh'nin kullandığı DNS
# belirtecinde bu izin yoksa API "Authentication error" döner; izni Cloudflare
# panelinden ekleyebilir ya da aynı işi Caching → Configuration → Purge Custom
# URLs ekranından yapabilirsiniz).
#
# Kullanım:
#   bash /opt/dersler/deploy/onbellek-temizle.sh [token-dosyasi]

set -euo pipefail

ALAN="dersler.perinet.org"
BOLGE="perinet.org"
TOKEN_PATH="${1:-/home/ertugrul/.config/cloudflare/token.env}"
DIST="$(cd "$(dirname "$0")/.." && pwd)/dist"

[ -f "$TOKEN_PATH" ] || { echo "Cloudflare token dosyası yok: $TOKEN_PATH" >&2; exit 1; }

CF_TOKEN=$(
  grep -ioE '^[[:space:]]*(CLOUDFLARE_API_TOKEN|CF_API_TOKEN|API_TOKEN|TOKEN)[[:space:]]*[=:][[:space:]]*.*' "$TOKEN_PATH" 2>/dev/null \
    | head -1 | sed -E 's/^[^=:]*[=:][[:space:]]*//; s/^["'"'"']//; s/["'"'"'][[:space:]]*$//' || true
)
[ -n "$CF_TOKEN" ] || CF_TOKEN=$(head -1 "$TOKEN_PATH" | tr -d ' \r\n')

CF_TOKEN="$CF_TOKEN" ALAN="$ALAN" BOLGE="$BOLGE" DIST="$DIST" python3 - <<'PY'
import json, os, urllib.error, urllib.request

token, alan, bolge, dist = (os.environ[k] for k in ("CF_TOKEN", "ALAN", "BOLGE", "DIST"))

def cf(yol, veri=None):
    istek = urllib.request.Request(
        "https://api.cloudflare.com/client/v4" + yol,
        data=None if veri is None else json.dumps(veri).encode(),
        headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"},
        method="GET" if veri is None else "POST")
    try:
        with urllib.request.urlopen(istek) as c:
            return json.load(c)
    except urllib.error.HTTPError as e:
        return json.load(e)

cevap = cf(f"/zones?name={bolge}")
if not cevap.get("success"):
    raise SystemExit("  ✗ bölge okunamadı: " + json.dumps(cevap.get("errors"), ensure_ascii=False))
zid = cevap["result"][0]["id"]

sluglar = sorted(f[:-5] for f in os.listdir(dist)
                 if f.endswith(".html") and f not in ("index.html", "404.html"))
adresler = ([f"https://{alan}/{s}.html" for s in sluglar]
            + [f"https://{alan}/sunum/{s}.pptx" for s in sluglar]
            + [f"https://{alan}/sunum/dersler-sunumlar.zip"])

print(f"  {len(adresler)} korunan adres temizlenecek")
hata = False
for i in range(0, len(adresler), 30):          # API çağrı başına en çok 30 adres
    obek = adresler[i:i + 30]
    sonuc = cf(f"/zones/{zid}/purge_cache", {"files": obek})
    if sonuc.get("success"):
        print(f"  ✓ {len(obek)} adres temizlendi")
    else:
        hata = True
        print("  ✗ " + json.dumps(sonuc.get("errors"), ensure_ascii=False))
if hata:
    raise SystemExit("  Belirteçte Cache Purge izni var mı?")
PY
