#!/bin/bash
set -euo pipefail
FAIL=0

for f in   index.html   en/index.html   ja/index.html   css/style.css   assets/promo/ai_of_ones_own_promo_en_web.mp4   assets/promo/sodateru_ai_promo_ja_web.mp4   assets/promo/ai_of_ones_own_promo_thumbnail.jpg   assets/promo/sodateru_ai_promo_thumbnail.jpg
do
  if [ -f "$f" ]; then echo "OK: $f"; else echo "FAIL missing $f"; FAIL=1; fi
done

grep -q 'autoplay muted loop playsinline' index.html || { echo 'FAIL: root autoplay attributes missing'; FAIL=1; }
grep -q 'autoplay muted loop playsinline' en/index.html || { echo 'FAIL: en autoplay attributes missing'; FAIL=1; }
grep -q 'autoplay muted loop playsinline' ja/index.html || { echo 'FAIL: ja autoplay attributes missing'; FAIL=1; }
grep -q 'ai_of_ones_own_promo_thumbnail.jpg' index.html || { echo 'FAIL: EN poster missing in root'; FAIL=1; }
grep -q 'sodateru_ai_promo_thumbnail.jpg' index.html || { echo 'FAIL: JA poster missing in root'; FAIL=1; }

if [ "$FAIL" -eq 0 ]; then
  echo "PROMO AUTOPLAY THUMBNAIL V6 CHECK PASSED"
else
  echo "PROMO AUTOPLAY THUMBNAIL V6 CHECK FAILED"
  exit 1
fi
