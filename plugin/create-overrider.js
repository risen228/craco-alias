const preCheck = require('./pre-check')
const normalizePluginOptions = require('./normalize-plugin-options')
const extractAliases = require('./extract-aliases')
const { searchObject, printBaseData, printObject } = require('./debug')

const createOverrider = (cb, debugInfo) => cracoOptions => {
  preCheck(cracoOptions)

  const { filters, ...options } = normalizePluginOptions(
    cracoOptions.pluginOptions
  )

  let aliases = extractAliases(cracoOptions)
  if (Array.isArray(filters) && filters.length > 0) {
    aliases = Object.entries(aliases)
      .filter(([k]) => !filters.includes(k))
      .reduce((o, [k, v]) => ({ ...o, [k]: v }), {})
  }

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
