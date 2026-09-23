import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import styles from "./HeroGraphic.module.css";

type Props = {
  labels: { build: string; grow: string };
  className?: string;
};

/**
 * The ORVANN monogram taken apart: the O becomes a ring over a build grid, the heavy
 * stroke of the V is the foundation, and its hairline stroke keeps rising as a growth line.
 *
 * Motion hooks: outer groups (data-layer) take pointer depth from GSAP; inner groups
 * (data-part) and data-draw / data-node / data-label take the CSS entrance — so the two
 * never animate the same element.
 */
export function HeroGraphic({ labels, className }: Props) {
  return (
    <svg className={cn(styles.graphic, className)} viewBox="0 0 640 640" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="hero-o-clip">
          <circle cx="320" cy="320" r="260" />
        </clipPath>
        <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" className={styles.gridPath} />
        </pattern>
      </defs>

      <g data-layer="grid">
        <g clipPath="url(#hero-o-clip)">
          <g data-part="grid">
            <rect x="0" y="-80" width="640" height="800" fill="url(#hero-grid)" />
          </g>
        </g>
      </g>

      <g data-layer="ring">
        <g data-part="ring">
          <circle cx="320" cy="320" r="260" className={styles.ring} />
          <circle cx="320" cy="320" r="196" className={styles.orbit} />
          <path d="M320 44v18M320 578v18M44 320h18M578 320h18" className={styles.ticks} />
        </g>
      </g>

      <g data-layer="foundation">
        <g data-part="foundation">
          <polygon points="104,100 196,100 351,520 322,566" className={styles.foundation} />
          <rect x="78" y="94" width="144" height="4" className={styles.serif} />
          <text x="78" y="78" className={styles.label} data-label="">
            {labels.build}
          </text>
        </g>
      </g>

      <g data-layer="growth">
        <path d="M322 566L590 62" pathLength={1} className={styles.growth} data-draw="" />
        <path d="M562 62h56" pathLength={1} className={styles.growthSerif} data-draw="" />
        <circle cx="429" cy="364" r="7" className={styles.node} data-node="" style={{ "--i": 0 } as CSSProperties} />
        <circle cx="499" cy="233" r="7" className={styles.node} data-node="" style={{ "--i": 1 } as CSSProperties} />
        <g data-node="" style={{ "--i": 2 } as CSSProperties}>
          <circle cx="563" cy="112" r="18" className={styles.halo} />
          <circle cx="563" cy="112" r="8" className={styles.nodeActive} />
        </g>
        <text x="540" y="117" textAnchor="end" className={styles.label} data-label="">
          {labels.grow}
        </text>
      </g>
    </svg>
  );
}
