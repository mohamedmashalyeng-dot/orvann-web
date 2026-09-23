import type { CSSProperties } from "react";
import Image from "next/image";
import { getContent } from "@/content";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { MediaFrame } from "@/components/motion/MediaFrame";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

const content = getContent();
const page = content.pages.exhibitions;

export const metadata = pageMetadata(page.meta, "/exhibitions-conferences/");

const pad = (value: number) => String(value).padStart(2, "0");

export default function ExhibitionsPage() {
  const { image, news } = page;

  return (
    <>
      <PageIntro intro={page.intro}>
        <ButtonLink href={content.pages.cta.primary.href} icon="arrow">
          {content.pages.cta.primary.label}
        </ButtonLink>
      </PageIntro>

      <div className={cn("container", styles.feature)}>
        <MediaFrame
          className={styles.media}
          innerClassName={styles.mediaInner}
          style={{ "--ratio": `${image.width} / ${image.height}` } as CSSProperties}
        >
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 90rem) 1328px, 92vw" className={styles.image} />
        </MediaFrame>
        <Reveal className={styles.text}>
          <p data-reveal="">{page.text}</p>
        </Reveal>
      </div>

      <section className="tone-alt section" aria-labelledby="process-title">
        <div className="container">
          <SectionHead id="process-title" label={page.processLabel} title={page.processTitle} />
          <Reveal>
            <ol className={styles.stages}>
              {page.stages.map((stage, index) => (
                <li key={stage.title} className={styles.stage} data-reveal="">
                  <span className={cn("type-label", styles.stageNumber)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className="type-h3">{stage.title}</h3>
                  <ul className={styles.points}>
                    {stage.points.map((point) => (
                      <li key={point} className="type-body">
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="news-title">
        <div className="container">
          <Reveal className={styles.news}>
            <SectionLabel data-reveal="">{news.label}</SectionLabel>
            <h2 id="news-title" className="type-h2" data-reveal="">
              {news.title}
            </h2>
            <p className="type-lede" data-reveal="">
              {news.text}
            </p>
            <div data-reveal="">
              <ButtonLink href={news.link.href} variant="secondary" icon="external" newTabLabel={content.a11y.newTab}>
                {news.link.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
