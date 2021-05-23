/* eslint-disable sonarjs/no-duplicate-string */
const path = require('path')

const normalizeAliases = require('./normalize-aliases')

describe('normalize-aliases', () => {
  const appPath = path.resolve(__dirname, '../..')

  test('should correctly normalize aliases', () => {
    expect(
      normalizeAliases({
        absoluteBaseUrl: path.resolve(appPath, '.'),
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
      })
    ).toMatchSnapshot()

    expect(
      normalizeAliases({
        absoluteBaseUrl: path.resolve(appPath, './src'),
        aliases: {
          '@file': './file.js',
          '@file2': 'file2.js',
          '@dir': './dir',
          '@dir2': '././dir2/',
          '$dir3': 'dir3',
        },
      })
    ).toMatchSnapshot()
  })
})
