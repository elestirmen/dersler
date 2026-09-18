#!/usr/bin/env bash
# dersler yayına alma: Cloudflare DNS kaydı + NPM proxy host (iki alan adı).
#
#   dersler.urgup.keenetic.link   (Keenetic DDNS, joker kayıt — DNS'te iş yok)
#   dersler.perinet.org           (Cloudflare üzerinden, CNAME -> urgup.keenetic.link)
#
# İkisi de aynı proxy host'ta toplanır ve tek Let's Encrypt sertifikası alır;
# sunucudaki diğer siteler (ayna, filo-takip, ml, rubrik...) de böyle duruyor.
#
# Konteyner zaten ayakta olmalı:
#   docker compose -f /opt/dersler/deploy/docker-compose.yml up -d
#
# Kullanım:
#   bash /opt/dersler/deploy/yayina-al.sh                 # e-posta ve şifreyi sorar
#   NPM_EMAIL=... NPM_PASS_FILE=/run/user/1000/npm-pass bash ...   # ikisini de dışarıdan alır
#
# Sırlar betiğin dışına çıkmaz, ekrana yazılmaz. Betik yeniden çalıştırılabilir:
# var olan kayda ve proxy host'a dokunmaz.

set -euo pipefail

DOMAIN_MAIN="dersler.perinet.org"
DOMAIN_ALT="dersler.urgup.keenetic.link"
ZONE_NAME="perinet.org"
RECORD_NAME="dersler"
RECORD_TARGET="urgup.keenetic.link"
FORWARD_HOST="dersler-web"
FORWARD_PORT=80
NPM_URL="http://127.0.0.1:81"
NPM_EMAIL="${NPM_EMAIL:-}"   # NPM yönetici e-postası; boşsa betik sorar

say()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$*"; }
die()  { printf '  \033[31m✗\033[0m %s\n' "$*" >&2; exit 1; }

# JSON okumak için python3; jq kurulu olmayabilir.
jget() { python3 -c 'import json,sys;d=json.load(sys.stdin);
p=sys.argv[1].split(".")
for k in p:
    if k=="": continue
    d = d[int(k)] if k.isdigit() else d.get(k)
    if d is None: break
print("" if d is None else (json.dumps(d) if isinstance(d,(dict,list)) else d))' "$1"; }

# ----------------------------------------------------------- 1. Cloudflare

say "1/4  Cloudflare DNS  ($DOMAIN_MAIN)"

TOKEN_PATH="${1:-/home/ertugrul/.config/cloudflare/token.env}"
[ -f "$TOKEN_PATH" ] || die "Cloudflare token dosyası yok: $TOKEN_PATH"

CF_TOKEN=$(
  grep -ioE '^[[:space:]]*(CLOUDFLARE_API_TOKEN|CF_API_TOKEN|API_TOKEN|TOKEN)[[:space:]]*[=:][[:space:]]*.*' "$TOKEN_PATH" 2>/dev/null \
    | head -1 | sed -E 's/^[^=:]*[=:][[:space:]]*//; s/^["'"'"']//; s/["'"'"'][[:space:]]*$//' \
    || true
)
[ -n "$CF_TOKEN" ] || CF_TOKEN=$(head -1 "$TOKEN_PATH" | tr -d ' \r\n')
[ -n "$CF_TOKEN" ] || die "Token dosyası boş görünüyor."

cf() { curl -sS -H "Authorization: Bearer $CF_TOKEN" -H 'Content-Type: application/json' "$@"; }

[ "$(cf 'https://api.cloudflare.com/client/v4/user/tokens/verify' | jget success)" = "True" ] \
  || die "Cloudflare token doğrulanamadı."
ok "token geçerli"

zone_id=$(cf "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME" | jget result.0.id)
[ -n "$zone_id" ] || die "$ZONE_NAME bölgesi bulunamadı."

existing=$(cf "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records?name=$DOMAIN_MAIN" | jget result.0.id)
if [ -n "$existing" ]; then
  warn "$DOMAIN_MAIN kaydı zaten var, dokunulmadı"
else
  body=$(python3 -c 'import json,sys;print(json.dumps({
    "type":"CNAME","name":sys.argv[1],"content":sys.argv[2],"proxied":True,"ttl":1}))' \
    "$RECORD_NAME" "$RECORD_TARGET")
  resp=$(cf -X POST --data "$body" "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records")
  [ "$(printf '%s' "$resp" | jget success)" = "True" ] \
    || die "Kayıt oluşturulamadı: $(printf '%s' "$resp" | jget errors.0.message)"
  ok "CNAME oluşturuldu: $DOMAIN_MAIN -> $RECORD_TARGET (proxied)"
fi

# ------------------------------------------------------------ 2. DNS bekle

say "2/4  DNS çözümlemesi"
for d in "$DOMAIN_MAIN" "$DOMAIN_ALT"; do
  for i in $(seq 1 30); do
    getent hosts "$d" >/dev/null 2>&1 && { ok "$d çözümleniyor"; break; }
    [ "$i" -eq 30 ] && die "$d 2,5 dakikada çözümlenmedi."
    printf '  bekleniyor %s (%s/30)\r' "$d" "$i"; sleep 5
  done
done

# ------------------------------------------------------------- 3. Konteyner

say "3/4  Konteyner"
docker ps --filter name="$FORWARD_HOST" --format '{{.Names}}' | grep -qx "$FORWARD_HOST" \
  || die "$FORWARD_HOST çalışmıyor. Önce: docker compose -f /opt/dersler/deploy/docker-compose.yml up -d"
ok "$FORWARD_HOST ayakta"

# ------------------------------------------------------------------ 4. NPM

say "4/4  Nginx Proxy Manager"

if [ -n "${NPM_PASS_FILE:-}" ]; then
  [ -f "$NPM_PASS_FILE" ] || die "NPM_PASS_FILE bulunamadı: $NPM_PASS_FILE"
  NPM_PASS=$(head -1 "$NPM_PASS_FILE" | tr -d '\r\n')
else
  if [ -n "$NPM_EMAIL" ]; then
    printf '  NPM yönetici e-postası [%s]: ' "$NPM_EMAIL"
  else
    printf '  NPM yönetici e-postası: '
  fi
  read -r reply || true
  [ -n "${reply:-}" ] && NPM_EMAIL="$reply"
  printf '  NPM şifresi (görünmez): '; read -rs NPM_PASS; printf '\n'
fi
[ -n "$NPM_EMAIL" ] || die "NPM e-postası boş (NPM_EMAIL ile verebilirsin)."
[ -n "${NPM_PASS:-}" ] || die "Şifre boş."

auth_body=$(NPM_EMAIL="$NPM_EMAIL" NPM_PASS="$NPM_PASS" python3 -c 'import json,os;print(json.dumps({"identity":os.environ["NPM_EMAIL"],"secret":os.environ["NPM_PASS"]}))')
NPM_TOKEN=$(curl -sS -H 'Content-Type: application/json' -X POST --data "$auth_body" "$NPM_URL/api/tokens" | jget token)
unset NPM_PASS
[ -n "$NPM_TOKEN" ] || die "NPM girişi başarısız (e-posta/şifre)."
ok "NPM oturumu açıldı"

npm_api() { curl -sS -H "Authorization: Bearer $NPM_TOKEN" -H 'Content-Type: application/json' "$@"; }

if npm_api "$NPM_URL/api/nginx/proxy-hosts" | grep -q "\"$DOMAIN_MAIN\""; then
  warn "$DOMAIN_MAIN için proxy host zaten var, dokunulmadı"
else
  say "  Let's Encrypt sertifikası isteniyor (30-60 sn sürebilir)"
  # NPM 2.15+ sertifika şeması: meta yalnızca dns_challenge/key_type vb. kabul eder;
  # eski sürümlerdeki letsencrypt_email + letsencrypt_agree alanları reddediliyor
  # (e-posta artık giriş yapan hesaptan alınıyor).
  cert_body=$(python3 -c 'import json,sys;print(json.dumps({
    "provider":"letsencrypt","nice_name":sys.argv[1]+", "+sys.argv[2],
    "domain_names":[sys.argv[1],sys.argv[2]],
    "meta":{"dns_challenge":False}}))' \
    "$DOMAIN_MAIN" "$DOMAIN_ALT")
  resp=$(npm_api -X POST --data "$cert_body" "$NPM_URL/api/nginx/certificates")
  cert_id=$(printf '%s' "$resp" | jget id)
  if [ -z "$cert_id" ]; then
    warn "Sertifika alınamadı: $(printf '%s' "$resp" | jget error.message)"
    warn "Proxy host SSL'siz oluşturuluyor; sertifikayı NPM arayüzünden ekleyebilirsiniz."
    cert_id=0
  else
    ok "sertifika alındı (id: $cert_id)"
  fi

  host_body=$(python3 -c 'import json,sys;
cert=int(sys.argv[5]); ssl = cert != 0
print(json.dumps({
  "domain_names":[sys.argv[1],sys.argv[2]],"forward_scheme":"http","forward_host":sys.argv[3],
  "forward_port":int(sys.argv[4]),"certificate_id":cert,
  "ssl_forced":ssl,"http2_support":ssl,"hsts_enabled":ssl,"hsts_subdomains":False,
  "block_exploits":True,"caching_enabled":False,"allow_websocket_upgrade":False,
  "access_list_id":0,"advanced_config":"","locations":[]}))' \
    "$DOMAIN_MAIN" "$DOMAIN_ALT" "$FORWARD_HOST" "$FORWARD_PORT" "$cert_id")
  resp=$(npm_api -X POST --data "$host_body" "$NPM_URL/api/nginx/proxy-hosts")
  [ -n "$(printf '%s' "$resp" | jget id)" ] \
    || die "Proxy host oluşturulamadı: $(printf '%s' "$resp" | jget error.message)"
  ok "proxy host oluşturuldu: $DOMAIN_MAIN, $DOMAIN_ALT -> $FORWARD_HOST:$FORWARD_PORT"
fi

say "Bitti"
printf '  https://%s\n  https://%s\n\n' "$DOMAIN_ALT" "$DOMAIN_MAIN"
