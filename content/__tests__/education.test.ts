import { describe, it, expect } from "vitest";
import { education } from "../education";

describe("education data", () => {
  it("has the correct degree and 3 achievements", () => {
    expect(education.degree).toBe("B.E. in Information Technology");
    expect(education.institution).toBe("Jadavpur University");
    expect(education.achievements).toHaveLength(3);
  });
});
