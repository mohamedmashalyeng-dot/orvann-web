import type { Metadata } from "next";
import { localePath, type SiteContent } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { site, siteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/hero/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { VisionMission } from "@/components/sections/VisionMission";
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

  return (
    <>
      <Hero hero={content.hero} />
      <Clients locale={content.locale} clients={content.clients} />
      <Services services={content.services} />
      <About about={content.about} />
      <VisionMission vision={content.vision} mission={content.mission} />
      <CtaBand cta={content.finalCta} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd(content) }} />
    </>
  );
}
