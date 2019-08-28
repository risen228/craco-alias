const exitWithError = require('./exit-with-error')

/**
 * @typedef NormalizedConfig
 * @type {object}
 * @property {'jsconfig' | 'tsconfig' | 'options'} source
 * @property {Object.<string, string>} aliases
 * @property {string} [tsConfigPath]
 */

/**
 * @param {any} originalOptions
 * @returns {NormalizedConfig}
 */
const normalizePluginOptions = originalOptions => {
  if (!originalOptions)
    return {
      source: 'options',
      aliases: {}
    }

  const { source = 'options', tsConfigPath, aliases = {} } = originalOptions

  if (source === 'jsconfig')
    return {
      source
    }

  if (source === 'tsconfig')
    return {
      source,
      tsConfigPath
    }

  return {
    source,
    aliases
  }
}

module.exports = normalizePluginOptions
