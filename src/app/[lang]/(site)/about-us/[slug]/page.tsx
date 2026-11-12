import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, type SiteContent } from "@/content";
import { contentFor } from "@/content/server";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageIntro } from "@/components/page/PageIntro";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

type Props = { params: Promise<{ lang: string; slug: string }> };

// The publications are fixed; any other slug under /about-us/ is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().pages.publications.map((publication) => ({ slug: publication.slug }));
}

const findPublication = (content: SiteContent, slug: string) => content.pages.publications.find((item) => item.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await contentFor(params);
  const publication = findPublication(content, (await params).slug);
  if (!publication) return {};
  return pageMetadata(content, publication.meta, `/about-us/${publication.slug}/`);
}

/** A publication (company profile, catalogues) shown as its Heyzine flipbook, as on orvann.com. */
export default async function PublicationPage({ params }: Props) {
  const content = await contentFor(params);
  const publication = findPublication(content, (await params).slug);
  if (!publication) notFound();

  return (
    <>
      <PageIntro intro={publication.intro}>
        <ButtonLink href={publication.flipbookUrl} icon="external" newTabLabel={content.a11y.newTab}>
          {content.pages.publicationLink}
        </ButtonLink>
      </PageIntro>

      <div className={styles.viewer}>
        <div className="container">
          <div className={styles.frame}>
            <iframe
              src={publication.flipbookUrl}
              title={publication.frameTitle}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className={styles.iframe}
            />
          </div>
        </div>
      </div>

      <CtaBand cta={content.pages.cta} />
    </>
  );
}
