const path = require('path')

const normalizeAliases = require('./normalize-aliases')

describe('normalize-aliases', () => {
  const appPath = path.resolve(__dirname, '../..')

  test('should correctly normalize aliases', () => {
    expect(
      normalizeAliases({
        basePath: appPath,
        aliases: {
          '@file': './src/file.js',
          '@file2': 'src/file2.js',
          '@dir': './src/dir',
          '@dir2': '././src/dir2/',
          $dir3: 'src/dir3'
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
