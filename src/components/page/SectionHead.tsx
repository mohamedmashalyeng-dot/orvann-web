import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SectionHead.module.css";

type Props = {
  /** id of the h2, for the section's aria-labelledby. */
  id: string;
  label?: string;
  title: string;
  intro?: string;
  className?: string;
};

/** Opening of a section on an inner page: label and title, with an optional intro beside them. */
export function SectionHead({ id, label, title, intro, className }: Props) {
  return (
    <Reveal as="header" className={cn(styles.head, className)}>
      <div className={styles.main}>
        {label && <SectionLabel data-reveal="">{label}</SectionLabel>}
        <h2 id={id} className={cn("type-h2", styles.title)} data-reveal="">
          {title}
        </h2>
      </div>
      {intro && (
        <p className={cn("type-lede", styles.intro)} data-reveal="">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
