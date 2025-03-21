import { useEffect, useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

interface Employee {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

const EmployeeTable: React.FC<{ filter: string }> = ({ filter }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (id: number) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const lowercasedFilter = filter.toLowerCase();
    return (
      employee.name.toLowerCase().includes(lowercasedFilter) ||
      employee.job.toLowerCase().includes(lowercasedFilter) ||
      employee.phone.includes(lowercasedFilter)
    );
  });

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
                    {employee.name}
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left">
                    {employee.job}
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left">
                    {new Date(employee.admission_date).toLocaleDateString()}
                  </td>
                  <td className="text-neutral-1 text-sm p-little-08 text-left pr-0">
                    {employee.phone}
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
            <div className="flex items-center">
              <span className="text-neutral-6 text-md font-bold">FOTO</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-6 text-md font-bold">NOME</span>
            </div>
            <div className="flex items-center ml-auto">
              <div className="w-2 h-2 rounded-full bg-neutral-6" />
            </div>
          </div>
        </div>

        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-neutral-6 p-3 mb-2 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="text-neutral-1 text-sm font-medium">
                  {employee.name}
                </span>
              </div>
              <button
                onClick={() => toggleDropdown(employee.id)}
                className="text-neutral-1 text-sm bg-transparent"
              >
                {isDropdownOpen[employee.id] ? (
                  <ChevronUp stroke="#0500FF" />
                ) : (
                  <ChevronDown stroke="#0500FF" />
                )}
              </button>
            </div>

            {isDropdownOpen[employee.id] && (
              <div className="mt-3 text-neutral-1 text-sm text-left">
                <p>
                  <strong>Cargo:</strong> {employee.job}
                </p>
                <p>
                  <strong>Data de Admissão:</strong>{" "}
                  {new Date(employee.admission_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Telefone:</strong> {employee.phone}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
