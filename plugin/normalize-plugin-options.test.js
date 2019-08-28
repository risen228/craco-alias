const normalize = require('./normalize-plugin-options')

describe('normalize-plugin-options', () => {
  test('should return default config', () => {
    expect(normalize(undefined)).toEqual({
      source: 'options',
      aliases: {}
    })

    expect(normalize({})).toEqual({
      source: 'options',
      aliases: {}
    })
  })

  test('should return jsconfig-specific config', () => {
    expect(
      normalize({
        source: 'jsconfig',
        aliases: {}
      })
    ).toEqual({
      source: 'jsconfig'
    })
  })

  test('should return tsconfig-specific config', () => {
    expect(
      normalize({
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
        aliases: {}
      })
    ).toEqual({
      source: 'tsconfig',
      tsConfigPath: 'tsconfig.paths.json'
    })
  })

  test('should return the same as an input', () => {
    expect(
      normalize({
        source: 'options',
        aliases: {
          '@file': 'src/file.js'
        }
      })
    ).toEqual({
      source: 'options',
      aliases: {
        '@file': 'src/file.js'
      }
    })
  })
})
