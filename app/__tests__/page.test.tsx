import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../page";

describe("Homepage", () => {
  it("renders all homepage sections", () => {
    render(<Page />);
    expect(screen.getByText("Anmol Verma")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Education & Achievements")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /read case study/i })).toHaveLength(6);
    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
  });
});
