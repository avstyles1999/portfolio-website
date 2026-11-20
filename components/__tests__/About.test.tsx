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

describe("About trimmed copy", () => {
  it("omits Zoho Creator and the team-by-team fandom list", () => {
    const { container } = render(<About />);
    expect(container.textContent).not.toMatch(/Zoho Creator|KKR|Barcelona|Messi/);
  });
});
