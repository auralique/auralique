import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("Official contact details", () => {
  it("uses the official enquiry email", () => {
    expect(siteConfig.email).toBe("hello@auralique.agency");
  });

  it("links to the official AURALIQUE LinkedIn company page", () => {
    expect(siteConfig.linkedin).toBe("https://www.linkedin.com/company/auralique/");
  });
});
