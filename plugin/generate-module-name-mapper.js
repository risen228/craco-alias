const getModuleNameMapper = ({ aliases }) => {
  const moduleNameMapper = {}

  for (let aliasName in aliases) {
    const aliasPath = aliases[aliasName]
    moduleNameMapper[`^${aliasName}(.*)$`] = `${aliasPath}$1`
  }

  return moduleNameMapper
}

module.exports = getModuleNameMapper
