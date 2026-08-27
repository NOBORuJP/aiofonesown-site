#!/usr/local/bin/python3
"""Validation for the Step 23 restore preflight candidate."""

from __future__ import annotations

import hashlib
import json
import unittest
from pathlib import Path


HISTORY = Path(__file__).resolve().parents[1]
CANDIDATE_PATH = HISTORY / "data" / "step23-restore-preflight-candidate.json"
MANIFEST_PATH = HISTORY / "MANIFEST.json"

EXPECTED_IDS = [
    "anythingllm-docker",
    "anythingllm-desktop",
    "gpt",
    "claude",
    "gemini",
    "fable-batch",
    "r6-ai-photography",
    "receipt",
]

REQUIRED_SYSTEM_FIELDS = {
    "id",
    "current_generation",
    "selected_past_generation",
    "source_ref",
    "current_ref",
    "proposed_future_generation",
    "repository",
    "repository_readback",
    "newer_information_impact",
    "isolation_destination_candidate",
    "production_target",
    "excluded_targets",
    "evidence",
    "blockers",
    "candidate_status",
}

ISOLATION_ROOT = Path(
    "/Users/noboruikuta/AI-Workspace/_RUNS/history-steps-19-25/"
    "step23/isolated"
)


class Step23RestorePreflightCandidateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.candidate = json.loads(CANDIDATE_PATH.read_text(encoding="utf-8"))
        cls.systems = cls.candidate["systems"]
        cls.by_id = {system["id"]: system for system in cls.systems}
        cls.manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))

    def test_record_identity_and_exact_system_order(self) -> None:
        self.assertEqual(self.candidate["schema_version"], "1.0.0")
        self.assertEqual(
            self.candidate["record_type"],
            "step23_restore_preflight_candidate",
        )
        self.assertEqual(self.candidate["step"], 23)
        self.assertEqual(
            self.candidate["candidate_status"],
            "AWAITING_NOBORU_APPROVAL",
        )
        self.assertEqual(
            self.candidate["mode"],
            "PRE_RESTORE_INSPECTION_AND_ISOLATED_CANDIDATE_ONLY",
        )
        self.assertEqual(len(self.systems), 8)
        self.assertEqual([system["id"] for system in self.systems], EXPECTED_IDS)
        self.assertEqual(len(self.by_id), 8)
        for system in self.systems:
            self.assertEqual(set(system), REQUIRED_SYSTEM_FIELDS, system["id"])

    def test_no_restore_or_external_write_flags(self) -> None:
        expected = {
            "production_restore_allowed": False,
            "production_restore_performed": False,
            "isolated_restore_executed": False,
            "git_writes": 0,
            "publication_writes": 0,
            "rag_changed": False,
            "new_repository_created": False,
            "production_runtime_changed": False,
            "production_database_changed": False,
            "github_changed": False,
            "cloudflare_changed": False,
            "direction_lock_changed": False,
            "step24_started": False,
        }
        for field, value in expected.items():
            self.assertEqual(self.candidate[field], value, field)

    def test_new_future_principle_preserves_current_and_past(self) -> None:
        principle = self.candidate["principle"]
        self.assertIn("過去へ巻き戻さず", principle["ja"])
        self.assertIn("現在履歴の先", principle["ja"])
        self.assertTrue(principle["preserve_current"])
        self.assertTrue(principle["preserve_past"])
        self.assertTrue(principle["new_future_generation"])
        self.assertFalse(principle["rewind_history"])

    def test_direction_lock_contract(self) -> None:
        lock = self.candidate["direction_lock"]
        self.assertEqual(lock["current_state"], "IDLE")
        self.assertTrue(lock["required_for_execution"])
        self.assertEqual(lock["execution_direction"], "GIT_TO_AI")
        self.assertFalse(lock["opposite_direction_simultaneous"])
        self.assertEqual(lock["failure_state"], "FAILED_LOCKED")

    def test_every_global_precondition_is_required(self) -> None:
        preconditions = self.candidate["global_preconditions"]
        expected_ids = {
            "PRESERVE_CURRENT_STATE_SNAPSHOT",
            "PIN_RESTORE_SOURCE_GENERATION",
            "DISPLAY_NEWER_INFORMATION_IMPACT",
            "NOBORU_EXPLICIT_APPROVAL",
            "ISOLATED_ACCEPTANCE_PASS",
            "EXCLUDE_SECRET_DB_WAL_SHM",
        }
        self.assertEqual({item["id"] for item in preconditions}, expected_ids)
        self.assertTrue(all(item["required"] is True for item in preconditions))
        self.assertFalse(
            next(
                item
                for item in preconditions
                if item["id"] == "NOBORU_EXPLICIT_APPROVAL"
            )["satisfied"]
        )
        self.assertFalse(
            next(
                item
                for item in preconditions
                if item["id"] == "ISOLATED_ACCEPTANCE_PASS"
            )["satisfied"]
        )

    def test_ready_systems_have_past_generation_and_pass_evidence(self) -> None:
        ready = [
            system
            for system in self.systems
            if system["candidate_status"] == "READY_FOR_ISOLATED_CANDIDATE"
        ]
        self.assertEqual(
            [system["id"] for system in ready],
            ["anythingllm-docker", "fable-batch"],
        )
        for system in ready:
            self.assertIsNotNone(system["selected_past_generation"])
            self.assertIsNotNone(system["isolation_destination_candidate"])
            results = {item["result"] for item in system["evidence"]}
            self.assertIn("PASS_ISOLATED_BACKUP_RESTORE_TEST", results)
            readback = system["repository_readback"]
            self.assertTrue(readback["performed"])
            self.assertTrue(readback["read_only"])
            self.assertEqual(readback["git_optional_locks"], 0)
            self.assertTrue(readback["clean"])
            self.assertTrue(readback["catalog_current_matches_head"])
            self.assertTrue(readback["catalog_current_matches_main"])

    def test_system_without_verified_past_is_never_ready(self) -> None:
        for system in self.systems:
            if system["selected_past_generation"] is None:
                self.assertNotEqual(
                    system["candidate_status"],
                    "READY_FOR_ISOLATED_CANDIDATE",
                    system["id"],
                )

    def test_gpt_checkout_mismatch_blocks_ready_state(self) -> None:
        gpt = self.by_id["gpt"]
        self.assertEqual(
            gpt["candidate_status"],
            "BLOCKED_CURRENT_STATE_MISMATCH",
        )
        self.assertTrue(gpt["repository_readback"]["clean"])
        self.assertFalse(
            gpt["repository_readback"]["catalog_current_matches_head"]
        )
        self.assertTrue(
            gpt["repository_readback"]["catalog_current_matches_main"]
        )
        self.assertNotEqual(
            gpt["repository_readback"]["head"],
            gpt["current_ref"],
        )

    def test_newer_information_impact_count_matches_name_status(self) -> None:
        for system in self.systems:
            impact = system["newer_information_impact"]
            self.assertEqual(
                impact["count"],
                len(impact["name_status"]),
                system["id"],
            )
            self.assertTrue(impact["reason"], system["id"])
            for entry in impact["name_status"]:
                self.assertEqual(set(entry), {"status", "path"})
                self.assertIn(entry["status"], {"A", "M", "D", "R", "C", "T"})

        self.assertEqual(
            self.by_id["anythingllm-docker"]["newer_information_impact"][
                "count"
            ],
            3,
        )
        self.assertEqual(
            self.by_id["gpt"]["newer_information_impact"]["count"],
            21,
        )
        self.assertEqual(
            self.by_id["fable-batch"]["newer_information_impact"]["count"],
            24,
        )

    def test_database_wal_shm_secrets_and_receipt_data_are_excluded(self) -> None:
        for system_id in ("anythingllm-docker", "anythingllm-desktop"):
            excluded = set(self.by_id[system_id]["excluded_targets"])
            self.assertTrue(
                {
                    "PRODUCTION_DATABASE",
                    "DATABASE_WAL",
                    "DATABASE_SHM",
                    "SECRET_VALUES",
                }.issubset(excluded)
            )

        gpt_excluded = set(self.by_id["gpt"]["excluded_targets"])
        self.assertTrue(
            {
                "LIVE_MEMORY_DATABASE",
                "LIVE_MEMORY_DATABASE_WAL",
                "LIVE_MEMORY_DATABASE_SHM",
                "SECRET_VALUES",
            }.issubset(gpt_excluded)
        )

        receipt_excluded = set(self.by_id["receipt"]["excluded_targets"])
        self.assertTrue(
            {
                "RAW_RECEIPT_IMAGES",
                "PERSONAL_INFORMATION",
                "REAL_RECEIPT_DATA",
                "SECRET_VALUES",
                }.issubset(receipt_excluded)
        )

    def test_anythingllm_desktop_external_ssd_symlink_mapping(self) -> None:
        desktop = self.by_id["anythingllm-desktop"]
        symlink_path = (
            "/Users/noboruikuta/Library/Application Support/"
            "anythingllm-desktop"
        )
        symlink_target = (
            "/Volumes/AnythingLLMDesktop/AnythingLLM/Desktop/"
            "anythingllm-desktop-test-1.12.1-20260711-223218"
        )
        self.assertEqual(desktop["production_target"], symlink_path)
        mapping = next(
            item
            for item in desktop["evidence"]
            if item.get("observed_symlink_path") == symlink_path
        )
        self.assertEqual(mapping["observed_symlink_target"], symlink_target)

    def test_destination_candidates_are_only_under_step23_isolation(self) -> None:
        destinations = []
        production_targets = {
            Path(system["production_target"]).resolve()
            for system in self.systems
            if system["production_target"]
        }
        for system in self.systems:
            candidate = system["isolation_destination_candidate"]
            if candidate is None:
                continue
            destination = Path(candidate).resolve()
            destinations.append(destination)
            self.assertNotEqual(destination, ISOLATION_ROOT)
            self.assertTrue(destination.is_relative_to(ISOLATION_ROOT))
            self.assertNotIn(destination, production_targets)
            self.assertNotEqual(
                candidate,
                system["production_target"],
                system["id"],
            )
        self.assertEqual(len(destinations), 2)
        self.assertEqual(len(destinations), len(set(destinations)))
        self.assertEqual(
            self.by_id["anythingllm-docker"][
                "isolation_destination_candidate"
            ],
            str(ISOLATION_ROOT / "anythingllm-docker-g002"),
        )
        self.assertEqual(
            self.by_id["fable-batch"]["isolation_destination_candidate"],
            str(ISOLATION_ROOT / "fable-g002"),
        )

    def test_summary_counts_and_step24_not_started(self) -> None:
        statuses = [system["candidate_status"] for system in self.systems]
        summary = self.candidate["summary"]
        self.assertEqual(
            summary["ready_count"],
            sum(status == "READY_FOR_ISOLATED_CANDIDATE" for status in statuses),
        )
        self.assertEqual(
            summary["blocked_count"],
            sum(status.startswith("BLOCKED_") for status in statuses),
        )
        self.assertEqual(
            summary["parked_count"],
            sum(status.startswith("PARKED_") for status in statuses),
        )
        self.assertEqual(
            (
                summary["ready_count"],
                summary["blocked_count"],
                summary["parked_count"],
            ),
            (2, 5, 1),
        )
        self.assertTrue(summary["approval_required"])
        self.assertFalse(summary["step24_started"])
        self.assertIn("工程24", summary["next_step"])
        self.assertIn("まだ開始しない", summary["next_step"])

    def test_manifest_has_every_history_file_with_exact_hash_and_size(self) -> None:
        entries = self.manifest["files"]
        by_path = {entry["path"]: entry for entry in entries}
        self.assertEqual(len(entries), len(by_path))

        actual_paths = {
            path.relative_to(HISTORY).as_posix()
            for path in HISTORY.rglob("*")
            if path.is_file()
            and path != MANIFEST_PATH
            and "__pycache__" not in path.parts
            and path.suffix != ".pyc"
        }
        self.assertEqual(set(by_path), actual_paths)
        self.assertIn(
            "data/step23-restore-preflight-candidate.json",
            by_path,
        )
        self.assertIn(
            "tests/test_step23_restore_preflight_candidate.py",
            by_path,
        )

        for relative, entry in by_path.items():
            payload = (HISTORY / relative).read_bytes()
            self.assertEqual(entry["size_bytes"], len(payload), relative)
            self.assertEqual(
                entry["sha256"],
                hashlib.sha256(payload).hexdigest(),
                relative,
            )

        self.assertEqual(
            self.manifest["artifact_id"],
            "AI_NOBORU_HISTORY_STEP23_RESTORE_PREFLIGHT_CANDIDATE",
        )
        self.assertEqual(
            self.manifest["candidate_status"],
            "AWAITING_NOBORU_APPROVAL",
        )
        self.assertEqual(self.manifest["git_writes"], 0)
        self.assertEqual(self.manifest["publication_writes"], 0)
        self.assertFalse(self.manifest["production_restore_allowed"])
        self.assertTrue(self.manifest["step23_started"])
        self.assertFalse(self.manifest["step24_started"])


if __name__ == "__main__":
    unittest.main()
