# craco-alias

[![npm](https://img.shields.io/npm/v/craco-alias.svg)](https://www.npmjs.com/package/craco-alias)

A [craco](https://github.com/sharegate/craco) plugin for automatic aliases generation for Webpack and Jest.

## List of Contents

- [Installation](#installation)
- [Options](#options)
- [Examples](#examples)
- [Ran into a problem?](#ran-into-a-problem)
- [If you want to help](#if-you-want-to-help)

### Installation

1. Install [craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation)

2. Install `craco-alias`:

   ```sh
   npm i -D craco-alias
   ```

   ```sh
   yarn add -D craco-alias
   ```

3. Edit `craco.config.js`:

   ```js
   const CracoAlias = require("craco-alias");

   module.exports = {
     plugins: [
       {
         plugin: CracoAlias,
         options: {
           // see in examples section
         }
       }
     ]
   };
   ```

4. Go to [Examples](#examples) section

### Options

- `source`:  
  One of `"options"`, `"jsconfig"`, `"tsconfig"`  
  Optional, defaults to `"options"`

- `baseUrl`:  
  A base url for aliases. (`./src` for example)  
  Optional, defaults to `./` (project root directory)

- `aliases`:  
  An object with aliases names and paths  
  Only required when `source` is set to `"options"`

- `tsConfigPath`:  
  A path to tsconfig file  
  Only required when `source` is set to `"tsconfig"`

- `filter`:
  A function of type `([key, value]) => boolean`  
  Optional, used to remove some aliases from the resulting config  
  Example: `([key]) => !key.startsWith('node_modules')`

- `unsafeAllowModulesOutsideOfSrc`:  
  Allow importing modules outside of `./src` folder.  
  Disables webpack `ModuleScopePlugin`.

- `debug`:  
  Enable it if you ran into a problem. It will log a useful info in console.  
  Optional, defaults to `false`

### Examples

<details>
<summary><b>Specify aliases manually (source: "options")</b></summary>

> Note: you don't need to add `/*` part for directories in this case

```js
/* craco.config.js */

const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@file": "./src/file.js",
          "@dir": "./src/some/dir",
          // you can alias packages too
          "@material-ui": "./node_modules/@material-ui-ie10"
        }
      }
    }
  ]
};
```

</details>

<details>
<summary><b>Use aliases from jsconfig.json (source: "jsconfig")</b></summary>

```js
/* craco.config.js */

const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from jsconfig
        baseUrl: "./src"
      }
    }
  ]
};
```

> **Note:** your jsconfig should always have `compilerOptions.paths` property. `baseUrl` is optional for plugin, but some IDEs and editors require it for intellisense.

```js
/* jsconfig.json */

{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      // file aliases
      "@baz": ["./baz.js"],
      "@boo": ["./boo.jsx"],

      // folder aliases
      "@root": ["./"],
      "@root/*": ["./*"],
      "@lib": ["./lib"],
      "@lib/*": ["./lib/*"],

      // package aliases (types is optional without ts)
      "@my-react-select": [
        "../node_modules/react-select",
        "../node_modules/@types/react-select"
      ],
      "@my-react-select/*": [
        "../node_modules/react-select/*",
        "../node_modules/@types/react-select"
      ]
    }
  }
}
```

</details>

<details>
<summary><b>Use aliases from tsconfig.json (source: "tsconfig")</b></summary>
   
1. Go to project's root directory.

2. Create `tsconfig.extend.json`.

3. Edit it as follows:
   
   ```js
   {
     "compilerOptions": {
       "baseUrl": "./src",
       "paths": {
         // file aliases
         "@baz": ["./baz.ts"],
         "@boo": ["./boo.tsx"],

         // folder aliases
         "@root": ["./"],
         "@root/*": ["./*"],
         "@lib": ["./lib"],
         "@lib/*": ["./lib/*"],

         // package aliases
         "@my-react-select": [
           "../node_modules/react-select",
           "../node_modules/@types/react-select"
         ],
         "@my-react-select/*": [
           "../node_modules/react-select/*",
           "../node_modules/@types/react-select"
         ]
       }
     }
   }
   ```

4. Go to `tsconfig.json`.

5. Extend `tsconfig.json` from `tsconfig.extend.json`:

   ```diff
   {
   + "extends": "./tsconfig.extend.json",
     "compilerOptions": {
       ...
     },
     ...
   }
   ```

6. Edit `craco.config.js`:

   ```js
   const CracoAlias = require("craco-alias");

   module.exports = {
     plugins: [
       {
         plugin: CracoAlias,
         options: {
           source: "tsconfig",
           // baseUrl SHOULD be specified
           // plugin does not take it from tsconfig
           baseUrl: "./src",
           // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
           tsConfigPath: "./tsconfig.extend.json"
         }
       }
     ]
   };
   ```

</details>

### Ran into a problem?

1. Make sure your config is valid.

2. Set `debug` to `true` in [options](#options).

3. Run application again.

4. Copy a printed info.

5. [Here](https://github.com/risenforces/craco-alias/issues), create an issue describing your problem (do not forget to add the debug info).

### If you want to help

Install:

```sh
yarn
```

> Use yarn please. npm may fail the dependencies installation.

Run tests:

```
yarn test
```
