import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobsiteListPage from "../pages/JobsiteListPage";

test("renders jobsite list and search input", () => {
  render(
    <MemoryRouter>
      <JobsiteListPage />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText("Search a jobsite")).toBeInTheDocument();
});

test("opens CreateJobsiteModal when Create button clicked", () => {
  render(
    <MemoryRouter>
      <JobsiteListPage />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText("Create"));
  expect(screen.getByText("Name")).toBeInTheDocument(); 
});
