#!/bin/sh
# ローカル確認用: このファイルのある場所でサーバーを起動します
cd "$(dirname "$0")"
echo "ローカルプレビュー: http://localhost:8080/  (停止は Ctrl+C)"
python3 -m http.server 8080
