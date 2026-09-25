import type { ReactNode } from "react";

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/** Accent parts use the brand blue; everything else follows the text colour. */
const accent = { fill: "var(--color-blue-500)", stroke: "none" };

/**
 * One glyph per Approach step, in order: Discover (a lens), Design (a drafted plan),
 * Build (a foundation of stacked blocks), Grow (a rising line). Decorative.
 */
const glyphs: ReactNode[] = [
  <>
    <circle cx="21" cy="21" r="12" />
    <path d="M30 30l10 10" strokeWidth="2.5" />
    <circle cx="21" cy="21" r="4" {...accent} />
  </>,
  <>
    <rect x="7" y="7" width="34" height="34" rx="2" strokeOpacity="0.45" />
    <path d="M7 19h34M7 29h34M19 7v34M29 7v34" strokeOpacity="0.2" />
    <path d="M12 36L36 12" />
    <circle cx="36" cy="12" r="3.5" {...accent} />
  </>,
  <>
    <rect x="6" y="32" width="36" height="9" rx="1.5" {...accent} />
    <rect x="11" y="21" width="26" height="9" rx="1.5" />
    <rect x="16" y="10" width="16" height="9" rx="1.5" />
  </>,
  <>
    <path d="M7 7v34h34" strokeOpacity="0.45" />
    <path d="M12 34l9-9 6 5 11-15" />
    <circle cx="38" cy="15" r="7" strokeOpacity="0.45" />
    <circle cx="38" cy="15" r="3.5" {...accent} />
  </>,
];

export function ApproachIcon({ index, className }: { index: number; className?: string }) {
  const glyph = glyphs[index];
  if (!glyph) return null;
  return (
    <svg {...base} className={className}>
      {glyph}
    </svg>
  );
}
