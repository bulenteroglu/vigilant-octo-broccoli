import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PensionTracker from "@/components/pension-tracker/";

describe("PensionTracker", () => {
  it("renders PensionForm and PensionResults components", () => {
    render(<PensionTracker />);

    expect(
      screen.getByText("Desired yearly retirement income")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Employer monthly contributions")
    ).toBeInTheDocument();
    expect(screen.getByText("Your monthly contributions")).toBeInTheDocument();
    expect(screen.getByText("Desired retirement age")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Calculate" })
    ).toBeInTheDocument();
  });

  it("initially renders PensionResults with no results", () => {
    render(<PensionTracker />);

    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
