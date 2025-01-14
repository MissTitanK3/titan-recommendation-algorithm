import { Video, UserPreferences, UserData } from './types';
import { getConfig } from './configManager';
import { seasonalEvents } from './seasonalEvents';

const memoizedScores: { [key: string]: number } = {};

/**
 * Scores a video based on user preferences, user data, and platform configuration.
 *
 * The scoring system incorporates factors like engagement, novelty, impact, freshness,
 * context (e.g., time of day), social proof, user feedback, and diversity penalties
 * to generate a personalized relevance score for each video.
 *
 * @param {Video} video - The video object to score, containing properties like tags, views, and engagement rate.
 * @param {UserPreferences} userPreferences - The user's preferences, including preferred tags, impact tags, and creators.
 * @param {UserData} userData - The user's data, such as location, watch history, and feedback on videos.
 * @returns {number} The total score for the video, which represents its relevance to the user.
 *
 * @example
 * const video: Video = {
 *   id: 'video1',
 *   tags: ['comedy', 'education'],
 *   duration: 120,
 *   views: 5000,
 *   engagementRate: 0.8,
 *   uploadDate: '2023-12-01T10:00:00Z',
 * };
 * const userPreferences: UserPreferences = {
 *   preferredTags: ['comedy', 'education'],
 *   minDuration: 10,
 *   maxDuration: 300,
 * };
 * const userData: UserData = {
 *   userLocation: 'New York',
 *   rewatchedVideos: ['video1'],
 * };
 *
 * const score = scoreVideo(video, userPreferences, userData);
 * console.log(score); // Outputs the calculated score for the video
 *
 * @remarks
 * - **Memoization**: Caches scores for previously processed videos to optimize performance.
 * - **Weight Adjustments**: Incorporates user-defined weight adjustments for novelty, engagement, impact, and freshness.
 * - **Contextual Boosts**: Adds a boost for videos tagged with "inspiration" or "relaxation" based on the time of day.
 * - **Social Proof**: Considers likes, shares, and comments with customizable weights.
 * - **Feedback**: Factors in user feedback for specific videos, scaled by a configurable weight.
 * - **Diversity Penalties**: Penalizes videos from overused tags or creators to promote diversity in recommendations.
 */
export const scoreVideo = (video: Video, userPreferences: UserPreferences, userData: UserData): number => {
  const memoKey = `${video.id}:${JSON.stringify(userPreferences)}:${JSON.stringify(userData)}`;
  if (memoizedScores[memoKey]) {
    return memoizedScores[memoKey];
  }

  const config = getConfig();

  // Retrieve weights from user preferences or configuration
  const noveltyWeight = userPreferences.weightAdjustments?.noveltyWeight ?? config.noveltyScoreWeight;
  const engagementWeight = userPreferences.weightAdjustments?.engagementWeight ?? 0.3;
  const impactWeight = userPreferences.weightAdjustments?.impactWeight ?? config.impactTagWeight;
  const freshnessWeight = userPreferences.weightAdjustments?.freshnessWeight ?? config.freshnessWeight;

  // Calculate individual scores
  const engagementScore = (video.engagementRate || 0) * 0.15;
  const contentMatchScore = video.tags.reduce((score, tag) => {
    if (userPreferences.preferredTags.includes(tag)) {
      return score + 0.3;
    }
    if (
      userPreferences.exploreRelatedTags &&
      userPreferences.preferredTags.some((preferredTag) => (relatedTagsMap[preferredTag] || []).includes(tag))
    ) {
      return score + 0.15;
    }
    return score;
  }, 0);
  const impactScore =
    video.impactTags?.reduce(
      (score, tag) => (userPreferences.preferredImpactTags?.includes(tag) ? score + config.impactTagWeight : score),
      0,
    ) || 0;
  const localContentBoost =
    video.creatorLocation === userData.userLocation && config.prioritizeLocalContent ? config.localContentBoost : 0;
  const rewatchBoost = userData.rewatchedVideos.includes(video.id) ? 0.5 : 0;
  const saveBoost = userData.savedVideos?.includes(video.id) ? 0.3 : 0;
  const followBoost = userPreferences.preferredCreators?.includes(video.creatorLocation || '') ? 0.2 : 0;

  const daysSinceUpload = (new Date().getTime() - new Date(video.uploadDate).getTime()) / (1000 * 60 * 60 * 24);
  const timeDecayFactor = Math.max(0, 1 - daysSinceUpload / config.timeDecayThreshold);
  const freshnessScore = timeDecayFactor * config.freshnessWeight;

  const noveltyPenalty = Math.pow(video.views / config.maxViewsForNovelty, 1);
  const noveltyScore = Math.max(0, 1 - noveltyPenalty) * Math.min(config.noveltyScoreWeight, 1);
  const clampedNoveltyScore = Math.max(0, noveltyScore);

  const currentHour = new Date().getHours();
  const morningStart = userPreferences.morningStart ?? 6;
  const morningEnd = userPreferences.morningEnd ?? 12;
  const eveningStart = userPreferences.eveningStart ?? 18;
  const eveningEnd = userPreferences.eveningEnd ?? 24;

  const contextBoost =
    currentHour >= morningStart && currentHour < morningEnd && video.tags.includes('inspiration')
      ? 0.2
      : currentHour >= eveningStart && currentHour < eveningEnd && video.tags.includes('relaxation')
      ? 0.2
      : 0;

  const socialProofScore =
    (video.comments || 0) * config.socialProofWeights.comments +
    (video.shares || 0) * config.socialProofWeights.shares +
    (video.likes || 0) * config.socialProofWeights.likes;

  const feedbackScore = userData.feedback?.[video.id] ? userData.feedback[video.id] * config.feedbackWeight : 0;

  const diversityPenalty = video.tags.some((tag) => userData.exploredTags?.includes(tag)) ? -0.2 : 0.2;
  const creatorDiversityPenalty = userData.exploredCreators?.includes(video.creatorLocation || '') ? -0.1 : 0.1;
  const currentDate = new Date();
  const seasonalBoost = video.seasonalTags?.some((tag) => seasonalEvents[currentDate.getMonth()]?.includes('holiday'))
    ? 0.3
    : 0;

  const totalScore =
    seasonalBoost +
    noveltyWeight +
    engagementWeight +
    impactWeight +
    freshnessWeight +
    feedbackScore +
    socialProofScore +
    engagementScore +
    contentMatchScore +
    impactScore +
    localContentBoost +
    clampedNoveltyScore +
    rewatchBoost +
    saveBoost +
    followBoost +
    freshnessScore +
    contextBoost +
    diversityPenalty +
    creatorDiversityPenalty;

  memoizedScores[memoKey] = totalScore;
  return totalScore;
};
