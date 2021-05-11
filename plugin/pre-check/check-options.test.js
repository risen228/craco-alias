const check = require('./check-options')

let handleErrorMock = jest.fn(() => {})

beforeEach(() => {
  handleErrorMock = jest.fn(() => {})
})

describe('check-options', () => {
  const mockedCheck = (pluginOptions) =>
    check({
      pluginOptions,
      handleError: handleErrorMock,
    })

  test('should check pluginOptions type', () => {
    mockedCheck(undefined)

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'Plugin options should be specified'
    )

    mockedCheck(123)

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'Plugin options should be an object'
    )
  })

  test('should not fail on a valid config', () => {
    mockedCheck({
      aliases: {},
    })

    mockedCheck({
      source: 'options',
      aliases: {},
    })

    mockedCheck({
      source: 'options',
      aliases: {},
    })

    mockedCheck({
      source: 'tsconfig',
      tsConfigPath: 'foo',
    })

    mockedCheck({
      source: 'jsconfig',
    })

    mockedCheck({
      aliases: {},
      filter: () => true,
    })

    mockedCheck({
      aliases: {},
      unsafeAllowModulesOutsideOfSrc: true,
    })

    expect(handleErrorMock).toHaveBeenCalledTimes(0)
  })

  test('should check pluginOptions.source', () => {
    mockedCheck({
      source: 'unknown-source',
    })

    const availableSources = ['jsconfig', 'tsconfig', 'options']

    const availableSourcesString = availableSources
      .map((s) => `"${s}"`)
      .join(', ')

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'You have provided an invalid aliases source.' +
        ` Available sources are: ${availableSourcesString}`
    )
  })

  test('should check "tsConfigPath" when source is "tsconfig"', () => {
    mockedCheck({
      source: 'tsconfig',
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "source" option is set to "tsconfig",' +
        ' but option "tsConfigPath" is missing or has incorrect value'
    )
  })

  test('should check "baseUrl" when source is "options"', () => {
    mockedCheck({
      source: 'options',
      baseUrl: 345345,
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "baseUrl" option should be a string'
    )
  })

  test('should check "aliases" when source is "options"', () => {
    mockedCheck({
      source: 'options',
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "source" option is set to "options",' +
        ' but option "aliases" is missing or has incorrect value'
    )

    mockedCheck({
      source: 'options',
      aliases: 123,
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "source" option is set to "options",' +
        ' but option "aliases" is missing or has incorrect value'
    )
  })

  test('should check "filter"', () => {
    mockedCheck({
      source: 'options',
      aliases: {},
      filter: 35345,
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "filter" option should be a function'
    )
  })

  test('should check "unsafeAllowModulesOutsideOfSrc"', () => {
    mockedCheck({
      source: 'options',
      aliases: {},
      unsafeAllowModulesOutsideOfSrc: 35345,
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "unsafeAllowModulesOutsideOfSrc" option should be a boolean value'
    )
  })

  test('should check "debug"', () => {
    mockedCheck({
      source: 'options',
      aliases: {},
      debug: 35345,
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "debug" option should be a boolean value'
    )
  })
})
