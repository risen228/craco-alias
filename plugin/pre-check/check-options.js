const normalizePluginOptions = require('../normalize-plugin-options')

const checkOptions = ({ pluginOptions, handleError }) => {
  if (typeof pluginOptions === 'undefined') {
    return handleError('Plugin options should be specified')
  }

  if (typeof pluginOptions !== 'object') {
    return handleError('Plugin options should be an object')
  }

  const options = normalizePluginOptions(pluginOptions)

  const availableSources = ['jsconfig', 'tsconfig', 'options']

  if (!availableSources.includes(options.source)) {
    const availableSourcesString = availableSources
      .map((s) => `"${s}"`)
      .join(', ')

    return handleError(
      'You have provided an invalid aliases source.' +
        ` Available sources are: ${availableSourcesString}`
    )
  }

  if (
    options.source === 'tsconfig' &&
    typeof options.tsConfigPath !== 'string'
  ) {
    return handleError(
      'The "source" option is set to "tsconfig",' +
        ' but option "tsConfigPath" is missing or has incorrect value'
    )
  }

  if (options.source === 'options') {
    if (typeof options.baseUrl !== 'string') {
      return handleError('The "baseUrl" option should be a string')
    }

    if (typeof options.aliases !== 'object' || options.aliases === null)
      return handleError(
        'The "source" option is set to "options",' +
          ' but option "aliases" is missing or has incorrect value'
      )
  }

  if (typeof options.debug !== 'boolean') {
    return handleError('The "debug" option should be a boolean value')
  }

  if (typeof options.filter !== 'function') {
    return handleError('The "filter" option should be a function')
  }

  if (typeof options.unsafeAllowModulesOutsideOfSrc !== 'boolean') {
    return handleError(
      'The "unsafeAllowModulesOutsideOfSrc" option should be a boolean value'
    )
  }
}

module.exports = checkOptions
