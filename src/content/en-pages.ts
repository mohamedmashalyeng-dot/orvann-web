import type { SiteContent } from "./types";

/**
 * Inner pages. [copy] = the site copy supplied by ORVANN (3 Oct 2026); [site] = restated
 * from the matching orvann.com page (inspected 22–23 Sep 2026), grammar lightly tidied;
 * [proposed] = new wording that needs sign-off.
 */
export const enPages: SiteContent["pages"] = {
  // [copy]
  about: {
    meta: {
      title: "About ORVANN | Growth & Execution Partner in Egypt",
      description:
        "Learn about ORVANN, an Egypt-based growth partner connecting strategy, branding, marketing, digital experiences, events and production.",
    },
    intro: {
      label: "About ORVANN",
      title: "We connect the thinking with the doing.",
      lede: "ORVANN works with businesses that need more than disconnected deliverables.",
      body: [
        "We connect strategy, branding, marketing, digital experiences and physical execution so each part of the project supports the same objective.",
      ],
    },
    cta: { label: "See Our Work", href: "/our-projects/" },
    who: {
      title: "Who is ORVANN?",
      intro: "ORVANN is an Egypt-based growth and execution partner working across five connected capabilities:",
      paragraphs: [
        "Our role is not to force every client into the same package.",
        "We identify what the project actually needs, build the right scope and connect the specialists involved around one direction.",
      ],
    },
    story: {
      title: "From creative work to connected execution.",
      paragraphs: [
        "ORVANN began with a strong focus on creative work and developed into a broader model built around the needs we continued to see across client projects.",
      ],
      sequence: [
        "A new identity often needed content.",
        "Content needed campaigns.",
        "Campaigns needed a strong website.",
        "A launch could also require print, outdoor, exhibitions or on-ground production.",
      ],
      closing:
        "Instead of treating each deliverable as a separate project, our model connects them when the business needs them to work together.",
    },
    capabilities: {
      title: "Five capabilities. One operating direction.",
      items: [
        { id: "strategy", text: "Research, positioning and planning that help define what should happen next." },
        { id: "branding", text: "Identity and creative systems that make the brand recognizable and consistent." },
        { id: "marketing", text: "Content and campaigns that take the brand to its intended audience." },
        { id: "digital", text: "Websites and digital journeys that help people understand, evaluate and act." },
        {
          id: "events",
          text: "Physical brand experiences and production that carry the same identity into the real world.",
        },
      ],
    },
    process: {
      title: "How we work",
      steps: [
        {
          title: "Understand",
          text: "We begin with the business, the audience, the objective, the current situation and the constraints around the project.",
        },
        {
          title: "Define",
          text: "We identify priorities, scope, responsibilities, deliverables and what success should be measured against.",
        },
        { title: "Build", text: "Strategy becomes identity, content, campaigns, digital experiences or production requirements." },
        { title: "Execute", text: "The approved direction moves into delivery across the required channels." },
        {
          title: "Review & Improve",
          text: "Where ongoing support is part of the scope, we review performance, feedback and new requirements to guide the next decisions.",
        },
      ],
    },
    model: {
      title: "The right expertise for the work.",
      paragraphs: [
        "ORVANN operates with a core team supported by specialized talent and trusted resources according to the needs of each project.",
        "This model allows the scope to expand or narrow depending on whether a client needs strategy, creative, media, digital, production or a combination of them.",
      ],
    },
    values: {
      title: "Values",
      items: [
        { title: "Integrity", text: "Clear communication, realistic commitments and no claims we cannot support." },
        {
          title: "Collaboration",
          text: "Good work depends on clear communication between our team, our clients and everyone responsible for delivery.",
        },
        { title: "Excellence", text: "We care about the quality of the thinking as much as the quality of the final execution." },
        {
          title: "Sustainability",
          text: "We build systems and relationships that can continue to work beyond one campaign or deliverable.",
        },
      ],
    },
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "What type of company is ORVANN?",
        answer:
          "ORVANN is a growth and execution partner providing connected strategy, branding, marketing, digital, event, outdoor and production services.",
      },
      {
        question: "Where is ORVANN based?",
        answer: "ORVANN is based in Egypt and has worked on projects for businesses in Egypt and Gulf markets.",
      },
      {
        question: "What types of businesses does ORVANN work with?",
        answer:
          "Our portfolio includes businesses across sectors such as real estate, aviation, technology, healthcare, professional services and retail. Scope is defined according to each business rather than by a fixed industry package.",
      },
      {
        question: "Do you only work on full-service projects?",
        answer: "No. ORVANN can handle a single defined service or coordinate a wider scope involving several capabilities.",
      },
      {
        question: "How long does an ORVANN project take?",
        answer:
          "There is no single timeline for every project. Timing depends on scope, approvals, production requirements and dependencies. A project schedule is defined after the required work is clear.",
      },
    ],
  },

  // [copy]
  services: {
    meta: {
      title: "ORVANN Services | Strategy, Branding, Marketing, Digital & Events",
      description:
        "Explore ORVANN services across strategy, branding, marketing, websites and digital experiences, events, outdoor advertising and production.",
    },
    intro: {
      label: "Services",
      title: "Integrated services built around what the project needs.",
      lede: "ORVANN provides five connected service areas. Use one independently or combine several under one project direction.",
    },
    families: [
      {
        id: "strategy",
        title: "Clear decisions start with a clearer view of the business.",
        text: "Strategy & Consulting helps define where a business stands, what it should prioritize and how the next stage of growth or launch should be approached.",
        items: [
          {
            title: "Market Research & Competitive Analysis",
            text: "Research into customers, competitors, categories and market conditions to support better decisions.",
          },
          {
            title: "Growth & Marketing Strategy",
            text: "A practical direction connecting business objectives with audiences, channels, priorities and measurable goals.",
          },
          {
            title: "Brand Positioning",
            text: "Defining who the brand is for, where it fits in the market and how it should be understood against alternatives.",
          },
          {
            title: "Go-to-Market & Launch Planning",
            text: "Planning the sequence, messaging, channels and assets needed to bring a business, brand, service or project to market.",
          },
          {
            title: "Business & Project Advisory",
            text: "Strategic support for businesses that need an outside perspective on opportunities, priorities, marketing direction or project planning.",
          },
        ],
        bestFor:
          "businesses launching, repositioning, entering a new market, reviewing growth opportunities or preparing a larger project.",
        // [proposed] the service's own page
        page: {
          meta: {
            title: "Strategy & Consulting Services in Egypt | ORVANN",
            description:
              "Market research, growth and marketing strategy, brand positioning and launch planning for businesses in Egypt and the region that need a clear next step.",
          },
          title: "Strategy & consulting for a clearer next move.",
          lede: "Before money goes into a brand, a campaign or a website, ORVANN helps you see where the business stands, what to prioritize and how to approach the next stage of growth or launch.",
          audience: [
            "You are launching a business, project or service and need a plan before spending on it.",
            "You are repositioning, or the market no longer sees you the way you want to be seen.",
            "You are entering a new market and need to understand its customers and competitors.",
            "You are preparing a larger project and want an outside view of the priorities and the direction.",
          ],
          process: [
            { title: "Listen and review", text: "We start with the business, the objective, the audience and what already exists: past work, data, materials and constraints." },
            { title: "Research", text: "Customers, competitors and market conditions are studied to the depth the decision needs." },
            { title: "Set the direction", text: "Positioning, priorities, audiences, channels and goals are brought together in one practical plan." },
            { title: "Plan the next step", text: "The plan becomes a sequence of actions, responsibilities and deliverables, ready for the brand, marketing or launch work that follows." },
          ],
          faqs: [
            {
              question: "What do I get from a strategy project?",
              answer:
                "A written direction you can act on: the findings, the positioning, the priorities and a plan for the next stage. The exact deliverables are agreed with you at the start.",
            },
            {
              question: "Can strategy come before branding or marketing?",
              answer:
                "Yes. Many projects start here, so that the identity, website and campaigns that follow are built on the same direction. Strategy can also be commissioned on its own.",
            },
            {
              question: "How long does a strategy project take?",
              answer:
                "It depends on the scope: the research needed, the number of markets and the approvals involved. A realistic schedule is agreed once the deliverables are defined.",
            },
          ],
        },
      },
      {
        id: "branding",
        title: "Build a brand people can recognize across every touchpoint.",
        text: "Branding & Creative translates business strategy into a visual and verbal system that can work consistently across digital and physical channels.",
        items: [
          { title: "Brand Identity", text: "Logo systems, visual language, typography, colour direction and supporting brand elements." },
          { title: "Brand Guidelines", text: "Practical rules that help internal and external teams apply the identity consistently." },
          {
            title: "Creative Direction",
            text: "The visual and conceptual direction behind campaigns, launches, content and brand communication.",
          },
          {
            title: "Campaign Concepts",
            text: "Creative ideas and visual directions developed around a specific campaign objective or audience.",
          },
          {
            title: "Company Profiles & Brand Collateral",
            text: "Profiles, presentations, brochures, sales materials and other business communication assets.",
          },
          { title: "Content Design", text: "Design systems for social media, campaigns and recurring brand communication." },
        ],
        bestFor:
          "new brands, rebrands, businesses with inconsistent communication, launches and brands preparing to scale their content or marketing.",
        // [proposed] the service's own page
        page: {
          meta: {
            title: "Brand Identity & Creative Services in Egypt | ORVANN",
            description:
              "Brand identity, guidelines, creative direction, campaign concepts, company profiles and content design that keep a business consistent wherever people meet it.",
          },
          title: "Branding & creative that people recognize everywhere.",
          lede: "ORVANN translates business strategy into a visual and verbal system, from the identity and its guidelines to the company profile and content design, that stays consistent across digital and physical channels.",
          audience: [
            "You are a new brand and need an identity built for how and where you will communicate.",
            "You are rebranding, or your current identity no longer reflects the business.",
            "Your communication looks different from one channel, or one team, to the next.",
            "You are preparing a launch or scaling your content and marketing, and need a system that holds.",
          ],
          process: [
            { title: "Brief and direction", text: "We agree what the brand must say, to whom and where it will appear, starting from the strategy if there is one." },
            { title: "Concepts", text: "Creative routes are developed and presented with their reasoning, so the choice is made against the brief." },
            { title: "Build the system", text: "The chosen route becomes the full identity: logo system, colour, typography, visual language and supporting elements." },
            { title: "Apply and hand over", text: "The identity is applied to the agreed materials, such as the company profile and social media templates, and documented in brand guidelines." },
          ],
          faqs: [
            {
              question: "What does a brand identity project include?",
              answer:
                "Typically a logo system, colour direction, typography, visual language and supporting brand elements, with guidelines for applying them. The exact list is agreed in the scope.",
            },
            {
              question: "Can you design only a company profile or campaign materials?",
              answer:
                "Yes. Company profiles, presentations, brochures and campaign concepts can be commissioned without a full rebrand.",
            },
            {
              question: "Will we receive brand guidelines?",
              answer:
                "Where they are part of the scope, yes: practical rules that help internal and external teams apply the identity consistently.",
            },
          ],
        },
      },
      {
        id: "marketing",
        title: "Put the right message in front of the right audience and learn from what happens next.",
        text: "Marketing & Media connects planning, content, distribution, paid advertising and performance review.",
        items: [
          {
            title: "Marketing & Campaign Strategy",
            text: "Campaign objectives, audience definition, messaging, channel selection and execution planning.",
          },
          {
            title: "Content Strategy",
            text: "Content pillars, formats, topics and communication directions built around the brand and audience.",
          },
          {
            title: "Social Media Management",
            text: "Planning, content coordination, publishing requirements and performance review across relevant social platforms.",
          },
          {
            title: "Paid Media & Media Buying",
            text: "Paid campaign planning, setup, budget allocation, testing, optimization and reporting across suitable advertising platforms.",
          },
          {
            title: "Creative Coordination",
            text: "Connecting the media plan with the creatives, formats and messages required for each campaign.",
          },
          {
            title: "Influencer & Partnership Campaigns",
            text: "Planning and coordinating suitable collaborations when they support the campaign objective.",
          },
          {
            title: "Reporting & Optimization",
            text: "Using campaign and channel data to understand performance and guide the next decision.",
          },
        ],
        bestFor:
          "businesses seeking awareness, leads, sales, launches, stronger content systems or structured paid acquisition.",
        // [proposed] the service's own page
        page: {
          meta: {
            title: "Marketing, Social Media & Paid Ads in Egypt | ORVANN",
            description:
              "Campaign and content strategy, social media management, paid media buying, influencer campaigns and reporting, planned around your audience and objectives.",
          },
          title: "Marketing & media built around the audience and the objective.",
          lede: "ORVANN connects planning, content, distribution, paid advertising and performance review, so every campaign starts from a defined objective and the next decision is based on what actually happened.",
          audience: [
            "You need awareness, leads or sales, and a plan for the channels and messages that will get you there.",
            "You are launching a product, project or brand and need a campaign around it.",
            "Your social media runs without a content system or a clear objective.",
            "You spend on advertising and want structured planning, testing and reporting.",
          ],
          process: [
            { title: "Objective and audience", text: "We define what the campaign must achieve, who it is for and how success will be measured." },
            { title: "Plan", text: "Messages, content pillars, channels, budget split and timeline are set out in one plan." },
            { title: "Create and launch", text: "Creatives and formats are produced for each channel, then the campaigns are set up and published." },
            { title: "Measure and optimize", text: "Results are reviewed against the objective, and budgets, audiences and creatives are adjusted for the next round." },
          ],
          faqs: [
            {
              question: "Which platforms do you advertise on?",
              answer:
                "Platforms are chosen for each campaign according to its audience and objective, from the social and digital advertising platforms that suit them.",
            },
            {
              question: "Do you provide performance reports?",
              answer:
                "Yes. Reporting and optimization are part of the service: campaign and channel data are reviewed to understand performance and guide the next decision. How often is agreed in the scope.",
            },
            {
              question: "Can you manage our social media every month?",
              answer:
                "Yes, where it is part of the scope: planning, content coordination, publishing requirements and performance review across the relevant platforms.",
            },
          ],
        },
      },
      {
        id: "digital",
        title: "Make it easier for people to understand your business and take the next step.",
        text: "Digital Experiences focuses on how users discover, navigate and interact with your business online.",
        items: [
          {
            title: "Website Strategy",
            text: "Defining the website’s purpose, audiences, content priorities and required user journeys before design begins.",
          },
          {
            title: "Information Architecture",
            text: "Organizing pages and information so users and search engines can understand what the website offers.",
          },
          { title: "UX/UI Design", text: "Designing clear, responsive interfaces around user needs and business objectives." },
          {
            title: "Website & E-commerce Delivery",
            text: "Managing the project from planning and content through design, technical implementation, review and launch according to the agreed scope.",
          },
          {
            title: "SEO & Search Content Structure",
            text: "Building search intent, page hierarchy, metadata, internal linking and content clarity into the website from the beginning.",
          },
          {
            title: "Analytics & Conversion-Focused Optimization",
            text: "Reviewing how people move through the digital experience and identifying opportunities to reduce friction and improve action completion.",
          },
          {
            title: "Ongoing Digital Support",
            text: "Post-launch updates, content improvements and performance reviews can be included according to the project scope.",
          },
        ],
        bestFor:
          "new websites, redesigns, e-commerce projects, landing pages and businesses whose digital presence no longer reflects their brand or objectives.",
        // [proposed] the service's own page
        page: {
          meta: {
            title: "Website Design & Digital Experiences in Egypt | ORVANN",
            description:
              "Website strategy, information architecture, UX/UI design, website and e-commerce delivery, SEO structure and conversion-focused improvement, from planning to launch.",
          },
          title: "Websites and digital experiences that make the next step easy.",
          lede: "ORVANN plans and manages websites, online stores and landing pages around what users need to understand and do: from the site’s purpose and structure to design, delivery, search and launch.",
          audience: [
            "You need a new website, or your current one no longer reflects the brand or the business.",
            "You are opening an online store or building landing pages for a campaign.",
            "Visitors reach your site but do not find what they need or take the next step.",
            "You want the site built for search from the start, not fixed after launch.",
          ],
          process: [
            { title: "Purpose and structure", text: "We define the site’s goals, audiences, user journeys and page hierarchy before any design begins." },
            { title: "Content and design", text: "Content is organized and the interface is designed around the user’s needs, for every screen size." },
            { title: "Build and test", text: "The agreed scope is implemented, then reviewed for content, responsiveness, speed and search basics." },
            { title: "Launch and improve", text: "The site goes live, and where support is in scope, updates and performance reviews guide the next improvements." },
          ],
          faqs: [
            {
              question: "Do you manage website development?",
              answer:
                "ORVANN manages the digital project and agreed deliverables from strategy and UX/UI through implementation coordination, QA and launch. Technical execution is structured according to the requirements of each project.",
            },
            {
              question: "Is SEO included in every website?",
              answer:
                "Search-friendly structure should be considered from the planning stage, but the depth of ongoing SEO work depends on the agreed project scope.",
            },
            {
              question: "Can you build an online store?",
              answer:
                "Yes. Website and e-commerce delivery is managed from planning and content through design, technical implementation, review and launch, according to the agreed scope.",
            },
          ],
        },
      },
      {
        id: "events",
        title: "Take the brand beyond the screen.",
        text: "Events, Outdoor & Production turns brand and campaign direction into physical experiences and materials.",
        items: [
          {
            title: "Events & Exhibitions",
            text: "Planning and coordinating brand presence for conferences, exhibitions, corporate events and launches.",
          },
          {
            title: "Booth & Experience Design",
            text: "Developing the creative and visual requirements for exhibition booths and branded spaces.",
          },
          {
            title: "Brand Activations",
            text: "On-ground experiences designed around a campaign, product, launch or audience interaction.",
          },
          {
            title: "Outdoor Advertising",
            text: "Creative adaptation and production coordination for billboards, LED screens and other outdoor formats.",
          },
          {
            title: "Printing & Production",
            text: "Brochures, company profiles, folders, cards, packaging, banners and other branded printed materials.",
          },
          {
            title: "Signage & Branded Materials",
            text: "Physical brand applications for offices, locations, events and temporary installations.",
          },
          {
            title: "Corporate Gifts",
            text: "Branded gifting and supporting materials developed according to the campaign or corporate requirement.",
          },
          {
            title: "On-Ground Execution",
            text: "Production follow-up, supplier coordination and execution support according to the project scope.",
          },
        ],
        bestFor:
          "exhibitions, launches, campaigns, real estate projects, corporate events and brands requiring coordinated physical production.",
        // [proposed] the service's own page
        page: {
          meta: {
            title: "Events, Exhibitions, Outdoor & Print Production | ORVANN",
            description:
              "Exhibition booths, events, brand activations, billboards and outdoor advertising, printing, signage and corporate gifts, coordinated from design to on-ground execution.",
          },
          title: "Events, outdoor & production that take the brand beyond the screen.",
          lede: "ORVANN turns brand and campaign direction into physical experiences and materials, from exhibitions and activations to billboards, print and signage, and follows production through to execution on the ground.",
          audience: [
            "You are taking part in an exhibition or conference and need a booth and a presence that fit the brand.",
            "You are launching a project or product and want an event or activation around it.",
            "You need outdoor campaigns, such as billboards or LED screens, adapted and produced.",
            "You need printed and branded materials produced to one consistent standard.",
          ],
          process: [
            { title: "Brief and requirements", text: "We confirm the objective, the venue or locations, the dates, the audience and the brand requirements." },
            { title: "Design and plan", text: "Booths, spaces, outdoor formats and printed materials are designed, and production is planned with suppliers." },
            { title: "Produce", text: "Production is followed up with suppliers, and samples and proofs are checked against the approved designs." },
            { title: "Execute on the ground", text: "Installation and execution are supported on site, according to the project scope." },
          ],
          faqs: [
            {
              question: "Do you handle printing and physical production?",
              answer:
                "Yes. Events, Outdoor & Production includes selected print, signage, display, outdoor and branded production requirements based on the project.",
            },
            {
              question: "Can you design and build an exhibition booth?",
              answer:
                "ORVANN develops the creative and visual requirements for exhibition booths and branded spaces, and coordinates their production and execution according to the project scope.",
            },
            {
              question: "Do you produce corporate gifts?",
              answer:
                "Yes. Branded gifts and supporting materials are developed according to the campaign or corporate requirement.",
            },
          ],
        },
      },
    ],
    bestForLabel: "Best suited for:",
    explore: (service) => `Explore ${service}`,
    // [proposed] section names on each service's own page
    servicePage: {
      back: "All services",
      audience: "Who it’s for",
      deliverables: "What you get",
      process: "How it works",
      work: "Related work",
      workIntro: (service) => `Projects that included ${service}.`,
      allWork: "See all projects",
      faq: "Frequently asked questions",
      cta: {
        label: "Have a project in mind?",
        title: (service) => `Start your ${service} project.`,
        text: "Tell us about the business, the objective and the timeline. We’ll help define the right scope before the work begins.",
      },
    },
    together: {
      title: "You do not need all five services to work with ORVANN.",
      paragraphs: [
        "A client may need only a website, campaign, identity or event.",
        "But when several services are required, they can be managed under the same strategic and creative direction.",
      ],
      exampleLabel: "For example:",
      sequence: ["strategy", "branding", "digital", "marketing", "events"],
      closing: "The sequence changes according to the project.",
    },
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "What services does ORVANN provide?",
        answer:
          "ORVANN provides Strategy & Consulting, Branding & Creative, Marketing & Media, Digital Experiences, and Events, Outdoor & Production.",
      },
      {
        question: "Can ORVANN manage a full brand launch?",
        answer:
          "Yes, when the project requires it. A launch may combine strategy, identity, website, content, campaigns, print, outdoor and event execution under one project plan.",
      },
      {
        question: "Can I request only branding or media buying?",
        answer: "Yes. Services can be commissioned independently without purchasing an integrated package.",
      },
    ],
  },

  // [copy]; the form's status messages and its CRM lists (job title, region, city, timeline
  // and budget choices) are [proposed]
  contact: {
    meta: {
      title: "Contact ORVANN | Start a Strategy, Marketing or Brand Project",
      description:
        "Contact ORVANN to discuss strategy, branding, marketing, websites, events, outdoor or production projects in Egypt and the region.",
    },
    intro: {
      label: "Contact ORVANN",
      title: "Tell us what you’re building.",
      lede: "Whether you have a defined brief or only know the business problem you need to solve, start by telling us where you are and what you need next.",
      body: ["We’ll help identify the right scope before the work begins."],
    },
    form: {
      title: "Start with the essentials.",
      name: "Name",
      jobTitle: "Job Title",
      jobTitles: {
        owner: "Business Owner / Founder",
        ceo: "CEO / General Manager",
        "marketing-head": "Marketing Manager",
        manager: "Department Manager",
        employee: "Employee / Specialist",
        freelancer: "Freelancer",
        student: "Student",
        other: "Other",
      },
      company: "Company",
      email: "Work Email",
      phone: "Phone / WhatsApp",
      region: "Governorate / Country",
      zones: {
        "greater-cairo": "Greater Cairo",
        "alexandria-coast": "Alexandria & the North Coast",
        delta: "Delta",
        "canal-sinai": "Canal & Sinai",
        "north-upper-egypt": "North Upper Egypt",
        "south-upper-egypt": "South Upper Egypt",
        "red-sea-new-valley": "Red Sea & New Valley",
        gulf: "Gulf",
        "other-countries": "Other Countries",
      },
      regions: {
        cairo: "Cairo",
        giza: "Giza",
        qalyubia: "Qalyubia",
        alexandria: "Alexandria",
        beheira: "Beheira",
        matrouh: "Matrouh",
        sharqia: "Sharqia",
        dakahlia: "Dakahlia",
        gharbia: "Gharbia",
        monufia: "Monufia",
        "kafr-el-sheikh": "Kafr El Sheikh",
        damietta: "Damietta",
        "port-said": "Port Said",
        ismailia: "Ismailia",
        suez: "Suez",
        "north-sinai": "North Sinai",
        "south-sinai": "South Sinai",
        fayoum: "Fayoum",
        "beni-suef": "Beni Suef",
        minya: "Minya",
        assiut: "Assiut",
        sohag: "Sohag",
        qena: "Qena",
        luxor: "Luxor",
        aswan: "Aswan",
        "red-sea": "Red Sea",
        "new-valley": "New Valley",
        saudi: "Saudi Arabia",
        uae: "United Arab Emirates",
        kuwait: "Kuwait",
        qatar: "Qatar",
        bahrain: "Bahrain",
        oman: "Oman",
        "other-country": "Another Country",
      },
      city: "City / Area",
      need: "What do you need?",
      multiple: "Multiple Services",
      unsure: "Not Sure Yet",
      goal: "What are you trying to achieve?",
      goalHint: "Short project description.",
      start: "When do you need to start?",
      timelines: {
        asap: "Immediately",
        month: "Within a Month",
        quarter: "Within 3 Months",
        exploring: "Just Exploring",
      },
      budget: "Estimated Budget Range",
      budgets: {
        "lt-10k": "Under EGP 10,000",
        "10k-50k": "EGP 10,000 – 50,000",
        "50k-200k": "EGP 50,000 – 200,000",
        "gt-200k": "Over EGP 200,000",
        unknown: "Not Decided Yet",
      },
      select: "Select…",
      optional: "Optional.",
      submit: "Send Project Details",
      sending: "Sending…",
      sent: "Thank you. Your project details have been sent, and we’ll be in touch soon.",
      failed: "Your details could not be sent. Please try again, or email info@orvann.com.",
    },
    direct: {
      title: "Prefer to talk directly?",
      email: "Email",
      phone: "Phone / WhatsApp",
      headquarters: "Headquarters",
      address: "Al-Haram St., Giza, Egypt",
    },
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "What should I send when contacting ORVANN?",
        answer:
          "Share your business name, what you are trying to achieve, the service you think you need and any relevant timeline or existing materials.",
      },
      {
        question: "What if I do not know which service I need?",
        answer: "That is fine. Tell us the business problem or objective and we can help define the relevant scope.",
      },
      {
        question: "Can ORVANN handle several parts of one project?",
        answer:
          "Yes. Projects can combine Strategy & Consulting, Branding & Creative, Marketing & Media, Digital Experiences, and Events, Outdoor & Production.",
      },
      {
        question: "Do you work with startups?",
        answer:
          "Yes. The scope depends on what the startup already has and what it needs next, such as research, positioning, identity, launch planning, website or marketing.",
      },
      {
        question: "What is the project timeline?",
        answer:
          "Timing depends on the agreed scope, approval cycles and production requirements. A realistic schedule should be confirmed once the deliverables are defined.",
      },
      {
        question: "How is pricing calculated?",
        answer:
          "Pricing depends on the project scope, required resources, deliverables, timeline and production requirements. A quotation is prepared after the project requirements are clear.",
      },
    ],
  },

  // [copy]
  work: {
    meta: {
      title: "ORVANN Work | Branding, Marketing, Websites & Events",
      description:
        "Explore selected ORVANN projects across branding, strategy, marketing, websites, paid campaigns, events, outdoor and production.",
    },
    intro: {
      label: "Our Work",
      title: "Work across brand, marketing, digital and on-ground execution.",
      lede: "Every project starts from a different point.",
      body: [
        "Some clients come to ORVANN for one specific need. Others require several services to work together under one direction.",
        "Explore selected projects and the scope delivered for each one.",
      ],
    },
    filterLabel: "Filter projects",
    all: "All",
    countLabel: (count) => `${count} ${count === 1 ? "project" : "projects"}`,
    empty: "No projects in this category yet.",
  },

  // [copy] section names from the case study template
  caseStudy: {
    back: "All projects",
    services: "Services",
    // [proposed] challenge → role → execution → outcome (24 Oct 2026)
    challenge: "The Challenge",
    role: "ORVANN’s Role",
    execution: "Execution",
    outcome: "Outcome",
    gallery: "From the Work",
    metaTitle: (project) => `${project} Case Study`,
    next: "Next project",
    visitWebsite: "Visit website",
  },

  // [proposed] Careers & Internships. The lists (education, experience, availability,
  // interest and work arrangement) are the CRM's ('applications' in its app/config.php).
  careers: {
    meta: {
      title: "Careers & Internships at ORVANN | Join Our Team",
      description:
        "Apply for job opportunities and internships at ORVANN across strategy, branding, marketing, digital and production. Share your CV and portfolio with our team.",
    },
    label: "Careers & Internships",
    form: {
      title: "Apply to join ORVANN.",
      lede: "Fields marked * are required. All information is handled confidentially and used for recruitment purposes only.",
      groups: {
        personal: "Personal Information",
        background: "Education & Experience",
        preferences: "Opportunity & Availability",
        documents: "CV, Portfolio & Profiles",
      },
      name: "Full Name",
      phone: "Mobile Number",
      email: "Email Address",
      region: "Place of Residence",
      city: "City / Area",
      education: "Academic Status",
      educations: { student: "Current Student", graduate: "Graduate" },
      graduationYear: "Graduation Year",
      graduationYearHint: "Your expected year, if you are still studying.",
      specialization: "Field of Study / Specialization",
      specializationHint: "For example: Marketing, Graphic Design, Computer Science.",
      experience: "Years of Experience",
      experiences: {
        none: "No Experience Yet",
        "lt-1": "Less than 1 Year",
        "1-3": "1–3 Years",
        "3-5": "3–5 Years",
        "5-plus": "More than 5 Years",
      },
      employment: "Current Employment Status",
      employments: {
        available: "Available Full-Time",
        employed: "Currently Employed Elsewhere",
        freelance: "Working Freelance",
      },
      interest: "Interested In",
      interests: { job: "Job Opportunity", internship: "Internship" },
      arrangements: "Preferred Work Arrangement",
      arrangementsHint: "Select all that apply.",
      arrangementOptions: {
        "full-time": "Full-Time",
        "part-time": "Part-Time",
        "on-site": "On-Site",
        remote: "Remote",
      },
      cv: "CV / Résumé",
      cvHint: "PDF, DOC or DOCX, up to 5 MB.",
      portfolioUrl: "Portfolio Link",
      portfolioFile: "Portfolio File",
      portfolioHint: "A link, a PDF up to 10 MB, or both. Recommended for creative and digital roles.",
      linkedin: "LinkedIn Profile",
      chooseFile: "Choose File",
      noFile: "No file chosen",
      fileTooLarge: "This file is larger than {mb} MB. Please upload a smaller file.",
      fileType: "This file type is not accepted. Please upload one of the formats listed.",
      arrangementsRequired: "Please select at least one work arrangement.",
      select: "Select…",
      optional: "Optional.",
      consent: {
        before: "By submitting this form, you agree that ORVANN may store and process your application for recruitment purposes, as described in our ",
        link: "Privacy Policy",
        after: ".",
      },
      submit: "Submit Application",
      sending: "Submitting…",
      sent: "Thank you. Your application has been received. Our team will review it and contact you if your profile matches a current or upcoming opportunity.",
      failed: "Your application could not be submitted. Please try again, or email your CV to info@orvann.com.",
    },
  },

  // orvann.com/privacy-policy/ [site] — legal text restated, not rewritten. Confirm with counsel.
  privacy: {
    meta: {
      title: "Privacy Policy | ORVANN",
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
          "Personal identifiers, such as your name, email address, phone number and address, when you submit inquiries or sign up for services.",
          "Usage data: details of your interactions with our website and social media pages, including pages visited, clicks and other interaction data.",
          "Device information: information about the devices you use to access our website, including IP address, browser type and operating system.",
          "Social media data: when you interact with us on social media platforms, we may collect publicly available information based on your privacy settings.",
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
          "Service providers: third parties who help us operate our website and conduct our business (for example email marketing, analytics and advertising).",
          "Social media platforms: we may use social media advertising and analytics tools (for example Snapchat Ads Manager and Instagram Insights) to display ads and track performance.",
          "Legal obligations: we may disclose your information if required by law or to respond to legal requests from authorities.",
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
      meta: { title: "Company Profile | ORVANN", description: "The ORVANN company profile, as a flipbook." },
      intro: { label: "Publication", title: "Company profile", lede: "Who we are and what we do, in one document." },
      flipbookUrl: "https://heyzine.com/flip-book/729a5ed198.html",
      frameTitle: "ORVANN Company Profile (flipbook)",
    },
    {
      slug: "summer-giveaway",
      meta: { title: "Summer Giveaway | ORVANN", description: "The ORVANN summer giveaway, as a flipbook." },
      intro: { label: "Publication", title: "Summer giveaway", lede: "Our summer giveaway collection." },
      flipbookUrl: "https://heyzine.com/flip-book/b7caeca1ee.html",
      frameTitle: "ORVANN summer giveaway (flipbook)",
    },
    {
      slug: "vip-gifts",
      meta: { title: "VIP Gifts | ORVANN", description: "The ORVANN VIP gifts collection, as a flipbook." },
      intro: { label: "Publication", title: "VIP gifts", lede: "Corporate and VIP gift ideas from ORVANN." },
      flipbookUrl: "https://heyzine.com/flip-book/a3b8db03b0.html",
      frameTitle: "ORVANN gifts (flipbook)",
    },
  ],

  // [copy] the homepage's final call to action closes every page
  cta: {
    label: "Have a project in mind?",
    title: "Tell us what you’re building.",
    text: "Share the business, the objective and what you need delivered. We’ll help define the right scope before the work begins.",
    primary: { label: "Start a Project", href: "/contact-us/#project-form" },
    secondary: { label: "Talk to Us", href: "/contact-us/#direct-contact" },
  },
};
