import { gsap } from "./gsap";
import { motion } from "./config";

/**
 * Restrained depth on devices with a fine pointer: layers drift by depth and the whole
 * graphic tilts. quickTo tweens only while the pointer moves — no render loop, no React
 * state — and the same tweens carry everything back to rest when the pointer leaves.
 */
export function attachPointerDepth(stage: HTMLElement, tiltTarget: HTMLElement): () => void {
  const { shift, tilt, duration, perspective, depths } = motion.pointer;
  const follow = { duration, ease: motion.ease.soft };

  gsap.set(tiltTarget, { transformPerspective: perspective });
  const rotateX = gsap.quickTo(tiltTarget, "rotationX", follow);
  const rotateY = gsap.quickTo(tiltTarget, "rotationY", follow);
  const layers = (Object.keys(depths) as Array<keyof typeof depths>).flatMap((name) => {
    const element = stage.querySelector(`[data-layer='${name}']`);
    if (!element) return [];
    return [{ depth: depths[name], x: gsap.quickTo(element, "x", follow), y: gsap.quickTo(element, "y", follow) }];
  });

  let bounds = stage.getBoundingClientRect();
  const measure = () => {
    bounds = stage.getBoundingClientRect();
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const nx = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const ny = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    layers.forEach((layer) => {
      layer.x(nx * shift * layer.depth);
      layer.y(ny * shift * layer.depth);
    });
    rotateY(nx * tilt);
    rotateX(-ny * tilt);
  };

  const onLeave = () => {
    layers.forEach((layer) => {
      layer.x(0);
      layer.y(0);
    });
    rotateX(0);
    rotateY(0);
  };

  stage.addEventListener("pointerenter", measure);
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerleave", onLeave);
  window.addEventListener("scroll", measure, { passive: true });
  window.addEventListener("resize", measure);

  return () => {
    stage.removeEventListener("pointerenter", measure);
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("scroll", measure);
    window.removeEventListener("resize", measure);
  };
}

/**
 * Hero → next section: decorative layers drift up and recede as the hero scrolls away.
 * Scrubbed to native scroll; nothing is pinned and no text moves.
 */
export function createHeroExit(stage: HTMLElement, graphicWrap: HTMLElement): gsap.core.Timeline {
  const { graphicY, graphicScale, graphicOpacity, gridY, scrub } = motion.heroExit;
  const grid = stage.querySelector("[data-part='grid']");

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub },
  });
  tl.to(graphicWrap, { yPercent: graphicY, scale: graphicScale, opacity: graphicOpacity }, 0);
  if (grid) tl.to(grid, { y: gridY }, 0);
  return tl;
}
