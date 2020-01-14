const createOverrider = require('./create-overrider')
const generateModuleNameMapper = require('./generate-module-name-mapper')

module.exports = {
  overrideWebpackConfig: createOverrider(
    ({ aliases }, { webpackConfig }) => ({
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          ...aliases
        }
      }
    }),
    {
      name: 'Webpack Config',
      aliasesPath: 'resolve.alias'
    }
  ),
  overrideJestConfig: createOverrider(
    ({ aliases }, { jestConfig }) => ({
      ...jestConfig,
      moduleNameMapper: {
        ...jestConfig.moduleNameMapper,
        ...generateModuleNameMapper({ aliases })
      }
    }),
    {
      name: 'Jest Config',
      aliasesPath: 'moduleNameMapper'
    }
  )
}
