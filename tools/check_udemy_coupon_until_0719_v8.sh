#!/bin/bash
set -euo pipefail
FAIL=0

for f in en/index.html ja/index.html updates/index.html news/index.html css/style.css; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FAIL missing $f"; FAIL=1; fi
done

grep -R "https://www.udemy.com/course/aionesown/?referralCode=C8E43BDE282665E35B61" index.html en/index.html updates/index.html news/index.html social_posts 2>/dev/null >/dev/null || { echo "FAIL: English referral URL missing"; FAIL=1; }
grep -R "https://www.udemy.com/course/aionesown-ja/?referralCode=5F2A4FDAD2C129070F86" index.html ja/index.html updates/index.html news/index.html social_posts 2>/dev/null >/dev/null || { echo "FAIL: Japanese referral URL missing"; FAIL=1; }
grep -R "https://www.udemy.com/course/aionesown/?couponCode=AIOFONESOWN2910" en/index.html updates/index.html news/index.html 2>/dev/null >/dev/null || { echo "FAIL: English coupon URL missing"; FAIL=1; }
grep -R "https://www.udemy.com/course/aionesown-ja/?couponCode=AIOFONESOWN2910" ja/index.html updates/index.html news/index.html 2>/dev/null >/dev/null || { echo "FAIL: Japanese coupon URL missing"; FAIL=1; }

grep -q "July 19" en/index.html || { echo "FAIL: English July 19 notice missing"; FAIL=1; }
grep -q "7月19日" ja/index.html || { echo "FAIL: Japanese 7月19日 notice missing"; FAIL=1; }

if grep -R "82775B45CAF12096DA3C" . 2>/dev/null; then
  echo "FAIL: free 10-seat coupon URL is present"
  FAIL=1
else
  echo "OK: free 10-seat coupon URL is not included"
fi

if grep -R "https://www.udemy.com/course/aiofonesown/" . 2>/dev/null; then
  echo "FAIL: old wrong aiofonesown URL remains"
  FAIL=1
fi

if grep -R "https://www.udemy.com/course/aiofonesown-ja/" . 2>/dev/null; then
  echo "FAIL: old wrong aiofonesown-ja URL remains"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "UDEMY COUPON UNTIL 0719 V8 CHECK PASSED"
else
  echo "UDEMY COUPON UNTIL 0719 V8 CHECK FAILED"
  exit 1
fi
