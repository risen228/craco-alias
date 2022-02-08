const path = require('path')

const normalizeAliases = ({ absoluteBaseUrl, aliases }) => {
  const result = {}

  function resolve(alias) {
    // remove trailing slash
    const cleanAlias = alias.replace(/\/$/, '')

    // make alias path absolute
    return path.resolve(absoluteBaseUrl, cleanAlias)
  }

  for (const aliasName in aliases) {
    const alias = aliases[aliasName]
    if (typeof alias === 'string') {
      result[aliasName] = resolve(alias)
    } else {
      const results = []
      alias.forEach((anAlias) => {
        results.push(resolve(anAlias))
      })
      result[aliasName] = results
    }
  }

  return result
}

module.exports = normalizeAliases
