/**
 * Shape of all user-facing copy. Every locale implements SiteContent, so adding
 * Arabic later means adding one set of files (see ./index.ts) — components never hold copy.
 */

export type Locale = "en";
export type Direction = "ltr" | "rtl";

/** A run of text; `accent` renders in the serif italic reserved for ORVANN's verbs. */
export type Segment = { text: string; accent?: boolean };
export type RichLine = Segment[];

export type Link = { label: string; href: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type ServiceItem = {
  title: string;
  text: string;
  /** Specific inclusions, all sourced from orvann.com. */
  details: string[];
};

export type ServiceGroup = {
  id: string;
  verb: string;
  title: string;
  summary: string;
  items: ServiceItem[];
  cta: Link;
};

export type Step = { title: string; text: string };
export type Fact = { term: string; detail: string };
export type Faq = { question: string; answer: string };
export type PageMeta = { title: string; description: string };
export type PageIntro = { label: string; title: string; lede: string };

export type ProjectCategory = "branding" | "websites" | "social" | "campaigns" | "strategy" | "events";

/**
 * A verified ORVANN project (source: orvann.com/our-projects). Every field restates the
 * project's own page; nothing is invented.
 */
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  disciplines: string[];
  categories: ProjectCategory[];
  /** One sentence for cards. */
  summary: string;
  challenge: string;
  solution: string[];
  results: string[];
  image: ImageAsset;
  gallery?: ImageAsset[];
  /** Shown in Selected Work on the homepage. */
  featured?: boolean;
};

export type ServiceFamily = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  items: Step[];
  /** An ORVANN project image that illustrates the family. */
  image: ImageAsset;
};

export type ProcessStage = { title: string; points: string[] };

export type PolicySection = { heading: string; paragraphs?: string[]; list?: string[] };

export type Publication = {
  slug: string;
  meta: PageMeta;
  intro: PageIntro;
  flipbookUrl: string;
  frameTitle: string;
};

export type SocialProfile = {
  id: "linkedin" | "instagram" | "facebook" | "whatsapp";
  label: string;
  handle: string;
  href: string;
};

export type SiteContent = {
  locale: Locale;
  dir: Direction;
  meta: { title: string; description: string; siteName: string; ogLocale: string };
  notFound: { label: string; title: string; text: string; home: string; contact: string };
  a11y: {
    skipToContent: string;
    home: string;
    primaryNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    newTab: string;
    lightMode: string;
    whatsappFloat: string;
  };
  review: { proposedCopy: string };
  header: { nav: Link[]; cta: Link; menu: string; close: string };
  hero: {
    eyebrow: string;
    location: string;
    headline: RichLine[];
    lede: string;
    primaryCta: Link;
    secondaryCta: Link;
    graphicLabels: { build: string; grow: string };
  };
  marquee: string[];
  services: {
    label: string;
    title: string;
    intro: string;
    groups: ServiceGroup[];
    detailsLabel: string;
    more: { title: string; items: Step[] };
    link: Link;
  };
  work: { label: string; title: string; intro: string; viewProject: string; link: Link };
  approach: { label: string; title: string; intro: string; steps: Step[] };
  about: {
    label: string;
    title: string;
    body: string[];
    facts: Fact[];
    partnersLabel: string;
    link: Link;
  };
  social: { label: string; title: string; profiles: SocialProfile[] };
  contact: {
    label: string;
    title: string;
    lede: string;
    emailCta: string;
    whatsappCta: string;
    labels: { email: string; phone: string; whatsapp: string; headquarters: string; follow: string };
    address: string;
  };
  footer: {
    tagline: string;
    exploreTitle: string;
    explore: Link[];
    followTitle: string;
    contactTitle: string;
    moreTitle: string;
    more: Link[];
    rights: string;
    privacy: string;
    backToTop: string;
  };
  pages: {
    about: {
      meta: PageMeta;
      intro: PageIntro;
      storyLabel: string;
      storyTitle: string;
      chapters: Step[];
      why: { title: string; text: string };
      achievements: { title: string; text: string };
      values: { label: string; title: string; text: string; items: string[] };
      partners: { label: string; title: string; text: string; benefits: Step[] };
      faqTitle: string;
      faqs: Faq[];
      publicationsTitle: string;
    };
    services: {
      meta: PageMeta;
      intro: PageIntro;
      families: ServiceFamily[];
      why: { title: string; text: string };
      faqTitle: string;
      faqs: Faq[];
    };
    exhibitions: {
      meta: PageMeta;
      intro: PageIntro;
      text: string;
      image: ImageAsset;
      processLabel: string;
      processTitle: string;
      stages: ProcessStage[];
      news: { label: string; title: string; text: string; link: Link };
    };
    contact: {
      meta: PageMeta;
      intro: PageIntro;
      channelsTitle: string;
      faqTitle: string;
      faqs: Faq[];
    };
    work: {
      meta: PageMeta;
      intro: PageIntro;
      filterLabel: string;
      filters: Record<"all" | ProjectCategory, string>;
      countLabel: (count: number) => string;
      empty: string;
    };
    caseStudy: {
      back: string;
      disciplines: string;
      challenge: string;
      solution: string;
      results: string;
      gallery: string;
      next: string;
    };
    privacy: { meta: PageMeta; intro: PageIntro; effective: string; sections: PolicySection[] };
    publicationLink: string;
    publications: Publication[];
    cta: { label: string; title: string; text: string; primary: Link; secondary: Link };
  };
  projects: Project[];
};
