import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { journalArticles } from "@/lib/journal";
import { projects } from "@/lib/projects";
import { siteOrigin } from "@/lib/site-origin";

// Permanent slugs: changing one breaks shared links and indexed URLs.
export const blogSlugs: Record<string, string> = {
  "grow-a-skincare-brand-online": "how-to-grow-a-skincare-brand-online",
  "shopify-store-optimisation-beauty": "shopify-store-optimisation-for-beauty-brands",
  "email-marketing-beauty-klaviyo": "email-marketing-for-beauty-brands",
  "marketing-beauty-brand-shopify-amazon-wholesale": "marketing-a-beauty-brand-across-multiple-channels",
};
export const serviceSlugs = [
  "ecommerce-development-and-management",
  "branding-and-creative-design",
  "performance-marketing",
  "email-marketing-and-customer-retention",
  "growth-strategy-and-conversion-optimisation",
  "google-presence-and-digital-visibility",
];

export const articleSlug = (id: string) => blogSlugs[id]!;
export const findArticle = (slug: string) => journalArticles.find((a) => blogSlugs[a.id] === slug);
export const findServiceIndex = (slug: string) => serviceSlugs.indexOf(slug);
export const findProject = (slug: string) => projects.find((p) => p.id === slug);

export const contentPaths = (): string[] => [
  ...journalArticles.map((a) => `/blog/${articleSlug(a.id)}`),
  ...services.map((_, i) => `/services/${serviceSlugs[i]}`),
  ...projects.map((p) => `/work/${p.id}`),
];

export const pageUrl = (path: string) => `${siteOrigin}${path}`;

const org = { "@type": "Organization", "@id": `${siteOrigin}/#organization`, name: "AURALIQUE", url: `${siteOrigin}/` };

export function contentHead(o: { path: string; title: string; description: string; type: "article" | "website"; image?: string | undefined; schema: Record<string, unknown> }) {
  const url = pageUrl(o.path);
  return {
    meta: [
      { title: o.title },
      { name: "description", content: o.description },
      { property: "og:title", content: o.title },
      { property: "og:description", content: o.description },
      { property: "og:type", content: o.type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: o.title },
      { name: "twitter:description", content: o.description },
      ...(o.image ? [{ property: "og:image", content: o.image }, { name: "twitter:image", content: o.image }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [org, { ...o.schema, "@id": `${url}#main`, url, mainEntityOfPage: url }] }) }],
  };
}

export const unavailableHead = () => ({ meta: [{ title: "Page not found | AURALIQUE" }, { name: "robots", content: "noindex" }] });

export function serviceSchema(i: number) {
  const s = services[i]!; const d = serviceDetails[i]!;
  return { "@type": "Service", name: s.title, description: d.intro, serviceType: s.short, areaServed: "Worldwide", audience: { "@type": "Audience", audienceType: "Beauty and personal-care brands" }, provider: { "@id": `${siteOrigin}/#organization` } };
}
