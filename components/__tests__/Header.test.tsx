import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders a home link and a resume link", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /anmol verma/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute("href", "/resume.pdf");
  });

  it("resume link downloads the file instead of opening it", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute("download", "Anmol-Verma-Resume.pdf");
  });

  it("links to the main homepage sections", () => {
    render(<Header />);
    for (const [name, href] of [
      ["About", "/#about"],
      ["Experience", "/#experience"],
      ["Projects", "/#projects"],
      ["Contact", "/#contact"],
    ]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("section links only apply hover styles on devices that really hover (no sticky underline after a tap)", () => {
    render(<Header />);
    for (const name of ["About", "Experience", "Projects", "Contact"]) {
      const tokens = screen.getByRole("link", { name }).className.split(/\s+/);
      expect(tokens.filter((t) => t.startsWith("hover:"))).toEqual([]);
    }
  });

  it("AV badge only grows on hover on devices that really hover (no stuck scale after a tap)", () => {
    render(<Header />);
    const tokens = screen.getByText("AV").className.split(/\s+/);
    expect(tokens.filter((t) => t.startsWith("group-hover:"))).toEqual([]);
    expect(tokens).toContain("[@media(hover:hover)]:group-hover:scale-105");
  });

  it("logo name only turns green on hover on devices that really hover (no stuck colour after a tap)", () => {
    render(<Header />);
    const tokens = screen.getByText("Anmol Verma").className.split(/\s+/);
    expect(tokens.filter((t) => t.startsWith("group-hover:"))).toEqual([]);
    expect(tokens).toContain("[@media(hover:hover)]:group-hover:text-brand-accent");
  });
});
