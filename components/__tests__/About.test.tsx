import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About", () => {
  it("mentions the mobility/finance throughline and the outside-of-work line", () => {
    render(<About />);
    expect(screen.getByText(/stock markets|chart patterns/i)).toBeInTheDocument();
    expect(screen.getByText(/cricket|football/i)).toBeInTheDocument();
  });
});
