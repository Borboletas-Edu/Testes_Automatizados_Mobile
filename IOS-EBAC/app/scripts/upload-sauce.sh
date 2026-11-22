#!/usr/bin/env bash
# Envia o LojaEBAC.ipa para o App Storage do Sauce Labs (é por conta: refaça ao trocar de conta)
# Credenciais: E2E/.env (local) ou variáveis de ambiente (GitHub Actions)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
if [ -f "$ROOT/E2E/.env" ]; then source "$ROOT/E2E/.env"; fi

curl -fsS -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
  -X POST "https://api.${SAUCE_REGION:-us-west-1}.saucelabs.com/v1/storage/upload" \
  -F "payload=@$ROOT/app/LojaEBAC.ipa" \
  --form-string "name=LojaEBAC.ipa"
echo
