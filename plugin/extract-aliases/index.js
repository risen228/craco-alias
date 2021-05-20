const fs = require('fs')
const path = require('path')
const normalizePluginOptions = require('../normalize-plugin-options')
const normalizeAliases = require('./normalize-aliases')

const extractAliasesFromConfig = ({ configPath, absoluteBaseUrl }) => {
  const configFileContents = fs.readFileSync(configPath)
  const config = JSON.parse(configFileContents)

  const { compilerOptions } = config

  const standardAliases = {}

  for (const aliasName in compilerOptions.paths) {
    const [aliasPath] = compilerOptions.paths[aliasName]
    standardAliases[aliasName.replace('/*', '')] = aliasPath.replace('/*', '')
  }

  return normalizeAliases({
    absoluteBaseUrl,
    aliases: standardAliases,
  })
}

const extractAliases = ({ pluginOptions, context: { paths } }) => {
  const options = normalizePluginOptions(pluginOptions)

  const { appPath } = paths
  const { baseUrl } = options

  const absoluteBaseUrl = path.resolve(appPath, baseUrl)

  if (options.source === 'jsconfig')
    return extractAliasesFromConfig({
      configPath: paths.appJsConfig,
      absoluteBaseUrl,
    })

  if (options.source === 'tsconfig')
    return extractAliasesFromConfig({
      configPath: options.tsConfigPath,
      absoluteBaseUrl,
    })

  if (options.source === 'options')
    return normalizeAliases({
      absoluteBaseUrl,
      aliases: options.aliases,
    })
}

module.exports = extractAliases
