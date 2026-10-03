import type { Project } from "./types";

/**
 * All 16 projects. Names, services and summaries are [copy] (the project card copy supplied by
 * ORVANN, 3 Oct 2026); challenges, solutions and results are [site], restated from each
 * project page on orvann.com/our-projects (inspected 23 Sep 2026), grammar lightly tidied.
 * Slugs match the live URLs, so /our-projects/<slug>/ keeps working. `featured` projects
 * also appear in Selected Work on the homepage.
 */
export const enProjects: Project[] = [
  {
    slug: "al-nour-optics",
    title: "Al Nour Optics",
    categories: ["branding", "marketing", "digital"],
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
    featured: true,
  },
  {
    slug: "sami-alsalmi-law-office",
    title: "Sami Al-Salmi Law Office",
    categories: ["branding", "digital"],
    summary:
      "Creating a professional visual and digital presence through identity, website and appointment-booking requirements.",
    challenge:
      "Create a website that conveys credibility and professionalism, clearly showcases the lawyer’s expertise and simplifies consultation booking for potential clients.",
    solution: [
      "Directed the development of a clean, professional website highlighting the office’s legal services and the lawyer’s credentials.",
      "Supervised the design of a user-friendly interface with an easy consultation booking system.",
      "Created a visual identity that reflects trust, authority and formality.",
      "Tested mobile responsiveness and smooth navigation for clients across the Gulf region.",
    ],
    results: [
      "A credible, functional website that reinforces the lawyer’s professional image.",
      "Easier client interaction and consultation booking.",
      "Greater visibility and reach with the target audience in the Gulf market.",
    ],
    image: {
      src: "/work/sami-alsalmi-law-office.jpg",
      alt: "Sami Al-Salmi Law Office cover: a dark, classical office with a lawyer’s robe, scales of justice and the office’s gold logo.",
      width: 1344,
      height: 696,
    },
    gallery: [
      {
        src: "/work/sami-alsalmi-law-office-mobile.jpg",
        alt: "The Sami Al-Salmi Law Office website shown on two phones.",
        width: 545,
        height: 577,
      },
      {
        src: "/work/sami-alsalmi-law-office-stationery.jpg",
        alt: "Sami Al-Salmi Law Office stationery in black and gold: business cards, letterhead and folder.",
        width: 655,
        height: 612,
      },
    ],
    featured: true,
  },
  {
    slug: "rgc-brokerage",
    title: "RGC Brokerage",
    categories: ["branding", "marketing", "digital"],
    summary:
      "Connecting identity, website, social content, paid campaigns and company communication for a real estate brokerage.",
    challenge:
      "Develop a strong, credible brand identity that appeals to diverse audiences across two key markets, with a digital presence that conveys professionalism, trust and competitiveness in real estate.",
    solution: [
      "Created a comprehensive visual identity aligned with the brand’s vision and market positioning.",
      "Supervised the development of a user-friendly, professional website showcasing properties.",
      "Designed and executed a social media content strategy tailored to audience preferences.",
      "Launched and managed paid ad campaigns to maximize reach and generate quality leads.",
      "Crafted a professional company profile highlighting strengths and supporting business growth.",
    ],
    results: [
      "Greater brand awareness and digital presence among Gulf and Egyptian clients.",
      "Improved customer engagement and a notable rise in inquiries.",
      "A professional image that reflects RGC’s credibility and value in the real estate market.",
    ],
    image: {
      src: "/work/rgc-brokerage.jpg",
      alt: "RGC Brokerage cover: a city skyline presented on a platter beside RGC branding, listing branding, website design, content strategy and social media campaigns.",
      width: 1344,
      height: 616,
    },
    featured: true,
  },
  {
    slug: "tucano-2",
    title: "Tucano",
    categories: ["branding", "marketing", "digital", "events"],
    summary:
      "Creating a cohesive premium brand presence across identity, company profile, digital channels, campaigns and event-related execution.",
    challenge:
      "Tucano, offering high-end services, needed an upscale digital identity reflecting excellence and precision, along with marketing tools to support regional expansion.",
    solution: [
      "Supported the launch in Egypt and the expansion into Dubai.",
      "Designed a luxury visual identity and developed a premium company profile.",
      "Directed the creation of a seamless, luxury website.",
      "Managed social media and LinkedIn profiles, and launched targeted digital campaigns.",
      "Organized the first edition of the Egypt Aviation Expo.",
      "Prepared for EDEX 2025 in Egypt and the UAE to strengthen market leadership.",
    ],
    results: [
      "A complete, upscale digital identity.",
      "Increased digital engagement from the target audience.",
      "Real business expansion and partnership opportunities.",
      "A corporate presence that matches the premium services offered.",
    ],
    image: {
      src: "/work/tucano-2.jpg",
      alt: "Tucano cover: private jets over a coastal city, a traveller at a cabin window and the Tucano logo.",
      width: 1344,
      height: 616,
    },
    featured: true,
  },
  {
    slug: "plaza-garden-real-estate-development",
    title: "Plaza Gardens",
    categories: ["branding", "digital"],
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
  {
    slug: "al-marefah-tech",
    title: "Al Marefah Tech",
    categories: ["strategy", "branding", "digital"],
    summary:
      "Connecting strategy, visual identity, website and content direction for a technology business.",
    challenge:
      "The company needed a modern, strong digital identity that appeals to business owners and decision-makers, with a marketing strategy to support its diverse services and expansion goals.",
    solution: [
      "Strategic business and marketing guidance.",
      "Designed a professional, innovative visual identity.",
      "Supervised the development of a sleek, user-friendly website.",
      "Created a tailored content strategy for social media.",
    ],
    results: [
      "A cohesive, powerful brand identity that speaks to entrepreneurs and corporate audiences.",
      "A modern digital presence that reinforces the company’s expertise and professionalism.",
      "More visibility and engagement across social media platforms.",
      "Greater credibility and readiness to expand into regional markets.",
    ],
    image: {
      src: "/work/al-marefah-tech.webp",
      alt: "Al Marefah Tech cover: two businessmen beside the Al Marefa Tech identity on a dark teal background.",
      width: 1344,
      height: 616,
    },
    featured: true,
  },
  {
    slug: "azdan-dental-center",
    title: "Azdan Dental Center",
    categories: ["branding", "marketing", "digital", "events"],
    summary:
      "Building a consistent healthcare brand across identity, landing experience, campaigns, social communication and physical brand applications.",
    challenge:
      "Build a trusted dental brand from the ground up that can compete in the healthcare market, with a professional identity and digital presence that inspire confidence from the first interaction.",
    solution: [
      "Developed a complete visual identity for specialized dental services, including logo design.",
      "Registered the domain and created a landing page reflecting the center’s vision and slogan.",
      "Created and managed the social media platforms, with a content strategy to build awareness and trust.",
      "Designed digital advertising campaigns to promote the center’s services.",
      "Created professional marketing materials, such as prescriptions and folders.",
      "Designed signage and visual materials to strengthen brand visibility.",
    ],
    results: [
      "A strong, cohesive brand identity for the dental center.",
      "A structured digital presence that reaches the target audience effectively.",
      "Growing awareness of the center’s services through professional content and design.",
      "A confident market launch and a platform for future patient growth.",
    ],
    image: {
      src: "/work/azdan-dental-center.png",
      alt: "Azdan Dental Center cover: a smiling woman beside an illustrated tooth being cared for, with the Azdan logo.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "domivento",
    title: "Domivento",
    categories: ["branding", "marketing", "digital"],
    summary:
      "Creating a more cohesive presence for an interior design brand across identity, digital experience, social content and portfolio presentation.",
    challenge:
      "Create a strong brand identity that reflects sophistication and professionalism for clients who value quality and detail, for a studio whose work lacked a matching visual identity and digital presence.",
    solution: [
      "Developed a complete visual identity that reflects the brand’s design philosophy, including the logo.",
      "Registered the domain and created a landing page to establish the brand message and slogan.",
      "Built and managed the social media platforms strategically.",
      "Crafted targeted content and visually appealing posts aligned with the brand’s aesthetic.",
      "Created a professional portfolio that presents previous projects in a structured, compelling way.",
    ],
    results: [
      "A cohesive brand identity that balances elegance and simplicity.",
      "A digital presence that reflects the quality of the work and attracts the right audience.",
      "Stronger project presentation, increasing client trust and conversion potential.",
      "A brand positioned as a distinctive design identity, not just a service provider.",
    ],
    image: {
      src: "/work/domivento.png",
      alt: "Domivento cover: an interior design sketch blending into a finished living room, with the Domivento logo.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "akam",
    title: "AKAM",
    categories: ["branding", "digital"],
    summary:
      "Developing digital brand assets and a more consistent identity system across the required touchpoints.",
    challenge:
      "AKAM serves major brands, but its internal digital and administrative systems didn’t match the scale of its clients. Technical issues, disorganized digital assets and fragile infrastructure risked disrupting the entire operation.",
    solution: [
      "Implemented a full integrated management approach.",
      "Structured and organized the official accounts.",
      "Consolidated and secured all digital assets.",
      "Built a stable internal system that eliminates chaos.",
      "Developed a unified digital and administrative identity that reflects AKAM’s professionalism.",
    ],
    results: [
      "Full protection and organization of digital assets.",
      "A unified administrative and visual structure.",
      "Greater operational discipline and professionalism.",
      "A scalable infrastructure ready for long-term growth.",
    ],
    image: {
      src: "/work/akam.jpg",
      alt: "AKAM cover: four people in branded T-shirts beside a phone showing apparel designs, on an orange background.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "suncrete",
    title: "Suncrete",
    categories: ["strategy", "branding"],
    summary:
      "Defining positioning, communication direction and the identity system for an industrial brand.",
    challenge:
      "Ready-mix concrete is one of the toughest, most competitive industrial sectors. Suncrete needed more than a logo: a solid industrial identity able to stand strong in a market built on trust, quality and professional presence.",
    solution: [
      "Started by understanding the industry, the behavior of its clients and the language of competition.",
      "Developed a communication tone tailored to contractors and large construction companies.",
      "Built a complete identity system that positions Suncrete as a professional, reliable industrial brand.",
    ],
    results: [
      "A strong identity that reinforces trust.",
      "Clear messaging aligned with the industrial market.",
      "A stronger presence within large construction projects.",
      "A brand image that positions Suncrete as a dependable partner.",
    ],
    image: {
      src: "/work/suncrete.jpg",
      alt: "Suncrete cover: a construction site with cranes and a concrete plant around the Suncrete wordmark.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "alkholy-lights",
    title: "Alkholy Lights",
    categories: ["branding", "marketing"],
    summary:
      "Building a consistent visual and communication system across identity, social media, product imagery and brand voice.",
    challenge:
      "Design a visual identity that embodies quality, elegance and craftsmanship to support the brand’s growth, together with a structured digital presence and high-quality product visuals.",
    solution: [
      "Developed a modern, sophisticated visual identity aligned with the growth goals.",
      "Created and executed a comprehensive social media content plan to build awareness and engagement.",
      "Organized professional product photography to show the lighting pieces in high visual quality.",
      "Established a consistent brand voice and visual language for local and international commercial and investment goals.",
    ],
    results: [
      "A unified, professional visual identity that elevated the brand’s market perception.",
      "A significant increase in online engagement and visibility among potential customers.",
      "High-quality product imagery that strengthened marketing and sales.",
    ],
    image: {
      src: "/work/alkholy-lights.jpg",
      alt: "Alkholy Lights cover: a girl reading beneath a designer floor lamp, with a glowing light bulb and the Alkholy Light logo.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "eagles-real-estate-development",
    title: "Eagles Developments",
    categories: ["strategy", "branding", "marketing", "digital"],
    summary:
      "Supporting a real estate brand across strategic direction, rebranding, company communication, website and campaigns.",
    challenge:
      "Create a modern, professional image for upper- and middle-class clients, and a marketing strategy to support expansion inside and outside Egypt.",
    solution: [
      "Integrated strategic consulting and rebranding.",
      "Created a professional company profile.",
      "Developed a long-term content strategy and managed digital content across channels.",
      "Supervised the website’s design and development for a smooth user experience.",
      "Launched targeted advertising campaigns to increase awareness and engagement.",
    ],
    results: [
      "A strong digital identity that reflects professionalism and strengthens market presence.",
      "A noticeable increase in engagement and sales across channels.",
      "New opportunities with potential clients, and real growth in the client base.",
    ],
    image: {
      src: "/work/eagles-real-estate-development.jpg",
      alt: "Eagles Developments cover: a construction worker and new residential buildings beside the Eagles logo.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "diwanyah-culture",
    title: "Diwanyah Culture",
    categories: ["strategy", "branding", "marketing"],
    summary:
      "Connecting market understanding, visual identity and social communication for a culture-focused brand.",
    challenge:
      "Create a visual identity that reflects the brand’s artistic and cultural essence, and content that engages a diverse audience of art lovers and creators.",
    solution: [
      "Carried out market research to target the 18 to 35 age group.",
      "Developed a visual identity that embodies the brand’s artistic spirit and unique positioning.",
      "Created and executed a social media content plan focused on visual art, engagement and community building.",
    ],
    results: [
      "A cohesive, memorable identity that positioned Diwanyah Culture as a professional, credible art platform.",
      "Engaging content that attracted a growing community of artists and art lovers, opening the way to collaborations across the region.",
    ],
    image: {
      src: "/work/diwanyah-culture.jpg",
      alt: "Diwanyah Culture cover: a woman painting at an easel in a studio, with the Diwanyah wordmark.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "modern-fix",
    title: "Modern Fix",
    categories: ["branding", "marketing"],
    summary:
      "Preparing the brand for launch through logo development, social presence and content planning.",
    challenge:
      "The company lacked a strong online presence and needed a compelling visual identity, with a professional launch on social media to showcase its services and attract new clients.",
    solution: [
      "Created social media accounts tailored to the audience and each platform’s requirements.",
      "Developed a comprehensive content plan focused on awareness, promotion and engagement.",
      "Designed a custom logo that reflects the brand’s service-oriented nature and strengthens its online appearance.",
    ],
    results: [
      "A strong, clear digital launch with a well-defined identity and messaging.",
      "An attractive online presence that builds trust and drives interaction.",
      "Strategic support that raised brand awareness and made customer engagement easier.",
    ],
    image: {
      src: "/work/modern-fix.jpg",
      alt: "Modern Fix cover: a removal truck and a furnished living room, with the Modern Fix logo.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "iconic",
    title: "Iconic Construction & Real Estate",
    categories: ["branding"],
    summary:
      "Establishing the visual foundations and core identity system for a construction and real estate brand.",
    challenge:
      "Iconic, a high-end contracting and finishing company, needed a strong brand identity to appeal to clients who prioritize quality in residential and commercial projects.",
    solution: [
      "Developed a comprehensive brand identity that reflects strength and precision.",
      "Established the brand foundations (color palette, typography, logo and visual applications) for consistency across every platform.",
    ],
    results: [
      "Stronger brand recognition in a competitive market.",
      "High-end clients attracted, with several prestigious projects secured.",
      "A stronger position as a premium contractor and finisher.",
    ],
    image: {
      src: "/work/iconic.jpg",
      alt: "Iconic Construction & Real Estate cover: a hand sketching a modern residential building.",
      width: 1344,
      height: 616,
    },
  },
  {
    slug: "geocell-keystone",
    title: "Geocell & Keystone",
    categories: ["marketing"],
    summary:
      "Developing advertising communication focused on brand awareness for engineering solutions.",
    challenge:
      "Keystone and Geocell, sister brands providing specialized engineering solutions in soil stabilization and canal lining, needed to strengthen their presence and attract the real estate development and infrastructure sectors.",
    solution: [
      "Launched a targeted ad campaign for Geocell to grow followers and engagement among large-scale infrastructure and construction audiences.",
      "Ran a promotional campaign for Keystone to boost page interaction and brand awareness among key business sectors and decision-makers.",
    ],
    results: [
      "Geocell gained followers and a significant boost in engagement within three months.",
      "Keystone saw more page interaction and wider recognition among major industry players.",
      "Both brands strengthened their online presence, leading to new inquiries and project opportunities.",
    ],
    image: {
      src: "/work/geocell-keystone.jpg",
      alt: "Geocell and Keystone cover: a builder laying retaining-wall blocks, with the campaign tagline.",
      width: 1344,
      height: 616,
    },
  },
];
