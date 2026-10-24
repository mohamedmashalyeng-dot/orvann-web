import { gsap } from "./gsap";
import { motion } from "./config";

/**
 * Count Up (after React Bits' CountUp): the number runs from 0 to its value once, when it
 * scrolls into view. The page renders the final value, so it is right without JavaScript,
 * under reduced motion, and for screen readers (which read a hidden copy, not this one).
 */
export function countUp(element: HTMLElement): () => void {
  const to = Number(element.dataset.to);
  if (!Number.isFinite(to)) return () => {};
  const { duration, ease, start } = motion.count;
  const counter = { value: 0 };
  const show = () => {
    element.textContent = String(Math.round(counter.value));
  };

  show();
  gsap.to(counter, {
    value: to,
    duration,
    ease,
    onUpdate: show,
    scrollTrigger: { trigger: element, start, once: true },
  });
  return () => {
    element.textContent = String(to);
  };
}
