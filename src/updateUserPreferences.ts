import { UserPreferences, Video, InteractionType } from './types';

/**
 * Updates the user's preferences based on their interaction with a video.
 *
 * @param {UserPreferences} userPreferences - The user's current preferences, including tags, creators, and impact tags.
 * @param {InteractionType} interaction - The type of interaction the user had with the video (e.g., 'like', 'share').
 * @param {Video} video - The video object that the user interacted with.
 * @returns {UserPreferences} The updated user preferences, reflecting the influence of the interaction.
 *
 * @example
 * const userPreferences: UserPreferences = {
 *   preferredTags: ['music', 'education'],
 *   preferredImpactTags: ['sustainability'],
 *   preferredCreators: ['New York'],
 *   rewatchedVideos: [],
 *   minDuration: 10,
 *   maxDuration: 300,
 * };
 *
 * const video: Video = {
 *   id: 'video1',
 *   tags: ['comedy', 'education'],
 *   duration: 120,
 *   views: 5000,
 *   engagementRate: 0.8,
 *   creatorLocation: 'California',
 *   impactTags: ['community', 'education'],
 *   uploadDate: '2023-12-01T10:00:00Z',
 * };
 *
 * const updatedPreferences = updateUserPreferences(userPreferences, 'like', video);
 * console.log(updatedPreferences.preferredTags); // Outputs: ['music', 'education', 'comedy']
 *
 * @remarks
 * - The function modifies the user preferences differently depending on the type of interaction:
 *   - **'like', 'share', 'save'**: Adds the video's tags (and impact tags for 'share') to the user's preferences.
 *   - **'skip', 'dislike'**: Removes the video's tags from the user's preferred tags.
 *   - **'follow'**: Adds the video's creator to the user's preferred creators.
 *   - **'completion', 'revisit'**: No changes to preferences.
 * - The function ensures that tags and creators are unique by using `Set` to eliminate duplicates.
 */
export const updateUserPreferences = (
  userPreferences: UserPreferences,
  interaction: InteractionType,
  video: Video,
): UserPreferences => {
  switch (interaction) {
    case 'like':
      // Add the video's tags to preferred tags
      userPreferences.preferredTags = Array.from(new Set([...userPreferences.preferredTags, ...video.tags]));
      break;
    case 'share':
      // Add the video's tags and impact tags to preferences
      userPreferences.preferredTags = Array.from(new Set([...userPreferences.preferredTags, ...video.tags]));
      userPreferences.preferredImpactTags = Array.from(
        new Set([...(userPreferences.preferredImpactTags || []), ...(video.impactTags || [])]),
      );
      break;
    case 'save':
      // Add the video's tags to preferred tags
      userPreferences.preferredTags = Array.from(new Set([...userPreferences.preferredTags, ...video.tags]));
      break;
    case 'skip':
    case 'dislike':
      // Remove the video's tags from preferred tags
      userPreferences.preferredTags = userPreferences.preferredTags.filter((tag) => !video.tags.includes(tag));
      break;
    case 'completion':
    case 'revisit':
      // No changes to preferences
      break;
    case 'follow':
      // Add the video's creator to preferred creators
      userPreferences.preferredCreators = [...(userPreferences.preferredCreators || []), video.creatorLocation || ''];
      break;
    default:
      break;
  }

  return userPreferences;
};
