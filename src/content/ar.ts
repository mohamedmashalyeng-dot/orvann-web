import { arPages } from "./ar-pages";
import { arProjects } from "./ar-projects";
import type { SiteContent } from "./types";

/**
 * Arabic copy.
 *
 * Provenance, as in en.ts:
 *   [site]         taken or lightly edited from orvann.com/ar (inspected 25 Sep 2026)
 *   [translation]  translated from the English copy — needs review by a native copywriter
 * Client and brand names stay in Latin script, as on their logos.
 */
export const ar: SiteContent = {
  locale: "ar",
  dir: "rtl",

  meta: {
    title: "أورفان — شريكك في النمو",
    description:
      "تخطط أورفان لتسويقك، وتصمم علامتك التجارية، وتبني موقعك الإلكتروني، وتدير حملاتك وفعالياتك، من الفكرة الأولى حتى آخر مادة مطبوعة.",
    siteName: "ORVANN أورفان",
    ogLocale: "ar_EG",
  },

  // [translation]
  notFound: {
    label: "خطأ 404",
    title: "هذه الصفحة غير موجودة.",
    text: "ربما يكون الرابط قديمًا، أو نُقلت الصفحة. كل ما تقدمه أورفان على بُعد نقرة من الصفحة الرئيسية.",
    home: "العودة إلى الصفحة الرئيسية",
    contact: "راسلنا",
  },

  a11y: {
    skipToContent: "تخطَّ إلى المحتوى",
    home: "أورفان — الصفحة الرئيسية",
    primaryNav: "القائمة الرئيسية",
    footerNav: "روابط التذييل",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    newTab: "(يفتح في علامة تبويب جديدة)",
    lightMode: "الوضع الفاتح",
    whatsappFloat: "تحدّث مع أورفان عبر واتساب",
  },

  review: {
    proposedCopy: "نص مقترح",
  },

  // [translation] of the homepage, navigation and footer copy supplied by ORVANN (28 Sep 2026)
  header: {
    nav: [
      { label: "الرئيسية", href: "/ar/" },
      { label: "من نحن", href: "/ar/about-us/" },
      { label: "خدماتنا", href: "/ar/services/" },
      { label: "أعمالنا", href: "/ar/our-projects/" },
      { label: "تواصل معنا", href: "/ar/contact-us/" },
    ],
    cta: { label: "احجز اجتماعًا", href: "/ar/contact-us/" },
    menu: "القائمة",
    close: "إغلاق",
    language: { label: "English", ariaLabel: "Read this page in English" },
  },

  // [translation]
  hero: {
    headline: [[{ text: "شريكك" }], [{ text: "في " }, { text: "النمو", accent: true }, { text: "." }]],
    lede: "تخطط أورفان لتسويقك، وتصمم علامتك التجارية، وتبني موقعك الإلكتروني، وتدير حملاتك وفعالياتك، من الفكرة الأولى حتى آخر مادة مطبوعة.",
    cta: { label: "احجز مكالمة", href: "/ar/contact-us/" },
  },

  // [translation]
  clients: { title: "علامات تجارية عملنا معها" },

  // [translation]; each links to the services-page family that covers it
  services: {
    title: "خدماتنا",
    items: [
      { label: "الاستراتيجية والاستشارات", href: "/ar/services/#consulting" },
      { label: "الهوية والإبداع", href: "/ar/services/#marketing" },
      { label: "التسويق والإعلام", href: "/ar/services/#marketing" },
      { label: "التجارب الرقمية", href: "/ar/services/#digital" },
      { label: "الفعاليات والإعلانات الخارجية والإنتاج", href: "/ar/services/#production" },
    ],
  },

  // [translation]
  about: {
    title: "شريك واحد. من الخطة إلى التسليم.",
    text: "اعمل مع أورفان على خدمة واحدة أو على إطلاق متكامل. نربط أجزاء مشروعك المختلفة معًا، لتبقى رسالتك وهويتك متسقتين في إعلاناتك وموقعك الإلكتروني ومطبوعاتك وفعالياتك.",
    link: { label: "المزيد عن أورفان", href: "/ar/about-us/" },
  },

  // [translation]
  vision: {
    title: "رؤيتنا",
    text: "أن نكون الشريك الذي تعتمد عليه الشركات في أنحاء الشرق الأوسط لتحويل خطط نموها إلى أعمال منجزة.",
  },
  mission: {
    title: "رسالتنا",
    text: "أن نربط التخطيط والتصميم والتسويق والإنتاج، لنمنح الشركات شريكًا واحدًا يأخذ مشروعاتها من التكليف حتى التسليم.",
  },

  // [translation]
  finalCta: {
    title: "خطوتك التالية تبدأ من هنا.",
    text: "أخبرنا بما تخطط له، ومتى تحتاج إلى تسليمه.",
    primary: { label: "احجز مكالمة", href: "/ar/contact-us/" },
  },

  social: {
    label: "تابعنا",
    title: "تجدنا حيث يوجد جمهورك.",
    profiles: [
      { id: "instagram", label: "إنستجرام", handle: "@orvann.eg", href: "https://www.instagram.com/orvann.eg/" },
      { id: "linkedin", label: "لينكدإن", handle: "ORVANN", href: "https://www.linkedin.com/company/orvann/" },
      { id: "facebook", label: "فيسبوك", handle: "orvann.eg", href: "https://www.facebook.com/orvann.eg" },
      { id: "whatsapp", label: "واتساب", handle: "+20 108 078 4465", href: "https://wa.me/201080784465" },
    ],
  },

  contact: {
    emailCta: "راسلنا عبر البريد",
    whatsappCta: "راسلنا على واتساب",
    labels: {
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      whatsapp: "واتساب",
      headquarters: "المقر الرئيسي",
    },
    address: "شارع الهرم، الجيزة، مصر", // [site]
  },

  // [translation]
  footer: {
    tagline: "أورفان — شريكك في النمو.",
    explore: [
      { label: "الرئيسية", href: "/ar/" },
      { label: "من نحن", href: "/ar/about-us/" },
      { label: "خدماتنا", href: "/ar/services/" },
      { label: "أعمالنا", href: "/ar/our-projects/" },
      { label: "تواصل معنا", href: "/ar/contact-us/" },
    ],
    rights: "جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
  },

  pages: arPages,
  projects: arProjects,
};
