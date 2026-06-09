export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'EMPLOYEE' | 'MANAGER' | 'HR' | 'ADMIN';
  departmentId: string;
  hireDate: string; // ISO string
  status: 'ONBOARDING' | 'ACTIVE' | 'INACTIVE';
  careerPathId: string;
  salaryTier: string;
  job: string; // compatibility with old fields
  phone: string;
  image: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string;
  skills: string[];
  matchingScore?: number;
  notes?: string;
  status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'HIRED' | 'REJECTED';
}

export interface JobVacancy {
  id: string;
  title: string;
  description: string;
  departmentId: string;
  requirements: string[];
  templateGeneratedByIA: boolean;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  evaluatorId: string;
  relationship: 'SELF' | 'MANAGER' | 'PEER' | 'DIRECT_REPORT';
  cycleId: string;
  scores: {
    competencyId: string;
    rating: number; // 1 a 5
    comment: string;
  }[];
  submittedAt: string;
}

export interface ClimateResponse {
  id: string; // UUID aleatório dissociado do Employee
  cycleId: string;
  departmentId: string; // Para análise setorial (apenas exibido se N >= 3)
  enpsScore: number; // 0 a 10
  sentimentRating: number; // 1 a 5
  submittedAt: string;
}

export interface ClimateParticipationTrack {
  employeeId: string;
  cycleId: string;
  submittedAt: string;
}

export interface VacationRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  attachmentUrl?: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  period: string; // e.g. "2026-05"
  netPayable: number;
  grossSalary: number;
  deductions: number;
  bonuses: number;
  pdfUrl: string;
}
