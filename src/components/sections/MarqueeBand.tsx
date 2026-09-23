import { cn } from "@/lib/cn";
import { Marquee } from "@/components/motion/Marquee";
import styles from "./MarqueeBand.module.css";

/**
 * ORVANN's service names as a moving band under the hero. Decorative: every one of them
 * is listed, readable, in Services right below, so the band is hidden from screen readers.
 */
export function MarqueeBand({ items }: { items: string[] }) {
  return (
    <div className={cn("tone-base", styles.band)} aria-hidden="true">
      <Marquee duration={45}>
        {items.map((item) => (
          <span key={item} className={styles.item}>
            {item}
            <span className={styles.mark} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
