#!/bin/bash
set -euo pipefail

FAIL=0

echo "=== Recovery source ==="
echo "Latest GitHub ZIP base: aiofonesown-site-e164c85b622f087aa6f2e7b09ef502e7d84a8087.zip"

echo ""
echo "=== Required images still present ==="
for f in \
  assets/en-hero-wide.png \
  assets/ja-hero-wide.png \
  assets/en-cover-square.png \
  assets/ja-cover-square.png \
  assets/noboru-ikuta.jpg
do
  if [ -f "$f" ]; then
    echo "OK: $f"
  else
    echo "FAIL: missing $f"
    FAIL=1
  fi
done

echo ""
echo "=== SNS links in top pages ==="
for page in index.html ja/index.html en/index.html; do
  echo "--- $page ---"
  for url in \
    "https://x.com/aiofonesown" \
    "https://www.instagram.com/aiofonesown" \
    "https://www.threads.net/@aiofonesown"
  do
    if grep -q "$url" "$page"; then
      echo "OK: $url"
    else
      echo "FAIL: missing $url"
      FAIL=1
    fi
  done
done

echo ""
echo "=== Author English-only + compact photo ==="
if grep -q "NOBORu IKUTA is a Japanese technology builder" index.html; then
  echo "OK: English author profile found"
else
  echo "FAIL: English author profile missing"
  FAIL=1
fi

if grep -q 'width="72" height="72"' index.html && grep -q "author-sns-recovery-fix" css/style.css; then
  echo "OK: compact author photo rules found"
else
  echo "FAIL: compact author photo rules missing"
  FAIL=1
fi

echo ""
echo "=== Gumroad link presence ==="
if grep -Rq "https://noborikuta.gumroad.com/l/aiofonesown-early-access" .; then
  echo "OK: English Gumroad URL exists"
else
  echo "WARN: English Gumroad URL not found"
fi

if grep -Rq "https://noborikuta.gumroad.com/l/sodateru-ai-early-access" .; then
  echo "OK: Japanese Gumroad URL exists"
else
  echo "WARN: Japanese Gumroad URL not found"
fi

echo ""
echo "=== Known dead link check ==="
if grep -R "https://gumroad.com/aiofonesown" . --exclude-dir=.git; then
  echo "FAIL: old dead Gumroad link remains"
  FAIL=1
else
  echo "OK: old dead Gumroad link not found"
fi

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo "RECOVERY CHECK PASSED"
else
  echo ""
  echo "RECOVERY CHECK FAILED"
  exit 1
fi
