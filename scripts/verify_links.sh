#!/usr/bin/env bash
set -euo pipefail

echo "Checking fixed Gumroad URLs in repository..."
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=.next \
  "https://noborikuta.gumroad.com/l/aiofonesown-early-access" . || true
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=.next \
  "https://noborikuta.gumroad.com/l/sodateru-ai-early-access" . || true

echo
echo "Potential old / wrong links:"
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=.next \
  -E '/l/esohp|/l/ai-of-ones-own-early-access|/l/aiofonesown-early-access.*sodateru|/l/sodateru-ai-early-access.*english' . || true
