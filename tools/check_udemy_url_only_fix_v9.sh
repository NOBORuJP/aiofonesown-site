#!/bin/bash
set -euo pipefail
FAIL=0

EN="https://www.udemy.com/course/aionesown/?referralCode=C8E43BDE282665E35B61"
JA="https://www.udemy.com/course/aionesown-ja/?referralCode=5F2A4FDAD2C129070F86"

if [ -f css/style.css ]; then
  echo "FAIL: css/style.css should not be included in this URL-only patch"
  FAIL=1
else
  echo "OK: no css/style.css included"
fi

if [ -d assets ]; then
  echo "FAIL: assets should not be included in this URL-only patch"
  FAIL=1
else
  echo "OK: no assets included"
fi

grep -R "$EN" index.html en/index.html updates/index.html news/index.html social_posts 2>/dev/null >/dev/null || { echo "FAIL: English Udemy referral URL missing"; FAIL=1; }
grep -R "$JA" index.html ja/index.html updates/index.html news/index.html social_posts 2>/dev/null >/dev/null || { echo "FAIL: Japanese Udemy referral URL missing"; FAIL=1; }

if grep -R "https://www.udemy.com/course/aiofonesown/" . 2>/dev/null; then
  echo "FAIL: old wrong English Udemy URL remains"
  FAIL=1
fi

if grep -R "https://www.udemy.com/course/aiofonesown-ja/" . 2>/dev/null; then
  echo "FAIL: old wrong Japanese Udemy URL remains"
  FAIL=1
fi

if grep -R "couponCode" . 2>/dev/null; then
  echo "FAIL: coupon URL exists, but coupon is intentionally excluded"
  FAIL=1
else
  echo "OK: no coupon URLs included"
fi

if [ "$FAIL" -eq 0 ]; then
  echo "UDEMY URL ONLY FIX V9 CHECK PASSED"
else
  echo "UDEMY URL ONLY FIX V9 CHECK FAILED"
  exit 1
fi
