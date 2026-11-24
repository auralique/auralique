import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("Official contact details", () => {
  it("uses the official enquiry email", () => {
    expect(siteConfig.email).toBe("hello@auralique.agency");
  });

  it("links to the official AURALIQUE LinkedIn company page", () => {
    expect(siteConfig.linkedin).toBe("https://www.linkedin.com/company/auralique/");
  });

  it("points the follow badge at the official F6S profile", () => {
    expect(siteConfig.f6s).toBe("https://www.f6s.com/member/auralique");
    expect(siteConfig.f6sFollow).toBe("https://www.f6s.com/member/auralique?follow=1");
    expect(siteConfig.f6sBadge).toBe("https://www.f6s.com/images/f6s-follow-secondary.png");
  });

  it("points the verification badge at the official TechBehemoths profile", () => {
    expect(siteConfig.techbehemoths).toBe("https://techbehemoths.com/company/auralique");
    expect(siteConfig.techbehemothsBadge).toBe(
      "https://cdn.techbehemoths.com/public/static/validation/tb-verified-logo.svg",
    );
  });
});
