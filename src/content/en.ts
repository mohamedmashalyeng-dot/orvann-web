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

  // [translation] homepage SEO title and description, from ORVANN's copy (20 Nov 2026); also
  // the site-wide defaults
  meta: {
    title: "ORVANN Integrated Solutions | Your Growth Partner",
    description:
      "At ORVANN Integrated Solutions, we understand your business, analyse your challenges and uncover your growth opportunities, to offer the strategies and solutions that fit your goals.",
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

  launch: {
    heroMessage: "ORVANN. Now in the UAE.",
    intro: {
      skip: "Skip intro",
      from: "Cairo",
      to: "UAE",
      eyebrow: "A new chapter",
      title: "Now in the UAE",
      place: "ORVANN in the United Arab Emirates",
    },
  },
  review: {
    proposedCopy: "Proposed copy",
  },

  // The nine solutions, by the English names in ORVANN's copy (25 Nov 2026).
  serviceNames: {
    strategy: "Business Strategy & Development",
    projects: "Project Management & Launch",
    marketing: "Marketing & Advertising Management",
    digital: "Software Development & Digital Solutions",
    representation: "Business Representation & Commercial Brokerage",
    supply: "Import, Export & Supply Solutions",
    ecommerce: "E-Commerce Solutions",
    events: "Exhibitions, Conferences & Events",
    craft: "Bespoke Artistry & Heritage Craftsmanship",
  },

  // [copy] primary and secondary calls to action. The second is [proposed]: it was "Book a
  // Meeting", but it opens the direct contact details, not a booking calendar (24 Oct 2026).
  actions: {
    startProject: { label: "Start a Project", href: "/contact-us/#project-form" },
    talkToUs: { label: "Talk to Us", href: "/contact-us/#direct-contact" },
  },

  // [copy]
  header: {
    nav: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us/" },
      { label: "Integrated Solutions", href: "/services/" },
      { label: "Our Work", href: "/our-projects/" },
      { label: "Contact", href: "/contact-us/" },
    ],
    menu: "Menu",
    close: "Close",
    language: { label: "Arabic", ariaLabel: "Read this page in Arabic" },
  },

  // ---- Homepage ----
  // [translation] of the Arabic homepage copy supplied by ORVANN (20 Nov 2026), to the end of
  // the footer — needs ORVANN sign-off. The hero label and the footer's name and first
  // tagline are ORVANN's own English.
  hero: {
    label: "Your Growth Partner",
    headline: [[{ text: "Your partner in" }], [{ text: "growth and success.", accent: true }]],
    subheadline: "Business strategies and integrated solutions that make the difference.",
    paragraphs: [
      "At ORVANN Integrated Solutions, we understand your business, analyse your challenges and uncover your growth opportunities, to bring you the strategies and solutions that fit your goals.",
      "We combine consulting expertise with the capacity to execute, helping you turn opportunities into practical steps that support your business’s success.",
    ],
    primaryCta: { label: "Let’s Talk", href: "/contact-us/" },
    secondaryCta: { label: "Explore Our Work", href: "/our-projects/" },
    projectsLabel: "Featured projects",
  },

  services: {
    label: "Our Integrated Solutions",
    title: "Integrated solutions that start from what your business needs",
    paragraphs: [
      "At ORVANN, we bring together consulting expertise and management and execution capabilities to deliver solutions designed around the nature of your business and its goals.",
      "Whether you are looking for one specialised service or connected solutions, we help you choose what fits your needs, and we link planning to execution to create real value for your business.",
    ],
    items: [
      {
        title: "Business Strategy & Development",
        tagline: "We see the full picture to uncover growth opportunities.",
        text: "We study your business, your market and your competitors, and analyse the challenges and opportunities ahead, to help you weigh the alternatives and choose the directions and strategies that strengthen your competitiveness and support your growth.",
      },
      {
        // ORVANN asked for this one's description only, without its short line.
        title: "Project Management",
        text: "We start by understanding your project’s idea, goals and requirements, then develop the right solutions and coordinate the stages of their execution, following with you how the different works and disciplines connect, so every effort comes together to achieve the project’s goals.",
      },
      {
        title: "Marketing & Advertising Management",
        tagline: "We don’t start with the ad, but with what the market needs.",
        text: "We study the market, the audience and the competitors, and uncover what sets your brand apart, then develop marketing strategies and campaigns, putting content, creativity and the right channels to work to strengthen your presence and reach your target customers.",
      },
      {
        title: "Software & Digital Solutions",
        tagline: "Technology is a means to solve your business challenges.",
        text: "We understand your business’s needs and the challenges your customers face, then define the right digital solutions and develop the websites, applications, systems and software that simplify operations, improve the user experience and support your business’s growth.",
      },
      {
        title: "Commercial Representation & Brokerage",
        tagline: "We connect your business with the right opportunities and partnerships.",
        text: "We study your products, your services and your target markets, and help you discover new business opportunities, reach potential partners and customers, and ease the relationships and negotiations that support your expansion.",
      },
      {
        title: "Import, Export & Supply",
        tagline: "We look for the right solution, not just the available product.",
        text: "We understand your needs and the specifications of the products you require, search markets and sources of supply, and compare the alternatives to help you choose the best fit, then coordinate purchasing and supply and follow their execution against the agreed requirements.",
      },
      {
        title: "E-commerce",
        tagline: "We connect digital market opportunities with a complete buying experience.",
        text: "We study your products, your customers’ behaviour and the market’s opportunities, then help you choose the right sales channels and develop the online shopping experience, from product display to order completion, to support the growth of your sales.",
      },
      {
        title: "Conferences, Exhibitions & Events",
        tagline: "We turn every participation into an opportunity that serves your business goals.",
        text: "We understand the goals of your participation and your target audience, then develop the right idea and experience, bringing design, fit-out, promotion and execution together in one complete experience that reflects your brand’s identity and supports its presence.",
      },
      {
        title: "Design & Craft Production",
        tagline: "We turn ideas into exclusive pieces that carry your brand’s value.",
        text: "We create and produce artworks, keepsakes and exclusive products designed especially for our clients, combining creativity, handcraft and precise detail, from developing the idea and choosing the materials to manufacturing and finishing, to deliver distinctive products that reflect the client’s identity and purpose.",
      },
    ],
    process: {
      label: "How we work",
      steps: [
        "We understand the need",
        "We uncover the opportunity or challenge",
        "We define the right solution",
        "We help carry it out and follow it through",
      ],
    },
  },

  work: {
    label: "Our Work",
    title: "Different projects, and solutions designed for every challenge.",
    paragraphs: [
      "Discover how we have put our integrated expertise to work for our clients’ needs, turning their ideas and challenges into practical projects and solutions.",
    ],
    viewProject: "View project",
    link: { label: "View All Work", href: "/our-projects/" },
  },

  vision: {
    title: "Our Vision",
    text: "For ORVANN to become a leading model of strategic partnership in business growth, where expertise and solutions come together in one complete vision that creates new opportunities for success, and for our impact to reach from the Arab world to global markets, as a trusted partner in every client’s growth journey.",
  },
  mission: {
    title: "Our Mission",
    text: "To be a true partner in our clients’ business growth: understanding their challenges and uncovering their opportunities with a complete vision, delivering innovative solutions that bring our expertise and specialisms together around each client’s needs, and supporting them as they turn strategies into practical steps that create lasting value for their business.",
  },

  philosophy: {
    title: "Our Philosophy",
    points: [
      {
        title: "We see the full picture.",
        text: "We don’t look at challenges in isolation. We understand your business and what shapes it, to uncover opportunities and solutions that may not appear when each side is seen on its own.",
      },
      {
        title: "We put your interest first.",
        text: "We don’t offer services just because we have them. We recommend what your business actually needs, and help you set priorities and choose the solutions that best fit your goals.",
      },
      {
        title: "We bring disciplines together.",
        text: "We connect consulting, commercial, creative and digital expertise, so different solutions work in harmony, each completing the others in service of your business goals.",
      },
      {
        title: "We stay partners in execution.",
        text: "Our role doesn’t end with ideas and recommendations. We work beside you to put the agreed solutions in place, follow their progress and develop them as the business needs.",
      },
    ],
  },

  closing: {
    title: "Let’s start with what’s next.",
    text: "Whether you are planning a new project or looking to grow your business, share your ambitions and challenges with us, and together we’ll uncover the opportunities and choose the right next step for your growth.",
    primary: { label: "Let’s Talk About Your Business", href: "/contact-us/#project-form" },
  },

  direction: { perspective: "Perspective", people: "People", detail: "Detail", connected: "Connected work" },

  footer: {
    name: "ORVANN Integrated Solutions",
    taglines: ["Your Growth Partner."],
    explore: {
      title: "Explore ORVANN",
      links: [
        { label: "About ORVANN", href: "/about-us/" },
        { label: "Our Integrated Solutions", href: "/services/" },
        { label: "Our Work", href: "/our-projects/" },
        { label: "Contact Us", href: "/contact-us/" },
      ],
    },
    contact: { title: "Contact Us", address: "Egypt & UAE" },
    follow: "Follow ORVANN",
    social: { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", whatsapp: "WhatsApp" },
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
  },

  pages: enPages,
  projects: enProjects,
};
