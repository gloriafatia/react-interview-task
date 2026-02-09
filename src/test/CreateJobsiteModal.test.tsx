import { render, screen, fireEvent } from "@testing-library/react";
import CreateJobsiteModal from "../components/CreateJobsiteModal";
import { vi } from "vitest";

describe("CreateJobsiteModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSave.mockClear();
  });

  test("calls onClose when cancel button clicked", () => {
    render(
      <CreateJobsiteModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );
    fireEvent.click(screen.getByText("Cancel Changes"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("shows error if required fields are empty", () => {
    render(
      <CreateJobsiteModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );
    fireEvent.click(screen.getByText("Save Changes"));
    expect(
      screen.getByText("Filling all fields is required!"),
    ).toBeInTheDocument();
  });

  test("calls onSave with correct data", () => {
    render(
      <CreateJobsiteModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Type the jobsite's name"), {
      target: { value: "Test Jobsite" },
    });

    fireEvent.click(screen.getByText("Select"));
    fireEvent.click(screen.getByText("Sidewalk Shed"));

    fireEvent.click(screen.getByText("Select one"));
    fireEvent.click(screen.getByText("Completed"));

    fireEvent.click(screen.getByText("Save Changes"));
    expect(mockOnSave).toHaveBeenCalledWith({
      name: "Test Jobsite",
      categories: [1], 
      status: "Completed",
    });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
