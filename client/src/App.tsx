import React, { useState } from "react";
import Header from "./components/Header";
import EmployeeTable from "./components/common/EmployeeTable";
import EmployeeFilter from "./components/common/EmployeeFilter";

const App: React.FC = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (filterText: string) => {
    setFilter(filterText);
  };

  return (
    <div className="bg-secondary flex flex-col min-h-screen">
      <Header />
      <main className="">
        <div className="flex flex-col md:flex-row gap-6 items-left justify-between px-medium-32 py-medium-40">
          <h1 className="text-lg text-neutral-1">Funcionários</h1>
          <EmployeeFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="px-medium-32">
          <EmployeeTable filter={filter} />
        </div>
      </main>
    </div>
  );
};

export default App;
