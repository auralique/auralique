import {
  ShoppingBag, Palette, Megaphone, Mail, LineChart, Search,
  type LucideIcon,
} from "lucide-react";

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Platforms", href: "#platforms" },
  { label: "Our Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const principles = [
  ["Integrated Expertise", "Multiple growth services managed under one roof."],
  ["Beauty Industry Focus", "Specialized support for beauty and personal-care brands."],
  ["Growth-Driven Execution", "Strategic decisions supported by performance data."],
];

export const platforms: { name: string; items: string[] }[] = [
  { name: "Shopify", items: ["Store design and development", "Store management", "Product and collection optimization", "Conversion optimization"] },
  { name: "Amazon", items: ["Seller account support", "Product listing optimization", "Storefront management", "Amazon advertising"] },
  { name: "Faire", items: ["Wholesale storefront setup", "Product catalog management", "Wholesale marketplace optimization", "Retailer acquisition support"] },
  { name: "Google", items: ["Search visibility", "SEO", "Google Merchant Center", "Google Ads", "Google Business Profile where eligible"] },
  { name: "Meta", items: ["Facebook advertising", "Instagram advertising", "Campaign management", "Retargeting"] },
  { name: "TikTok", items: ["TikTok advertising", "Campaign strategy", "Creative coordination"] },
  { name: "Klaviyo", items: ["Email marketing", "Marketing automation", "Customer segmentation", "Retention campaigns"] },
];

export const industries = [
  ["Skincare", "Helping skincare brands establish their identity, improve their digital storefronts and grow their customer base."],
  ["Haircare", "Helping haircare businesses build stronger online experiences and scale across digital channels."],
  ["Cosmetics", "Supporting cosmetic brands with branding, e-commerce, marketing and customer acquisition."],
  ["Personal Care", "Helping personal-care businesses build visibility, strengthen their digital presence and grow sales."],
];

export const services: { title: string; short: string; desc: string; icon: LucideIcon; items: string[] }[] = [
  { title: "E-commerce Development & Management", short: "E-commerce Development", icon: ShoppingBag, desc: "Storefronts engineered to convert — built, maintained and managed across Shopify, Amazon and Faire.",
    items: ["Shopify store design and development", "Website redesign", "Store maintenance and management", "Product uploads and catalog management", "Landing page development", "Amazon storefront management", "Amazon listing optimization", "Faire wholesale storefront setup", "E-commerce integrations"] },
  { title: "Branding & Creative Design", short: "Branding & Creative", icon: Palette, desc: "Distinctive brand identities and creative that position you with clarity and confidence.",
    items: ["Brand strategy", "Brand positioning", "Logo design", "Visual identity", "Brand guidelines", "Packaging design", "Graphic design", "Marketing creatives", "Creative direction", "Content production coordination"] },
  { title: "Performance Marketing & Advertising", short: "Performance Marketing", icon: Megaphone, desc: "Paid campaigns planned, launched and optimized across the channels your customers use.",
    items: ["Meta Ads management", "Facebook and Instagram advertising", "Google Ads management", "TikTok Ads management", "Amazon Ads management", "Campaign strategy", "Retargeting", "Audience development", "Advertising optimization", "Performance reporting"] },
  { title: "Email Marketing & Customer Retention", short: "Email Marketing", icon: Mail, desc: "Lifecycle programs that turn first-time buyers into loyal, returning customers.",
    items: ["Klaviyo setup and management", "Email marketing strategy", "Email campaign management", "Welcome automation", "Abandoned cart automation", "Post-purchase automation", "Customer segmentation", "Replenishment campaigns", "Win-back campaigns", "SMS marketing"] },
  { title: "Growth Strategy & Conversion Optimization", short: "Growth & CRO", icon: LineChart, desc: "Data-led improvements across the customer journey, from first visit to checkout.",
    items: ["Conversion rate optimization", "Customer journey optimization", "Product page optimization", "Checkout optimization", "A/B testing", "Google Analytics 4", "Marketing analytics", "Growth strategy", "Performance dashboards", "Sales funnel optimization"] },
  { title: "Google Presence & Digital Visibility", short: "Google Visibility", icon: Search, desc: "Be found where customers search — organic, shopping and local visibility, managed.",
    items: ["Google Search optimization", "Search engine optimization", "Google Business Profile management where eligible", "Google Merchant Center", "Product feed optimization", "Google Search Console", "Local SEO where applicable", "Online reputation management", "Search visibility strategy"] },
];

export const benefits = [
  ["All-in-One Management", "Access multiple e-commerce and marketing services through one coordinated agency."],
  ["Beauty Industry Specialization", "Our focus is helping skincare, haircare, cosmetics and personal-care brands grow."],
  ["Integrated Execution", "Your branding, e-commerce, advertising and retention strategies work together."],
  ["Strategic Thinking", "Every engagement begins with understanding your business objectives."],
  ["Performance Monitoring", "We track relevant business metrics and identify opportunities for improvement."],
  ["Scalable Partnership", "Our services can expand as your brand, platforms and business requirements grow."],
];

export const process = [
  ["Discover", "We learn about your brand, products, target customers, existing digital presence and business objectives."],
  ["Strategize", "We assess your current operations and develop a practical roadmap based on your growth priorities."],
  ["Build", "We establish or improve your branding, website, e-commerce platforms and marketing infrastructure."],
  ["Manage", "We manage your agreed e-commerce operations, marketing campaigns, customer retention and digital presence."],
  ["Optimize & Scale", "We monitor performance, identify opportunities and continuously improve your digital commerce operation."],
];

export const engagements = [
  { title: "Brand Launch & Foundation", for: "For new and developing beauty brands.", cta: "Discuss your brand launch",
    items: ["Brand identity", "Brand positioning", "Shopify store development", "E-commerce platform setup", "Google presence foundation", "Email marketing setup", "Launch marketing strategy"] },
  { title: "E-commerce Growth Management", for: "For brands already selling online.", cta: "Discuss your growth",
    items: ["Shopify store management", "Advertising management", "Email marketing", "Customer retention", "SEO and Google visibility", "Conversion optimization", "Monthly reporting"] },
  { title: "Omnichannel Growth Partnership", for: "For established and expanding beauty brands.", cta: "Become a growth partner",
    items: ["Shopify management", "Amazon marketplace management", "Faire wholesale management", "Multi-channel advertising", "Branding and creative management", "Email and retention marketing", "Integrated growth strategy", "Performance reporting"] },
];

export const portfolioCategories = ["Shopify store projects", "Brand identity projects", "Amazon storefront projects", "Email marketing projects", "Advertising campaigns", "E-commerce growth case studies"];

export const faqs: [string, string][] = [
  ["What types of businesses does AURALIQUE work with?", "We work with skincare, haircare, cosmetics, beauty and personal-care brands — from new launches to established, expanding businesses."],
  ["Which e-commerce platforms do you support?", "We support Shopify, Amazon and Faire, alongside marketing channels including Google, Meta, TikTok and Klaviyo."],
  ["Do you manage Shopify stores?", "Yes. We design, develop and manage Shopify stores, including product uploads, catalog management, maintenance and conversion optimization."],
  ["Can you manage Amazon and Faire accounts?", "Yes. We provide Amazon seller support, listing optimization, storefront and advertising management, as well as Faire wholesale storefront setup and management."],
  ["Do you provide complete brand identity services?", "Yes — brand strategy, positioning, logo design, visual identity, guidelines, packaging and marketing creatives."],
  ["Can we hire AURALIQUE for one service only?", "Absolutely. You can engage us for a single service or combine several into an integrated growth partnership."],
  ["Do you manage advertising campaigns?", "Yes. We plan and manage campaigns across Meta, Google, TikTok and Amazon, with ongoing optimization and reporting."],
  ["Do you provide email marketing and automation?", "Yes. We set up and manage Klaviyo, including automated flows, segmentation, campaigns and SMS marketing."],
  ["Do you work with international clients?", "Yes. We work with brands internationally and collaborate remotely across time zones."],
  ["How does the onboarding process work?", "We begin with a strategy call to understand your brand and objectives, then propose a tailored roadmap and scope before work begins."],
  ["How is your pricing structured?", "Every engagement is customized to your goals, channels and scope. We share a tailored proposal after our initial strategy conversation."],
  ["How can we get started?", "Book a strategy call or send an enquiry through the form below, and we'll be in touch to arrange a conversation."],
];

export const formOptions = {
  industries: ["Skincare", "Haircare", "Cosmetics", "Beauty", "Personal care", "Wellness", "Other"],
  platforms: ["Shopify", "Amazon", "Faire", "WooCommerce", "Other", "Not selling online yet"],
  services: services.map((s) => s.short),
  budgets: ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000+", "Not sure yet"],
};
