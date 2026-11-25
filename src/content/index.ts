import { ar } from "./ar";
import { en } from "./en";
import type { Locale, ServiceId, SiteContent } from "./types";
import type { TopicId } from "./lead-options";

export const locales = ["en", "ar"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

/** ORVANN's nine integrated solutions, in the order they appear everywhere. */
export const serviceIds = [
  "strategy",
  "projects",
  "marketing",
  "digital",
  "representation",
  "supply",
  "ecommerce",
  "events",
  "craft",
] as const satisfies readonly ServiceId[];

/** Each solution's own page, /services/<slug>/ in every language. */
export const serviceSlugs: Record<ServiceId, string> = {
  strategy: "business-strategy-development",
  projects: "project-management-launch",
  marketing: "marketing-advertising",
  digital: "software-digital-solutions",
  representation: "business-representation-brokerage",
  supply: "import-export-supply",
  ecommerce: "e-commerce",
  events: "exhibitions-conferences-events",
  craft: "bespoke-craftsmanship",
};

/** The contact form topic each solution's page chooses when it opens the form (?need=…). */
export const serviceTopics: Record<ServiceId, TopicId> = {
  strategy: "strategy",
  projects: "launch",
  marketing: "marketing",
  digital: "digital",
  representation: "commercial",
  supply: "commercial",
  ecommerce: "digital",
  events: "unsure",
  craft: "unsure",
};

/** The English path of a service's page ("/services/strategy-consulting/"); see localePath. */
export const servicePath = (id: ServiceId) => `/services/${serviceSlugs[id]}/`;

const dictionaries: Record<Locale, SiteContent> = { en, ar };

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return dictionaries[locale];
}

/**
 * The public URL of a page in a language. English keeps orvann.com's current URLs
 * ("/services/"); Arabic lives under "/ar/" ("/ar/services/"). See src/proxy.ts.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}/` : `/${locale}${path}`;
}

/**
 * A pathname as the visitor sees it. English pages are rendered at their internal
 * "/en/…" path (the proxy rewrites to it), so prerendered HTML reports that path: strip it.
 */
export function publicPathname(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

/** The same page in another language, from a public or internal pathname. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const bare = publicPathname(pathname).replace(/^\/ar(?=\/|$)/, "") || "/";
  return localePath(to, bare);
}

export * from "./lead-options";
export * from "./career-options";
export type * from "./types";
