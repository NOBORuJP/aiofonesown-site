#!/bin/sh
# ローカル確認(Mac用・ダブルクリックで起動)
cd "$(dirname "$0")"
( sleep 1 && open "http://localhost:8080/" ) &
echo "ローカルプレビュー起動: http://localhost:8080/"
echo "終了するにはこのウィンドウで Ctrl+C"
python3 -m http.server 8080
