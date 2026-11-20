import { describe, it, expect } from "vitest";
import nextConfig from "../next.config";

describe("next.config", () => {
  it("exports with trailing slashes so /projects/<slug> resolves on any static host", () => {
    expect(nextConfig.output).toBe("export");
    expect(nextConfig.trailingSlash).toBe(true);
  });
});
