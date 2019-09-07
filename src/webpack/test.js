const path = require('path')
const { EnvironmentPlugin } = require('webpack')

const constants = require('../constants')
const createConfig = require('./createConfig')

jest.mock('webpack', () => ({
    EnvironmentPlugin: jest.fn(),
    DefinePlugin: jest.fn(),
    IgnorePlugin: jest.fn(),
    HotModuleReplacementPlugin: jest.fn(),
}))
jest.mock('circular-dependency-plugin', () => jest.fn())
jest.mock('fork-ts-checker-webpack-plugin', () => jest.fn())
jest.mock('webpack-manifest-plugin', () => jest.fn())
jest.mock('mini-css-extract-plugin', () => jest.fn())
jest.mock('case-sensitive-paths-webpack-plugin', () => jest.fn())
jest.mock('write-file-webpack-plugin', () => jest.fn())
jest.mock('webpack-bundle-analyzer', () => jest.fn())
jest.mock('webpack-node-externals', () => jest.fn())
jest.mock('terser-webpack-plugin', () => jest.fn())

const testOptions = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx', '.css'],
        modules: constants.paths.resolveModules,
    },
    publicPath: constants.paths.PUBLIC_PATH,
    input: {
        bundle: path.resolve(constants.paths.CLIENT, 'index.ts'),
    },
    output: constants.paths.BUILD_,
}

describe('createConfig', () => {
    it('should be a function', () => {
        expect(typeof createConfig).toBe('function')
    })

    it('should return a webpack config object', () => {
        expect(typeof createConfig(testOptions)).toBe('object')
    })

    it('should bundle multiple entries', () => {
        const config = createConfig({
            ...testOptions,
            input: {
                ...testOptions.input,
                server: path.resolve(constants.paths.SERVER, 'index.ts'),
            },
            rootDir: constants.paths.APP,
        })

        expect(config.entry).toEqual({
            bundle: [
                ...constants.INPUT_POLYFILLS,
                path.resolve(constants.paths.CLIENT, 'index.ts'),
            ],
            server: [
                ...constants.INPUT_POLYFILLS,
                path.resolve(constants.paths.SERVER, 'index.ts'),
            ],
        })

        expect(config.output).toEqual({
            path: path.resolve(constants.CWD, constants.paths.BUILD_),
            filename: '[name].js',
            publicPath: constants.paths.PUBLIC_PATH,
            chunkFilename: '[name].[chunkhash:8].chunk.js',
        })

        expect(config.resolve.alias).toEqual({
            '^': path.resolve(constants.CWD, constants.paths.APP),
            ...constants.RESOLVE_POLYFILLS,
        })
    })

    it('should error if multiple entries are in different directories and no rootDir provided', () => {
        const unsureAboutAliases = () =>
            createConfig({
                ...testOptions,
                input: {
                    ...testOptions.input,
                    server: path.resolve(constants.paths.SERVER, 'index.ts'),
                },
            })

        expect(unsureAboutAliases).toThrow(/rootDir/)
    })

    it('should work without environment variables', () => {
        createConfig(testOptions)

        expect(EnvironmentPlugin).toHaveBeenCalledWith({})
    })

    it('should set default environment variables', () => {
        createConfig({
            ...testOptions,
            env: {
                NODE_ENV: 'production',
            },
        })

        expect(EnvironmentPlugin).toHaveBeenCalledWith({
            NODE_ENV: 'production',
        })
    })
})
