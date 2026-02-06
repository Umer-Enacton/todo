import React, { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import Drawer from "./Drawer";
import ConfirmDialog from "./ConfirmDialog";
import { toggleTodo } from "../service/todos.service";
import { useSearchParams } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { toast } from "sonner";
import Button from "./Button";
import Checkbox from "./Checkbox";

const Card: React.FC = () => {
  const { todos, refresh } = useTodos();
  const [isEditing, SetIsEditing] = useState(false);
  const [id, setId] = useState();
  const [isDeleting, SetIsDeleting] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryFilter = searchParams.get("category") || "";
  const statusFilter = searchParams.get("status") || "";

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery) ||
      todo.description.toLowerCase().includes(searchQuery);
    const matchesCategory = !categoryFilter || todo.category === categoryFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === "Completed" && todo.completed) ||
      (statusFilter === "Pending" && !todo.completed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getEmptyMessage = () => {
    if (searchQuery) {
      return {
        title: "No matching todos",
        description: `No todos found for "${searchQuery}"`,
      };
    }

    if (categoryFilter) {
      return {
        title: "No todos in this category",
        description: `There are no todos under "${categoryFilter}"`,
      };
    }

    if (statusFilter === "Completed") {
      return {
        title: "No completed todos",
        description: "You have not completed any todos yet",
      };
    }

    if (statusFilter === "Pending") {
      return {
        title: "No pending todos",
        description: "All your todos are completed 🎉",
      };
    }

    return {
      title: "No todos yet",
      description: 'Click "New Todo" to get started',
    };
  };

  const emptyState = getEmptyMessage();

  const handleEdit = (id: any) => {
    setId(id);
    SetIsEditing(true);
  };
  const handleDelete = (id: any) => {
    setId(id);
    SetIsDeleting(true);
  };

  const handleNew = () => {
    SetIsOpen(true);
  };
  const handleToggle = (id: any) => {
    const result = toggleTodo(id);

    if (!result.success) {
      toast.error(result.msg);
    } else {
      toast.success(result.msg);
    }

    refresh(); // refresh UI
  };

  const dataById = todos.filter((item) => item.id == id);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 w-full mt-3.5">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Todos
        </h1>

        {isOpen && (
          <Drawer
            mode="New"
            isOpen={isOpen}
            SetIsOpen={SetIsOpen}
            onRefresh={refresh}
          />
        )}

        {isEditing && (
          <Drawer
            mode="Edit"
            isOpen={isEditing}
            SetIsOpen={SetIsEditing}
            data={dataById}
            onRefresh={refresh}
          />
        )}

        {isDeleting && (
          <ConfirmDialog
            isOpen={isDeleting}
            SetIsOpen={SetIsDeleting}
            data={dataById}
            onRefresh={refresh}
          />
        )}

        {/* <button
        onClick={handleNew}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-sm"
      >
        <Plus className="w-4 h-4" />
        New Todo
      </button> */}
        <Button onClick={handleNew} variant="primary">
          {" "}
          <Plus className="w-4 h-4" />
          New Todo
        </Button>
      </div>

      {/* Content */}
      {filteredTodos.length === 0 ? (
        /* Empty State */
        <div className="flex h-64 w-full flex-col items-center justify-center text-center px-4">
          <p className="text-base sm:text-lg font-medium text-gray-500">
            {emptyState.title}
          </p>
          <p className="mt-1 text-sm text-gray-400">{emptyState.description}</p>
        </div>
      ) : (
        /* Todo Grid */
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-5 w-full pb-8"
        >
          {filteredTodos.map((t) => (
            <li
              key={t.id}
              className="col-span-1 divide-gray-200 rounded-lg bg-white shadow group hover:shadow-lg transition-shadow"
            >
              {/* Actions */}
              <div className="text-sm flex justify-end mx-2.5 mt-1 -mb-6 gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity sm:invisible sm:group-hover:visible">
                <div className="flex gap-1">
                  {/* <button
                  onClick={() => handleEdit(t.id)}
                  className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-green-600 rounded transition"
                  aria-label="Edit todo"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button> */}
                  <Button onClick={() => handleEdit(t.id)} variant="edit">
                    {" "}
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  {/* <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded transition"
                  aria-label="Delete todo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button> */}
                  <Button onClick={() => handleDelete(t.id)} variant="delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex w-full items-center justify-between space-x-6 p-4 sm:p-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
                    <div
                      className={`shrink-0 mt-0.5 sm:mt-0 ${
                        t.completed ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <Checkbox
                        checked={t.completed}
                        onChange={() => handleToggle(t.id)}
                        aria-label={`Mark "${t.title}" as ${t.completed ? "completed" : "incomplete"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-medium break-words ${
                          t.completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {t.title}
                      </h3>
                    </div>

                    <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {t.category}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {t.description}
                  </p>

                  {t.dueDate && (
                    <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                      <span className="font-medium">Due:</span>
                      {new Date(t.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        // <CardSkeletonGrid/>
      )}
    </>
  );
};

export default Card;
