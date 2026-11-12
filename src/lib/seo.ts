import { services } from "@/lib/content";
import { journalArticles } from "@/lib/journal";

export const siteOrigin = "https://auralique.lovable.app";
export const homepageTitle = "AURALIQUE | Beauty Ecommerce & Growth Agency";
export const homepageDescription = "AURALIQUE helps skincare, haircare, cosmetics and personal-care brands grow through Shopify, Amazon, Faire, branding, digital marketing and ecommerce management.";

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteOrigin}/#organization`, name: "AURALIQUE", url: `${siteOrigin}/`, slogan: "Growth, Elevated.", description: "E-commerce growth and brand management for beauty and personal-care brands." },
    { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "AURALIQUE", url: `${siteOrigin}/`, inLanguage: "en", publisher: { "@id": `${siteOrigin}/#organization` } },
    ...services.map((service, index) => ({ "@type": "Service", "@id": `${siteOrigin}/#service-${index + 1}`, name: service.title, description: service.desc, serviceType: service.short, url: `${siteOrigin}/#services`, provider: { "@id": `${siteOrigin}/#organization` } })),
    ...journalArticles.map((article) => ({ "@type": "Article", "@id": `${siteOrigin}/#article-${article.id}`, url: `${siteOrigin}/#article-${article.id}`, headline: article.title, description: article.excerpt, articleSection: article.category, inLanguage: "en", author: { "@id": `${siteOrigin}/#organization` }, publisher: { "@id": `${siteOrigin}/#organization` }, isPartOf: { "@id": `${siteOrigin}/#website` }, articleBody: [...article.body.map((block) => block.type === "paragraph" ? block.text : block.items.map((item) => `${item.lead ?? ""} ${item.text}`.trim()).join("\n")), article.closing].join("\n\n") })),
  ],
};