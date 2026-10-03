import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Why.module.css";

/** Why one integrated partner: the case in two paragraphs, then four points. */
export function Why({ why }: { why: SiteContent["why"] }) {
  return (
    <section className="tone-alt section" aria-labelledby="why-title">
      <div className="container">
        <div className={styles.layout}>
          <Reveal className={styles.head}>
            <SectionLabel data-reveal="">{why.label}</SectionLabel>
            <h2 id="why-title" className="type-h2" data-reveal="">
              {why.title}
            </h2>
            <p className={cn("type-h3", styles.subtitle)} data-reveal="">
              {why.subtitle}
            </p>
          </Reveal>
          <Reveal className={styles.body}>
            {why.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal>
          <ul className={styles.points}>
            {why.points.map((point, index) => (
              <li key={point.title} className={styles.point} data-reveal="">
                <span className={cn("type-label", styles.number)} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h3">{point.title}</h3>
                <p className="type-body">{point.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
