(() => {
  "use strict";

  const q = (selector) => document.querySelector(selector);
  const qa = (selector) => [...document.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function toneFor(state) {
    return {
      "確認済み": "success",
      "一部確認": "warning",
      "未接続": "neutral",
      "保留": "hold"
    }[state] || "neutral";
  }

  function display(value, fallback = "未確立") {
    return value === null || value === undefined || value === "" ? fallback : value;
  }

  function validatedCatalog(data) {
    const catalog = window.AINOBORU_GENERATION_CATALOG;
    if (!catalog) {
      throw new Error("世代catalogが読み込まれていません");
    }
    if (!Array.isArray(catalog.systems)) {
      throw new Error("世代catalogのsystemsが不正です");
    }
    if (!Array.isArray(data.frames)) {
      throw new Error("mapping sourceのframesが不正です");
    }

    const catalogById = new Map(catalog.systems.map((system) => [system.id, system]));
    const missingIds = [...new Set(data.frames
      .map((frame) => frame.generationCatalogSystemId)
      .filter((systemId) => !systemId || !catalogById.has(systemId)))];
    if (missingIds.length > 0) {
      throw new Error(`世代catalogの参照先が不足しています: ${missingIds.join(", ")}`);
    }
    return catalogById;
  }

  function start(data) {
    const catalogById = validatedCatalog(data);
    const systemGrid = q("#system-grid");
    const sideSystems = q("#side-systems");
    const pageShell = q(".shell");
    const backdrop = q("#modal-backdrop");
    const modal = q("#system-modal");
    const modalContent = q("#modal-content");
    const modalClose = q("#modal-close");
    const crossReference = q("#cross-reference");
    const modalFocusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(",");
    let returnFocus = null;

    function generationFor(frame) {
      return catalogById.get(frame.generationCatalogSystemId);
    }

    function renderList(items, emptyText = "なし") {
      if (!items || items.length === 0) {
        return `<p class="empty-value">${esc(emptyText)}</p>`;
      }
      return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
    }

    function renderReferenceStates(frame) {
      const labels = {
        memory: "Memory",
        prompt: "Prompt",
        rag: "RAG",
        settings: "設定"
      };
      return `<div class="reference-state-grid">${Object.entries(labels).map(([key, label]) => {
        const state = frame.referenceStates[key];
        return `<div><span>${esc(label)}</span><strong class="state-text ${toneFor(state)}">${esc(state)}</strong></div>`;
      }).join("")}</div>`;
    }

    function renderRepositories(frame) {
      return `<div class="repository-list">${frame.repositoryBindings.map((binding) => {
        const repository = data.repositories[binding.repositoryId];
        return `
          <div class="repository-row">
            <div>
              <strong>${esc(repository.name)}</strong>
              <span>${esc(repository.roleJa)}</span>
            </div>
            <dl>
              <div><dt>管理対象path</dt><dd><code>${esc(binding.path)}</code></dd></div>
              <div><dt>source_ref / commit</dt><dd><code>${esc(display(binding.sourceRef, "未確認"))}</code></dd></div>
              <div><dt>確認状態</dt><dd><span class="state-text ${toneFor(binding.confirmationState)}">${esc(binding.confirmationState)}</span></dd></div>
              <div><dt>GitHub写し</dt><dd>${esc(repository.githubCopyStatus)}</dd></div>
            </dl>
            <p>${esc(binding.note)}</p>
          </div>`;
      }).join("")}</div>`;
    }

    function renderGenerations(frame) {
      const generation = generationFor(frame);
      if (!generation.generations || generation.generations.length === 0) {
        return '<p class="empty-value">確立済み世代なし。世代IDは生成していません。</p>';
      }
      return `<ol class="generation-list">${generation.generations.map((item) => `
        <li class="${item.current ? "current" : ""}">
          <div>
            <strong>${esc(item.generation)}</strong>
            <span>${item.current ? "現在世代" : "過去世代"}</span>
          </div>
          <code>${esc(item.source_ref)}</code>
          <small>${esc(item.title)}</small>
        </li>`).join("")}</ol>`;
    }

    function openSystem(frame, trigger) {
      const generation = generationFor(frame);
      returnFocus = trigger || document.activeElement;
      modalContent.innerHTML = `
        <span class="eyebrow">Frame → repository → generation</span>
        <h2 id="modal-title">第${esc(frame.slot)}枠　${esc(frame.nameJa)}</h2>
        <div class="detail-status-line">
          <span class="pill ${toneFor(frame.mappingState)}">${esc(frame.mappingState)}</span>
          <span>systemId: <code>${esc(frame.systemId)}</code></span>
        </div>
        <section class="modal-section">
          <h3>現在状態</h3>
          <p>${esc(frame.currentState)}</p>
        </section>
        <div class="detail-facts">
          <div><span>現在世代</span><strong>${esc(display(generation.current_generation, "確立済み世代なし"))}</strong></div>
          <div><span>世代履歴数</span><strong>${esc(generation.generations.length)}</strong></div>
          <div><span>対応状態</span><strong>${esc(frame.mappingState)}</strong></div>
          <div><span>GitHub写し状態</span><strong>${esc(frame.githubCopyStatus)}</strong></div>
        </div>
        <section class="modal-section">
          <h3>世代履歴</h3>
          ${renderGenerations(frame)}
          <p class="principle">${esc(data.generationCatalog.principle)}</p>
        </section>
        <section class="modal-section">
          <h3>Memory / Prompt / RAG / 設定の参照状態</h3>
          ${renderReferenceStates(frame)}
        </section>
        <section class="modal-section memory-export-detail">
          <h3>Memory export状態</h3>
          <strong>${esc(data.memoryExport.displayStatus)}</strong>
          <p>633 records / max ID 640。現在Memoryは少なくともID 653まで存在。${esc(data.memoryExport.synchronization)}。</p>
          <code>${esc(data.memoryExport.path)}</code>
        </section>
        <section class="modal-section">
          <h3>関連repository / path / commit / source_ref</h3>
          ${renderRepositories(frame)}
        </section>
        <section class="modal-section">
          <h3>未確認事項</h3>
          ${renderList(frame.unverifiedItems)}
        </section>`;

      backdrop.hidden = false;
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      pageShell.inert = true;
      pageShell.setAttribute("inert", "");
      document.body.classList.add("modal-open");
      modalClose.focus();
    }

    function getModalFocusableElements() {
      return [...modal.querySelectorAll(modalFocusableSelector)]
        .filter((element) => !element.closest("[hidden]"));
    }

    function trapModalFocus(event) {
      if (modal.hidden || event.key !== "Tab") {
        return;
      }
      const focusableElements = getModalFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        modal.focus();
        return;
      }
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const focusIsOutside = !modal.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || focusIsOutside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || focusIsOutside)) {
        event.preventDefault();
        first.focus();
      }
    }

    function closeModal() {
      if (modal.hidden) {
        return;
      }
      modal.hidden = true;
      backdrop.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      pageShell.inert = false;
      pageShell.removeAttribute("inert");
      document.body.classList.remove("modal-open");
      returnFocus?.focus();
      returnFocus = null;
    }

    function activateCard(card) {
      const frame = data.frames.find((item) => item.systemId === card.dataset.system);
      if (frame) {
        openSystem(frame, card);
      }
    }

    function renderSystems() {
      systemGrid.innerHTML = data.frames.map((frame) => {
        const generation = generationFor(frame);
        return `
          <article
            class="system-card"
            data-system="${esc(frame.systemId)}"
            role="button"
            tabindex="0"
            aria-haspopup="dialog"
            aria-controls="system-modal"
            aria-label="第${esc(frame.slot)}枠 ${esc(frame.nameJa)}の詳細を開く"
          >
            <div class="slot-label">第${esc(frame.slot)}枠</div>
            <div class="system-head">
              <h3>${esc(frame.nameJa)}</h3>
              <span class="pill ${toneFor(frame.mappingState)}">${esc(frame.mappingState)}</span>
            </div>
            <p>${esc(frame.currentState)}</p>
            <div class="system-foot">
              <span>現在世代</span>
              <strong>${esc(display(generation.current_generation, "確立済みなし"))}</strong>
            </div>
          </article>`;
      }).join("");

      sideSystems.innerHTML = data.frames.map((frame) => `
        <button type="button" data-side="${esc(frame.systemId)}" aria-label="${esc(frame.nameJa)}へ移動">
          <span><i class="dot ${toneFor(frame.mappingState)}" aria-hidden="true"></i>第${esc(frame.slot)}枠 ${esc(frame.shortName)}</span>
          <span aria-hidden="true">›</span>
        </button>`).join("");

      qa("[data-system]").forEach((card) => {
        card.addEventListener("click", () => activateCard(card));
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateCard(card);
          }
        });
      });

      qa("[data-side]").forEach((button) => {
        button.addEventListener("click", () => {
          const card = q(`[data-system="${button.dataset.side}"]`);
          card?.scrollIntoView({ behavior: "smooth", block: "center" });
          card?.focus();
        });
      });
    }

    function renderCrossReferences() {
      if (!crossReference) {
        return;
      }
      crossReference.innerHTML = Object.values(data.crossReferences).map((index) => `
        <section class="cross-panel">
          <div>
            <span class="eyebrow">第${esc(index.indexNumber)} 横断索引</span>
            <h3>${esc(index.title)}</h3>
            <p>${esc(index.summary)}</p>
          </div>
          <div class="cross-frame-states">${data.frames.map((frame) => {
            const state = index.frameStates[frame.systemId];
            return `<span><b>第${esc(frame.slot)}枠</b><i class="${toneFor(state)}">${esc(state)}</i></span>`;
          }).join("")}</div>
        </section>`).join("");
    }

    modalClose.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (event) => {
      trapModalFocus(event);
      if (event.key === "Escape") {
        closeModal();
      }
    });

    renderSystems();
    renderCrossReferences();
  }

  function showLoadError(error) {
    const grid = q("#system-grid");
    if (grid) {
      grid.innerHTML = `<p class="load-error">データを読み込めません: ${esc(error.message)}</p>`;
    }
  }

  function boot(data) {
    try {
      start(data);
    } catch (error) {
      showLoadError(error);
    }
  }

  if (window.AINOBORU_DATA) {
    boot(window.AINOBORU_DATA);
  } else {
    fetch(window.AINOBORU_DATA_SOURCE, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(boot)
      .catch(showLoadError);
  }
})();
