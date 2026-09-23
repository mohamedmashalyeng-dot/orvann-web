"use client";

import { useEffect } from "react";
import { loadMotion, whenIdle } from "@/motion/useMotion";

/**
 * Site-wide motion housekeeping, mounted once in the root layout:
 * - magnetic buttons (one delegated listener; fine pointers, motion allowed);
 * - every ScrollTrigger re-measures once web fonts have swapped in.
 */
export function MotionRuntime() {
  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;

    const cancelIdle = whenIdle(() => {
      Promise.all([loadMotion(), document.fonts?.ready])
        .then(([motion]) => {
          if (!active) return;
          motion.ScrollTrigger.refresh();
          const mm = motion.gsap.matchMedia();
          mm.add(`${motion.conditions.motion} and ${motion.conditions.finePointer}`, () => motion.attachMagnetic());
          cleanup = () => mm.revert();
        })
        .catch(() => {});
    });

    return () => {
      active = false;
      cancelIdle();
      cleanup?.();
    };
  }, []);

  return null;
}
