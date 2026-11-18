import { createFileRoute, notFound } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { NotFoundPage } from "@/components/site/NotFoundPage";
import { services } from "@/lib/content";
import { contentHead, findServiceIndex, serviceSchema, serviceSlugs, unavailableHead } from "@/lib/content-urls";

export const Route = createFileRoute("/services/$slug")({
  staticData: { sitemap: false },
  loader: ({ params }) => {
    const i = findServiceIndex(params.slug);
    if (i < 0) throw notFound();
    return { i };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return unavailableHead();
    const i = loaderData.i; const s = services[i]!;
    return contentHead({ path: `/services/${serviceSlugs[i]}`, title: `${s.title} for Beauty Brands | AURALIQUE`, description: s.desc, type: "website", schema: serviceSchema(i) });
  },
  component: HomePage,
  notFoundComponent: NotFoundPage,
  errorComponent: NotFoundPage,
});
