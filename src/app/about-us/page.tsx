import Link from "next/link";
import { getContent } from "@/content";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { Statement } from "@/components/page/Statement";
import { FaqList } from "@/components/page/FaqList";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

const content = getContent();
const page = content.pages.about;

export const metadata = pageMetadata(page.meta, "/about-us/");

const pad = (value: number) => String(value).padStart(2, "0");

export default function AboutPage() {
  const { values, partners } = page;

  return (
    <>
      <PageIntro intro={page.intro}>
        <ButtonLink href={content.pages.cta.primary.href} icon="arrow">
          {content.pages.cta.primary.label}
        </ButtonLink>
      </PageIntro>

      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <SectionHead id="story-title" label={page.storyLabel} title={page.storyTitle} />
          <Reveal>
            <ol className={styles.chapters}>
              {page.chapters.map((chapter, index) => (
                <li key={chapter.title} className={styles.chapter} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className={cn("type-h3", styles.chapterTitle)}>{chapter.title}</h3>
                  <p className="type-lede">{chapter.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <Statement id="why-title" title={page.why.title} text={page.why.text} tone="tone-alt" />
      <Statement id="achievements-title" title={page.achievements.title} text={page.achievements.text} />

      <section className="tone-alt section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead id="values-title" label={values.label} title={values.title} intro={values.text} />
          <Reveal>
            <ul className={styles.values}>
              {values.items.map((value, index) => (
                <li key={value} className={styles.value} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <span className={styles.valueText}>{value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead id="partners-title" label={partners.label} title={partners.title} intro={partners.text} />
          <Reveal>
            <ul className={styles.benefits}>
              {partners.benefits.map((benefit) => (
                <li key={benefit.title} className={styles.benefit} data-reveal="">
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className="type-body">{benefit.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.logos}>
            <PartnerLogos />
          </Reveal>
        </div>
      </section>

      <section className="tone-alt section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHead id="faq-title" title={page.faqTitle} />
          <Reveal>
            <FaqList faqs={page.faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="publications-title">
        <div className="container">
          <SectionHead id="publications-title" title={page.publicationsTitle} />
          <Reveal>
            <ul className={styles.publications}>
              {content.pages.publications.map((publication) => (
                <li key={publication.slug} data-reveal="">
                  <Link href={`/about-us/${publication.slug}/`} className={styles.publication}>
                    <span className={cn("type-h3", styles.publicationTitle)}>{publication.intro.title}</span>
                    <span className={cn("type-body", styles.publicationLede)}>{publication.intro.lede}</span>
                    <ArrowIcon className={styles.publicationIcon} />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
