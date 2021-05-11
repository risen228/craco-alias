/**
 * @typedef NormalizedConfig
 * @type {object}
 * @property {'jsconfig' | 'tsconfig' | 'options'} source
 * @property {string} baseUrl
 * @property {Object.<string, string>} aliases
 * @property {string} [tsConfigPath]
 * @property {() => true} [filter]
 * @property {boolean} [unsafeAllowModulesOutsideOfSrc]
 */

/**
 * @param {any} originalOptions
 * @returns {NormalizedConfig}
 */
const normalizePluginOptions = (originalOptions) => {
  if (!originalOptions)
    return {
      source: 'options',
      baseUrl: './',
      aliases: null,
      debug: false,
      filter: () => true,
      unsafeAllowModulesOutsideOfSrc: false,
    }

  const {
    source = 'options',
    baseUrl = './',
    tsConfigPath,
    aliases = null,
    debug = false,
    filter = () => true,
    unsafeAllowModulesOutsideOfSrc = false,
  } = originalOptions

  if (source === 'jsconfig')
    return {
      source,
      baseUrl,
      debug,
      filter,
      unsafeAllowModulesOutsideOfSrc,
    }

  if (source === 'tsconfig')
    return {
      source,
      baseUrl,
      tsConfigPath,
      debug,
      filter,
      unsafeAllowModulesOutsideOfSrc,
    }

  return {
    source,
    baseUrl,
    aliases,
    debug,
    filter,
    unsafeAllowModulesOutsideOfSrc,
  }
}

module.exports = normalizePluginOptions
