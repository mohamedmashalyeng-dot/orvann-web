"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, type Theme } from "./theme";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const current = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const serverTheme = (): Theme => DEFAULT_THEME;

/** The page's colour theme (<html data-theme>), following the header toggle as it changes. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, current, serverTheme);
}

/**
 * A colour token's value (e.g. "--color-blue-400" → "#5899ff"), for drawing code that cannot
 * read CSS variables itself (canvas, WebGL). Call it on the client only.
 */
export function cssToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
