import React, { useState } from "react";
import Drawer from "./Drawer";
import { Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Input2 from "./Input";
import Button from "./Button";

const Search: React.FC = () => {
  const [isOpen, SetIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      if (value) prev.set("search", value);
      else prev.delete("search");
      return prev;
    });
  };

  // Read current search value
  const searchQuery = searchParams.get("search") || "";

  const handleFilter = () => {
    SetIsOpen(true);
  };

  return (
    <div>
      {isOpen && (
        <Drawer mode="Filter" isOpen={isOpen} SetIsOpen={SetIsOpen} />
      )}

      <div className="mt-2 flex items-end gap-2">
        <div className="flex-1">
          <Input2
  label="Quick search"
  name="search"
  value={searchQuery}
  placeholder="Search.."
  onChange={(e) => handleSearch(e.target.value)}
/>
        </div>

        <Button
          onClick={handleFilter}
          variant="primary"
          className="sm:ml-3"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default Search;
