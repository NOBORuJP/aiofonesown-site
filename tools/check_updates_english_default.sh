#!/bin/bash
set -euo pipefail

FAIL=0

if grep -q '<html lang="en">' updates/index.html; then
  echo "OK: updates page is English lang"
else
  echo "FAIL: updates page is not English lang"
  FAIL=1
fi

if grep -q 'May 29, 2026' updates/index.html; then
  echo "OK: English release date found"
else
  echo "FAIL: English release date missing"
  FAIL=1
fi

if grep -q 'May 31, 2026' updates/index.html; then
  echo "OK: Japanese release date found in English"
else
  echo "FAIL: Japanese release date missing"
  FAIL=1
fi

if grep -q 'https://noborikuta.gumroad.com/l/aiofonesown-early-access' updates/index.html; then
  echo "OK: English Gumroad URL found"
else
  echo "FAIL: English Gumroad URL missing"
  FAIL=1
fi

if grep -q 'https://noborikuta.gumroad.com/l/sodateru-ai-early-access' updates/index.html; then
  echo "OK: Japanese Gumroad URL found"
else
  echo "FAIL: Japanese Gumroad URL missing"
  FAIL=1
fi

if grep -q '公式リンク\|日本語版を正式リリースしました\|更新情報' updates/index.html; then
  echo "FAIL: Japanese default update text remains"
  FAIL=1
else
  echo "OK: Japanese default text not found"
fi

if [ "$FAIL" -eq 0 ]; then
  echo "UPDATES ENGLISH DEFAULT CHECK PASSED"
else
  echo "UPDATES ENGLISH DEFAULT CHECK FAILED"
  exit 1
fi
