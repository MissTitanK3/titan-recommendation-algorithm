/**
 * Configuration interface for the recommendation algorithm. Defines various weights
 * and thresholds used to calculate video scores and balance recommendations.
 */
export interface Config {
  /**
   * The default minimum duration for videos in seconds.
   * Used as a fallback if user preferences don't specify a value.
   */
  defaultMinDuration: number;

  /**
   * The default maximum duration for videos in seconds.
   * Used as a fallback if user preferences don't specify a value.
   */
  defaultMaxDuration: number;

  /**
   * Whether to prioritize content from creators in the user's location.
   */
  prioritizeLocalContent: boolean;

  /**
   * Weight assigned to impact tags (e.g., educational or sustainability-related content).
   * Higher values make impactful content more prominent.
   */
  impactTagWeight: number;

  /**
   * Boost applied to content from local creators if `prioritizeLocalContent` is enabled.
   */
  localContentBoost: number;

  /**
   * Maximum number of views considered for the novelty score calculation.
   * Videos with view counts beyond this threshold will receive lower novelty scores.
   */
  maxViewsForNovelty: number;

  /**
   * Weight for the novelty score. Higher values emphasize novelty in recommendations.
   */
  noveltyScoreWeight: number;

  /**
   * The number of days after which videos lose all freshness and receive no freshness boost.
   */
  timeDecayThreshold: number;

  /**
   * Weight for freshness score. Determines how much recently uploaded videos are prioritized.
   */
  freshnessWeight: number;

  /**
   * Weights for social proof metrics, such as comments, shares, and likes.
   * These weights determine how much user engagement affects the score.
   */
  socialProofWeights: {
    /**
     * Weight for each comment on a video.
     */
    comments: number;

    /**
     * Weight for each share of a video.
     */
    shares: number;

    /**
     * Weight for each like on a video.
     */
    likes: number;
  };

  /**
   * Weight for user feedback. Higher values give more influence to user-provided ratings.
   */
  feedbackWeight: number;

  /**
   * Penalty applied to tags frequently encountered in the user's history.
   * Negative values reduce the score for overused tags.
   */
  diversityPenaltyWeight: number;

  /**
   * Penalty applied to creators frequently encountered in the user's history.
   * Negative values reduce the score for overused creators.
   */
  creatorDiversityPenaltyWeight: number;

  /**
   * Weight for engagement rate. Affects how much the engagement rate contributes to the overall score.
   */
  engagementRateWeight: number;
}

/**
 * Default configuration for the recommendation algorithm. Provides baseline values
 * for all weights and thresholds used in scoring and recommendation logic.
 */
export const defaultConfig: Config = {
  defaultMinDuration: 10,
  defaultMaxDuration: 300,
  prioritizeLocalContent: true,
  impactTagWeight: 0.05,
  localContentBoost: 0.15,
  maxViewsForNovelty: 50000,
  noveltyScoreWeight: 0.3,
  timeDecayThreshold: 30,
  freshnessWeight: 0.05,
  socialProofWeights: {
    comments: 0.15,
    shares: 0.2,
    likes: 0.05,
  },
  feedbackWeight: 0.4,
  diversityPenaltyWeight: -0.3,
  creatorDiversityPenaltyWeight: -0.2,
  engagementRateWeight: 0.1,
};
