"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterVideos = void 0;
const filterVideos = (userPreferences, allVideos) => {
    return allVideos.filter((video) => video.tags.some((tag) => userPreferences.preferredTags.includes(tag)) &&
        video.duration >= userPreferences.minDuration &&
        video.duration <= userPreferences.maxDuration);
};
exports.filterVideos = filterVideos;
