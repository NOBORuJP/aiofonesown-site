#!/usr/local/bin/python3
"""Validation for the read-only eight-frame repository/generation reference UI."""

from __future__ import annotations

import hashlib
import json
import subprocess
import unittest
from pathlib import Path


HISTORY = Path(__file__).resolve().parents[1]
MAP_PATH = HISTORY / "data" / "frame-repository-generation-map.json"
DASHBOARD_PATH = HISTORY / "data" / "dashboard-data.json"
JS_DATA_PATH = HISTORY / "assets" / "dashboard-data.js"
APP_PATH = HISTORY / "assets" / "app.js"
INDEX_PATH = HISTORY / "index.html"
CATALOG_PATH = HISTORY / "data" / "generation-catalog.json"
CATALOG_JS_PATH = HISTORY / "assets" / "generation-catalog.js"
README_PATH = HISTORY / "README.md"
MANIFEST_PATH = HISTORY / "MANIFEST.json"

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

EXPECTED_GENERATIONS = {
    "anythingllm-docker": [
        "ANYTHINGLLM_DOCKER-G001",
        "ANYTHINGLLM_DOCKER-G002",
        "ANYTHINGLLM_DOCKER-G003",
    ],
    "anythingllm-desktop": [],
    "gpt": [
        "GPT-G001",
        "GPT-G002",
        "GPT-G003",
        "GPT-G004",
        "GPT-G005",
        "GPT-G006",
        "GPT-G007",
    ],
    "claude": ["CLAUDE-G001"],
    "gemini": [],
    "batch": ["FABLE-G001", "FABLE-G002", "FABLE-G003"],
    "r6": [],
    "receipt": ["RECEIPT-G001"],
}

FOCUS_HARNESS = r"""
class FakeEvent {
  constructor(key, shiftKey = false) {
    this.key = key;
    this.shiftKey = shiftKey;
    this.defaultPrevented = false;
  }
  preventDefault() { this.defaultPrevented = true; }
}
class FakeTarget {
  constructor() { this.listeners = {}; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatchEvent(type, event = new FakeEvent("")) {
    event.target ||= this;
    for (const listener of this.listeners[type] || []) listener(event);
    return event;
  }
}
let documentRef;
class FakeElement extends FakeTarget {
  constructor(id, parent = null) {
    super();
    this.id = id;
    this.parent = parent;
    this.dataset = {};
    this.attributes = new Map();
    this.hidden = false;
    this.inert = false;
    this._innerHTML = "";
    this.classList = { add() {}, remove() {} };
  }
  set innerHTML(value) {
    this._innerHTML = value;
    if (this.id === "system-grid") {
      documentRef.cards = [...value.matchAll(/data-system="([^"]+)"/g)].map((match) => {
        const card = new FakeElement(`card-${match[1]}`, documentRef.shell);
        card.dataset.system = match[1];
        return card;
      });
    } else if (this.id === "side-systems") {
      documentRef.sideButtons = [...value.matchAll(/data-side="([^"]+)"/g)].map((match) => {
        const button = new FakeElement(`side-${match[1]}`, documentRef.shell);
        button.dataset.side = match[1];
        return button;
      });
    }
  }
  get innerHTML() { return this._innerHTML; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  removeAttribute(name) { this.attributes.delete(name); }
  hasAttribute(name) { return this.attributes.has(name); }
  focus() { documentRef.activeElement = this; }
  contains(element) {
    for (let current = element; current; current = current.parent) {
      if (current === this) return true;
    }
    return false;
  }
  closest(selector) {
    if (selector !== "[hidden]") return null;
    for (let current = this; current; current = current.parent) {
      if (current.hidden) return current;
    }
    return null;
  }
  querySelectorAll() { return this.id === "system-modal" ? [documentRef.modalClose] : []; }
  scrollIntoView() {}
}
class FakeDocument extends FakeTarget {
  constructor() {
    super();
    this.body = new FakeElement("body");
    this.shell = new FakeElement("shell", this.body);
    this.systemGrid = new FakeElement("system-grid", this.shell);
    this.sideSystems = new FakeElement("side-systems", this.shell);
    this.crossReference = new FakeElement("cross-reference", this.shell);
    this.backdrop = new FakeElement("modal-backdrop", this.body);
    this.modal = new FakeElement("system-modal", this.body);
    this.modalContent = new FakeElement("modal-content", this.modal);
    this.modalClose = new FakeElement("modal-close", this.modal);
    this.backdrop.hidden = true;
    this.modal.hidden = true;
    this.cards = [];
    this.sideButtons = [];
    this.activeElement = this.body;
  }
  querySelector(selector) {
    const fixed = {
      "#system-grid": this.systemGrid,
      "#side-systems": this.sideSystems,
      "#cross-reference": this.crossReference,
      ".shell": this.shell,
      "#modal-backdrop": this.backdrop,
      "#system-modal": this.modal,
      "#modal-content": this.modalContent,
      "#modal-close": this.modalClose
    };
    if (fixed[selector]) return fixed[selector];
    const match = selector.match(/^\[data-system="([^"]+)"\]$/);
    return match ? this.cards.find((card) => card.dataset.system === match[1]) || null : null;
  }
  querySelectorAll(selector) {
    if (selector === "[data-system]") return this.cards;
    if (selector === "[data-side]") return this.sideButtons;
    return [];
  }
}
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
documentRef = new FakeDocument();
global.document = documentRef;
global.window = {
  AINOBORU_DATA: TEST_DATA,
  AINOBORU_GENERATION_CATALOG: TEST_CATALOG,
  innerWidth: 1280
};
require(APP_PATH);
assert(documentRef.cards.length === 8, "expected exactly eight top cards");
assert(!documentRef.systemGrid.innerHTML.match(/ainoboru-[a-z0-9-]+/i),
  "repository name leaked into top cards");
assert((documentRef.crossReference.innerHTML.match(/class="cross-panel"/g) || []).length === 2,
  "cross-reference views missing");
let allDetails = "";
for (const card of documentRef.cards) {
  card.focus();
  card.dispatchEvent("keydown", new FakeEvent("Enter"));
  assert(!documentRef.modal.hidden, "modal did not open");
  const detail = documentRef.modalContent.innerHTML;
  allDetails += detail;
  for (const heading of [
    "現在状態",
    "世代履歴",
    "Memory / Prompt / RAG / 設定の参照状態",
    "Memory export状態",
    "関連repository / path / commit / source_ref",
    "未確認事項"
  ]) assert(detail.includes(heading), `missing heading: ${heading}`);
  assert(documentRef.shell.inert, "page shell is not inert");
  assert(documentRef.activeElement === documentRef.modalClose, "close button lacks focus");
  const tab = documentRef.dispatchEvent("keydown", new FakeEvent("Tab"));
  assert(tab.defaultPrevented, "Tab was not trapped");
  documentRef.dispatchEvent("keydown", new FakeEvent("Escape"));
  assert(documentRef.modal.hidden, "Escape did not close modal");
  assert(documentRef.activeElement === card, "focus did not return to card");
}
for (const generationId of EXPECTED_GENERATION_IDS) {
  assert(allDetails.includes(generationId), `generation missing from UI: ${generationId}`);
}
process.stdout.write("PASS");
"""

CATALOG_ERROR_HARNESS = r"""
const grid = { innerHTML: "" };
global.document = {
  querySelector(selector) {
    return selector === "#system-grid" ? grid : null;
  },
  querySelectorAll() {
    return [];
  }
};
global.window = {
  AINOBORU_DATA: TEST_DATA,
  AINOBORU_GENERATION_CATALOG: TEST_CATALOG
};
require(APP_PATH);
if (!grid.innerHTML.includes("世代catalog")) {
  throw new Error(`explicit catalog error missing: ${grid.innerHTML}`);
}
if (grid.innerHTML.includes("確立済み世代なし")) {
  throw new Error("catalog error was misreported as no established generation");
}
if (grid.innerHTML.includes('data-system="gpt"')) {
  throw new Error("frame cards rendered from incomplete generation evidence");
}
process.stdout.write("PASS");
"""


class EightFrameReferenceUiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.mapping = json.loads(MAP_PATH.read_text(encoding="utf-8"))
        cls.frames = cls.mapping["frames"]
        cls.by_id = {frame["systemId"]: frame for frame in cls.frames}
        cls.catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        cls.catalog_by_id = {system["id"]: system for system in cls.catalog["systems"]}
        cls.dashboard = json.loads(DASHBOARD_PATH.read_text(encoding="utf-8"))
        cls.app = APP_PATH.read_text(encoding="utf-8")
        cls.index = INDEX_PATH.read_text(encoding="utf-8")
        cls.readme = README_PATH.read_text(encoding="utf-8")

    def test_exactly_eight_frames_in_fixed_order(self) -> None:
        self.assertEqual(len(self.frames), 8)
        self.assertEqual([frame["slot"] for frame in self.frames], list(range(1, 9)))
        self.assertEqual([frame["nameJa"] for frame in self.frames], EXPECTED_NAMES)
        self.assertEqual(len({frame["systemId"] for frame in self.frames}), 8)

    def test_repository_is_not_a_top_frame(self) -> None:
        repository_names = set(self.mapping["repositories"])
        self.assertTrue(repository_names)
        self.assertTrue(
            repository_names.isdisjoint(frame["systemId"] for frame in self.frames)
        )
        self.assertIn("data.frames.map", self.app)
        self.assertNotIn("data.repositories.map", self.app)
        self.assertIn("8枠はrepositoryではありません", self.index)

    def test_all_frames_have_complete_mapping_entries(self) -> None:
        valid_states = {"確認済み", "一部確認", "未接続", "保留"}
        required = {
            "slot",
            "systemId",
            "nameJa",
            "mappingState",
            "currentState",
            "generationCatalogSystemId",
            "githubCopyStatus",
            "referenceStates",
            "repositoryBindings",
            "unverifiedItems",
        }
        for frame in self.frames:
            self.assertTrue(required.issubset(frame), frame["systemId"])
            self.assertIn(frame["mappingState"], valid_states)
            self.assertEqual(
                set(frame["referenceStates"]), {"memory", "prompt", "rag", "settings"}
            )
            self.assertTrue(frame["repositoryBindings"])
            self.assertTrue(frame["unverifiedItems"])
            for binding in frame["repositoryBindings"]:
                self.assertIn(binding["repositoryId"], self.mapping["repositories"])
                self.assertIn("path", binding)
                self.assertIn("sourceRef", binding)
                self.assertIn(binding["confirmationState"], valid_states)

    def test_many_to_many_relationship_is_preserved(self) -> None:
        self.assertGreater(len(self.by_id["anythingllm-docker"]["repositoryBindings"]), 1)
        binding_counts: dict[str, int] = {}
        for frame in self.frames:
            for binding in frame["repositoryBindings"]:
                binding_counts[binding["repositoryId"]] = (
                    binding_counts.get(binding["repositoryId"], 0) + 1
                )
        self.assertGreater(binding_counts["ainoboru-control-plane"], 1)
        self.assertGreater(binding_counts["ainoboru-ops-runner"], 1)
        self.assertGreater(binding_counts["aiofonesown-site"], 1)

    def test_memory_export_is_explicitly_stale_and_not_perfect(self) -> None:
        memory = self.mapping["memoryExport"]
        self.assertEqual(memory["repositoryId"], "ainoboru-memory-bridge")
        self.assertEqual(memory["path"], "mcp/memory-bridge/exports/SUMMARY.json")
        self.assertEqual(memory["maxMemoryId"], 640)
        self.assertEqual(memory["memoryCount"], 633)
        self.assertEqual(memory["historyStart"], "2026-07-29T22:00:53+09:00")
        self.assertGreaterEqual(memory["observedCurrentAtLeastId"], 653)
        self.assertEqual(memory["displayStatus"], "Git保存経路は成立・最新差分未書出し")
        self.assertEqual(memory["synchronization"], "完全同期ではない")
        ui_text = f"{self.index}\n{self.app}"
        self.assertIn("max ID 640", ui_text)
        self.assertIn("ID 653", ui_text)
        self.assertIn("完全同期ではありません", ui_text)

    def test_existing_generation_ids_and_counts_are_preserved(self) -> None:
        for system_id, expected in EXPECTED_GENERATIONS.items():
            system = self.catalog_by_id[system_id]
            actual = [item["generation"] for item in system["generations"]]
            self.assertEqual(actual, expected, system_id)
            self.assertEqual(system["generation_count"], len(expected), system_id)
            if expected:
                self.assertEqual(system["current_generation"], expected[-1])
            else:
                self.assertIsNone(system["current_generation"])

    def test_unestablished_generations_are_not_invented(self) -> None:
        for frame_id in ("anythingllm-desktop", "gemini", "r6"):
            catalog_id = self.by_id[frame_id]["generationCatalogSystemId"]
            system = self.catalog_by_id[catalog_id]
            self.assertIsNone(system["current_generation"])
            self.assertEqual(system["generations"], [])
        self.assertIn("確立済み世代なし。世代IDは生成していません。", self.app)
        self.assertIn("過去へ巻き戻さず", self.mapping["generationCatalog"]["principle"])

    def test_repository_references_have_no_guessed_urls(self) -> None:
        mapping_text = json.dumps(self.mapping, ensure_ascii=False)
        self.assertNotIn("https://github.com", mapping_text)
        self.assertNotIn("githubUrl", mapping_text)
        for name, repository in self.mapping["repositories"].items():
            self.assertEqual(repository["name"], name)
            self.assertTrue(repository["roleJa"])

    def test_cross_indexes_are_views_not_top_cards(self) -> None:
        cross = self.mapping["crossReferences"]
        self.assertEqual(cross["memory"]["indexNumber"], 9)
        self.assertEqual(cross["prompt"]["indexNumber"], 10)
        self.assertIn("トップカードではない", cross["memory"]["displayMode"])
        self.assertIn("トップカードではない", cross["prompt"]["displayMode"])
        self.assertIn('class="cross-panel"', self.app)
        self.assertNotIn('class="system-card cross', self.app)

    def test_legacy_step22_state_is_provenance_only(self) -> None:
        provenance = self.mapping["provenance"]["legacyStep22Candidate"]
        self.assertFalse(provenance["useAsCurrentState"])
        self.assertEqual(provenance["candidateStatus"], "AWAITING_NOBORU_APPROVAL")
        current_ui = self.index
        self.assertNotIn("AWAITING_NOBORU_APPROVAL", current_ui)
        self.assertNotIn("step23Started", current_ui)

    def test_dashboard_pointer_and_preview_instructions(self) -> None:
        self.assertEqual(
            self.dashboard["source"], "frame-repository-generation-map.json"
        )
        self.assertIn("data/frame-repository-generation-map.json", JS_DATA_PATH.read_text())
        self.assertIn("./preview.command", self.readme)
        self.assertIn("sh ./preview.command", self.readme)
        self.assertIn("http://localhost:8080/history/", self.readme)
        self.assertIn("旧固定WORKBENCH previewは自動更新されません", self.readme)

    def test_all_cards_open_and_modal_focus_is_trapped(self) -> None:
        expected_generation_ids = [
            generation
            for generations in EXPECTED_GENERATIONS.values()
            for generation in generations
        ]
        node_script = (
            f"const TEST_DATA={json.dumps(self.mapping, ensure_ascii=False)};"
            f"const TEST_CATALOG={json.dumps(self.catalog, ensure_ascii=False)};"
            f"const EXPECTED_GENERATION_IDS={json.dumps(expected_generation_ids)};"
            f"const APP_PATH={json.dumps(str(APP_PATH))};"
            f"{FOCUS_HARNESS}"
        )
        result = subprocess.run(
            ["node", "-e", node_script],
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.stdout, "PASS")

    def test_missing_or_incomplete_generation_catalog_is_an_explicit_error(self) -> None:
        incomplete_catalog = {
            **self.catalog,
            "systems": [
                system for system in self.catalog["systems"] if system["id"] != "gpt"
            ],
        }
        for catalog in (None, incomplete_catalog):
            node_script = (
                f"const TEST_DATA={json.dumps(self.mapping, ensure_ascii=False)};"
                f"const TEST_CATALOG={json.dumps(catalog, ensure_ascii=False)};"
                f"const APP_PATH={json.dumps(str(APP_PATH))};"
                f"{CATALOG_ERROR_HARNESS}"
            )
            result = subprocess.run(
                ["node", "-e", node_script],
                capture_output=True,
                text=True,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(result.stdout, "PASS")

    def test_json_and_javascript_parse(self) -> None:
        for path in (MAP_PATH, DASHBOARD_PATH, CATALOG_PATH):
            json.loads(path.read_text(encoding="utf-8"))
        for path in (APP_PATH, JS_DATA_PATH, CATALOG_JS_PATH):
            result = subprocess.run(
                ["node", "--check", str(path)],
                capture_output=True,
                text=True,
            )
            self.assertEqual(result.returncode, 0, result.stderr)

    def test_manifest_integrity_for_every_listed_file(self) -> None:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        for entry in manifest["files"]:
            path = HISTORY / entry["path"]
            self.assertTrue(path.is_file(), entry["path"])
            content = path.read_bytes()
            self.assertEqual(len(content), entry["size_bytes"], entry["path"])
            self.assertEqual(
                hashlib.sha256(content).hexdigest(),
                entry["sha256"],
                entry["path"],
            )

    def test_generation_catalog_browser_asset_matches_displayed_history(self) -> None:
        node_script = (
            "global.window={};"
            f"require({json.dumps(str(CATALOG_JS_PATH))});"
            "process.stdout.write(JSON.stringify(window.AINOBORU_GENERATION_CATALOG));"
        )
        result = subprocess.run(
            ["node", "-e", node_script],
            check=True,
            capture_output=True,
            text=True,
        )
        browser_catalog = json.loads(result.stdout)
        self.assertEqual(browser_catalog["systems"], self.catalog["systems"])
        self.assertEqual(browser_catalog["principle"], self.catalog["principle"])

    def test_no_write_restore_or_publication_action(self) -> None:
        combined = f"{self.index}\n{self.app}"
        for forbidden in (
            "ainoboru-restore://",
            "実際に復元する",
            "cloudflare deploy",
            "git push",
        ):
            self.assertNotIn(forbidden, combined.lower())
        self.assertNotIn("<form", combined)


if __name__ == "__main__":
    unittest.main(verbosity=2)
