import { cn } from "@/lib/cn";
import styles from "./BrandPattern.module.css";

type Props = {
  /** Where the pattern is strongest before it fades into the section. */
  fade?: "start" | "end" | "corner";
  className?: string;
};

/**
 * The ORVANN pattern: the O and V of the monogram as a lattice (public/brand/ov-pattern.svg),
 * painted in the section's own text colour at low strength and faded out, so every tone and
 * both themes get it without extra artwork. Decorative. The parent needs position: relative
 * and isolation: isolate — the pattern sits behind the content at z-index -1.
 */
export function BrandPattern({ fade = "end", className }: Props) {
  return (
    <div className={cn(styles.pattern, styles[fade], className)} aria-hidden="true">
      <div className={styles.tiles} />
    </div>
  );
}
