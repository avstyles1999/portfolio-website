import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact", () => {
  it("renders mailto, LinkedIn, and GitHub links", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/anmol-verma-966955170"
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/avstyles1999");
  });
});

describe("Contact icons", () => {
  it("each contact link shows a decorative icon", () => {
    render(<Contact />);
    for (const name of [/email/i, /linkedin/i, /github/i]) {
      const svg = screen.getByRole("link", { name }).querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });
});
