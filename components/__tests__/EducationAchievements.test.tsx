import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EducationAchievements from "../EducationAchievements";

describe("EducationAchievements", () => {
  it("renders degree and all achievements", () => {
    render(<EducationAchievements />);
    expect(screen.getByText(/B.E. in Information Technology/)).toBeInTheDocument();
    expect(screen.getByText(/AIR 42/)).toBeInTheDocument();
    expect(screen.getByText(/Gold Medal, SOF International Mathematics Olympiad/)).toBeInTheDocument();
    expect(screen.getByText(/Bronze Medal, SOF International Mathematics Olympiad/)).toBeInTheDocument();
  });
});
