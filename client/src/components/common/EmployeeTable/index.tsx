import { formatPhone } from "../../../utils/formatPhone";
import { formatDate } from "../../../utils/formatDate";
import { EmployeeRow } from "./EmployeeRow";
import useEmployees from "../../../hooks/useEmployee";
import { useState } from "react";

const EmployeeTable: React.FC<{ filter: string }> = ({ filter }) => {
  const [dropdownState, setDropdownState] = useState<{
    [key: number]: boolean;
  }>({});
  const { filteredEmployees, loading } = useEmployees(filter);

  const toggleDropdown = (id: number) => {
    setDropdownState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="hidden md:block">
        <div className="rounded-lg overflow-hidden">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-primary shadow-sm">
                <th className="text-neutral-6 text-md rounded-tl-lg p-little-08">
                  FOTO
                </th>
                <th className="text-left text-neutral-6 text-md p-little-08">
                  NOME
                </th>
                <th className="text-left text-neutral-6 text-md p-little-08">
                  CARGO
                </th>
                <th className="text-left text-neutral-6 text-md p-little-08">
                  DATA DE ADMISSÃO
                </th>
                <th className="text-left text-neutral-6 text-md rounded-tr-lg p-little-08">
                  TELEFONE
                </th>
              </tr>
            </thead>
          </table>
          <div className="h-0.3" />
          <table className="w-full table-fixed border-separate border-spacing-y-1">
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`shadow-sm bg-neutral-6 ${
                    index === filteredEmployees.length - 1
                      ? "last:[&>td:first-child]:rounded-bl-lg last:[&>td:last-child]:rounded-br-lg"
                      : ""
                  }`}
                >
                  <td className="p-little-08 flex justify-center">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left">
                    <span
                      className="tooltip"
                      data-tooltip={`Nome: ${employee.name}`}
                    >
                      {employee.name}
                    </span>
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left">
                    {employee.job}
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left">
                    {formatDate(employee.admission_date)}
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left pr-0">
                    {formatPhone(employee.phone)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden">
        <div className="bg-primary p-4.5 mb-2 rounded-t-lg shadow-sm">
          <div className="flex gap-2 justify-left items-center">
            <span className="text-neutral-6 text-md font-bold">FOTO</span>
            <span className="text-neutral-6 text-md font-bold">NOME</span>
            <div className="w-2 h-2 rounded-full bg-neutral-6 ml-auto" />
          </div>
        </div>

        {filteredEmployees.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            isDropdownOpen={dropdownState[employee.id]}
            toggleDropdown={() => toggleDropdown(employee.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
