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
      pluginOptions: 123
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'You have provided an invalid options'
    )
  })

  test('should check pluginOptions.source', () => {
    mockedCheck({
      pluginOptions: {
        source: 'unknown-source'
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'You have provided an invalid aliases source.' +
        ' Available sources are: "jsconfig", "tsconfig", "options"'
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

  test('should check "aliases" when source is "options"', () => {
    mockedCheck({
      pluginOptions: {
        source: 'options',
        aliases: null
      }
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      'The "source" option is set to "options",' +
        ' but you have provided an invalid aliases'
    )
  })
})
