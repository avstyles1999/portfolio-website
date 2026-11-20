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
