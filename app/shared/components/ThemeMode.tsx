"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function ThemeMode() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const initial = (stored as Theme | null) ?? getSystemTheme();
    setTheme(initial);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [isReady, theme]);

  const nextTheme = useMemo(() => (theme === "dark" ? "light" : "dark"), [theme]);

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      className="fixed left-5 top-5 z-[120] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition hover:scale-[1.03]"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
