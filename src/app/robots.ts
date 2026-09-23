import type { MetadataRoute } from "next";
import { flags, siteUrl } from "@/config/site";

/**
 * Crawling is blocked unless ORVANN_ALLOW_INDEXING=true, so previews and staging never
 * get indexed by accident. Set it on the production deployment only.
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
