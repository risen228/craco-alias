const fs = require('fs')
const path = require('path')
const { parse } = require('tsconfig')
const normalizePluginOptions = require('../normalize-plugin-options')
const normalizeAliases = require('./normalize-aliases')

const extractAliasesFromConfig = ({ configPath, absoluteBaseUrl }) => {
  const configFileContents = fs.readFileSync(configPath).toString()
  const config = parse(configFileContents, configPath)

  const { compilerOptions } = config

  const standardAliases = {}

  for (const aliasName in compilerOptions.paths) {
    const alias = compilerOptions.paths[aliasName]
    if (typeof alias === 'string') {
      const [aliasPath] = compilerOptions.paths[aliasName]
      standardAliases[aliasName.replace('/*', '')] = aliasPath.replace('/*', '')
    } else {
      const aliasPath = []
      alias.forEach((anAlias) => {
        const sanitized = anAlias.replace('/*', '')
        if (!aliasPath.includes(sanitized)) aliasPath.push(sanitized)
      })
      standardAliases[aliasName.replace('/*', '')] =
        aliasPath.length > 1 ? aliasPath : aliasPath[0]
    }
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
