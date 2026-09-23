"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useMotion, type MotionSetup } from "@/motion/useMotion";

/** Pointer depth (fine pointers only) and the scroll transition; off for reduced motion. */
const setupHero: MotionSetup<HTMLElement> = ({ gsap, conditions, attachPointerDepth, createHeroExit }, stage) => {
  const graphicWrap = stage.querySelector<HTMLElement>("[data-hero-graphic]");
  if (!graphicWrap) return;

  const mm = gsap.matchMedia();
  mm.add({ motion: conditions.motion, fine: conditions.finePointer }, (context) => {
    const { motion, fine } = context.conditions as { motion: boolean; fine: boolean };
    if (!motion) return;
    createHeroExit(stage, graphicWrap);
    const detach = fine ? attachPointerDepth(stage, graphicWrap) : undefined;
    return () => detach?.();
  });
  return () => mm.revert();
};

/**
 * Client shell for the hero. Renders the <section> (children stay server-rendered) and
 * attaches the hero's scripted motion once the motion runtime has loaded. The entrance
 * itself is CSS, so it runs at first paint without waiting for any of this.
 */
export function HeroStage({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const stageRef = useRef<HTMLElement>(null);
  useMotion(stageRef, setupHero);

  return (
    <section ref={stageRef} data-hero-stage="" {...props}>
      {children}
    </section>
  );
}
