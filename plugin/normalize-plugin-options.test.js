const normalize = require('./normalize-plugin-options')

describe('normalize-plugin-options', () => {
  test('should return default config', () => {
    expect(normalize(undefined)).toMatchSnapshot()
    expect(normalize({})).toMatchSnapshot()
  })

  test('should return jsconfig-specific config', () => {
    expect(
      normalize({
        source: 'jsconfig',
        baseUrl: './',
        aliases: {},
      })
    ).toMatchSnapshot()
  })

  test('should return tsconfig-specific config', () => {
    expect(
      normalize({
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
        aliases: {},
      })
    ).toMatchSnapshot()
  })

  test('should return the same as an input', () => {
    expect(
      normalize({
        source: 'options',
        baseUrl: './src',
        aliases: {
          '@file': './file.js',
        },
        filter: () => true,
        unsafeAllowModulesOutsideOfSrc: true,
      })
    ).toMatchSnapshot()
  })
})
