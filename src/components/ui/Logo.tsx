import { cn } from "@/lib/cn";
import styles from "./Logo.module.css";

type Props = {
  /** "full" is the stacked logo (monogram, ORVANN, YOUR GROWTH PARTNER); "mark" is the monogram alone. */
  variant?: "full" | "mark";
  /** Accessible name. Omit when the logo sits inside a link that already names it. */
  label?: string;
  className?: string;
};

/**
 * The ORVANN logo. The full logo uses ORVANN's own black and white files, picked by the
 * theme; the monogram is a CSS mask that takes the current text colour.
 */
export function Logo({ variant = "full", label, className }: Props) {
  return (
    <span
      className={cn(styles.logo, styles[variant], className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}
