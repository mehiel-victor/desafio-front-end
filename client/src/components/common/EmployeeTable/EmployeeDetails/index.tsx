import type { Employee } from "../../../../types/employee";
import { formatDate } from "../../../../utils/formatDate";
import { formatPhone } from "../../../../utils/formatPhone";

export const EmployeeDetails: React.FC<{
  employee: Employee;
  isDropdownOpen: boolean;
}> = ({ employee, isDropdownOpen }) =>
  isDropdownOpen ? (
    <div className="mt-3 text-neutral-1 text-sm text-left">
      <p>
        <strong>Cargo:</strong> {employee.job}
      </p>
      <p>
        <strong>Data de Admissão:</strong> {formatDate(employee.admission_date)}
      </p>
      <p>
        <strong>Telefone:</strong> {formatPhone(employee.phone)}
      </p>
    </div>
  ) : null;
