import { describe, expect, it } from "vitest";
import { projects } from "@/lib/projects";

const urlFor = (id: string) => projects.find((project) => project.id === id)?.url;

describe("Selected Work project links", () => {
  it("links Juicy Chemistry to its confirmed store", () => {
    expect(urlFor("juicy-chemistry")).toBe("https://juicychemistry.com/");
  });

  it("links Yazijico to its confirmed store", () => {
    expect(urlFor("yazijico")).toBe("https://yazijico.com/");
  });

  it("links Body Glove to its confirmed store", () => {
    expect(urlFor("body-glove")).toBe("https://www.bodyglove.com/");
  });

  it("links Dignite Store to its confirmed store", () => {
    expect(urlFor("dignite-store")).toBe("https://www.dignitestore.com/");
  });
});
