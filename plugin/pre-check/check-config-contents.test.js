const check = require('./check-config-contents')

describe('check-config-contents', () => {
  const handleErrorMock = jest.fn(() => {})

  const configFileName = 'some-config.json'

  const mockedCheck = ({ unparsedConfig }) =>
    check({
      unparsedConfig,
      configFileName,
      handleError: handleErrorMock,
    })

  test('should try to parse config contents', () => {
    mockedCheck({
      unparsedConfig: 'invalid-json',
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      `Cannot parse ${configFileName}. Please validate it on https://jsonformatter.curiousconcept.com.`
    )
  })

  const handyMockedCheck = (parsedConfig) =>
    mockedCheck({
      unparsedConfig: JSON.stringify(parsedConfig, null, 2),
    })

  test('should check config contents', () => {
    handyMockedCheck({})

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      `Property "compilerOptions" is missing in ${configFileName}`
    )

    handyMockedCheck({
      compilerOptions: {
        baseUrl: 'src',
      },
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      `Property "compilerOptions.paths" is missing in ${configFileName}`
    )
  })
})
