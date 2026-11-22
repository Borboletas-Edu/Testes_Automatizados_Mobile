#!/usr/bin/env bash
# Baixa o LojaEBAC.ipa (branch "ios" do repositório da EBAC) para a pasta app/
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
URL="https://github.com/EBAC-QE/ebac-store-mobile-tests/raw/ios/app/LojaEBAC.ipa"

curl -fL "$URL" -o "$APP_DIR/LojaEBAC.ipa"
ls -lh "$APP_DIR/LojaEBAC.ipa"
