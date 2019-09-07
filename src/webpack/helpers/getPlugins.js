const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')

const constants = require('../../constants')

const { EnvironmentPlugin, DefinePlugin, IgnorePlugin, HotModuleReplacementPlugin } = webpack

const shared = (mode, env, analyze) =>
    [
        new MiniCssExtractPlugin({
            filename: mode === 'development' ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: mode === 'development' ? '[id].css' : '[id].[contenthash].css',
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CircularDependencyPlugin({
            failOnError: true,
            exclude: /node_modules/,
            cwd: constants.CWD,
        }),
        new EnvironmentPlugin(env || {}),
        ...(mode === 'development'
            ? [new WriteFileWebpackPlugin(), new HotModuleReplacementPlugin()]
            : []),
        ...(analyze
            ? [
                  new BundleAnalyzerPlugin({
                      analyzerMode: 'static',
                      // analyzerPort: analyze.port || 8502,
                      openAnalyzer: false,
                      generateStatsFile: mode === 'production',
                  }),
              ]
            : []),
    ].filter(Boolean)

const client = (plugins) =>
    [
        new DefinePlugin({
            __SERVER__: 'false',
            __BROWSER__: 'true',
        }),
        new CaseSensitivePathsPlugin(),
        new IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ManifestPlugin({ fileName: 'manifest.json' }),
        ...(plugins && plugins.length ? plugins : []),
    ].filter(Boolean)

const server = (plugins, output, locales) =>
    [
        new DefinePlugin({
            __SERVER__: 'true',
            __BROWSER__: 'false',
        }),
        new CopyPlugin([
            {
                from: locales,
                to: path.join(output, 'locales'),
                ignore: '*.missing.json',
            },
        ]),
        ...(plugins && plugins.length ? plugins : []),
    ].filter(Boolean)

module.exports = {
    shared,
    client,
    server,
}
