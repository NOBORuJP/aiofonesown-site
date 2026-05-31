#!/bin/bash
set -euo pipefail

# HOTFIX v4
# Correct release chronology:
# - 2026-05-29 JST: English edition released.
# - 2026-05-31 JST: Japanese edition released.
#
# Also:
# - Fix English Gumroad links.
# - Fix Japanese Gumroad links.
# - Remove dedicated Author page links.
# - Keep top-page author introduction.

EN_URL="https://noborikuta.gumroad.com/l/aiofonesown-early-access"
JA_URL="https://noborikuta.gumroad.com/l/sodateru-ai-early-access"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$REPO_ROOT/_backup_before_hotfix_v4_$STAMP"

echo "=== HOTFIX v4 ==="
echo "Repo root: $REPO_ROOT"
echo "Package root: $PACKAGE_ROOT"
echo "Backup dir: $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"
mkdir -p "$REPO_ROOT/assets/images"
mkdir -p "$REPO_ROOT/updates"
mkdir -p "$REPO_ROOT/en/updates"

echo ""
echo "=== Copy images ==="
cp -v "$PACKAGE_ROOT/assets/images/"*.png "$REPO_ROOT/assets/images/" 2>/dev/null || true

echo ""
echo "=== Build target file list ==="
TARGET_LIST="$BACKUP_DIR/target_files.txt"
find "$REPO_ROOT" -maxdepth 8 \( -name "*.html" -o -name "*.htm" -o -name "*.md" -o -name "*.mdx" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -not -path "*/.git/*" \
  -not -path "*/node_modules/*" \
  -not -path "*/_backup_before_hotfix_v4_*/*" \
  -print > "$TARGET_LIST"

echo "Target files: $(wc -l < "$TARGET_LIST")"

echo ""
echo "=== Backup target files ==="
while IFS= read -r f; do
  rel="${f#$REPO_ROOT/}"
  mkdir -p "$BACKUP_DIR/$(dirname "$rel")"
  cp "$f" "$BACKUP_DIR/$rel"
done < "$TARGET_LIST"

echo ""
echo "=== Fix Gumroad links by path ==="
while IFS= read -r f; do
  rel="${f#$REPO_ROOT/}"
  case "$rel" in
    en/*|*/en/*)
      perl -0pi -e 's#https?://[^"'"'"'\s<>)]+\.gumroad\.com/l/[^"'"'"'\s<>)]+#$ENV{EN_URL}#g' "$f"
      ;;
    ja/*|*/ja/*)
      perl -0pi -e 's#https?://[^"'"'"'\s<>)]+\.gumroad\.com/l/[^"'"'"'\s<>)]+#$ENV{JA_URL}#g' "$f"
      ;;
  esac
done < "$TARGET_LIST"

echo ""
echo "=== Replace broken/old Gumroad URLs in known pages ==="
while IFS= read -r f; do
  rel="${f#$REPO_ROOT/}"
  case "$rel" in
    *updates*|*Updates*|*UPDATES*|*upload*|*Upload*|*UPLOAD*)
      # Updates may contain both links. Do not force all links to one URL here.
      perl -0pi -e 's#https?://noborikuta\.gumroad\.com/l/aiofonesown(?:-[^"'"'"'\s<>)]+)?#$ENV{EN_URL}#g' "$f"
      perl -0pi -e 's#https?://noborikuta\.gumroad\.com/l/sodateru-ai(?:-[^"'"'"'\s<>)]+)?#$ENV{JA_URL}#g' "$f"
      ;;
  esac
done < "$TARGET_LIST"

echo ""
echo "=== Replace/update UPDATES pages with two release cards ==="
cp -v "$PACKAGE_ROOT/updates/index-ja.html" "$REPO_ROOT/updates/index.html"
cp -v "$PACKAGE_ROOT/updates/index-en.html" "$REPO_ROOT/en/updates/index.html"
cp -v "$PACKAGE_ROOT/updates/"*.md "$REPO_ROOT/updates/" 2>/dev/null || true

echo ""
echo "=== Remove Author dedicated-page links ==="
while IFS= read -r f; do
  perl -0pi -e 's#<li[^>]*>\s*<a[^>]+href=["'\''"][^"'\''"]*(?:author|authors|about-author)[^"'\''"]*["'\''"][^>]*>.*?</a>\s*</li>##gis' "$f"
  perl -0pi -e 's#<a[^>]+href=["'\''"][^"'\''"]*(?:author|authors|about-author)[^"'\''"]*["'\''"][^>]*>\s*(?:Author|Authors|About the Author|著者|著者紹介)\s*</a>##gis' "$f"
  perl -0pi -e 's#\[(?:Author|Authors|About the Author|著者|著者紹介)\]\([^)]*(?:author|authors|about-author)[^)]*\)##gis' "$f"
done < "$TARGET_LIST"

echo ""
echo "=== Disable standalone author pages if present ==="
for f in \
  "$REPO_ROOT/author.html" "$REPO_ROOT/author/index.html" \
  "$REPO_ROOT/authors.html" "$REPO_ROOT/authors/index.html" \
  "$REPO_ROOT/about-author.html" "$REPO_ROOT/about-author/index.html" \
  "$REPO_ROOT/en/author.html" "$REPO_ROOT/en/author/index.html" \
  "$REPO_ROOT/en/about-author.html" "$REPO_ROOT/en/about-author/index.html" \
  "$REPO_ROOT/ja/author.html" "$REPO_ROOT/ja/author/index.html" \
  "$REPO_ROOT/ja/about-author.html" "$REPO_ROOT/ja/about-author/index.html"
do
  if [ -e "$f" ]; then
    mv "$f" "$f.disabled_$STAMP"
    echo "Disabled: $f"
  fi
done

echo ""
echo "=== Verification: release dates in updates ==="
grep -RniE "2026年5月29日|2026年5月31日|May 29, 2026|May 31, 2026" "$REPO_ROOT/updates" "$REPO_ROOT/en/updates" 2>/dev/null || true

echo ""
echo "=== Verification: Gumroad links ==="
grep -Rni "gumroad.com/l/" "$REPO_ROOT/en" "$REPO_ROOT/updates" 2>/dev/null || true

echo ""
echo "=== Verification: Author links remaining ==="
grep -RniE 'href=.*(author|authors|about-author)|\[(Author|Authors|About the Author|著者|著者紹介)\]\(' "$REPO_ROOT" \
  --include="*.html" --include="*.md" --include="*.mdx" \
  --exclude-dir=.git --exclude-dir=node_modules --exclude-dir="$(basename "$BACKUP_DIR")" || true

echo ""
echo "HOTFIX v4 complete."
echo "Backup saved at: $BACKUP_DIR"
echo "English URL: $EN_URL"
echo "Japanese URL: $JA_URL"
