#!/bin/bash
set -euo pipefail
FAIL=0

for f in index.html en/index.html ja/index.html updates/index.html news/index.html css/style.css assets/promo/ai_of_ones_own_promo_en_web.mp4 assets/promo/sodateru_ai_promo_ja_web.mp4; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FAIL missing $f"; FAIL=1; fi
done

grep -q 'June 4, 2026' updates/index.html || { echo 'FAIL: Kindle date is not June 4'; FAIL=1; }
grep -q 'June 6, 2026' updates/index.html || { echo 'FAIL: English paperback date missing'; FAIL=1; }
grep -q 'June 7, 2026' updates/index.html || { echo 'FAIL: June 7 date missing'; FAIL=1; }
grep -q 'preview-carousel-section' en/index.html || { echo 'FAIL: en preview missing'; FAIL=1; }
grep -q 'preview-carousel-section' ja/index.html || { echo 'FAIL: ja preview missing'; FAIL=1; }
grep -q 'promo-only-stack' index.html || { echo 'FAIL: top video-only stack missing'; FAIL=1; }
grep -q 'promo-only-stack single' en/index.html || { echo 'FAIL: en video-only section missing'; FAIL=1; }
grep -q 'promo-only-stack single' ja/index.html || { echo 'FAIL: ja video-only section missing'; FAIL=1; }

if [ "$FAIL" -eq 0 ]; then
  echo "RELEASE RECORD PROMO FIX V4B CHECK PASSED"
else
  echo "RELEASE RECORD PROMO FIX V4B CHECK FAILED"
  exit 1
fi
