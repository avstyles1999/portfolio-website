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

describe("Education and achievements are separate cards", () => {
  it("does not nest achievements inside the degree card, and shows details", () => {
    render(<EducationAchievements />);
    const degreeCard = screen.getByText("B.E. in Information Technology").closest("[data-card]");
    const achievementsHeading = screen.getByRole("heading", { name: "Achievements" });
    expect(degreeCard).not.toBeNull();
    expect(degreeCard!.contains(achievementsHeading)).toBe(false);
    expect(screen.getByText(/global coding competition/)).toBeInTheDocument();
  });
});
