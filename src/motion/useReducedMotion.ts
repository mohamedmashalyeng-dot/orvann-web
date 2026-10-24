"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const current = () => window.matchMedia(QUERY).matches;
// The server cannot know: it renders the reduced (static) version, and motion joins after hydration.
const onServer = () => true;

/** Whether the visitor asks for reduced motion; follows the setting if it changes. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, current, onServer);
}
