import { describe, it, expect } from "vitest";
import { experience } from "../experience";

describe("experience data", () => {
  it("has exactly 3 professional roles in reverse-chronological order", () => {
    expect(experience).toHaveLength(3);
    expect(experience[0].company).toBe("Cellprop Private Limited");
    expect(experience[0].title).toBe("Team Lead Software Development");
    expect(experience[2].company).toBe("Goldman Sachs");
  });

  it("every entry has at least 2 highlights", () => {
    experience.forEach((entry) => {
      expect(entry.highlights.length).toBeGreaterThanOrEqual(2);
    });
  });
});
