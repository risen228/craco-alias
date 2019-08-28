const fs = require('fs')
const path = require('path')
const normalizePluginOptions = require('../normalize-plugin-options')
const normalizeAliases = require('./normalize-aliases')

const extractAliasesFromConfig = ({ configPath, appPath }) => {
  const configFileContents = fs.readFileSync(configPath)
  const config = JSON.parse(configFileContents)

  const { compilerOptions } = config

  const standardAliases = {}

  for (let aliasName in compilerOptions.paths) {
    const [aliasPath] = compilerOptions.paths[aliasName]
    standardAliases[aliasName.replace('/*', '')] = aliasPath.replace('/*', '')
  }

  return normalizeAliases({
    basePath: path.join(appPath, compilerOptions.baseUrl),
    aliases: standardAliases
  })
}

const extractAliases = ({ pluginOptions, context: { paths } }) => {
  const options = normalizePluginOptions(pluginOptions)

  const { appPath } = paths

  if (options.source === 'jsconfig')
    return extractAliasesFromConfig({
      configPath: paths.appJsConfig,
      appPath
    })

  if (options.source === 'tsconfig')
    return extractAliasesFromConfig({
      configPath: options.tsConfigPath,
      appPath
    })

  if (options.source === 'options')
    return normalizeAliases({
      basePath: appPath,
      aliases: options.aliases
    })
}

module.exports = extractAliases
