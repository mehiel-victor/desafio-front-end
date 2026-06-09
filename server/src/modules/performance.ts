import { PerformanceReview } from '../types';

const RELATIONSHIP_WEIGHTS: Record<string, number> = {
  SELF: 0.10,
  MANAGER: 0.40,
  PEER: 0.30,
  DIRECT_REPORT: 0.20
};

/**
 * Calculates the mathematically weighted average for a given competency in a 360 degree feedback cycle.
 * Handles missing evaluator categories by normalizing the remaining weights to sum up to 1.0.
 */
export function calculateWeighted360Average(
  reviews: PerformanceReview[],
  employeeId: string,
  competencyId: string,
  cycleId: string
): number {
  // Filter reviews for this employee and cycle
  const targetReviews = reviews.filter(r => r.employeeId === employeeId && r.cycleId === cycleId);
  if (targetReviews.length === 0) return 0;

  // Group by relationship and calculate the simple average for each relationship type
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};

  targetReviews.forEach(rev => {
    const scoreItem = rev.scores.find(s => s.competencyId === competencyId);
    if (scoreItem) {
      if (!sums[rev.relationship]) {
        sums[rev.relationship] = 0;
        counts[rev.relationship] = 0;
      }
      sums[rev.relationship] += scoreItem.rating;
      counts[rev.relationship] += 1;
    }
  });

  let weightedSum = 0;
  let weightTotal = 0;

  for (const rel in sums) {
    const avgScore = sums[rel] / counts[rel];
    const weight = RELATIONSHIP_WEIGHTS[rel] || 0.25; // fallback
    weightedSum += avgScore * weight;
    weightTotal += weight;
  }

  if (weightTotal === 0) return 0;

  // Normalize (e.g. if we only have SELF and MANAGER reviews, scale their sum to 1.0)
  return parseFloat((weightedSum / weightTotal).toFixed(2));
}

/**
 * Get all ratings consolidated by competency for a given employee.
 */
export function getConsolidatedPerformance(
  reviews: PerformanceReview[],
  employeeId: string,
  cycleId: string
): Record<string, number> {
  const competencies = new Set<string>();
  reviews
    .filter(r => r.employeeId === employeeId && r.cycleId === cycleId)
    .forEach(r => r.scores.forEach(s => competencies.add(s.competencyId)));

  const result: Record<string, number> = {};
  competencies.forEach(comp => {
    result[comp] = calculateWeighted360Average(reviews, employeeId, comp, cycleId);
  });

  return result;
}
