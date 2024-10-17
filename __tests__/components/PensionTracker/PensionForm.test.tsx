import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PensionForm from "../../../components/pension-tracker/PensionForm";
import { calculatePensionAtRetirement } from "@/lib/pensionCalculations";

jest.mock("../../../lib/pensionCalculations", () => ({
  calculatePensionAtRetirement: jest.fn(),
}));

describe("PensionForm", () => {
  it("displays error message when form is submitted with invalid input", async () => {
    const mockSetResults = jest.fn();

    render(<PensionForm setResults={mockSetResults} />);

    // Submit the form without filling it out
    fireEvent.click(screen.getByText("Calculate"));

    // Check if error message appears
    await waitFor(() => {
      expect(screen.getAllByText("Expected number, received nan")).toHaveLength(
        4
      );
    });

    // Ensure calculatePensionAtRetirement was not called
    expect(calculatePensionAtRetirement).not.toHaveBeenCalled();
  });

  it("displays error message when form is submitted with invalid input", async () => {
    const mockSetResults = jest.fn();

    render(<PensionForm setResults={mockSetResults} />);

    // Fill out the form with invalid input (character instead of number)
    fireEvent.change(
      screen.getByPlaceholderText("Desired yearly retirement income"),
      { target: { value: -1 } }
    );

    // Submit the form
    fireEvent.click(screen.getByText("Calculate"));

    // Check if error message appears
    await waitFor(() => {
      expect(
        screen.getByText("Retirement income must be positive")
      ).toBeInTheDocument();
    });

    // Ensure calculatePensionAtRetirement was not called
    expect(calculatePensionAtRetirement).not.toHaveBeenCalled();
  });

  it("submits form with correct values", async () => {
    const mockSetResults = jest.fn();

    render(<PensionForm setResults={mockSetResults} />);

    // Fill out the form
    fireEvent.change(
      screen.getByPlaceholderText("Desired yearly retirement income"),
      { target: { value: "50000" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Employer monthly contributions"),
      { target: { value: "500" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Your monthly contributions"),
      { target: { value: "300" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Desired retirement age"), {
      target: { value: "65" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Calculate"));

    await waitFor(() => {
      expect(calculatePensionAtRetirement).toHaveBeenCalled();
      expect(calculatePensionAtRetirement).toHaveBeenCalledWith(
        50000,
        500,
        300,
        65
      );
    });
  });
});
