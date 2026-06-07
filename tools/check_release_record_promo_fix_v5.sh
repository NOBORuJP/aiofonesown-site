#!/bin/bash
set -euo pipefail
FAIL=0

for f in index.html en/index.html ja/index.html updates/index.html news/index.html css/style.css assets/promo/ai_of_ones_own_promo_en_web.mp4 assets/promo/sodateru_ai_promo_ja_web.mp4 assets/promo/ai_of_ones_own_promo_en_poster.jpg assets/promo/sodateru_ai_promo_ja_poster.jpg; do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FAIL missing $f"; FAIL=1; fi
done

grep -q 'hero-video' en/index.html || { echo 'FAIL: EN hero video missing'; FAIL=1; }
grep -q 'hero-video' ja/index.html || { echo 'FAIL: JA hero video missing'; FAIL=1; }
grep -q 'preview-carousel-section' en/index.html || { echo 'FAIL: EN preview missing'; FAIL=1; }
grep -q 'preview-carousel-section' ja/index.html || { echo 'FAIL: JA preview missing'; FAIL=1; }
grep -q 'June 4, 2026' updates/index.html || { echo 'FAIL: Kindle date not June 4'; FAIL=1; }
grep -q 'June 5, 2026' updates/index.html || { echo 'FAIL: English paperback date not June 5'; FAIL=1; }
grep -q 'June 6, 2026' updates/index.html || { echo 'FAIL: Japanese paperback date not June 6'; FAIL=1; }
grep -q 'June 7, 2026' updates/index.html || { echo 'FAIL: Udemy date not June 7'; FAIL=1; }

if [ "$FAIL" -eq 0 ]; then
  echo "RELEASE RECORD PROMO FIX V5 CHECK PASSED"
else
  echo "RELEASE RECORD PROMO FIX V5 CHECK FAILED"
  exit 1
fi
