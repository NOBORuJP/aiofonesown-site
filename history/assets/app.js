(() => {
  "use strict";

  const data = window.AINOBORU_DATA;
  const q = (selector) => document.querySelector(selector);
  const qa = (selector) => [...document.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const systemGrid = q("#system-grid");
  const sideSystems = q("#side-systems");
  const pageShell = q(".shell");
  const backdrop = q("#modal-backdrop");
  const modal = q("#system-modal");
  const modalContent = q("#modal-content");
  const modalClose = q("#modal-close");
  const modalFocusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  let returnFocus = null;

  function display(value, fallback = "未確立") {
    return value === null || value === undefined || value === "" ? fallback : value;
  }

  function renderList(items, emptyText = "なし") {
    if (!items || items.length === 0) {
      return `<p class="empty-value">${esc(emptyText)}</p>`;
    }
    return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
  }

  function renderCounts(system) {
    const labels = {
      memory: "Memory",
      prompt: "Prompt",
      rag: "RAG",
      settings: "Settings"
    };
    const countRows = Object.entries(labels).map(([key, label]) => {
      const count = system.counts[key];
      const value = count.value === null ? "未確認" : count.value;
      const maxId = count.maxId === undefined ? "" : ` / max ID ${esc(count.maxId)}`;
      const reason = count.reason ? `<small>${esc(count.reason)}</small>` : "";
      return `<div class="detail-metric"><span>${esc(label)}</span><strong>${esc(value)}${maxId}</strong>${reason}</div>`;
    }).join("");

    const operational = system.operationalCounts
      ? `<div class="operational-counts">
          <h4>Desktop recovered counts</h4>
          <div class="detail-metrics">
            ${Object.entries(system.operationalCounts).map(([key, value]) =>
              `<div class="detail-metric"><span>${esc(key)}</span><strong>${esc(value)}</strong></div>`
            ).join("")}
          </div>
        </div>`
      : "";

    return `<div class="detail-metrics">${countRows}</div>${operational}`;
  }

  function renderComponents(components) {
    if (!components.length) {
      return '<p class="empty-value">確認済みのrepository / commit bindingなし</p>';
    }
    return `<div class="component-list">${components.map((component) => `
      <div class="component-row">
        <strong>${esc(display(component.repository, "repository名未確立"))}</strong>
        <code>${esc(component.commit)}</code>
        <span>${esc(component.status)}</span>
      </div>`).join("")}</div>`;
  }

  function openSystem(system, trigger) {
    returnFocus = trigger || document.activeElement;
    modalContent.innerHTML = `
      <span class="eyebrow">Current state detail</span>
      <h2 id="modal-title">${esc(system.name)}</h2>
      <div class="detail-status-line">
        <span class="pill ${esc(system.tone)}">${esc(system.status)}</span>
        <span>確度: ${esc(system.currentStateConfidence)}</span>
      </div>
      <section class="modal-section">
        <h3>現在状態</h3>
        <p>${esc(system.currentState)}</p>
        <p>${esc(system.summary)}</p>
      </section>
      <div class="detail-facts">
        <div><span>現在世代</span><strong>${esc(display(system.currentGeneration))}</strong></div>
        <div><span>世代状態</span><strong>${esc(system.generationStatus)}</strong></div>
        <div><span>GitHub写し</span><strong>${esc(system.githubCopyStatus)}</strong></div>
        <div><span>最終確認時刻</span><strong>${esc(display(system.lastVerifiedAt, "時刻記録なし"))}</strong></div>
      </div>
      <section class="modal-section">
        <h3>件数</h3>
        ${renderCounts(system)}
      </section>
      <section class="modal-section">
        <h3>関連commit / reference</h3>
        ${renderComponents(system.relatedComponents)}
      </section>
      <div class="detail-columns">
        <section class="modal-section">
          <h3>保存対象の概要</h3>
          ${renderList(system.saveTargetsSummary)}
        </section>
        <section class="modal-section">
          <h3>保存対象外</h3>
          ${renderList(system.excludedTargetsSummary)}
        </section>
      </div>
      <section class="modal-section">
        <h3>未確認事項</h3>
        ${renderList(system.unresolvedItems)}
      </section>
      <section class="restore-readiness" aria-label="復元準備状態">
        <h3>復元準備状態</h3>
        <span>${esc(system.restoreReadiness.status)}</span>
        <strong>${esc(system.restoreReadiness.summary)}</strong>
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
    const system = data.systems.find((item) => item.id === card.dataset.system);
    if (system) {
      openSystem(system, card);
    }
  }

  function renderSystems() {
    systemGrid.innerHTML = data.systems.map((system) => `
      <article
        class="system-card"
        data-system="${esc(system.id)}"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        aria-controls="system-modal"
        aria-label="${esc(system.name)}の詳細を開く"
      >
        <div class="system-head">
          <h3>${esc(system.name)}</h3>
          <span class="pill ${esc(system.tone)}">${esc(system.status)}</span>
        </div>
        <p>${esc(system.summary)}</p>
        <div class="system-foot">
          <span>現在世代: ${esc(display(system.currentGeneration))}</span>
          <span>確度: ${esc(system.currentStateConfidence)}</span>
        </div>
      </article>`).join("");

    sideSystems.innerHTML = data.systems.map((system) => `
      <button type="button" data-side="${esc(system.id)}" aria-label="${esc(system.name)}へ移動">
        <span><i class="dot ${esc(system.tone)}" aria-hidden="true"></i>${esc(system.short)}</span>
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

  modalClose.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    trapModalFocus(event);
    if (event.key === "Escape") {
      closeModal();
    }
  });

  renderSystems();
})();
