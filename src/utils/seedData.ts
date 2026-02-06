export const seedData = () => {
  const existingTodos = localStorage.getItem("Todos");
  const existingCategories = localStorage.getItem("Categories");

  // Seed Categories
  if (!existingCategories) {
    const defaultCategories = [
      { id: 1, title: "General" },
      { id: 2, title: "Work" },
      { id: 3, title: "Personal" },
      { id: 4, title: "Shopping" },
      { id: 5, title: "Health" },
    ];
    localStorage.setItem("Categories", JSON.stringify(defaultCategories));
  }

  // Seed Todos
  if (!existingTodos) {
    const defaultTodos = [
      {
        id: 1,
        title: "Complete project proposal",
        description: "Finish the Q1 project proposal and send it to the team for review",
        category: "Work",
        dueDate: "2026-01-25",
        completed: false,
      },
      {
        id: 2,
        title: "Buy groceries",
        description: "Get milk, eggs, bread, and vegetables from the supermarket",
        category: "Shopping",
        dueDate: "2026-01-22",
        completed: false,
      },
      {
        id: 3,
        title: "Morning workout",
        description: "30 minutes cardio and 20 minutes strength training",
        category: "Health",
        dueDate: "2026-01-20",
        completed: true,
      },
      {
        id: 4,
        title: "Call mom",
        description: "Check in with mom about weekend plans",
        category: "Personal",
        dueDate: "2026-01-23",
        completed: false,
      },
      {
        id: 5,
        title: "Review code pull requests",
        description: "Review and approve pending PRs from the development team",
        category: "Work",
        dueDate: "2026-01-21",
        completed: true,
      },
      {
        id: 6,
        title: "Book dentist appointment",
        description: "Schedule regular checkup for next month",
        category: "Health",
        dueDate: "2026-02-15",
        completed: false,
      },
      {
        id: 7,
        title: "Organize desk",
        description: "Clean and organize workspace for better productivity",
        category: "Personal",
        dueDate: "2026-01-24",
        completed: false,
      },
      {
        id: 8,
        title: "Team meeting preparation",
        description: "Prepare slides and agenda for Monday's team standup",
        category: "Work",
        dueDate: "2026-01-27",
        completed: false,
      },
      {
        id: 9,
        title: "Buy birthday gift",
        description: "Get a present for Sarah's birthday party this weekend",
        category: "Shopping",
        dueDate: "2026-01-26",
        completed: false,
      },
      {
        id: 10,
        title: "Read 30 pages",
        description: "Continue reading 'Atomic Habits' before bed",
        category: "Personal",
        dueDate: "2026-01-21",
        completed: true,
      },
    ];
    localStorage.setItem("Todos", JSON.stringify(defaultTodos));
  }
};