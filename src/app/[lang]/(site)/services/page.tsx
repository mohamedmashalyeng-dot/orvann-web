import type { Metadata } from "next";
import Link from "next/link";
import { localePath, servicePath } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { CtaBand } from "@/components/page/CtaBand";
import { DirectionPhoto } from "@/components/visuals/DirectionPhoto";
import styles from "./page.module.css";
import { withDot } from "@/components/ui/Dot";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.services.meta, "/services/");
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Integrated Solutions: how the solutions work together, then the nine, each to its own page. */
export default async function ServicesPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.services;
  const { locale, serviceNames } = content;

  return (
    <>
      <PageIntro
        intro={page.intro}
        aside={
          <ol className={styles.index}>
            {page.families.map((family, index) => (
              <li key={family.id}>
                <a href={`#${family.id}`} className={styles.indexLink}>
                  <span className="type-label">{pad(index + 1)}</span>
                  {serviceNames[family.id]}
                </a>
              </li>
            ))}
          </ol>
        }
      >
        <ButtonLink href={page.explore.href} icon="arrow">
          {page.explore.label}
        </ButtonLink>
        <ButtonLink href={page.discuss.href} variant="secondary">
          {page.discuss.label}
        </ButtonLink>
      </PageIntro>

      {/* When solutions work together. */}
      <section className="tone-alt section" aria-labelledby="together-title">
        <div className={cn("container", styles.together)}>
          <Reveal className={styles.togetherHead}>
            <h2 id="together-title" className="type-h2" data-reveal="">
              {withDot(page.together.title)}
            </h2>
            <div data-reveal="">
              <DirectionPhoto photo="curve" className={styles.togetherPhoto} sizes="(min-width: 64em) 40vw, 92vw" />
            </div>
          </Reveal>
          <Reveal className={styles.togetherBody}>
            {page.together.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
            <p className={styles.closing} data-reveal="">
              {page.together.closing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The nine solutions. Each card's id is the solution id, the anchor the index points at. */}
      <section id="solutions" className={cn("section", styles.solutions)} aria-labelledby="solutions-title">
        <div className="container">
          <SectionHead id="solutions-title" title={page.listTitle} />
          <Reveal>
            <ol className={styles.grid}>
              {page.families.map((family, index) => (
                <li key={family.id} id={family.id} className={styles.card} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className="type-h3">{serviceNames[family.id]}</h3>
                  <p className={styles.tagline}>{family.tagline}</p>
                  <p className="type-body">{family.text}</p>
                  <Link href={localePath(locale, servicePath(family.id))} className={styles.exploreLink}>
                    {page.exploreService}
                    <span className="visually-hidden">: {serviceNames[family.id]}</span>
                    <ArrowIcon className={styles.exploreIcon} />
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
