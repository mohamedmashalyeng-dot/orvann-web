import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { localePath, type Locale, type Project, type SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MediaFrame } from "@/components/motion/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Work.module.css";

type Props = {
  locale: Locale;
  work: SiteContent["work"];
  /** The featured projects, in display order. */
  projects: Project[];
};

/** Editorial rhythm: one full-width project, then an offset pair. Sizes match the grid. */
const layouts = [
  { className: styles.wide, sizes: "(min-width: 90rem) 1328px, 92vw" },
  { className: styles.left, sizes: "(min-width: 64em) 55vw, 92vw" },
  { className: styles.right, sizes: "(min-width: 64em) 40vw, 92vw" },
];

/**
 * Verified ORVANN projects. Images are shown whole (the frame takes each image's own
 * proportions). The title links to the case study; an overlay on the picture repeats that
 * link for pointer users only, so keyboard and screen-reader users meet one link per
 * project and the image's alt text stays readable.
 */
export function Work({ locale, work, projects }: Props) {
  return (
    <section id="work" className="tone-base section" aria-labelledby="work-title">
      <div className="container">
        <Reveal as="header" className={styles.head}>
          <div className={styles.headMain}>
            <SectionLabel data-reveal="">{work.label}</SectionLabel>
            <h2 id="work-title" className="type-h2" data-reveal="">
              {work.title}
            </h2>
          </div>
          <p className={cn("type-lede", styles.intro)} data-reveal="">
            {work.intro}
          </p>
        </Reveal>

        <ul className={styles.items}>
          {projects.map((project, index) => {
            const layout = layouts[index % layouts.length];
            const href = localePath(locale, `/our-projects/${project.slug}/`);
            return (
              <li key={project.slug} className={cn(styles.item, layout.className)}>
                <article className={styles.article} aria-labelledby={`work-${project.slug}`}>
                  <div className={styles.mediaWrap}>
                    <MediaFrame
                      className={styles.media}
                      innerClassName={styles.mediaInner}
                      style={{ "--ratio": `${project.image.width} / ${project.image.height}` } as CSSProperties}
                    >
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        fill
                        sizes={layout.sizes}
                        className={styles.image}
                      />
                    </MediaFrame>
                    <Link href={href} className={styles.mediaLink} tabIndex={-1} aria-hidden="true">
                      <span className={cn("type-label", styles.view)}>
                        {work.viewProject}
                        <ArrowIcon className={styles.viewIcon} />
                      </span>
                    </Link>
                  </div>
                  <Reveal className={styles.caption}>
                    <h3 id={`work-${project.slug}`} className="type-h3" data-reveal="">
                      <Link href={href} className={styles.link}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className={cn("type-label", styles.disciplines)} data-reveal="">
                      {project.disciplines.join(" · ")}
                    </p>
                    <p className={cn("type-body", styles.summary)} data-reveal="">
                      {project.summary}
                    </p>
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>

        <Reveal className={styles.more}>
          <div data-reveal="">
            <ButtonLink href={work.link.href} variant="secondary" icon="arrow">
              {work.link.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
