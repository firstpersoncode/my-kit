const path = require('path')
const constants = require('../constants')
const createConfig = require('./createConfig')
const baseClientConfig = require('./baseClientConfig')
const baseServerConfig = require('./baseServerConfig')

const sharedConfig = {
    resolve: {
        extensions: ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx', '.css'],
        modules: constants.paths.resolveModules,
    },
    publicPath: constants.paths.PUBLIC_PATH,
    tsconfig: constants.paths.TS_CONFIG,
    env: {
        NODE_ENV: process.env.NODE_ENV,
    },
}

const clientConfig = {
    ...baseClientConfig,
    input: {
        bundle: path.resolve(constants.paths.CLIENT, 'index.tsx'),
    },
    // rootDir: constants.paths.SRC,
    output: constants.paths.BUILD_CLIENT,
}

const serverConfig = {
    ...baseServerConfig,
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
            createConfig({
                mode: 'development',
                ...sharedConfig,
                ...clientConfig,
                analyze: true,
            }),
            createConfig({
                mode: 'development',
                ...sharedConfig,
                ...serverConfig,
            }),
        ]
    }

    process.env.NODE_ENV = 'production'
    return [
        createConfig({
            mode: 'production',
            omitSourceCode: true,
            ...sharedConfig,
            ...clientConfig,
            analyze: true,
        }),
        createConfig({
            mode: 'production',
            omitSourceCode: true,
            ...sharedConfig,
            ...serverConfig,
        }),
    ]
}
