import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { getContent, localePath, locales, type PageMeta, type SiteContent } from "@/content";

/**
 * The shared sharing image. The opengraph-image / twitter-image files in src/app only
 * reach the root route by themselves, so every page points at the same files here.
 * (Pages are prerendered, so this file is read once, at build time.)
 */
const shareAlt = readFileSync(join(process.cwd(), "src/app/opengraph-image.alt.txt"), "utf8").trim();
const shareImage = (url: string) => ({ url, width: 1200, height: 630, alt: shareAlt, type: "image/png" });

/**
 * Metadata for one route in one language. `path` is the English path ("/services/"); the
 * canonical URL and the hreflang alternates are derived from it for every language.
 * Next.js replaces nested objects (openGraph, twitter) wholesale rather than merging them
 * with the layout's, so every page sets the full set here.
 */
export function pageMetadata(content: SiteContent, meta: PageMeta, path: string): Metadata {
  const url = localePath(content.locale, path);
  const languages = Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)]));
  const otherLocales = locales.filter((locale) => locale !== content.locale).map((locale) => getContent(locale).meta.ogLocale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url, languages: { ...languages, "x-default": path } },
    openGraph: {
      type: "website",
      siteName: content.meta.siteName,
      locale: content.meta.ogLocale,
      alternateLocale: otherLocales,
      url,
      title: meta.title,
      description: meta.description,
      images: [shareImage("/opengraph-image.png")],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [shareImage("/twitter-image.png")],
    },
  };
}
