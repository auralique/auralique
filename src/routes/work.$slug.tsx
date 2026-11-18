import { createFileRoute, notFound } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { contentHead, findProject, unavailableHead } from "@/lib/content-urls";

export const Route = createFileRoute("/work/$slug")({
  staticData: { sitemap: false },
  loader: ({ params }) => {
    if (!findProject(params.slug)) throw notFound();
    return { id: params.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && findProject(loaderData.id);
    if (!p) return unavailableHead();
    const title = p.caseTitle ?? p.title;
    const src = p.images?.[0]?.src;
    const image = src?.startsWith("https://") ? src : undefined;
    return contentHead({
      path: `/work/${p.id}`, title: `${title} | AURALIQUE Case Study`, description: p.overview, type: "article",
      image,
      schema: { "@type": "CreativeWork", name: title, headline: title, description: p.caseOverview ?? p.overview, genre: p.classification, keywords: p.tags.join(", "), creator: { "@id": "https://auralique.agency/#organization" }, ...(image ? { image } : {}) },
    });
  },
  component: HomePage,
  notFoundComponent: NotFoundPage,
  errorComponent: NotFoundPage,
});
