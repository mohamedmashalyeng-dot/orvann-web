import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { contentFor, type LangParams } from "@/content/server";
import { flags, googleSiteVerification, isPublishedHref, publishedLocales, site, siteUrl } from "@/config/site";
import { DEFAULT_THEME, THEME_COLORS, themeScript } from "@/theme/theme";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { TransitionShell } from "@/components/layout/TransitionShell";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import "@/styles/tokens.css";
import "../globals.css";

// Poppins sets every English text, from the hero headline to labels (preloaded).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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

const fontVariables = [poppins, bukra].map((font) => font.variable).join(" ");

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
  // Links into hidden parts never reach the page, not even in the header's client data.
  const header = { ...content.header, nav: content.header.nav.filter((item) => isPublishedHref(item.href)) };

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
        <SiteHeader
          locale={content.locale}
          header={header}
          actions={content.actions}
          nav={header.nav}
          languageSwitch={flags.showArabic}
          a11y={content.a11y}
        />
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
