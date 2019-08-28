const normalizePluginOptions = require('../normalize-plugin-options')

const checkOptions = ({ pluginOptions, handleError }) => {
  if (pluginOptions && typeof pluginOptions !== 'object')
    return handleError('You have provided an invalid options')

  const options = normalizePluginOptions(pluginOptions)

  const availableSources = ['jsconfig', 'tsconfig', 'options']

  if (!availableSources.includes(options.source)) {
    const availableSourcesString = availableSources
      .map(s => `"${s}"`)
      .join(', ')

    return handleError(
      'You have provided an invalid aliases source.' +
        ` Available sources are: ${availableSourcesString}`
    )
  }

  if (options.source === 'tsconfig') {
    if (typeof options.tsConfigPath !== 'string')
      return handleError(
        'The "source" option is set to "tsconfig",' +
          ' but option "tsConfigPath" is missing or has incorrect value'
      )
  }

  if (options.source === 'options') {
    if (typeof options.aliases !== 'object' || options.aliases === null)
      return handleError(
        'The "source" option is set to "options",' +
          ' but you have provided an invalid aliases'
      )
  }
}

module.exports = checkOptions
