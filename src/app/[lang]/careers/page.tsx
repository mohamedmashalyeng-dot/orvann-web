import type { Metadata } from "next";
import { contentFor, type LangParams } from "@/content/server";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { Logo } from "@/components/ui/Logo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CareersForm } from "@/components/page/CareersForm";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.careers.meta, "/careers/");
}

/**
 * Careers & Internships: the application form and nothing else. A standalone page, outside
 * the (site) group, so it has no header, footer, launch bar or WhatsApp shortcut; only the
 * ORVANN logo above the form. The form posts to a small PHP handler on the host that records
 * the application, CV included, in the CRM and emails ORVANN.
 */
export default async function CareersPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.careers;
  const { zones, regions } = content.pages.contact.form;

  return (
    <main id="main" tabIndex={-1} className={cn("tone-base", styles.page)} data-standalone="">
      <div id="application-form" className={cn("container", styles.inner)}>
        <Logo label={content.meta.siteName} className={styles.logo} />
        <header className={styles.head}>
          <SectionLabel>{page.label}</SectionLabel>
          <h1 className="type-h2">{page.form.title}</h1>
          <p className={cn("type-body", styles.lede)}>{page.form.lede}</p>
        </header>
        <CareersForm locale={content.locale} copy={page.form} places={{ zones, regions }} />
      </div>
    </main>
  );
}
