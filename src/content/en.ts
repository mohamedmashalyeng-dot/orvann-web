import { enPages } from "./en-pages";
import { enProjects } from "./en-projects";
import type { SiteContent } from "./types";

/**
 * English copy.
 *
 * Provenance key used in the comments below:
 *   [copy]     the site copy supplied by ORVANN (3 Oct 2026): global brand definition, every
 *              page, navigation and footer
 *   [site]     taken or lightly edited from orvann.com (inspected 22 Sep 2026)
 *   [proposed] new copy written for this redesign — needs ORVANN sign-off
 */
export const en: SiteContent = {
  locale: "en",
  dir: "ltr",

  // [copy] homepage SEO title and description; also the site-wide defaults
  meta: {
    title: "ORVANN | Strategy, Branding, Marketing, Digital & Events",
    description:
      "ORVANN is a growth and execution partner in Egypt providing strategy, branding, marketing, digital experiences, events, outdoor and production services.",
    siteName: "ORVANN",
    ogLocale: "en_US",
  },

  notFound: {
    label: "Error 404",
    title: "This page doesn’t exist.",
    text: "The link may be old, or the page may have moved. Everything ORVANN offers is a click away from the homepage.",
    home: "Back to the homepage",
    contact: "Email us",
  },

  a11y: {
    skipToContent: "Skip to content",
    home: "ORVANN, home",
    primaryNav: "Primary",
    footerNav: "Footer",
    footerServices: "Services",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    newTab: "(opens in a new tab)",
    lightMode: "Light mode",
    whatsappFloat: "Chat with ORVANN on WhatsApp",
  },

  review: {
    proposedCopy: "Proposed copy",
  },

  // [copy] the five service areas
  serviceNames: {
    strategy: "Strategy & Consulting",
    branding: "Branding & Creative",
    marketing: "Marketing & Media",
    digital: "Digital Experiences",
    events: "Events, Outdoor & Production",
  },

  // [copy] primary and secondary calls to action
  actions: {
    startProject: { label: "Start a Project", href: "/contact-us/#project-form" },
    bookMeeting: { label: "Book a Meeting", href: "/contact-us/#direct-contact" },
  },

  // [copy]
  header: {
    nav: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us/" },
      { label: "Services", href: "/services/" },
      { label: "Our Work", href: "/our-projects/" },
      { label: "Contact", href: "/contact-us/" },
    ],
    menu: "Menu",
    close: "Close",
    language: { label: "العربية", ariaLabel: "اقرأ هذه الصفحة بالعربية" },
  },

  // [copy] ---- Homepage ----
  hero: {
    headline: [[{ text: "Your " }, { text: "Growth", accent: true }], [{ text: "Partner." }]],
    subheadline: "From strategy to delivery.",
    lede: "ORVANN brings strategy, branding, marketing, digital and on-ground execution together so your business can move with one direction, one consistent identity and a clearer path from idea to delivery.",
    secondaryCta: { label: "Explore Our Work", href: "/our-projects/" },
  },

  clients: {
    title: "Brands We’ve Worked With",
    text: "Different businesses. Different challenges. One focus: work that is clear, consistent and built around what the project actually needs.",
  },

  services: {
    label: "What we do",
    title: "Five connected capabilities. One partner.",
    intro: "You can work with ORVANN on one specific need or combine multiple services into one coordinated project.",
    items: [
      {
        id: "strategy",
        text: "We turn business goals into a clearer direction through research, positioning, growth planning and practical project strategy.",
        link: "Explore Strategy & Consulting",
      },
      {
        id: "branding",
        text: "We build the visual and creative systems that define how your business looks, communicates and stays consistent across different touchpoints.",
        link: "Explore Branding & Creative",
      },
      {
        id: "marketing",
        text: "We plan and manage content, campaigns and paid media around defined audiences, objectives and measurable performance.",
        link: "Explore Marketing & Media",
      },
      {
        id: "digital",
        text: "We plan and manage websites and digital experiences around user needs, clear information architecture, search visibility and conversion.",
        link: "Explore Digital Experiences",
      },
      {
        id: "events",
        text: "We take brands into the physical world through exhibitions, events, outdoor, print, branded materials and on-ground execution.",
        link: "Explore Events, Outdoor & Production",
      },
    ],
  },

  integrated: {
    title: "One Partner. From Plan to Delivery.",
    subtitle: "Different channels should not feel like different brands.",
    paragraphs: [
      "A campaign, website, event, company profile or outdoor execution may be produced in different formats, but they should all communicate the same business clearly.",
      "ORVANN connects the people working on strategy, creative, media, digital and production so decisions do not happen in isolation.",
    ],
    options: [
      "Need one service? We can focus on that.",
      "Need several teams moving toward one launch? We can connect the work under one direction.",
    ],
  },

  work: {
    label: "Our Work",
    title: "See what the work looks like in practice.",
    paragraphs: [
      "Explore projects across real estate, aviation, technology, healthcare, professional services, retail and other sectors.",
      "Our role changes according to the project: sometimes it starts with strategy or identity; in other cases it includes websites, campaigns, social content, outdoor, print or event execution.",
    ],
    viewProject: "View project",
    link: { label: "View All Work", href: "/our-projects/" },
  },

  deliverables: {
    title: "More than one type of deliverable.",
    intro: "Across our portfolio, ORVANN’s work includes:",
    items: [
      "Brand identities and visual systems",
      "Websites and digital experiences",
      "Content and social media systems",
      "Advertising campaigns",
      "Company profiles and sales materials",
      "Outdoor and signage",
      "Print and branded production",
      "Exhibitions and event execution",
    ],
  },

  why: {
    label: "Why ORVANN",
    title: "Why work with one integrated partner?",
    subtitle: "Less fragmentation. More consistency.",
    paragraphs: [
      "Working across multiple suppliers can create gaps between strategy, creative, media, digital and production.",
      "Our role is to connect those moving parts, define responsibilities clearly and keep the project aligned from one stage to the next.",
    ],
    points: [
      { title: "Clear Direction", text: "We define what the project needs before execution begins." },
      { title: "Connected Execution", text: "Brand, campaign, digital and physical touchpoints follow the same direction." },
      { title: "Flexible Scope", text: "Work with us on one service, a defined project or a larger integrated scope." },
      {
        title: "Practical Delivery",
        text: "Strategy is connected to what actually needs to be designed, launched, produced or delivered.",
      },
    ],
  },

  vision: {
    title: "Our Vision",
    text: "To be the partner businesses across the Middle East rely on to turn growth plans into completed work.",
  },
  mission: {
    title: "Our Mission",
    text: "To connect strategy, design, marketing, digital and production, giving businesses one partner to move projects from brief to delivery.",
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "What does ORVANN do?",
        answer:
          "ORVANN provides five connected service areas: Strategy & Consulting, Branding & Creative, Marketing & Media, Digital Experiences, and Events, Outdoor & Production.",
      },
      {
        question: "Is ORVANN only a marketing agency?",
        answer:
          "No. Marketing is one part of ORVANN’s work. Projects may also include business and brand strategy, identity, websites, events, exhibitions, outdoor, printing and production.",
      },
      {
        question: "Can I hire ORVANN for only one service?",
        answer: "Yes. Clients can work with ORVANN on one defined service or combine multiple capabilities into an integrated project.",
      },
      {
        question: "Does ORVANN build websites?",
        answer:
          "ORVANN manages website projects across strategy, structure, UX/UI, content, SEO considerations, implementation coordination, quality review and launch. The exact technical scope is defined for each project.",
      },
      {
        question: "Does ORVANN manage advertising campaigns?",
        answer:
          "Yes. Marketing & Media projects can include campaign strategy, paid media, media buying, creative coordination, reporting and ongoing optimization.",
      },
      {
        question: "Does ORVANN work on events and exhibitions?",
        answer:
          "Yes. Events, Outdoor & Production can include exhibition planning, booth and visual execution, branded materials, printing, signage, outdoor and on-ground production.",
      },
    ],
  },

  // [copy] "ORVANN — Your Growth Partner." with the dash as a comma: no dashes on the site.
  footer: {
    tagline: "ORVANN, Your Growth Partner.",
    description:
      "ORVANN is an Egypt-based growth and execution partner connecting strategy with creative, marketing, digital and on-ground delivery.",
    explore: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us/" },
      { label: "Services", href: "/services/" },
      { label: "Our Work", href: "/our-projects/" },
      { label: "Contact", href: "/contact-us/" },
    ],
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
  },

  pages: enPages,
  projects: enProjects,
};
