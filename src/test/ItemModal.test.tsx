import { render, screen, fireEvent } from "@testing-library/react";
import ItemModal from "../components/ItemModal";
import { itemsData } from "../data/mock_data";
import { vi } from "vitest";

describe("ItemModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  const sampleItem = { ...itemsData[0] };
  const filteredItems = itemsData.filter(
    (it) =>
      it.categoryId === sampleItem.categoryId &&
      it.jobId === sampleItem.jobId
  );

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSave.mockClear();
  });

  test("renders correctly when open with all form values and filtered items", () => {
    render(
      <ItemModal
        isOpen={true}
        item={sampleItem}
        availableItems={filteredItems}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const itemSelect = screen.getByRole("combobox") as HTMLSelectElement;
    expect(itemSelect).toBeInTheDocument();
    expect(itemSelect.value).toBe(sampleItem.item);

    const options = Array.from(itemSelect.options).map((o) => o.value);

    const expectedOptions = ["", ...filteredItems.map((i) => i.item)]
    expect(options).toEqual(expectedOptions);

    const quantityInput = screen.getByLabelText("Quantity") as HTMLInputElement;
    expect(quantityInput.value).toBe(String(sampleItem.quantity));

    const descriptionInput = screen.getByLabelText("Description") as HTMLTextAreaElement;
    expect(descriptionInput.value).toBe(sampleItem.description);

    const notesInput = screen.getByLabelText("Notes") as HTMLTextAreaElement;
    expect(notesInput.value).toBe(sampleItem.notes || "");
  });

  test("shows error if quantity or description empty", () => {
    render(
      <ItemModal
        isOpen={true}
        item={{ ...sampleItem, quantity: 0, description: "" }}
        availableItems={filteredItems}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.click(screen.getByText("Save Changes"));
    expect(
      screen.getByText("Quantity and Description are required!")
    ).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("calls onSave with updated item", () => {
    render(
      <ItemModal
        isOpen={true}
        item={{ ...sampleItem, quantity: 0, description: "" }}
        availableItems={filteredItems}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New description" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        quantity: "10",
        description: "New description",
      })
    );
    expect(mockOnClose).toHaveBeenCalled();
  });
});
