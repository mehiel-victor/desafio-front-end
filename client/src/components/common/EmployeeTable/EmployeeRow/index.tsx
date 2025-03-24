import type { Employee } from "../../../../types/employee";
import ChevronDown from "../../../icons/ChevronDown";
import ChevronUp from "../../../icons/ChevronUp";
import { EmployeeDetails } from "../EmployeeDetails";

export const EmployeeRow: React.FC<{
  employee: Employee;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}> = ({ employee, isDropdownOpen, toggleDropdown }) => (
  <div className="bg-neutral-6 p-3 mb-2 rounded-lg shadow-sm" key={employee.id}>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src={employee.image}
          alt={`Foto de perfil de ${employee.name}`}
          className="w-8 h-8 rounded-full mr-3"
          aria-hidden="true"
        />
        <span className="text-neutral-1 text-sm font-medium">
          <span className="tooltip" data-tooltip={`Nome: ${employee.name}`}>
            {employee.name}
          </span>
        </span>
      </div>
      <button
        onClick={toggleDropdown}
        className="text-neutral-1 text-sm bg-transparent"
        aria-label={`Exibir detalhes de ${employee.name}`}
        aria-expanded={isDropdownOpen ? "true" : "false"}
        title={`Clique para ver detalhes de ${employee.name}`}
      >
        {isDropdownOpen ? (
          <ChevronUp stroke="#0500FF" />
        ) : (
          <ChevronDown stroke="#0500FF" />
        )}
      </button>
    </div>
    <EmployeeDetails employee={employee} isDropdownOpen={isDropdownOpen} />
  </div>
);
