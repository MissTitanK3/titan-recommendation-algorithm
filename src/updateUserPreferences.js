"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPreferences = void 0;
const updateUserPreferences = (userPreferences, interaction, video) => {
    switch (interaction) {
        case 'like':
            userPreferences.preferredTags = Array.from(new Set([...userPreferences.preferredTags, ...video.tags]));
            break;
        case 'share':
            userPreferences.preferredTags = Array.from(new Set([...userPreferences.preferredTags, ...video.tags]));
            userPreferences.preferredImpactTags = Array.from(new Set([...(userPreferences.preferredImpactTags || []), ...(video.impactTags || [])]));
            break;
        case 'save':
            userPreferences.preferredTags = [...new Set([...userPreferences.preferredTags, ...video.tags])];
            break;
        case 'skip':
        case 'dislike':
            userPreferences.preferredTags = userPreferences.preferredTags.filter((tag) => !video.tags.includes(tag));
            break;
        case 'completion':
        case 'revisit':
            // No changes, but can use to boost retention stats.
            break;
        case 'follow':
            userPreferences.preferredCreators = [...(userPreferences.preferredCreators || []), video.creatorLocation || ''];
            break;
        default:
            break;
    }
    return userPreferences;
};
exports.updateUserPreferences = updateUserPreferences;
