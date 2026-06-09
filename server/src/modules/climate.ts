import { ClimateResponse, ClimateParticipationTrack, Employee } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Inserts a climate survey response anonymously.
 * To ensure anonymity:
 * - We write the response with a randomized ID and no reference to the employee.
 * - We write the participation track separately to register that the employee completed the survey.
 */
export function createAnonymousResponse(
  employeeId: string,
  cycleId: string,
  departmentId: string,
  enpsScore: number,
  sentimentRating: number
): { response: ClimateResponse; track: ClimateParticipationTrack } {
  // Disconnect the response from the employee completely by generating a fresh UUID
  const response: ClimateResponse = {
    id: uuidv4(),
    cycleId,
    departmentId,
    enpsScore,
    sentimentRating,
    submittedAt: new Date().toISOString()
  };

  const track: ClimateParticipationTrack = {
    employeeId,
    cycleId,
    submittedAt: new Date().toISOString()
  };

  return { response, track };
}

export interface DepartmentClimateAggregate {
  departmentId: string;
  responseCount: number;
  averageENPS?: number;
  averageSentiment?: number;
  isMasked: boolean;
}

/**
 * Aggregates climate surveys by department.
 * Compliance rule (PRD): If a department has less than 3 responses, we MUST mask or omit its scores to protect anonymity.
 */
export function aggregateClimateReports(
  responses: ClimateResponse[],
  cycleId: string
): DepartmentClimateAggregate[] {
  const cycleResponses = responses.filter(r => r.cycleId === cycleId);
  const groups: Record<string, ClimateResponse[]> = {};

  cycleResponses.forEach(res => {
    if (!groups[res.departmentId]) {
      groups[res.departmentId] = [];
    }
    groups[res.departmentId].push(res);
  });

  const aggregates: DepartmentClimateAggregate[] = [];

  for (const departmentId in groups) {
    const deptResponses = groups[departmentId];
    const N = deptResponses.length;

    if (N < 3) {
      aggregates.push({
        departmentId,
        responseCount: N,
        isMasked: true
      });
    } else {
      const sumENPS = deptResponses.reduce((acc, curr) => acc + curr.enpsScore, 0);
      const sumSent = deptResponses.reduce((acc, curr) => acc + curr.sentimentRating, 0);
      aggregates.push({
        departmentId,
        responseCount: N,
        averageENPS: parseFloat((sumENPS / N).toFixed(2)),
        averageSentiment: parseFloat((sumSent / N).toFixed(2)),
        isMasked: false
      });
    }
  }

  return aggregates;
}

/**
 * Calculates global eNPS score.
 * Promoters (score 9-10), Passives (7-8), Detractors (0-6).
 * eNPS = % Promoters - % Detractors (ranges from -100 to +100).
 */
export function calculateENPS(responses: ClimateResponse[]): number {
  if (responses.length === 0) return 0;
  let promoters = 0;
  let detractors = 0;

  responses.forEach(r => {
    if (r.enpsScore >= 9) promoters++;
    else if (r.enpsScore <= 6) detractors++;
  });

  const promotersPercentage = (promoters / responses.length) * 100;
  const detractorsPercentage = (detractors / responses.length) * 100;

  return Math.round(promotersPercentage - detractorsPercentage);
}
