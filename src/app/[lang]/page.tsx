import type { Metadata } from "next";
import { localePath, type SiteContent } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { flags, site, siteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/hero/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Integrated } from "@/components/sections/Integrated";
import { Work } from "@/components/sections/Work";
import { Deliverables } from "@/components/sections/Deliverables";
import { Why } from "@/components/sections/Why";
import { VisionMission } from "@/components/sections/VisionMission";
import { FaqSection } from "@/components/page/FaqSection";
import { CtaBand } from "@/components/page/CtaBand";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.meta, "/");
}

/** Organization structured data — verified facts only (orvann.com). */
function organizationJsonLd(content: SiteContent) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${siteUrl}${localePath(content.locale, "/")}`,
    logo: `${siteUrl}${site.logoPath}`,
    email: site.email,
    telephone: site.phone.href.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.countryCode,
    },
    sameAs: site.social.map((profile) => profile.href),
  };
  // Escape "<" so the JSON can never close the script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function HomePage({ params }: LangParams) {
  const content = await contentFor(params);
  const featured = content.projects.filter((project) => project.featured);

  return (
    <>
      <Hero
        hero={content.hero}
        primary={content.actions.startProject}
        secondary={flags.showWork ? content.hero.secondaryCta : undefined}
      />
      <Clients locale={content.locale} clients={content.clients} />
      <Services locale={content.locale} services={content.services} serviceNames={content.serviceNames} />
      <Integrated integrated={content.integrated} />
      {flags.showWork && (
        <Work locale={content.locale} work={content.work} serviceNames={content.serviceNames} projects={featured} />
      )}
      <Deliverables deliverables={content.deliverables} />
      <Why why={content.why} />
      <VisionMission vision={content.vision} mission={content.mission} tone="tone-base" />
      <FaqSection title={content.faq.title} faqs={content.faq.items} tone="tone-alt" />
      <CtaBand cta={content.pages.cta} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd(content) }} />
    </>
  );
}
