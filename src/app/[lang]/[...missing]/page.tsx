/**
 * The 404 page, written once per language as /404/ (/ar/404/) and rendered in full, for
 * public/.htaccess to serve for any missing URL on the host. (notFound() would export an
 * empty shell. Static export needs dynamicParams off, so under `next dev` other unknown URLs
 * get Next's plain 404 instead.)
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ missing: ["404"] }];
}

export { default, generateMetadata } from "../not-found";
