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
