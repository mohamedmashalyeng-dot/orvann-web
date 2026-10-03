import Link from "next/link";
import type { Metadata } from "next";
import { localePath, serviceIds } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { flags } from "@/config/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { VisionMission } from "@/components/sections/VisionMission";
import { ValuesOrbit } from "@/components/visuals/IntroGraphics";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { FaqSection } from "@/components/page/FaqSection";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.about.meta, "/about-us/");
}

const pad = (value: number) => String(value).padStart(2, "0");

export default async function AboutPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.about;
  const { serviceNames } = content;

  return (
    <>
      <PageIntro intro={page.intro} visual={<ValuesOrbit values={page.values.items.map((value) => value.title)} />}>
        {flags.showWork && (
          <ButtonLink href={page.cta.href} icon="arrow">
            {page.cta.label}
          </ButtonLink>
        )}
      </PageIntro>

      {/* Who is ORVANN: the five capabilities, each linking to its services section. */}
      <section className="section" aria-labelledby="who-title">
        <div className="container">
          <SectionHead id="who-title" title={page.who.title} intro={page.who.intro} />
          <Reveal className={styles.who}>
            <ol className={styles.capabilityLinks}>
              {serviceIds.map((id, index) => (
                <li key={id} data-reveal="">
                  <Link href={localePath(content.locale, `/services/#${id}`)} className={styles.capabilityLink}>
                    <span className={cn("type-label", styles.number)} aria-hidden="true">
                      {pad(index + 1)}
                    </span>
                    <span className={styles.capabilityName}>{serviceNames[id]}</span>
                    <ArrowIcon className={styles.capabilityIcon} />
                  </Link>
                </li>
              ))}
            </ol>
            <div className={styles.paragraphs} data-reveal="">
              {page.who.paragraphs.map((paragraph) => (
                <p key={paragraph} className="type-lede">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our story: how one deliverable kept leading to the next. */}
      <section className="tone-alt section" aria-labelledby="story-title">
        <div className={cn("container", styles.split)}>
          <Reveal className={styles.splitHead}>
            <h2 id="story-title" className="type-h2" data-reveal="">
              {page.story.title}
            </h2>
          </Reveal>
          <Reveal className={styles.splitBody}>
            {page.story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
            <ol className={styles.sequence}>
              {page.story.sequence.map((line) => (
                <li key={line} className={styles.sequenceLine} data-reveal="">
                  {line}
                </li>
              ))}
            </ol>
            <p className="type-lede" data-reveal="">
              {page.story.closing}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHead id="capabilities-title" title={page.capabilities.title} />
          <Reveal>
            <ul className={styles.capabilities}>
              {page.capabilities.items.map((item, index) => (
                <li key={item.id} className={styles.capability} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className="type-h3">{serviceNames[item.id]}</h3>
                  <p className="type-body">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="tone-alt section" aria-labelledby="process-title">
        <div className="container">
          <SectionHead id="process-title" title={page.process.title} />
          <Reveal>
            <ol className={styles.steps}>
              {page.process.steps.map((step, index) => (
                <li key={step.title} className={styles.step} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className="type-h3">{step.title}</h3>
                  <p className="type-body">{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="model-title">
        <div className={cn("container", styles.split)}>
          <Reveal className={styles.splitHead}>
            <h2 id="model-title" className="type-h2" data-reveal="">
              {page.model.title}
            </h2>
          </Reveal>
          <Reveal className={styles.splitBody}>
            {page.model.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="tone-alt section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead id="values-title" title={page.values.title} />
          <Reveal>
            <ul className={styles.values}>
              {page.values.items.map((value, index) => (
                <li key={value.title} className={styles.value} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className="type-lede">{value.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <VisionMission vision={content.vision} mission={content.mission} tone="tone-base" />

      <FaqSection title={page.faqTitle} faqs={page.faqs} tone="tone-alt" />

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
