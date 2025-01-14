import { UserPreferences } from './types';

/**
 * Adjusts user preferences dynamically based on feedback provided for a specific video.
 *
 * @param userPreferences - The current user preferences object, including weight adjustments.
 * @param videoId - The ID of the video for which feedback is being provided.
 * @param feedback - The feedback rating for the video, ranging from 1 (negative) to 5 (positive).
 * @returns Updated user preferences with adjusted weights for scoring factors.
 *
 * @example
 * const updatedPreferences = processFeedback(userPreferences, 'video1', 5);
 * console.log(updatedPreferences.weightAdjustments.noveltyWeight); // Increased based on positive feedback
 *
 * @remarks
 * The function modifies weights for key scoring factors (e.g., novelty, engagement, freshness, impact) by ±10%
 * for each point of feedback deviation from the neutral rating of 3. Positive feedback increases weights, while
 * negative feedback decreases them.
 */
export const processFeedback = (
  userPreferences: UserPreferences,
  videoId: string,
  feedback: number, // Rating between 1-5
): UserPreferences => {
  const weightAdjustments = userPreferences.weightAdjustments || {};
  const adjustmentFactor = (feedback - 3) * 0.1; // Adjust by ±10% for each point away from neutral (3)

  return {
    ...userPreferences,
    weightAdjustments: {
      noveltyWeight: (weightAdjustments.noveltyWeight ?? 1.0) + adjustmentFactor,
      engagementWeight: (weightAdjustments.engagementWeight ?? 0.3) + adjustmentFactor,
      freshnessWeight: (weightAdjustments.freshnessWeight ?? 0.3) + adjustmentFactor,
      impactWeight: (weightAdjustments.impactWeight ?? 0.5) + adjustmentFactor,
    },
  };
};
