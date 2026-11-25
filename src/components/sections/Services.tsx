import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Services.module.css";
import { withDot } from "@/components/ui/Dot";

/** ORVANN's integrated solutions as numbered rows, then how the work runs, step by step. */
export function Services({ services }: { services: SiteContent["services"] }) {
  return (
    <section id="services" className="tone-alt section" aria-labelledby="services-title">
      {/* The process sits outside .layout, so the sticky head stops before it rather than
          riding over it. */}
      <div className="container">
        <div className={styles.layout}>
          <Reveal as="header" className={styles.head}>
            <SectionLabel data-reveal="">{services.label}</SectionLabel>
            <h2 id="services-title" className="type-h2" data-reveal="">
              {withDot(services.title)}
            </h2>
            {services.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className={styles.listWrap}>
            <ol className={styles.list}>
              {services.items.map((item, index) => (
                <li key={item.title} className={styles.row} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.body}>
                    <h3 className={cn("type-h3", styles.title)}>{item.title}</h3>
                    {item.tagline && <p className={styles.tagline}>{item.tagline}</p>}
                    <p className="type-body">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className={styles.process}>
          <h3 className={cn("type-label", styles.processLabel)} data-reveal="">
            {services.process.label}
          </h3>
          <ol className={styles.steps}>
            {services.process.steps.map((step, index) => (
              <li key={step} className={styles.step} data-reveal="">
                {index > 0 && <ArrowIcon className={styles.stepArrow} />}
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
