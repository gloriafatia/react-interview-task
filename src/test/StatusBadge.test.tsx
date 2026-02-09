import { render, screen } from "@testing-library/react";
import StatusBadge from "../components/StatusBadge";

describe("StatusBadge", () => {
  test("renders correct status text", () => {
    render(<StatusBadge status="Completed" />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("applies correct background color", () => {
    const { container } = render(<StatusBadge status="On Hold" />);
    expect(container.firstChild).toHaveClass("bg-[#fe4c4a]");
  });
});
