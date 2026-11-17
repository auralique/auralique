export type JournalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: { lead?: string; text: string }[] };

export interface JournalArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  primaryKeyword: string;
  body: JournalBlock[];
  closing: string;
  related: { label: string; href: string }[];
}

export const journalArticles: JournalArticle[] = [
  {
    id: "grow-a-skincare-brand-online",
    category: "E-Commerce Strategy",
    title: "How to Grow a Skincare Brand Online: A Complete eCommerce Guide",
    primaryKeyword: "how to grow a skincare brand online",
    excerpt: "A practical guide to growing a skincare brand online — from positioning and your Shopify store to acquisition, retention and the numbers worth watching.",
    readingTime: "7 min read",
    body: [
      { type: "paragraph", text: "Growing a skincare brand online is rarely about one big tactic. It comes from a set of connected decisions: who you serve, how your store explains your products, how new customers find you and why they come back. This guide walks through each stage in the order most brands should tackle it." },
      { type: "heading", text: "1. Start with a clear position" },
      { type: "paragraph", text: "Skincare shoppers compare carefully. Before spending on traffic, be able to say in one sentence which skin concern you solve, for whom, and what makes your formulation or approach different. That sentence should shape your product names, page headlines and advertising." },
      { type: "heading", text: "2. Build a store that educates as well as sells" },
      { type: "paragraph", text: "Your product pages carry most of the selling. Each one should answer the questions a shopper would ask in person:" },
      { type: "list", items: [
        { lead: "Who it is for:", text: "skin types and concerns, stated plainly." },
        { lead: "How to use it:", text: "routine step, frequency and what to pair it with." },
        { lead: "What is in it:", text: "full ingredient list with key actives explained." },
        { lead: "What to expect:", text: "honest timelines and texture or scent notes." },
        { lead: "How long it lasts:", text: "size and typical usage, which also helps replenishment emails later." },
      ] },
      { type: "paragraph", text: "Make sure all of this works on a phone first, since most beauty browsing happens on mobile. Keep checkout short and show shipping costs and return terms before the final step." },
      { type: "heading", text: "3. Choose your sales channels deliberately" },
      { type: "paragraph", text: "A Shopify store gives you control over brand experience and customer data. Amazon can add reach where shoppers already search for skincare, and Faire can open wholesale to independent retailers. Add channels when you can support their inventory, pricing and customer service — not all at once." },
      { type: "heading", text: "4. Acquire customers you can afford" },
      { type: "paragraph", text: "Paid social, search and creator content can all work for skincare. Whatever the channel, keep the promise in the ad consistent with the landing page, and judge campaigns on cost per new customer against your margins rather than clicks or reach. Search visibility through SEO and Google Shopping builds a steadier source of demand over time." },
      { type: "heading", text: "5. Make retention part of the plan from day one" },
      { type: "paragraph", text: "Skincare is replenished, so repeat purchases matter. A welcome series, post-purchase guidance and timed replenishment reminders often do more for long-term growth than another round of discounts." },
      { type: "heading", text: "6. Measure what moves the business" },
      { type: "list", items: [
        { text: "Conversion rate by device and by landing page." },
        { text: "Average order value and best-selling bundles." },
        { text: "Cost to acquire a new customer, by channel." },
        { text: "Repeat-purchase rate and time between orders." },
      ] },
      { type: "paragraph", text: "Review these monthly and fix the weakest stage of the journey before adding new spend." },
    ],
    closing: "Growth comes from a connected system: clear positioning, a store that educates, channels you can support and customers who return.",
    related: [
      { label: "E-commerce development & management", href: "#services" },
      { label: "Growth strategy & conversion optimisation", href: "#services" },
      { label: "Book a strategy call", href: "#contact" },
    ],
  },
  {
    id: "shopify-store-optimisation-beauty",
    category: "Shopify & CRO",
    title: "Shopify Store Optimisation: How Beauty Brands Can Improve Their Online Shopping Experience",
    primaryKeyword: "Shopify store optimisation",
    excerpt: "Where beauty shoppers drop off on Shopify — and the practical fixes to navigation, product pages, speed and checkout that make buying easier.",
    readingTime: "6 min read",
    body: [
      { type: "paragraph", text: "Shopify store optimisation is the work of removing friction between a shopper's interest and their order. For beauty brands, that friction usually sits in a few predictable places. Start with an audit, then fix the issues that affect the most visitors first." },
      { type: "heading", text: "Audit before you redesign" },
      { type: "paragraph", text: "Look at analytics before changing anything: which pages people land on, where they leave, and how mobile and desktop compare. A full redesign is rarely the answer; targeted fixes to high-traffic pages usually matter more." },
      { type: "heading", text: "Navigation shoppers understand" },
      { type: "paragraph", text: "Organise collections the way customers shop — by concern, skin or hair type, routine step and product type — not only by internal product lines. Keep search visible, and make sure it handles common misspellings and ingredient names." },
      { type: "heading", text: "Product pages that answer questions" },
      { type: "list", items: [
        { lead: "Imagery:", text: "texture, scale and shade shots, not only packshots." },
        { lead: "Benefits first:", text: "lead with the result, then the detail." },
        { lead: "Ingredients and usage:", text: "easy to find, written clearly." },
        { lead: "Shade and variant selection:", text: "obvious, with clear stock status." },
        { lead: "Real reviews:", text: "shown honestly once you have them." },
      ] },
      { type: "heading", text: "Speed and mobile experience" },
      { type: "paragraph", text: "Compress images, limit apps that load scripts on every page and test on a mid-range phone. Tap targets, sticky add-to-cart buttons and readable text sizes make a noticeable difference for mobile shoppers." },
      { type: "heading", text: "A trustworthy checkout" },
      { type: "paragraph", text: "Show shipping costs early, offer familiar payment methods and keep the number of steps low. Clear return and delivery information near the add-to-cart button reduces hesitation." },
      { type: "heading", text: "Test, then keep improving" },
      { type: "paragraph", text: "Shopify conversion rate optimisation works best as a steady habit: one hypothesis, one change, a fair test period and a clear decision. Record what you learn so each improvement builds on the last." },
    ],
    closing: "A better shopping experience is built page by page, guided by what your customers actually do.",
    related: [
      { label: "Growth strategy & conversion optimisation", href: "#services" },
      { label: "See our selected work", href: "#work" },
      { label: "Book a strategy call", href: "#contact" },
    ],
  },
  {
    id: "email-marketing-beauty-klaviyo",
    category: "Customer Retention",
    title: "Email Marketing for Beauty Brands: Building Customer Retention with Klaviyo",
    primaryKeyword: "email marketing for beauty brands",
    excerpt: "How beauty brands use Klaviyo flows, segmentation and replenishment timing to turn first orders into lasting customer relationships.",
    readingTime: "6 min read",
    body: [
      { type: "paragraph", text: "Email marketing for beauty brands works because the products are used up and repurchased. A well-built Klaviyo setup connects to your Shopify store so every message reflects what a customer has bought, browsed or left behind." },
      { type: "heading", text: "Start with consent and a good signup" },
      { type: "paragraph", text: "Grow your list with clear permission and a reason to join, such as routine advice or early access to launches. Ask one or two useful questions — skin type or main concern — so later emails can be relevant." },
      { type: "heading", text: "The core automated flows" },
      { type: "list", items: [
        { lead: "Welcome series:", text: "introduce the brand, best sellers and how to choose." },
        { lead: "Abandoned cart and browse:", text: "remind shoppers what they viewed and answer likely doubts." },
        { lead: "Post-purchase:", text: "usage tips so the product works as intended." },
        { lead: "Replenishment:", text: "timed to how long a product actually lasts." },
        { lead: "Win-back:", text: "re-engage customers who have not ordered in a while." },
      ] },
      { type: "heading", text: "Segment by behaviour" },
      { type: "paragraph", text: "Separate first-time buyers from repeat customers, and group people by product category or concern. A haircare buyer and a skincare buyer should not receive the same campaign." },
      { type: "heading", text: "Campaigns that add value" },
      { type: "paragraph", text: "Use regular campaigns for launches, routines and education, not only discounts. Constant offers train customers to wait for a sale and erode margin." },
      { type: "heading", text: "Measure retention, not just opens" },
      { type: "paragraph", text: "Track revenue per recipient, repeat-purchase rate and unsubscribes by flow. Klaviyo's reporting, read alongside Shopify order data, shows which messages genuinely bring customers back. SMS can extend the strongest flows once email is working well." },
    ],
    closing: "Useful, well-timed emails turn one order into an ongoing customer relationship.",
    related: [
      { label: "Email marketing & customer retention", href: "#services" },
      { label: "Explore all services", href: "#services" },
      { label: "Book a strategy call", href: "#contact" },
    ],
  },
  {
    id: "marketing-beauty-brand-shopify-amazon-wholesale",
    category: "Omnichannel Growth",
    title: "The Complete Guide to Marketing a Beauty Brand Across Shopify, Amazon and Wholesale",
    primaryKeyword: "marketing a beauty brand across channels",
    excerpt: "How to market a beauty brand on your own Shopify store, on Amazon and through wholesale on Faire — without the channels competing against each other.",
    readingTime: "7 min read",
    body: [
      { type: "paragraph", text: "Selling a beauty brand across Shopify, Amazon and wholesale can widen reach, but each channel has different shoppers, rules and economics. The aim is a plan where every channel has a clear job and supports the others." },
      { type: "heading", text: "Give each channel a role" },
      { type: "list", items: [
        { lead: "Shopify:", text: "your brand home — full storytelling, customer data, bundles and retention." },
        { lead: "Amazon:", text: "capturing shoppers already searching for your product type." },
        { lead: "Wholesale on Faire:", text: "reaching independent boutiques and spas that sell to their own communities." },
      ] },
      { type: "heading", text: "Keep pricing and brand consistent" },
      { type: "paragraph", text: "Set a pricing structure that leaves room for wholesale margins and marketplace fees without undercutting your own store. Use the same product names, imagery and claims everywhere so customers recognise you on any channel." },
      { type: "heading", text: "Marketing your Shopify store" },
      { type: "paragraph", text: "Drive traffic with paid social, search and SEO, and convert it with strong product pages. Email and SMS then turn first orders into repeat customers — something marketplaces make much harder." },
      { type: "heading", text: "Marketing on Amazon" },
      { type: "paragraph", text: "Optimise listings around the terms shoppers search, with clear images and complete ingredient and usage details. Amazon Ads can support new launches, but watch advertising cost against margin closely." },
      { type: "heading", text: "Marketing to wholesale buyers" },
      { type: "paragraph", text: "Retailers want a reliable product that sells. Present best sellers, minimum orders, lead times and display or education materials clearly in your Faire storefront, and follow up with retailers after their first order." },
      { type: "heading", text: "Manage stock and data across channels" },
      { type: "paragraph", text: "Connect inventory so one channel does not oversell another, and review performance by channel monthly: revenue, margin after fees and repeat orders. Shift effort toward the channels that grow profitably." },
    ],
    closing: "Each channel works best with a clear role, consistent branding and pricing that protects every part of the business.",
    related: [
      { label: "E-commerce development & management", href: "#services" },
      { label: "Performance marketing & advertising", href: "#services" },
      { label: "Book a strategy call", href: "#contact" },
    ],
  },
];
