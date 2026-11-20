import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders a home link and a resume link", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /anmol verma/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute("href", "/resume.pdf");
  });
});
