import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Section, { CONTAINER } from "../Section";
import Page from "@/app/page";

describe("Section", () => {
  it("renders eyebrow, title as h2, and anchor id", () => {
    const { container } = render(
      <Section id="skills" eyebrow="Toolkit" title="Skills">
        <p>body</p>
      </Section>
    );
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeInTheDocument();
    expect(screen.getByText("Toolkit")).toBeInTheDocument();
    expect(container.querySelector("section#skills")).not.toBeNull();
  });

  it("every homepage section uses the same inner container so edges align", () => {
    const { container } = render(<Page />);
    const sections = Array.from(container.querySelectorAll("main > section"));
    expect(sections.length).toBe(7);
    for (const s of sections) {
      expect((s.firstElementChild as HTMLElement).className).toContain(CONTAINER);
    }
  });
});

describe("Full-width content", () => {
  it("no homepage section below the hero caps its content narrower than the container", () => {
    const { container } = render(<Page />);
    const sections = Array.from(container.querySelectorAll("main > section")).slice(1);
    for (const s of sections) {
      expect(s.querySelector("[class*='max-w-2xl'],[class*='max-w-3xl']")).toBeNull();
    }
  });
});
