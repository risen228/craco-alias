# craco-alias

[![npm](https://img.shields.io/npm/v/craco-alias.svg)](https://www.npmjs.com/package/craco-alias)
[![Travis (.com)](https://img.shields.io/travis/com/risenforces/craco-alias)](https://travis-ci.com/risenforces/craco-alias)

A craco plugin for automatic aliases generation for Webpack and Jest.

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

```js
/* craco.config.js */

const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // as you know, CRA doesn't allow to modify tsconfig's compilerOptions
        // so you should create a separate JSON file and extend tsconfig.json from it
        // and then just specify its path here:
        tsConfigPath: "tsconfig.paths.json"
      }
    }
  ]
};
```

```js
/* tsconfig.paths.json */

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
