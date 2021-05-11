const path = require('path')
const escapeStringForRegExp = require('./helpers/escape-string-for-regexp')

const getModuleNameMapper = ({ aliases }) => {
  const moduleNameMapper = {}

  for (const unescapedAliasName in aliases) {
    const aliasName = escapeStringForRegExp(unescapedAliasName)
    const aliasPath = aliases[unescapedAliasName]

    const isFile = path.extname(aliasPath).length > 0

    if (isFile) {
      moduleNameMapper[`^${aliasName}$`] = aliasPath
    } else {
      moduleNameMapper[`^${aliasName}$`] = aliasPath
      moduleNameMapper[`^${aliasName}/(.*)$`] = `${aliasPath}/$1`
    }
  }

  return moduleNameMapper
}

module.exports = getModuleNameMapper
