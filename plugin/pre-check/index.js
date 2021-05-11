const normalizePluginOptions = require('../normalize-plugin-options')
const exitWithError = require('../exit-with-error')
const checkOptions = require('./check-options')
const checkConfig = require('./check-config')

const preCheck = ({ pluginOptions, context: { paths } }) => {
  checkOptions({
    pluginOptions,
    handleError: exitWithError,
  })

  const options = normalizePluginOptions(pluginOptions)

  if (options.source === 'jsconfig')
    checkConfig({
      configName: 'jsconfig',
      configPath: paths.appJsConfig,
    })

  if (options.source === 'tsconfig')
    checkConfig({
      configName: 'tsconfig',
      configPath: options.tsConfigPath,
    })
}

module.exports = preCheck
