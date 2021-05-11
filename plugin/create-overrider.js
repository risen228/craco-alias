const preCheck = require('./pre-check')
const normalizePluginOptions = require('./normalize-plugin-options')
const extractAliases = require('./extract-aliases')
const { searchObject, printBaseData, printObject } = require('./debug')
const { filterAliases } = require('./filter-aliases')

const createOverrider = (callback, debugInfo) => (cracoOptions) => {
  preCheck(cracoOptions)

  const options = normalizePluginOptions(cracoOptions.pluginOptions)
  const initialAliases = extractAliases(cracoOptions)
  const aliases = filterAliases(initialAliases, options.filter)

  if (options.debug) {
    printBaseData({
      initialOptions: cracoOptions.pluginOptions,
      normalizedOptions: options,
      initialAliases,
      aliases,
    })
  }

  const overridedConfig = callback({ aliases, options }, cracoOptions)

  if (options.debug) {
    const { name, aliasesPath } = debugInfo
    const aliases = searchObject(overridedConfig, aliasesPath)
    printObject(name, aliases)
  }

  return overridedConfig
}

module.exports = createOverrider
