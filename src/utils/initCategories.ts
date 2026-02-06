export const initCategories = () => {
  const existing = localStorage.getItem("Categories");

  if (!existing) {
    const defaultCategories = [
      {
        id: 1,
        title: "General",
      },
      {
        id: 2,
        title: "Work",
      },
      {
        id: 3,
        title: "Personal",
      },
    ];
    localStorage.setItem("Categories", JSON.stringify(defaultCategories));
  }
};
