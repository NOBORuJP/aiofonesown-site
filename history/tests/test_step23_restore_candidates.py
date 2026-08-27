#!/usr/bin/env python3
"""Strict validation for the Step 23 restore-candidate planning records.

Step 23 is planning only. This suite fails if any artifact implies that a
production restore, publication, RAG update, Git write or runtime change was
performed or authorized.

All paths are derived from this file's location. No absolute user, session or
temporary paths are embedded. External Step 22 evidence can be redirected with:

  AI_NOBORU_WORKSPACE_ROOT   AI-Workspace directory
  AI_NOBORU_STEP22_DIFF_PATCH  Step 22 recorded diff.patch
  AI_NOBORU_DIRECTION_LOCK     direction-lock.json
  AI_NOBORU_REPO_ROOT          git repository / worktree root
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import unittest
from pathlib import Path

HISTORY_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT_DEFAULT = HISTORY_ROOT.parent

DASHBOARD_PATH = HISTORY_ROOT / "data" / "dashboard-data.json"
JS_DATA_PATH = HISTORY_ROOT / "assets" / "dashboard-data.js"
CANDIDATES_PATH = HISTORY_ROOT / "data" / "step23-restore-candidates.json"
STATUS_PATH = HISTORY_ROOT / "data" / "step23-restore-candidate-status.json"
STEP22_RECORD_PATH = HISTORY_ROOT / "data" / "step22-eight-card-current-state.json"
CATALOG_PATH = HISTORY_ROOT / "data" / "generation-catalog.json"
APP_PATH = HISTORY_ROOT / "assets" / "app.js"
INDEX_PATH = HISTORY_ROOT / "index.html"
MANIFEST_PATH = HISTORY_ROOT / "MANIFEST.json"

ENV_WORKSPACE_ROOT = "AI_NOBORU_WORKSPACE_ROOT"
ENV_STEP22_DIFF = "AI_NOBORU_STEP22_DIFF_PATCH"
ENV_DIRECTION_LOCK = "AI_NOBORU_DIRECTION_LOCK"
ENV_REPO_ROOT = "AI_NOBORU_REPO_ROOT"

WORKSPACE_DIR_NAME = "AI-Workspace"
STEP22_RUN_ID = (
    "lc-20260729T144826Z-history-step22-eight-card-ui-recovery-20260729t2347jst"
)
STEP22_DIFF_RELATIVE = (
    f"_RUNS/history-steps-19-25/step22/state/{STEP22_RUN_ID}/iterations/001/diff.patch"
)
DIRECTION_LOCK_RELATIVE = "_RUNS/history-steps-19-25/direction-lock.json"

BASE_COMMIT = "35412fc24dbd9db56f259629d6ddb02096742f78"

EXPECTED_IDS = [
    "anythingllm-docker",
    "anythingllm-desktop",
    "gpt",
    "claude",
    "gemini",
    "fable-batch",
    "r6",
    "receipt",
]
EXPECTED_NAMES = [
    "AnythingLLM Docker版",
    "AnythingLLM Desktop版",
    "GPT",
    "Claude",
    "Gemini",
    "FABLEバッチ",
    "R6 AI撮影",
    "領収書",
]

CANDIDATE_CLASS_ENUM = {
    "READY_FOR_ISOLATED_RESTORE_PLAN",
    "CONDITIONAL_RESTORE_PLAN",
    "BLOCKED_PENDING_VERIFICATION",
    "PARKED_NO_RESTORE_PLAN",
}
EXPECTED_CLASS_COUNTS = {
    "READY_FOR_ISOLATED_RESTORE_PLAN": 3,
    "CONDITIONAL_RESTORE_PLAN": 2,
    "BLOCKED_PENDING_VERIFICATION": 2,
    "PARKED_NO_RESTORE_PLAN": 1,
}

REQUIRED_CANDIDATE_FIELDS = {
    "systemId",
    "systemName",
    "order",
    "candidateClass",
    "evidenceLevel",
    "sourceState",
    "sourceReferences",
    "restoreInputs",
    "excludedInputs",
    "restoreDestination",
    "destinationStatus",
    "preconditions",
    "verificationPlan",
    "stopConditions",
    "rollbackBoundary",
    "unresolvedItems",
    "productionRestoreAuthorized",
    "ragUpdateAuthorized",
    "gitWriteAuthorized",
    "candidateCreated",
    "candidateSummary",
}

FORBIDDEN_INPUT_FRAGMENTS = (
    "raw db",
    "wal",
    "shm",
    "secret",
    "credential",
    "cookie",
    "token",
    "session value",
)

STEP22_FIXED_SHA256 = {
    "step22-eight-card-current-state.json":
        "c09f356f3ddf19b4b6e893d367b7b6c7fa60bf117303f626da14be73b497ba5a",
    "generation-catalog.json":
        "aa250e52f368cefd5e2cd9f5e0842627cca66d8b0de4e71657cf554cd7809ec8",
    "step22-run-diff.patch":
        "ca4dd214e0761d256a21e626a3f488705917164cb7b433dd69dbf4765faf00c1",
}
APP_JS_SHA256 = "1864c70041675e64b52d7c1a450b3056a6a40daf4c50881d1b99dfb90880802e"

BANNED_ACTION_TOKENS = (
    "ainoboru-restore://",
    "simulate(",
    "実際に復元する",
    "fetch(",
    "XMLHttpRequest",
    "window.open",
    "location.href",
    "exec(",
)
BANNED_COMPLETION_CLAIMS = (
    "復元済み",
    "restore完了",
    "production restore承認済み",
    "production restore実施済み",
    "productionRestorePerformed: true",
)

# Patterns are assembled from fragments so that this file never contains the
# literal paths it forbids.
_SEP = "/"
FORBIDDEN_SOURCE_PATTERNS = {
    "absolute user home path": re.compile(_SEP + "Users" + _SEP + r"[A-Za-z0-9._-]+"),
    "temporary private path": re.compile(_SEP + "private" + _SEP + "tmp"),
    "session uuid": re.compile(
        r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    ),
    "assistant state directory": re.compile(r"\." + "claude" + _SEP),
    "assistant scratch directory": re.compile("scratch" + "pad"),
    "worktree absolute path": re.compile(_SEP + "_WORKTREES" + _SEP),
}


class EvidenceUnavailable(RuntimeError):
    """Raised when required external evidence cannot be located."""


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def workspace_root() -> Path:
    override = os.environ.get(ENV_WORKSPACE_ROOT)
    if override:
        candidate = Path(override).expanduser()
        if not candidate.is_dir():
            raise EvidenceUnavailable(
                f"{ENV_WORKSPACE_ROOT} is set to {override!r} but that is not a "
                f"directory. Set {ENV_WORKSPACE_ROOT} to the {WORKSPACE_DIR_NAME} "
                f"directory, or set {ENV_STEP22_DIFF} and {ENV_DIRECTION_LOCK} "
                "directly."
            )
        return candidate.resolve()
    for ancestor in Path(__file__).resolve().parents:
        if ancestor.name == WORKSPACE_DIR_NAME:
            return ancestor
    raise EvidenceUnavailable(
        f"No ancestor directory named {WORKSPACE_DIR_NAME!r} was found above this "
        f"test, so the workspace root is unknown. Set {ENV_WORKSPACE_ROOT}, or set "
        f"{ENV_STEP22_DIFF} and {ENV_DIRECTION_LOCK} to the evidence files."
    )


def evidence_path(env_name: str, relative: str) -> Path:
    override = os.environ.get(env_name)
    if override:
        candidate = Path(override).expanduser()
        if not candidate.is_file():
            raise EvidenceUnavailable(
                f"{env_name} is set to {override!r} but that file does not exist."
            )
        return candidate.resolve()
    resolved = workspace_root() / relative
    if not resolved.is_file():
        raise EvidenceUnavailable(
            f"Step 22 evidence not found at the default location {relative!r} under "
            f"the resolved workspace root. Set {env_name} to the evidence file."
        )
    return resolved


def repo_root() -> Path:
    override = os.environ.get(ENV_REPO_ROOT)
    if override:
        candidate = Path(override).expanduser()
        if not candidate.is_dir():
            raise EvidenceUnavailable(
                f"{ENV_REPO_ROOT} is set to {override!r} but that is not a directory."
            )
        return candidate.resolve()
    return REPO_ROOT_DEFAULT


def git(*args: str) -> str:
    root = repo_root()
    executable = shutil.which("git")
    if executable is None:
        raise EvidenceUnavailable("git executable not found on PATH.")
    result = subprocess.run(
        [executable, "-C", str(root), *args],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout


def node_executable() -> str:
    executable = shutil.which("node")
    if executable is None:
        raise EvidenceUnavailable("node executable not found on PATH.")
    return executable


class Step23RestoreCandidateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.dashboard = json.loads(DASHBOARD_PATH.read_text(encoding="utf-8"))
        cls.candidates_doc = json.loads(CANDIDATES_PATH.read_text(encoding="utf-8"))
        cls.status = json.loads(STATUS_PATH.read_text(encoding="utf-8"))
        cls.step22_record = json.loads(STEP22_RECORD_PATH.read_text(encoding="utf-8"))
        cls.catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        cls.manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        cls.systems = cls.dashboard["systems"]
        cls.candidates = cls.candidates_doc["restoreCandidates"]
        cls.app = APP_PATH.read_text(encoding="utf-8")
        cls.index = INDEX_PATH.read_text(encoding="utf-8")
        # Step 23 added region of app.js only: renderRestoreCandidate body + its call.
        start = cls.app.index("    function renderRestoreCandidate(system) {")
        end = cls.app.index("    function openSystem(system, trigger) {")
        cls.candidate_region = cls.app[start:end] + "\n${renderRestoreCandidate(system)}"

    # ------------------------------------------------------------------ A
    def test_a_top_level_state(self) -> None:
        doc = self.candidates_doc
        self.assertEqual(doc["taskId"], "HISTORY_STEP23_EIGHT_RESTORE_CANDIDATES")
        self.assertEqual(doc["recordType"], "step23_restore_candidates")
        self.assertEqual(doc["candidateStatus"], "AWAITING_56_REVIEW")
        self.assertEqual(doc["sourceStep"], 22)
        self.assertEqual(doc["systemCount"], 8)
        self.assertEqual(doc["restoreCandidateCount"], 8)
        self.assertEqual(doc["generationIdsCreated"], 0)
        self.assertIs(doc["step24Started"], False)
        for flag in (
            "productionRestorePerformed",
            "productionRestoreAuthorized",
            "publicationPerformed",
            "ragUpdatePerformed",
            "gitWritePerformed",
            "runtimeWritePerformed",
        ):
            self.assertIs(doc[flag], False, flag)

        data = self.dashboard
        self.assertEqual(data["taskId"], "HISTORY_STEP23_EIGHT_RESTORE_CANDIDATES")
        self.assertEqual(data["candidateStatus"], "AWAITING_56_REVIEW")
        self.assertIs(data["step23Started"], True)
        self.assertIs(data["step24Started"], False)
        self.assertEqual(data["restoreCandidateCount"], 8)
        self.assertEqual(data["generationIdsCreated"], 0)
        self.assertEqual(data["version"], "1.0.0-step23")
        for flag in (
            "productionRestorePerformed",
            "productionRestoreAuthorized",
            "publicationPerformed",
            "ragUpdatePerformed",
            "gitWritePerformed",
            "runtimeWritePerformed",
        ):
            self.assertIs(data[flag], False, flag)
        self.assertTrue(data["restoreNotice"].strip())
        self.assertNotIn("復元候補は工程23で作成", data["restoreNotice"])

        status = self.status
        self.assertEqual(status["recordType"], "step23_restore_candidate_status")
        self.assertEqual(status["taskId"], "HISTORY_STEP23_EIGHT_RESTORE_CANDIDATES")
        self.assertEqual(status["status"], "AWAITING_56_REVIEW")
        self.assertEqual(status["systemCount"], 8)
        self.assertEqual(status["restoreCandidateCount"], 8)
        self.assertIs(status["productionRestorePerformed"], False)
        self.assertIs(status["productionRestoreAuthorized"], False)
        self.assertIs(status["step24Started"], False)
        self.assertIs(status["restoreActionAvailableInUi"], False)
        self.assertEqual(status["generationIdsCreated"], 0)
        for counter in ("gitWrites", "publicationWrites", "ragWrites", "runtimeWrites"):
            self.assertEqual(status[counter], 0, counter)

    # ------------------------------------------------------------------ B
    def test_b_eight_systems_fixed_identity_and_order(self) -> None:
        self.assertEqual(len(self.systems), 8)
        self.assertEqual(len(self.candidates), 8)
        self.assertEqual([s["id"] for s in self.systems], EXPECTED_IDS)
        self.assertEqual([s["name"] for s in self.systems], EXPECTED_NAMES)
        self.assertEqual([c["systemId"] for c in self.candidates], EXPECTED_IDS)
        self.assertEqual([c["systemName"] for c in self.candidates], EXPECTED_NAMES)
        self.assertEqual([c["order"] for c in self.candidates], list(range(1, 9)))
        self.assertEqual(len({c["systemId"] for c in self.candidates}), 8)
        self.assertEqual(len({s["id"] for s in self.systems}), 8)
        self.assertEqual(set(self.candidates_doc["candidateClassEnum"]),
                         CANDIDATE_CLASS_ENUM)
        self.assertNotIn("ainoboru-infra", [s["id"] for s in self.systems])
        self.assertNotIn("ainoboru-knowledge", [s["id"] for s in self.systems])

    # ------------------------------------------------------------------ C
    def test_c_candidate_sync_and_per_candidate_invariants(self) -> None:
        by_id_doc = {c["systemId"]: c for c in self.candidates}
        by_id_dash = {s["id"]: s["restoreCandidate"] for s in self.systems}
        self.assertEqual(set(by_id_doc), set(by_id_dash))
        for system_id, candidate in by_id_doc.items():
            with self.subTest(system=system_id):
                self.assertEqual(by_id_dash[system_id], candidate)
                self.assertEqual(set(candidate), REQUIRED_CANDIDATE_FIELDS)
                self.assertIs(candidate["candidateCreated"], True)
                self.assertIs(candidate["productionRestoreAuthorized"], False)
                self.assertIs(candidate["ragUpdateAuthorized"], False)
                self.assertIs(candidate["gitWriteAuthorized"], False)
                self.assertIn(candidate["candidateClass"], CANDIDATE_CLASS_ENUM)
                self.assertTrue(candidate["candidateSummary"].strip())
                self.assertTrue(candidate["rollbackBoundary"].strip())
                self.assertTrue(candidate["evidenceLevel"].strip())
                self.assertTrue(candidate["destinationStatus"].strip())
                for field in ("preconditions", "stopConditions", "verificationPlan",
                              "excludedInputs", "restoreInputs", "unresolvedItems",
                              "sourceReferences"):
                    self.assertIsInstance(candidate[field], list, field)
                for field in ("preconditions", "stopConditions", "verificationPlan",
                              "excludedInputs"):
                    self.assertTrue(candidate[field], field)
                for reference in candidate["sourceReferences"]:
                    self.assertEqual(set(reference), {"type", "ref", "status"})

    # ------------------------------------------------------------------ D
    def test_d_candidate_class_distribution(self) -> None:
        counts = {name: 0 for name in CANDIDATE_CLASS_ENUM}
        for candidate in self.candidates:
            counts[candidate["candidateClass"]] += 1
        self.assertEqual(counts, EXPECTED_CLASS_COUNTS)
        self.assertEqual(self.status["candidateClassCounts"], EXPECTED_CLASS_COUNTS)
        self.assertEqual(sum(counts.values()), 8)

    # ------------------------------------------------------------------ E
    def test_e_ui_renders_candidates(self) -> None:
        self.assertEqual(self.app.count("function renderRestoreCandidate"), 1)
        self.assertEqual(self.app.count("${renderRestoreCandidate(system)}"), 1)
        self.assertEqual(self.app.count("function openSystem"), 1)
        self.assertIn("復元候補", self.app)
        for label in (
            "candidateClass",
            "evidenceLevel",
            "前提条件",
            "停止条件",
            "検証計画",
            "候補の未確認事項",
            "rollback境界",
            "復元先",
            "復元入力から除外",
        ):
            self.assertIn(label, self.candidate_region, label)
        self.assertIn("候補", self.candidate_region)
        self.assertIn("復元は実施していません", self.candidate_region)
        self.assertIn('role="dialog"', self.index)
        self.assertIn('aria-modal="true"', self.index)
        self.assertIn('id="modal-close"', self.index)
        for retained in ('event.key === "Escape"', 'event.key === "Enter"',
                         'event.key === " "', "trapModalFocus", "returnFocus?.focus()"):
            self.assertIn(retained, self.app, retained)

        self.assertIn("工程23 candidate", self.index)
        self.assertIn("AWAITING_56_REVIEW", self.index)
        for stale in (
            "工程23は未着手",
            "Step 23 not started",
            "復元候補は工程23で作成",
            "工程22 candidate",
            "AWAITING_NOBORU_APPROVAL",
        ):
            self.assertNotIn(stale, self.index, stale)

    # ------------------------------------------------------------------ F
    def test_f_no_restore_action_surface(self) -> None:
        for token in BANNED_ACTION_TOKENS:
            self.assertNotIn(token, self.candidate_region, f"app.js candidate: {token}")
            self.assertNotIn(token, self.index, f"index.html: {token}")
        for claim in BANNED_COMPLETION_CLAIMS:
            self.assertNotIn(claim, self.candidate_region, f"app.js candidate: {claim}")
            self.assertNotIn(claim, self.index, f"index.html: {claim}")
        for interactive in ("<button", "<a ", "href", "onclick", "addEventListener",
                            "://", "<form", "<input"):
            self.assertNotIn(interactive, self.candidate_region, interactive)
        # index.html keeps only the two Step 22 buttons (nav + modal close)
        self.assertEqual(self.index.count("<button"), 2)
        self.assertEqual(self.index.count("<a "), 0)
        self.assertNotIn('href="http', self.index)
        for candidate in self.candidates:
            blob = json.dumps(candidate, ensure_ascii=False)
            for token in BANNED_ACTION_TOKENS + BANNED_COMPLETION_CLAIMS:
                self.assertNotIn(token, blob, f"{candidate['systemId']}: {token}")

    # ------------------------------------------------------------------ G
    def test_g_step22_evidence_unmodified(self) -> None:
        self.assertEqual(sha256(STEP22_RECORD_PATH),
                         STEP22_FIXED_SHA256["step22-eight-card-current-state.json"])
        self.assertEqual(sha256(CATALOG_PATH),
                         STEP22_FIXED_SHA256["generation-catalog.json"])
        try:
            run_diff = evidence_path(ENV_STEP22_DIFF, STEP22_DIFF_RELATIVE)
        except EvidenceUnavailable as exc:
            self.fail(str(exc))
        self.assertEqual(sha256(run_diff),
                         STEP22_FIXED_SHA256["step22-run-diff.patch"])
        self.assertEqual(self.step22_record["candidateStatus"], "AWAITING_NOBORU_APPROVAL")
        self.assertIs(self.step22_record["step23Started"], False)
        self.assertIs(self.step22_record["productionRestoreActionAvailable"], False)
        self.assertEqual(self.step22_record["generationIdsCreated"], 0)
        frame = self.catalog["step22_current_frame"]
        self.assertIs(frame["production_restore_allowed"], False)
        self.assertEqual(frame["current_generation_ids_created"], 0)
        self.assertIn("NOT_RUNTIME_PROOF",
                      json.dumps(self.dashboard, ensure_ascii=False))
        for candidate in self.candidates:
            for reference in candidate["sourceReferences"]:
                if reference["type"] == "historical_component_catalog":
                    self.assertIn("NOT_RUNTIME_PROOF", reference["status"],
                                  candidate["systemId"])

    # ------------------------------------------------------------------ H
    def test_h_app_js_fixed_content(self) -> None:
        self.assertEqual(sha256(APP_PATH), APP_JS_SHA256)

    # ------------------------------------------------------------------ I
    def test_i_restore_inputs_exclude_sensitive_material(self) -> None:
        for candidate in self.candidates:
            with self.subTest(system=candidate["systemId"]):
                inputs = " ".join(candidate["restoreInputs"]).lower()
                for fragment in FORBIDDEN_INPUT_FRAGMENTS:
                    self.assertNotIn(fragment, inputs, fragment)
                excluded = " ".join(candidate["excludedInputs"]).lower()
                self.assertTrue(excluded.strip())
                if candidate["restoreInputs"]:
                    self.assertTrue(
                        any(marker in excluded for marker in ("raw", "credential",
                                                              "cookie", "token",
                                                              "secret")),
                        candidate["systemId"],
                    )
        receipt = next(c for c in self.candidates if c["systemId"] == "receipt")
        self.assertTrue(
            any("original image" in item.lower() for item in receipt["excludedInputs"])
        )
        self.assertNotIn("fable", json.dumps(receipt, ensure_ascii=False).lower())

    # ------------------------------------------------------------------ J
    def test_j_readiness_matches_evidence(self) -> None:
        by_id_system = {s["id"]: s for s in self.systems}
        by_id_candidate = {c["systemId"]: c for c in self.candidates}
        for system_id, system in by_id_system.items():
            candidate = by_id_candidate[system_id]
            confidence = system["currentStateConfidence"]
            if candidate["candidateClass"] == "READY_FOR_ISOLATED_RESTORE_PLAN":
                self.assertEqual(confidence, "VERIFIED", system_id)
            if confidence in ("PARTIAL", "UNVERIFIED_RUNTIME", "RESERVED_VERIFIED"):
                self.assertNotEqual(
                    candidate["candidateClass"],
                    "READY_FOR_ISOLATED_RESTORE_PLAN",
                    system_id,
                )
            self.assertIsNone(system["currentGeneration"], system_id)
        r6 = by_id_candidate["r6"]
        self.assertEqual(r6["candidateClass"], "PARKED_NO_RESTORE_PLAN")
        self.assertEqual(r6["evidenceLevel"], "RESERVED_FRAME_ONLY")
        self.assertEqual(r6["restoreInputs"], [])
        self.assertEqual(r6["sourceReferences"], [])
        r6_blob = json.dumps(r6, ensure_ascii=False).lower()
        for banned in ("実装済み", "復元可能", "ready", "failed", "removed"):
            self.assertNotIn(banned, r6_blob, banned)
        fable = by_id_candidate["fable-batch"]
        self.assertEqual(fable["candidateClass"], "CONDITIONAL_RESTORE_PLAN")
        self.assertIn("FABLE-G003", fable["sourceState"])
        self.assertIn("現在runtimeの証拠ではない", fable["sourceState"])

    # ------------------------------------------------------------------ K
    def test_k_dashboard_json_and_js_semantically_identical(self) -> None:
        try:
            node = node_executable()
        except EvidenceUnavailable as exc:
            self.fail(str(exc))
        node_script = (
            "global.window={};"
            f"require({json.dumps(str(JS_DATA_PATH))});"
            "process.stdout.write(JSON.stringify(window.AINOBORU_DATA));"
        )
        result = subprocess.run(
            [node, "-e", node_script], check=True, capture_output=True, text=True
        )
        self.assertEqual(json.loads(result.stdout), self.dashboard)

    # ------------------------------------------------------------------ L
    def test_l_manifest_hashes_and_sizes(self) -> None:
        manifest = self.manifest
        self.assertEqual(manifest["version"], "1.0.0-step23")
        self.assertEqual(manifest["candidate_status"], "AWAITING_56_REVIEW")
        self.assertEqual(manifest["system_count"], 8)
        self.assertEqual(manifest["restore_candidate_count"], 8)
        self.assertIs(manifest["step23_started"], True)
        self.assertIs(manifest["step24_started"], False)
        self.assertIs(manifest["production_restore_allowed"], False)
        self.assertIs(manifest["production_restore_performed"], False)
        self.assertIs(manifest["cloudflare_publish_performed"], False)
        for counter in ("git_writes", "publication_writes", "rag_writes",
                        "runtime_writes", "generation_ids_created"):
            self.assertEqual(manifest[counter], 0, counter)

        listed = {entry["path"] for entry in manifest["files"]}
        for required in (
            "data/step23-restore-candidates.json",
            "data/step23-restore-candidate-status.json",
            "data/dashboard-data.json",
            "assets/app.js",
            "assets/styles.css",
            "assets/dashboard-data.js",
            "index.html",
            "README.md",
            "tests/test_step22_eight_card_ui.py",
            "tests/test_step23_restore_candidates.py",
        ):
            self.assertIn(required, listed, required)

        for entry in manifest["files"]:
            with self.subTest(path=entry["path"]):
                target = HISTORY_ROOT / entry["path"]
                self.assertTrue(target.is_file(), entry["path"])
                self.assertEqual(sha256(target), entry["sha256"], entry["path"])
                self.assertEqual(target.stat().st_size, entry["size_bytes"],
                                 entry["path"])

        on_disk = {
            str(path.relative_to(HISTORY_ROOT))
            for path in HISTORY_ROOT.rglob("*")
            if path.is_file() and not path.name.startswith(".")
            and "__pycache__" not in path.parts
            and path.name != "MANIFEST.json"
        }
        self.assertEqual(on_disk - listed, set(), "files missing from MANIFEST")

    # ------------------------------------------------------------------ M
    def test_m_repository_boundary_is_read_only(self) -> None:
        try:
            head = git("rev-parse", "HEAD").strip()
            commits_after = git("rev-list", "--count", f"{BASE_COMMIT}..HEAD").strip()
            porcelain = git("status", "--porcelain")
            stash = git("stash", "list").strip()
        except EvidenceUnavailable as exc:
            self.fail(str(exc))
        self.assertEqual(head, BASE_COMMIT)
        self.assertEqual(commits_after, "0")
        changed = [
            line[3:].strip().strip('"')
            for line in porcelain.splitlines()
            if line.strip()
        ]
        self.assertTrue(changed, "expected Step 22/23 working-tree changes")
        for path in changed:
            self.assertTrue(path.startswith("history/"), f"out of scope: {path}")
        self.assertEqual(stash, "")
        try:
            lock_path = evidence_path(ENV_DIRECTION_LOCK, DIRECTION_LOCK_RELATIVE)
        except EvidenceUnavailable as exc:
            self.fail(str(exc))
        lock = json.loads(lock_path.read_text(encoding="utf-8"))
        self.assertEqual(lock["lock_state"], "IDLE")

    # ------------------------------------------------------------------ N
    def test_n_test_source_contains_no_environment_specific_paths(self) -> None:
        source = Path(__file__).resolve().read_text(encoding="utf-8")
        for label, pattern in FORBIDDEN_SOURCE_PATTERNS.items():
            with self.subTest(pattern=label):
                self.assertEqual(pattern.findall(source), [], label)
        self.assertIn("parents[1]", source)
        for env_name in (ENV_WORKSPACE_ROOT, ENV_STEP22_DIFF, ENV_DIRECTION_LOCK):
            self.assertIn(env_name, source)


if __name__ == "__main__":
    unittest.main(verbosity=2)
