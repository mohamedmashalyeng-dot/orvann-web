import { contentFor, type LangParams } from "@/content/server";
import { flags, isPublishedHref, site } from "@/config/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { AnnouncementBar } from "@/components/launch/AnnouncementBar";
import { LaunchIntro, launchIntroScript } from "@/components/launch/LaunchIntro";

// The site's chrome: launch intro and bar, header, footer and WhatsApp shortcut. It lives
// here, so it stays mounted while the site's pages change underneath it. Each page renders
// its sections only. Standalone pages (Careers) sit outside this group and go without it.
export default async function SiteLayout({ children, params }: Readonly<{ children: React.ReactNode }> & LangParams) {
  const content = await contentFor(params);
  // Links into hidden parts never reach the page, not even in the header's client data.
  const header = { ...content.header, nav: content.header.nav.filter((item) => isPublishedHref(item.href)) };

  return (
    <>
      {/* Before any content, so the intro covers the first paint (a standalone page never plays it). */}
      <script dangerouslySetInnerHTML={{ __html: launchIntroScript }} />
      <LaunchIntro intro={content.launch.intro} />
      <AnnouncementBar text={content.launch.announce} />
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
      <FloatingWhatsApp href={site.whatsapp.href} label={content.a11y.whatsappFloat} newTabLabel={content.a11y.newTab} />
    </>
  );
}
