#!/usr/bin/env bash
set -euo pipefail

echo "Searching for author links/routes..."
grep -RIn --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=.next \
  -E 'href=["'\''"]/author/?["'\'']|/author/|author' . || true

echo
echo "Remove nav entries pointing to /author/ and delete/disable the /author route/page if it exists."
