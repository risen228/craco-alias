function fromEntries(entries) {
  const result = {}
  for (const [key, value] of entries) {
    result[key] = value
  }
  return result
}

function filterAliases(aliases, filter) {
  const entries = Object.entries(aliases)
  const filteredEntries = entries.filter(filter)
  return fromEntries(filteredEntries)
}

exports.filterAliases = filterAliases
