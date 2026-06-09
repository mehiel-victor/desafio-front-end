const API_URL = 'http://localhost:3001/api';
import { mockEmployees, mockAnalytics, mockCandidates, mockVacancies, mockClimateReport, mockPayrollAudit, mockVacations, mockVacationLimit, mockPerformanceReviews } from "../mocks/mockData";
const USE_MOCKS = true;

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  if (USE_MOCKS) {
    // Simple mock routing based on endpoint
    if (endpoint.startsWith('/employees')) return mockEmployees;
    if (endpoint.startsWith('/analytics')) return mockAnalytics;
    if (endpoint.startsWith('/talent/candidates')) return mockCandidates;
    if (endpoint.startsWith('/talent/vacancies')) return mockVacancies;
    if (endpoint.startsWith('/climate/aggregate')) return mockClimateReport;
    if (endpoint.startsWith('/payroll/audit')) return mockPayrollAudit.inconsistencies;
    if (endpoint.startsWith('/payroll/vacations')) return mockVacations;
    if (endpoint.startsWith('/payroll/vacations/limit')) return mockVacationLimit;
    if (endpoint.startsWith('/performance/reviews')) {
      const parts = endpoint.split('/');
      const employeeId = parts[parts.length - 1];
      if (employeeId === 'reviews' || employeeId === '') {
        return mockPerformanceReviews;
      }
      const filteredReviews = mockPerformanceReviews.reviews.filter(r => r.employeeId === employeeId);
      let consolidated = { TECH: 4.0, CULTURE: 4.0 };
      if (employeeId === "1") {
        consolidated = { TECH: 4.4, CULTURE: 4.7 };
      } else if (employeeId === "3") {
        consolidated = { TECH: 4.8, CULTURE: 4.9 };
      } else if (employeeId === "8") {
        consolidated = { TECH: 4.2, CULTURE: 4.1 };
      }
      return {
        reviews: filteredReviews,
        consolidated
      };
    }
  }
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('text/plain')) {
    return res.text();
  }
  return res.json();
}
