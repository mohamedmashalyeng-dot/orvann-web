/**
 * Shape of all user-facing copy. Every locale implements SiteContent, so adding
 * Arabic later means adding one set of files (see ./index.ts) — components never hold copy.
 */

import type { BudgetId, JobTitleId, RegionId, RegionZoneId, TimelineId, TopicId } from "./lead-options";
import type { ArrangementId, EducationId, EmploymentId, ExperienceId, InterestId, StudyYearId } from "./career-options";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

/** A run of text; `accent` sets it apart in the accent colour. */
export type Segment = { text: string; accent?: boolean };
export type RichLine = Segment[];

export type Link = { label: string; href: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type Step = { title: string; text: string };
export type PageMeta = { title: string; description: string };
/** Opening of an inner page; `body` adds paragraphs under the lede. */
export type PageIntro = { label: string; title: string; lede?: string; body?: string[] };

/**
 * ORVANN's nine integrated solutions, in their fixed order (see `serviceIds` in ./index.ts).
 * They are the solutions everywhere: homepage, solutions page, project categories.
 */
export type ServiceId =
  | "strategy"
  | "projects"
  | "marketing"
  | "digital"
  | "representation"
  | "supply"
  | "ecommerce"
  | "events"
  | "craft";
export type ProjectCategory = ServiceId;

/**
 * An ORVANN project (source: orvann.com/our-projects). The services come from the nine
 * solutions only.
 */
export type Project = {
  slug: string;
  title: string;
  categories: ServiceId[];
  /** The scope delivered, in one sentence: cards and the case study's opening. */
  summary: string;
  /** Left out until ORVANN supplies it; the case study then skips that part. */
  challenge?: string;
  /** ORVANN's part in the project, in a sentence or two; skipped where not written yet. */
  role?: string;
  /** The work, step by step (the case study's Execution). */
  solution: string[];
  /**
   * The outcome. Only what can be shown or what ORVANN has approved: a figure needs its
   * source and period. Left out until ORVANN supplies it; the case study then skips that part.
   */
  results?: string[];
  image: ImageAsset;
  gallery?: ImageAsset[];
  /** Shown in Selected Work on the homepage. */
  featured?: boolean;
};

/** A client story on a solution's page ("From our experience"). */
export type ServiceCase = {
  /** The client, after the section label ("From our experience | Tucano Aircraft"). */
  client?: string;
  title: string;
  /** Key facts (sector, duration…), set apart above the story. */
  facts?: { label: string; value: string }[];
  paragraphs: string[];
  /** A short labelled list, e.g. the exhibitions taken part in. */
  list?: { label: string; items: string[] };
  /** The story's closing line, set in bold. */
  closing?: string;
  /** Case studies whose pictures make the gallery (and are linked from it). */
  projects?: string[];
  /** Pictures of the work itself, shown as the gallery when there is no case study. */
  images?: ImageAsset[];
  /** The label above the gallery. */
  galleryLabel?: string;
  /** What the gallery shows, as tags. */
  tags?: string[];
};

export type ServiceFamily = {
  id: ServiceId;
  /** The short line under the name on the solutions page. */
  tagline: string;
  text: string;
  /** The solution's own page, /services/<slug>/ (see serviceSlugs in ./index.ts). */
  page: {
    meta: PageMeta;
    /** The English name, shown under the label on the Arabic page. */
    englishName?: string;
    /** The h1, then the opening paragraphs and an optional line set in bold. */
    title: string;
    paragraphs: string[];
    highlight?: string;
    /** A wide picture under the intro. */
    cover?: ImageAsset;
    /** With a picture each, the offerings run as alternating picture-and-text rows. */
    offerings: { title: string; items: (Step & { image?: ImageAsset })[] };
    /** "From our experience" (or "From our creations"), then the client stories. */
    casesLabel: string;
    cases: ServiceCase[];
    /** Work across sectors, on the digital solutions page. */
    sectors?: {
      title: string;
      groups: { title: string; text: string; names?: string }[];
      galleryLabel?: string;
      tags?: string[];
    };
    /** The closing band; its button opens the form with the matching topic chosen. */
    cta: { title: string; text: string; emphasis?: string };
  };
};

export type PolicySection = { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] };

export type Publication = {
  slug: string;
  meta: PageMeta;
  intro: PageIntro;
  flipbookUrl: string;
  frameTitle: string;
};

/** The closing band: an invitation and one or two next steps. */
export type Cta = { label?: string; title: string; text: string; emphasis?: string; primary: Link; secondary?: Link };

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
  /** UAE presence: the hero flight announcement and the opening intro. */
  launch: {
    heroMessage: string;
    intro: { skip: string; from: string; to: string; eyebrow: string; title: string; place: string };
  };
  /** The nine solution names, by id. */
  serviceNames: Record<ServiceId, string>;
  /** Shared links: Start a Project (the form) and Talk to Us (direct contact). */
  actions: { startProject: Link; talkToUs: Link };
  header: {
    nav: Link[];
    menu: string;
    close: string;
    /** Switch to the other language: its name, written in that language, and an accessible label. */
    language: { label: string; ariaLabel: string };
  };
  // ---- Homepage ----
  hero: {
    /** The small line above the headline: ORVANN's English line in both languages. */
    label: string;
    headline: RichLine[];
    subheadline: string;
    /** The paragraphs under the subheadline. */
    paragraphs: string[];
    /** The first call to action (Let's Talk). */
    primaryCta: Link;
    secondaryCta: Link;
    /** Accessible name of the three project covers beside the headline. */
    projectsLabel: string;
  };
  /**
   * ORVANN's integrated solutions, as numbered rows. A solution's `tagline` is the short line
   * under its title; it is left out where ORVANN asked for the description only.
   */
  services: {
    label: string;
    title: string;
    paragraphs: string[];
    items: { title: string; tagline?: string; text: string }[];
    /** How ORVANN works, in steps read one after another. */
    process: { label: string; steps: string[] };
  };
  work: { label: string; title: string; paragraphs: string[]; viewProject: string; link: Link };
  vision: Step;
  mission: Step;
  /** How ORVANN works with clients: a title over its principles. */
  philosophy: { title: string; points: Step[] };
  /** The homepage's closing band. */
  closing: Cta;
  footer: {
    /** The company's full name, beside the logo. */
    name: string;
    /** Lines under the name; each sets its own direction, so an English line reads right in Arabic. */
    taglines: string[];
    explore: { title: string; links: Link[] };
    contact: { title: string; address: string };
    follow: string;
    /** The line after "© <year> ORVANN Integrated Solutions." */
    rights: string;
    privacy: string;
  };
  pages: {
    about: {
      meta: PageMeta;
      intro: PageIntro;
      approach: { title: string; paragraphs: string[] };
      value: { title: string; paragraphs: string[]; highlight: string; after: string[]; cta: Link };
      /** The expertise behind the solutions, beside a link to each solution's page. */
      expertise: { title: string; paragraphs: string[] };
      vision: Step;
      mission: Step;
      commitments: { title: string; items: Step[] };
      closing: Cta;
    };
    services: {
      meta: PageMeta;
      intro: PageIntro;
      /** The intro's buttons: down to the list, and to the form. */
      explore: Link;
      discuss: Link;
      together: { title: string; paragraphs: string[]; closing: string };
      listTitle: string;
      families: ServiceFamily[];
      /** Each solution's button to its own page. */
      exploreService: string;
      /** Labels on a solution's own page. */
      servicePage: {
        back: string;
        /** The closing band's button, which opens the form. */
        start: string;
        viewCase: string;
      };
    };
    contact: {
      meta: PageMeta;
      intro: PageIntro;
      form: {
        title: string;
        name: string;
        namePlaceholder: string;
        company: string;
        companyPlaceholder: string;
        email: string;
        emailPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        /** What the visitor wants to discuss: the CRM's topics (lead-options.ts). */
        topic: string;
        topicPlaceholder: string;
        topics: Record<TopicId, string>;
        need: string;
        needPlaceholder: string;
        /** The optional details the CRM sorts leads by, in a group of their own. */
        more: string;
        jobTitle: string;
        jobTitles: Record<JobTitleId, string>;
        region: string;
        /** Headings that group the regions in their list. */
        zones: Record<RegionZoneId, string>;
        regions: Record<RegionId, string>;
        city: string;
        start: string;
        timelines: Record<TimelineId, string>;
        budget: string;
        budgets: Record<BudgetId, string>;
        /** The empty first line of each list. */
        select: string;
        optional: string;
        submit: string;
        /** The line under the button. */
        note: string;
        sending: string;
        /** The heading of the pop-up that opens once the form has been sent. */
        sentTitle: string;
        sent: string;
        /** The pop-up's button. */
        close: string;
        failed: string;
      };
      direct: { title: string; email: string; phone: string };
    };
    work: {
      meta: PageMeta;
      intro: PageIntro;
      filterLabel: string;
      /** "All"; the other filters are the solution names. */
      all: string;
      countLabel: (count: number) => string;
      empty: string;
    };
    caseStudy: {
      back: string;
      services: string;
      /** Section names, in page order: the challenge, ORVANN's role, the work, the outcome, the gallery. */
      challenge: string;
      role: string;
      execution: string;
      outcome: string;
      gallery: string;
      /** Page title: "<project> Case Study". */
      metaTitle: (project: string) => string;
      next: string;
      /** Link to the client's own website, on case studies that have one. */
      visitWebsite: string;
    };
    /**
     * Careers & Internships, the application form only. It posts to public/api/careers.php, which
     * records it in the CRM and emails ORVANN. Residence reuses contact.form's regions.
     */
    careers: {
      meta: PageMeta;
      /** The line that opens the page, above the label. */
      tagline: string;
      /** The small label above the form's title. */
      label: string;
      form: {
        title: string;
        /** The four groups of the form, in order. */
        groups: { personal: string; background: string; preferences: string; documents: string };
        name: string;
        phone: string;
        email: string;
        region: string;
        city: string;
        education: string;
        educations: Record<EducationId, string>;
        graduationYear: string;
        studyYear: string;
        studyYears: Record<StudyYearId, string>;
        specialization: string;
        specializationHint: string;
        experience: string;
        experiences: Record<ExperienceId, string>;
        employment: string;
        employments: Record<EmploymentId, string>;
        interest: string;
        interests: Record<InterestId, string>;
        arrangements: string;
        arrangementsHint: string;
        arrangementOptions: Record<ArrangementId, string>;
        cv: string;
        cvHint: string;
        portfolioUrl: string;
        portfolioFile: string;
        portfolioHint: string;
        linkedin: string;
        /** Chosen file, and what is wrong with one that will not be accepted. */
        chooseFile: string;
        noFile: string;
        /** "{mb}" becomes the limit. */
        fileTooLarge: string;
        fileType: string;
        arrangementsRequired: string;
        select: string;
        optional: string;
        /** The line above the button; {privacy} becomes a link to the privacy policy. */
        consent: { before: string; link: string; after: string };
        submit: string;
        sending: string;
        /** The heading of the pop-up that opens once the form has been sent. */
        sentTitle: string;
        sent: string;
        /** The pop-up's button. */
        close: string;
        failed: string;
      };
    };
    privacy: { meta: PageMeta; intro: PageIntro; effective: string; sections: PolicySection[] };
    publicationLink: string;
    publications: Publication[];
    /** The closing band on every page but Contact. */
    cta: Cta;
  };
  projects: Project[];
};
