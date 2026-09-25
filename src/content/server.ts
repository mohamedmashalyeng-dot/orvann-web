import { notFound } from "next/navigation";
import { getContent, isLocale } from "./index";

/** Route params for every page under app/[lang]. */
export type LangParams = { params: Promise<{ lang: string }> };

/** The content for a route's language; any other language segment is a 404. */
export async function contentFor(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return getContent(lang);
}
