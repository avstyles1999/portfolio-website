import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "../Skills";

describe("Skills", () => {
  it("renders all 5 skill categories", () => {
    render(<Skills />);
    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
    expect(screen.getByText("Frameworks & Tools")).toBeInTheDocument();
  });
});

describe("Skills layout", () => {
  it("splits categories into two columns: languages/AI/databases left, web/frameworks right", () => {
    const { container } = render(<Skills />);
    const col = (c: string) =>
      Array.from(container.querySelectorAll(`[data-col="${c}"] h3`)).map((h) => h.textContent);
    expect(col("left")).toEqual(["Programming Languages", "AI Tools & Low-Code", "Databases"]);
    expect(col("right")).toEqual(["Web Technologies", "Frameworks & Tools"]);
  });
});

describe("Skills right column heights", () => {
  it("gives Web Technologies and Frameworks & Tools equal rows on sm+, natural heights on mobile", () => {
    const { container } = render(<Skills />);
    const right = container.querySelector('[data-col="right"]')!;
    expect(right.className).toMatch(/(^| )flex flex-col/);
    expect(right.className).toContain("sm:grid");
    expect(right.className).toContain("sm:auto-rows-fr");
    for (const card of Array.from(right.children)) {
      expect(card.className).not.toMatch(/(^| )(flex-1|h-\S+)( |$)/);
    }
  });
});
