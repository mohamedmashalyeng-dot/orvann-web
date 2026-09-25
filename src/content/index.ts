import { ar } from "./ar";
import { en } from "./en";
import type { Locale, SiteContent } from "./types";

export const locales = ["en", "ar"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

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

export type * from "./types";
