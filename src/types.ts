/**
 * Represents a video available for recommendation.
 */
export interface Video {
  /** Unique identifier for the video. */
  id: string;

  /** Tags categorizing the video, e.g., ['music', 'education', 'entertainment']. */
  tags: string[];

  /** Duration of the video in seconds. */
  duration: number;

  /** Number of views the video has received. */
  views: number;

  /** Engagement rate of the video, expressed as a value between 0 and 1. */
  engagementRate: number;

  /** Optional: Location of the video creator, e.g., 'New York'. */
  creatorLocation?: string;

  /** Optional: Tags highlighting the video's impact, e.g., ['education', 'sustainability', 'community']. */
  impactTags?: string[];

  /** ISO-formatted string representing the video's upload date, e.g., '2023-12-01T10:00:00Z'. */
  uploadDate: string;

  /** Optional: Number of comments on the video. */
  comments?: number;

  /** Optional: Number of times the video has been shared. */
  shares?: number;

  /** Optional: Number of likes the video has received. */
  likes?: number;

  /** Optional: e.g., ['holiday', 'winter']. */
  seasonalTags?: string[]; //
}

/**
 * Represents the user's preferences for video recommendations.
 */
export interface UserPreferences {
  /** List of tags the user prefers, e.g., ['music', 'education']. */
  preferredTags: string[];

  /** Minimum duration of videos (in seconds) that the user prefers. */
  minDuration: number;

  /** Maximum duration of videos (in seconds) that the user prefers. */
  maxDuration: number;

  /** Optional: List of creators blocked by the user, identified by their unique IDs. */
  blockedCreators?: string[];

  /** List of video IDs that the user has rewatched. */
  rewatchedVideos: string[];

  /** Optional: List of preferred impact tags, e.g., ['education', 'community']. */
  preferredImpactTags?: string[];

  /** Optional: Whether to prioritize local content created near the user's location. */
  prioritizeLocalContent?: boolean;

  /** Optional: List of creators the user follows or prefers. */
  preferredCreators?: string[];

  /** Optional: Start hour for the user's morning preferences (24-hour format, e.g., 6 for 6 AM). */
  morningStart?: number;

  /** Optional: End hour for the user's morning preferences. */
  morningEnd?: number;

  /** Optional: Start hour for the user's evening preferences. */
  eveningStart?: number;

  /** Optional: End hour for the user's evening preferences. */
  eveningEnd?: number;

  /**
   * Optional: User-defined adjustments to the weights of scoring factors.
   * Includes customization for novelty, engagement, impact, and freshness.
   */
  weightAdjustments?: {
    /** User-defined weight for novelty (e.g., higher values emphasize novelty). */
    noveltyWeight?: number;

    /** User-defined weight for engagement (e.g., likes, shares). */
    engagementWeight?: number;

    /** User-defined weight for impactful content. */
    impactWeight?: number;

    /** User-defined weight for freshness (e.g., recently uploaded content). */
    freshnessWeight?: number;
  };
  /**
   * Whether to enable or disable exploration of related tags for recommendations.
   *
   * @remarks
   * - When enabled, the algorithm suggests videos from tags related to the user's preferred tags.
   * - Related tags are determined by a predefined mapping of tag relationships (e.g., 'comedy' → ['improv', 'stand-up']).
   * - This setting encourages content discovery beyond the user's explicitly preferred tags.
   *
   * @example
   *  Example: User prefers "comedy" and enables related tag exploration
   * const userPreferences: UserPreferences = {
   *   preferredTags: ['comedy'],
   *   exploreRelatedTags: true,
   * };
   *
   * The algorithm may recommend videos tagged with 'improv' or 'stand-up'.
   */
  exploreRelatedTags?: boolean; // Enable/disable related tag exploration
}

/**
 * Represents user-specific data used for video recommendations.
 */
export interface UserData {
  /** List of video IDs that the user has rewatched. */
  rewatchedVideos: string[];

  /** Optional: List of video IDs that the user has saved or bookmarked. */
  savedVideos?: string[];

  /** Optional: Location of the user, e.g., 'New York'. */
  userLocation?: string;

  /**
   * Optional: Feedback scores provided by the user for specific videos.
   * The key is the video ID, and the value is the score (1-5).
   */
  feedback?: { [videoId: string]: number };

  /** Optional: List of tags the user frequently consumes. */
  exploredTags?: string[];

  /** Optional: List of creators the user frequently consumes. */
  exploredCreators?: string[];
}

/**
 * Represents the types of interactions a user can have with a video.
 */
export type InteractionType =
  | 'like' // User liked the video.
  | 'share' // User shared the video.
  | 'save' // User saved/bookmarked the video.
  | 'skip' // User skipped the video.
  | 'dislike' // User disliked the video.
  | 'report' // User reported the video.
  | 'completion' // User watched the video to completion.
  | 'pause' // User paused the video.
  | 'rewind' // User rewound the video.
  | 'revisit' // User revisited the video after some time.
  | 'follow'; // User followed the video's creator.
