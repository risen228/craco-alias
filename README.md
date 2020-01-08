# craco-alias

[![npm](https://img.shields.io/npm/v/craco-alias.svg)](https://www.npmjs.com/package/craco-alias)
[![Travis (.com)](https://img.shields.io/travis/com/risenforces/craco-alias)](https://travis-ci.com/risenforces/craco-alias)

A [craco](https://github.com/sharegate/craco) plugin for automatic aliases generation for Webpack and Jest.

> :warning: **The plugin does not fully support a module alises**

## List of Contents

- [Installation](#installation)
- [Options](#options)
- [Examples](#examples)
- [Migrating from cra-alias](#migrating-from-cra-alias)

### Installation

1. Install [craco](https://github.com/sharegate/craco)

2. Install `craco-alias`:

   ```sh
   npm i -D craco-alias
   ```

3. Edit `craco.config.js`:

   ```js
   const CracoAlias = require("craco-alias");

   module.exports = {
     plugins: [
       {
         plugin: CracoAlias,
         options: {
           // craco-alias options
           // please see below
         }
       }
     ]
   };
   ```

4. Go to [Examples](#examples) section

### Options

- `source`:
  One of `"options"`, `"jsconfig"`, `"tsconfig"`  
  Defaults to `"options"`

- `aliases`:
  An object with aliases names and paths  
  Defaults to `{}`

- `tsConfigPath`:
  A path to tsconfig file  
  Only required when `source` is set to `"tsconfig"`

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
        aliases: {
          "@file": "src/file.js",
          "@dir": "src/some/dir"
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
        source: "jsconfig"
      }
    }
  ]
};
```

> Note: your jsconfig should always have baseUrl and paths properties

```js
/* jsconfig.json */

{
  compilerOptions: {
    baseUrl: "src",
    paths: {
      "@file": ["file.js"],
      "@dir/*": ["dir/*", "dir"]
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
       "baseUrl": "src",
       "paths": {
         "@file-alias": ["./your/file.tsx"],
         "@folder-alias/*": ["./very/long/path/*", "./very/long/path/"]
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
           // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
           tsConfigPath: "./tsconfig.extend.json"
         }
       }
     ]
   };
   ```

</details>

### Migrating from [cra-alias](https://github.com/risenforces/cra-alias)

1. Install `craco` and `craco-alias`:

   ```sh
   npm i -D @craco/craco craco-alias
   ```

2. Create a `craco.config.js` file in the root directory:

   > See `tsconfig` example in the [Examples](#examples) section

   ```js
   /* craco.config.js */

   const CracoAlias = require("craco-alias");

   module.exports = {
     plugins: [
       {
         plugin: CracoAlias,
         options: {
           source: "jsconfig"
         }
       }
     ]
   };
   ```

3. Update the existing calls to `cra-alias` in the `scripts` section of your `package.json` file to use the `craco` CLI:

   ```diff
   /* package.json */

   "scripts": {
   -   "start": "cra-alias start",
   +   "start": "craco start",
   -   "build": "cra-alias build",
   +   "build": "craco build"
   -   "test": "cra-alias test",
   +   "test": "craco test"
   }
   ```

4. Done! You can also remove `cra-alias`:

   ```sh
   npm r -D cra-alias
   ```
