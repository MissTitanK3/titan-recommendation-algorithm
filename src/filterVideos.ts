import { Video, UserPreferences } from './types';

/**
 * Filters videos based on user preferences, ensuring only videos that match
 * the user's tag preferences and duration range are included.
 *
 * @param {UserPreferences} userPreferences - The user's preferences, including preferred tags,
 * minimum and maximum video durations, and other criteria.
 * @param {Video[]} allVideos - An array of all available videos to filter.
 * @returns {Video[]} An array of videos that match the user's preferences.
 *
 * @example
 * const userPreferences: UserPreferences = {
 *   preferredTags: ['comedy', 'education'],
 *   minDuration: 10,
 *   maxDuration: 300,
 * };
 *
 * const allVideos: Video[] = [
 *   { id: '1', tags: ['comedy'], duration: 120 },
 *   { id: '2', tags: ['sports'], duration: 60 },
 * ];
 *
 * const filteredVideos = filterVideos(userPreferences, allVideos);
 * console.log(filteredVideos); // Outputs videos matching the tags and duration
 *
 * @remarks
 * - The function checks if a video's tags overlap with the user's preferred tags.
 * - Videos must fall within the specified duration range (`minDuration` to `maxDuration`).
 * - If no videos match the preferences, the function returns an empty array.
 */
export const filterVideos = (userPreferences: UserPreferences, allVideos: Video[]): Video[] => {
  return allVideos.filter(
    (video) =>
      video.tags.some((tag) => userPreferences.preferredTags.includes(tag)) &&
      video.duration >= userPreferences.minDuration &&
      video.duration <= userPreferences.maxDuration,
  );
};
