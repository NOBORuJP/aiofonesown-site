#!/bin/bash
set -euo pipefail

FAIL=0

for f in updates/index.html news/index.html news/kindle-release-ai-of-ones-own-and-sodateru-ai.html; do
  if [ -f "$f" ]; then
    echo "OK: $f"
  else
    echo "FAIL: missing $f"
    FAIL=1
  fi
done

for url in "https://www.amazon.com/dp/B0GX2WFTTZ" "https://www.amazon.co.jp/dp/B0H3ZSMFMH" "https://noborikuta.gumroad.com/l/aiofonesown-early-access" "https://noborikuta.gumroad.com/l/sodateru-ai-early-access"; do
  if grep -R "$url" updates news social_posts >/dev/null; then
    echo "OK: found $url"
  else
    echo "FAIL: missing $url"
    FAIL=1
  fi
done

if grep -q "AI of One’s Own and 育てるAI are now available on Kindle" updates/index.html; then
  echo "OK: Kindle update headline found"
else
  echo "FAIL: Kindle update headline missing"
  FAIL=1
fi

if grep -q '<html lang="en">' updates/index.html; then
  echo "OK: updates page remains English default"
else
  echo "FAIL: updates page is not English default"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "KINDLE RELEASE UPDATE CHECK PASSED"
else
  echo "KINDLE RELEASE UPDATE CHECK FAILED"
  exit 1
fi
