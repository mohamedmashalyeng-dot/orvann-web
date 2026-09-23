"use client";

import { useEffect, type RefObject } from "react";

export type MotionRuntime = typeof import("./runtime");
export type MotionSetup<T extends HTMLElement> = (runtime: MotionRuntime, element: T) => void | (() => void);

let runtime: Promise<MotionRuntime> | null = null;

/** Loads GSAP and the motion builders once, on demand. */
export function loadMotion(): Promise<MotionRuntime> {
  runtime ??= import("./runtime");
  return runtime;
}

/** Runs `task` when the main thread is idle (or soon after, at the latest). */
export function whenIdle(task: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(task, { timeout: 2000 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(task, 200);
  return () => window.clearTimeout(handle);
}

/**
 * Attaches motion to an element without putting animation code on the critical path:
 * the runtime loads in idle time, `setup` runs inside a gsap.context scoped to the
 * element, and everything it created — tweens, ScrollTriggers, matchMedia, listeners
 * returned from setup — is reverted on unmount. Safe under StrictMode double effects.
 *
 * Pass a stable `setup` (defined at module level) so the effect runs once per mount.
 */
export function useMotion<T extends HTMLElement>(ref: RefObject<T | null>, setup: MotionSetup<T>): void {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let active = true;
    let revert: (() => void) | undefined;

    const cancelIdle = whenIdle(() => {
      loadMotion()
        .then((motion) => {
          if (!active) return;
          let cleanup: void | (() => void);
          const context = motion.gsap.context(() => {
            cleanup = setup(motion, element);
          }, element);
          revert = () => {
            cleanup?.();
            context.revert();
          };
        })
        .catch(() => {
          // If the runtime can't load, the page simply stays static — all content is visible.
        });
    });

    return () => {
      active = false;
      cancelIdle();
      revert?.();
    };
  }, [ref, setup]);
}
