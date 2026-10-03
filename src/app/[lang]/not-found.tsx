import type { Metadata } from "next";
import { lang } from "next/root-params";
import { getContent, isLocale, localePath } from "@/content";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./not-found.module.css";

/** not-found receives no params; the language comes from the root segment instead. */
async function localizedContent() {
  const locale = await lang();
  return getContent(isLocale(locale) ? locale : undefined);
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await localizedContent();
  return {
    title: `${content.notFound.title} | ${content.meta.siteName}`,
    robots: { index: false, follow: true },
  };
}

/** Rendered inside the root layout, so the header, footer and navigation stay available. */
export default async function NotFound() {
  const content = await localizedContent();
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
          <ButtonLink href={localePath(content.locale, "/")} icon="arrow">
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
