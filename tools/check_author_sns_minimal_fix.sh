#!/bin/bash
set -euo pipefail
FAIL=0

echo "=== Check compact author CSS ==="
if grep -q 'author-sns-minimal-fix' css/style.css && grep -q '72px' css/style.css && grep -q '56px' css/style.css; then
  echo "OK: compact author CSS found"
else
  echo "FAIL: compact author CSS missing"
  FAIL=1
fi

echo ""
echo "=== Check root English author profile ==="
if grep -q 'NOBORu IKUTA is a Japanese technology builder' index.html; then
  echo "OK: English author profile found"
else
  echo "FAIL: English author profile missing"
  FAIL=1
fi

if grep -q 'width="72" height="72"' index.html; then
  echo "OK: author image explicit dimensions found"
else
  echo "FAIL: author image dimensions missing"
  FAIL=1
fi

echo ""
echo "=== Check SNS links in index.html / ja/index.html / en/index.html ==="
for f in index.html ja/index.html en/index.html; do
  echo "--- $f ---"
  for url in     "https://x.com/aiofonesown"     "https://www.instagram.com/aiofonesown"     "https://www.threads.net/@aiofonesown"
  do
    if grep -q "$url" "$f"; then
      echo "OK: $url"
    else
      echo "FAIL: $url missing in $f"
      FAIL=1
    fi
  done
done

echo ""
echo "=== Image reference summary, no broad image replacement was performed ==="
grep -RniE 'assets/.*(hero|cover|logo|noboru)' index.html ja/index.html en/index.html | head -80 || true

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo "AUTHOR SNS MINIMAL FIX CHECK PASSED"
else
  echo ""
  echo "AUTHOR SNS MINIMAL FIX CHECK FAILED"
  exit 1
fi
