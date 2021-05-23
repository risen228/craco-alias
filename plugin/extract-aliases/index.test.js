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

  const snapshotName = 'extract-aliases/snap-1'

  test('should correctly extract aliases from options', () => {
    expect(extractAliases(inputs.fromOptions)).toMatchSnapshot(snapshotName)
  })

  test('should correctly extract aliases from jsconfig', () => {
    expect(extractAliases(inputs.fromJsConfig)).toMatchSnapshot(snapshotName)
  })

  test('should correctly extract aliases from tsconfig', () => {
    expect(extractAliases(inputs.fromTsConfig)).toMatchSnapshot(snapshotName)
  })
})
