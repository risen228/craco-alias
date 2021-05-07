const path = require('path')
const check = require('./check-options')

describe('check-options', () => {
  const handleErrorMock = jest.fn(message => {})

  const mockedCheck = ({ pluginOptions }) =>
    check({
      pluginOptions,
      handleError: handleErrorMock
    })

  test('should check pluginOptions type', () => {
    mockedCheck({
      pluginOptions: undefined
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'Plugin options should be specified'
    )

    mockedCheck({
      pluginOptions: 123
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'Plugin options should be an object'
    )
  })

  test('should check pluginOptions.source', () => {
    mockedCheck({
      pluginOptions: {
        source: 'unknown-source'
      }
    })

    const availableSources = ['jsconfig', 'tsconfig', 'options']

    const availableSourcesString = availableSources
      .map(s => `"${s}"`)
      .join(', ')

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'You have provided an invalid aliases source.' +
        ` Available sources are: ${availableSourcesString}`
    )
  })

  test('should check "tsConfigPath" when source is "tsconfig"', () => {
    mockedCheck({
      pluginOptions: {
        source: 'tsconfig'
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "source" option is set to "tsconfig",' +
        ' but option "tsConfigPath" is missing or has incorrect value'
    )
  })

  test('should check "baseUrl" when source is "options"', () => {
    mockedCheck({
      pluginOptions: {
        source: 'options',
        baseUrl: 345345
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "baseUrl" option should be a string'
    )
  })

  test('should check "aliases" when source is "options"', () => {
    mockedCheck({
      pluginOptions: {
        source: 'options',
        aliases: null
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "aliases" option should be an object'
    )
  })

  test('should check "filter"', () => {
    mockedCheck({
      pluginOptions: {
        source: 'options',
        filter: 35345
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "filter" option should be a function'
    )
  })

  test('should check "debug"', () => {
    mockedCheck({
      pluginOptions: {
        source: 'options',
        aliases: {},
        debug: 35345
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "debug" option should be a boolean value'
    )
  })
})
