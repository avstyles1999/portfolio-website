import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsGrid from "../ProjectsGrid";

describe("ProjectsGrid", () => {
  it("renders 6 project cards in spec order with links to case studies", () => {
    render(<ProjectsGrid />);
    const links = screen.getAllByRole("link", { name: /read case study/i });
    expect(links).toHaveLength(6);
    expect(links[0]).toHaveAttribute("href", "/projects/prt-network-simulator");
    expect(links[5]).toHaveAttribute("href", "/projects/goldman-tca-platform");
  });
});
