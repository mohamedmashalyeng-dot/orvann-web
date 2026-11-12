import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localePath, serviceIds, servicePath, serviceSlugs, type ServiceId, type SiteContent } from "@/content";
import { contentFor } from "@/content/server";
import { flags, site, siteUrl } from "@/config/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { FaqSection } from "@/components/page/FaqSection";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

type Props = { params: Promise<{ lang: string; service: string }> };

// One page per service area; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceIds.map((id) => ({ service: serviceSlugs[id] }));
}

/** The service a slug names, with its copy in the page's language. */
async function serviceFor(params: Props["params"]) {
  const content = await contentFor(params);
  const { service } = await params;
  const id = serviceIds.find((serviceId) => serviceSlugs[serviceId] === service);
  const family = content.pages.services.families.find((item) => item.id === id);
  if (!id || !family) notFound();
  return { content, id, family };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { content, id, family } = await serviceFor(params);
  return pageMetadata(content, family.page.meta, servicePath(id));
}

const pad = (value: number) => String(value).padStart(2, "0");
// Related work: the first projects (in ORVANN's order) that included the service.
const relatedLimit = 4;

/** Service structured data: what the page describes, provided by ORVANN. */
function serviceJsonLd(content: SiteContent, id: ServiceId, description: string) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.serviceNames[id],
    serviceType: content.serviceNames[id],
    description,
    url: `${siteUrl}${localePath(content.locale, servicePath(id))}`,
    provider: { "@type": "Organization", name: site.name, url: `${siteUrl}${localePath(content.locale, "/")}` },
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * A service's own page: who it is for, what it delivers, how the work runs, projects that
 * included it, its questions, and a call to action that opens the form with it ticked.
 */
export default async function ServicePage({ params }: Props) {
  const { content, id, family } = await serviceFor(params);
  const { locale, serviceNames } = content;
  const copy = content.pages.services.servicePage;
  const name = serviceNames[id];
  const related = flags.showWork
    ? content.projects.filter((project) => project.categories.includes(id)).slice(0, relatedLimit)
    : [];
  const start = { label: content.actions.startProject.label, href: `${localePath(locale, "/contact-us/")}?need=${id}#project-form` };

  return (
    <>
      <PageIntro
        intro={{ label: name, title: family.page.title, lede: family.page.lede }}
        aside={
          <nav aria-label={content.a11y.footerServices}>
            <ol className={styles.index}>
              {serviceIds.map((serviceId, index) => (
                <li key={serviceId}>
                  <Link
                    href={localePath(locale, servicePath(serviceId))}
                    className={styles.indexLink}
                    aria-current={serviceId === id ? "page" : undefined}
                  >
                    <span className="type-label">{pad(index + 1)}</span>
                    {serviceNames[serviceId]}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        }
      >
        <ButtonLink href={start.href} icon="arrow">
          {start.label}
        </ButtonLink>
        <ButtonLink href={localePath(locale, "/services/")} variant="secondary">
          {copy.back}
        </ButtonLink>
      </PageIntro>

      <section className="tone-alt section" aria-labelledby="audience-title">
        <div className="container">
          <SectionHead id="audience-title" title={copy.audience} intro={family.text} />
          <Reveal>
            <ul className={styles.audience}>
              {family.page.audience.map((situation, index) => (
                <li key={situation} className={styles.situation} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <p className="type-lede">{situation}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="deliverables-title">
        <div className={cn("container", styles.split)}>
          <Reveal as="header" className={styles.splitHead}>
            <h2 id="deliverables-title" className="type-h2" data-reveal="">
              {copy.deliverables}
            </h2>
            <p className="type-lede" data-reveal="">
              {family.title}
            </p>
          </Reveal>
          <Reveal className={styles.splitBody}>
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

      <section className="tone-alt section" aria-labelledby="process-title">
        <div className="container">
          <SectionHead id="process-title" title={copy.process} />
          <Reveal>
            <ol className={styles.steps}>
              {family.page.process.map((step, index) => (
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

      {related.length > 0 && (
        <section className="section" aria-labelledby="work-title">
          <div className="container">
            <SectionHead id="work-title" title={copy.work} intro={copy.workIntro(name)} />
            <Reveal>
              <ul className={styles.work}>
                {related.map((project) => {
                  const href = localePath(locale, `/our-projects/${project.slug}/`);
                  return (
                    <li key={project.slug} data-reveal="">
                      <article className={styles.card} aria-labelledby={`project-${project.slug}`}>
                        <div
                          className={styles.media}
                          style={{ "--ratio": `${project.image.width} / ${project.image.height}` } as CSSProperties}
                        >
                          <Image
                            src={project.image.src}
                            alt={project.image.alt}
                            fill
                            sizes="(min-width: 90rem) 650px, (min-width: 48em) 46vw, 92vw"
                            className={styles.image}
                          />
                          {/* Pointer shortcut to the same page as the title link (not a second tab stop). */}
                          <Link href={href} className={styles.mediaLink} tabIndex={-1} aria-hidden="true" />
                        </div>
                        <h3 id={`project-${project.slug}`} className="type-h3">
                          <Link href={href} className={styles.cardLink}>
                            {project.title}
                          </Link>
                        </h3>
                        <p className={cn("type-label", styles.disciplines)}>
                          {project.categories.map((category) => serviceNames[category]).join(" · ")}
                        </p>
                        <p className="type-body">{project.summary}</p>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <div className={styles.more}>
              <Link href={localePath(locale, "/our-projects/")} className={styles.moreLink}>
                {copy.allWork}
                <ArrowIcon className={styles.arrow} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <FaqSection title={copy.faq} faqs={family.page.faqs} tone="tone-alt" />

      <CtaBand
        cta={{
          label: copy.cta.label,
          title: copy.cta.title(name),
          text: copy.cta.text,
          primary: start,
          secondary: content.actions.talkToUs,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJsonLd(content, id, family.page.meta.description) }}
      />
    </>
  );
}
