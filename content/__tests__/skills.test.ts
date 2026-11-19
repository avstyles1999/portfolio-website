import { describe, it, expect } from "vitest";
import { skills } from "../skills";

describe("skills data", () => {
  it("has the 5 resume skill categories", () => {
    const categories = skills.map((g) => g.category);
    expect(categories).toEqual([
      "Programming Languages",
      "Databases",
      "AI Tools & Low-Code",
      "Web Technologies",
      "Frameworks & Tools",
    ]);
  });
});
