function filterAliases(aliases, filter) {
  const entries = Object.entries(aliases)
  const filteredEntries = entries.filter(filter)
  return Object.fromEntries(filteredEntries)
}

exports.filterAliases = filterAliases