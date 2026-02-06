 type Category = {
  id: number;
  title: string;
};

 type Todo = {
  id: number;
  title: string;
  category: Category["title"];
  description:string,
  dueDate:string
  completed: boolean;
};

export type {Category,Todo}