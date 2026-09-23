import { en } from "./en";
import type { Locale, SiteContent } from "./types";

export const locales = ["en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, SiteContent> = { en };

/** Adding Arabic: extend Locale with "ar", add ar.ts with dir: "rtl", register it here. */
export function getContent(locale: Locale = defaultLocale): SiteContent {
  return dictionaries[locale];
}

export type * from "./types";
