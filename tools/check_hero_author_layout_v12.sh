#!/bin/bash
set -euo pipefail
FAIL=0
grep -q 'hero-actions-wide' index.html && grep -q 'hero-actions-wide' css/style.css || FAIL=1
grep -q '168px' css/style.css || FAIL=1
grep -q 'max-width: 720px' css/style.css || FAIL=1
grep -q '132px' css/style.css || FAIL=1
if [ "$FAIL" -eq 0 ]; then
  echo "HERO AUTHOR LAYOUT V12 CHECK PASSED"
else
  echo "HERO AUTHOR LAYOUT V12 CHECK FAILED"
  exit 1
fi
