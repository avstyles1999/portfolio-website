import { describe, it, expect } from "vitest";
import { projects } from "../projects";

describe("projects data", () => {
  it("has exactly 6 projects with unique slugs in spec order", () => {
    expect(projects).toHaveLength(6);
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toEqual([
      "prt-network-simulator",
      "realtime-routing-engine",
      "ai-accountant-platform",
      "network-operating-system",
      "diagnostic-watchdog",
      "goldman-tca-platform",
    ]);
    expect(new Set(slugs).size).toBe(6);
  });

  it("every project has non-empty problem, approach, and at least one impact metric", () => {
    projects.forEach((p) => {
      expect(p.problem.length).toBeGreaterThan(0);
      expect(p.approach.length).toBeGreaterThan(0);
      expect(p.impact.length).toBeGreaterThan(0);
    });
  });

  it("network-operating-system lists Node.js/Express/MongoDB in its tech stack", () => {
    const nos = projects.find((p) => p.slug === "network-operating-system")!;
    expect(nos.techStack).toEqual(expect.arrayContaining(["Node.js", "Express", "MongoDB"]));
  });
});
