import { cn } from "@/lib/cn";
import { ScrubText } from "@/components/motion/ScrubText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Statement.module.css";

type Props = {
  /** id of the h2, for the section's aria-labelledby. */
  id: string;
  title: string;
  text: string;
  tone?: "tone-base" | "tone-alt";
};

/** A short heading and one large paragraph that brightens word by word as it scrolls by. */
export function Statement({ id, title, text, tone = "tone-base" }: Props) {
  return (
    <section className={cn(tone, "section")} aria-labelledby={id}>
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
