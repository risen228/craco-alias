const path = require('path')

const normalizeAliases = ({ absoluteBaseUrl, aliases }) => {
  const result = {}

  for (let aliasName in aliases) {
    // remove trailing slash
    const cleanAlias = aliases[aliasName].replace(/\/$/, '')

    // make alias path absolute
    result[aliasName] = path.join(absoluteBaseUrl, cleanAlias)
  }

  return result
}

module.exports = normalizeAliases
