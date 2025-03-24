import { useEffect, useState } from "react";
import type { Employee } from "../types/employee";

const useEmployees = (filter: string) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Erro ao carregar os funcionários", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    [employee.name, employee.job, employee.phone].some((field) =>
      field.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return { filteredEmployees, loading };
};

export default useEmployees;
