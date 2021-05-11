const fs = require('fs')
const path = require('path')

const exitWithError = require('../exit-with-error')
const checkConfigExistence = require('./check-config-existence')
const checkConfigContents = require('./check-config-contents')

const checkConfig = ({ configName, configPath }) => {
  const configFileName = path.basename(configPath)

  checkConfigExistence({
    configName,
    configFileName,
    configPath,
    handleError: exitWithError,
  })

  const unparsedConfig = fs.readFileSync(configPath)

  checkConfigContents({
    unparsedConfig,
    configFileName,
    handleError: exitWithError,
  })
}

module.exports = checkConfig
