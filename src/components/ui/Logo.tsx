import { cn } from "@/lib/cn";
import styles from "./Logo.module.css";

type Props = {
  /** "full" is the OV monogram with the ORVANN wordmark; "mark" is the monogram alone. */
  variant?: "full" | "mark";
  /** Accessible name. Omit when the logo sits inside a link that already names it. */
  label?: string;
  className?: string;
};

/**
 * The real ORVANN logo (from orvann.com), drawn as a CSS mask so it takes the current
 * text colour: white on dark, ink on light, blue where needed — one asset, both themes.
 */
export function Logo({ variant = "full", label, className }: Props) {
  return (
    <span
      className={cn(styles.logo, styles[variant], className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}
