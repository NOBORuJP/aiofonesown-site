#!/usr/local/bin/python3
"""Fixed-profile validation for the Step 22 read-only eight-card history UI."""

from __future__ import annotations

import json
import subprocess
import unittest
from pathlib import Path


HISTORY = Path(__file__).resolve().parents[1]
DATA_PATH = HISTORY / "data" / "dashboard-data.json"
JS_DATA_PATH = HISTORY / "assets" / "dashboard-data.js"
APP_PATH = HISTORY / "assets" / "app.js"
INDEX_PATH = HISTORY / "index.html"
CATALOG_PATH = HISTORY / "data" / "generation-catalog.json"
STEP_RECORD_PATH = HISTORY / "data" / "step22-eight-card-current-state.json"

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

REQUIRED_FIELDS = {
    "id",
    "name",
    "short",
    "tone",
    "status",
    "currentState",
    "currentStateConfidence",
    "summary",
    "currentGeneration",
    "generationStatus",
    "githubCopyStatus",
    "lastVerifiedAt",
    "counts",
    "relatedComponents",
    "saveTargetsSummary",
    "excludedTargetsSummary",
    "unresolvedItems",
    "restoreReadiness",
}

FOCUS_TRAP_HARNESS = r"""
class FakeEvent {
  constructor(key, shiftKey = false) {
    this.key = key;
    this.shiftKey = shiftKey;
    this.defaultPrevented = false;
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
}

class FakeTarget {
  constructor() {
    this.listeners = {};
  }
  addEventListener(type, listener) {
    (this.listeners[type] ||= []).push(listener);
  }
  dispatchEvent(type, event = new FakeEvent("")) {
    event.target ||= this;
    for (const listener of this.listeners[type] || []) {
      listener(event);
    }
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
    this.classList = {
      add() {},
      remove() {}
    };
  }
  set innerHTML(value) {
    this._innerHTML = value;
    if (this.id === "system-grid") {
      documentRef.cards = [...value.matchAll(/data-system="([^"]+)"/g)]
        .map((match) => {
          const card = new FakeElement(`card-${match[1]}`, documentRef.shell);
          card.dataset.system = match[1];
          return card;
        });
    } else if (this.id === "side-systems") {
      documentRef.sideButtons = [...value.matchAll(/data-side="([^"]+)"/g)]
        .map((match) => {
          const button = new FakeElement(`side-${match[1]}`, documentRef.shell);
          button.dataset.side = match[1];
          return button;
        });
    }
  }
  get innerHTML() {
    return this._innerHTML;
  }
  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  hasAttribute(name) {
    return this.attributes.has(name);
  }
  focus() {
    documentRef.activeElement = this;
  }
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
  querySelectorAll() {
    return this.id === "system-modal" ? [documentRef.modalClose] : [];
  }
  scrollIntoView() {}
}

class FakeDocument extends FakeTarget {
  constructor() {
    super();
    this.body = new FakeElement("body");
    this.shell = new FakeElement("shell", this.body);
    this.systemGrid = new FakeElement("system-grid", this.shell);
    this.sideSystems = new FakeElement("side-systems", this.shell);
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
      ".shell": this.shell,
      "#modal-backdrop": this.backdrop,
      "#system-modal": this.modal,
      "#modal-content": this.modalContent,
      "#modal-close": this.modalClose
    };
    if (fixed[selector]) return fixed[selector];
    const systemMatch = selector.match(/^\[data-system="([^"]+)"\]$/);
    return systemMatch
      ? this.cards.find((card) => card.dataset.system === systemMatch[1]) || null
      : null;
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
global.window = { AINOBORU_DATA: TEST_DATA, innerWidth: 1280 };
require(APP_PATH);

for (const width of [1280, 390]) {
  window.innerWidth = width;
  assert(documentRef.cards.length === 8, `${width}: expected eight cards`);
  for (const [index, card] of documentRef.cards.entries()) {
    card.focus();
    card.dispatchEvent("keydown", new FakeEvent(index % 2 === 0 ? "Enter" : " "));
    assert(!documentRef.modal.hidden, `${width}/${index}: modal did not open`);
    assert(documentRef.shell.inert && documentRef.shell.hasAttribute("inert"),
      `${width}/${index}: page shell is not inert`);
    assert(documentRef.activeElement === documentRef.modalClose,
      `${width}/${index}: close button did not receive focus`);

    for (let repetition = 0; repetition < 6; repetition += 1) {
      const tab = documentRef.dispatchEvent("keydown", new FakeEvent("Tab"));
      assert(tab.defaultPrevented, `${width}/${index}: Tab was not trapped`);
      assert(documentRef.modal.contains(documentRef.activeElement),
        `${width}/${index}: Tab focus left dialog`);

      const shiftTab = documentRef.dispatchEvent(
        "keydown",
        new FakeEvent("Tab", true)
      );
      assert(shiftTab.defaultPrevented, `${width}/${index}: Shift+Tab was not trapped`);
      assert(documentRef.modal.contains(documentRef.activeElement),
        `${width}/${index}: Shift+Tab focus left dialog`);
    }

    const closeMethod = index % 3;
    if (closeMethod === 0) {
      documentRef.dispatchEvent("keydown", new FakeEvent("Escape"));
    } else if (closeMethod === 1) {
      documentRef.modalClose.dispatchEvent("click");
    } else {
      documentRef.backdrop.dispatchEvent("click");
    }
    assert(documentRef.modal.hidden, `${width}/${index}: modal did not close`);
    assert(!documentRef.shell.inert && !documentRef.shell.hasAttribute("inert"),
      `${width}/${index}: page shell remained inert`);
    assert(documentRef.activeElement === card,
      `${width}/${index}: focus did not return to originating card`);
  }
}
process.stdout.write("PASS");
"""


class Step22EightCardUiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
        cls.systems = cls.data["systems"]
        cls.by_id = {system["id"]: system for system in cls.systems}
        cls.app = APP_PATH.read_text(encoding="utf-8")
        cls.index = INDEX_PATH.read_text(encoding="utf-8")
        cls.catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
        cls.step_record = json.loads(STEP_RECORD_PATH.read_text(encoding="utf-8"))

    def test_profile_1_exact_identity_and_schema(self) -> None:
        self.assertEqual(len(self.systems), 8)
        self.assertEqual([system["name"] for system in self.systems], EXPECTED_NAMES)
        self.assertEqual(len({system["id"] for system in self.systems}), 8)
        self.assertNotEqual(self.systems[0]["id"], self.systems[1]["id"])
        for system in self.systems:
            self.assertTrue(REQUIRED_FIELDS.issubset(system), system["id"])
            self.assertEqual(set(system["counts"]), {"memory", "prompt", "rag", "settings"})
            for count in system["counts"].values():
                self.assertIn("value", count)
                if count["value"] is None:
                    self.assertTrue(count.get("reason"))
            for component in system["relatedComponents"]:
                self.assertEqual(set(component), {"repository", "commit", "status"})

    def test_profile_2_verified_current_facts(self) -> None:
        docker = self.by_id["anythingllm-docker"]
        desktop = self.by_id["anythingllm-desktop"]
        gpt = self.by_id["gpt"]
        self.assertIn("PASS_ANYTHINGLLM_DOCKER_RECOVERED", docker["currentState"])
        self.assertIn("mintplexlabs/anythingllm:1.15.0", docker["currentState"])
        self.assertIn("host 3002 / container 3001", docker["currentState"])
        self.assertIn("online=true", docker["currentState"])
        self.assertIn("restart always", docker["currentState"])
        self.assertIn("PASS_ANYTHINGLLM_DESKTOP_RECOVERED", desktop["currentState"])
        self.assertEqual(
            desktop["operationalCounts"],
            {
                "workspaces": 8,
                "workspaceDocuments": 83,
                "workspaceChats": 228,
                "workspaceThreads": 45,
            },
        )
        self.assertEqual(gpt["counts"]["memory"]["value"], 633)
        self.assertEqual(gpt["counts"]["memory"]["maxId"], 640)
        self.assertEqual(gpt["githubCopyStatus"], "CURRENT_VERIFIED")
        self.assertIn("direction lock IDLE", gpt["currentState"])
        self.assertTrue(
            any(
                component["commit"] == "e868c3bfcc80ea96cc5af33432874b02a95c2b8d"
                and "CURRENT_VERIFIED" in component["status"]
                for component in gpt["relatedComponents"]
            )
        )

    def test_profile_3_uncertainty_and_scope_boundaries(self) -> None:
        for system_id in ("claude", "gemini"):
            system = self.by_id[system_id]
            self.assertIn("direct independent Memory 638 retrieval", system["currentState"])
            self.assertIsNone(system["counts"]["memory"]["value"])
            self.assertIn("未確認", system["counts"]["memory"]["reason"])
        fable = self.by_id["fable-batch"]
        self.assertEqual(fable["status"], "RUNTIME_UNVERIFIED")
        self.assertIsNone(fable["currentGeneration"])
        self.assertIn("FABLE_G003", fable["generationStatus"])
        self.assertNotIn("FABLE_G002", fable["generationStatus"])
        self.assertIn("NOT_RUNTIME_PROOF", fable["relatedComponents"][0]["status"])
        self.assertIn(
            "FABLE_G003_IS_CATALOG_REFERENCE_ONLY",
            self.catalog["step22_current_frame"]["systems"]["fable-batch"],
        )
        r6 = self.by_id["r6"]
        receipt = self.by_id["receipt"]
        self.assertIn("RESERVED", r6["status"])
        self.assertIn("PARKED", r6["status"])
        r6_text = json.dumps(r6, ensure_ascii=False).lower()
        self.assertNotIn("failed", r6_text)
        self.assertNotIn("removed", r6_text)
        self.assertNotIn("fable", json.dumps(receipt, ensure_ascii=False).lower())
        self.assertIn("original-image policy", receipt["currentState"])

    def test_profile_4_read_only_data_and_semantic_equality(self) -> None:
        self.assertTrue(all(system["currentGeneration"] is None for system in self.systems))
        # TEST_OWNERSHIP_TRANSFER_FROM_STEP22_TO_STEP23 (NOBORU authorized):
        # step23Started / restoreNotice の工程23後の正確な値は
        # tests/test_step23_restore_candidates.py が厳密に検証する。
        # ここでは存在・型・非空の invariant だけを保持する。
        self.assertIn("step23Started", self.data)
        self.assertIsInstance(self.data["step23Started"], bool)
        self.assertIn("restoreNotice", self.data)
        self.assertIsInstance(self.data["restoreNotice"], str)
        self.assertTrue(self.data["restoreNotice"].strip())
        self.assertEqual(self.step_record["generationIdsCreated"], 0)
        self.assertFalse(self.step_record["step23Started"])
        self.assertFalse(self.step_record["productionRestoreActionAvailable"])
        combined_ui = f"{self.index}\n{self.app}"
        self.assertNotIn("simulate(", combined_ui)
        self.assertNotIn("ainoboru-restore://", combined_ui)
        self.assertNotIn("実際に復元する", combined_ui)
        prohibited = ("db", "wal", "shm", "cache", "secret", "token", "cookie")
        for system in self.systems:
            targets = " ".join(system["saveTargetsSummary"]).lower()
            for fragment in prohibited:
                self.assertNotIn(fragment, targets, f"{system['id']}: {fragment}")
        node_script = (
            "global.window={};"
            f"require({json.dumps(str(JS_DATA_PATH))});"
            "process.stdout.write(JSON.stringify(window.AINOBORU_DATA));"
        )
        result = subprocess.run(
            ["node", "-e", node_script],
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(json.loads(result.stdout), self.data)
        self.assertEqual(self.step_record["systemCount"], 8)
        self.assertEqual(self.step_record["systemNames"], EXPECTED_NAMES)
        self.assertEqual(self.step_record["candidateStatus"], "AWAITING_NOBORU_APPROVAL")
        self.assertEqual(self.step_record["gitWrites"], 0)
        self.assertEqual(self.step_record["publicationWrites"], 0)

    def test_profile_5_all_cards_and_modal_accessibility(self) -> None:
        self.assertIn("data.systems.map", self.app)
        self.assertIn('card.addEventListener("click"', self.app)
        self.assertIn('card.addEventListener("keydown"', self.app)
        self.assertIn('event.key === "Enter"', self.app)
        self.assertIn('event.key === " "', self.app)
        self.assertIn('event.key === "Escape"', self.app)
        self.assertIn('role="dialog"', self.index)
        self.assertIn('aria-modal="true"', self.index)
        for heading in (
            "世代状態",
            "GitHub写し",
            "件数",
            "関連commit / reference",
            "保存対象外",
            "未確認事項",
            "復元準備状態",
        ):
            self.assertIn(heading, f"{self.app}\n{self.index}")
        node_script = (
            f"const TEST_DATA={json.dumps(self.data, ensure_ascii=False)};"
            f"const APP_PATH={json.dumps(str(APP_PATH))};"
            f"{FOCUS_TRAP_HARNESS}"
        )
        result = subprocess.run(
            ["node", "-e", node_script],
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.stdout, "PASS")


if __name__ == "__main__":
    unittest.main(verbosity=2)
