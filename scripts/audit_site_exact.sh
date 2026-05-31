#!/usr/bin/env bash
set -euo pipefail

echo "== Gumroad link audit =="
grep -RIn --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.next --exclude-dir=build \
  "gumroad.com/l" . || true

echo ""
echo "== Author link audit =="
grep -RIn --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.next --exclude-dir=build \
  -E 'href=["'\''/]*/author/?["'\'']|>Author<|\[Author\]\(/author/?\)' . || true

echo ""
echo "== Expected fixed URLs =="
echo "EN: https://noborikuta.gumroad.com/l/aiofonesown-early-access"
echo "JA: https://noborikuta.gumroad.com/l/sodateru-ai-early-access"
