const path = require('path')

const normalizeAliases = require('./normalize-aliases')

describe('normalize-aliases', () => {
  const appPath = path.resolve(__dirname, '../..')

  test('should correctly normalize aliases', () => {
    expect(
      normalizeAliases({
        absoluteBaseUrl: path.join(appPath, '.'),
        aliases: {
          '@file': './src/file.js',
          '@file2': 'src/file2.js',
          '@dir': './src/dir',
          '@dir2': '././src/dir2/',
          $dir3: 'src/dir3',
          'my-package': './node_modules/some-package',
          '@material-ui': 'node_modules/@material-ui/ie-10/ie-10.js'
        }
      })
    ).toEqual({
      '@file': path.join(appPath, './src/file.js'),
      '@file2': path.join(appPath, './src/file2.js'),
      '@dir': path.join(appPath, './src/dir'),
      '@dir2': path.join(appPath, './src/dir2'),
      $dir3: path.join(appPath, './src/dir3'),
      'my-package': path.join(appPath, './node_modules/some-package'),
      '@material-ui': path.join(appPath, './node_modules/@material-ui/ie-10/ie-10.js')
    })

    expect(
      normalizeAliases({
        absoluteBaseUrl: path.join(appPath, './src'),
        aliases: {
          '@file': './file.js',
          '@file2': 'file2.js',
          '@dir': './dir',
          '@dir2': '././dir2/',
          $dir3: 'dir3'
        }
      })
    ).toEqual({
      '@file': path.join(appPath, './src/file.js'),
      '@file2': path.join(appPath, './src/file2.js'),
      '@dir': path.join(appPath, './src/dir'),
      '@dir2': path.join(appPath, './src/dir2'),
      $dir3: path.join(appPath, './src/dir3')
    })
  })
})
