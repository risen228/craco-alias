const exitWithError = (message) => {
  console.log('\u001B[31m%s\u001B[0m', '[Craco-Alias Error]', message)

  console.log(
    '\nPlugin documentation:',
    '\u001B[34mhttps://github.com/risenforces/craco-alias\u001B[0m'
  )

  process.exit(0)
}

module.exports = exitWithError
