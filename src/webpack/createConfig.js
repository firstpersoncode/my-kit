const getEntry = require('./helpers/getEntry')
const getLoaders = require('./helpers/getLoaders')
const getOutput = require('./helpers/getOutput')
const getPlugins = require('./helpers/getPlugins')
const getResolver = require('./helpers/getResolver')
const getRootDir = require('./helpers/getRootDir')
const validateOptions = require('./helpers/validateOptions')

const baseClientConfig = require('./baseClientConfig')
const baseServerConfig = require('./baseServerConfig')

module.exports = (options) => {
    validateOptions(options)
    const {
        mode,
        input,
        output,
        rootDir,
        publicPath,
        locales,
        isServer,
        plugins,
        loaders,
        resolve,
        omitSourceMap,
        analyze,
        env,
    } = options

    return {
        mode,
        ...(isServer ? baseServerConfig : baseClientConfig),
        ...(mode === 'development'
            ? {
                  performance: {
                      hints: false,
                  },
              }
            : {}),
        ...(isServer
            ? {}
            : mode === 'production'
            ? { devtool: !omitSourceMap ? 'source-map' : false }
            : {
                  devtool: !omitSourceMap ? 'cheap-module-inline-source-map' : false,
              }),
        entry: getEntry(input),
        output: getOutput(output, publicPath, isServer),
        module: {
            rules: [
                ...getLoaders.shared(mode),
                ...(isServer
                    ? getLoaders.server(mode, omitSourceMap, loaders)
                    : getLoaders.client(mode, omitSourceMap, loaders)),
            ],
        },
        resolve: getResolver(resolve, getRootDir(input, rootDir)),
        plugins: [
            ...getPlugins.shared(mode, env, analyze),
            ...(isServer
                ? getPlugins.server(plugins, output, locales)
                : getPlugins.client(plugins)),
        ],
    }
}
