const preCheck = require('./pre-check')
const normalizePluginOptions = require('./normalize-plugin-options')
const extractAliases = require('./extract-aliases')

const createOverrider = cb => cracoOptions => {
  preCheck(cracoOptions)

  const options = normalizePluginOptions(cracoOptions.pluginOptions)
  const aliases = extractAliases(cracoOptions)

  return cb({ aliases, options }, cracoOptions)
}

module.exports = createOverrider
