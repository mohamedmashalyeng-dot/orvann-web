import type { Metadata } from "next";
import { contentFor, type LangParams } from "@/content/server";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { ValuesOrbit } from "@/components/visuals/IntroGraphics";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { CareersForm } from "@/components/page/CareersForm";
import { FaqSection } from "@/components/page/FaqSection";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.careers.meta, "/careers/");
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Careers & Internships. The application form (#application-form) posts to a small PHP
 * handler on the host that records the application, CV included, in the CRM and emails ORVANN.
 */
export default async function CareersPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.careers;
  const { zones, regions } = content.pages.contact.form;

  return (
    <>
      <PageIntro intro={page.intro} visual={<ValuesOrbit values={page.process.steps.map((step) => step.title)} />}>
        <ButtonLink href="#application-form" icon="arrow">
          {page.apply}
        </ButtonLink>
      </PageIntro>

      <section className="tone-alt section" aria-labelledby="tracks-title">
        <div className="container">
          <SectionHead id="tracks-title" title={page.tracks.title} />
          <Reveal>
            <ul className={styles.tracks}>
              {page.tracks.items.map((track, index) => (
                <li key={track.title} className={styles.track} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className="type-h3">{track.title}</h3>
                  <p className="type-body">{track.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
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

      <section id="application-form" className={cn("tone-alt section", styles.formSection)} aria-labelledby="form-title">
        <div className="container">
          <SectionHead id="form-title" title={page.form.title} intro={page.form.lede} />
          <Reveal>
            <div data-reveal="">
              <CareersForm locale={content.locale} copy={page.form} places={{ zones, regions }} />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection title={page.faqTitle} faqs={page.faqs} />
    </>
  );
}
