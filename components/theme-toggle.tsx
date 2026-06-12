"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themeKey = "konnected-theme";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(themeKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(themeKey, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-navy/10 bg-white px-3 text-sm font-bold text-navy shadow-sm hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white ${
        compact ? "min-w-11 justify-center" : ""
      }`}
    >
      {dark ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-purple" />}
      {!compact && <span>{dark ? "Light" : "Dark"}</span>}
    </button>
  );
}
