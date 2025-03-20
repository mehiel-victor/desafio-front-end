import React, { useState } from "react";

interface EmployeeFilterProps {
  onFilterChange: (filter: string) => void;
}

const EmployeeFilter: React.FC<EmployeeFilterProps> = ({ onFilterChange }) => {
  const [filterText, setFilterText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterText(value);
    onFilterChange(value);
  };

  return (
    <div className="">
      <input
        type="text"
        value={filterText}
        onChange={handleChange}
        className="px-4 py-3 w-full border-2 bg-neutral-6 hover:border-primary/40 focus-visible:border-primary focus:border-primary  border-neutral-3 rounded-lg focus:outline-none"
        placeholder="Pesquisar"
      />
    </div>
  );
};

export default EmployeeFilter;
