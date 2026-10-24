import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Stats.module.css";

type Props = {
  stats: SiteContent["stats"];
  /** The figures, counted from the site's own data (see the homepage). */
  values: { key: "projects" | "services" | "brands"; value: number }[];
};

/** A strip of figures under the client logos; each counts up as it scrolls into view. */
export function Stats({ stats, values }: Props) {
  return (
    <section className={cn("tone-base", styles.section)} aria-label={stats.label}>
      <div className="container">
        <Reveal>
          <ul className={styles.list}>
            {values.map(({ key, value }) => (
              <li key={key} className={styles.item} data-reveal="">
                <CountUp to={value} className={cn("type-mega", styles.number)} />
                <span className={styles.label}>{stats[key]}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
