import { describe, it, expect } from 'vitest';
import { aggregateClimateReports } from '../src/modules/climate';
import { ClimateResponse } from '../src/types';

describe('Module/Climate', () => {
  it('should mask department scores if response count N < 3 to protect anonymity', () => {
    const responses: ClimateResponse[] = [
      // DEP_TECH has 3 responses (N = 3)
      { id: '1', cycleId: 'MAY_2026', departmentId: 'DEP_TECH', enpsScore: 10, sentimentRating: 5, submittedAt: '' },
      { id: '2', cycleId: 'MAY_2026', departmentId: 'DEP_TECH', enpsScore: 8, sentimentRating: 4, submittedAt: '' },
      { id: '3', cycleId: 'MAY_2026', departmentId: 'DEP_TECH', enpsScore: 9, sentimentRating: 4, submittedAt: '' },
      
      // DEP_DESIGN has 2 responses (N = 2)
      { id: '4', cycleId: 'MAY_2026', departmentId: 'DEP_DESIGN', enpsScore: 9, sentimentRating: 5, submittedAt: '' },
      { id: '5', cycleId: 'MAY_2026', departmentId: 'DEP_DESIGN', enpsScore: 8, sentimentRating: 4, submittedAt: '' }
    ];

    const aggregates = aggregateClimateReports(responses, 'MAY_2026');

    const techAgg = aggregates.find(a => a.departmentId === 'DEP_TECH');
    const designAgg = aggregates.find(a => a.departmentId === 'DEP_DESIGN');

    expect(techAgg).toBeDefined();
    expect(techAgg?.isMasked).toBe(false);
    expect(techAgg?.averageENPS).toBe(9.0);
    expect(techAgg?.averageSentiment).toBe(4.33);

    expect(designAgg).toBeDefined();
    expect(designAgg?.isMasked).toBe(true);
    expect(designAgg?.averageENPS).toBeUndefined();
    expect(designAgg?.averageSentiment).toBeUndefined();
  });
});
