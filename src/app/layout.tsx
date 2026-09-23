import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda, Fragment_Mono } from "next/font/google";
import { getContent } from "@/content";
import { flags, googleSiteVerification, site, siteUrl } from "@/config/site";
import { DEFAULT_THEME, THEME_COLORS, themeScript } from "@/theme/theme";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { TransitionShell } from "@/components/layout/TransitionShell";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import "@/styles/tokens.css";
import "./globals.css";

// Archivo carries display and body (its width axis gives headings their stance);
// Bodoni Moda echoes the serif ORVANN monogram; Fragment Mono sets labels.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// The italic sets "build" and "grow" in the hero headline (the page's largest content),
// so it is preloaded; the upright cut is only used by the wordmark and loads on demand.
const bodoniItalic = Bodoni_Moda({
  subsets: ["latin"],
  style: "italic",
  axes: ["opsz"],
  variable: "--font-bodoni-italic",
  display: "swap",
});

const bodoniUpright = Bodoni_Moda({
  subsets: ["latin"],
  style: "normal",
  axes: ["opsz"],
  variable: "--font-bodoni-upright",
  display: "swap",
  preload: false,
});

// Labels. Small (15 KB) and preloaded: the hero labels wrap on phones, so a late swap
// would nudge the headline (measured as layout shift).
const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

const content = getContent();

// Shared metadata. The Open Graph / Twitter image and the icons come from the file
// conventions in this folder (opengraph-image.png, twitter-image.png, icon.png, apple-icon.png).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: content.meta.title,
  description: content.meta.description,
  applicationName: content.meta.siteName,
  openGraph: {
    type: "website",
    siteName: content.meta.siteName,
    locale: content.meta.ogLocale,
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
  // Staging and previews stay out of search results unless indexing is switched on.
  robots: flags.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
};

// The header, footer, WhatsApp shortcut and page-transition curtain live here, so they
// stay mounted while pages change underneath them. Each page renders its sections only.
// suppressHydrationWarning: the theme script may change data-theme before React hydrates.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={content.locale}
      dir={content.dir}
      data-theme={DEFAULT_THEME}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${bodoniItalic.variable} ${bodoniUpright.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="tone-base">
        <a id="skip-link" className="skip-link" href="#main">
          {content.a11y.skipToContent}
        </a>
        <SiteHeader header={content.header} nav={content.header.nav} a11y={content.a11y} />
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
