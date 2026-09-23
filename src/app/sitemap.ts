import type { MetadataRoute } from "next";
import { getContent } from "@/content";
import { siteUrl } from "@/config/site";

/** Every real, indexable route (with trailing slashes, as next.config.ts serves them). */
export default function sitemap(): MetadataRoute.Sitemap {
  const content = getContent();
  const lastModified = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    entry("/services/", 0.9),
    entry("/our-projects/", 0.9),
    ...content.projects.map((project) => entry(`/our-projects/${project.slug}/`, 0.7)),
    entry("/exhibitions-conferences/", 0.8),
    entry("/about-us/", 0.8),
    ...content.pages.publications.map((publication) => entry(`/about-us/${publication.slug}/`, 0.4)),
    entry("/contact-us/", 0.8),
    entry("/privacy-policy/", 0.2),
  ];
}
