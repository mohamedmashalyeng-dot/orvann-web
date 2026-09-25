import { enPages } from "./en-pages";
import { enProjects } from "./en-projects";
import type { SiteContent } from "./types";

/**
 * English copy.
 *
 * Provenance key used in the comments below:
 *   [brief]    wording supplied in the Phase 1 brief
 *   [site]     taken or lightly edited from orvann.com (inspected 22 Sep 2026)
 *   [proposed] new copy written for this redesign — needs ORVANN sign-off
 */
export const en: SiteContent = {
  locale: "en",
  dir: "ltr",

  meta: {
    title: "ORVANN — Software Development & Digital Marketing",
    description:
      "ORVANN builds digital experiences and grows ambitious brands: software development and digital marketing from Giza, Egypt, for the Middle East and beyond.",
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
    home: "ORVANN — home",
    primaryNav: "Primary",
    footerNav: "Footer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    newTab: "(opens in a new tab)",
    lightMode: "Light mode",
    whatsappFloat: "Chat with ORVANN on WhatsApp",
    logo: "ORVANN",
  },

  review: {
    proposedCopy: "Proposed copy",
  },

  header: {
    // [brief] + the live site's Exhibitions page
    nav: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "Work", href: "/our-projects/" },
      { label: "Exhibitions", href: "/exhibitions-conferences/" },
      { label: "About", href: "/about-us/" },
      { label: "Contact", href: "/contact-us/" },
    ],
    cta: { label: "Let’s Talk", href: "/contact-us/" },
    menu: "Menu",
    close: "Close",
  },

  hero: {
    eyebrow: "Software development & digital marketing", // [brief] positioning
    location: "Giza, Egypt — for the Middle East and beyond", // [site] HQ + reach
    // [brief] "We build digital experiences. We grow ambitious brands."
    headline: [
      [{ text: "We " }, { text: "build", accent: true }],
      [{ text: "digital experiences." }],
      [{ text: "We " }, { text: "grow", accent: true }],
      [{ text: "ambitious brands." }],
    ],
    lede: "Software development and digital marketing, brought together to help your business move forward.", // [brief]
    primaryCta: { label: "Explore Our Services", href: "#services" }, // [brief]
    secondaryCta: { label: "Start a Project", href: "/contact-us/" }, // [brief]
    graphicLabels: { build: "Build", grow: "Grow" },
  },

  // [site] service names, set as a moving band under the hero
  marquee: [
    "Websites",
    "E-commerce",
    "AI integrations",
    "Brand identity",
    "Campaigns",
    "Content & reels",
    "Social media",
    "SEO",
    "Exhibitions",
    "Events",
  ],

  services: {
    label: "Services",
    title: "Two disciplines. One partner.", // [proposed]
    intro:
      "Growing businesses need technology that works and marketing that gets it seen. ORVANN brings both together — from the first plan to ongoing optimization.", // [proposed]
    detailsLabel: "What’s included",
    // Row titles, descriptions and details paraphrase orvann.com (home, services and FAQ copy).
    groups: [
      {
        id: "software",
        verb: "Build",
        title: "Software Development",
        summary: "Websites and platforms planned around how your customers find, choose and buy.", // [proposed]
        items: [
          {
            title: "Websites",
            text: "Responsive websites shaped around your structure, content and conversion flow.",
            details: ["Structure & user experience", "Content & conversion flow", "SEO integrated from day one", "Responsive design"],
          },
          {
            title: "E-commerce platforms",
            text: "E-commerce platforms with structure, content and experience shaped around your customers.",
            details: ["E-commerce strategy consultation", "Structure, content & experience", "SEO integrated from day one"],
          },
          {
            title: "AI integrations",
            text: "AI integrations and advanced technology that future-proof your business and foster smart growth.",
            details: ["AI integrations", "Creative innovation", "Advanced technology"],
          },
          {
            title: "Launch support & optimization",
            text: "We stay actively involved after launch, so your site keeps growing and converting.",
            details: ["Monitoring", "Analysis", "Ongoing optimization", "Support, training & maintenance"],
          },
        ],
        cta: { label: "Start a software project", href: "/contact-us/" },
      },
      {
        id: "marketing",
        verb: "Grow",
        title: "Digital Marketing",
        summary: "Be found, be remembered — a brand and presence your audience recognizes.", // [site] tagline + [proposed]
        items: [
          {
            title: "Brand strategy & identity",
            text: "A compelling identity that connects authentically with your audience.",
            details: ["Logo design", "Visual branding", "Brand voice", "Brand guidelines"],
          },
          {
            title: "Digital campaigns",
            text: "From Google Ads to social media advertising, campaigns designed to increase reach and engagement.",
            details: ["Google Ads", "Social media advertising", "Influencer collaborations", "Automated email marketing"],
          },
          {
            title: "Content creation",
            text: "Professional content tailored to your audience and brand voice.",
            details: ["Designs", "Videos & reels", "Articles", "Ads"],
          },
          {
            title: "Social media management",
            text: "Content, posting, engagement and analytics across the platforms that matter to you.",
            details: ["LinkedIn", "Facebook", "Instagram", "TikTok", "Analytics"],
          },
          {
            title: "Search engine optimization",
            text: "Data-driven strategies to improve rankings and attract targeted organic traffic.",
            details: ["Data-driven strategy", "Improving rankings", "Targeted organic traffic", "Integrated from day one"],
          },
        ],
        cta: { label: "Plan a campaign", href: "/contact-us/" },
      },
    ],
    more: {
      title: "Also from ORVANN",
      // [site] services and exhibitions pages
      items: [
        {
          title: "Business consulting",
          text: "Market research, feasibility studies, startup advisory and investor presentations.",
        },
        {
          title: "Marketing production",
          text: "Printing, packaging, corporate gifts, uniforms and exhibition displays.",
        },
        {
          title: "Events & exhibitions",
          text: "Corporate events, conferences, product launches and on-site execution.",
        },
      ],
    },
    link: { label: "Explore all services", href: "/services/" },
  },

  // Selected Work shows the `featured` projects from en-projects.ts [site].
  work: {
    label: "Case studies",
    title: "Selected work",
    intro: "Identity, website and marketing projects for clients in Egypt and the Gulf.",
    viewProject: "View project",
    link: { label: "All 16 projects", href: "/our-projects/" },
  },

  // [proposed] — the whole section
  approach: {
    label: "Approach",
    title: "From first conversation to lasting growth.",
    intro:
      "Four stages keep strategy, design, development and marketing moving together — so nothing is lost between teams.",
    steps: [
      {
        title: "Discover",
        text: "We learn your business, audience and market, and agree on what success means for your product and your brand.",
      },
      {
        title: "Design",
        text: "We plan the user experience, the brand and the campaign together, before anything is built or launched.",
      },
      {
        title: "Build",
        text: "We develop the website or platform and produce the content and campaigns that will carry it.",
      },
      {
        title: "Grow",
        text: "After launch we monitor, analyze and optimize both the product and the marketing, so each keeps improving.",
      },
    ],
  },

  about: {
    label: "About ORVANN",
    title: "Where technical execution meets marketing strategy.", // [proposed]
    body: [
      // [site] about page, lightly edited
      "ORVANN started as a creative studio with a wide-reaching ambition: to help brands across the Middle East and beyond grow, innovate and stand out — and evolved into an agency for digital marketing and business consulting.",
      // [proposed] positioning, combined with the [site] working model
      "Today we plan what we build and how it is marketed together. A core in-house team works from our office in Giza, alongside a wider network of specialists working remotely, so every project gets the expertise it needs.",
    ],
    // [site]
    facts: [
      { term: "Headquarters", detail: "Al-Haram St., Giza, Egypt" },
      { term: "Reach", detail: "The Middle East and beyond" },
      { term: "Working model", detail: "Core in-house team with a remote specialist network" },
      { term: "Values", detail: "Integrity, collaboration, excellence and sustainability" },
      { term: "Sectors", detail: "Defense & aviation, real estate, technology, retail and hospitality" },
    ],
    partnersLabel: "Partners",
    link: { label: "More about ORVANN", href: "/about-us/" },
  },

  // [site] profiles; the title is [proposed]
  social: {
    label: "Follow",
    title: "Find us where your audience is.",
    profiles: [
      { id: "instagram", label: "Instagram", handle: "@orvann.eg", href: "https://www.instagram.com/orvann.eg/" },
      { id: "linkedin", label: "LinkedIn", handle: "ORVANN", href: "https://www.linkedin.com/company/orvann/" },
      { id: "facebook", label: "Facebook", handle: "orvann.eg", href: "https://www.facebook.com/orvann.eg" },
      { id: "whatsapp", label: "WhatsApp", handle: "+20 108 078 4465", href: "https://wa.me/201080784465" },
    ],
  },

  contact: {
    label: "Contact",
    title: "Let’s talk.",
    lede: "Tell us what you want to build or where you want to grow. Email and WhatsApp are the quickest ways to reach us.", // [proposed]
    emailCta: "Email us",
    whatsappCta: "Message on WhatsApp",
    labels: {
      email: "Email",
      phone: "Phone",
      whatsapp: "WhatsApp",
      headquarters: "Headquarters",
      follow: "Follow",
    },
    address: "Al-Haram St., Giza, Egypt", // [site]
  },

  footer: {
    tagline: "Software development and digital marketing — from Giza, Egypt, for the Middle East and beyond.",
    exploreTitle: "Explore",
    explore: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services/" },
      { label: "Work", href: "/our-projects/" },
      { label: "Exhibitions & conferences", href: "/exhibitions-conferences/" },
      { label: "About", href: "/about-us/" },
      { label: "Contact", href: "/contact-us/" },
    ],
    followTitle: "Follow",
    contactTitle: "Contact",
    moreTitle: "Publications",
    more: [
      { label: "Company profile", href: "/about-us/company-profile/" },
      { label: "Summer giveaway", href: "/about-us/summer-giveaway/" },
      { label: "VIP gifts", href: "/about-us/vip-gifts/" },
    ],
    rights: "All rights reserved.",
    privacy: "Privacy policy",
    backToTop: "Back to top",
  },

  pages: enPages,
  projects: enProjects,
};
