import { useState, useEffect } from 'react';
import { getAlltodos } from '../service/todos.service';
import type { Todo } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const refresh = () => {
    setTodos(getAlltodos());
  };
  
  useEffect(() => {
    refresh();
  }, []);
  
  return { todos, refresh };
};