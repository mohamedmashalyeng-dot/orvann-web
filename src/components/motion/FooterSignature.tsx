"use client";

import { useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { useMotion, type MotionSetup } from "@/motion/useMotion";
import styles from "./FooterSignature.module.css";

const setupSignature: MotionSetup<HTMLDivElement> = ({ gsap, conditions, revealSignature }, root) => {
  const mm = gsap.matchMedia();
  mm.add(conditions.motion, () => revealSignature(root));
  return () => mm.revert();
};

/** The full ORVANN logo across the bottom of every page, rising into view as you arrive. */
export function FooterSignature({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(ref, setupSignature);

  return (
    <div className={styles.wrap}>
      <div ref={ref} className={styles.signature}>
        <Logo label={label} className={styles.logo} />
      </div>
    </div>
  );
}
