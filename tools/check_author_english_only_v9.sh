#!/bin/bash
set -euo pipefail

echo "=== Author section ==="
grep -nE 'id="author"|Author|NOBORu IKUTA|telecommunications|personal AI|Official SNS|生田|元ネットワーク|専業主夫|本書は' index.html || true

echo ""
FAIL=0

if ! grep -q 'NOBORu IKUTA is a Japanese technology builder' index.html; then
  echo "FAIL: English author profile not found"
  FAIL=1
fi

if grep -q '元ネットワーク\|専業主夫\|本書は' index.html; then
  echo "FAIL: Japanese author profile text remains"
  FAIL=1
fi

if ! grep -q 'width="72" height="72"' index.html; then
  echo "FAIL: compact author image dimensions missing"
  FAIL=1
fi

if ! grep -q 'https://x.com/aiofonesown' index.html; then
  echo "FAIL: X link missing"
  FAIL=1
fi

if ! grep -q 'https://www.instagram.com/aiofonesown' index.html; then
  echo "FAIL: Instagram link missing"
  FAIL=1
fi

if ! grep -q 'https://www.threads.net/@aiofonesown' index.html; then
  echo "FAIL: Threads link missing"
  FAIL=1
fi

if grep -q '#author .author-card img' css/style.css && grep -q '72px' css/style.css; then
  echo "CSS compact author photo rule found"
else
  echo "FAIL: compact CSS rule missing"
  FAIL=1
fi

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo "AUTHOR ENGLISH-ONLY PATCH OK"
else
  echo ""
  echo "AUTHOR ENGLISH-ONLY PATCH FAILED"
  exit 1
fi
