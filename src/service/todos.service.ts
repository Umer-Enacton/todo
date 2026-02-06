import type { Todo } from "../types";

export const getAlltodos = (): Todo[] => {
    const raw = localStorage.getItem('Todos')
    if (!raw) return []
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : [parsed]
    } catch (e) {
        return []
    }
}

export const createNewTodo = (todo: Todo) => {
    const todos = getAlltodos()
    todos.push(todo)
    localStorage.setItem('Todos', JSON.stringify(todos))
    return {
        success: true,
        msg: 'Todo created successfully.'
    }
}

export const updateTodo = ({ id, todo }: { id: any; todo: Todo }) => {
    const todos = getAlltodos()
    const updated = todos.map((t) => (t.id === id ? { ...t, ...todo } : t))
    localStorage.setItem('Todos', JSON.stringify(updated))
    return {
        success: true,
        msg: 'Todo updated successfully.'
    }
}
export const toggleTodo = (id: any) => {
  const todos = getAlltodos();
  const todo = todos.find(t => t.id === id);

  // Check if already completed
//   if (todo?.completed) {
//     return {
//       success: false,
//       msg: "Completed todos cannot be uncompleted.",
//     };
//   }

//   const updated = todos.map((t) =>
//     t.id === id ? { ...t, completed: true } : t
//   );

//   localStorage.setItem("Todos", JSON.stringify(updated));

//   return {
//     success: true,
//     msg: "Todo completed successfully.",
//   };

   if (todo?.completed) {
    const updated = todos.map((t) =>
    t.id === id ? { ...t, completed: false } : t
);
    localStorage.setItem("Todos", JSON.stringify(updated));
     return {
    success: true,
    msg: "Todo Uncompleted successfully.",
  };
}
  else{
     const updated = todos.map((t) =>
     t.id === id ? { ...t, completed: true } : t
    );
    localStorage.setItem("Todos", JSON.stringify(updated));
     return {
    success: true,
    msg: "Todo completed successfully.",
  };
  }
  
}



export const deleteTodo = (id: any) => {
    const todos = getAlltodos()
    const filtered = todos.filter((t) => t.id !== id)
    localStorage.setItem('Todos', JSON.stringify(filtered))
    return { success: true, msg: 'Todo deleted.' }
}