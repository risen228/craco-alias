const exitWithError = require('./exit-with-error')

/**
 * @typedef NormalizedConfig
 * @type {object}
 * @property {'jsconfig' | 'tsconfig' | 'options'} source
 * @property {string} baseUrl
 * @property {Object.<string, string>} aliases
 * @property {string} [tsConfigPath]
 * @property {() => true} [filter]
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
      debug: false,
      filter: () => true
    }

  const {
    source = 'options',
    baseUrl = './',
    tsConfigPath,
    aliases = {},
    debug = false,
    filter = () => true
  } = originalOptions

  if (source === 'jsconfig')
    return {
      source,
      baseUrl,
      debug,
      filter
    }

  if (source === 'tsconfig')
    return {
      source,
      baseUrl,
      tsConfigPath,
      debug,
      filter
    }

  return {
    source,
    baseUrl,
    aliases,
    debug,
    filter
  }
}

module.exports = normalizePluginOptions
