import type { Cta } from "@/content";
import { cn } from "@/lib/cn";
import { GoldenSpiral } from "@/components/ui/GoldenSpiral";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StarButton } from "@/components/ui/StarButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./CtaBand.module.css";
import { withDot } from "@/components/ui/Dot";

/** The closing band: one big invitation and a clear next step or two (the first with its star). */
export function CtaBand({ cta }: { cta: Cta }) {
  return (
    <section className={cn("tone-accent section", styles.band)} aria-labelledby="cta-title">
      <GoldenSpiral className={styles.spiral} />
      <Reveal className={cn("container", styles.inner)}>
        {cta.label && <SectionLabel data-reveal="">{cta.label}</SectionLabel>}
        <h2 id="cta-title" className={cn("type-display", styles.title)} data-split="">
          {withDot(cta.title)}
        </h2>
        <p className="type-lede" data-reveal="">
          {cta.text}
        </p>
        {cta.emphasis && (
          <p className={cn("type-lede", styles.emphasis)} data-reveal="">
            {cta.emphasis}
          </p>
        )}
        <div className={styles.actions} data-reveal="">
          <StarButton tone="accent">
            <ButtonLink href={cta.primary.href} icon="arrow" magnetic>
              {cta.primary.label}
            </ButtonLink>
          </StarButton>
          {cta.secondary && (
            <ButtonLink href={cta.secondary.href} variant="secondary">
              {cta.secondary.label}
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </section>
  );
}
