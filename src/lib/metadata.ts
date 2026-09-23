import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { getContent, type PageMeta } from "@/content";

/**
 * The shared sharing image. The opengraph-image / twitter-image files in src/app only
 * reach the root route by themselves, so inner pages point at the same files here.
 * (Pages are prerendered, so this file is read once, at build time.)
 */
const shareAlt = readFileSync(join(process.cwd(), "src/app/opengraph-image.alt.txt"), "utf8").trim();
const shareImage = (url: string) => ({ url, width: 1200, height: 630, alt: shareAlt, type: "image/png" });

/**
 * Metadata for one route. Next.js replaces nested objects (openGraph, twitter) wholesale
 * rather than merging them with the layout's, so every page sets the full set here.
 */
export function pageMetadata(meta: PageMeta, path: string): Metadata {
  const { meta: site } = getContent();
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.siteName,
      locale: site.ogLocale,
      url: path,
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
