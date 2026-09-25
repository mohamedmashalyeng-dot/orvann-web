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
import { Statement } from "@/components/page/Statement";
import { FaqList } from "@/components/page/FaqList";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

const content = getContent();
const page = content.pages.services;

export const metadata = pageMetadata(page.meta, "/services/");

const pad = (value: number) => String(value).padStart(2, "0");

export default function ServicesPage() {
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
                  {family.title}
                </a>
              </li>
            ))}
          </ol>
        }
      >
        <ButtonLink href={content.pages.cta.primary.href} icon="arrow">
          {content.pages.cta.primary.label}
        </ButtonLink>
      </PageIntro>

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
                <SectionLabel data-reveal="">{family.eyebrow}</SectionLabel>
                <h2 id={`${family.id}-title`} className="type-h2" data-reveal="">
                  {family.title}
                </h2>
                <p className="type-lede" data-reveal="">
                  {family.text}
                </p>
              </Reveal>

              <Reveal className={styles.itemsWrap}>
                <MediaFrame className={styles.media} innerClassName={styles.mediaInner}>
                  <Image
                    src={family.image.src}
                    alt={family.image.alt}
                    fill
                    sizes="(min-width: 90rem) 760px, (min-width: 64em) 52vw, 92vw"
                    className={styles.image}
                  />
                </MediaFrame>
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

      <Statement id="why-title" title={page.why.title} text={page.why.text} />

      <section className="tone-base section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHead id="faq-title" title={page.faqTitle} />
          <Reveal>
            <FaqList faqs={page.faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
