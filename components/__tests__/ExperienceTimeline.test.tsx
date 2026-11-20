import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperienceTimeline from "../ExperienceTimeline";

describe("ExperienceTimeline", () => {
  it("renders all 3 professional roles", () => {
    render(<ExperienceTimeline />);
    expect(screen.getByText("Team Lead Software Development")).toBeInTheDocument();
    expect(screen.getByText("Software Development Engineer")).toBeInTheDocument();
    expect(screen.getByText("Analyst")).toBeInTheDocument();
    expect(screen.getByText("Goldman Sachs")).toBeInTheDocument();
  });
});
