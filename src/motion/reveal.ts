import { gsap } from "./gsap";
import { motion } from "./config";
import { revealSplitHeading } from "./text";

/**
 * Reveals [data-reveal] children of `root` (or root itself) once, as it scrolls into
 * view. Content is only hidden by the tween itself, so it stays visible without JS
 * (print styles in globals.css also force it visible).
 */
export function revealOnScroll(root: HTMLElement): (() => void) | undefined {
  // Headings marked data-split get the word-by-word reveal instead.
  const splits = Array.from(root.querySelectorAll<HTMLElement>("[data-split]")).map(revealSplitHeading);
  const cleanup = () => splits.forEach((revert) => revert());

  // Motion loads lazily: anything already on screen (or scrolled past) by then is left
  // alone — never hidden again just so it can be animated in.
  if (root.getBoundingClientRect().top < window.innerHeight * 0.85) return cleanup;

  const marked = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  const targets = marked.length > 0 ? marked : [root];
  const { duration, distance, stagger, start } = motion.reveal;

  gsap.from(targets, {
    opacity: 0,
    y: distance,
    duration,
    stagger,
    ease: motion.ease.out,
    // Hand styling back to CSS afterwards (e.g. the Approach steps' progress states).
    clearProps: "opacity,transform",
    scrollTrigger: { trigger: root, start, once: true },
  });
  return cleanup;
}
