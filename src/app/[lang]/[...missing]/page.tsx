import { notFound } from "next/navigation";

/**
 * Any URL no page matches, in either language. Sending it to notFound() here renders
 * app/[lang]/not-found.tsx inside that language's layout, with header, footer and dir.
 */
export default function Missing() {
  notFound();
}
