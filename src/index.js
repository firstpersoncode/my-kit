const path = require('path')
const config = require('./config')

const constants = require('./helpers/constants')

const sharedConfig = {
    resolve: {
        extensions: ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx', '.css'],
        modules: constants.paths.resolveModules,
    },
    publicPath: constants.paths.PUBLIC_PATH,
    env: {
        NODE_ENV: process.env.NODE_ENV,
    },
}

const clientConfig = {
    input: {
        bundle: path.resolve(constants.paths.CLIENT, 'index.tsx'),
    },
    // rootDir: constants.paths.SRC,
    output: constants.paths.BUILD_CLIENT,
}

const serverConfig = {
    isServer: true,
    input: {
        server: path.resolve(constants.paths.SERVER, 'index.tsx'),
    },
    // rootDir: constants.paths.SRC,
    output: constants.paths.BUILD_SERVER,
    locales: constants.paths.LOCALES,
}

module.exports = (env = 'production') => {
    if (env === 'development' || env === 'dev') {
        process.env.NODE_ENV = 'development'

        return [
            config({
                mode: 'development',
                ...sharedConfig,
                ...clientConfig,
                analyze: true,
            }),
            config({
                mode: 'development',
                ...sharedConfig,
                ...serverConfig,
            }),
        ]
    }

    process.env.NODE_ENV = 'production'
    return [
        config({
            mode: 'production',
            omitSourceCode: true,
            ...sharedConfig,
            ...clientConfig,
            analyze: true,
        }),
        config({
            mode: 'production',
            omitSourceCode: true,
            ...sharedConfig,
            ...serverConfig,
        }),
    ]
}

// const serveApp = require('./serveApp')
// const createConfig = require('./config')
//
// exports.serveApp = serveApp
// exports.createConfig = createConfig
// exports.default = createConfig
