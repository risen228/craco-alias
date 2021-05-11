const createOverrider = require('./create-overrider')
const generateModuleNameMapper = require('./generate-module-name-mapper')

module.exports = {
  overrideWebpackConfig: createOverrider(
    ({ aliases, options }, { webpackConfig }) => ({
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          ...aliases,
        },
        plugins: options.unsafeAllowModulesOutsideOfSrc
          ? webpackConfig.resolve.plugins.filter(({ constructor }) => {
              if (!constructor) return true
              return constructor.name !== 'ModuleScopePlugin'
            })
          : webpackConfig.resolve.plugins,
      },
    }),
    {
      name: 'Webpack Config',
      aliasesPath: 'resolve.alias',
    }
  ),
  overrideJestConfig: createOverrider(
    ({ aliases }, { jestConfig }) => ({
      ...jestConfig,
      moduleNameMapper: {
        ...jestConfig.moduleNameMapper,
        ...generateModuleNameMapper({ aliases }),
      },
    }),
    {
      name: 'Jest Config',
      aliasesPath: 'moduleNameMapper',
    }
  ),
}
