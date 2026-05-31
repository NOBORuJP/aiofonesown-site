#!/bin/bash
set -euo pipefail

echo "=== Gumroad links ==="
grep -Rni "gumroad.com/l/" . --exclude-dir=.git --exclude-dir="_backup_before_site_patch_*" || true

echo ""
echo "=== Author links/pages candidates ==="
find . -maxdepth 4 \( -iname "*author*" -o -iname "*authors*" -o -iname "*about-author*" \) -not -path "*/.git/*" -print || true

echo ""
echo "=== Author nav link candidates ==="
grep -RniE 'href=.*(author|authors|about-author)|\[(Author|Authors|About the Author|著者|著者紹介)\]\(' . \
  --include="*.html" --include="*.md" --include="*.mdx" \
  --exclude-dir=.git --exclude-dir="_backup_before_site_patch_*" || true
