import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/page/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Deliverables.module.css";

/** Proof of execution: the kinds of work across the portfolio, as a numbered grid. */
export function Deliverables({ deliverables }: { deliverables: SiteContent["deliverables"] }) {
  return (
    <section className="tone-base section" aria-labelledby="deliverables-title">
      <div className="container">
        <SectionHead id="deliverables-title" title={deliverables.title} intro={deliverables.intro} />
        <Reveal>
          <ul className={styles.grid}>
            {deliverables.items.map((item, index) => (
              <li key={item} className={styles.item} data-reveal="">
                <span className={cn("type-label", styles.number)} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.text}>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
