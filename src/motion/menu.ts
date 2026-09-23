import { gsap } from "./gsap";
import { motion } from "./config";

const items = (panel: HTMLElement) => panel.querySelectorAll<HTMLElement>("[data-menu-item]");

/** Panel wipes down from under the header bar; links follow in a short stagger. */
export function animateMenuOpen(panel: HTMLElement): gsap.core.Timeline {
  const { open, stagger, distance } = motion.menu;
  return gsap
    .timeline()
    .fromTo(
      panel,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: open, ease: motion.ease.inOut },
    )
    .fromTo(
      items(panel),
      { opacity: 0, y: distance },
      { opacity: 1, y: 0, duration: open, stagger, ease: motion.ease.out },
      open * 0.35,
    );
}

/** Faster than opening: links fade first, then the panel lifts away. */
export function animateMenuClose(panel: HTMLElement, onComplete: () => void): gsap.core.Timeline {
  const { close } = motion.menu;
  return gsap
    .timeline({ onComplete })
    .to(items(panel), { opacity: 0, y: -8, duration: close * 0.6, stagger: 0.02, ease: "power2.in" })
    .to(panel, { clipPath: "inset(0% 0% 100% 0%)", duration: close, ease: motion.ease.inOut }, close * 0.3);
}
