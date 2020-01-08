const exitWithError = require('./exit-with-error')

/**
 * @typedef NormalizedConfig
 * @type {object}
 * @property {'jsconfig' | 'tsconfig' | 'options'} source
 * @property {string} baseUrl
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
      baseUrl: './',
      aliases: {}
    }

  const {
    source = 'options',
    baseUrl = './',
    tsConfigPath,
    aliases = {}
  } = originalOptions

  if (source === 'jsconfig')
    return {
      source,
      baseUrl
    }

  if (source === 'tsconfig')
    return {
      source,
      baseUrl,
      tsConfigPath
    }

  return {
    source,
    baseUrl,
    aliases
  }
}

module.exports = normalizePluginOptions
