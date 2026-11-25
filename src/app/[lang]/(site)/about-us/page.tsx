import Link from "next/link";
import type { Metadata } from "next";
import { localePath, serviceIds, servicePath } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { VisionMission } from "@/components/sections/VisionMission";
import { DirectionPhoto } from "@/components/visuals/DirectionPhoto";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";
import { withDot } from "@/components/ui/Dot";

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
      <PageIntro
        intro={page.intro}
        visual={<DirectionPhoto photo="arch" priority />}
      />

      {/* We start where you are. */}
      <section className="tone-alt section" aria-labelledby="approach-title">
        <div className={cn("container", styles.split)}>
          <Reveal className={styles.splitHead}>
            <h2 id="approach-title" className="type-h2" data-reveal="">
              {withDot(page.approach.title)}
            </h2>
          </Reveal>
          <Reveal className={styles.splitBody}>
            {page.approach.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Worth more than the sum of the services: where ORVANN adds value. */}
      <section className="section" aria-labelledby="value-title">
        <div className={cn("container", styles.split)}>
          <Reveal className={styles.splitHead}>
            <h2 id="value-title" className="type-h2" data-reveal="">
              {withDot(page.value.title)}
            </h2>
          </Reveal>
          <Reveal className={styles.splitBody}>
            {page.value.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
            <p className={styles.highlight} data-reveal="">
              {page.value.highlight}
            </p>
            {page.value.after.map((paragraph) => (
              <p key={paragraph} className="type-lede" data-reveal="">
                {paragraph}
              </p>
            ))}
            <div data-reveal="">
              <ButtonLink href={page.value.cta.href} icon="arrow">
                {page.value.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The expertise behind the solutions, each solution linking to its page. */}
      <section className="tone-alt section" aria-labelledby="expertise-title">
        <div className="container">
          <SectionHead id="expertise-title" title={page.expertise.title} />
          <Reveal className={styles.who}>
            <ol className={styles.capabilityLinks}>
              {serviceIds.map((id, index) => (
                <li key={id} data-reveal="">
                  <Link href={localePath(content.locale, servicePath(id))} className={styles.capabilityLink}>
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
              {page.expertise.paragraphs.map((paragraph) => (
                <p key={paragraph} className="type-lede">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <VisionMission vision={page.vision} mission={page.mission} tone="tone-tint" />

      <section className="section" aria-labelledby="commitments-title">
        <div className="container">
          <SectionHead id="commitments-title" title={page.commitments.title} />
          <Reveal>
            <ul className={styles.values}>
              {page.commitments.items.map((item, index) => (
                <li key={item.title} className={styles.value} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className={styles.valueTitle}>{item.title}</h3>
                  <p className="type-lede">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand cta={page.closing} />
    </>
  );
}
