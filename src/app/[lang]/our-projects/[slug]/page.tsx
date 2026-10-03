import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, localePath } from "@/content";
import { contentFor } from "@/content/server";
import { partners } from "@/config/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { MediaFrame } from "@/components/motion/MediaFrame";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Every project is prerendered; any other slug is a 404.
export const dynamicParams = false;

// The same slugs in both languages (the Arabic projects are built from the English ones).
// (While Our Work is hidden, scripts/hide-unpublished.mjs takes these pages out of the export.)
export function generateStaticParams() {
  return getContent().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await contentFor(params);
  const { slug } = await params;
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata(
    content,
    { title: `${project.title} | ${content.meta.siteName}`, description: project.summary },
    `/our-projects/${project.slug}/`,
  );
}

const pad = (value: number) => String(value).padStart(2, "0");
const ratio = (image: { width: number; height: number }) =>
  ({ "--ratio": `${image.width} / ${image.height}` }) as CSSProperties;

export default async function ProjectPage({ params }: Props) {
  const content = await contentFor(params);
  const copy = content.pages.caseStudy;
  const { slug } = await params;
  const index = content.projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = content.projects[index];
  const next = content.projects[(index + 1) % content.projects.length];
  // The client's own website, where one has been verified (see partners in config/site.ts).
  const website = partners.find((partner) => partner.project === project.slug)?.href;

  return (
    <>
      <PageIntro intro={{ label: content.pages.work.intro.label, title: project.title, lede: project.summary }}>
        <ButtonLink href={localePath(content.locale, "/our-projects/")} variant="secondary" size="sm">
          {copy.back}
        </ButtonLink>
        {website && (
          <ButtonLink href={website} size="sm" icon="external" newTabLabel={content.a11y.newTab}>
            {copy.visitWebsite}
          </ButtonLink>
        )}
      </PageIntro>

      <div className="container">
        <div className={styles.cover} style={ratio(project.image)}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            preload
            sizes="(min-width: 90rem) 1328px, 92vw"
            className={styles.coverImage}
          />
        </div>
      </div>

      <section className="section" aria-labelledby="context-title">
        <div className={cn("container", styles.story)}>
          <Reveal as="aside" className={styles.meta} aria-labelledby="services-title">
            <h2 id="services-title" className={cn("type-label", styles.metaTitle)} data-reveal="">
              {copy.services}
            </h2>
            <ul className={styles.disciplines}>
              {project.categories.map((id) => (
                <li key={id} data-reveal="">
                  <Link href={localePath(content.locale, `/services/#${id}`)} className={styles.serviceLink}>
                    {content.serviceNames[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className={styles.narrative}>
            <Reveal className={styles.block}>
              <h2 id="context-title" className="type-h3" data-reveal="">
                {copy.context}
              </h2>
              <p className={cn("type-lede", styles.challenge)} data-reveal="">
                {project.challenge}
              </p>
            </Reveal>

            <Reveal className={styles.block}>
              <h2 className="type-h3" data-reveal="">
                {copy.delivered}
              </h2>
              <ol className={styles.steps}>
                {project.solution.map((step, stepIndex) => (
                  <li key={step} className={styles.step} data-reveal="">
                    <span className={cn("type-label", styles.stepNumber)} aria-hidden="true">
                      {pad(stepIndex + 1)}
                    </span>
                    <p className="type-body">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={cn("tone-alt section", styles.resultsSection)} aria-labelledby="results-title">
        <BrandPattern fade="corner" />
        <div className="container">
          <SectionHead id="results-title" title={copy.results} />
          <Reveal>
            <ul className={styles.results}>
              {project.results.map((result, resultIndex) => (
                <li key={result} className={styles.result} data-reveal="">
                  <span className={cn("type-label", styles.resultNumber)} aria-hidden="true">
                    {pad(resultIndex + 1)}
                  </span>
                  <p>{result}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="section" aria-labelledby="gallery-title">
          <div className="container">
            <SectionHead id="gallery-title" title={copy.execution} />
            <ul className={styles.gallery}>
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <MediaFrame className={styles.galleryFrame} innerClassName={styles.galleryInner} style={ratio(image)}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 48em) 46vw, 92vw"
                      className={styles.galleryImage}
                    />
                  </MediaFrame>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav className={cn("tone-base", styles.next)} aria-label={copy.next}>
        <div className="container">
          <Link href={localePath(content.locale, `/our-projects/${next.slug}/`)} className={styles.nextLink}>
            <span className={cn("type-label", styles.nextLabel)}>{copy.next}</span>
            <span className={cn("type-h2", styles.nextTitle)}>
              {next.title}
              <ArrowIcon className={styles.nextIcon} />
            </span>
          </Link>
        </div>
      </nav>

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
