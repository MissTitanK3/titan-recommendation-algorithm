"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreVideo = void 0;
const configManager_1 = require("./configManager");
const memoizedScores = {};
const scoreVideo = (video, userPreferences, userData) => {
    if (memoizedScores[video.id]) {
        return memoizedScores[video.id];
    }
    const config = (0, configManager_1.getConfig)();
    const engagementScore = (video.engagementRate || 0) * 0.4;
    const contentMatchScore = video.tags.reduce((score, tag) => (userPreferences.preferredTags.includes(tag) ? score + 0.3 : score), 0);
    const impactScore = video.impactTags?.reduce((score, tag) => (userPreferences.preferredImpactTags?.includes(tag) ? score + config.impactTagWeight : score), 0) || 0;
    const localContentBoost = video.creatorLocation === userData.userLocation && config.prioritizeLocalContent ? config.localContentBoost : 0;
    const rewatchBoost = userData.rewatchedVideos.includes(video.id) ? 0.5 : 0;
    const saveBoost = userData.savedVideos?.includes(video.id) ? 0.3 : 0;
    const followBoost = userPreferences.preferredCreators?.includes(video.creatorLocation || '') ? 0.2 : 0;
    const noveltyScore = 1 - video.views / config.maxViewsForNovelty;
    const totalScore = engagementScore +
        contentMatchScore +
        impactScore +
        localContentBoost +
        noveltyScore +
        rewatchBoost +
        saveBoost +
        followBoost;
    // Cache the score
    memoizedScores[video.id] = totalScore;
    return totalScore;
};
exports.scoreVideo = scoreVideo;
