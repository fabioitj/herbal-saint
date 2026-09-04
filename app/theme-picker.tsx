"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "system" | "dark";

function setDocumentTheme(theme: Theme) {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = theme === "system" ? (dark ? "dark" : "light") : theme;
}

export function ThemePicker() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = (localStorage.getItem("herbal-saint-theme") as Theme | null) ?? "system";
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setDocumentTheme((localStorage.getItem("herbal-saint-theme") as Theme | null) ?? "system");
    setTheme(saved);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function choose(next: Theme) {
    localStorage.setItem("herbal-saint-theme", next);
    setTheme(next);
    setDocumentTheme(next);
  }

  return (
    <div className="theme-picker" aria-label="Escolher tema">
      <button type="button" className={theme === "light" ? "active" : ""} onClick={() => choose("light")} aria-label="Tema claro" aria-pressed={theme === "light"} title="Tema claro">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
      </button>
      <button type="button" className={theme === "system" ? "active" : ""} onClick={() => choose("system")} aria-label="Usar tema do sistema" aria-pressed={theme === "system"} title="Tema do sistema">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      </button>
      <button type="button" className={theme === "dark" ? "active" : ""} onClick={() => choose("dark")} aria-label="Tema escuro" aria-pressed={theme === "dark"} title="Tema escuro">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"/></svg>
      </button>
    </div>
  );
}
