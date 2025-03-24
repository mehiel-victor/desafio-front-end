import React, { useState } from "react";
import Magnifier from "../../icons/Magnifier";

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
    <div className="relative w-full md:w-auto">
      <input
        type="text"
        value={filterText}
        onChange={handleChange}
        className="px-4 py-3 border-2 bg-neutral-6 hover:border-primary/40 focus-visible:border-primary focus:border-primary border-neutral-3 rounded-lg focus:outline-none w-full"
        placeholder="Pesquisar"
        aria-label="Digite para pesquisar funcionários por nome, cargo ou telefone"
        title="Digite para pesquisar funcionários"
      />
      <div className="absolute right-3 top-7/12 transform -translate-y-1/2">
        <Magnifier />
      </div>
    </div>
  );
};

export default EmployeeFilter;
