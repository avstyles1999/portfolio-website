import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CaseStudyPage, { generateStaticParams } from "../[slug]/page";

describe("Case study page", () => {
  it("generateStaticParams returns all 6 slugs", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(6);
    expect(params.map((p) => p.slug)).toContain("prt-network-simulator");
  });

  it("renders problem, approach, and impact for a given project", async () => {
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: "prt-network-simulator" }) });
    render(ui);
    expect(screen.getByText("PRT Network Simulator")).toBeInTheDocument();
    expect(screen.getByText(/Problem/i)).toBeInTheDocument();
    expect(screen.getByText(/Approach/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact/i)).toBeInTheDocument();
  });

  it("renders prev/next case study navigation in spec order", async () => {
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: "ai-accountant-platform" }) });
    render(ui);
    expect(screen.getByRole("link", { name: /real-time routing/i })).toHaveAttribute(
      "href",
      "/projects/realtime-routing-engine"
    );
    expect(screen.getByRole("link", { name: /network operating system/i })).toHaveAttribute(
      "href",
      "/projects/network-operating-system"
    );
  });

  it("uses the shared container with no narrower width caps, so left/right margins match", async () => {
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: "prt-network-simulator" }) });
    const { container } = render(ui);
    expect(container.querySelector("[class*='max-w-2xl'],[class*='max-w-3xl'],[class*='max-w-4xl']")).toBeNull();
  });

  it("keeps header muted text readable on the gradient (darker than brand-muted, WCAG AA)", async () => {
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: "prt-network-simulator" }) });
    render(ui);
    const back = screen.getByRole("link", { name: /← Projects/ });
    const oneLiner = screen.getByText(/browser-based simulator for designing/i);
    for (const el of [back, oneLiner]) {
      expect(el.className).not.toMatch(/text-brand-muted/);
      expect(el.className).toMatch(/text-gray-600/);
    }
  });
});
