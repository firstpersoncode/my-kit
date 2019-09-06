const path = require('path')
const constants = require('./constants')

module.exports = (input, rootDir) => {
    if (typeof rootDir === 'string') {
        return path.resolve(constants.CWD, rootDir)
    }

    const dirs = []

    Object.keys(input).forEach((key) => {
        // eslint-disable-next-line security/detect-object-injection
        const dir = path.dirname(path.resolve(constants.CWD, input[key]))

        if (dirs.length && !dirs.includes(dir)) {
            throw new Error(
                'More than one possible root directory - please specify a "rootDir" option'
            )
        }

        dirs.push(dir)
    })

    return dirs[0]
}
