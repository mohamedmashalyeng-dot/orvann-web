import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ReviewTag } from "@/components/ui/ReviewTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { PartnerLogos } from "./PartnerLogos";
import styles from "./About.module.css";

type Props = {
  about: SiteContent["about"];
  proposedCopyLabel?: string;
};

export function About({ about, proposedCopyLabel }: Props) {
  return (
    <section id="about" className="tone-base section" aria-labelledby="about-title">
      <div className="container">
        <div className={styles.layout}>
          <Reveal className={styles.main}>
            <SectionLabel data-reveal="">{about.label}</SectionLabel>
            <h2 id="about-title" className={cn("type-h2", styles.title)} data-reveal="">
              {about.title}
            </h2>
            <div className={styles.body} data-reveal="">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="type-lede">
                  {paragraph}
                </p>
              ))}
            </div>
            {proposedCopyLabel && <ReviewTag>{proposedCopyLabel}</ReviewTag>}
            <div data-reveal="">
              <ButtonLink href={about.link.href} variant="secondary" icon="arrow">
                {about.link.label}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className={styles.factsWrap}>
            <dl className={styles.facts}>
              {about.facts.map((fact) => (
                <div key={fact.term} className={styles.fact} data-reveal="">
                  <dt className="type-label">{fact.term}</dt>
                  <dd>{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className={styles.partners}>
          <h3 className={cn("type-label", styles.partnersLabel)} data-reveal="">
            {about.partnersLabel}
          </h3>
          <PartnerLogos className={styles.logos} />
        </Reveal>
      </div>
    </section>
  );
}
