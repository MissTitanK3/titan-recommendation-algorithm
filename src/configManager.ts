import { Config, defaultConfig } from './config';

let currentConfig: Config = { ...defaultConfig };

/**
 * Retrieves the current configuration for the recommendation algorithm.
 *
 * @returns {Config} The current configuration object, which includes all weights,
 * thresholds, and settings used to calculate video scores and generate recommendations.
 *
 * @example
 * const config = getConfig();
 * console.log(config.noveltyScoreWeight); // Outputs the current novelty score weight
 *
 * @remarks
 * This function always returns the most up-to-date configuration. The configuration
 * can be updated dynamically using the `updateConfig` function.
 */
export const getConfig = (): Config => {
  return currentConfig;
};

/**
 * Updates the current configuration with new values.
 *
 * @param {Partial<Config>} newConfig - An object containing the new configuration values
 * to update. Only the properties specified in `newConfig` will be updated; all other
 * properties in the configuration will remain unchanged.
 *
 * @example
 * updateConfig({ noveltyScoreWeight: 1.2 });
 * const updatedConfig = getConfig();
 * console.log(updatedConfig.noveltyScoreWeight); // Outputs 1.2
 *
 * @remarks
 * - Use this function to modify specific parts of the configuration without needing
 * to redefine the entire configuration object.
 * - The `Partial<Config>` type allows updating only a subset of the configuration properties.
 */
export const updateConfig = (newConfig: Partial<Config>): void => {
  currentConfig = { ...currentConfig, ...newConfig };
};
