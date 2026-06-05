#!/bin/bash
set -euo pipefail

FAIL=0

for f in index.html en/index.html ja/index.html css/style.css; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FAIL: missing $f"; FAIL=1; fi
done

echo ""
echo "=== Check Kindle/Gumroad adjacent buttons ==="

if grep -q "https://www.amazon.co.jp/dp/B0H3ZSMFMH" ja/index.html && grep -q "https://noborikuta.gumroad.com/l/sodateru-ai-early-access" ja/index.html; then
  echo "OK: ja has Kindle and Gumroad"
else
  echo "FAIL: ja missing Kindle or Gumroad"
  FAIL=1
fi

if grep -q "https://www.amazon.com/dp/B0GX2WFTTZ" en/index.html && grep -q "https://noborikuta.gumroad.com/l/aiofonesown-early-access" en/index.html; then
  echo "OK: en has Kindle and Gumroad"
else
  echo "FAIL: en missing Kindle or Gumroad"
  FAIL=1
fi

if grep -q "https://www.amazon.com/dp/B0GX2WFTTZ" index.html && grep -q "https://noborikuta.gumroad.com/l/aiofonesown-early-access" index.html && grep -q "https://www.amazon.co.jp/dp/B0H3ZSMFMH" index.html && grep -q "https://noborikuta.gumroad.com/l/sodateru-ai-early-access" index.html; then
  echo "OK: root has both Kindle and Gumroad links"
else
  echo "FAIL: root missing Kindle or Gumroad links"
  FAIL=1
fi

echo ""
echo "=== Check template-pack sections removed from page body ==="
if grep -q "Template Pack editions\|Template Pack edition\|テンプレートパック版について" index.html en/index.html ja/index.html; then
  echo "FAIL: standalone template-pack section text remains"
  FAIL=1
else
  echo "OK: standalone template-pack section text removed"
fi

echo ""
echo "=== Check author photo size ==="
if grep -q "148px" css/style.css && grep -q "border-radius: 18px" css/style.css; then
  echo "OK: larger square author photo CSS found"
else
  echo "FAIL: larger square author photo CSS missing"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "KINDLE GUMROAD ADJACENT PATCH CHECK PASSED"
else
  echo "KINDLE GUMROAD ADJACENT PATCH CHECK FAILED"
  exit 1
fi
