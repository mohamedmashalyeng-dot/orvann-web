import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { motion } from "./config";

/**
 * Smooth wheel scrolling (Lenis), driven by GSAP's ticker so Lenis and every ScrollTrigger
 * move on the same frame. Touch keeps the device's own scrolling. Same-page links still
 * jump natively (focus moves with them, as the skip link needs); Lenis follows along. The
 * mobile menu's scroll lock (html.menu-open) pauses it.
 */
export function startSmoothScroll(): () => void {
  const lenis = new Lenis({ lerp: motion.smooth.lerp, wheelMultiplier: motion.smooth.wheelMultiplier, autoRaf: false });
  lenis.on("scroll", ScrollTrigger.update);

  const tick = (seconds: number) => lenis.raf(seconds * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const root = document.documentElement;
  let locked = false;
  const lockWithMenu = new MutationObserver(() => {
    const menuOpen = root.classList.contains("menu-open");
    if (menuOpen === locked) return;
    locked = menuOpen;
    if (menuOpen) lenis.stop();
    else lenis.start();
  });
  lockWithMenu.observe(root, { attributes: true, attributeFilter: ["class"] });

  return () => {
    lockWithMenu.disconnect();
    gsap.ticker.remove(tick);
    // GSAP's defaults, as they were before Lenis took over the ticker.
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
  };
}
