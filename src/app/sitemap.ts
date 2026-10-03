import type { MetadataRoute } from "next";
import { getContent, localePath } from "@/content";
import { flags, publishedLocales, siteUrl } from "@/config/site";

// Written to a file at build time (static export).
export const dynamic = "force-static";

/**
 * Every real, indexable route in each published language (with trailing slashes, as
 * next.config.ts serves them), leaving out Our Work while it is hidden. Each entry lists
 * its other-language versions as hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const content = getContent();
  const lastModified = new Date();
  const pages: [path: string, priority: number][] = [
    ["/", 1],
    ["/services/", 0.9],
    ...(flags.showWork
      ? [
          ["/our-projects/", 0.9] as [string, number],
          ...content.projects.map((project): [string, number] => [`/our-projects/${project.slug}/`, 0.7]),
        ]
      : []),
    ["/about-us/", 0.8],
    ...content.pages.publications.map((publication): [string, number] => [`/about-us/${publication.slug}/`, 0.4]),
    ["/contact-us/", 0.8],
    ["/privacy-policy/", 0.2],
  ];

  return pages.flatMap(([path, priority]) => {
    const languages = Object.fromEntries(
      publishedLocales.map((locale) => [locale, `${siteUrl}${localePath(locale, path)}`]),
    );
    return publishedLocales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
