import { Worker } from 'worker_threads';
import { UserData, UserPreferences, Video } from './types';
import { filterVideos } from './filterVideos';

/**
 * Generates a personalized feed of videos for a user based on their preferences and data.
 *
 * @param {UserPreferences} userPreferences - The user's preferences, including preferred tags,
 * duration range, and other filters.
 * @param {UserData} userData - Data specific to the user, such as location and watch history.
 * @param {Video[]} allVideos - An array of all available videos to process.
 * @returns {Promise<string[]>} A promise that resolves to an array of video IDs, representing
 * the personalized feed sorted by relevance.
 *
 * @example
 * const userPreferences: UserPreferences = {
 *   preferredTags: ['comedy', 'education'],
 *   minDuration: 10,
 *   maxDuration: 300,
 * };
 * const userData: UserData = { userLocation: 'New York', rewatchedVideos: ['video1'] };
 * const allVideos: Video[] = [
 *   { id: '1', tags: ['comedy'], duration: 120 },
 *   { id: '2', tags: ['sports'], duration: 60 },
 * ];
 *
 * generateFeed(userPreferences, userData, allVideos).then((feed) => {
 *   console.log(feed); // Outputs an array of sorted video IDs
 * });
 *
 * @remarks
 * - **Filtering**: The function uses `filterVideos` to remove videos that don't match the user's preferences.
 * - **Worker Threads**: After filtering, a worker thread (`worker.js`) is used to process and sort the videos.
 * - **Error Handling**:
 *   - Resolves with the sorted video IDs if the worker completes successfully.
 *   - Rejects with an error if the worker encounters an issue or exits with a non-zero code.
 * - The worker thread should be properly configured to handle the passed `workerData`.
 */
export const generateFeed = (
  userPreferences: UserPreferences,
  userData: UserData,
  allVideos: Video[],
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    // Filter videos based on user preferences
    const filteredVideos = filterVideos(userPreferences, allVideos);

    // Create a worker thread for scoring and sorting videos
    const worker = new Worker('./dist/worker.js', {
      workerData: { userPreferences, userData, allVideos: filteredVideos },
    });

    // Handle worker events
    worker.on('message', resolve); // Resolve with sorted video IDs
    worker.on('error', reject); // Reject on worker error
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
};
