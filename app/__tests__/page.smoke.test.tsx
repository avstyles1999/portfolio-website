import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../page";

describe("Homepage scaffold", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(document.body).toBeInTheDocument();
  });
});
