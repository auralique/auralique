import { describe, expect, it, vi } from "vitest";
import { isConfirmedCalendlyMessage, trackEvent } from "@/lib/analytics";
import { structuredData } from "@/lib/seo";
import { sitemapXML } from "@/lib/sitemap";

describe("SEO and conversion rules", () => {
  it("never treats opening Calendly as a completed booking", () => {
    expect(isConfirmedCalendlyMessage("https://calendly.com", { event: "calendly.profile_page_viewed" }, true)).toBe(false);
  });
  it("accepts only confirmed scheduling messages from the embedded Calendly frame", () => {
    const data = { event: "calendly.event_scheduled" };
    expect(isConfirmedCalendlyMessage("https://calendly.com", data, true)).toBe(true);
    expect(isConfirmedCalendlyMessage("https://example.com", data, true)).toBe(false);
    expect(isConfirmedCalendlyMessage("https://calendly.com", data, false)).toBe(false);
  });
  it("does not publish fabricated ratings, customers or business locations", () => {
    const json = JSON.stringify(structuredData);
    for (const key of ['"aggregateRating"', '"review"', '"address"', '"telephone"']) expect(json).not.toContain(key);
    expect(structuredData["@graph"].filter((node) => node["@type"] === "Article")).toHaveLength(4);
  });
  it("lists only the official profile URLs the owner supplied", () => {
    const organization = structuredData["@graph"][0] as { "@type"?: string; sameAs?: string[] };
    expect(organization["@type"]).toBe("Organization");
    expect(organization.sameAs).toEqual([
      "https://www.linkedin.com/company/auralique/",
      "https://techbehemoths.com/company/auralique",
    ]);
  });
  it("omits lastmod when no page-specific authoritative timestamp exists", () => {
    const xml = sitemapXML("https://auralique.lovable.app", [{ path: "/" }]);
    expect(xml).toContain("<loc>https://auralique.lovable.app/</loc>");
    expect(xml).not.toContain("lastmod");
  });
  it("sends only the explicit article label, never enquiry details", () => {
    const spy = vi.fn(); window.gtag = spy;
    trackEvent("blog_article_open", { article_id: "grow-a-skincare-brand-online" });
    expect(spy).toHaveBeenCalledWith("event", "blog_article_open", { article_id: "grow-a-skincare-brand-online" });
    delete window.gtag;
  });
});
import { contentPaths } from "@/lib/content-urls";
describe("Content URLs", () => {
  it("gives every article, service and case study its own path", () => {
    const paths = contentPaths();
    expect(paths).toContain("/blog/how-to-grow-a-skincare-brand-online");
    expect(paths).toContain("/services/branding-and-creative-design");
    expect(paths).toContain("/work/dignite-store");
    expect(paths).toHaveLength(14);
    expect(new Set(paths).size).toBe(14);
  });
});
