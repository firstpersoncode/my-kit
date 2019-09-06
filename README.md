# My Kit

<!-- **A utility for generate webpack configs with common settings**

## About

This utility will create a webpack config that should function as a drop-in for any Javascript or TypeScript project. -->

<!-- It features:

-   Synthetic default imports (TypeScript)
-   Project root alias (`^`)
-   Type checking in separate worker
-   Transpiling from ES6+ (and React) to target browsers
-   Polyfilling ES6+ features -->

## Feature

-   bundle your **React** App
-   serve your **React** App (SSR)
-   support es6 and TypeScript
-   support css modules, post-css loader, url loader, file loader, svg loader as `Component` and many more
-   generate bundle analyzer called `report.html` in your `build` folder

## Installation

```shell
# with npm
npm i my-kit -S
# with yarn
yarn add my-kit
```

<!-- ### TypeScript base config

Create a `tsconfig.json` in the root of the project and add the following contents, adjusting `include`, `paths`, and `typeRoots` as needed.

This will contain all of our base TypeScript config.

By default `allowJs` is set to `false`. If your project contains Javascript you should set this to `true`.

You may enable type checking on Javascript files by setting `checkJs` to `true`. This can be useful if migrating a Javascript project to TypeScript.

`allowSyntheticDefaultImports` and `esModuleInterop` allow us to import modules that don't have default exports as if they did, in TypeScript, so that we can be consistent across Javascript and TypeScript projects. E.g. `import React from 'react';` as opposed to `import * as React from 'react';`

`tsconfig.json` -->

<!-- ```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "pretty": true,
        "sourceMap": true,
        "skipLibCheck": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "allowJs": false,
        "checkJs": false,
        "jsx": "react",
        "target": "es6",
        "moduleResolution": "node",
        "typeRoots": ["./node_modules/@types/", "./static/src/ts/types/"],
        "baseUrl": "./",
        "paths": {
            "^*": ["./static/src/ts*"]
        }
    },
    "include": ["./static/src/ts/"]
}
``` -->

<!-- ### TypeScript distribution config

Create a `tsconfig.dist.json` file in the root of your project and add the following contents, adjusting `exclude`, or replacing with `include` as needed.

This is necessary to allow us to build our source without also type checking our tests or other Javascript and TypeScript files in the project.

`tsconfig.dist.json`

```json
{
    "extends": "./tsconfig.json",
    "exclude": ["./static/src/ts/__tests__/", "./static/src/ts/__mocks__/"]
}
``` -->

### Build scripts

Add the following scripts to your `package.json`.

`package.json`

```json
{
    "scripts": {
        "start": "my-kit start",
        "build": "my-kit build"
    }
}
```

```bash
$ my-kit start
# start dev mode, by default the port will be 8500
# you can visit http://localhost:8500 to start working on your project

$ my-kit build
# bundle your project
```

## TODO:

-   [x] Scripts
-   [x] Multiple Compiler
-   [x] Serve App
        -- [ ] i18n middleware
-   [ ] TypeScript distribution config
-   [ ] bundle analyzer service
-   [ ] eslint
-   [ ] unit test

## License

MIT.
