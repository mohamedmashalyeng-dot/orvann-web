import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  localePath,
  serviceIds,
  servicePath,
  serviceSlugs,
  serviceTopics,
  type ImageAsset,
  type Project,
  type ServiceCase,
  type ServiceId,
  type SiteContent,
} from "@/content";
import { contentFor } from "@/content/server";
import { flags, site, siteUrl } from "@/config/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { PageIntro } from "@/components/page/PageIntro";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

type Props = { params: Promise<{ lang: string; service: string }> };

// One page per solution; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceIds.map((id) => ({ service: serviceSlugs[id] }));
}

/** The solution a slug names, with its copy in the page's language. */
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
// Pictures per case study in a story's gallery: its cover and the first of its gallery.
const perProject = 3;
const ratio = (image: ImageAsset) => ({ "--ratio": `${image.width} / ${image.height}` }) as CSSProperties;

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

/** What a gallery shows, as tags. */
function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** A client story: its facts set apart, the story, and pictures from the case studies behind it. */
function CaseStory({
  story,
  label,
  index,
  projects,
  content,
}: {
  story: ServiceCase;
  label: string;
  index: number;
  projects: Project[];
  content: SiteContent;
}) {
  const { locale } = content;
  const copy = content.pages.services.servicePage;
  const titleId = `case-${index + 1}-title`;
  const images = projects.flatMap((project) =>
    [project.image, ...(project.gallery ?? [])].slice(0, perProject).map((image) => ({ project, image })),
  );

  return (
    <article className={styles.case} aria-labelledby={titleId}>
      <Reveal className={styles.caseHead}>
        <p className={cn("type-label", styles.caseLabel)} data-reveal="">
          {story.client ? (
            <>
              {label} | <span dir="ltr">{story.client}</span>
            </>
          ) : (
            label
          )}
        </p>
        <h3 id={titleId} className="type-h2" data-reveal="">
          {story.title}
        </h3>
        {story.facts && (
          <dl className={styles.facts} data-reveal="">
            {story.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className="type-label">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Reveal>

      <Reveal className={styles.caseBody}>
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph} className="type-lede" data-reveal="">
            {paragraph}
          </p>
        ))}
        {story.list && (
          <div className={styles.caseList} data-reveal="">
            <p className="type-label">{story.list.label}</p>
            <ul>
              {story.list.items.map((item) => (
                <li key={item} dir="ltr">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {story.closing && (
          <p className={styles.closing} data-reveal="">
            {story.closing}
          </p>
        )}
      </Reveal>

      {(images.length > 0 || story.tags) && (
        <Reveal className={styles.gallery}>
          {story.galleryLabel && images.length > 0 && (
            <p className={cn("type-label", styles.caseLabel)} data-reveal="">
              {story.galleryLabel}
            </p>
          )}
          {images.length > 0 && (
            <ul className={styles.images}>
              {images.map(({ project, image }) => (
                <li key={image.src} className={styles.media} style={ratio(image)} data-reveal="">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 90rem) 650px, (min-width: 48em) 46vw, 92vw"
                    className={styles.image}
                  />
                  {/* Pointer shortcut to the case study (the link below is the tab stop). */}
                  <Link
                    href={localePath(locale, `/our-projects/${project.slug}/`)}
                    className={styles.mediaLink}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          )}
          {story.tags && <Tags tags={story.tags} />}
          {projects.length > 0 && (
            <ul className={styles.caseLinks} data-reveal="">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={localePath(locale, `/our-projects/${project.slug}/`)} className={styles.moreLink}>
                    {copy.viewCase}: <span dir="ltr">{project.title}</span>
                    <ArrowIcon className={styles.arrow} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      )}
    </article>
  );
}

/**
 * A solution's own page: what it is, how ORVANN delivers it, the client stories behind it, and
 * a closing band whose button opens the contact form with the matching topic chosen.
 */
export default async function ServicePage({ params }: Props) {
  const { content, id, family } = await serviceFor(params);
  const { locale, serviceNames } = content;
  const copy = content.pages.services.servicePage;
  const { page } = family;
  const name = serviceNames[id];
  const start = { label: copy.start, href: `${localePath(locale, "/contact-us/")}?need=${serviceTopics[id]}#project-form` };
  // Case studies are only linked while Our Work is published.
  const projectsFor = (story: ServiceCase) =>
    flags.showWork
      ? (story.projects ?? []).flatMap((slug) => content.projects.find((project) => project.slug === slug) ?? [])
      : [];
  const [lede, ...body] = page.paragraphs;

  return (
    <>
      <PageIntro
        intro={{ label: page.englishName ? `${name} | ${page.englishName}` : name, title: page.title, lede, body }}
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
        {page.highlight && <p className={styles.highlight}>{page.highlight}</p>}
        <ButtonLink href={start.href} icon="arrow">
          {start.label}
        </ButtonLink>
        <ButtonLink href={localePath(locale, "/services/")} variant="secondary">
          {copy.back}
        </ButtonLink>
      </PageIntro>

      <section className="tone-alt section" aria-labelledby="offerings-title">
        <div className={cn("container", styles.split)}>
          <Reveal as="header" className={styles.splitHead}>
            <h2 id="offerings-title" className="type-h2" data-reveal="">
              {page.offerings.title}
            </h2>
          </Reveal>
          <Reveal className={styles.splitBody}>
            <ol className={styles.items}>
              {page.offerings.items.map((item, index) => (
                <li key={item.title} className={styles.item} data-reveal="">
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <h3 className="type-h3">{item.title}</h3>
                  <p className="type-body">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="cases-title">
        <div className={cn("container", styles.cases)}>
          {/* Each story repeats the label beside its client, so the section's own heading is for screen readers. */}
          <h2 id="cases-title" className="visually-hidden">
            {page.casesLabel}
          </h2>
          {page.cases.map((story, index) => (
            <CaseStory
              key={story.title}
              story={story}
              label={page.casesLabel}
              index={index}
              projects={projectsFor(story)}
              content={content}
            />
          ))}
        </div>
      </section>

      {page.sectors && (
        <section className="tone-alt section" aria-labelledby="sectors-title">
          <div className="container">
            <Reveal className={styles.sectorsHead}>
              <h2 id="sectors-title" className="type-h2" data-reveal="">
                {page.sectors.title}
              </h2>
            </Reveal>
            <Reveal>
              <ul className={styles.sectors}>
                {page.sectors.groups.map((group) => (
                  <li key={group.title} className={styles.sector} data-reveal="">
                    <h3 className="type-h3">{group.title}</h3>
                    <p className="type-body">{group.text}</p>
                    {group.names && (
                      <p className={styles.names} dir="ltr">
                        {group.names}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
            {page.sectors.tags && (
              <Reveal className={styles.sectorsTags}>
                <div data-reveal="">
                  <Tags tags={page.sectors.tags} />
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <CtaBand cta={{ title: page.cta.title, text: page.cta.text, emphasis: page.cta.emphasis, primary: start }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serviceJsonLd(content, id, page.meta.description) }}
      />
    </>
  );
}
