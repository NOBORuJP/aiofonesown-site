#!/bin/bash
set -euo pipefail

echo "=== image files ==="
for f in   assets/en-hero-wide.png   assets/ja-hero-wide.png   assets/en-cover-square.png   assets/ja-cover-square.png   en-hero-wide.png   ja-hero-wide.png   en-cover-square.png   ja-cover-square.png
do
  if [ -f "$f" ]; then
    echo "OK: $f"
  else
    echo "MISSING: $f"
    exit 1
  fi
done

echo ""
echo "IMAGE REPLACEMENT PATCH OK"
