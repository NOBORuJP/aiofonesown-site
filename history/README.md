# AI NOBORU 履歴管理 — 8枠参照 candidate

既存 `aiofonesown-site/history` のローカル候補です。トップは次の8実体枠だけで、repositoryをトップカードにはしていません。

1. AnythingLLM Docker版
2. AnythingLLM Desktop版
3. GPT
4. Claude
5. Gemini
6. FABLEバッチ
7. R6 AI撮影
8. 領収書

## ローカル確認

リポジトリ直下で次を実行します。

```sh
sh ./preview.command
```

正しい閲覧先は **http://localhost:8080/history/** です。

`preview.command`（`./preview.command`）は実行権限を付けずに管理されているため、上記のように `sh` で起動してください。旧固定WORKBENCH previewは自動更新されません。今回の候補確認には上記のコマンドと `/history/` を使用してください。

## データ構造

- 正本mapping source: `data/frame-repository-generation-map.json`
- 既存世代履歴: `data/generation-catalog.json`（変更せず参照）
- browser loader: `assets/dashboard-data.js`
- 旧 `data/step22-eight-card-current-state.json` の `AWAITING_NOBORU_APPROVAL` / `step23Started=false` は来歴だけです。現在状態には使用しません。

mapping sourceは、8枠とrepositoryを別の実体として保持します。1枠は複数repositoryを参照でき、同じrepositoryも複数枠から参照できます。第9のメモリー横断参照索引と第10のプロンプト横断参照索引は追加カードではなく、8カード下の横断参照ビューです。

現在地は「8枠repositoryリンク=部分完成」「世代束ね=未完成」「Memory Git export=成立だが差分あり」「GitHub/公開=未完」です。Memory exportは633 records / max ID 640 / history start `2026-07-29T22:00:53+09:00`。現在Memoryは少なくともID 653まで存在するため、完全同期とは表示しません。live SQLite/WAL/SHMはGit対象外です。

この候補は読み取り専用です。commit、push、merge、tag、release、Cloudflare公開、RAG/Memory更新、production restore、runtime/database変更は行いません。
