import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ReviewTag } from "@/components/ui/ReviewTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceRows } from "./ServiceRows";
import styles from "./Services.module.css";

type Props = {
  services: SiteContent["services"];
  proposedCopyLabel?: string;
};

export function Services({ services, proposedCopyLabel }: Props) {
  // Rows are numbered continuously across both groups.
  const firstNumber = services.groups.map((_, index) =>
    services.groups.slice(0, index).reduce((count, group) => count + group.items.length, 1),
  );

  return (
    <section id="services" className="tone-alt section" aria-labelledby="services-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <div className={styles.headMain}>
            <SectionLabel data-reveal="">{services.label}</SectionLabel>
            <h2 id="services-title" className="type-h2" data-reveal="">
              {services.title}
            </h2>
          </div>
          <div className={styles.headAside} data-reveal="">
            <p className="type-lede">{services.intro}</p>
            {proposedCopyLabel && <ReviewTag>{proposedCopyLabel}</ReviewTag>}
          </div>
        </Reveal>

        {services.groups.map((group, groupIndex) => (
          <article key={group.id} className={styles.group} aria-labelledby={`services-${group.id}`}>
            <Reveal className={styles.groupHead}>
              <h3 id={`services-${group.id}`} className={styles.groupTitle} data-reveal="">
                <span className={cn("type-accent", styles.verb)}>{group.verb}</span>
                <span className="type-h3">{group.title}</span>
              </h3>
              <p className="type-body" data-reveal="">
                {group.summary}
              </p>
              <div data-reveal="">
                <ButtonLink href={group.cta.href} variant="secondary" size="sm" icon="arrow">
                  {group.cta.label}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal className={styles.rowsWrap}>
              <ServiceRows
                items={group.items}
                firstNumber={firstNumber[groupIndex]}
                detailsLabel={services.detailsLabel}
              />
            </Reveal>
          </article>
        ))}

        <Reveal as="aside" className={styles.more} aria-labelledby="services-more">
          <h3 id="services-more" className={cn("type-label", styles.moreTitle)} data-reveal="">
            {services.more.title}
          </h3>
          <ul className={styles.moreList}>
            {services.more.items.map((item) => (
              <li key={item.title} data-reveal="">
                <p className={styles.moreItemTitle}>{item.title}</p>
                <p className="type-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.all}>
          <div data-reveal="">
            <ButtonLink href={services.link.href} icon="arrow">
              {services.link.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
