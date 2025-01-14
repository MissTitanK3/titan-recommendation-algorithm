import { Video } from './types';

/**
 * Balances the content by alternating between impact and entertainment videos, ensuring
 * a mix of meaningful and lighthearted recommendations.
 *
 * @param scoredVideos - An array of scored video objects, where each object contains a video and its calculated score.
 * @returns A balanced array of scored videos, alternating between impact and entertainment videos.
 *
 * @example
 * const videos = [
 *   { video: { id: '1', impactTags: ['education'] }, score: 2 },
 *   { video: { id: '2', impactTags: [] }, score: 1.5 },
 * ];
 * const balanced = balanceContent(videos);
 * console.log(balanced); // Returns a mix of impact and entertainment videos
 *
 * @remarks
 * - Videos are divided into two categories:
 *   1. Impact videos: Videos containing at least one `impactTag`.
 *   2. Entertainment videos: Videos without any `impactTag`.
 * - The function alternates between these categories up to the ratio of the smaller group.
 * - If the two categories have unequal sizes, only the number of videos matching the smaller group is included.
 */
export const balanceContent = (scoredVideos: { video: Video; score: number }[]): { video: Video; score: number }[] => {
  const impactVideos = scoredVideos.filter((v) => v.video.impactTags?.length);
  const entertainmentVideos = scoredVideos.filter((v) => !v.video.impactTags?.length);

  const ratio = Math.min(impactVideos.length, entertainmentVideos.length);

  return impactVideos.slice(0, ratio).concat(entertainmentVideos.slice(0, ratio));
};
