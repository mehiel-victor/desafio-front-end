import React, { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

interface EmployeeTableProps {
  filter: string;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ filter }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

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
  );
};

export default EmployeeTable;
