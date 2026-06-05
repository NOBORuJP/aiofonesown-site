#!/bin/bash
set -euo pipefail

FAIL=0

for f in index.html en/index.html ja/index.html css/style.css; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FAIL: missing $f"; FAIL=1; fi
done

if grep -q "https://www.amazon.com/dp/B0GX2WFTTZ" index.html && grep -q "https://www.amazon.co.jp/dp/B0H3ZSMFMH" index.html; then
  echo "OK: root has both Kindle links"
else
  echo "FAIL: root Kindle links missing"
  FAIL=1
fi

if grep -q "https://www.amazon.com/dp/B0GX2WFTTZ" en/index.html && ! grep -q "https://www.amazon.co.jp/dp/B0H3ZSMFMH" en/index.html; then
  echo "OK: en page has English Kindle primary"
else
  echo "FAIL: en Kindle link check failed"
  FAIL=1
fi

if grep -q "https://www.amazon.co.jp/dp/B0H3ZSMFMH" ja/index.html && ! grep -q "https://www.amazon.com/dp/B0GX2WFTTZ" ja/index.html; then
  echo "OK: ja page has Japanese Kindle primary"
else
  echo "FAIL: ja Kindle link check failed"
  FAIL=1
fi

if grep -q "Template Pack" en/index.html && grep -q "テンプレートパック" ja/index.html; then
  echo "OK: Gumroad moved to template-pack section"
else
  echo "FAIL: template pack section missing"
  FAIL=1
fi

if grep -q "112px" css/style.css && grep -q "border-radius: 14px" css/style.css; then
  echo "OK: square author photo CSS found"
else
  echo "FAIL: author photo CSS missing"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "KINDLE MAIN PATCH CHECK PASSED"
else
  echo "KINDLE MAIN PATCH CHECK FAILED"
  exit 1
fi
