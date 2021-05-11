const { filterAliases } = require('./filter-aliases')

test('filter-aliases', () => {
  expect(
    filterAliases(
      {
        '@my-alias-one': 'sdfsdfsdf',
        '@my-alias-two': '123123',
        '@my-alias-three:': '321',
      },
      ([key, value]) => {
        if (key === '@my-alias-one') return false
        if (value === '321') return false
        return true
      }
    )
  ).toEqual({
    '@my-alias-two': '123123',
  })
})
