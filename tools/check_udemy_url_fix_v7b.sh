#!/bin/bash
set -euo pipefail
FAIL=0

EN="https://www.udemy.com/course/aionesown/?referralCode=C8E43BDE282665E35B61"
JA="https://www.udemy.com/course/aionesown-ja/?referralCode=5F2A4FDAD2C129070F86"

if grep -R "$EN" index.html en/index.html updates/index.html news/index.html social_posts 2>/dev/null >/dev/null; then
  echo "OK: English Udemy referral URL found"
else
  echo "WARN: English Udemy referral URL not found in checked files"
fi

if grep -R "$JA" index.html ja/index.html updates/index.html news/index.html social_posts 2>/dev/null >/dev/null; then
  echo "OK: Japanese Udemy referral URL found"
else
  echo "FAIL: Japanese Udemy referral URL missing"
  FAIL=1
fi

if grep -R "https://www.udemy.com/course/aiofonesown/" . 2>/dev/null; then
  echo "FAIL: old wrong English aiofonesown Udemy URL remains"
  FAIL=1
fi

if grep -R "https://www.udemy.com/course/aiofonesown-ja/" . 2>/dev/null; then
  echo "FAIL: old wrong Japanese aiofonesown-ja Udemy URL remains"
  FAIL=1
fi

if grep -R "82775B45CAF12096DA3C" . 2>/dev/null; then
  echo "FAIL: free 10-seat coupon URL is present in public site patch"
  FAIL=1
else
  echo "OK: free 10-seat coupon URL is not included"
fi

if [ "$FAIL" -eq 0 ]; then
  echo "UDEMY URL FIX V7B CHECK PASSED"
else
  echo "UDEMY URL FIX V7B CHECK FAILED"
  exit 1
fi
