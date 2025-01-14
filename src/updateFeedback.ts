import { UserData } from './types';

/**
 * Updates the feedback score for a specific video in the user's data.
 *
 * @param {UserData} userData - The user's data, including existing feedback for videos.
 * @param {string} videoId - The unique ID of the video for which feedback is being provided.
 * @param {number} feedback - The feedback score for the video, ranging from 1 (negative) to 5 (positive).
 * @returns {UserData} The updated `UserData` object with the new feedback score included.
 *
 * @example
 * const userData: UserData = {
 *   feedback: { 'video1': 4 },
 *   rewatchedVideos: ['video1'],
 * };
 *
 * const updatedData = updateFeedback(userData, 'video2', 5);
 * console.log(updatedData.feedback); // Outputs: { 'video1': 4, 'video2': 5 }
 *
 * @remarks
 * - If the `feedback` property does not exist in the `userData` object, it will be initialized.
 * - The feedback score is stored as a key-value pair, where the key is the video ID and the value is the score.
 * - This function creates a new `UserData` object and does not mutate the original.
 */
export const updateFeedback = (userData: UserData, videoId: string, feedback: number): UserData => {
  const updatedFeedback = { ...(userData.feedback || {}), [videoId]: feedback };
  return { ...userData, feedback: updatedFeedback };
};
