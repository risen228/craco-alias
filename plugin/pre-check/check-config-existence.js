const fs = require('fs')

const checkConfigExistence = ({
  configName,
  configFileName,
  configPath,
  handleError,
}) => {
  const isExist = fs.existsSync(configPath)

  if (!isExist)
    return handleError(
      `The "source" option is set to "${configName}",` +
        ` but no ${configFileName} was found in the project`
    )
}

module.exports = checkConfigExistence
