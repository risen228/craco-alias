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

    expect(moduleNameMapper).toMatchSnapshot()
  })

  test('should correctly generate moduleNameMapper when alias name have special RegExp characters', () => {
    const moduleNameMapper = generateModuleNameMapper({
      aliases: {
        $file: paths.file,
        $dir: paths.dir,
      },
    })

    expect(moduleNameMapper).toMatchSnapshot()
  })
})
