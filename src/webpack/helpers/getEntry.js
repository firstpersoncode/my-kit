const path = require('path')
const constants = require('../../constants')

module.exports = (input) => {
    const entry = {}

    Object.keys(input).forEach((key) => {
        // eslint-disable-next-line security/detect-object-injection
        entry[key] = constants.INPUT_POLYFILLS.concat(path.resolve(constants.CWD, input[key]))
    })

    return entry
}
