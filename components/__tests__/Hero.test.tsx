import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
  it("renders name, role, and both CTAs", () => {
    render(<Hero />);
    expect(screen.getByText(/Anmol Verma/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute("href", "/resume.pdf");
  });
});

describe("Hero copy and CTAs", () => {
  it("tagline does not narrow to transportation or finance", () => {
    render(<Hero />);
    const tagline = screen.getByText(/I build real-time, safety-critical systems/i);
    expect(tagline.textContent).not.toMatch(/transportation|finance/i);
  });

  it("both CTAs share the same button style", () => {
    render(<Hero />);
    const projects = screen.getByRole("link", { name: /view projects/i });
    const resume = screen.getByRole("link", { name: /download resume/i });
    expect(resume.className).toBe(projects.className);
  });
});
