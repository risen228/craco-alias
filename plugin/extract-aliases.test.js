const path = require('path')
const extractAliases = require('./extract-aliases')

describe('extract-aliases', () => {
  const appPath = path.resolve(__dirname, '..')
  const appJsConfig = path.join(appPath, 'mocks/jsconfig.json')
  const tsConfigPath = path.join(appPath, 'mocks/tsconfig.paths.json')

  const context = {
    paths: {
      appPath,
      appJsConfig
    }
  }

  const inputs = {
    fromOptions: {
      pluginOptions: {
        source: 'options',
        aliases: {
          '@file': './src/file.js',
          '@file2': 'src/file2.js',
          '@dir': './src/dir',
          '@dir2': '././src/dir2',
          $dir3: 'src/dir3'
        }
      },
      context
    },
    fromJsConfig: {
      pluginOptions: {
        source: 'jsconfig'
      },
      context
    },
    fromTsConfig: {
      pluginOptions: {
        source: 'tsconfig',
        tsConfigPath
      },
      context
    }
  }

  const result = {
    '@file': path.join(appPath, './src/file.js'),
    '@file2': path.join(appPath, './src/file2.js'),
    '@dir': path.join(appPath, './src/dir'),
    '@dir2': path.join(appPath, './src/dir2'),
    $dir3: path.join(appPath, './src/dir3')
  }

  test('should correctly extract aliases from options', () => {
    expect(extractAliases(inputs.fromOptions)).toEqual(result)
  })

  test('should correctly extract aliases from jsconfig', () => {
    expect(extractAliases(inputs.fromJsConfig)).toEqual(result)
  })

  test('should correctly extract aliases from tsconfig', () => {
    expect(extractAliases(inputs.fromTsConfig)).toEqual(result)
  })
})
