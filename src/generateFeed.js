"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFeed = void 0;
const worker_threads_1 = require("worker_threads");
const generateFeed = (userPreferences, userData, allVideos) => {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker('./worker.js', {
            workerData: { userPreferences, userData, allVideos },
        });
        worker.on('message', resolve); // Get the sorted video IDs
        worker.on('error', reject); // Handle any worker errors
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
};
exports.generateFeed = generateFeed;
