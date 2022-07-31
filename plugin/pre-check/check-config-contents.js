const { parse } = require('tsconfig')

const checkConfigContents = ({
  unparsedConfig,
  configFileName,
  handleError,
}) => {
  let config

  try {
    config = parse(unparsedConfig.toString(), configFileName)
  } catch (error) {
    return handleError(
      `Cannot parse ${configFileName}. Please validate it on https://jsonformatter.curiousconcept.com.`
    )
  }

  if (!config.compilerOptions)
    return handleError(
      `Property "compilerOptions" is missing in ${configFileName}`
    )

  if (!config.compilerOptions.paths)
    return handleError(
      `Property "compilerOptions.paths" is missing in ${configFileName}`
    )
}

module.exports = checkConfigContents
