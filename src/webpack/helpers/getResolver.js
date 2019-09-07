const constants = require('../../constants')
module.exports = ({ extensions, modules }, rootDir) => ({
    extensions,
    modules,
    alias: {
        '^': rootDir,
        ...constants.RESOLVE_POLYFILLS,
    },
})
