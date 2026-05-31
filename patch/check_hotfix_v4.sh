#!/bin/bash
set -euo pipefail

echo "=== Expected chronology ==="
echo "2026-05-29 JST: English edition released"
echo "2026-05-31 JST: Japanese edition released"

echo ""
echo "=== Expected URLs ==="
echo "English: https://noborikuta.gumroad.com/l/aiofonesown-early-access"
echo "Japanese: https://noborikuta.gumroad.com/l/sodateru-ai-early-access"

echo ""
echo "=== Release dates in updates ==="
grep -RniE "2026年5月29日|2026年5月31日|May 29, 2026|May 31, 2026" ./updates ./en/updates 2>/dev/null || true

echo ""
echo "=== Gumroad links in /en and updates ==="
grep -Rni "gumroad.com/l/" ./en ./updates 2>/dev/null || true

echo ""
echo "=== Author link/page candidates ==="
find . -maxdepth 5 \( -iname "*author*" -o -iname "*authors*" -o -iname "*about-author*" \) -not -path "*/.git/*" -not -path "*/node_modules/*" -print || true
grep -RniE 'href=.*(author|authors|about-author)|\[(Author|Authors|About the Author|著者|著者紹介)\]\(' . \
  --include="*.html" --include="*.md" --include="*.mdx" \
  --exclude-dir=.git --exclude-dir=node_modules || true
