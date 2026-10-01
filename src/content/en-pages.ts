import type { SiteContent } from "./types";

/**
 * Inner pages. [site] = restated from the matching orvann.com page (inspected 22–23 Sep
 * 2026), grammar lightly tidied; [proposed] = new wording that needs sign-off.
 */
export const enPages: SiteContent["pages"] = {
  // orvann.com/about-us/ [site]
  about: {
    meta: {
      title: "About ORVANN",
      description:
        "How ORVANN grew from a creative studio into an agency for digital marketing and business consulting — our story, model, values and partners.",
    },
    intro: {
      label: "About us",
      title: "Building futures together.",
      lede: "Have you ever wondered what it takes to turn a small idea into a big success? At ORVANN, dreams and strategy come together to create something truly extraordinary.",
    },
    storyLabel: "Our story",
    storyTitle: "Who are we, really?",
    chapters: [
      {
        title: "Creativity",
        text: "We started out as a humble creative studio with a wide-reaching ambition: to help brands across the Middle East and beyond grow, innovate and stand out in an increasingly crowded market.",
      },
      {
        title: "Over time",
        text: "Our passion for innovation, strategic thinking and long-term relationships evolved into a specialized agency in digital marketing and business consulting, offering integrated solutions grounded in deep market insight.",
      },
      {
        title: "Identity",
        text: "We’re not just a service provider. We’re a true partner — genuinely invested in our clients’ success and fully committed to helping them achieve their vision and goals.",
      },
      {
        title: "Our model",
        text: "A flexible model: a core in-house team working from our dedicated office, with a wider network of talented professionals working remotely. It’s not a coincidence — it’s the result of clear planning and purpose.",
      },
      {
        title: "Flexibility",
        text: "It lets us reach top-tier expertise wherever it is, respond quickly to market shifts, and deliver carefully tailored solutions for every market we work in.",
      },
    ],
    why: {
      title: "Why do we do what we do?",
      text: "Because we’re passionate about building futures. Every project we take on is like planting a seed: with the right nurturing, it grows into something strong and impactful. We’re driven by a simple belief — your success fuels our purpose.",
    },
    achievements: {
      title: "Our achievements so far",
      text: "We’ve helped startups get off the ground and supported established brands to reach new heights — from memorable brand stories to high-impact marketing strategies.",
    },
    values: {
      label: "Our secret sauce",
      title: "Core values",
      text: "Think of us as your growth GPS, guiding you through the twists and turns of the digital landscape.",
      items: ["Integrity", "Collaboration", "Excellence", "Sustainability"],
    },
    partners: {
      label: "Our partners",
      title: "Building success together.",
      text: "We believe collaboration is the key to innovation and sustainable growth. Strategic partnerships with industry leaders, technology providers and creative experts help us deliver comprehensive solutions that produce real results.",
      benefits: [
        { title: "Access to top-tier resources", text: "Cutting-edge technology, innovative tools and industry insight." },
        { title: "Enhanced service offerings", text: "End-to-end solutions tailored to your needs." },
        {
          title: "Regional & global reach",
          text: "Capabilities across the Middle East and beyond, with local relevance and international standards.",
        },
        { title: "Shared expertise", text: "Our strategic thinking, combined with our partners’ specialized skills." },
      ],
    },
    faqTitle: "Questions, answered",
    faqs: [
      {
        question: "Why should I choose ORVANN over other agencies?",
        answer:
          "Because we don’t do cookie-cutter solutions. We dive deep into your needs and craft strategies that truly resonate with your audience — and we’re committed to long-term partnerships, because your success is our success.",
      },
      {
        question: "How does your team help my business?",
        answer:
          "We make your digital transformation seamless, innovative and future-proof, using AI, scalable software and modern tools to keep you ahead.",
      },
      {
        question: "Can you help my startup grow?",
        answer:
          "Absolutely. We love working with startups, guiding them through market research, branding, marketing and digital development to give them the best shot at success.",
      },
      {
        question: "What makes your digital solutions stand out?",
        answer:
          "They’re tailored, scalable and designed around your growth. Whether it’s a website, an app or a marketing campaign, we use current technology to help you stay ahead.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "It depends on your goals, but we’re committed to transparency and quick wins. Usually you’ll start seeing measurable results within 3–6 months.",
      },
    ],
    publicationsTitle: "Publications",
  },

  // orvann.com/services/ [site]
  services: {
    meta: {
      title: "Services — ORVANN",
      description:
        "Marketing and brand development, digital solutions, business consulting, marketing production and event management — integrated solutions from ORVANN.",
    },
    intro: {
      label: "Services",
      title: "Our integrated solutions.",
      lede: "Standing out today takes more than a good product. It takes the right strategy, the right branding and the right digital tools — and a partner who brings them together.",
    },
    families: [
      {
        id: "marketing",
        eyebrow: "Make your mark",
        title: "Marketing & Brand Development",
        text: "Your brand is more than a logo: it’s your story, your personality, your voice. We help you craft a compelling identity and connect authentically with your audience.",
        items: [
          {
            title: "Brand strategy & identity",
            text: "Logo design, visual branding, brand voice and comprehensive guidelines that keep every touchpoint consistent.",
          },
          {
            title: "Digital marketing campaigns",
            text: "From Google Ads to social media advertising, campaigns designed to increase reach and engagement.",
          },
          {
            title: "Content creation",
            text: "Professional designs, videos, reels, articles and ads tailored to your audience and brand voice.",
          },
          {
            title: "Social media management",
            text: "Content, posting, audience engagement and analytics across LinkedIn, Facebook, Instagram, TikTok and more.",
          },
          {
            title: "Influencer marketing & email campaigns",
            text: "Wider reach through influencer collaborations and automated email marketing.",
          },
        ],
        image: {
          src: "/work/al-nour-optics.jpg",
          alt: "Al Nour Optics campaign visual: a customer trying on glasses beside an Al Nour Optical shopping bag in the store.",
          width: 1344,
          height: 616,
        },
      },
      {
        id: "digital",
        eyebrow: "Be found, be remembered",
        title: "Digital Solutions & Online Presence",
        text: "We oversee every detail of your site: strategy, content, design and branding. Developers implement the plan exactly as designed.",
        items: [
          {
            title: "Search engine optimization",
            text: "Data-driven strategies planned by our team to improve rankings and attract targeted organic traffic.",
          },
          {
            title: "Website & e-commerce strategy",
            text: "We shape your site’s structure, content and experience; specialists execute the technical build under our direction.",
          },
          {
            title: "Ongoing marketing support & optimization",
            text: "We stay actively involved after launch, so your site keeps growing and converting.",
          },
        ],
        image: {
          src: "/work/sami-alsalmi-law-office-mobile.jpg",
          alt: "The Sami Al-Salmi Law Office website shown on two phones.",
          width: 545,
          height: 577,
        },
      },
      {
        id: "consulting",
        eyebrow: "Navigate the market maze",
        title: "Business Consulting & Advisory",
        text: "Starting a new venture or expanding an existing one can feel like navigating a maze blindfolded. Market research, feasibility studies and startup advisory light the way.",
        items: [
          { title: "Market research & feasibility studies", text: "Data-backed insights to inform your strategic decisions." },
          { title: "Startup & entrepreneurship advisory", text: "Business model development, branding and marketing planning." },
          {
            title: "Idea development & investor presentations",
            text: "Early-stage ideas turned into actionable plans and compelling presentations for investors.",
          },
          { title: "AI & creative innovation", text: "Advanced technology that future-proofs your business and fosters innovation." },
        ],
        image: {
          src: "/work/al-marefah-tech.webp",
          alt: "Al Marefah Tech cover: two businessmen beside the Al Marefa Tech identity on a dark teal background.",
          width: 1344,
          height: 616,
        },
      },
      {
        id: "production",
        eyebrow: "Leave a lasting impression",
        title: "Marketing Production & Supply",
        text: "From eye-catching brochures and banners to trade-show displays, we make sure your brand stands out in every setting, online or offline.",
        items: [
          { title: "Printing & production", text: "Brochures, banners, packaging and corporate stationery with premium finishes." },
          {
            title: "Corporate gifts & uniforms",
            text: "Customized branded gifts, uniforms and accessories that reinforce your brand image.",
          },
          { title: "Exhibition & display design", text: "Impactful displays for trade shows, malls and events." },
        ],
        image: {
          src: "/work/sami-alsalmi-law-office-stationery.jpg",
          alt: "Sami Al-Salmi Law Office stationery in black and gold: business cards, letterhead and folder.",
          width: 655,
          height: 612,
        },
      },
      {
        id: "events",
        eyebrow: "Make every event memorable",
        title: "Event Planning & Management",
        text: "Professional planning and execution for events people remember.",
        items: [
          {
            title: "Event design & execution",
            text: "From décor and lighting to hospitality, every detail handled for flawless delivery.",
          },
          {
            title: "Corporate events",
            text: "Conferences, product launches, employee recognition events and networking gatherings.",
          },
          {
            title: "Brand activations & product launches",
            text: "Unique concepts and immersive experiences that create lasting impressions.",
          },
          { title: "Luxury private events", text: "High-end private parties and exclusive experiences." },
        ],
        image: {
          src: "/media/exhibitions-stage.jpg",
          alt: "Render of a conference stage with large LED screens, lit steps and a speaker’s podium.",
          width: 1344,
          height: 616,
        },
      },
    ],
    why: {
      title: "Why choose ORVANN",
      text: "Because we’re not just about delivering services — we’re about building partnerships. We listen, understand, and then craft strategies that align with your vision, focused on sustainable growth rather than quick wins.",
    },
    faqTitle: "Questions, answered",
    faqs: [
      {
        question: "Who leads my website’s strategy and design?",
        answer:
          "We take full ownership of your website’s concept, branding, content, design and overall strategy. Developers implement the plan exactly as designed.",
      },
      {
        question: "Can I use my own developer?",
        answer: "Yes. You can choose your preferred developer or our trusted partners; they follow our precise specifications.",
      },
      {
        question: "When does SEO begin?",
        answer: "SEO is integrated from day one. Data-driven strategies are built into the whole process to drive higher rankings and targeted traffic.",
      },
      {
        question: "What is included in strategy consultation?",
        answer:
          "We blueprint your site’s structure, user experience, content and conversion flow. Specialists then execute the technical build under our guidance.",
      },
      {
        question: "What support do you provide after launch?",
        answer: "We continuously monitor, analyze and optimize your site so it evolves with your business and keeps delivering results.",
      },
    ],
  },

  // orvann.com/exhibitions-conferences/ [site]
  exhibitions: {
    meta: {
      title: "Exhibitions & Conferences — ORVANN",
      description:
        "Strategic planning, booth design, gifts, digital campaigns, on-site execution and post-event analysis — ORVANN makes your presence at every exhibition and conference count.",
    },
    intro: {
      label: "Exhibitions & conferences",
      title: "Your presence speaks for you.",
      lede: "Every appearance delivers a message, and we make sure yours is clear, powerful and unforgettable.",
    },
    text: "At ORVANN, we don’t just take part in exhibitions and conferences — we create a complete brand experience. Your presence at any event becomes a cohesive story, full of value and professionalism, from strategic planning to every detail on the ground.",
    image: {
      src: "/media/exhibitions-stage.jpg",
      alt: "Render of a conference stage with large LED screens, lit steps and a speaker’s podium.",
      width: 1344,
      height: 616,
    },
    processLabel: "How we work",
    processTitle: "Our detailed process",
    stages: [
      {
        title: "Strategic event planning",
        points: [
          "Research into the target exhibition or conference.",
          "Clear brand objectives and a precisely defined audience.",
          "Competitor analysis, and the points that will make you stand out.",
          "An integrated plan to get the most from taking part.",
        ],
      },
      {
        title: "Booth & marketing collateral design",
        points: [
          "A booth designed around your brand identity and values.",
          "Promotional materials prepared professionally and attractively.",
          "Colors, fonts and materials chosen to reinforce your brand image.",
          "Every visual detail speaking clearly to the intended audience.",
        ],
      },
      {
        title: "Gifts & promotional materials",
        points: [
          "Professional gifts and promotional materials aligned with your identity.",
          "Interactive samples that draw visitors into your products and services.",
          "Every element designed to leave a lasting impression.",
        ],
      },
      {
        title: "Digital preparation, before & during",
        points: [
          "Digital campaigns that build awareness before the exhibition.",
          "Social media content managed in sync with the event.",
          "Booths and digital materials supervised during the exhibition.",
          "Your audience engaged with every brand element.",
        ],
      },
      {
        title: "On-site supervision & execution",
        points: [
          "On the ground at the event to keep everything running smoothly.",
          "Visitor interactions with products and services organized and managed.",
          "Every detail of the booth and materials monitored.",
          "Every element reflecting your professional image.",
        ],
      },
      {
        title: "Post-event analysis & evaluation",
        points: [
          "Performance measured against the goals set at the start.",
          "The best moments turned into more marketing content.",
          "Recommendations to maximize impact at future events.",
          "Your digital presence strengthened and linked to market updates.",
        ],
      },
    ],
    news: {
      label: "News",
      title: "Techne Summit 2026",
      text: "ORVANN is proud to join Techne Summit, one of the region’s leading platforms for entrepreneurship, innovation, technology and business networking — bringing businesses, founders, investors and industry leaders together.",
      link: { label: "Visit Techne Summit", href: "https://technesummit.com/2026" },
    },
  },

  // orvann.com/contact-us/ [site]
  contact: {
    meta: {
      title: "Contact ORVANN",
      description: "Talk to ORVANN by email, phone or WhatsApp, or visit us on Al-Haram St., Giza, Egypt.",
    },
    intro: {
      label: "Contact us",
      title: "Let’s build your future together.",
      lede: "Whether you’re ready to start a project, want strategic advice or simply want to learn more about our integrated solutions, we’re here to help.",
    },
    channelsTitle: "How to reach us",
    faqTitle: "Questions, answered",
    faqs: [
      {
        question: "How can ORVANN help my business grow?",
        answer:
          "We offer a full range of services — market research and analysis, branding, digital marketing, project management and events — designed to boost your visibility, optimize your operations and foster sustainable growth.",
      },
      {
        question: "What industries do you serve?",
        answer:
          "We work with many sectors, including defense and aviation, real estate, technology, retail and hospitality. Our solutions are tailored to your industry.",
      },
      {
        question: "How long does a typical project take?",
        answer: "Timelines depend on scope and complexity. We provide clear schedules and keep you updated throughout, so delivery stays on time.",
      },
      {
        question: "Can you support startups?",
        answer: "Yes. Our startup advisory, market research and AI integrations are designed to help new businesses succeed from the ground up.",
      },
      {
        question: "What is your pricing model?",
        answer: "Pricing depends on the size and requirements of your project. We provide a detailed quote once we fully understand your needs.",
      },
      {
        question: "Can you support my business after the project is complete?",
        answer: "Yes. We believe in long-term relationships and offer ongoing support, training and maintenance so your solutions keep delivering value.",
      },
      {
        question: "How do I stay updated on ORVANN’s services and news?",
        answer: "Follow us on social media for new solutions, success stories and industry insights.",
      },
    ],
  },

  // New index for orvann.com/our-projects/<slug>/ pages.
  work: {
    meta: {
      title: "Our Projects — ORVANN",
      description:
        "Brand identity, website, social media, campaign and event projects by ORVANN for clients in Egypt and the Gulf.",
    },
    intro: {
      label: "Our projects",
      title: "Work we’re proud of.", // [proposed]
      lede: "Identity, website, campaign and event projects for clients in Egypt and the Gulf.",
    },
    filterLabel: "Filter projects",
    filters: {
      all: "All",
      branding: "Branding",
      websites: "Websites",
      social: "Social & content",
      campaigns: "Campaigns",
      strategy: "Strategy",
      events: "Events",
    },
    countLabel: (count) => `${count} ${count === 1 ? "project" : "projects"}`,
    empty: "No projects in this category yet.",
    servicesLink: { label: "Explore all services", href: "/services/" },
  },

  caseStudy: {
    back: "All projects",
    disciplines: "What we did",
    challenge: "The challenge",
    solution: "The solution",
    results: "Results",
    gallery: "Gallery",
    next: "Next project",
    visitWebsite: "Visit website",
  },

  // orvann.com/privacy-policy/ [site] — legal text restated, not rewritten. Confirm with counsel.
  privacy: {
    meta: {
      title: "Privacy Policy — ORVANN",
      description: "How ORVANN collects, uses and shares personal information on its website and social media channels.",
    },
    intro: {
      label: "Legal",
      title: "Privacy policy",
      lede: "ORVANN (“we”, “us” or “our”) is committed to protecting your privacy.",
    },
    effective: "Effective date: 14 July 2025",
    sections: [
      {
        heading: "About this policy",
        paragraphs: [
          "This Privacy Policy describes how we collect, use and share personal information when you visit our website or engage with us on social media platforms, including but not limited to Snapchat, Instagram and other social media channels.",
          "By using our website and services, you agree to the collection and use of information in accordance with this policy.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: ["We may collect the following types of personal information:"],
        list: [
          "Personal identifiers — such as your name, email address, phone number and address, when you submit inquiries or sign up for services.",
          "Usage data — details of your interactions with our website and social media pages, including pages visited, clicks and other interaction data.",
          "Device information — information about the devices you use to access our website, including IP address, browser type and operating system.",
          "Social media data — when you interact with us on social media platforms, we may collect publicly available information based on your privacy settings.",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: ["We use the information we collect to:"],
        list: [
          "Respond to inquiries and provide information about our services.",
          "Improve our website and customer experience.",
          "Send marketing communications with your consent or as permitted by law.",
          "Serve relevant ads on social media platforms, including Snapchat, Instagram and others.",
          "Comply with legal requirements and prevent fraudulent activities.",
        ],
      },
      {
        heading: "Sharing your information",
        paragraphs: ["We may share your information with:"],
        list: [
          "Service providers — third parties who help us operate our website and conduct our business (for example email marketing, analytics and advertising).",
          "Social media platforms — we may use social media advertising and analytics tools (for example Snapchat Ads Manager and Instagram Insights) to display ads and track performance.",
          "Legal obligations — we may disclose your information if required by law or to respond to legal requests from authorities.",
        ],
      },
      {
        heading: "Advertising and analytics",
        paragraphs: [
          "We work with social media and advertising partners to provide tailored ads and analyze performance. These partners may use cookies or similar tracking technologies to collect data on your interactions.",
          "You can control advertising preferences through your social media account settings and by adjusting your browser settings to manage cookies.",
        ],
      },
      {
        heading: "Security of your information",
        paragraphs: [
          "We take reasonable precautions to protect your information, using industry-standard security practices. However, no data transmission over the internet is fully secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: ["Depending on your location, you may have rights regarding your personal information, including:"],
        list: [
          "The right to access, update or delete your information.",
          "The right to object to certain uses of your data, including marketing.",
          "The right to withdraw consent where you have given it.",
        ],
      },
      {
        heading: "Children’s privacy",
        paragraphs: [
          "Our services are not intended for individuals under 18. We do not knowingly collect personal information from minors; if we learn that we have, we will take steps to delete it.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "Our website may include links to external sites. This Privacy Policy does not apply to third-party websites, and we encourage you to review their privacy practices.",
        ],
      },
      {
        heading: "Changes to this privacy policy",
        paragraphs: [
          "We may update this policy periodically. Changes will be posted on this page, and the effective date will be updated accordingly.",
        ],
      },
      {
        heading: "Contact us",
        paragraphs: [
          "To exercise any of these rights, or if you have questions about this policy or our data practices, contact us by email at info@orvann.com, by phone on +20 108 078 4465, or at our office on Al-Haram St., Giza, Egypt.",
        ],
      },
    ],
  },

  publicationLink: "Open in a new tab",

  // orvann.com/about-us/company-profile/, /summer-giveaway/, /vip-gifts/ — each embeds a
  // Heyzine flipbook [site]; intros are [proposed].
  publications: [
    {
      slug: "company-profile",
      meta: { title: "Company Profile — ORVANN", description: "The ORVANN company profile, as a flipbook." },
      intro: { label: "Publication", title: "Company profile", lede: "Who we are and what we do, in one document." },
      flipbookUrl: "https://heyzine.com/flip-book/729a5ed198.html",
      frameTitle: "ORVANN Company Profile (flipbook)",
    },
    {
      slug: "summer-giveaway",
      meta: { title: "Summer Giveaway — ORVANN", description: "The ORVANN summer giveaway, as a flipbook." },
      intro: { label: "Publication", title: "Summer giveaway", lede: "Our summer giveaway collection." },
      flipbookUrl: "https://heyzine.com/flip-book/b7caeca1ee.html",
      frameTitle: "ORVANN summer giveaway (flipbook)",
    },
    {
      slug: "vip-gifts",
      meta: { title: "VIP Gifts — ORVANN", description: "The ORVANN VIP gifts collection, as a flipbook." },
      intro: { label: "Publication", title: "VIP gifts", lede: "Corporate and VIP gift ideas from ORVANN." },
      flipbookUrl: "https://heyzine.com/flip-book/a3b8db03b0.html",
      frameTitle: "ORVANN gifts (flipbook)",
    },
  ],

  // Shared closing band [proposed]
  cta: {
    label: "Start a project",
    title: "Ready to build the future?",
    text: "Tell us what you want to build or where you want to grow. We’ll take it from there.",
    primary: { label: "Let’s talk", href: "/contact-us/" },
    secondary: { label: "See our work", href: "/our-projects/" },
  },
};
