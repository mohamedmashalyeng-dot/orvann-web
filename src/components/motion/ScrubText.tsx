"use client";

import { Fragment, useRef, type ElementType } from "react";
import { cn } from "@/lib/cn";
import { useMotion, type MotionSetup } from "@/motion/useMotion";
import styles from "./ScrubText.module.css";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
};

const setupScrub: MotionSetup<HTMLElement> = ({ gsap, conditions, scrubWords }, root) => {
  const mm = gsap.matchMedia();
  mm.add(conditions.motion, () => scrubWords(root));
  return () => mm.revert();
};

/**
 * A statement that brightens word by word as it scrolls through the viewport. The words
 * are real text (one element, read normally by screen readers); without motion they are
 * simply shown at full colour.
 */
export function ScrubText({ text, as: Tag = "p", className }: Props) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, setupScrub);
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn(styles.scrub, className)}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className={styles.word} data-word="">
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
