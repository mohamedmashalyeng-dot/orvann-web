import { cn } from "@/lib/cn";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ScrubText } from "@/components/motion/ScrubText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Statement.module.css";

type Props = {
  /** id of the h2, for the section's aria-labelledby. */
  id: string;
  title: string;
  text: string;
  tone?: "tone-base" | "tone-alt";
  /** The brand pattern at the reading start; turn it off when a neighbouring section has it. */
  pattern?: boolean;
};

/** A short heading and one large paragraph that brightens word by word as it scrolls by. */
export function Statement({ id, title, text, tone = "tone-base", pattern = true }: Props) {
  return (
    <section className={cn(tone, "section", styles.section)} aria-labelledby={id}>
      {pattern && <BrandPattern fade="start" />}
      <div className={cn("container", styles.layout)}>
        <Reveal className={styles.head}>
          <h2 id={id} className={cn("type-label", styles.title)} data-reveal="">
            {title}
          </h2>
        </Reveal>
        <ScrubText text={text} className={styles.text} />
      </div>
    </section>
  );
}
