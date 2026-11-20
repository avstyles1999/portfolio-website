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
