import { getContent } from "@/content";
import { flags, site, siteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/hero/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

const content = getContent();

export const metadata = pageMetadata(content.meta, "/");

/** Organization structured data — verified facts only (orvann.com). */
function organizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${siteUrl}/`,
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

export default function HomePage() {
  const proposed = flags.reviewMode ? content.review.proposedCopy : undefined;
  // Selected Work can be switched off; the project pages themselves always stay.
  const featured = flags.hideWork ? [] : content.projects.filter((project) => project.featured);

  return (
    <>
      <Hero hero={content.hero} />
      <MarqueeBand items={content.marquee} />
      <Services services={content.services} proposedCopyLabel={proposed} />
      {featured.length > 0 && <Work work={content.work} projects={featured} />}
      <Approach approach={content.approach} proposedCopyLabel={proposed} />
      <About about={content.about} proposedCopyLabel={proposed} />
      <Contact contact={content.contact} newTabLabel={content.a11y.newTab} proposedCopyLabel={proposed} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd() }} />
    </>
  );
}
