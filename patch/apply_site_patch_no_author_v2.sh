#!/bin/bash
set -euo pipefail

# AI of One's Own / 育てるAI site patch
# Purpose:
# - Copy new logo/hero images.
# - Remove dedicated Author page links.
# - Keep author introduction on the top page.
# - Fix English Gumroad release URL to the official English URL.
#
# Usage:
#   1. Unzip this package.
#   2. From the site repository root, run:
#      bash path/to/aiofonesown_site_update_20260530_v2_no_author/patch/apply_site_patch_no_author_v2.sh

EN_GUMROAD_URL="https://noborikuta.gumroad.com/l/aiofonesown-early-access"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$REPO_ROOT/_backup_before_site_patch_$STAMP"

echo "Repo root: $REPO_ROOT"
echo "Package root: $PACKAGE_ROOT"
echo "Backup dir: $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"
mkdir -p "$REPO_ROOT/assets/images"

echo ""
echo "=== Copy images ==="
cp -v "$PACKAGE_ROOT/assets/images/"*.png "$REPO_ROOT/assets/images/"

echo ""
echo "=== Backup likely HTML/MD files ==="
find "$REPO_ROOT" -maxdepth 3 \( -name "*.html" -o -name "*.md" -o -name "*.mdx" \) \
  -not -path "*/.git/*" \
  -not -path "*/_backup_before_site_patch_*/*" \
  -print | while read -r f; do
    mkdir -p "$BACKUP_DIR/$(dirname "${f#$REPO_ROOT/}")"
    cp "$f" "$BACKUP_DIR/${f#$REPO_ROOT/}"
  done

echo ""
echo "=== Disable dedicated author/about pages if present ==="
for f in \
  "$REPO_ROOT/author.html" \
  "$REPO_ROOT/author/index.html" \
  "$REPO_ROOT/authors.html" \
  "$REPO_ROOT/authors/index.html" \
  "$REPO_ROOT/about-author.html" \
  "$REPO_ROOT/about-author/index.html"
do
  if [ -e "$f" ]; then
    mv "$f" "$f.disabled_$STAMP"
    echo "Disabled: $f"
  fi
done

echo ""
echo "=== Remove Author nav links only ==="
find "$REPO_ROOT" -maxdepth 4 \( -name "*.html" -o -name "*.md" -o -name "*.mdx" \) \
  -not -path "*/.git/*" \
  -not -path "*/_backup_before_site_patch_*/*" \
  -print | while read -r f; do
    perl -0pi -e 's#<li[^>]*>\s*<a[^>]+href=["'\''"][^"'\''"]*(?:author|authors|about-author)[^"'\''"]*["'\''"][^>]*>.*?</a>\s*</li>##gis' "$f"
    perl -0pi -e 's#<a[^>]+href=["'\''"][^"'\''"]*(?:author|authors|about-author)[^"'\''"]*["'\''"][^>]*>\s*(?:Author|Authors|About the Author|著者|著者紹介)\s*</a>##gis' "$f"
    perl -0pi -e 's#\[(?:Author|Authors|About the Author|著者|著者紹介)\]\([^)]*(?:author|authors|about-author)[^)]*\)##gis' "$f"
  done

echo ""
echo "=== Ensure English Gumroad URL appears in update snippets/pages ==="
mkdir -p "$REPO_ROOT/updates"
cp -v "$PACKAGE_ROOT/updates/2026-05-30-en-ai-of-ones-own-release.md" "$REPO_ROOT/updates/"
cp -v "$PACKAGE_ROOT/updates/2026-05-30-ja-ai-of-ones-own-english-release.md" "$REPO_ROOT/updates/"

echo ""
echo "=== Verification: Gumroad URLs ==="
grep -Rni "gumroad.com/l/" "$REPO_ROOT" \
  --exclude-dir=.git \
  --exclude-dir="_backup_before_site_patch_*" || true

echo ""
echo "=== Verification: remaining Author links ==="
grep -RniE 'href=.*(author|authors|about-author)|\[(Author|Authors|About the Author|著者|著者紹介)\]\(' "$REPO_ROOT" \
  --include="*.html" --include="*.md" --include="*.mdx" \
  --exclude-dir=.git \
  --exclude-dir="_backup_before_site_patch_*" || true

echo ""
echo "Patch complete."
echo "Backup saved at: $BACKUP_DIR"
echo "Official English Gumroad URL: $EN_GUMROAD_URL"
