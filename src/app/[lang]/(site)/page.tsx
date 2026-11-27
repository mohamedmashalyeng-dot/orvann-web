import type { Metadata } from "next";
import { localePath, type SiteContent } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { flags, site, siteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { DirectionMosaic } from "@/components/sections/DirectionMosaic";
import { VisionMission } from "@/components/sections/VisionMission";
import { Philosophy } from "@/components/sections/Philosophy";
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
        announcement={content.launch.heroMessage}
        primary={content.hero.primaryCta}
        secondary={flags.showWork ? content.hero.secondaryCta : undefined}
        projects={content.projects.slice(0, 3).map((project) => project.image)}
      />
      <Services services={content.services} />
      <DirectionMosaic labels={content.direction} />
      {flags.showWork && (
        <Work locale={content.locale} work={content.work} serviceNames={content.serviceNames} projects={featured} />
      )}
      <VisionMission vision={content.vision} mission={content.mission} tone="tone-tint" />
      <Philosophy philosophy={content.philosophy} />
      <CtaBand cta={content.closing} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd(content) }} />
    </>
  );
}
