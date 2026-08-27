window.AINOBORU_DATA =
{
  "version": "1.0.0-step22",
  "generatedAt": "2026-07-29",
  "taskId": "HISTORY_STEP22_EIGHT_CARD_UI_CURRENT_STATE",
  "candidateStatus": "AWAITING_NOBORU_APPROVAL",
  "publicationPerformed": false,
  "step23Started": false,
  "restoreNotice": "復元候補は工程23で作成",
  "systems": [
    {
      "id": "anythingllm-docker",
      "name": "AnythingLLM Docker版",
      "short": "Docker版",
      "tone": "success",
      "status": "RECOVERED",
      "currentState": "PASS_ANYTHINGLLM_DOCKER_RECOVERED。image mintplexlabs/anythingllm:1.15.0、host 3002 / container 3001、API online=true、restart policy alwaysを確認済み。",
      "currentStateConfidence": "VERIFIED",
      "summary": "Docker版の稼働状態と構成の現在値を確認済み。工程21の新しい世代IDは設定していない。",
      "currentGeneration": null,
      "generationStatus": "NOT_ESTABLISHED_BY_STEP21",
      "githubCopyStatus": "NOT_VERIFIED_BY_STEP21",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "安全な集計値が工程21で確立されていない"
        },
        "prompt": {
          "value": null,
          "reason": "工程21で未集計"
        },
        "rag": {
          "value": null,
          "reason": "工程21で未集計"
        },
        "settings": {
          "value": null,
          "reason": "工程21で未集計"
        }
      },
      "relatedComponents": [
        {
          "repository": "ainoboru-infra",
          "commit": "4bce4e07211d1b5d390421710bae6a97b0280fc2",
          "status": "HISTORICAL_COMPONENT_CATALOG_REFERENCE"
        }
      ],
      "saveTargetsSummary": [
        "コンテナ構成",
        "イメージ参照",
        "公開ポート設定",
        "再起動方針",
        "人が読める検証記録"
      ],
      "excludedTargetsSummary": [
        "raw storage DB",
        "cache",
        "env secret values"
      ],
      "unresolvedItems": [
        "工程21の全体世代ID",
        "工程21時点のGitHub写し状態",
        "安全な集計値"
      ],
      "restoreReadiness": {
        "status": "CURRENT_STATE_VERIFIED_CANDIDATE_NOT_CREATED",
        "summary": "現在状態は確認済み。復元候補は工程23で作成。"
      }
    },
    {
      "id": "anythingllm-desktop",
      "name": "AnythingLLM Desktop版",
      "short": "Desktop版",
      "tone": "success",
      "status": "RECOVERED",
      "currentState": "PASS_ANYTHINGLLM_DESKTOP_RECOVERED。外付けSSDのmount read-back、user data symlink target、quick_check=ok、backend 3001 / collector 8888 listeningを確認済み。",
      "currentStateConfidence": "VERIFIED",
      "summary": "Desktop版はDocker版と分離。workspaces=8、workspace_documents=83、workspace_chats=228、workspace_threads=45を確認済み。",
      "currentGeneration": null,
      "generationStatus": "NOT_ESTABLISHED_BY_STEP21",
      "githubCopyStatus": "NO_VERIFIED_REPOSITORY_BINDING",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "workspace chat件数をMemory件数として扱わない"
        },
        "prompt": {
          "value": null,
          "reason": "工程21で未集計"
        },
        "rag": {
          "value": null,
          "reason": "workspace document件数をRAG件数として扱わない"
        },
        "settings": {
          "value": null,
          "reason": "工程21で未集計"
        }
      },
      "operationalCounts": {
        "workspaces": 8,
        "workspaceDocuments": 83,
        "workspaceChats": 228,
        "workspaceThreads": 45
      },
      "relatedComponents": [],
      "saveTargetsSummary": [
        "外付けSSDの接続先情報",
        "user data symlink構成",
        "service listener構成",
        "件数の検証記録"
      ],
      "excludedTargetsSummary": [
        "raw DB",
        "WAL",
        "SHM",
        "cache"
      ],
      "unresolvedItems": [
        "工程21の全体世代ID",
        "repository binding",
        "GitHub写し状態"
      ],
      "restoreReadiness": {
        "status": "CURRENT_STATE_VERIFIED_CANDIDATE_NOT_CREATED",
        "summary": "現在状態と接続先は確認済み。復元候補は工程23で作成。"
      }
    },
    {
      "id": "gpt",
      "name": "GPT",
      "short": "GPT",
      "tone": "success",
      "status": "CURRENT_VERIFIED",
      "currentState": "GPT-5.6からMCP Bridge 8787経由のdirect Memory retrievalを確認済み。Memory/TEMP exportは633 records、max memory ID 640。direction lock IDLEも現在状態として確認済み。",
      "currentStateConfidence": "VERIFIED",
      "summary": "Memory BridgeのlocalとGitHub mainは同じcommit。PR #5 merged、component GitHub copyはCURRENT_VERIFIED。",
      "currentGeneration": null,
      "generationStatus": "OVERALL_GENERATION_NOT_ESTABLISHED_COMPONENT_HISTORY_SEPARATE",
      "githubCopyStatus": "CURRENT_VERIFIED",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": 633,
          "maxId": 640,
          "reason": null
        },
        "prompt": {
          "value": null,
          "reason": "工程21で未集計"
        },
        "rag": {
          "value": null,
          "reason": "工程21で未集計"
        },
        "settings": {
          "value": null,
          "reason": "工程21で未集計"
        }
      },
      "relatedComponents": [
        {
          "repository": null,
          "commit": "e868c3bfcc80ea96cc5af33432874b02a95c2b8d",
          "status": "LOCAL_EQUALS_GITHUB_MAIN_CURRENT_VERIFIED"
        },
        {
          "repository": "ainoboru-knowledge",
          "commit": "54b3c731a056abda1191323c0ca276d7296d08bf",
          "status": "HISTORICAL_COMPONENT_CATALOG_REFERENCE"
        }
      ],
      "saveTargetsSummary": [
        "Memory Bridgeの実装と構成",
        "人が読めるMemory/TEMP export",
        "direction lock IDLEの検証記録",
        "GitHub整合性記録"
      ],
      "excludedTargetsSummary": [
        "raw memory.db",
        "WAL",
        "SHM"
      ],
      "unresolvedItems": [
        "GPT全体の現在世代ID",
        "prompt・RAG・settingsの安全な集計値"
      ],
      "restoreReadiness": {
        "status": "COPY_CURRENT_CANDIDATE_NOT_CREATED",
        "summary": "GitHub写しは現在状態と一致。復元候補は工程23で作成。"
      }
    },
    {
      "id": "claude",
      "name": "Claude",
      "short": "Claude",
      "tone": "warning",
      "status": "PARTIAL_EVIDENCE",
      "currentState": "Claude subscription UI transportとbridge/artifact routesの実行証拠あり。direct independent Memory 638 retrievalは未確認。",
      "currentStateConfidence": "PARTIAL",
      "summary": "transportとartifact経路の証拠はあるが、独立Memory取得と全体世代は確立していない。",
      "currentGeneration": null,
      "generationStatus": "OVERALL_GENERATION_NOT_ESTABLISHED",
      "githubCopyStatus": "NOT_ESTABLISHED",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "direct independent Memory 638 retrievalが未確認"
        },
        "prompt": {
          "value": null,
          "reason": "未集計"
        },
        "rag": {
          "value": null,
          "reason": "未集計"
        },
        "settings": {
          "value": null,
          "reason": "未集計"
        }
      },
      "relatedComponents": [],
      "saveTargetsSummary": [
        "transport route構成",
        "bridge/artifact route構成",
        "人が読める実行証拠"
      ],
      "excludedTargetsSummary": [
        "cookies",
        "tokens",
        "session values"
      ],
      "unresolvedItems": [
        "direct independent Memory 638 retrieval",
        "現在の全体世代",
        "GitHub写し状態"
      ],
      "restoreReadiness": {
        "status": "EVIDENCE_PARTIAL_CANDIDATE_NOT_CREATED",
        "summary": "独立取得の確認が必要。復元候補は工程23で作成。"
      }
    },
    {
      "id": "gemini",
      "name": "Gemini",
      "short": "Gemini",
      "tone": "warning",
      "status": "PARTIAL_EVIDENCE",
      "currentState": "manual/mailbox routeの実行証拠あり。direct independent Memory 638 retrievalは未確認。",
      "currentStateConfidence": "PARTIAL",
      "summary": "連絡経路の証拠はあるが、独立Memory取得と全体世代は確立していない。",
      "currentGeneration": null,
      "generationStatus": "OVERALL_GENERATION_NOT_ESTABLISHED",
      "githubCopyStatus": "NOT_ESTABLISHED",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "direct independent Memory 638 retrievalが未確認"
        },
        "prompt": {
          "value": null,
          "reason": "未集計"
        },
        "rag": {
          "value": null,
          "reason": "未集計"
        },
        "settings": {
          "value": null,
          "reason": "未集計"
        }
      },
      "relatedComponents": [],
      "saveTargetsSummary": [
        "manual/mailbox route構成",
        "人が読める実行証拠"
      ],
      "excludedTargetsSummary": [
        "provider secrets"
      ],
      "unresolvedItems": [
        "direct independent Memory 638 retrieval",
        "現在の全体世代",
        "GitHub写し状態"
      ],
      "restoreReadiness": {
        "status": "EVIDENCE_PARTIAL_CANDIDATE_NOT_CREATED",
        "summary": "独立取得の確認が必要。復元候補は工程23で作成。"
      }
    },
    {
      "id": "fable-batch",
      "name": "FABLEバッチ",
      "short": "FABLE",
      "tone": "warning",
      "status": "RUNTIME_UNVERIFIED",
      "currentState": "管理枠とcomponent historyは存在。現在runtime/process stateは工程20・21で独立確認されていない。",
      "currentStateConfidence": "UNVERIFIED_RUNTIME",
      "summary": "FABLE-G003はhistorical component catalogの最新参照。FABLE-G002を現在runtimeとして表示しない。",
      "currentGeneration": null,
      "generationStatus": "CURRENT_RUNTIME_GENERATION_NOT_ESTABLISHED_CATALOG_LATEST_FABLE_G003",
      "githubCopyStatus": "CURRENT_RUNTIME_COPY_NOT_VERIFIED",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "対象外または未集計"
        },
        "prompt": {
          "value": null,
          "reason": "未集計"
        },
        "rag": {
          "value": null,
          "reason": "未集計"
        },
        "settings": {
          "value": null,
          "reason": "未集計"
        }
      },
      "relatedComponents": [
        {
          "repository": "ainoboru-fable-pipeline",
          "commit": "08f2dd065312db3cde81561133a730df422017ae",
          "status": "HISTORICAL_COMPONENT_CATALOG_LATEST_FABLE_G003_NOT_RUNTIME_PROOF"
        }
      ],
      "saveTargetsSummary": [
        "pipeline実装",
        "schemaと構成",
        "historical component catalog",
        "人が読める検証記録"
      ],
      "excludedTargetsSummary": [
        "未整理のruntime生成物",
        "認証情報"
      ],
      "unresolvedItems": [
        "現在runtime/process state",
        "現在runtimeの世代",
        "現在runtimeのGitHub写し状態"
      ],
      "restoreReadiness": {
        "status": "HISTORY_REFERENCE_ONLY_CANDIDATE_NOT_CREATED",
        "summary": "component historyは参照可能。runtime確認後、復元候補は工程23で作成。"
      }
    },
    {
      "id": "r6",
      "name": "R6 AI撮影",
      "short": "R6",
      "tone": "neutral",
      "status": "RESERVED_PARKED",
      "currentState": "RESERVED / PARKED。管理枠は維持されている。",
      "currentStateConfidence": "RESERVED_VERIFIED",
      "summary": "exact repository binding、runtime、restore destination、generationは未確認。",
      "currentGeneration": null,
      "generationStatus": "NOT_ESTABLISHED",
      "githubCopyStatus": "NO_VERIFIED_REPOSITORY_BINDING",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "未確立"
        },
        "prompt": {
          "value": null,
          "reason": "未確立"
        },
        "rag": {
          "value": null,
          "reason": "未確立"
        },
        "settings": {
          "value": null,
          "reason": "未確立"
        }
      },
      "relatedComponents": [],
      "saveTargetsSummary": [
        "予約枠の定義",
        "将来確認する項目一覧"
      ],
      "excludedTargetsSummary": [
        "raw photo assets",
        "raw video assets"
      ],
      "unresolvedItems": [
        "exact repository binding",
        "runtime",
        "restore destination",
        "generation"
      ],
      "restoreReadiness": {
        "status": "RESERVED_PARKED_CANDIDATE_NOT_CREATED",
        "summary": "枠を維持。確認事項の解消後、復元候補は工程23で作成。"
      }
    },
    {
      "id": "receipt",
      "name": "領収書",
      "short": "領収書",
      "tone": "warning",
      "status": "RUNTIME_UNVERIFIED",
      "currentState": "component historyは存在。現在runtime/processとoriginal-image policyは未確認。",
      "currentStateConfidence": "UNVERIFIED_RUNTIME",
      "summary": "領収書は独立した管理単位として個別に確認する。",
      "currentGeneration": null,
      "generationStatus": "CURRENT_RUNTIME_GENERATION_NOT_ESTABLISHED_COMPONENT_HISTORY_SEPARATE",
      "githubCopyStatus": "CURRENT_RUNTIME_COPY_NOT_VERIFIED",
      "lastVerifiedAt": null,
      "counts": {
        "memory": {
          "value": null,
          "reason": "対象外または未集計"
        },
        "prompt": {
          "value": null,
          "reason": "未集計"
        },
        "rag": {
          "value": null,
          "reason": "未集計"
        },
        "settings": {
          "value": null,
          "reason": "未集計"
        }
      },
      "relatedComponents": [
        {
          "repository": "ainoboru-receipt-ledger",
          "commit": "85ba6272a3f9e400d9d727ef8c50cb1847f3cb89",
          "status": "HISTORICAL_COMPONENT_CATALOG_REFERENCE_NOT_RUNTIME_PROOF"
        }
      ],
      "saveTargetsSummary": [
        "ledger実装と構成",
        "historical component catalog",
        "人が読める検証記録"
      ],
      "excludedTargetsSummary": [
        "original images until policy verification",
        "認証情報"
      ],
      "unresolvedItems": [
        "現在runtime/process state",
        "original-image policy",
        "現在runtimeの世代",
        "現在runtimeのGitHub写し状態"
      ],
      "restoreReadiness": {
        "status": "HISTORY_REFERENCE_ONLY_CANDIDATE_NOT_CREATED",
        "summary": "領収書として個別に確認する。復元候補は工程23で作成。"
      }
    }
  ]
}
;
