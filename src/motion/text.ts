import { gsap, SplitText } from "./gsap";
import { motion } from "./config";

const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight * 0.85;

/**
 * Headings: words rise out of per-line masks as the heading scrolls into view. SplitText
 * re-splits on resize and font load (autoSplit) and keeps the heading readable to screen
 * readers (aria: "auto"). Headings already on screen when motion loads are left alone.
 */
export function revealSplitHeading(heading: HTMLElement): () => void {
  let played = inView(heading);
  const split = SplitText.create(heading, {
    type: "lines,words",
    mask: "lines",
    autoSplit: true,
    aria: "auto",
    onSplit(self) {
      if (played) return;
      return gsap.from(self.words, {
        yPercent: 110,
        duration: motion.split.duration,
        stagger: motion.split.stagger,
        ease: motion.ease.out,
        scrollTrigger: { trigger: heading, start: motion.reveal.start, once: true },
        onComplete: () => {
          played = true;
        },
      });
    },
  });
  return () => split.revert();
}

/**
 * Scroll-highlighted text: each word ([data-word]) brightens from the muted colour to the
 * full text colour as the paragraph passes through the viewport. Driven by a --p custom
 * property, so the colours stay theme-aware and every state keeps readable contrast.
 */
export function scrubWords(root: HTMLElement): void {
  const words = root.querySelectorAll<HTMLElement>("[data-word]");
  if (!words.length) return;
  gsap.fromTo(
    words,
    { "--p": 0 },
    {
      "--p": 1,
      ease: "none",
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: motion.scrub.start, end: motion.scrub.end, scrub: true },
    },
  );
}
