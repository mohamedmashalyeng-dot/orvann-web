"use client";

import { useRef } from "react";
import { useMotion, type MotionSetup } from "@/motion/useMotion";

const setupCount: MotionSetup<HTMLSpanElement> = ({ gsap, conditions, countUp }, element) => {
  const mm = gsap.matchMedia();
  mm.add(conditions.motion, () => countUp(element));
  return () => mm.revert();
};

/**
 * A number that counts up from 0 as it scrolls into view (Count Up, after React Bits;
 * GSAP runs it). The final value is in the HTML, and screen readers get it once, from a
 * hidden copy, never the digits in between. Skipped under reduced motion.
 */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotion(ref, setupCount);

  return (
    <>
      <span ref={ref} className={className} data-to={to} aria-hidden="true">
        {to}
      </span>
      <span className="visually-hidden">{to}</span>
    </>
  );
}
