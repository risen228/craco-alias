const path = require('path')

const getModuleNameMapper = ({ aliases }) => {
  const moduleNameMapper = {}

  for (let aliasName in aliases) {
    const aliasPath = aliases[aliasName]

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
