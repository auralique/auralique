import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";
import { contentPaths } from "@/lib/content-urls";
import { siteOrigin } from "@/lib/site-origin";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries = [...sitemapStaticPaths(router), ...contentPaths()].map((path) => ({ path }));
        if (!entries.length) return new Response("No discoverable pages", { status: 404 });
        return new Response(sitemapXML(siteOrigin, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});