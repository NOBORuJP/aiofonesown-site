# AI NOBORU 履歴画面 — 工程23 candidate

工程23「8管理枠の復元候補作成」の隔離候補です。工程23は**復元候補の作成のみ**で、production restoreは実施していません。トップの管理単位は次の8カードだけです。

1. AnythingLLM Docker版 — `anythingllm-docker`
2. AnythingLLM Desktop版 — `anythingllm-desktop`
3. GPT — `gpt`
4. Claude — `claude`
5. Gemini — `gemini`
6. FABLEバッチ — `fable-batch`
7. R6 AI撮影 — `r6`
8. 領収書 — `receipt`

9番目の管理枠はありません。repositoryをトップレベルの管理枠へ昇格させていません。

## 工程23で作成した復元候補

復元候補は **exactly 8件**（8管理枠に1対1対応）です。

| # | systemId | candidateClass | evidenceLevel |
|---|---|---|---|
| 1 | `anythingllm-docker` | `READY_FOR_ISOLATED_RESTORE_PLAN` | `VERIFIED_CURRENT_RUNTIME` |
| 2 | `anythingllm-desktop` | `READY_FOR_ISOLATED_RESTORE_PLAN` | `VERIFIED_CURRENT_RUNTIME` |
| 3 | `gpt` | `READY_FOR_ISOLATED_RESTORE_PLAN` | `VERIFIED_CURRENT_RUNTIME_AND_VERIFIED_GITHUB_COPY` |
| 4 | `claude` | `BLOCKED_PENDING_VERIFICATION` | `PARTIAL_TRANSPORT_EVIDENCE_ONLY` |
| 5 | `gemini` | `BLOCKED_PENDING_VERIFICATION` | `PARTIAL_TRANSPORT_EVIDENCE_ONLY` |
| 6 | `fable-batch` | `CONDITIONAL_RESTORE_PLAN` | `HISTORICAL_COMPONENT_REFERENCE_ONLY` |
| 7 | `r6` | `PARKED_NO_RESTORE_PLAN` | `RESERVED_FRAME_ONLY` |
| 8 | `receipt` | `CONDITIONAL_RESTORE_PLAN` | `HISTORICAL_COMPONENT_REFERENCE_ONLY` |

candidate class分布:

- `READY_FOR_ISOLATED_RESTORE_PLAN`: 3
- `CONDITIONAL_RESTORE_PLAN`: 2
- `BLOCKED_PENDING_VERIFICATION`: 2
- `PARKED_NO_RESTORE_PLAN`: 1

**`READY` はproduction restoreの承認を意味しません。** 隔離環境向けrestore planを作成できる状態、という意味だけです。production restoreにはNOBORUの個別承認が必要で、工程23では一切承認していません。

R6は予約枠のままです。証拠が揃っていないため実装対象へ昇格させていません。

## 境界（工程23の実施範囲）

- candidate status: `AWAITING_56_REVIEW`
- production restore performed: **NO**
- production restore authorized: **NO**
- Git writes: `0`
- publication writes: `0`
- RAG writes: `0`
- runtime writes: `0`
- generation IDs created: `0`
- Step 24 started: **NO**
- Cloudflare publish: 未実施

この画面に復元を実行するbutton、link、URI、shell、API actionはありません。カード詳細の「復元候補」sectionは表示専用です。

## 実施者と工程間変更

- `STEP22_IMPLEMENTER`: CODEX
- `STEP23_IMPLEMENTER`: CLAUDE_CODE
- `CROSS_STEP_CHANGE`: `TEST_OWNERSHIP_TRANSFER_FROM_STEP22_TO_STEP23`
- `STEP22_RECORDED_DIFF_SHA256`: `ca4dd214e0761d256a21e626a3f488705917164cb7b433dd69dbf4765faf00c1`
- `STEP22_EVIDENCE_MODIFIED`: **NO**

`TEST_OWNERSHIP_TRANSFER_FROM_STEP22_TO_STEP23` は、`tests/test_step22_eight_card_ui.py` にあった `dashboard-data.json` の `step23Started` / `restoreNotice` の固定値assertion 2件を、存在・型・非空のinvariant assertionへ最小変更したものです（NOBORU承認済み）。工程23後の正確な値は `tests/test_step23_restore_candidates.py` が厳密に検証します。Step 22のrun evidence、`diff.patch`、audit結果、`data/step22-eight-card-current-state.json` は変更していません。

## データの正典

- `data/dashboard-data.json` — UIのcanonical source。`assets/dashboard-data.js` は同じJSONを読み込むloaderで、意味的に完全一致します。
- `data/step23-restore-candidates.json` — 工程23の復元候補の正典（8件）。
- `data/step23-restore-candidate-status.json` — 工程23の状態記録。
- `data/step22-eight-card-current-state.json` — 工程22の機械可読記録（変更禁止・未変更）。
- `data/generation-catalog.json` — historical component catalogです。**current runtime proofではありません。** 既存世代（FABLE-G003等）を現在runtimeや全体世代の証拠として扱いません。

未確認事項は消していません。各カード詳細とcandidate記録に `unresolvedItems` として残しています。verified / partial / unverified の区別も維持しています。

## テスト

```
/usr/local/bin/python3 -B tests/test_step22_eight_card_ui.py
/usr/local/bin/python3 -B tests/test_step23_restore_candidates.py
```

`MANIFEST.json` は変更後の全対象fileについてSHA-256とsizeを保持します。
