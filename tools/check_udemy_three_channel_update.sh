#!/bin/bash
set -euo pipefail
FAIL=0
for f in index.html en/index.html ja/index.html updates/index.html news/index.html news/amazon-udemy-gumroad-three-channel-release.html css/style.css; do [ -f "$f" ] || { echo "FAIL missing $f"; FAIL=1; }; done
for url in "https://www.amazon.com/dp/B0H46GZN4K" "https://www.amazon.co.jp/dp/B0H4BJBSDR" "https://www.udemy.com/course/aiofonesown/" "https://www.udemy.com/course/aiofonesown-ja/" "https://noborikuta.gumroad.com/l/aiofonesown-early-access" "https://noborikuta.gumroad.com/l/sodateru-ai-early-access"; do grep -R "$url" index.html en/index.html ja/index.html updates news social_posts >/dev/null || { echo "FAIL missing $url"; FAIL=1; }; done
if grep -q "Book · Course · Template Pack" index.html && grep -q "Amazon, Udemy, and Gumroad" news/index.html; then echo "OK three-channel wording"; else FAIL=1; fi
if [ "$FAIL" -eq 0 ]; then echo "UDEMY THREE CHANNEL UPDATE CHECK PASSED"; else echo "UDEMY THREE CHANNEL UPDATE CHECK FAILED"; exit 1; fi
