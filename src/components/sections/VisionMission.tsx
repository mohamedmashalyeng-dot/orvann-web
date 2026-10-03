import type { Step } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./VisionMission.module.css";

type Props = {
  vision: Step;
  mission: Step;
  tone?: "tone-base" | "tone-alt";
};

/** Vision and mission side by side: a short label over one large sentence each. */
export function VisionMission({ vision, mission, tone = "tone-alt" }: Props) {
  const statements = [
    { id: "vision", ...vision },
    { id: "mission", ...mission },
  ];

  return (
    <section className={cn(tone, "section")} aria-labelledby="vision-title mission-title">
      <div className={cn("container", styles.layout)}>
        {statements.map((statement) => (
          <Reveal key={statement.id} className={styles.statement}>
            <h2 id={`${statement.id}-title`} className={cn("type-label", styles.title)} data-reveal="">
              {statement.title}
            </h2>
            <p className={styles.text} data-reveal="">
              {statement.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
