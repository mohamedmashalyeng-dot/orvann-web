import { enPages } from "./en-pages";
import { enProjects } from "./en-projects";
import type { SiteContent } from "./types";

/**
 * English copy.
 *
 * Provenance key used in the comments below:
 *   [brief]    wording supplied in the Phase 1 brief
 *   [copy]     the homepage, navigation and footer copy supplied by ORVANN (28 Sep 2026)
 *   [site]     taken or lightly edited from orvann.com (inspected 22 Sep 2026)
 *   [proposed] new copy written for this redesign — needs ORVANN sign-off
 */
export const en: SiteContent = {
  locale: "en",
  dir: "ltr",

  meta: {
    title: "ORVANN — Your Growth Partner",
    description:
      "ORVANN plans your marketing, designs your brand, builds your website, and manages your campaigns and events from the first idea to the final printed material.",
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
  },

  review: {
    proposedCopy: "Proposed copy",
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
    cta: { label: "Book a Meeting", href: "/contact-us/" },
    menu: "Menu",
    close: "Close",
    language: { label: "العربية", ariaLabel: "اقرأ هذه الصفحة بالعربية" },
  },

  // [copy]
  hero: {
    headline: [[{ text: "Your " }, { text: "Growth", accent: true }], [{ text: "Partner." }]],
    lede: "ORVANN plans your marketing, designs your brand, builds your website, and manages your campaigns and events from the first idea to the final printed material.",
    cta: { label: "Book a Call", href: "/contact-us/" },
  },

  // [copy]
  clients: { title: "Brands We’ve Worked With" },

  // [copy]; each links to the services-page family that covers it
  services: {
    title: "Our Services",
    items: [
      { label: "Strategy & Consulting", href: "/services/#consulting" },
      { label: "Branding & Creative", href: "/services/#marketing" },
      { label: "Marketing & Media", href: "/services/#marketing" },
      { label: "Digital Experiences", href: "/services/#digital" },
      { label: "Events, Outdoor & Production", href: "/services/#production" },
    ],
  },

  // [copy]
  about: {
    title: "One Partner. From Plan to Delivery.",
    text: "Work with ORVANN on a single service or a complete launch. We connect the different parts of your project, keeping your message and identity consistent across your ads, website, printed materials, and events.",
    link: { label: "More About ORVANN", href: "/about-us/" },
  },

  // [copy]
  vision: {
    title: "Our Vision",
    text: "To be the partner businesses across the Middle East rely on to turn their growth plans into completed work.",
  },
  mission: {
    title: "Our Mission",
    text: "To connect planning, design, marketing, and production, giving businesses one partner to take their projects from brief to delivery.",
  },

  // [copy]
  finalCta: {
    title: "Your Next Move Starts Here.",
    text: "Tell us what you’re planning and when you need it delivered.",
    primary: { label: "Book a Call", href: "/contact-us/" },
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
    emailCta: "Email us",
    whatsappCta: "Message on WhatsApp",
    labels: {
      email: "Email",
      phone: "Phone",
      whatsapp: "WhatsApp",
      headquarters: "Headquarters",
    },
    address: "Al-Haram St., Giza, Egypt", // [site]
  },

  // [copy]
  footer: {
    tagline: "ORVANN — Your Growth Partner.",
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
