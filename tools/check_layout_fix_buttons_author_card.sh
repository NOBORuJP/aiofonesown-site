#!/bin/bash
set -euo pipefail

FAIL=0

if grep -q "v11 root layout refinement" css/style.css; then
  echo "OK: v11 layout CSS found"
else
  echo "FAIL: v11 layout CSS missing"
  FAIL=1
fi

if grep -q "176px" css/style.css && grep -q "160px" css/style.css; then
  echo "OK: compact fixed button widths found"
else
  echo "FAIL: button width rules missing"
  FAIL=1
fi

if grep -q "max-width: none" css/style.css && grep -q "width: 100%" css/style.css; then
  echo "OK: author card full-width rule found"
else
  echo "FAIL: author card full-width rule missing"
  FAIL=1
fi

if grep -q "152px" css/style.css && grep -q "border-radius: 18px" css/style.css; then
  echo "OK: updated square author photo rule found"
else
  echo "FAIL: author photo rule missing"
  FAIL=1
fi

if grep -q "English Kindle" index.html && grep -q "Japanese Kindle" index.html && grep -q "Gumroad" index.html; then
  echo "OK: root page still has Kindle/Gumroad actions"
else
  echo "FAIL: root page action labels missing"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo "LAYOUT FIX CHECK PASSED"
else
  echo "LAYOUT FIX CHECK FAILED"
  exit 1
fi
