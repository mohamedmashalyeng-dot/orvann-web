import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Integrated.module.css";

/** The integrated model: one direction across channels, for one service or many. */
export function Integrated({ integrated }: { integrated: SiteContent["integrated"] }) {
  return (
    <section className="tone-base section" aria-labelledby="integrated-title">
      <div className={cn("container", styles.layout)}>
        <Reveal className={styles.head}>
          <h2 id="integrated-title" className={cn("type-h2", styles.title)} data-reveal="">
            {integrated.title}
          </h2>
          <p className={cn("type-h3", styles.subtitle)} data-reveal="">
            {integrated.subtitle}
          </p>
        </Reveal>

        <Reveal className={styles.main}>
          {integrated.paragraphs.map((paragraph) => (
            <p key={paragraph} className="type-lede" data-reveal="">
              {paragraph}
            </p>
          ))}
          <ul className={styles.options}>
            {integrated.options.map((option) => (
              <li key={option} className={styles.option} data-reveal="">
                {option}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
