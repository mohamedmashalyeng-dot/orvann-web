import type { Metadata, Viewport } from "next";
import { Archivo, Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import { locales } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { flags, googleSiteVerification, site, siteUrl } from "@/config/site";
import { DEFAULT_THEME, THEME_COLORS, themeScript } from "@/theme/theme";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { TransitionShell } from "@/components/layout/TransitionShell";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import "@/styles/tokens.css";
import "../globals.css";

// Archivo carries body text and mid-level headings (its width axis gives them their stance);
// Fragment Mono sets labels. Titles use Druk (English) or Bukra (Arabic), below.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Labels. Small (15 KB) and preloaded: the hero labels wrap on phones, so a late swap
// would nudge the headline (measured as layout shift).
const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

// English display type: page and section titles, the hero headline included (so it is
// preloaded). TRIAL files from Commercial Type: they map only 74 characters, so &, @, +
// and similar fall back to Archivo, and they are not licensed for a live site — replace
// with licensed Druk files before launch.
const druk = localFont({
  src: [
    { path: "../../fonts/druk-medium-trial.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/druk-bold-trial.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-druk",
  display: "swap",
});

// Arabic text, from display to body (29LT Bukra by 29Letters). A web licence is needed
// before launch. Not preloaded: English pages never use it.
const bukra = localFont({
  src: [
    { path: "../../fonts/29lt-bukra-light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/29lt-bukra-regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/29lt-bukra-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-bukra",
  display: "swap",
  preload: false,
});

const fontVariables = [archivo, fragmentMono, druk, bukra].map((font) => font.variable).join(" ");

// Only the two languages exist; anything else under the language segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
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
    // Staging and previews stay out of search results unless indexing is switched on.
    robots: flags.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
};

// The header, footer, WhatsApp shortcut and page-transition curtain live here, so they
// stay mounted while pages change underneath them. Each page renders its sections only.
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
        <SiteHeader locale={content.locale} header={content.header} nav={content.header.nav} a11y={content.a11y} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter content={content} />
        <FloatingWhatsApp
          href={site.whatsapp.href}
          label={content.a11y.whatsappFloat}
          newTabLabel={content.a11y.newTab}
        />
        <TransitionShell />
        <MotionRuntime />
      </body>
    </html>
  );
}
