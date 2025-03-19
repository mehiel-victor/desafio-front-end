import React, { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Pesquise por nome, cargo ou telefone"
        className="p-2 border border-gray-300 rounded mb-4"
        onChange={handleSearch}
      />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Imagem</th>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Cargo</th>
            <th className="border px-4 py-2">Data de Admissão</th>
            <th className="border px-4 py-2">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.job}</td>
              <td className="border px-4 py-2">
                {new Date(employee.admission_date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
