import type { MetadataRoute } from "next";
import { flags, siteUrl } from "@/config/site";

// Written to a file at build time (static export).
export const dynamic = "force-static";

/**
 * Crawling is allowed and the sitemap listed, unless ORVANN_ALLOW_INDEXING=false (staging and
 * previews), which blocks the whole site.
 */
export default function robots(): MetadataRoute.Robots {
  if (!flags.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
