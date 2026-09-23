"use client";

import { useRef, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { useMotion, type MotionSetup } from "@/motion/useMotion";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "header" | "aside";
  children: ReactNode;
};

const setupReveal: MotionSetup<HTMLElement> = ({ gsap, conditions, revealOnScroll }, root) => {
  const mm = gsap.matchMedia();
  mm.add(conditions.motion, () => {
    revealOnScroll(root);
  });
  return () => mm.revert();
};

/**
 * Wrap content to reveal it once on scroll. Mark children with data-reveal to stagger
 * them; otherwise the wrapper reveals as one. Skipped entirely under reduced motion.
 */
export function Reveal({ as: Tag = "div", children, ...props }: Props) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, setupReveal);

  return (
    // The ref type is widened because Tag is one of several intrinsic elements.
    <Tag ref={ref as RefObject<HTMLDivElement>} {...props}>
      {children}
    </Tag>
  );
}
