import { cn } from "@/lib/cn";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/** Points toward reading direction; mirrors in RTL. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("flip-rtl", className)}>
      <path d="M3.5 10h13M11 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

/** External link; mirrors in RTL. */
export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={cn("flip-rtl", className)}>
      <path d="M6 14l8-8M7 6h7v7" />
    </svg>
  );
}
