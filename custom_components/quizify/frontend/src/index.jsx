/**
 * Quizify bundle entrypoint.
 *
 * The same bundle is loaded in two very different contexts:
 *
 * 1. As an HA *custom panel*. The HA frontend imports this module while
 *    authenticated, finds the `<quizify-panel>` custom element, and
 *    instantiates it inside the main app shell. It then assigns the
 *    authenticated `hass` object onto the element as a property.
 *
 * 2. As the script tag on the public guest page (`/quizify/play?code=CODE`).
 *    Here there's no custom element instantiation — we just look for the
 *    `<div id="quizify-root" data-view="player">` and render the player
 *    React tree into it.
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { AdminApp } from "./components/AdminApp";
import { PlayerApp } from "./components/PlayerApp";
import quizifyCss from "./styles/quizify.css";

// ---- shared CSS injection ---------------------------------------------------
// The CSS file is bundled as a string via esbuild's `--loader:.css=text` and
// injected once per document (or once per shadow root).

let _globalCssInjected = false;
function injectGlobalCss() {
  if (_globalCssInjected) return;
  _globalCssInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-quizify", "");
  style.textContent = quizifyCss;
  document.head.appendChild(style);
}

// ---- custom element for the HA admin panel ---------------------------------

class QuizifyPanel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._narrow = false;
    this._root = null;
    this._mountPoint = null;
  }

  set hass(value) {
    this._hass = value;
    this._render();
  }

  get hass() {
    return this._hass;
  }

  set narrow(value) {
    this._narrow = value;
    this._render();
  }

  set route(_value) {
    // Unused.
  }

  set panel(_value) {
    // Unused.
  }

  connectedCallback() {
    // The HA frontend instantiates custom elements without shadow DOM by
    // default. We attach our own shadow so our CSS can't leak into HA
    // (and HA's can't leak into us). Fonts and root-level CSS variables
    // still cascade in, which is desirable.
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = quizifyCss;
      shadow.appendChild(style);
      const host = document.createElement("div");
      host.className = "qz-shadow-host";
      shadow.appendChild(host);
      this._mountPoint = host;
      this._root = createRoot(host);
    }
    this._render();
  }

  disconnectedCallback() {
    if (this._root) {
      // Defer unmount to avoid React errors when HA moves the element
      // during navigation.
      queueMicrotask(() => {
        try {
          this._root.unmount();
        } catch {
          // swallow
        }
        this._root = null;
      });
    }
  }

  _render() {
    if (!this._root) return;
    this._root.render(
      <AdminApp hass={this._hass} narrow={this._narrow} />
    );
  }
}

if (!customElements.get("quizify-panel")) {
  customElements.define("quizify-panel", QuizifyPanel);
}

// ---- public player page boot -----------------------------------------------

function readJoinCodeFromUrl() {
  // Primary source of truth, mirroring beatify's pattern: ?code=ABCDEF.
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = (params.get("code") || "").toUpperCase();
    const cleaned = fromQuery.replace(/[^A-Z0-9]/g, "").slice(0, 6);
    if (cleaned) return cleaned;
  } catch {
    // URLSearchParams or location may be unavailable in odd embed contexts.
  }
  return "";
}

function bootPlayerPage() {
  const root = document.getElementById("quizify-root");
  if (!root) return;
  const view = root.dataset.view || "";
  if (view !== "player") return;
  // Prefer the query string; fall back to the server-rendered data attribute
  // for backward compatibility with very old printed QR codes.
  const joinCode = readJoinCodeFromUrl() || root.dataset.joinCode || "";
  injectGlobalCss();
  const reactRoot = createRoot(root);
  reactRoot.render(<PlayerApp initialJoinCode={joinCode} />);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPlayerPage);
  } else {
    bootPlayerPage();
  }
}
