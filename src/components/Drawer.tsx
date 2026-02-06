import {  Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import type React from "react";
import type { Todo } from "../types";
import { getAllCategories } from "../service/category.service";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import Button from "./Button";

type Props = {
  mode: string;
  isOpen: boolean;
  SetIsOpen: (open: boolean) => void;
  data?: Todo[];
  onRefresh?: () => void;
};

const categories = getAllCategories();


const Drawer: React.FC<Props> = ({
  mode,
  isOpen,
  SetIsOpen,
  data,
  onRefresh,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCategoryChange = (category: string) => {
    setSearchParams((prev) => {
      if (category === "All Categories") prev.delete("category");
      else prev.set("category", category);
      return prev;
    });
  };

  // For status filter
  const handleStatusChange = (status: string) => {
    setSearchParams((prev) => {
      if (status === "All") prev.delete("status");
      else prev.set("status", status);
      return prev;
    });
  };
  return (
    <div>
      {mode == "New" && (
        <Dialog
          open={isOpen}
          onClose={SetIsOpen}
          className="relative z-10 transition-all"
        >
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                >
                  <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-base font-semibold text-gray-900">
                          Add New Todo
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          {/* <button
                            type="button"
                            onClick={() => SetIsOpen(false)}
                            className="relative rounded-md text-gray-400 hover:text-gray-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                          </button> */}
                          <Button onClick={() => SetIsOpen(false)} variant="simple">
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" /></Button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}

                      <Form
                        mode={"New"}
                        onSuccess={() => {
                          SetIsOpen(false);
                          onRefresh?.();
                        }}
                        SetIsOpen={SetIsOpen}
                      />
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      )}
      {mode == "Edit" && (
        <Dialog open={isOpen} onClose={SetIsOpen} className="relative z-10">
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                >
                  <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-base font-semibold text-gray-900">
                          Edit Todo
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          {/* <button
                            type="button"
                            onClick={() => SetIsOpen(false)}
                            className="relative rounded-md text-gray-400 hover:text-gray-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                          </button> */}
                          <Button onClick={() => SetIsOpen(false)} variant="simple">
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" /></Button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}

                      <Form
                        data={data}
                        mode={"Edit"}
                        onSuccess={() => {
                          SetIsOpen(false);
                          onRefresh?.();
                        }}
                        SetIsOpen={SetIsOpen}
                      />
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      )}
      {mode == "Filter" && (
        <Dialog open={isOpen} onClose={SetIsOpen} className="relative z-10">
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                >
                  <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-base font-semibold text-gray-900">
                          Filter
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          {/* <button
                            type="button"
                            onClick={() => SetIsOpen(false)}
                            className="relative rounded-md text-gray-400 hover:text-gray-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                          </button> */}
                          <Button onClick={() => SetIsOpen(false)} variant="simple">
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="size-6" /></Button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                          htmlFor="country"
                          className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
                        >
                          Filter By Category
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="grid grid-cols-1 sm:max-w-xs">
                            {/* <select
                              id="category"
                              name="category"
                              value={searchParams.get("category") || ""}
                              onChange={(e) =>
                                handleCategoryChange(e.target.value)
                              }
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline 1 -outline-offset-1 outline-gray-300 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option value="All">All Categories</option>
                              {categories.map((c: any) => (
                                <option key={c.id} value={c.title}>
                                  {c.title}
                                </option>
                              ))}
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            /> */}
                            <Select
                              name="category"
                              value={searchParams.get("category") || ""}
                              onChange={(e) =>
                                handleCategoryChange(e.target.value)
                              }
                              options={[
                                { id: "All" ,title: "All Categories" },
                                ...categories,
                              ]}
                            />
                          </div>
                        </div>
                        <label
                          htmlFor="country"
                          className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5"
                        >
                          Filter By Staus
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                          <div className="grid grid-cols-1 sm:max-w-xs">
                            {/* <select
                              id="status"
                              name="status"
                              value={searchParams.get("status") || "All"}
                              onChange={(e) =>
                                handleStatusChange(e.target.value)
                              }
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              {["All", "Pending", "Completed"].map(
                                (c: string, index) => (
                                  <option key={index} value={c}>
                                    {c}
                                  </option>
                                )
                              )}
                            </select>
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            /> */}
                            <Select
                              name="status"
                              value={searchParams.get("status") || "All"}
                              onChange={(e) =>
                                handleStatusChange(e.target.value)
                              }
                              options={[
                                { id: 1, title: "All" },
                                { id: 2, title: "Pending" },
                                { id: 3, title: "Completed" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Drawer;
