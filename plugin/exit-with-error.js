const exitWithError = message => {
  console.log('\x1b[31m%s\x1b[0m', message)

  console.log(
    '\nPlugin documentation:',
    '\x1b[34mhttps://github.com/risenforces/craco-alias\x1b[0m'
  )

  process.exit(0)
}

module.exports = exitWithError
