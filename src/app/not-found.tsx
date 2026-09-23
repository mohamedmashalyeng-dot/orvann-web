import type { Metadata } from "next";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./not-found.module.css";

const content = getContent();

export const metadata: Metadata = {
  title: `${content.notFound.title} — ${content.meta.siteName}`,
  robots: { index: false, follow: true },
};

/** Rendered inside the root layout, so the header, footer and navigation stay available. */
export default function NotFound() {
  const copy = content.notFound;

  return (
    <section className={cn("tone-base", styles.page)} aria-labelledby="not-found-title">
      <div className={cn("container", styles.body)}>
        <SectionLabel>{copy.label}</SectionLabel>
        <h1 id="not-found-title" className="type-display">
          {copy.title}
        </h1>
        <p className="type-lede">{copy.text}</p>
        <div className={styles.actions}>
          <ButtonLink href="/" icon="arrow">
            {copy.home}
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            {copy.contact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
