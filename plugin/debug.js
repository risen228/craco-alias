const state = {
  wasOptionsPrinted: false,
  callCount: 0,
}

function debounce(callback, wait, immediate = false) {
  let timeout = null

  return function (...args) {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, args)

    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) {
      next()
    }
  }
}

function blue(string) {
  return '\u001B[34m' + string + '\u001B[0m'
}

function searchObject(object, path) {
  return path.split('.').reduce((acc, segment) => {
    if (typeof acc !== 'object') {
      return null
    }

    return acc[segment]
  }, object)
}

function exit() {
  process.exit(0)
}

const debouncedExit = debounce(exit, 70)

function printBaseData({
  initialOptions,
  normalizedOptions,
  initialAliases,
  aliases,
}) {
  if (state.wasOptionsPrinted) return

  console.log(blue('Initial options:') + '\n')
  console.log(JSON.stringify(initialOptions, null, 2) + '\n')
  console.log(blue('Normalized options:') + '\n')
  console.log(JSON.stringify(normalizedOptions, null, 2) + '\n')
  console.log(blue('Initial aliases:') + '\n')
  console.log(JSON.stringify(initialAliases, null, 2) + '\n')
  console.log(blue('Aliases:') + '\n')
  console.log(JSON.stringify(aliases, null, 2) + '\n')

  state.wasOptionsPrinted = true

  debouncedExit()
}

function printObject(name, data) {
  console.log(blue(name + ':') + '\n')

  if (typeof data === 'object') {
    console.log(JSON.stringify(data, null, 2) + '\n')
  } else {
    console.log('Not an object \n')
  }

  debouncedExit()
}

exports.searchObject = searchObject
exports.printBaseData = printBaseData
exports.printObject = printObject
