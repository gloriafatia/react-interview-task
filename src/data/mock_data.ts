export const categoriesData = [
  { id: 1, label: "Sidewalk Shed", color: "#67aa3c" },
  { id: 2, label: "Scaffold", color: "#efd652" },
  { id: 3, label: "Shoring", color: "#9640be" },
]

export const jobsitesData = [
  {
    id: 1,
    name: "1658 E 23rd St, Brooklyn, NY",
    status: "Completed",
    categories: [1, 2],
  },
  {
    id: 2,
    name: "1705 E 22nd St, Brooklyn, NY",
    status: "On Hold",
    categories: [2],
  },
  {
    id: 3,
    name: "47 Lake St, Brooklyn, NY",
    status: "Completed",
    categories: [1, 3],
  },
  {
    id: 4,
    name: "256 Bay 19th St, Brooklyn, NY",
    status: "On Road",
    categories: [1],
  },
  {
    id: 5,
    name: "5908 13th Ave, Brooklyn, NY",
    status: "On Hold",
    categories: [2, 3],
  },
  {
    id: 6,
    name: "588 Lenox Rd, Brooklyn, NY",
    status: "On Road",
    categories: [1, 2, 3],
  },
  {
    id: 7,
    name: "220 Manhattan Ave, Brooklyn, NY",
    status: "In Progress",
    categories: [3],
  },
  {
    id: 8,
    name: "12 Atlantic Ave, Brooklyn, NY",
    status: "In Progress",
    categories: [1, 2],
  },
  {
    id: 9,
    name: "98 Flatbush Ave, Brooklyn, NY",
    status: "Completed",
    categories: [2],
  },
  {
    id: 10,
    name: "77 Bedford Ave, Brooklyn, NY",
    status: "On Road",
    categories: [1, 3],
  },
  {
    id: 11,
    name: "401 Ocean Pkwy, Brooklyn, NY",
    status: "In Progress",
    categories: [1],
  },
  {
    id: 12,
    name: "15 Kings Hwy, Brooklyn, NY",
    status: "On Hold",
    categories: [2, 3],
  },
  ];
  export const itemsData = [
  { id: 1, jobId: 1, categoryId: 1, nr: 1, item: "G4", quantity: 120, description: "Vertical post", notes: "Check for surface rust before use" },
  { id: 2, jobId: 1, categoryId: 1, nr: 2, item: "G6", quantity: 80, description: "Horizontal beam", notes: "Ensure correct length for layout" },
  { id: 3, jobId: 1, categoryId: 2, nr: 3, item: "PL-12", quantity: 40, description: "Steel plank", notes: "Heavy item, handle with care" },
  { id: 4, jobId: 1, categoryId: 2, nr: 4, item: "CLP", quantity: 200, description: "Coupler", notes: "Verify locking mechanism" },

  { id: 5, jobId: 2, categoryId: 2, nr: 5, item: "PL-10", quantity: 60, description: "Aluminum plank", notes: "Lightweight, suitable for upper levels" },
  { id: 6, jobId: 2, categoryId: 2, nr: 6, item: "STD-6", quantity: 90, description: "Standard 6ft", notes: "Standard spacing required" },
  { id: 7, jobId: 2, categoryId: 2, nr: 7, item: "LED", quantity: 150, description: "Ledger", notes: "Inspect joints before assembly" },

  { id: 8, jobId: 3, categoryId: 1, nr: 8, item: "POST-8", quantity: 70, description: "Post 8ft", notes: "Use base plates on uneven ground" },
  { id: 9, jobId: 3, categoryId: 3, nr: 9, item: "SH-BEAM", quantity: 25, description: "Shoring beam", notes: "Critical load-bearing element" },
  { id: 10, jobId: 3, categoryId: 3, nr: 10, item: "SH-JACK", quantity: 45, description: "Adjustable jack", notes: "Adjust height gradually" },

  { id: 11, jobId: 4, categoryId: 1, nr: 11, item: "G4", quantity: 100, description: "Vertical post", notes: "Confirm alignment during setup" },
  { id: 12, jobId: 4, categoryId: 1, nr: 12, item: "G8", quantity: 55, description: "Beam 8ft", notes: "Requires two-person handling" },

  { id: 13, jobId: 5, categoryId: 2, nr: 13, item: "PL-14", quantity: 35, description: "Heavy plank", notes: "Use only on reinforced sections" },
  { id: 14, jobId: 5, categoryId: 3, nr: 14, item: "SH-PLATE", quantity: 60, description: "Base plate", notes: "Ensure firm ground contact" },
  { id: 15, jobId: 5, categoryId: 3, nr: 15, item: "SH-TUBE", quantity: 80, description: "Support tube", notes: "Check straightness before use" },

  { id: 16, jobId: 6, categoryId: 1, nr: 16, item: "POST-10", quantity: 90, description: "Post 10ft", notes: "Secure with cross bracing" },
  { id: 17, jobId: 6, categoryId: 2, nr: 17, item: "STD-8", quantity: 110, description: "Standard 8ft", notes: "Commonly used for main frames" },
  { id: 18, jobId: 6, categoryId: 3, nr: 18, item: "SH-JACK", quantity: 40, description: "Adjustable jack", notes: "Lubricate threads if stiff" },
  { id: 19, jobId: 6, categoryId: 2, nr: 19, item: "CLP", quantity: 300, description: "Coupler", notes: "High-usage item, keep spare stock" },

  { id: 20, jobId: 7, categoryId: 3, nr: 20, item: "SH-BEAM", quantity: 50, description: "Steel beam", notes: "Load rating must be respected" },
  { id: 21, jobId: 7, categoryId: 3, nr: 21, item: "SH-JACK", quantity: 60, description: "Jack", notes: "Do not exceed max extension" },

  { id: 22, jobId: 8, categoryId: 1, nr: 22, item: "G6", quantity: 85, description: "Beam 6ft", notes: "Used mainly for side bracing" },
  { id: 23, jobId: 8, categoryId: 2, nr: 23, item: "PL-12", quantity: 45, description: "Steel plank", notes: "Check surface for slipping" },
  { id: 24, jobId: 8, categoryId: 2, nr: 24, item: "LED", quantity: 130, description: "Ledger", notes: "Install before decking" },

  { id: 25, jobId: 9, categoryId: 2, nr: 25, item: "STD-6", quantity: 70, description: "Standard", notes: "Suitable for compact structures" },
  { id: 26, jobId: 9, categoryId: 2, nr: 26, item: "PL-10", quantity: 40, description: "Plank", notes: "Do not overload" },

  { id: 27, jobId: 10, categoryId: 1, nr: 27, item: "POST-8", quantity: 95, description: "Vertical post", notes: "Verify verticality with level" },
  { id: 28, jobId: 10, categoryId: 3, nr: 28, item: "SH-TUBE", quantity: 65, description: "Tube", notes: "Used for temporary support" },

  { id: 29, jobId: 11, categoryId: 1, nr: 29, item: "G4", quantity: 110, description: "Post", notes: "Standard stock item" },
  { id: 30, jobId: 11, categoryId: 1, nr: 30, item: "G6", quantity: 75, description: "Beam", notes: "Inspect ends for damage" },

  { id: 31, jobId: 12, categoryId: 2, nr: 31, item: "STD-8", quantity: 100, description: "Standard", notes: "Main vertical support" },
  { id: 32, jobId: 12, categoryId: 3, nr: 32, item: "SH-PLATE", quantity: 55, description: "Base plate", notes: "Distribute load evenly" },
  { id: 33, jobId: 12, categoryId: 3, nr: 33, item: "SH-JACK", quantity: 70, description: "Jack", notes: "Inspect threads regularly" },
];
