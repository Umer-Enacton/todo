import React, { useEffect, useState } from "react";
import { type Category, type Todo } from "../types";
import { createNewTodo, updateTodo } from "../service/todos.service";
import { createCategory, getAllCategories } from "../service/category.service";
import { toast } from "sonner";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
type Props = {
  data?: Todo[];
  mode: string;
  onSuccess: () => void;
  SetIsOpen: (open: boolean) => void;
};

type FormErrors = {
  title?: string;
  dueDate?: string;
  category?: string;
};

const Form: React.FC<Props> = ({ data, mode, onSuccess, SetIsOpen }: Props) => {
  const currentDetails = data?.[0];
  const title = currentDetails?.title ?? "";
  const description = currentDetails?.description ?? "";
  const category = currentDetails?.category ?? "";
  const dueDate = currentDetails?.dueDate ?? "";
  const [categories, SetCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    SetCategories(getAllCategories());
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "General"
  );
  const [otherCategory, setOtherCategory] = useState<string>("");

  const [formData, setFormData] = useState({
    title: title,
    description: description,
    category: category || "General",
    dueDate: dueDate,
  });

  // Validation function
  const validateForm = (e?: React.MouseEvent): boolean => {
    e?.preventDefault();
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    // Due date validation
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare only dates

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    // Category validation
    if (selectedCategory === "Other" && !otherCategory.trim()) {
      newErrors.category = "Please enter a category name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();

    if (!validateForm(e)) {
      return;
    }

    if (otherCategory) {
      createCategory({ id: Date.now(), title: otherCategory });
    }

    const todo: Todo = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: selectedCategory === "Other" ? otherCategory : selectedCategory,
      dueDate: formData.dueDate,
      completed: false,
    };

    createNewTodo(todo);
    toast.success("Todo created successfully");
    onSuccess();
  };

  const handleUpdate = (e?: React.MouseEvent) => {
    e?.preventDefault();

    if (!currentDetails) return;

    if (!validateForm(e)) {
      return;
    }

    if (otherCategory) {
      createCategory({ id: Date.now(), title: otherCategory });
    }

    const updatedTodo: Todo = {
      id: currentDetails.id,
      title: formData.title,
      description: formData.description,
      category: selectedCategory === "Other" ? otherCategory : selectedCategory,
      dueDate: formData.dueDate,
      completed: currentDetails.completed,
    };

    updateTodo({
      id: currentDetails.id,
      todo: updatedTodo,
    });
    toast.success("Todo updated successfully");
    onSuccess();
  };

  const handleDismiss = () => {
    SetIsOpen(false);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <div className="mt-4 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:border-t-gray-900/10 sm:pb-0">
            {/* Title */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <Input
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) {
                      setErrors({ ...errors, title: undefined });
                    }
                  }}
                  placeholder="Add title"
                  error={!!errors.title}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Category
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <Select
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setFormData({ ...formData, category: e.target.value });
                    if (errors.category) {
                      setErrors({ ...errors, category: undefined });
                    }
                  }}
                  options={[...categories, { id: "other", title: "Other" }]}
                />
              </div>
            </div>

            {/* Other Category */}
            {selectedCategory === "Other" && (
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="new-category"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
                >
                  New category <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Input
                    name="new-category"
                    value={otherCategory}
                    onChange={(e) => {
                      setOtherCategory(e.target.value);
                      if (errors.category) {
                        setErrors({ ...errors, category: undefined });
                      }
                    }}
                    placeholder="Enter category"
                    error={!!errors.category}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Due Date */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="dueDate"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Due Date
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <Input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => {
                    setFormData({ ...formData, dueDate: e.target.value });
                    if (errors.dueDate) {
                      setErrors({ ...errors, dueDate: undefined });
                    }
                  }}
                  placeholder="Add Due Date"
                  error={!!errors.dueDate}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
              >
                Description
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <Textarea
                  id="description"
                   name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about todo.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            {mode === "New" && (
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="sm:ml-3"
              >
                Save
              </Button>
            )}
            {mode === "Edit" && (
              <Button
                onClick={handleUpdate}
                variant="primary"
                className="sm:ml-3"
              >
                Update
              </Button>
            )}
            <Button
              onClick={handleDismiss}
              variant="secondary"
              className="mt-3 sm:mt-0"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;