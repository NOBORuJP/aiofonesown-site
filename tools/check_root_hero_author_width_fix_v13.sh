#!/bin/bash
set -euo pipefail
FAIL=0

grep -q 'hero-actions-bar' index.html && grep -q 'hero-actions-bar' css/style.css || FAIL=1
grep -q 'AI of One’s Own / 育てるAI Official Site' index.html || FAIL=1
grep -q 'max-width: 1200px' css/style.css || FAIL=1
grep -q '168px' css/style.css || FAIL=1
grep -q '132px' css/style.css || FAIL=1

if [ "$FAIL" -eq 0 ]; then
  echo "ROOT HERO AUTHOR WIDTH FIX V13 CHECK PASSED"
else
  echo "ROOT HERO AUTHOR WIDTH FIX V13 CHECK FAILED"
  exit 1
fi
