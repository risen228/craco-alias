const generateModuleNameMapper = require('./generate-module-name-mapper')

describe('generate-module-name-mapper', () => {
  test('should correctly generate moduleNameMapper', () => {
    const moduleNameMapper = generateModuleNameMapper({
      aliases: {
        '@file': '/some/absolute/path/to/file.js',
        '@dir': '/some/absolute/path/to/dir'
      }
    })

    expect(moduleNameMapper).toEqual({
      '^@file$': '/some/absolute/path/to/file.js',
      '^@dir$': '/some/absolute/path/to/dir',
      '^@dir/(.*)$': '/some/absolute/path/to/dir/$1'
    })
  })

  test('should correctly generate moduleNameMapper when alias name have special RegExp characters', () => {
    const moduleNameMapper = generateModuleNameMapper({
      aliases: {
        '$file': '/some/absolute/path/to/file.js',
        '$dir': '/some/absolute/path/to/dir'
      }
    })

    expect(moduleNameMapper).toEqual({
      '^\\$file$': '/some/absolute/path/to/file.js',
      '^\\$dir$': '/some/absolute/path/to/dir',
      '^\\$dir/(.*)$': '/some/absolute/path/to/dir/$1'
    })
  })
})
