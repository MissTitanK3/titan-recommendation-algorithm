"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const scoreVideos_1 = require("./scoreVideos");
// Type assertion for workerData
const { userPreferences, userData, allVideos } = worker_threads_1.workerData;
// Score and sort videos
const scoredVideos = allVideos.map((video) => ({
    video,
    score: (0, scoreVideos_1.scoreVideo)(video, userPreferences, userData),
}));
const sortedVideos = scoredVideos.sort((a, b) => b.score - a.score);
// Return sorted video IDs
worker_threads_1.parentPort?.postMessage(sortedVideos.map((item) => item.video.id));
