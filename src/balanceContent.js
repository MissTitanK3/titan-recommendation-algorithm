"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceContent = void 0;
const balanceContent = (scoredVideos) => {
    const impactVideos = scoredVideos.filter((v) => v.video.impactTags?.length);
    const entertainmentVideos = scoredVideos.filter((v) => !v.video.impactTags?.length);
    const ratio = Math.min(impactVideos.length, entertainmentVideos.length);
    return impactVideos.slice(0, ratio).concat(entertainmentVideos.slice(0, ratio));
};
exports.balanceContent = balanceContent;
