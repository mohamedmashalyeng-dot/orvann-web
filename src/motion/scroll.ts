import { gsap } from "./gsap";
import { motion } from "./config";

/**
 * Project imagery: as a frame scrolls in, it opens from a slightly inset clip while the
 * picture settles from a gentle zoom. Both end at the complete, uncropped image, so the
 * work itself is never obscured. Frames already on screen are left as they are.
 */
export function animateMediaFrame(frame: HTMLElement, inner: HTMLElement): void {
  if (frame.getBoundingClientRect().top < window.innerHeight * 0.85) return;

  const { clipInset, settleScale, duration } = motion.media;
  const scrollTrigger = { trigger: frame, start: motion.reveal.start, once: true };

  gsap.fromTo(
    frame,
    { clipPath: `inset(${clipInset}% ${clipInset}% ${clipInset}% ${clipInset}%)` },
    { clipPath: "inset(0% 0% 0% 0%)", duration, ease: motion.ease.out, scrollTrigger, clearProps: "clipPath" },
  );
  gsap.fromTo(
    inner,
    { scale: settleScale },
    { scale: 1, duration, ease: motion.ease.out, scrollTrigger, clearProps: "transform" },
  );
}

/**
 * A progress line that follows scroll through a numbered sequence, marking each step
 * as it is reached. Scrubbed to native scroll; nothing is pinned. Step state is written
 * to data attributes, not React state, so scrolling never re-renders anything.
 */
export function trackStepProgress(root: HTMLElement, bar: HTMLElement, steps: HTMLElement[]): () => void {
  const { start, end, scrub } = motion.progress;
  root.dataset.progress = "on";

  gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start,
        end,
        scrub,
        onUpdate: ({ progress }) => {
          const reached = progress === 0 ? -1 : Math.min(steps.length - 1, Math.floor(progress * steps.length));
          steps.forEach((step, index) => step.toggleAttribute("data-active", index <= reached));
        },
      },
    },
  );

  return () => {
    delete root.dataset.progress;
    steps.forEach((step) => step.removeAttribute("data-active"));
  };
}
