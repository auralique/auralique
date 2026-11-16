export type ServiceDetail = {
  category: string; headline: string; intro: string;
  groups: { title: string; text: string; lead: string; items: string[] }[];
  approach: string[]; benefits: string[]; platforms: string; idealFor: string; note: string;
};

// Detailed popup content, in the same order as `services` in content.ts.
export const serviceDetails: ServiceDetail[] = [
  {
    "groups": [
      {
        "title": "Shopify Store Design & Development",
        "text": "We create professionally structured Shopify storefronts designed around your products, brand identity and customer journey.",
        "lead": "Our capabilities include:",
        "items": [
          "Custom Shopify store design",
          "Website development and redesign",
          "Homepage and landing page creation",
          "Product and collection page design",
          "Navigation and shopping experience optimisation",
          "Mobile-responsive storefront development",
          "App and third-party integrations"
        ]
      },
      {
        "title": "Shopify Store Management",
        "text": "We provide ongoing support for brands that need consistent management of their online stores.",
        "lead": "Services include:",
        "items": [
          "Product uploads and catalogue updates",
          "Collection management",
          "Website content updates",
          "Store maintenance",
          "Promotional and seasonal updates",
          "Store performance monitoring",
          "Ongoing storefront improvements"
        ]
      },
      {
        "title": "Amazon Marketplace Support",
        "text": "We support beauty and personal-care brands with their Amazon commerce operations.",
        "lead": "Services include:",
        "items": [
          "Amazon storefront design",
          "Product listing optimisation",
          "Product catalogue management",
          "Product presentation improvements",
          "Marketplace content management",
          "Amazon advertising support"
        ]
      },
      {
        "title": "Faire Wholesale Management",
        "text": "We help brands establish and manage their wholesale presence on Faire.",
        "lead": "Services include:",
        "items": [
          "Wholesale storefront setup",
          "Product catalogue organisation",
          "Wholesale product presentation",
          "Product descriptions and merchandising",
          "Wholesale account and catalogue management"
        ]
      }
    ],
    "benefits": [
      "A stronger online shopping experience",
      "Better product presentation",
      "More organised store operations",
      "Consistent brand experiences across sales channels",
      "A scalable digital commerce foundation"
    ],
    "approach": [],
    "platforms": "Shopify, Amazon and Faire",
    "idealFor": "New beauty brands preparing to launch, established businesses improving their stores and growing brands expanding into additional commerce channels.",
    "note": "",
    "category": "E-COMMERCE SOLUTIONS",
    "headline": "Build a Digital Storefront Designed for Growth.",
    "intro": "Your online store is more than a place to sell products. It is the foundation of your brand's digital commerce experience. AURALIQUE helps beauty and personal-care businesses establish, develop and manage online stores that support their customers and commercial ambitions."
  },
  {
    "groups": [
      {
        "title": "Brand Strategy & Positioning",
        "text": "We help define how your brand should be presented and understood in its market.",
        "lead": "Services include:",
        "items": [
          "Brand positioning",
          "Brand messaging",
          "Brand personality development",
          "Brand direction",
          "Audience and competitor research",
          "Visual direction"
        ]
      },
      {
        "title": "Visual Identity Design",
        "text": "We create cohesive visual identities that establish consistent brand recognition.",
        "lead": "Services include:",
        "items": [
          "Logo design",
          "Brand colour systems",
          "Typography selection",
          "Visual identity development",
          "Brand guidelines",
          "Digital brand assets"
        ]
      },
      {
        "title": "Packaging & Product Presentation",
        "text": "We help develop visual packaging concepts and product presentation systems.",
        "lead": "Services include:",
        "items": [
          "Packaging design concepts",
          "Product label design",
          "Packaging layouts",
          "Product presentation graphics",
          "Visual consistency across product lines"
        ]
      },
      {
        "title": "Digital Creative Design",
        "text": "We create creative assets that support your brand across digital touchpoints.",
        "lead": "Services include:",
        "items": [
          "Website graphics",
          "Advertising creatives",
          "Social media graphics",
          "Email campaign design",
          "Promotional banners",
          "Digital marketing assets"
        ]
      }
    ],
    "benefits": [
      "A recognisable brand identity",
      "Consistent visual communication",
      "Stronger brand presentation",
      "More cohesive customer experiences",
      "Better alignment across digital platforms"
    ],
    "approach": [],
    "platforms": "",
    "idealFor": "New beauty businesses developing their identity, established brands refreshing their appearance and businesses preparing to introduce new products or collections.",
    "note": "",
    "category": "BRAND DEVELOPMENT",
    "headline": "Create a Brand Customers Recognise and Remember.",
    "intro": "A powerful beauty brand begins with a clear identity. AURALIQUE helps beauty, skincare, haircare, cosmetics and personal-care businesses develop distinctive brand identities and creative assets that communicate their positioning, personality and value."
  },
  {
    "groups": [
      {
        "title": "Meta Advertising",
        "text": "We support customer acquisition and brand visibility through Facebook and Instagram advertising.",
        "lead": "Services include:",
        "items": [
          "Advertising strategy",
          "Campaign setup and management",
          "Audience research and targeting",
          "Creative direction",
          "Retargeting",
          "Campaign monitoring",
          "Performance optimisation"
        ]
      },
      {
        "title": "Google Advertising",
        "text": "We help brands reach customers through relevant Google advertising placements.",
        "lead": "Services include:",
        "items": [
          "Google Ads campaign management",
          "Search advertising",
          "Shopping campaign management where eligible",
          "Audience strategy",
          "Remarketing",
          "Campaign optimisation",
          "Performance reporting"
        ]
      },
      {
        "title": "TikTok Advertising",
        "text": "We help brands use TikTok advertising to introduce products and reach relevant audiences.",
        "lead": "Services include:",
        "items": [
          "TikTok campaign strategy",
          "Campaign setup",
          "Advertising creative direction",
          "Audience targeting",
          "Campaign monitoring",
          "Performance analysis"
        ]
      },
      {
        "title": "Amazon Advertising",
        "text": "We support brands seeking to improve product visibility within Amazon's marketplace.",
        "lead": "Services include:",
        "items": [
          "Sponsored advertising campaign management",
          "Keyword targeting",
          "Product advertising strategy",
          "Campaign monitoring",
          "Bid and budget optimisation",
          "Performance reporting"
        ]
      }
    ],
    "benefits": [
      "More structured advertising operations",
      "Better alignment between campaigns and business objectives",
      "Improved audience targeting",
      "Clearer visibility into campaign performance",
      "More informed marketing decisions"
    ],
    "approach": [
      "Understand your brand, products and objectives.",
      "Research audiences and advertising opportunities.",
      "Develop campaign and creative strategies.",
      "Launch and manage advertising campaigns.",
      "Monitor performance and optimise.",
      "Report insights and identify opportunities."
    ],
    "platforms": "Meta, Google, TikTok and Amazon Ads",
    "idealFor": "",
    "note": "Advertising results depend on multiple factors, including budget, competition, product-market fit and customer experience.",
    "category": "DIGITAL ADVERTISING",
    "headline": "Reach the Right Audience. Turn Attention into Opportunity.",
    "intro": "Effective advertising requires more than visibility. It requires the right audience, compelling creative, strategic campaign management and continuous performance evaluation. AURALIQUE helps beauty and personal-care businesses approach digital advertising with a structured, performance-focused strategy."
  },
  {
    "groups": [
      {
        "title": "Email Marketing Strategy",
        "text": "We develop email marketing strategies around your customer journey and business goals.",
        "lead": "Services include:",
        "items": [
          "Email marketing planning",
          "Campaign calendars",
          "Audience segmentation",
          "Campaign strategy",
          "Promotional email planning",
          "Customer lifecycle communication"
        ]
      },
      {
        "title": "Klaviyo Setup & Management",
        "text": "We help brands establish and manage their email marketing systems through Klaviyo.",
        "lead": "Services include:",
        "items": [
          "Klaviyo account setup",
          "Email integration",
          "List and segment management",
          "Campaign management",
          "Template design",
          "Automation configuration"
        ]
      },
      {
        "title": "Email Automation",
        "text": "We develop automated customer communications for important stages of the buying journey.",
        "lead": "Automations include:",
        "items": [
          "Welcome series",
          "Abandoned cart flows",
          "Browse abandonment flows where supported",
          "Post-purchase sequences",
          "Product replenishment flows",
          "Customer win-back campaigns",
          "Customer engagement automations"
        ]
      },
      {
        "title": "SMS Marketing",
        "text": "Where appropriate and supported by the platform and applicable consent requirements, we help brands build SMS communication strategies.",
        "lead": "Services include:",
        "items": [
          "SMS campaign planning",
          "Customer segmentation",
          "Promotional messaging",
          "Lifecycle automation",
          "Subscriber engagement"
        ]
      }
    ],
    "benefits": [
      "More organised customer communication",
      "Better use of customer lifecycle opportunities",
      "Consistent post-purchase engagement",
      "More relevant marketing messages",
      "Stronger customer retention systems"
    ],
    "approach": [],
    "platforms": "Klaviyo",
    "idealFor": "",
    "note": "",
    "category": "CUSTOMER LIFECYCLE MARKETING",
    "headline": "Build Relationships That Continue Beyond Checkout.",
    "intro": "Customer acquisition is only one part of sustainable e-commerce growth. AURALIQUE helps beauty and personal-care brands build meaningful customer relationships through strategic email marketing, automation and retention experiences."
  },
  {
    "groups": [
      {
        "title": "Conversion Rate Optimization",
        "text": "We review the shopping experience to identify potential obstacles and opportunities.",
        "lead": "Services include:",
        "items": [
          "Website experience audits",
          "Navigation analysis",
          "Product page evaluation",
          "Checkout experience review",
          "Mobile shopping experience assessment",
          "Conversion improvement recommendations"
        ]
      },
      {
        "title": "Customer Journey Optimisation",
        "text": "We examine how customers discover, explore and purchase products.",
        "lead": "Services include:",
        "items": [
          "Customer journey mapping",
          "Purchase funnel analysis",
          "Product discovery improvements",
          "Landing page assessment",
          "Shopping flow recommendations"
        ]
      },
      {
        "title": "Testing & Optimisation",
        "text": "Where suitable traffic and tracking are available, we help businesses evaluate improvements through structured experiments.",
        "lead": "Services include:",
        "items": [
          "A/B testing strategy",
          "Landing page experiments",
          "Product page testing",
          "CTA and messaging experiments",
          "User experience testing"
        ]
      },
      {
        "title": "Analytics & Reporting",
        "text": "We help businesses understand their e-commerce performance through useful measurement and reporting.",
        "lead": "Services include:",
        "items": [
          "Google Analytics 4 configuration support",
          "Google Tag Manager support",
          "E-commerce event tracking",
          "Funnel reporting",
          "Dashboard development",
          "Performance analysis"
        ]
      }
    ],
    "benefits": [
      "A clearer understanding of customer behaviour",
      "Better-informed website improvements",
      "More efficient shopping journeys",
      "Stronger measurement of e-commerce performance",
      "A structured approach to conversion improvement"
    ],
    "approach": [],
    "platforms": "Shopify, Google Analytics 4 and Google Tag Manager",
    "idealFor": "",
    "note": "",
    "category": "E-COMMERCE GROWTH",
    "headline": "Turn More of Your Store Traffic into Meaningful Opportunities.",
    "intro": "Driving visitors to your website is important, but the customer experience determines what happens next. AURALIQUE helps beauty and personal-care businesses identify opportunities to improve their online shopping experience through strategic analysis, conversion optimisation and data-informed improvements."
  },
  {
    "groups": [
      {
        "title": "Search Engine Optimization",
        "text": "We help businesses improve how their websites are understood and discovered by search engines.",
        "lead": "Services include:",
        "items": [
          "SEO audits",
          "Keyword research",
          "Search intent analysis",
          "On-page SEO",
          "Website metadata optimisation",
          "Technical SEO recommendations",
          "Internal linking",
          "Content optimisation"
        ]
      },
      {
        "title": "Google Search & Website Visibility",
        "text": "We support the setup and monitoring of tools that help brands understand their organic search performance.",
        "lead": "Services include:",
        "items": [
          "Google Search Console setup",
          "Website verification",
          "Sitemap submission",
          "Indexing monitoring",
          "Search performance analysis",
          "Organic visibility reporting"
        ]
      },
      {
        "title": "Google Merchant Center",
        "text": "We help eligible product-based businesses organise their product information for Google's shopping ecosystem.",
        "lead": "Services include:",
        "items": [
          "Merchant Center setup support",
          "Product feed organisation",
          "Product data optimisation",
          "Feed issue identification",
          "Product visibility monitoring"
        ]
      },
      {
        "title": "Google Analytics & Measurement",
        "text": "We help brands understand how visitors discover and interact with their websites.",
        "lead": "Services include:",
        "items": [
          "Google Analytics 4 setup support",
          "Conversion event planning",
          "Traffic analysis",
          "Performance measurement",
          "Reporting dashboards"
        ]
      }
    ],
    "benefits": [
      "A more structured SEO foundation",
      "Better understanding of organic search visibility",
      "Improved website discoverability",
      "More reliable marketing measurement",
      "Better-informed digital visibility decisions"
    ],
    "approach": [],
    "platforms": "Google Search Console, Google Analytics 4 and Google Merchant Center",
    "idealFor": "",
    "note": "Google Business Profile management is offered only to businesses that meet Google's eligibility requirements.",
    "category": "SEARCH VISIBILITY",
    "headline": "Make Your Brand Easier to Discover Online.",
    "intro": "Your brand should be discoverable wherever potential customers search for relevant products and services. AURALIQUE helps beauty and personal-care businesses strengthen their online visibility through search optimisation, Google tools and structured digital presence management."
  }
];
