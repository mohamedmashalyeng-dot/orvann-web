import type { Project } from "./types";

/**
 * The six projects ORVANN keeps on the site (26 Nov 2026): Tucano, Eagles Developments, Intro,
 * Roshan Masr, Al Nour Optics and Plaza Garden; the others were taken off, and their old
 * URLs redirect to Our Work (public/.htaccess). Names, services and summaries are [copy] (the
 * project card copy supplied by ORVANN, 3 Oct 2026); challenges, solutions and results are
 * [site], restated from each project page on orvann.com/our-projects (inspected 23 Sep 2026),
 * grammar lightly tidied. Slugs match the live URLs, so /our-projects/<slug>/ keeps working.
 * `featured` projects also appear in Selected Work on the homepage.
 *
 * Categories are the nine solutions of 25 Nov 2026 [proposed]: the old Branding & Creative
 * became Marketing & Advertising (branding sits there now), and the solution pages' stories
 * add the rest (Tucano: strategy and events; Roshan Masr and Intro: project launch; Eagles:
 * events; Al Nour: e-commerce). ORVANN to confirm.
 *
 * The order is ORVANN's: Tucano, Eagles Developments and Intro are its most important
 * projects, so they come first and their covers open the homepage hero. Their images, and
 * Roshan Masr's, come from ORVANN's media library (upload.orvann.com, Oct 2026). Intro and
 * Roshan Masr are [draft]: their summaries and deliverables are read from those images, and
 * Roshan Masr's challenge and results wait for ORVANN's copy.
 *
 * Those three case studies follow the structure challenge → ORVANN's role → execution →
 * outcome (24 Oct 2026). Their roles and outcomes are [proposed], written only from the work
 * itself (the deliverables and the images); performance claims with no figure, source or
 * period behind them were taken out until ORVANN supplies the data (see each project).
 */
export const enProjects: Project[] = [
  {
    slug: "tucano-2",
    title: "Tucano",
    categories: ["strategy", "marketing", "digital", "events"],
    summary:
      "Creating a cohesive premium brand presence across identity, company profile, digital channels, campaigns and event-related execution.",
    challenge:
      "Tucano, offering high-end services, needed an upscale digital identity reflecting excellence and precision, along with marketing tools to support regional expansion.",
    role: "ORVANN was Tucano’s brand, marketing and digital partner through its launch in Egypt and its expansion into Dubai: from the identity and company profile to the website, social channels, campaigns and industry events.",
    solution: [
      "Supported the launch in Egypt and the expansion into Dubai.",
      "Designed a luxury visual identity and developed a premium company profile.",
      "Directed the creation of a seamless, luxury website.",
      "Managed social media and LinkedIn profiles, and launched targeted digital campaigns.",
      "Organized the first edition of the Egypt Aviation Expo.",
      "Prepared for EDEX 2025 in Egypt and the UAE to strengthen market leadership.",
    ],
    // Taken out until there are figures with a source and period: "Increased digital engagement
    // from the target audience" and "Real business expansion and partnership opportunities".
    results: [
      "A complete premium identity, applied from the company profile to printed details such as luggage tags.",
      "One brand presence across the website, social media and LinkedIn, in place for the Egypt launch and the Dubai expansion.",
      "An industry presence built through the first Egypt Aviation Expo and the preparation for EDEX 2025.",
    ],
    image: {
      src: "/work/tucano-2.webp",
      alt: "Tucano Aviation cover: a private jet on the runway with a crew member at its door, and “From digital foundations to industry presence”.",
      width: 1600,
      height: 583,
    },
    gallery: [
      {
        src: "/work/tucano-2-company-profile.webp",
        alt: "Tucano company profiles open at its values and cargo service pages, beside blue covers with private jets.",
        width: 1600,
        height: 903,
      },
      {
        src: "/work/tucano-2-luggage-tags.webp",
        alt: "Tucano luggage tags on a blue suitcase, printed for a Paris to Los Angeles flight.",
        width: 1600,
        height: 873,
      },
    ],
    featured: true,
  },
  {
    slug: "eagles-real-estate-development",
    title: "Eagles Developments",
    categories: ["marketing", "digital", "events"],
    summary:
      "Supporting a real estate brand across strategic direction, rebranding, company communication, website and campaigns.",
    challenge:
      "Create a modern, professional image for upper- and middle-class clients, and a marketing strategy to support expansion inside and outside Egypt.",
    role: "ORVANN started with one project and became Eagles Developments’ strategy, brand, content and digital partner, working across the company and its projects VIA, Riza and Riza 2.",
    solution: [
      "Integrated strategic consulting and rebranding.",
      "Created a professional company profile.",
      "Developed a long-term content strategy and managed digital content across channels.",
      "Supervised the website’s design and development for a smooth user experience.",
      "Launched targeted advertising campaigns to increase awareness and engagement.",
    ],
    // Taken out until the figures are documented (the measure, its source and the period):
    // "A noticeable increase in engagement and sales across channels" and "New opportunities
    // with potential clients, and real growth in the client base".
    results: [
      "A refreshed identity carried across the company, its company profile and its projects, Riza 2 among them.",
      "A website and an Instagram presence that speak in the same brand language.",
      "A partnership that grew from one project into the company’s full marketing.",
    ],
    image: {
      src: "/work/eagles-real-estate-development.webp",
      alt: "Eagles Developments cover: an eagle soaring through orange clouds beside “From one project to a full marketing partnership” and the VIA, Riza and Riza 2 logos.",
      width: 1600,
      height: 583,
    },
    gallery: [
      {
        src: "/work/eagles-real-estate-development-website.webp",
        alt: "The Eagles Developments website on a laptop, its red home page carrying the Eagles logo.",
        width: 1600,
        height: 872,
      },
      {
        src: "/work/eagles-real-estate-development-instagram.webp",
        alt: "The Eagles Developments Instagram profile on a phone, with its story highlights and project posts.",
        width: 1600,
        height: 873,
      },
      {
        src: "/work/eagles-real-estate-development-riza-2.webp",
        alt: "The Riza 2 logo embossed on red card.",
        width: 330,
        height: 180,
      },
    ],
    featured: true,
  },
  {
    slug: "intro",
    title: "Intro",
    categories: ["projects", "marketing", "events"],
    summary:
      "Launching Intro, Roshan Masr’s new destination in west Cairo, across identity, print, website and outdoor campaigns.",
    // [proposed] read from the work; to be confirmed by ORVANN.
    challenge:
      "Roshan Masr needed to introduce Intro, a new destination in west Cairo, as one connected place rather than a group of buildings, and make it recognizable from its first appearance.",
    role: "ORVANN created Intro’s launch brand and carried it through print, the launch page and the outdoor campaign.",
    solution: [
      "Created the Intro identity and its “A Gateway To More” message, built around the idea of a gateway.",
      "Designed the project brochure, presenting its nine buildings as one connected plan.",
      "Designed the launch page announcing the new destination in west Cairo.",
      "Created the outdoor billboards and lifestyle visuals for the campaign.",
    ],
    results: [
      "An identity and a message, “A Gateway To More”, shared by every launch material.",
      "One launch campaign, from the brochure and the launch page to the billboards and lifestyle visuals.",
    ],
    image: {
      src: "/work/intro.webp",
      alt: "Intro cover: a red arch gateway opening onto new buildings and palm trees, under the Intro logo and “A Gateway To More”.",
      width: 1600,
      height: 583,
    },
    gallery: [
      {
        src: "/work/intro-billboard.webp",
        alt: "An Intro billboard against a blue sky: “A Gateway To More”, the Roshan Masr logo and the 15541 hotline beside the project seen through its arch.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/intro-brochure.webp",
        alt: "The Intro brochure open on a café table, presenting nine buildings as one connected plan.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/intro-website.webp",
        alt: "The Roshan Masr website on a laptop, announcing a new destination coming to west Cairo.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/intro-book.webp",
        alt: "A burgundy hardcover book embossed with the Intro logo.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/intro-lifestyle.webp",
        alt: "Intro campaign visual: a woman in burgundy drinking from an Intro cup on a café terrace.",
        width: 330,
        height: 180,
      },
    ],
    featured: true,
  },
  {
    slug: "roshan-masr",
    title: "Roshan Masr",
    categories: ["projects", "marketing", "digital", "events"],
    summary:
      "Building a real estate brand made to be recognized at a glance, across identity, company profile, website and outdoor campaigns.",
    solution: [
      "Shaped the brand around one idea: to be recognized before it is read.",
      "Designed the company profile, with the brand’s vision and mission.",
      "Designed the website in the brand’s visual language.",
      "Created the outdoor campaigns, from rooftop billboards to the “+25 projects” campaign.",
    ],
    image: {
      src: "/work/roshan-masr.webp",
      alt: "Roshan Masr cover: a woman in a flowing gown against the city at night, with “Built to be recognized before it’s read” and the Roshan Masr logo.",
      width: 1600,
      height: 583,
    },
    gallery: [
      {
        src: "/work/roshan-masr-billboard.webp",
        alt: "A tall Roshan Masr billboard against the clouds, announcing more than 25 projects.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/roshan-masr-rooftop-billboard.webp",
        alt: "A Roshan Masr billboard on a rooftop in the evening sun, carrying the 15541 hotline.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/roshan-masr-website.webp",
        alt: "The Roshan Masr website on a laptop resting on a red classic car.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/roshan-masr-company-profile.webp",
        alt: "The Roshan Masr company profile open at its vision and mission pages.",
        width: 330,
        height: 180,
      },
      {
        src: "/work/roshan-masr-book.webp",
        alt: "A hand holding a burgundy book embossed with the Roshan Masr logo.",
        width: 330,
        height: 180,
      },
    ],
    featured: true,
  },
  {
    slug: "al-nour-optics",
    title: "Al Nour Optics",
    categories: ["marketing", "digital", "ecommerce"],
    summary:
      "Building a more consistent brand and digital presence across identity, website, SEO, content and social media.",
    challenge:
      "The company needed a modern digital identity and a professional user experience to stand out and attract diverse customers in a competitive market.",
    solution: [
      "Designed an integrated visual identity that reflects the brand’s history and modernity.",
      "Directed the website’s design and development: an elegant, user-friendly platform consistent with the brand’s visual and strategic identity.",
      "Implemented SEO to increase search visibility and attract relevant visitors.",
      "Created targeted visual and written content for different customer segments.",
      "Managed the social media presence to keep engagement and brand relevance going.",
    ],
    results: [
      "Significant improvement in search engine visibility.",
      "A marked increase in digital engagement.",
      "A solid, modern, professional image in customers’ minds.",
    ],
    image: {
      src: "/work/al-nour-optics.jpg",
      alt: "Al Nour Optics campaign visual: a customer trying on glasses beside an Al Nour Optical shopping bag in the store.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "plaza-garden-real-estate-development",
    title: "Plaza Gardens",
    categories: ["marketing", "digital"],
    summary:
      "Bringing the real estate brand and its bilingual digital presence into one consistent visual direction.",
    challenge:
      "The company needed a strong, consistent visual identity for online and offline use, and a bilingual (Arabic/English) website that highlights its real estate expertise and appeals to its audience.",
    solution: [
      "Designed a professional visual identity that adapts across digital and print.",
      "Directed the design and development of a bilingual website that showcases projects, core values and unique advantages.",
    ],
    results: [
      "A unified visual identity that strengthens the brand’s presence.",
      "A website that reflects professionalism and highlights key projects.",
      "A solid foundation for digital expansion and marketing.",
    ],
    image: {
      src: "/work/plaza-garden-real-estate-development.jpg",
      alt: "Plaza Gardens cover: a residential compound at dusk with the Plaza Gardens logo.",
      width: 1344,
      height: 616,
    },
    featured: true,
  },
];
