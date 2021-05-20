const path = require('path')

const normalizeAliases = ({ absoluteBaseUrl, aliases }) => {
  const result = {}

  for (const aliasName in aliases) {
    // remove trailing slash
    const cleanAlias = aliases[aliasName].replace(/\/$/, '')

    // make alias path absolute
    result[aliasName] = path.resolve(absoluteBaseUrl, cleanAlias)
  }

  return result
}

module.exports = normalizeAliases
