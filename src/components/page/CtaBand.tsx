import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./CtaBand.module.css";

/** The closing band on inner pages: one big invitation, two clear next steps. */
export function CtaBand({ cta }: { cta: SiteContent["pages"]["cta"] }) {
  return (
    <section className={cn("tone-accent section", styles.band)} aria-labelledby="cta-title">
      <BrandPattern fade="end" />
      <div className={styles.orbit} aria-hidden="true" />
      <Reveal className={cn("container", styles.inner)}>
        <SectionLabel data-reveal="">{cta.label}</SectionLabel>
        <h2 id="cta-title" className={cn("type-display", styles.title)} data-split="">
          {cta.title}
        </h2>
        <p className="type-lede" data-reveal="">
          {cta.text}
        </p>
        <div className={styles.actions} data-reveal="">
          <ButtonLink href={cta.primary.href} icon="arrow" magnetic>
            {cta.primary.label}
          </ButtonLink>
          <ButtonLink href={cta.secondary.href} variant="secondary">
            {cta.secondary.label}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
