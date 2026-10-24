"use client";

import type { CSSProperties, ReactNode } from "react";
import { cssToken, useTheme } from "@/theme/useTheme";
import { useReducedMotion } from "@/motion/useReducedMotion";
import StarBorder from "./StarBorder";
import styles from "./StarButton.module.css";

type Props = {
  children: ReactNode;
  /** The section's tone: on the blue band the light is white, elsewhere ORVANN blue. */
  tone?: "base" | "accent";
  className?: string;
  style?: CSSProperties;
} & Record<`data-${string}`, string>;

/**
 * The primary call to action's light: React Bits' Star Border as a thin ring just outside
 * the button, with one slow star travelling round it (a lap on hover). The button inside
 * keeps its own colours, hover and focus. Without JavaScript, or for reduced motion, there
 * is no light at all, only the same 2px of room, so nothing moves when the light joins.
 */
export function StarButton({ children, tone = "base", className, style, ...data }: Props) {
  const theme = useTheme();
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={`${styles.plain}${className ? ` ${className}` : ""}`} style={style} {...data}>
        {children}
      </span>
    );
  }

  const onBlue = tone === "accent";
  const color = onBlue ? "#ffffff" : cssToken(theme === "light" ? "--color-blue-500" : "--color-blue-400");
  return (
    <StarBorder
      as="span"
      className={`${styles.ring}${className ? ` ${className}` : ""}`}
      style={style}
      theme={onBlue ? "dark" : theme}
      color={color}
      radius={999}
      thickness={1.5}
      duration={7}
      trailLength={0.35}
      glow={0.45}
      stars={1}
      hover="lap"
      clickPulse={false}
      backgroundColor="transparent"
      textColor="inherit"
      borderColor="transparent"
      {...data}
    >
      {children}
    </StarBorder>
  );
}
