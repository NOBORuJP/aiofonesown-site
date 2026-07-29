# AI NOBORU 履歴画面 — 工程22 candidate

工程22「履歴画面の8枠表示完成」の隔離候補です。管理単位は次の8カードだけです。

1. AnythingLLM Docker版
2. AnythingLLM Desktop版
3. GPT
4. Claude
5. Gemini
6. FABLEバッチ
7. R6 AI撮影
8. 領収書

各カードの詳細で、現在状態、世代状態、GitHub写し状態、件数、関連commit/reference、保存対象、保存対象外、未確認事項、復元準備状態を表示します。repository名はカード詳細の関連情報にだけ表示します。

- candidate status: `AWAITING_NOBORU_APPROVAL`
- Git writes: `0`
- publication: `0`
- Cloudflare publish: 未実施
- 工程23: 未着手
- production restore action: なし
- 復元候補は工程23で作成

`data/dashboard-data.json` と `assets/dashboard-data.js` のカードデータは同一です。`data/generation-catalog.json` の既存世代はhistorical component catalogであり、工程22の現在runtimeや全体世代を証明するものとして扱いません。
