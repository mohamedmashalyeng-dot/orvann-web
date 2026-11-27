import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { contentFor, type LangParams } from "@/content/server";
import { analyticsId, flags, googleSiteVerification, publishedLocales, siteUrl } from "@/config/site";
import { analyticsScript } from "@/lib/analytics";
import { DEFAULT_THEME, THEME_COLORS, themeScript } from "@/theme/theme";
import { TransitionShell } from "@/components/layout/TransitionShell";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import "lenis/dist/lenis.css";
import "@/styles/tokens.css";
import "../globals.css";

// English text and labels (ORVANN's new direction: Inter for body, subheadings and captions).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// English headlines: Archivo with its width axis, drawn in to a bold condensed sans.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// The italic serif of the brand lines ("Strategy. Creative. Execution.").
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

// Arabic text is set in Thmanyah Sans, declared with @font-face in globals.css: its files
// stay off GitHub (licence), so next/font cannot bundle them.

const fontVariables = [inter, archivo, instrument].map((font) => font.variable).join(" ");

// Only the published languages are built; anything else under the language segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedLocales.map((lang) => ({ lang }));
}

// Shared metadata. Each page sets its own title, canonical URL and sharing tags
// (src/lib/metadata.ts); the icons come from the file conventions in src/app.
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return {
    metadataBase: new URL(siteUrl),
    title: content.meta.title,
    description: content.meta.description,
    applicationName: content.meta.siteName,
    // Staging and previews (ORVANN_ALLOW_INDEXING=false) stay out of search results.
    robots: flags.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
};

// The document itself: fonts, theme, skip link, the page-transition curtain and motion.
// The header, footer and WhatsApp shortcut are the site's own pages' chrome
// ((site)/layout.tsx); a standalone page such as Careers renders without them, and each
// page group supplies the <main id="main"> the skip link points at.
// suppressHydrationWarning: the theme script may change data-theme before React hydrates.
export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode }> & LangParams) {
  const content = await contentFor(params);

  return (
    <html
      lang={content.locale}
      dir={content.dir}
      data-theme={DEFAULT_THEME}
      data-scroll-behavior="smooth"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="tone-base">
        <a id="skip-link" className="skip-link" href="#main">
          {content.a11y.skipToContent}
        </a>
        {children}
        <TransitionShell />
        <MotionRuntime />
        {analyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
            <Script id="analytics" dangerouslySetInnerHTML={{ __html: analyticsScript(analyticsId) }} />
          </>
        )}
      </body>
    </html>
  );
}
