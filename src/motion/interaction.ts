import { gsap, Flip, ScrollTrigger } from "./gsap";
import { motion } from "./config";

/**
 * Marquee bands run on a CSS animation (so they move without JavaScript). Once motion
 * loads, scroll velocity speeds them up — and scrolling back up runs them backwards —
 * before they ease back to cruising speed.
 */
export function driveMarqueeWithScroll(track: HTMLElement): () => void {
  const animation = track.getAnimations()[0];
  if (!animation) return () => {};
  const state = { rate: 1 };
  let direction = 1;
  const apply = () => {
    animation.playbackRate = state.rate;
  };
  const settle = gsap.quickTo(state, "rate", { duration: motion.marquee.settle, ease: "power3.out", onUpdate: apply });

  const trigger = ScrollTrigger.create({
    trigger: track,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      direction = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / motion.marquee.velocityDivisor, motion.marquee.maxBoost);
      state.rate = direction * (1 + boost);
      apply();
      settle(direction);
    },
  });

  return () => {
    trigger.kill();
    animation.playbackRate = 1;
  };
}

/**
 * Magnetic controls: anything marked [data-magnetic] pulls its [data-magnetic-inner]
 * toward the pointer. One delegated listener serves every page (links added after a
 * route change included); the element itself — the click target — never moves.
 */
export function attachMagnetic(): () => void {
  const { strength, max, duration } = motion.magnetic;
  const movers = new WeakMap<Element, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>();
  let current: HTMLElement | null = null;

  const moverFor = (inner: Element) => {
    let mover = movers.get(inner);
    if (!mover) {
      mover = {
        x: gsap.quickTo(inner, "x", { duration, ease: motion.ease.soft }),
        y: gsap.quickTo(inner, "y", { duration, ease: motion.ease.soft }),
      };
      movers.set(inner, mover);
    }
    return mover;
  };

  const release = (element: HTMLElement | null) => {
    const inner = element?.querySelector("[data-magnetic-inner]");
    if (!inner) return;
    const mover = moverFor(inner);
    mover.x(0);
    mover.y(0);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const target = (event.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
    if (target !== current) {
      release(current);
      current = target;
    }
    if (!target) return;
    const inner = target.querySelector("[data-magnetic-inner]");
    if (!inner) return;
    const rect = target.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    const mover = moverFor(inner);
    mover.x(gsap.utils.clamp(-max, max, dx));
    mover.y(gsap.utils.clamp(-max, max, dy));
  };

  const onLeaveWindow = () => {
    release(current);
    current = null;
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeaveWindow);
  return () => {
    document.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    release(current);
  };
}

/** Projects index: capture layout before a filter change… */
export function captureLayout(grid: HTMLElement): Flip.FlipState {
  return Flip.getState(grid.querySelectorAll("[data-project]"));
}

/** …then glide the remaining cards to their new places and bring newcomers in. */
export function animateLayout(state: Flip.FlipState): gsap.core.Timeline {
  const { duration, stagger } = motion.flip;
  return Flip.from(state, {
    duration,
    ease: motion.ease.inOut,
    absolute: true,
    stagger: 0.02,
    onEnter: (elements) =>
      gsap.fromTo(elements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration, stagger, ease: motion.ease.out }),
  });
}

/** Footer signature: the full-width logo rises out of a mask as you reach the bottom. */
export function revealSignature(signature: HTMLElement): void {
  gsap.fromTo(
    signature,
    { clipPath: "inset(100% 0% 0% 0%)", yPercent: 20 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: signature, start: "top bottom", end: "bottom bottom", scrub: 0.5 },
    },
  );
}
