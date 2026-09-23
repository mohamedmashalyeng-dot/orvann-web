"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useMotion, type MotionSetup } from "@/motion/useMotion";

type Props = {
  /** Classes for the frame (sets its size) and the inner layer holding the picture. */
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const setupFrame: MotionSetup<HTMLDivElement> = ({ gsap, conditions, animateMediaFrame }, frame) => {
  const inner = frame.querySelector<HTMLElement>("[data-media-inner]");
  if (!inner) return;
  const mm = gsap.matchMedia();
  mm.add(conditions.motion, () => animateMediaFrame(frame, inner));
  return () => mm.revert();
};

/** Frame for project imagery: on entry it unclips and the picture settles to its full view. */
export function MediaFrame({ className, innerClassName, style, children }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  useMotion(frameRef, setupFrame);

  return (
    <div ref={frameRef} className={className} style={style}>
      <div className={innerClassName} data-media-inner="">
        {children}
      </div>
    </div>
  );
}
