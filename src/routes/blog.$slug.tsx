import { createFileRoute, notFound } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { articleSlug, contentHead, findArticle, unavailableHead } from "@/lib/content-urls";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: false },
  loader: ({ params }) => {
    const a = findArticle(params.slug);
    if (!a) throw notFound();
    return { id: a.id };
  },
  head: ({ loaderData }) => {
    const a = loaderData && findArticle(articleSlug(loaderData.id));
    if (!a) return unavailableHead();
    return contentHead({
      path: `/blog/${articleSlug(a.id)}`, title: `${a.title} | AURALIQUE`, description: a.excerpt, type: "article",
      schema: { "@type": "BlogPosting", headline: a.title, description: a.excerpt, articleSection: a.category, keywords: a.primaryKeyword, inLanguage: "en", author: { "@id": "https://auralique.agency/#organization" }, publisher: { "@id": "https://auralique.agency/#organization" } },
    });
  },
  component: HomePage,
  notFoundComponent: NotFoundPage,
  errorComponent: NotFoundPage,
});
