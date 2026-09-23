import { cn } from "@/lib/cn";
import styles from "./Wordmark.module.css";

/**
 * Typeset stand-in for the ORVANN logo. The current logo only exists as raster PNGs
 * with the old "Creativity Hub" line; swap this for the vector logo once supplied.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn(styles.wordmark, className)} translate="no">
      ORVANN
    </span>
  );
}
