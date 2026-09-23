/** Colour theme settings, shared by the head script, the toggle and metadata. */
export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "orvann-theme";

/** ORVANN's art direction is dark-first; visitors can switch and the choice is remembered. */
export const DEFAULT_THEME: Theme = "dark";

/** Browser UI colour (address bar etc.) for each theme. */
export const THEME_COLORS: Record<Theme, string> = { dark: "#0a0c12", light: "#f3f4f6" };

/**
 * Runs in <head> before first paint: applies the saved theme so the page never flashes
 * the wrong palette. Without JavaScript the server-rendered default (dark) applies.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t="${DEFAULT_THEME}";var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`;
