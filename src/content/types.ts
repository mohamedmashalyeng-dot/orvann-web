/**
 * Shape of all user-facing copy. Every locale implements SiteContent, so adding
 * Arabic later means adding one set of files (see ./index.ts) — components never hold copy.
 */

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

/** A run of text; `accent` renders in the serif italic reserved for ORVANN's verbs. */
export type Segment = { text: string; accent?: boolean };
export type RichLine = Segment[];

export type Link = { label: string; href: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type Step = { title: string; text: string };
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
  header: {
    nav: Link[];
    cta: Link;
    menu: string;
    close: string;
    /** Switch to the other language: its name, written in that language, and an accessible label. */
    language: { label: string; ariaLabel: string };
  };
  hero: {
    headline: RichLine[];
    lede: string;
    cta: Link;
  };
  clients: { title: string };
  /** Each service links to the family on the services page that covers it. */
  services: { title: string; items: Link[] };
  about: { title: string; text: string; link: Link };
  vision: Step;
  mission: Step;
  finalCta: { title: string; text: string; primary: Link };
  social: { label: string; title: string; profiles: SocialProfile[] };
  contact: {
    emailCta: string;
    whatsappCta: string;
    labels: { email: string; phone: string; whatsapp: string; headquarters: string };
    address: string;
  };
  footer: {
    tagline: string;
    explore: Link[];
    rights: string;
    privacy: string;
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
      /** The closing band's second action: this page is the work index, so it points on to Services. */
      servicesLink: Link;
    };
    caseStudy: {
      back: string;
      disciplines: string;
      challenge: string;
      solution: string;
      results: string;
      gallery: string;
      next: string;
      /** Link to the client's own website, on case studies that have one. */
      visitWebsite: string;
    };
    privacy: { meta: PageMeta; intro: PageIntro; effective: string; sections: PolicySection[] };
    publicationLink: string;
    publications: Publication[];
    cta: { label: string; title: string; text: string; primary: Link; secondary: Link };
  };
  projects: Project[];
};
