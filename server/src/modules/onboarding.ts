import * as crypto from 'crypto';

export interface OnboardingTask {
  id: string;
  title: string;
  phase: '30_DAYS' | '60_DAYS' | '90_DAYS';
  completed: boolean;
  dueDate: string;
}

export interface AuditableDocument {
  documentId: string;
  fileName: string;
  uploadedAt: string;
  sha256Hash: string;
  signedBy: string;
  auditSignature: string;
}

/**
 * Creates onboarding track for a new employee.
 */
export function getOnboardingTemplate(hireDate: string): OnboardingTask[] {
  const baseDate = new Date(hireDate);

  const d30 = new Date(baseDate);
  d30.setDate(d30.getDate() + 30);

  const d60 = new Date(baseDate);
  d60.setDate(d60.getDate() + 60);

  const d90 = new Date(baseDate);
  d90.setDate(d90.getDate() + 90);

  return [
    { id: '1', title: 'Integração de Cultura & Valores', phase: '30_DAYS', completed: false, dueDate: d30.toISOString() },
    { id: '2', title: 'Apresentação ao Time de Trabalho', phase: '30_DAYS', completed: false, dueDate: d30.toISOString() },
    { id: '3', title: 'Leitura de Documentação Técnica', phase: '60_DAYS', completed: false, dueDate: d60.toISOString() },
    { id: '4', title: 'Primeira Entrega (Mini-projeto)', phase: '60_DAYS', completed: false, dueDate: d60.toISOString() },
    { id: '5', title: 'Feedback de Onboarding (90 dias)', phase: '90_DAYS', completed: false, dueDate: d90.toISOString() }
  ];
}

/**
 * Digitally signs a document, generating the audit hash SHA-256 and signature.
 */
export function signAdmissionalDocument(
  documentId: string,
  fileName: string,
  employeeEmail: string
): AuditableDocument {
  const uploadedAt = new Date().toISOString();
  // Generate a SHA-256 hash using the document meta-data
  const hash = crypto.createHash('sha256');
  hash.update(`${documentId}-${fileName}-${uploadedAt}-${employeeEmail}`);
  const sha256Hash = hash.digest('hex');

  // Audit signature combining hash and server secret timestamp
  const serverSignature = crypto.createHmac('sha256', 'HR_PLATFORM_SECRET_KEY_2026')
    .update(sha256Hash)
    .digest('hex');

  return {
    documentId,
    fileName,
    uploadedAt,
    sha256Hash,
    signedBy: employeeEmail,
    auditSignature: serverSignature
  };
}
