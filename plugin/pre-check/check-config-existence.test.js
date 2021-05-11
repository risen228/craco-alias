const check = require('./check-config-existence')

describe('check-config-existence', () => {
  const handleErrorMock = jest.fn(() => {})

  test('should check config existence', () => {
    const configName = 'some-config'
    const configFileName = 'path.json'
    const configPath = 'some/config/path.json'

    check({
      configName,
      configFileName,
      configPath,
      handleError: handleErrorMock,
    })

    expect(handleErrorMock).toHaveBeenLastCalledWith(
      `The "source" option is set to "${configName}",` +
        ` but no ${configFileName} was found in the project`
    )
  })
})
