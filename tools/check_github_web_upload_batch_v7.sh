#!/bin/bash
set -euo pipefail
EN="https://noborikuta.gumroad.com/l/aiofonesown-early-access"
JA="https://noborikuta.gumroad.com/l/sodateru-ai-early-access"
FAIL=0

echo "=== file count ==="
find . -type f | wc -l

echo "=== Gumroad links ==="
grep -Rni "gumroad" . --include='*.html' --include='*.md' || true

echo "=== critical checks ==="
if grep -RniE "https://gumroad\.com/|https://gumroad\.com/l/|gumroad\.com/aiofonesown" . --include='*.html' --include='*.md'; then
  echo "FAIL: old/bare Gumroad URL remains"; FAIL=1
fi
if grep -Rni "May 30, 2026" . --include='*.html' --include='*.md'; then
  echo "FAIL: wrong May 30 date remains"; FAIL=1
fi
if ! grep -R "May 29, 2026" . >/dev/null; then echo "FAIL: May 29 English release missing"; FAIL=1; fi
if ! grep -R "2026年5月31日" . >/dev/null; then echo "FAIL: 2026年5月31日 Japanese release missing"; FAIL=1; fi
if ! grep -R "$EN" en updates news index.html >/dev/null; then echo "FAIL: English Gumroad missing"; FAIL=1; fi
if ! grep -R "$JA" ja updates news index.html >/dev/null; then echo "FAIL: Japanese Gumroad missing"; FAIL=1; fi
for f in index.html en/index.html ja/index.html; do
  for s in 'https://x.com/aiofonesown' 'https://www.instagram.com/aiofonesown' 'https://www.threads.net/@aiofonesown'; do
    if ! grep -q "$s" "$f"; then echo "FAIL: $s missing in $f"; FAIL=1; fi
  done
done
if ! grep -q "noboru-ikuta.jpg" index.html; then echo "FAIL: author photo missing from root index"; FAIL=1; fi
if grep -q "author-card" ja/index.html; then echo "FAIL: author card still in ja/index.html"; FAIL=1; fi
if [ ! -f assets/noboru-ikuta.jpg ]; then echo "FAIL: assets/noboru-ikuta.jpg missing"; FAIL=1; fi
if [ "$FAIL" -eq 0 ]; then echo "ALL CORE CHECKS PASSED"; else echo "CHECKS FAILED"; exit 1; fi
