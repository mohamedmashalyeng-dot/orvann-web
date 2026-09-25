"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMotion, type MotionSetup } from "@/motion/useMotion";
import styles from "./Marquee.module.css";

type Props = {
  children: ReactNode;
  /**
   * The repeated copy that makes the loop seamless (defaults to `children`). It is hidden
   * from assistive technology; pass a copy whose links are out of the tab order.
   */
  repeat?: ReactNode;
  /** Seconds per loop at cruising speed. */
  duration?: number;
  reverse?: boolean;
  /** Stop while the pointer is over the band or focus is inside it. */
  pauseOnHover?: boolean;
  /** With reduced motion, show the items wrapped onto rows instead of a still, clipped band. */
  wrapWhenStill?: boolean;
  className?: string;
};

const setupMarquee: MotionSetup<HTMLDivElement> = ({ gsap, conditions, driveMarqueeWithScroll }, root) => {
  const track = root.querySelector<HTMLElement>("[data-marquee-track]");
  if (!track) return;
  const mm = gsap.matchMedia();
  mm.add(conditions.motion, () => driveMarqueeWithScroll(track));
  return () => mm.revert();
};

/**
 * A continuous band. The loop is a CSS animation (it runs without JavaScript), paused
 * while off screen and off entirely for reduced motion. The content is decorative
 * repetition — pass aria-hidden content or label the region yourself.
 */
export function Marquee({ children, repeat, duration = 40, reverse, pauseOnHover, wrapWhenStill, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  useMotion(rootRef, setupMarquee);

  // Pause while off screen: no animation work nobody can see.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.marquee,
        reverse && styles.reverse,
        pauseOnHover && styles.pauseOnHover,
        wrapWhenStill && styles.wrapWhenStill,
        className,
      )}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className={styles.track} data-marquee-track="">
        <div className={styles.set}>{children}</div>
        <div className={cn(styles.set, styles.repeat)} aria-hidden="true">
          {repeat ?? children}
        </div>
      </div>
    </div>
  );
}
