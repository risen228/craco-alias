const preCheck = require('./pre-check')
const normalizePluginOptions = require('./normalize-plugin-options')
const extractAliases = require('./extract-aliases')
const { searchObject, printBaseData, printObject } = require('./debug')

const createOverrider = (cb, debugInfo) => cracoOptions => {
  preCheck(cracoOptions)

  const options = normalizePluginOptions(cracoOptions.pluginOptions)
  const aliases = extractAliases(cracoOptions)

  if (options.debug) {
    printBaseData({
      initialOptions: cracoOptions.pluginOptions,
      normalizedOptions: options,
      aliases
    })
  }

  const overridedConfig = cb({ aliases, options }, cracoOptions)

  if (options.debug) {
    const { name, aliasesPath } = debugInfo
    const aliases = searchObject(overridedConfig, aliasesPath)
    printObject(name, aliases)
  }

  return overridedConfig
}

module.exports = createOverrider
