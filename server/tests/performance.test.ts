import { describe, it, expect } from 'vitest';
import { calculateWeighted360Average } from '../src/modules/performance';
import { PerformanceReview } from '../src/types';

describe('Module/Performance', () => {
  it('should calculate weighted average correctly for Q1 reviews', () => {
    // Relationship weights: SELF: 0.10, MANAGER: 0.40, PEER: 0.30, DIRECT_REPORT: 0.20
    const reviews: PerformanceReview[] = [
      {
        id: '1',
        employeeId: 'EMP_100',
        evaluatorId: 'EMP_100',
        relationship: 'SELF',
        cycleId: 'CYCLE_Q1',
        scores: [{ competencyId: 'TECH', rating: 4, comment: '' }],
        submittedAt: ''
      },
      {
        id: '2',
        employeeId: 'EMP_100',
        evaluatorId: 'EMP_MANAGER',
        relationship: 'MANAGER',
        cycleId: 'CYCLE_Q1',
        scores: [{ competencyId: 'TECH', rating: 5, comment: '' }],
        submittedAt: ''
      },
      {
        id: '3',
        employeeId: 'EMP_100',
        evaluatorId: 'EMP_PEER',
        relationship: 'PEER',
        cycleId: 'CYCLE_Q1',
        scores: [{ competencyId: 'TECH', rating: 4, comment: '' }],
        submittedAt: ''
      }
    ];

    // Total weight for categories present = 0.10 (SELF) + 0.40 (MANAGER) + 0.30 (PEER) = 0.80
    // Weighted Sum = (4 * 0.10) + (5 * 0.40) + (4 * 0.30) = 0.40 + 2.00 + 1.20 = 3.60
    // Normalized result = 3.60 / 0.80 = 4.5
    const score = calculateWeighted360Average(reviews, 'EMP_100', 'TECH', 'CYCLE_Q1');
    expect(score).toBe(4.5);
  });
});
