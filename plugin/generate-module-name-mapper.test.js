const generateModuleNameMapper = require('./generate-module-name-mapper')

describe('generate-module-name-mapper', () => {
  const paths = {
    file: '/some/absolute/path/to/file.js',
    dir: '/some/absolute/path/to/dir',
  }

  test('should correctly generate moduleNameMapper', () => {
    const moduleNameMapper = generateModuleNameMapper({
      aliases: {
        '@file': paths.file,
        '@dir': paths.dir,
      },
    })

    expect(moduleNameMapper).toEqual({
      '^@file$': paths.file,
      '^@dir$': paths.dir,
      '^@dir/(.*)$': `${paths.dir}/$1`,
    })
  })

  test('should correctly generate moduleNameMapper when alias name have special RegExp characters', () => {
    const moduleNameMapper = generateModuleNameMapper({
      aliases: {
        $file: paths.file,
        $dir: paths.dir,
      },
    })

    expect(moduleNameMapper).toEqual({
      '^\\$file$': paths.file,
      '^\\$dir$': paths.dir,
      '^\\$dir/(.*)$': `${paths.dir}/$1`,
    })
  })
})
