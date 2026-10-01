/**
 * Business facts that do not change between languages.
 * Source: orvann.com home, contact and about pages (inspected 22 Sep 2026). The Facebook
 * URL is where the site's own Facebook link redirects.
 */
export const site = {
  name: "ORVANN",
  email: "info@orvann.com",
  phone: { display: "+20 108 078 4465", href: "tel:+201080784465" },
  whatsapp: { display: "+20 108 078 4465", href: "https://wa.me/201080784465" },
  social: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/orvann/" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/orvann.eg/" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/orvann.eg" },
  ],
  privacyPolicyUrl: "/privacy-policy/",
  address: { street: "Al-Haram St.", locality: "Giza", countryCode: "EG" },
  /** Square brand mark used for structured data (the site icon from orvann.com). */
  logoPath: "/brand/orvann-mark.png",
} as const;

export type Partner = {
  name: string;
  /** White-on-transparent logo, trimmed to its visible bounds. */
  src: string;
  width: number;
  height: number;
  /** Full-colour logo with the same bounds, shown on hover. */
  colorSrc?: string;
  /** The partner's own website (verified). Without one, the logo links to `project`. */
  href?: string;
  /** Slug of the partner's case study on this site. */
  project: string;
};

/**
 * Logos shown under "Our Success Stories" on orvann.com. Names are read from the logos and
 * matched to the project pages on orvann.com/our-projects (the Arabic mark is Diwanyah
 * Culture). Websites and colour logos were checked against each partner's own site on
 * 25 Sep 2026 (the logo on the site had to match this one); colour files come from those
 * sites, and Al Marefa Tech's is its mark in the teal of its site. Partners with no
 * verified website or colour logo yet fall back to their case study and a plain highlight.
 */
export const partners: readonly Partner[] = [
  {
    name: "Eagles Developments",
    src: "/partners/eagles.png",
    width: 318,
    height: 215,
    colorSrc: "/partners/eagles-color.png",
    href: "https://www.eagles-developments.com/",
    project: "eagles-real-estate-development",
  },
  {
    name: "Tucano",
    src: "/partners/tucano.png",
    width: 512,
    height: 120,
    colorSrc: "/partners/tucano-color.png",
    href: "https://tucano.almarefatech.com/",
    project: "tucano-2",
  },
  {
    name: "Al Marefa Tech",
    src: "/partners/marefa.svg",
    width: 191,
    height: 65,
    colorSrc: "/partners/marefa-color.svg",
    href: "https://almarefatech.com/",
    project: "al-marefah-tech",
  },
  { name: "RGC", src: "/partners/rgc.svg", width: 155, height: 50, project: "rgc-brokerage" },
  { name: "Alnour Optical", src: "/partners/alnour.png", width: 768, height: 166, project: "al-nour-optics" },
  {
    name: "Plaza Gardens Developments",
    src: "/partners/plaza.svg",
    width: 168,
    height: 65,
    href: "https://www.plazagardens.com/",
    project: "plaza-garden-real-estate-development",
  },
  { name: "Diwanyah Culture", src: "/partners/moltqa.svg", width: 48, height: 66, project: "diwanyah-culture" },
  { name: "Modern Fix", src: "/partners/fix.svg", width: 65, height: 65, project: "modern-fix" },
];

/**
 * Build-time switches, read on the server only. Every default is the production-safe
 * state, so a build with no environment variables is a clean public release.
 */
export const flags = {
  /** Show "Proposed copy" tags on sections whose wording still needs sign-off. */
  reviewMode: process.env.ORVANN_REVIEW_MODE === "true",
  /** Let search engines index the site. Leave unset on staging and previews. */
  allowIndexing: process.env.ORVANN_ALLOW_INDEXING === "true",
} as const;

/**
 * Google Search Console verification token. The live site carries one in a meta tag;
 * set it here at cut-over if Search Console ownership relies on that tag (not DNS).
 */
export const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION || undefined;

/** Canonical origin for metadata, sitemap and structured data. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://orvann.com").replace(/\/$/, "");
