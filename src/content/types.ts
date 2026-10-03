/**
 * Shape of all user-facing copy. Every locale implements SiteContent, so adding
 * Arabic later means adding one set of files (see ./index.ts) — components never hold copy.
 */

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

/** A run of text; `accent` sets it apart in the accent colour. */
export type Segment = { text: string; accent?: boolean };
export type RichLine = Segment[];

export type Link = { label: string; href: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type Step = { title: string; text: string };
export type Faq = { question: string; answer: string };
export type PageMeta = { title: string; description: string };
/** Opening of an inner page; `body` adds paragraphs under the lede. */
export type PageIntro = { label: string; title: string; lede: string; body?: string[] };

/**
 * ORVANN's five service areas, in their fixed order (see `serviceIds` in ./index.ts). They
 * are the services everywhere: homepage, services page, project categories and footer.
 */
export type ServiceId = "strategy" | "branding" | "marketing" | "digital" | "events";
export type ProjectCategory = ServiceId;

/**
 * An ORVANN project (source: orvann.com/our-projects). The services come from the five
 * service areas only.
 */
export type Project = {
  slug: string;
  title: string;
  categories: ServiceId[];
  /** The scope delivered, in one sentence: cards and the case study's opening. */
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
  id: ServiceId;
  title: string;
  text: string;
  items: Step[];
  bestFor: string;
};

export type PolicySection = { heading: string; paragraphs?: string[]; list?: string[] };

export type Publication = {
  slug: string;
  meta: PageMeta;
  intro: PageIntro;
  flipbookUrl: string;
  frameTitle: string;
};

/** The closing band: an invitation and one or two next steps. */
export type Cta = { label?: string; title: string; text: string; primary: Link; secondary?: Link };

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
    footerServices: string;
    openMenu: string;
    closeMenu: string;
    newTab: string;
    lightMode: string;
    whatsappFloat: string;
  };
  review: { proposedCopy: string };
  /** The five service names, by id. */
  serviceNames: Record<ServiceId, string>;
  /** Shared links: Start a Project (the form) and Book a Meeting (direct contact). */
  actions: { startProject: Link; bookMeeting: Link };
  header: {
    nav: Link[];
    menu: string;
    close: string;
    /** Switch to the other language: its name, written in that language, and an accessible label. */
    language: { label: string; ariaLabel: string };
  };
  // ---- Homepage ----
  hero: {
    headline: RichLine[];
    subheadline: string;
    lede: string;
    secondaryCta: Link;
  };
  clients: { title: string; text: string };
  services: {
    label: string;
    title: string;
    intro: string;
    items: { id: ServiceId; text: string; link: string }[];
  };
  integrated: { title: string; subtitle: string; paragraphs: string[]; options: string[] };
  work: { label: string; title: string; paragraphs: string[]; viewProject: string; link: Link };
  deliverables: { title: string; intro: string; items: string[] };
  why: { label: string; title: string; subtitle: string; paragraphs: string[]; points: Step[] };
  vision: Step;
  mission: Step;
  faq: { title: string; items: Faq[] };
  footer: {
    tagline: string;
    description: string;
    explore: Link[];
    rights: string;
    privacy: string;
  };
  pages: {
    about: {
      meta: PageMeta;
      intro: PageIntro;
      cta: Link;
      who: { title: string; intro: string; paragraphs: string[] };
      story: { title: string; paragraphs: string[]; sequence: string[]; closing: string };
      capabilities: { title: string; items: { id: ServiceId; text: string }[] };
      process: { title: string; steps: Step[] };
      model: { title: string; paragraphs: string[] };
      values: { title: string; items: Step[] };
      faqTitle: string;
      faqs: Faq[];
    };
    services: {
      meta: PageMeta;
      intro: PageIntro;
      families: ServiceFamily[];
      bestForLabel: string;
      together: { title: string; paragraphs: string[]; exampleLabel: string; sequence: ServiceId[]; closing: string };
      faqTitle: string;
      faqs: Faq[];
    };
    contact: {
      meta: PageMeta;
      intro: PageIntro;
      form: {
        title: string;
        name: string;
        company: string;
        email: string;
        phone: string;
        need: string;
        /** Choices after the five services. */
        multiple: string;
        unsure: string;
        goal: string;
        goalHint: string;
        start: string;
        budget: string;
        optional: string;
        submit: string;
        sending: string;
        sent: string;
        failed: string;
      };
      direct: { title: string; email: string; phone: string; headquarters: string; address: string };
      faqTitle: string;
      faqs: Faq[];
    };
    work: {
      meta: PageMeta;
      intro: PageIntro;
      filterLabel: string;
      /** "All"; the other filters are the five service names. */
      all: string;
      countLabel: (count: number) => string;
      empty: string;
    };
    caseStudy: {
      back: string;
      services: string;
      context: string;
      delivered: string;
      results: string;
      execution: string;
      next: string;
      /** Link to the client's own website, on case studies that have one. */
      visitWebsite: string;
    };
    privacy: { meta: PageMeta; intro: PageIntro; effective: string; sections: PolicySection[] };
    publicationLink: string;
    publications: Publication[];
    /** The closing band on every page but Contact. */
    cta: Cta;
  };
  projects: Project[];
};
