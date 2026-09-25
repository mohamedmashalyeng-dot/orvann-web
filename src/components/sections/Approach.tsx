import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { ReviewTag } from "@/components/ui/ReviewTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { StepsProgress } from "@/components/motion/StepsProgress";
import { ApproachIcon } from "./ApproachIcons";
import styles from "./Approach.module.css";

type Props = {
  approach: SiteContent["approach"];
  proposedCopyLabel?: string;
};

export function Approach({ approach, proposedCopyLabel }: Props) {
  const lastIndex = approach.steps.length - 1;

  return (
    <section id="approach" className="tone-alt section" aria-labelledby="approach-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <div className={styles.headMain}>
            <SectionLabel data-reveal="">{approach.label}</SectionLabel>
            <h2 id="approach-title" className="type-h2" data-reveal="">
              {approach.title}
            </h2>
          </div>
          <div className={styles.headAside} data-reveal="">
            <p className="type-lede">{approach.intro}</p>
            {proposedCopyLabel && <ReviewTag>{proposedCopyLabel}</ReviewTag>}
          </div>
        </Reveal>

        <StepsProgress className={styles.sequence} trackClassName={styles.track} barClassName={styles.bar}>
          <Reveal>
            <ol className={styles.steps}>
              {approach.steps.map((step, index) => (
                <li key={step.title} className={styles.step} data-step="" data-reveal="">
                  <ApproachIcon index={index} className={styles.icon} />
                  <span className={cn("type-label", styles.index)}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={styles.stepTitle}>
                    {step.title}
                    {index < lastIndex && <ArrowIcon className={styles.arrow} />}
                  </h3>
                  <p className="type-body">{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </StepsProgress>
      </div>
    </section>
  );
}
