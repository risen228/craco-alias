function filterAliases(aliases, filter) {
  return Object.fromEntries(Object.entries(aliases).filter(filter))
}

exports.filterAliases = filterAliases
