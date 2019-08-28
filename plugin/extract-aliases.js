const fs = require('fs')
const path = require('path')
const normalizePluginOptions = require('./normalize-plugin-options')

const joinAliases = ({ basePath, aliases }) => {
  const result = {}

  for (let aliasName in aliases) {
    result[aliasName] = path.join(basePath, aliases[aliasName])
  }

  return result
}

const extractAliasesFromConfig = ({ configPath, appPath }) => {
  const configFileContents = fs.readFileSync(configPath)
  const config = JSON.parse(configFileContents)

  const { compilerOptions } = config

  const normalizedAliases = {}

  for (let aliasName in compilerOptions.paths) {
    const [aliasPath] = compilerOptions.paths[aliasName]
    normalizedAliases[aliasName.replace('/*', '')] = aliasPath.replace('/*', '')
  }

  return joinAliases({
    basePath: path.join(appPath, compilerOptions.baseUrl),
    aliases: normalizedAliases
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
    return joinAliases({
      basePath: appPath,
      aliases: options.aliases
    })
}

module.exports = extractAliases
