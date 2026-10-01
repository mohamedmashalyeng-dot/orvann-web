import type { MetadataRoute } from "next";
import { getContent, localePath, locales } from "@/content";
import { siteUrl } from "@/config/site";

// Written to a file at build time (static export).
export const dynamic = "force-static";

/**
 * Every real, indexable route in both languages (with trailing slashes, as next.config.ts
 * serves them). Each entry lists its other-language versions as hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const content = getContent();
  const lastModified = new Date();
  const pages: [path: string, priority: number][] = [
    ["/", 1],
    ["/services/", 0.9],
    ["/our-projects/", 0.9],
    ...content.projects.map((project): [string, number] => [`/our-projects/${project.slug}/`, 0.7]),
    ["/exhibitions-conferences/", 0.8],
    ["/about-us/", 0.8],
    ...content.pages.publications.map((publication): [string, number] => [`/about-us/${publication.slug}/`, 0.4]),
    ["/contact-us/", 0.8],
    ["/privacy-policy/", 0.2],
  ];

  return pages.flatMap(([path, priority]) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}${localePath(locale, path)}`]));
    return locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
