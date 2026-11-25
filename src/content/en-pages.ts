import type { SiteContent } from "./types";

/**
 * Inner pages. About, Integrated Solutions (and each solution's page), Contact and the
 * privacy policy are [translation]s of ORVANN's Arabic copy of 25 Nov 2026 ("Website ORVANN
 * Content"), awaiting sign-off. Elsewhere, [copy] = the site copy supplied by ORVANN
 * (3 Oct 2026); [site] = restated from the matching orvann.com page (inspected 22–23 Sep
 * 2026), grammar lightly tidied; [proposed] = new wording that needs sign-off.
 */
export const enPages: SiteContent["pages"] = {
  // [translation] of ORVANN's Arabic copy (25 Nov 2026), from here to the privacy policy —
  // needs ORVANN sign-off.
  about: {
    meta: {
      title: "About ORVANN | Business Strategy & Development",
      description:
        "ORVANN is a business strategy and development company offering integrated solutions that combine consulting expertise with commercial, creative and digital capabilities.",
    },
    intro: {
      label: "About ORVANN",
      title: "We see your business from a wider perspective.",
      lede: "Every business holds opportunities for growth, but finding them and making the most of them takes more than expertise in a single field.",
      body: [
        "ORVANN is a company specialised in business strategy and development. We offer integrated solutions that combine consulting expertise with commercial, creative and digital capabilities, helping companies meet their challenges and seize their opportunities.",
        "We believe your success does not rest on separate solutions, but on how well they work together and with your goals. That is why we offer a partnership that pairs strategic thinking with practical solutions, and keeps pace with your business at every stage.",
      ],
    },
    approach: {
      title: "We start where you are, and look ahead to where you want to be.",
      paragraphs: [
        "We don’t assume that what suits another company is necessarily right for you.",
        "We start by listening to you, studying your business and your market, and understanding what sets your business apart and what holds it back. Then we connect challenges with opportunities to set priorities with you and choose the solutions worth investing in.",
        "You may need to develop one specific area, or a set of connected solutions. Either way, we start from what you actually need, not from a list of services we want to sell.",
      ],
    },
    value: {
      title: "Worth more than the sum of the services.",
      paragraphs: [
        "The challenge you face may look like a marketing one, while its solution lies in the customer experience, in technology, or in commercial opportunities not yet taken up.",
      ],
      highlight: "This is where ORVANN adds value.",
      after: [
        "We look at how the different parts of your business relate, and bring together the right disciplines to deliver solutions that complement one another, instead of treating each challenge in isolation.",
        "And our role doesn’t end with a recommendation: we help you put the agreed solutions into practice and follow their progress, giving you a partnership that combines a clear vision with the ability to act.",
      ],
      cta: { label: "Discover our integrated solutions", href: "/services/" },
    },
    expertise: {
      title: "Different expertise, one goal: your growth.",
      paragraphs: [
        "Behind every solution we offer is specialised expertise in business development, project management, marketing, technology, and commercial and creative services.",
        "What sets our way of working apart is not only the range of this expertise, but our ability to bring it together to serve your needs, giving you an integrated perspective when making decisions and delivering projects.",
        "As your business evolves, so does the support we give you, so that in ORVANN you find a partner who understands what you have achieved and helps you prepare for what comes next.",
      ],
    },
    vision: {
      title: "Our Vision",
      text: "For ORVANN to become a leading model of strategic partnership in business growth, where expertise and solutions come together in a comprehensive vision that opens new horizons for success, and for our impact to reach from the Arab world to global markets, as a trusted partner in our clients’ growth journey.",
    },
    mission: {
      title: "Our Mission",
      text: "To help you make better decisions and pursue your business opportunities with confidence, by understanding your needs, developing innovative, integrated solutions that fit your goals, and supporting you in turning them into practical steps that drive your success today and keep pace with your ambitions tomorrow.",
    },
    commitments: {
      title: "Our Commitment to You",
      items: [
        {
          title: "Your interest guides our advice.",
          text: "We recommend what adds real value to your business, even when the best solution is simpler than the options on offer.",
        },
        {
          title: "Clarity from the start.",
          text: "We agree with you on the scope of our work together, the responsibilities and the expected deliverables, so you know what we will deliver and how we will work together.",
        },
        {
          title: "Quality in every detail.",
          text: "We care about how well our solutions fit and how well they are delivered, because small details can make a big difference to the end result.",
        },
        {
          title: "A partnership that grows with you.",
          text: "We stay close to your needs, listen to your feedback and adapt to change, so the value of our work together lasts as your business grows.",
        },
      ],
    },
    closing: {
      title: "Every stage of your business brings a new opportunity.",
      text: "Whether you are starting a project, developing an existing business or exploring a new market, at ORVANN you will find someone who looks at your ambitions with a comprehensive vision and helps you choose the best path to achieve them.",
      emphasis: "Let’s talk about your business, and discover together what we can build in its next stage.",
      primary: { label: "Let’s talk about your business", href: "/contact-us/#project-form" },
    },
  },

  services: {
    meta: {
      title: "ORVANN Integrated Solutions | Different Expertise, Working Together",
      description:
        "Nine integrated solutions from ORVANN: business strategy, project management, marketing, digital solutions, commercial brokerage, supply, e-commerce, events and bespoke craftsmanship.",
    },
    intro: {
      label: "Integrated Solutions",
      title: "Different expertise, working together for your business.",
      lede: "Every business has its own challenges and opportunities, and every stage its own requirements. At ORVANN, we look at your goals with a comprehensive vision to help you discover what your business needs and choose the solutions that fit it best.",
      body: [
        "Whether you need one specialised service or a set of connected solutions, we bring together the right expertise and work with you to turn it into practical steps that support your growth.",
      ],
    },
    explore: { label: "Explore our solutions", href: "#solutions" },
    discuss: { label: "Discuss your need", href: "/contact-us/#project-form" },
    together: {
      title: "When solutions work together, opportunities grow.",
      paragraphs: [
        "Your journey with us may begin with a single challenge, and then we discover together that reaching your goal takes more than one discipline.",
        "When launching a new project, for example, business strategy may come together with brand identity, digital solutions and marketing, all working in one direction instead of as separate efforts.",
      ],
      closing:
        "At ORVANN, we don’t combine services just because we offer many, but because bringing them together may be the best solution for your business.",
    },
    listTitle: "Explore our solutions",
    exploreService: "Explore the service",
    servicePage: {
      back: "All solutions",
      start: "Book your free discovery session",
      viewCase: "View the case study",
    },
    families: [
      {
        id: "strategy",
        tagline: "We discover growth opportunities and help you make the most of them.",
        text: "We study your business, your market and the challenges you face, to help you assess opportunities, develop strategies and choose the directions that strengthen your ability to compete and expand.",
        page: {
          meta: {
            title: "Business Strategy & Development | ORVANN",
            description:
              "Business set-up and development, market entry and expansion strategies, new services and commercial opportunities, and strategic positioning with ORVANN.",
          },
          title: "Every ambition has an opportunity, and every growth a strategy.",
          paragraphs: [
            "Whether you are founding a new venture, looking to develop your business or preparing to enter new markets, the right strategic decisions make the difference in your journey.",
            "At ORVANN, we look at your business from a comprehensive perspective, helping you discover opportunities, set the right direction, and develop solutions that work with your goals and ambitions.",
          ],
          offerings: {
            title: "How do we support your growth?",
            items: [
              {
                title: "Business set-up and development",
                text: "We help you build your venture’s strategic direction and develop your business in ways that strengthen its position and its capacity to grow.",
              },
              {
                title: "Market entry and expansion strategies",
                text: "We study opportunities to enter local and international markets, and develop strategies that suit your business and your expansion goals.",
              },
              {
                title: "New services and commercial opportunities",
                text: "We help you explore new opportunities, develop your services and strengthen your ability to compete.",
              },
              {
                title: "Strategic business positioning",
                text: "We define your business’s place in the market and strengthen what sets it apart, supporting its presence and competitiveness.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "Tucano Aircraft",
              title: "From launching in a specialised market to an international presence.",
              paragraphs: [
                "Our partnership with Tucano embodies ORVANN’s idea of a long-term strategic partnership.",
                "Our role began with the market entry strategy and the presentation of the company’s specialised services, alongside developing its name, brand and competitive position. Our responsibilities then extended to commercial expansion and international market entry strategies.",
                "As Tucano grew and its business evolved, our partnership continued: developing its global marketing presence, unifying its identity and communications, and supporting its participation in international exhibitions.",
              ],
              projects: ["tucano-2"],
              tags: ["Brand identity", "Marketing materials", "Digital presence", "International exhibitions"],
            },
          ],
          cta: {
            title: "What’s the next step in your business’s growth?",
            text: "You may be facing a new opportunity, a challenge that needs a different perspective, or an ambition whose best path is not yet clear.",
            emphasis: "Let’s talk about your business and discover together the opportunities worth pursuing.",
          },
        },
      },
      {
        id: "projects",
        tagline: "From an idea to a complete project.",
        text: "We help you turn your vision into a workable project: from developing the concept and defining its requirements to coordinating the right solutions and following each phase through to the agreed deliverables.",
        page: {
          meta: {
            title: "Project Management & Launch | ORVANN",
            description:
              "Project launch management, turnarounds and course correction, integrated delivery and transition management with ORVANN.",
          },
          title: "When timing is critical, you need a partner who sees the whole picture.",
          paragraphs: [
            "Launching a new project or redirecting an existing one takes more than completing a list of tasks: it takes a vision that brings every part of the project together in one direction.",
            "At ORVANN, we help you turn your project’s goals into reality by managing the launch phases, coordinating the right solutions and expertise, and dealing with the challenges that can stand in the way of delivery.",
          ],
          offerings: {
            title: "How do we support your project?",
            items: [
              {
                title: "Project launch management",
                text: "We help you get your project ready to launch, bringing its commercial, marketing, creative and digital requirements together in one integrated vision.",
              },
              {
                title: "Project turnarounds and course correction",
                text: "We step in when your project faces challenges that hold back its progress, reviewing where things stand and helping you close the gaps and get back on course.",
              },
              {
                title: "Integrated delivery management",
                text: "We bring together the disciplines and services your project needs, and follow the work through so that all its outputs stay consistent.",
              },
              {
                title: "Transition management",
                text: "We manage a specific phase of your project and help you move on to the next, handing the work over to your team once our scope is complete.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "Roshan Masr",
              title: "Three months to redirect the launch and open INTRO MALL.",
              facts: [
                { label: "Sector", value: "Real estate development" },
                { label: "ORVANN’s management", value: "3 months" },
                { label: "Project", value: "INTRO MALL: commercial | administrative | medical" },
              ],
              paragraphs: [
                "ORVANN managed the launch phase for Roshan Masr and its first project, INTRO MALL, at a critical moment that called for dealing with existing challenges and correcting several parts of the project while preparing for launch.",
                "Over three months, we developed the visual identity while keeping the approved logo, prepared the website, social media channels and marketing materials, and managed the marketing and advertising campaigns, including billboards on major routes in Egypt.",
                "Our role extended to organising the INTRO MALL launch event and unifying the project’s marketing presence, before completing the handover to Roshan Masr’s in-house team at the end of the agreed launch phase.",
              ],
              closing:
                "Three months of integrated management that combined correcting course, preparing the project for launch and handing it over for its next stage.",
              projects: ["roshan-masr", "intro"],
              tags: ["Visual identity", "Website", "Marketing materials", "Outdoor campaigns", "Launch event"],
            },
          ],
          cta: {
            title: "Your project doesn’t always need a new beginning, just the right next step.",
            text: "Whether you are preparing to launch a new project or facing challenges in an existing one, we can help you assess what this stage needs and identify the right solutions for it.",
          },
        },
      },
      {
        id: "marketing",
        tagline: "We connect your brand with the right opportunities in the market.",
        text: "We understand your audience, your competitors and what sets your business apart, then develop the strategies, campaigns, content and creative solutions that strengthen your presence and help you reach your target customers.",
        page: {
          meta: {
            title: "Marketing & Advertising Management | ORVANN",
            description:
              "Marketing strategy and brand development, digital presence, advertising campaigns, creative and marketing production, and integrated marketing management with ORVANN.",
          },
          title: "Your brand deserves more than just being seen.",
          paragraphs: [
            "Successful marketing doesn’t start with an advertising campaign. It starts with understanding your business and the market you compete in, and building a presence that reflects your brand’s value and strengthens its standing with its audience.",
            "At ORVANN, we combine strategic thinking, creativity and execution to offer integrated marketing solutions that connect your business goals with your identity, your messages and your channels, across digital platforms and traditional media.",
          ],
          offerings: {
            title: "How do we strengthen your presence?",
            items: [
              {
                title: "Marketing strategy and brand development",
                text: "We help you set your marketing direction and develop your brand’s positioning and messages so they reflect its identity and set it apart in the market.",
              },
              {
                title: "Building and developing your digital presence",
                text: "We set up and develop your social media and digital channels, and unify your brand’s presence across every point of contact with your audience.",
              },
              {
                title: "Advertising campaigns and digital marketing",
                text: "We plan campaigns, develop their content and run them on the right channels, serving your marketing goals and extending your reach to your target audience.",
              },
              {
                title: "Creative and marketing production",
                text: "We deliver design, content and promotional materials, from visual identity, catalogues and print to outdoor advertising and creative production.",
              },
              {
                title: "Integrated marketing management",
                text: "We help you keep your digital and on-the-ground marketing consistent, while continuing to develop your brand’s presence as your business grows.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "Eagles Developments",
              title: "Six months to resolve the issues and rebuild the marketing presence, and an ongoing partnership for growth.",
              facts: [
                { label: "Sector", value: "Real estate development" },
                { label: "Rebuilding phase", value: "6 months" },
                { label: "Partnership", value: "An ongoing strategic and marketing partnership" },
              ],
              paragraphs: [
                "ORVANN began working with Eagles Developments at a stage that called for reorganising the company’s marketing and digital presence, developing the foundations of its brand and strengthening its direct visibility in the real estate market.",
                "Over six months, we dealt with the existing challenges, rebuilt the digital channels and developed the company’s marketing system, including its social media, website, identity, promotional materials and marketing campaigns.",
                "As the partnership continued, we kept pace with Eagles Developments’ projects, from VIA, through the launches of RIZA 1 and RIZA 2, to the ongoing work on VIA 2.",
                "Our services extended to outdoor campaigns, billboards, catalogues, brochures and events, giving the brand an integrated, consistent presence across every channel.",
              ],
              closing:
                "From rebuilding its marketing presence to keeping pace with its growing projects, ORVANN remains a strategic partner in Eagles Developments’ growth.",
              projects: ["eagles-real-estate-development"],
              galleryLabel: "From our work",
              tags: ["Brand development", "Digital platforms", "Websites", "Advertising campaigns", "Billboards", "Print", "Events"],
            },
          ],
          cta: {
            title: "What does your brand need to reach the standing it deserves?",
            text: "You may have an outstanding product or a promising project, but your presence in the market doesn’t yet reflect its full potential.",
            emphasis: "Let’s talk about your business and see how our marketing solutions can work together to strengthen your presence and achieve your goals.",
          },
        },
      },
      {
        id: "digital",
        tagline: "Technical solutions that start from your business needs.",
        text: "We design and develop websites, apps, software and digital systems suited to your business, improving the user experience, your services and how efficiently you work.",
        page: {
          meta: {
            title: "Software Development & Digital Solutions | ORVANN",
            description:
              "Website design and development, custom systems and software, connecting systems and branches, online stores, and improving existing digital solutions with ORVANN.",
          },
          title: "The technology your business needs, not just off-the-shelf solutions.",
          paragraphs: [
            "Your business may face a challenge in managing information, connecting operations, or serving customers more efficiently. And the answer isn’t always a new website or app, but choosing the technology that addresses what you actually need.",
            "At ORVANN, we develop digital solutions suited to your business, combining commercial understanding with technical expertise, to help you overcome challenges and improve your customers’ experience.",
          ],
          offerings: {
            title: "How do we take your business digital?",
            items: [
              {
                title: "Website design and development",
                text: "We design and develop websites that reflect your business’s identity and present your services and projects professionally, with care for the user experience and easy access to information.",
              },
              {
                title: "Custom systems and software",
                text: "We develop custom systems that address business challenges, connecting data and operations to suit each business’s requirements.",
              },
              {
                title: "Connecting systems and branches",
                text: "We help you integrate systems and information across branches and sales channels, reducing scattered data and making operations easier to follow.",
              },
              {
                title: "Online stores and sales solutions",
                text: "We develop e-commerce websites and connect them to the related systems, for a more organised, integrated buying experience.",
              },
              {
                title: "Improving existing digital solutions",
                text: "You don’t always need to start from scratch: the answer may lie in fixing technical problems and developing your current systems to fit your needs.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "Al Nour Optical",
              title: "When technology becomes the answer to a business challenge.",
              paragraphs: [
                "In optical retail, ORVANN developed an integrated digital solution for Al Nour Optical to address the challenges of linking stock to sales and coordinating work across three stores.",
                "The project included a system that connects the stores and their operations, alongside an e-commerce website, bringing operational needs and sales channels together in one connected digital system.",
              ],
              closing: "Software designed to meet a real business need, not just to add new technical tools.",
              projects: ["al-nour-optics"],
            },
          ],
          sectors: {
            title: "Digital experience across different sectors",
            groups: [
              {
                title: "Real estate development",
                text: "Websites for real estate companies and projects, including:",
                names: "Eagles Developments | Plaza Garden | WEST | Roshen Egypt | RGC",
              },
              {
                title: "Legal services",
                text: "The website of lawyer Sami Al-Salmi, suited to the nature of his professional practice.",
              },
              {
                title: "Trade and technology",
                text: "The website of Al Marefa Tech, alongside the digital solutions and sales systems we have delivered in retail.",
              },
              {
                title: "International conferences and events",
                text: "Contributing digital solutions and solving technical challenges for the marketing team’s work at the Egypt International Airshow in El Alamein.",
              },
            ],
            galleryLabel: "From our work",
            tags: ["Company websites", "Real estate websites", "Custom systems", "Online stores", "Digital solutions for events"],
          },
          cta: {
            title: "Facing a challenge technology could solve?",
            text: "The problem may be a system that doesn’t meet your needs, data that doesn’t connect, or a digital experience that doesn’t reflect your business’s potential.",
            emphasis: "Tell us about the challenge, and let’s explore together the digital solution that suits it best.",
          },
        },
      },
      {
        id: "representation",
        tagline: "We open new horizons for business relationships and opportunities.",
        text: "We help you reach markets and potential partners, promote your products and services, and ease communication and negotiation between the parties involved, supporting opportunities to collaborate and expand.",
        page: {
          meta: {
            title: "Business Representation & Commercial Brokerage | ORVANN",
            description:
              "Commercial representation, business relationships and partnerships, brokerage, sales management support and start-up representation with ORVANN.",
          },
          title: "Your business opportunities don’t stop at your company’s walls.",
          paragraphs: [
            "You may have a promising venture or outstanding services, but reaching the right partners and building effective business relationships takes experience, an understanding of the market and the ability to represent your interests professionally.",
            "At ORVANN, we help you widen your business network, explore opportunities to collaborate, and represent your business to the parties concerned, in a way that suits your business and your goals.",
          ],
          offerings: {
            title: "How do we represent your business interests?",
            items: [
              {
                title: "Commercial representation",
                text: "We represent your company in communication and coordination with organisations, companies and commercial parties, within the agreed scope of work and authority.",
              },
              {
                title: "Business relationships and partnerships",
                text: "We help you explore opportunities to collaborate and build professional relationships with potential partners, supporting your expansion.",
              },
              {
                title: "Brokerage and commercial opportunities",
                text: "We help connect commercial parties, ease communication and negotiation, and open the way to suitable opportunities to work together.",
              },
              {
                title: "Sales management support",
                text: "We help you develop and organise your sales activity, providing the oversight and advice needed to make it more effective, without taking on the permanent internal management of your company.",
              },
              {
                title: "Start-up representation",
                text: "We support companies and ventures as they launch, representing their commercial interests and developing their relationships with outside parties, helping them build a credible professional presence.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "WEST Development",
              title: "When a start-up chooses a partner to represent its business.",
              facts: [
                { label: "Sector", value: "Real estate development" },
                { label: "Partnership", value: "Commercial representation, sales management support and business development" },
              ],
              paragraphs: [
                "WEST Development chose ORVANN as a partner as it established its presence and developed its business, entrusting the ORVANN team with representing it and handling commercial communication with companies and outside parties.",
                "Our work together covers supporting its business relationships, helping manage sales and coordinate the related activities, and giving advice that helps the company develop its presence and respond to market opportunities.",
              ],
              closing:
                "A partnership built on trust, giving a start-up the representation and commercial expertise its business needs without having to build all of it in-house from day one.",
              galleryLabel: "From our work",
              tags: ["Corporate identity", "Company materials", "Commercial presence", "Business development activities"],
            },
          ],
          cta: {
            title: "Your commercial presence starts with who represents you.",
            text: "Whether you are founding a new company, looking for partners or wanting to develop your business relationships, ORVANN can help you reach the right opportunities and represent your business professionally.",
          },
        },
      },
      {
        id: "supply",
        tagline: "We connect your needs with the right sources.",
        text: "We help you define your supply requirements, explore suppliers and markets, compare the options, and coordinate purchasing and supply to match your business needs.",
        page: {
          meta: {
            title: "Import, Export & Supply Solutions | ORVANN",
            description:
              "Supplies for companies and projects, product and supplier sourcing, made-to-order products, manufacturing and after-delivery follow-up with ORVANN.",
          },
          title: "What you’re looking for, we may make especially for you.",
          paragraphs: [
            "Not every business need can be found on the market, and not every ready-made product can deliver what you have in mind.",
            "At ORVANN, we help you get the products and supplies that suit your business, whether by finding sources of supply or by developing custom solutions that bring together the idea, the design, the manufacturing and the supply.",
          ],
          highlight: "Our aim is that your choices aren’t limited to what’s available, but that we help you reach what fits your vision.",
          offerings: {
            title: "How do we meet your business needs?",
            items: [
              {
                title: "Supplies for companies and projects",
                text: "We provide the products and supplies your business needs, to suit the project and the required specifications.",
              },
              {
                title: "Product and supplier sourcing",
                text: "We help you explore the options and local and international sources of supply, to find solutions that fit your needs.",
              },
              {
                title: "Made-to-order products",
                text: "We help you turn your own ideas and requirements into custom products that combine design, function and the identity you want to express.",
              },
              {
                title: "Manufacturing and finishing",
                text: "We coordinate how products are made, manufactured and finished, with care for the details and the quality of the result.",
              },
              {
                title: "Supply and after-delivery follow-up",
                text: "We follow supply and delivery through, and stay in touch with the client’s needs for the products after delivery.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              title: "Custom supply solutions for aviation and international events",
              facts: [
                { label: "Sector", value: "Aviation and international exhibitions" },
                { label: "Scope", value: "Developing ideas, manufacturing, supply and after-delivery follow-up." },
              ],
              paragraphs: [
                "ORVANN provided marketing materials and products for the Egypt International Airshow in El Alamein, alongside custom supplies for companies and projects in different sectors.",
                "This work reflects our experience with varied requirements, turning ideas into real products, from developing the right concept to manufacturing, finishing and supply.",
              ],
              closing:
                "Experience that combines creativity, a search for solutions and the ability to deliver requirements that go beyond the standard products on the market.",
              galleryLabel: "From our work",
              tags: ["Custom marketing products", "Exhibition and event materials", "Made to order", "Corporate supplies"],
            },
          ],
          cta: {
            title: "Have a different idea? Let’s talk about making it.",
            text: "You may be looking for a product with special specifications, need supplies for your project, or want to make an idea that has no ready-made solution.",
            emphasis: "Share what you have in mind, and let’s explore together how it can become a product that fits your needs.",
          },
        },
      },
      {
        id: "ecommerce",
        tagline: "We turn digital opportunities into an integrated sales experience.",
        text: "We help you develop your online sales channels, improve how products are shown and how people shop, and connect the buying steps and related services for a smoother experience for your customers.",
        page: {
          meta: {
            title: "E-Commerce Solutions | ORVANN",
            description:
              "Building and developing online stores, organising and presenting products, improving the shopping experience, and connecting your store to your operations and marketing with ORVANN.",
          },
          title: "Your products deserve to reach more customers.",
          paragraphs: [
            "Being online is no longer just a way to show products, but an opportunity to grow your business and offer an easier, more professional buying experience.",
            "At ORVANN, we help you build and develop your commercial presence online, from presenting your products and organising your online store to improving the shopping experience and connecting it with your business needs.",
          ],
          offerings: {
            title: "How do we help you sell online?",
            items: [
              {
                title: "Building and developing online stores",
                text: "We design and develop online stores that suit your products and reflect your brand’s identity.",
              },
              {
                title: "Organising and presenting products",
                text: "We help you present your products clearly and attractively, organising categories and information so customers can explore them easily.",
              },
              {
                title: "Improving the shopping experience",
                text: "We take care of easy browsing, choosing products and completing the order, for a smoother buying experience.",
              },
              {
                title: "Connecting your store to your operations",
                text: "We develop the right solutions to connect the store to stock, sales and related systems, to suit your business.",
              },
              {
                title: "Marketing your store",
                text: "We can support your store with content, design and digital marketing, helping you reach your target audience.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "Al Nour Optical",
              title: "Online sales connected to the business on the ground.",
              paragraphs: [
                "As part of developing Al Nour Optical’s digital solutions, ORVANN built an e-commerce website and connected it to a system covering three stores, solving the challenges of integrating stock and sales.",
                "The project shows why an online store should be a connected part of a company’s business, not just a separate shop window for its products.",
              ],
              projects: ["al-nour-optics"],
              galleryLabel: "From our work",
              tags: ["Store design", "Product pages", "Shopping experience", "Online storefronts"],
            },
          ],
          cta: {
            title: "Thinking of starting to sell online?",
            text: "Whether you have an existing store or want to launch a new online sales channel, we can help you choose the solution that suits your products and your business needs.",
          },
        },
      },
      {
        id: "events",
        tagline: "We create a presence that reflects the value of your brand.",
        text: "We develop ideas for exhibition stands and events to suit your goals and your audience, bringing together design, fit-out, promotion and on-site coordination in an integrated experience that serves your presence in the market.",
        page: {
          meta: {
            title: "Exhibitions, Conferences & Events | ORVANN",
            description:
              "International exhibition participation, stand design and fit-out, project and product launches, and corporate and internal events with ORVANN.",
          },
          title: "Every occasion is an opportunity to make a bigger impact.",
          paragraphs: [
            "Whether you are preparing to take part in an international exhibition, launch a new project or hold an event for your company, a successful experience starts with a clear goal and details that come together.",
            "At ORVANN, we combine planning, creativity and on-site coordination to help you deliver a professional presence that reflects your business’s identity and achieves the goals of your participation.",
          ],
          offerings: {
            title: "How do we create an experience worthy of your business?",
            items: [
              {
                title: "International exhibition participation",
                text: "We help you plan your company’s participation in specialised exhibitions, coordinating what your presence needs, from fit-out to company and marketing materials.",
              },
              {
                title: "Exhibition stand design and fit-out",
                text: "We develop creative concepts for stands and display spaces, and follow the design and fit-out through so they reflect your brand’s identity.",
              },
              {
                title: "Project and product launch events",
                text: "We help you present your new project or product through a launch event that brings together a creative idea, organisation and a visual experience.",
              },
              {
                title: "Corporate events and conferences",
                text: "We plan, coordinate and deliver professional events and corporate occasions, suited to the nature of the event and its audience.",
              },
              {
                title: "Internal events and employee experiences",
                text: "We help companies organise occasions, leisure activities and internal celebrations, creating memorable experiences that reflect their corporate culture.",
              },
            ],
          },
          casesLabel: "From our experience",
          cases: [
            {
              client: "Tucano",
              title: "A sustained presence at international aviation and defence exhibitions.",
              paragraphs: [
                "ORVANN has supported Tucano’s presence at a number of specialised international exhibitions, through the marketing, identity and fit-out work around each participation, keeping the company’s presence consistent from one event to the next.",
              ],
              list: {
                label: "Highlights:",
                items: [
                  "EDEX 2023",
                  "Egypt International Airshow 2024",
                  "EDEX 2025",
                  "Egypt International Airshow 2026",
                  "Dubai Airshow",
                ],
              },
              projects: ["tucano-2"],
            },
            {
              client: "Roshen Egypt",
              title: "From a real estate launch to an international exhibition.",
              paragraphs: [
                "ORVANN organised the launch event of INTRO MALL, Roshen Egypt’s first project, as part of managing the project’s launch, and contributed to the company’s participation in Cityscape Global in Riyadh, Saudi Arabia.",
              ],
              projects: ["intro", "roshan-masr"],
            },
            {
              client: "Eagles Developments",
              title: "Events that strengthen the company’s presence and its culture.",
              paragraphs: [
                "ORVANN’s work with Eagles Developments extended to project launch events, Ramadan iftars and leisure activities for employees, reflecting the company’s range of needs, from marketing events to internal occasions.",
              ],
              projects: ["eagles-real-estate-development"],
            },
          ],
          cta: {
            title: "Every event has a goal, and every experience has details that make the difference.",
            text: "Whether your next appearance is at an international exhibition, a project launch or an event that brings your team together, we help you turn your idea into a professional, integrated experience.",
          },
        },
      },
      {
        id: "craft",
        tagline: "We turn your ideas into exclusive creations.",
        text: "We create and make art pieces, objets d’art and custom products that combine creativity, craftsmanship and quality materials, turning your ideas into unique works that reflect your identity and taste.",
        page: {
          meta: {
            title: "Bespoke Artistry & Heritage Craftsmanship | ORVANN",
            description:
              "Exclusive art pieces, gold, silver and copper work, wood and stone pieces, and designs inspired by Egyptian heritage, made to order with ORVANN.",
          },
          title: "Not just a piece to own, but a story made to last.",
          paragraphs: [
            "Some pieces are worth more than their materials and design: their details carry an identity, a history and an art that cannot be repeated.",
            "At ORVANN, we bring the authenticity of Egyptian crafts to life in a contemporary spirit, turning ideas and personal visions into exclusive works of art, made with care, that combine beautiful design, precise execution and the value of heritage.",
            "From gold, silver and copper to wood and stone, each piece is shaped by skilled craftspeople to embody the character of the person it was made for, and carries a signature like no other.",
          ],
          offerings: {
            title: "Art in every detail",
            items: [
              {
                title: "Exclusive art pieces",
                text: "We create works of art and special designs that reflect the client’s vision and identity, far from standard models and mass production.",
              },
              {
                title: "Precious metalwork",
                text: "We craft works in gold, silver and copper, with care for the artistic details and the quality of the finish.",
              },
              {
                title: "Wood and stone work",
                text: "We make distinctive pieces that combine the beauty of wood and stone with craftsmanship, for a striking visual presence.",
              },
              {
                title: "Designs inspired by Egyptian heritage",
                text: "We draw creative elements from the richness of Egyptian civilisation, its arts and its symbols, and reshape them into works that are both authentic and contemporary.",
              },
              {
                title: "Made to order",
                text: "From the first idea and the choice of materials to making and finishing, we work to deliver a piece that carries the details that make it exceptional.",
              },
            ],
          },
          casesLabel: "From our creations",
          cases: [
            {
              title: "Where authentic heritage meets the art of detail.",
              paragraphs: [
                "Every work we make is a creative experience of its own, beginning with an idea and completed by craftsmanship that gives it its own character.",
                "We believe the value of an exclusive piece lies not in its rarity alone, but in the story it carries, the details that set it apart and the care with which it was made.",
              ],
              galleryLabel: "Our exclusive works",
              tags: ["Gold and silver work", "Copper work", "Wood pieces", "Stone work", "Designs inspired by Egyptian heritage"],
            },
          ],
          cta: {
            title: "Designed to be different. Made to last.",
            text: "Whether you are looking for an exclusive work of art, a piece that carries your own identity, or a design that embodies an idea never made before, ORVANN gives your vision the chance to become a unique work of art.",
            emphasis: "Let us make something like nothing else.",
          },
        },
      },
    ],
  },

  // [translation] of ORVANN's contact page (25 Nov 2026). The optional group after the need
  // keeps the CRM's lists (job title, region, timeline and budget).
  contact: {
    meta: {
      title: "Contact ORVANN | Book Your Free Discovery Session",
      description:
        "Planning a new project or looking for answers to your business challenges? Start with a free, no-obligation discovery session with ORVANN.",
    },
    intro: {
      label: "Contact Us",
      title: "Let’s discover your business’s growth opportunities together.",
      lede: "Planning to launch a new project, looking for solutions to your business challenges, or getting ready for a new stage of expansion?",
      body: [
        "Start with a free discovery session with ORVANN.",
        "Share your needs and ambitions, and we’ll discuss with you the challenges and opportunities worth your attention, and how our expertise and integrated solutions can support your next step.",
      ],
    },
    form: {
      title: "Tell us about your business",
      name: "Full name",
      namePlaceholder: "Enter your name",
      company: "Company or project name",
      companyPlaceholder: "Company or project name",
      email: "Email",
      emailPlaceholder: "Email address",
      phone: "Phone or WhatsApp",
      phonePlaceholder: "Contact number",
      topic: "What would you like to discuss?",
      topicPlaceholder: "Choose the closest topic",
      topics: {
        strategy: "Business development and growth strategies",
        launch: "Launching a new project or expanding into new markets",
        marketing: "Marketing and brand development",
        digital: "Software and digital solutions",
        commercial: "Partnerships and commercial services",
        unsure: "Another service or a need not yet defined",
      },
      need: "Tell us about your need",
      needPlaceholder:
        "What challenge are you facing? What do you want to achieve? You don’t need to know the solution; just tell us what’s on your business’s mind.",
      more: "A few more details to help us prepare (optional)",
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
      submit: "Book your free discovery session",
      note: "The discovery session is free. It is there to understand your needs and discuss how we might work together, with no obligation to sign a contract.",
      sending: "Sending…",
      sentTitle: "We’ve received your request.",
      sent: "Thank you for your interest in ORVANN. We’ll review what you shared with us and get in touch to arrange the next step and a convenient time for your free discovery session.",
      close: "Close",
      failed: "Your request couldn’t be sent. Please try again, or email us at info@orvann.com.",
    },
    direct: {
      title: "Prefer to contact us directly?",
      email: "Email",
      phone: "Phone or WhatsApp",
    },
  },

  // [translation] The intro is the homepage's Our Work copy (20 Nov 2026).
  work: {
    meta: {
      title: "ORVANN’s Work | Different Projects, Solutions Designed for Each Challenge",
      description:
        "Explore ORVANN’s projects in strategy, project management, marketing, digital solutions, e-commerce, exhibitions and events.",
    },
    intro: {
      label: "Our Work",
      title: "Different projects, and solutions designed for every challenge.",
      lede: "Discover how we have put our integrated expertise to work for our clients’ needs, turning their ideas and challenges into practical projects and solutions.",
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
    tagline: "Let’s build what’s next. Together.",
    label: "Careers & Internships",
    form: {
      title: "Apply to join ORVANN.",
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
      studyYear: "Current Year of Study",
      studyYears: { 1: "First Year", 2: "Second Year", 3: "Third Year", 4: "Fourth Year", 5: "Fifth Year", 6: "Sixth Year" },
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
        remote: "Remote",
      },
      cv: "CV / Résumé",
      cvHint: "Optional. PDF, DOC or DOCX, up to 5 MB.",
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
      sentTitle: "Application received!",
      sent: "Thank you for applying to ORVANN. Our team will review your application and contact you if your profile matches a current or upcoming opportunity.",
      close: "Close",
      failed: "Your application could not be submitted. Please try again, or email your CV to info@orvann.com.",
    },
  },

  // [translation] of the privacy policy ORVANN supplied in Arabic (25 Nov 2026). Confirm with counsel.
  privacy: {
    meta: {
      title: "Privacy Policy | ORVANN",
      description: "How ORVANN handles the personal information it receives through its website and the contact channels linked to it.",
    },
    intro: {
      label: "Legal",
      title: "Privacy Policy",
    },
    effective: "Last updated: November 2026",
    sections: [
      {
        heading: "About this policy",
        paragraphs: [
          "This policy explains how ORVANN handles the personal information we receive through our website and the contact channels linked to it, what we use and share it for, and how to contact us about it.",
          "Where processing your data requires your consent, we ask for it separately and clearly, explaining its purpose and how you can withdraw it.",
        ],
      },
      {
        heading: "The information we collect",
        paragraphs: ["The information we receive depends on how you contact us, and may include:"],
        list: [
          "Contact details you provide, such as your name, email address and phone number.",
          "Business information you share, such as the name of the client or organisation, the nature of the business and the service requested.",
          "The content of the messages, enquiries and attachments you send us.",
          "Technical information about your visit to the website, such as your IP address, browser and device type, and usage logs, depending on the tools enabled on the website.",
          "Information you make available to us when you contact us through outside platforms, according to your account settings and those platforms’ policies.",
        ],
        after: ["Please avoid sending sensitive personal information or data unrelated to your request."],
      },
      {
        heading: "How we use your information",
        paragraphs: ["We use information according to the nature of the request and the purpose for which it was collected, including to:"],
        list: [
          "Reply to your enquiries and contact you about the services you requested.",
          "Understand your needs, prepare proposals and follow up on our work together.",
          "Run the website and improve its performance, security and ease of use.",
          "Meet contractual obligations and applicable legal requirements.",
          "Send marketing content where there is consent or another appropriate legal basis.",
        ],
        after: [
          "Sending an enquiry or requesting a service does not automatically subscribe you to marketing messages. You can ask us to stop these messages through the unsubscribe option provided or by contacting us.",
        ],
      },
      {
        heading: "Sharing information and service providers",
        paragraphs: [
          "We may share the necessary information with service providers who support the running of the website, the management of communications and our business, according to the service provided and the purpose of the processing.",
          "We may also disclose information where the law requires it or in response to a binding request from a competent authority.",
          "If using a service provider means your data is transferred or stored outside your country, this processing follows the applicable legal requirements and appropriate safeguards.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "The website may use cookies and similar technologies to run its features, save some preferences, and measure use or support advertising, depending on the tools enabled.",
          "You can manage cookies in your browser settings, and in the privacy preferences tool where the website offers one. Disabling some necessary cookies may affect how some features work.",
          "Where using analytics or advertising tools requires your consent, it is asked for before they are enabled, and you can change your choice later.",
        ],
      },
      {
        heading: "How long we keep information",
        paragraphs: [
          "We keep information for as long as needed to fulfil the purpose for which it was collected, including handling enquiries, following up on contractual relationships and meeting applicable legal obligations.",
          "How long we keep it depends on the nature of the information, the status of the request or the work together, and any legal requirements attached to it. When it is no longer needed, it is deleted or turned into data that does not identify you, unless there is a legal reason to keep it.",
        ],
      },
      {
        heading: "Your rights and contacting us",
        paragraphs: [
          "Under applicable law, you can ask to access, correct or delete your personal data, ask us to restrict or object to some of its uses, and withdraw your consent where the processing relies on it.",
          "Withdrawing consent does not affect the lawfulness of processing carried out before it was withdrawn. We may need to verify your identity before acting on a request, to protect your data from unauthorised access.",
          "For privacy questions or requests, contact us by:",
        ],
        list: ["Email: info@orvann.com", "Phone: +20 108 078 4465"],
      },
      {
        heading: "Updates to this policy",
        paragraphs: [
          "We may update this policy to reflect changes to the website, our data processing practices or legal requirements. We publish the updated version on this page with the date of the last update, and give additional notice where the nature of the change calls for it.",
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

  // The homepage's closing band (20 Nov 2026) closes the pages that have none of their own.
  cta: {
    title: "Let’s start with what’s next.",
    text: "Whether you are planning a new project or looking to grow your business, share your ambitions and challenges with us, and together we’ll uncover the opportunities and choose the right next step for your growth.",
    primary: { label: "Let’s Talk About Your Business", href: "/contact-us/#project-form" },
  },
};
