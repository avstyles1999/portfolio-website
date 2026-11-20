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
});
