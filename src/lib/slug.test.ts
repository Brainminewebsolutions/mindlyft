import { describe, expect, it } from "vitest";
import { isNumericId, toSlug } from "./slug";

describe("isNumericId", () => {
  it("accepts digit-only values", () => {
    expect(isNumericId("42")).toBe(true);
  });

  it("rejects slugs, empty strings and mixed values", () => {
    expect(isNumericId("ai-basics")).toBe(false);
    expect(isNumericId("")).toBe(false);
    expect(isNumericId("12a")).toBe(false);
  });
});

describe("toSlug", () => {
  it("lowercases and hyphenates words", () => {
    expect(toSlug("Generative AI Basics")).toBe("generative-ai-basics");
  });

  it("drops punctuation and collapses repeated separators", () => {
    expect(toSlug("AI & ML:  The   Future!")).toBe("ai-ml-the-future");
  });
});
