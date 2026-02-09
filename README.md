Flex Business Solutions - Inventory Management App

This project is a React + TypeScript + Vite application for managing job sites and their inventories. It implements a user-friendly interface where you can create job sites, view inventory, search/filter items, and update inventory details.

The UI is based on the Figma design https://www.figma.com/design/uOxY3AiUFaGuxsU9nk0H1O/ReactJs-Test?node-id=451-180&t=LtKxDyHSyQb9mfnS-0

Features:
-Job Sites List
-View all job sites with their status.
-Search and filter job sites by name.
-Create new job sites with associated categories.
-Inventory Dashboard
-Click a job site to view its inventory dashboard.
-Search and filter items by name or category.
-Update items by double-clicking a table cell, editing details in a modal, and saving changes.
-Changes automatically update the table in real-time.

-Responsive and Clean UI
-Fully aligned with the Figma design.
-Uses reusable components for modals, badges.
-Local Storage Persistence

Job sites and inventory items are persisted locally, allowing page reload without losing data.

-Unit Testing
-Includes basic unit tests for core functionality (adding job sites, updating inventory, searching).

Getting Started
Prerequisites

Make sure you have Node.js 18+ and npm installed.

Install dependencies
npm install

Run the development server
npm run dev

The app will be available at http://localhost:5173
.

Build for production
npm run build

Run tests
npm run test

Project Structure

src/
├─ components/ # Reusable UI components (Modal, Badge)
├─ data/ # Mock data for job sites and inventory items
├─ hooks/ # Custom hooks (e.g., useLocalStorage)
├─ pages/ # Page-level components (JobsiteList, InventoryDashboard)
├─ types/ # TypeScript type definitions
└─ test/

Question 1:
How to Make the App More Secure?
-Implement authentication and role-based access control (only authorized users can edit inventory).
-Validate and sanitize all user inputs to prevent XSS or injection attacks.
-Use HTTPS for all requests in production.
-Store sensitive data securely (avoid storing in localStorage for production).

Question 2:
How to Scale to Millions of Records
-Replace local storage with a backend database (e.g., PostgreSQL, MongoDB) and implement proper API endpoints.
-Use server-side pagination, filtering, and sorting to avoid rendering large datasets on the client.

Screenshots
![Screenshot](assets/JobSite.png)
![Screenshot](assets/JobSiteModal.png)
![Screenshot](assets/ItemModal.png)
![Screenshot](assets/JobSiteDetail.png)
![Screenshot](assets/Categories.png)
