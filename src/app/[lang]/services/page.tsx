import type { Metadata } from "next";
import { contentFor, type LangParams } from "@/content/server";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/page/PageIntro";
import { FaqSection } from "@/components/page/FaqSection";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.services.meta, "/services/");
}

const pad = (value: number) => String(value).padStart(2, "0");

export default async function ServicesPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.services;
  const { serviceNames } = content;

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
        <ButtonLink href={content.actions.startProject.href} icon="arrow">
          {content.actions.startProject.label}
        </ButtonLink>
      </PageIntro>

      {/* Each family's id is the service id, the anchor every "Explore" link points at. */}
      <div className="tone-alt">
        {page.families.map((family, index) => (
          <section
            key={family.id}
            id={family.id}
            className={cn("section", styles.family)}
            aria-labelledby={`${family.id}-title`}
          >
            <div className={cn("container", styles.familyLayout)}>
              <Reveal className={styles.familyHead}>
                <p className={cn("type-label", styles.familyNumber)} data-reveal="">
                  {pad(index + 1)} / {pad(page.families.length)}
                </p>
                <SectionLabel data-reveal="">{serviceNames[family.id]}</SectionLabel>
                <h2 id={`${family.id}-title`} className="type-h2" data-reveal="">
                  {family.title}
                </h2>
                <p className="type-lede" data-reveal="">
                  {family.text}
                </p>
                <p className={styles.bestFor} data-reveal="">
                  <span className={cn("type-label", styles.bestForLabel)}>{page.bestForLabel}</span> {family.bestFor}
                </p>
              </Reveal>

              <Reveal className={styles.itemsWrap}>
                <ul className={styles.items}>
                  {family.items.map((item) => (
                    <li key={item.title} className={styles.item} data-reveal="">
                      <h3 className="type-h3">{item.title}</h3>
                      <p className="type-body">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* How the services work together: one example sequence, which changes per project. */}
      <section className="tone-base section" aria-labelledby="together-title">
        <div className={cn("container", styles.together)}>
          <Reveal className={styles.togetherHead}>
            <h2 id="together-title" className="type-h2" data-reveal="">
              {page.together.title}
            </h2>
            {page.together.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal className={styles.togetherFlow}>
            <p className={cn("type-label", styles.exampleLabel)} data-reveal="">
              {page.together.exampleLabel}
            </p>
            <ol className={styles.flow}>
              {page.together.sequence.map((id, index) => (
                <li key={id} className={styles.flowStep} data-reveal="">
                  <a href={`#${id}`} className={styles.flowLink}>
                    {serviceNames[id]}
                  </a>
                  {index < page.together.sequence.length - 1 && <ArrowIcon className={styles.flowArrow} />}
                </li>
              ))}
            </ol>
            <p className="type-body" data-reveal="">
              {page.together.closing}
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection title={page.faqTitle} faqs={page.faqs} tone="tone-alt" />

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
