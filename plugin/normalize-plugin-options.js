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
      aliases: {},
      debug: false
    }

  const {
    source = 'options',
    baseUrl = './',
    tsConfigPath,
    aliases = {},
    debug = false
  } = originalOptions

  if (source === 'jsconfig')
    return {
      source,
      baseUrl,
      debug
    }

  if (source === 'tsconfig')
    return {
      source,
      baseUrl,
      tsConfigPath,
      debug
    }

  return {
    source,
    baseUrl,
    aliases,
    debug
  }
}

module.exports = normalizePluginOptions
