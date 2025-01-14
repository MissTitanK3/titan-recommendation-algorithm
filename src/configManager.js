"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = exports.getConfig = void 0;
const config_1 = require("./config");
let currentConfig = { ...config_1.defaultConfig };
const getConfig = () => {
    return currentConfig;
};
exports.getConfig = getConfig;
const updateConfig = (newConfig) => {
    currentConfig = { ...currentConfig, ...newConfig };
};
exports.updateConfig = updateConfig;
