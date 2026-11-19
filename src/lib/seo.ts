import { services } from "@/lib/content";
import { journalArticles } from "@/lib/journal";

export { siteOrigin } from "@/lib/site-origin";
import { siteOrigin } from "@/lib/site-origin";
import { articleSlug, serviceSlugs } from "@/lib/content-urls";
import { siteConfig } from "@/lib/site-config";
export const homepageTitle = "AURALIQUE | Beauty & eCommerce Growth Agency";
export const homepageDescription = "AURALIQUE is a full-service eCommerce growth agency helping skincare, haircare, cosmetics and personal-care brands grow through Shopify, Amazon, branding, advertising and retention marketing.";

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteOrigin}/#organization`, name: "AURALIQUE", url: `${siteOrigin}/`, email: siteConfig.email, sameAs: [siteConfig.linkedin, siteConfig.techbehemoths], slogan: "Growth, Elevated.", description: "E-commerce growth and brand management for beauty and personal-care brands." },
    { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "AURALIQUE", url: `${siteOrigin}/`, inLanguage: "en", publisher: { "@id": `${siteOrigin}/#organization` } },
    ...services.map((service, index) => ({ "@type": "Service", "@id": `${siteOrigin}/#service-${index + 1}`, name: service.title, description: service.desc, serviceType: service.short, url: `${siteOrigin}/services/${serviceSlugs[index]}`, provider: { "@id": `${siteOrigin}/#organization` } })),
    ...journalArticles.map((article) => ({ "@type": "Article", "@id": `${siteOrigin}/blog/${articleSlug(article.id)}#main`, url: `${siteOrigin}/blog/${articleSlug(article.id)}`, headline: article.title, description: article.excerpt, articleSection: article.category, inLanguage: "en", author: { "@id": `${siteOrigin}/#organization` }, publisher: { "@id": `${siteOrigin}/#organization` }, isPartOf: { "@id": `${siteOrigin}/#website` }, articleBody: [...article.body.map((block) => block.type !== "list" ? block.text : block.items.map((item) => `${item.lead ?? ""} ${item.text}`.trim()).join("\n")), article.closing].join("\n\n") })),
  ],
};