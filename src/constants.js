const path = require('path')
const fs = require('fs')

// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const paths = {
    BUILD_: resolveApp('build'),
    BUILD_CLIENT: resolveApp('build/client'),
    BUILD_SERVER: resolveApp('build/server'),
    SRC: resolveApp('src'),
    LOCALES: resolveApp('src/locales'),
    APP: resolveApp('src/app'),
    CLIENT: resolveApp('src/app/client'),
    SERVER: resolveApp('src/app/server'),
    STORE: resolveApp('src/app/store'),
    TS_CONFIG: resolveApp('tsconfig.json'),
    PUBLIC_PATH: '/',
}

paths.resolveModules = [
    paths.CLIENT,
    paths.SERVER,
    paths.STORE,
    paths.APP,
    paths.SRC,
    'node_modules',
]

exports.paths = paths

exports.CWD = process.cwd()
exports.INPUT_POLYFILLS = [
    require.resolve('core-js/stable'),
    require.resolve('regenerator-runtime/runtime'),
]
exports.RESOLVE_POLYFILLS = {
    /* When working with linked modules which have their own node_modules we must make sure
  to always load the same React version in all components. So we define an alias here and
  resolve it to node_modules/* to avoid potential issues */
    'react': require.resolve('react'),
    'react-dom': require.resolve('react-dom'),
    'react-router': require.resolve('react-router'),
    'react-router-dom': require.resolve('react-router-dom'),
    'react-i18next': require.resolve('react-i18next'),
    'i18next': require.resolve('i18next'),
}
exports.MATCHES_LEADING_DOT = /^\./
