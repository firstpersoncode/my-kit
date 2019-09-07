const path = require('path')
const constants = require('../../constants')

module.exports = (output, publicPath, isServer) => ({
    path: path.resolve(constants.CWD, output),
    filename: '[name].js',
    publicPath,
    ...(isServer
        ? {}
        : {
              chunkFilename: '[name].[chunkhash:8].chunk.js',
          }),
})
