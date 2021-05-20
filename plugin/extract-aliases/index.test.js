const path = require('path')
const extractAliases = require('.')

describe('extract-aliases', () => {
  const appPath = path.resolve(__dirname, '../..')
  const appJsConfig = path.resolve(appPath, 'mocks/jsconfig.json')
  const tsConfigPath = path.resolve(appPath, 'mocks/tsconfig.paths.json')

  const context = {
    paths: {
      appPath,
      appJsConfig,
    },
  }

  const inputs = {
    fromOptions: {
      pluginOptions: {
        source: 'options',
        aliases: {
          '@file': './src/file.js',
          '@file2': 'src/file2.js',
          '@dir': './src/dir',
          '@dir2': '././src/dir2/',
          '$dir3': 'src/dir3',
          'my-package': './node_modules/some-package',
          'external-package': '/absolute_path/external-package',
          '@material-ui': 'node_modules/@material-ui/ie-10/ie-10.js',
        },
      },
      context,
    },
    fromJsConfig: {
      pluginOptions: {
        source: 'jsconfig',
      },
      context,
    },
    fromTsConfig: {
      pluginOptions: {
        source: 'tsconfig',
        tsConfigPath,
      },
      context,
    },
  }

  const result = {
    '@file': path.resolve(appPath, './src/file.js'),
    '@file2': path.resolve(appPath, './src/file2.js'),
    '@dir': path.resolve(appPath, './src/dir'),
    '@dir2': path.resolve(appPath, './src/dir2'),
    '$dir3': path.resolve(appPath, './src/dir3'),
    'my-package': path.resolve(appPath, './node_modules/some-package'),
    'external-package': path.resolve(
      appPath,
      '/absolute_path/external-package'
    ),
    '@material-ui': path.resolve(
      appPath,
      './node_modules/@material-ui/ie-10/ie-10.js'
    ),
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
