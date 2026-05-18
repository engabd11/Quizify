import React from "react";
import { createRoot } from "react-dom/client";
import { AdminApp } from "./components/AdminApp";
import { PlayerApp } from "./components/PlayerApp";

function boot() {
  const root = document.getElementById("quizify-root");
  if (!root) {
    console.error("Quizify: root element not found");
    return;
  }
  const view = root.dataset.view || "admin";
  const joinCode = root.dataset.joinCode || "";
  const reactRoot = createRoot(root);
  if (view === "player") {
    reactRoot.render(<PlayerApp initialJoinCode={joinCode} />);
  } else {
    reactRoot.render(<AdminApp />);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
