"use client";

import { useRef, type ReactNode } from "react";
import { useMotion, type MotionSetup } from "@/motion/useMotion";

type Props = {
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  children: ReactNode;
};

const setupProgress: MotionSetup<HTMLDivElement> = ({ gsap, conditions, trackStepProgress }, root) => {
  const bar = root.querySelector<HTMLElement>("[data-progress-bar]");
  if (!bar) return;
  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
  const mm = gsap.matchMedia();
  mm.add(`(min-width: 64em) and ${conditions.motion}`, () => trackStepProgress(root, bar, steps));
  return () => mm.revert();
};

/**
 * Wraps a numbered sequence (children marked data-step) with a progress line that
 * follows scroll — desktop only, and off under reduced motion. Elsewhere the steps
 * simply read top to bottom.
 */
export function StepsProgress({ className, trackClassName, barClassName, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  useMotion(rootRef, setupProgress);

  return (
    <div ref={rootRef} className={className}>
      <div className={trackClassName} aria-hidden="true">
        <span className={barClassName} data-progress-bar="" />
      </div>
      {children}
    </div>
  );
}
