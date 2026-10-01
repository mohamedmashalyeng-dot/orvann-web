import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * The site ships as static files for shared hosting (Hostinger): `next build` writes them to
 * out/. There, public/.htaccess does what src/proxy.ts does in development — English at the
 * root, Arabic under /ar/ — and redirects the old WordPress URLs. `next dev` stays a normal
 * server, because Next skips the proxy in export mode and English would lose its root URLs.
 */
export default function config(phase: string): NextConfig {
  return {
    output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : "export",

    // Match the current orvann.com URLs exactly (e.g. /about-us/, /our-projects/akam/),
    // so existing links and search results keep working without redirects.
    trailingSlash: true,

    // Static hosting has no image server: images are served as they are in public/.
    images: { unoptimized: true },
  };
}
