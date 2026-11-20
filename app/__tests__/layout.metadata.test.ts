import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "font-inter" }) }));

describe("root layout metadata", () => {
  it("has Open Graph tags so the homepage link previews on LinkedIn", async () => {
    const { metadata } = await import("../layout");
    expect(metadata.openGraph).toMatchObject({
      title: metadata.title,
      description: metadata.description,
      type: "website",
    });
  });
});
