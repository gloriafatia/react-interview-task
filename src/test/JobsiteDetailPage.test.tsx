import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobsiteDetailPage from "../pages/JobSiteDetailPage";


test("shows 'No jobsite selected' when state missing", () => {
  render(
    <MemoryRouter>
      <JobsiteDetailPage />
    </MemoryRouter>
  );
  expect(screen.getByText("No jobsite selected")).toBeInTheDocument();
});

