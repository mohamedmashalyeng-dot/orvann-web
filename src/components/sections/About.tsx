import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./About.module.css";

export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="about" className="tone-base section" aria-labelledby="about-title">
      <div className={cn("container", styles.layout)}>
        <Reveal className={styles.head}>
          <h2 id="about-title" className={cn("type-h2", styles.title)} data-reveal="">
            {about.title}
          </h2>
        </Reveal>

        <Reveal className={styles.main}>
          <p className="type-lede" data-reveal="">
            {about.text}
          </p>
          <div data-reveal="">
            <ButtonLink href={about.link.href} variant="secondary" icon="arrow">
              {about.link.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
