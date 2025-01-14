import { parentPort, workerData } from 'worker_threads';
import { scoreVideo } from './scoreVideos';
import { Video, UserPreferences, UserData } from './types';

/**
 * Represents the data structure passed to the worker thread.
 */
interface WorkerData {
  /** User preferences for video recommendations. */
  userPreferences: UserPreferences;

  /** User-specific data, including location, feedback, and history. */
  userData: UserData;

  /** Array of all videos to be scored and sorted. */
  allVideos: Video[];
}

// Type assertion for workerData to ensure it matches the expected structure.
const { userPreferences, userData, allVideos } = workerData as WorkerData;

// Score each video based on user preferences and data.
const scoredVideos = allVideos.map((video) => ({
  video,
  score: scoreVideo(video, userPreferences, userData),
}));

// Sort videos in descending order of their score.
const sortedVideos = scoredVideos.sort((a, b) => b.score - a.score);

// Send the sorted video IDs back to the parent thread.
parentPort?.postMessage(sortedVideos.map((item) => item.video.id));
