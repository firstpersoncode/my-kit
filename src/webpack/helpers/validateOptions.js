module.exports = (options) => {
    if (!options || typeof options !== 'object' || Array.isArray(options)) {
        throw new Error('Invalid config options - must be an object')
    }

    const requiredOptions = ['mode', 'resolve', 'input', 'output', 'tsconfig', 'publicPath']
    const errors = []
    requiredOptions.forEach((option) => {
        if (!(option in options)) {
            errors.push(new Error('No "' + option + '" in config options'))
        }
    })

    if (errors.length) {
        throw errors
    }

    if (typeof options.mode !== 'string' || !['development', 'production'].includes(options.mode)) {
        throw new Error('"mode" option is invalid')
    }

    if (
        !('extensions' in options.resolve) ||
        !Array.isArray(options.resolve.extensions) ||
        !options.resolve.extensions.length
    ) {
        throw new Error('Invalid "extensions" in config options')
    } else if (
        !('modules' in options.resolve) ||
        !Array.isArray(options.resolve.modules) ||
        !options.resolve.modules.length
    ) {
        throw new Error('Invalid "modules" in config options')
    }

    if (!options.input || typeof options.input !== 'object' || Array.isArray(options.input)) {
        throw new Error('Invalid "input" option - must be keyed object')
    } else if (!Object.keys(options.input).length) {
        throw new Error('No keys in "input" option')
    }

    if (!options.output || typeof options.output !== 'string') {
        throw new Error('Invalid "output" option - must be a string')
    }

    if (typeof options.publicPath !== 'string' && typeof options.publicPath !== 'undefined') {
        throw new Error('Invalid "publicPath" options - must be a string')
    } else if (!options.publicPath) {
        throw new Error('Invalid "publicPath" option - cannot be an empty string')
    }

    if (typeof options.locales !== 'string' && typeof options.locales !== 'undefined') {
        throw new Error('Invalid "locales" options - must be a string')
    } else if (!options.locales && typeof options.locales !== 'undefined') {
        throw new Error('Invalid "locales" option - cannot be an empty string')
    }

    if (
        (typeof options.env !== 'object' && typeof options.env !== 'undefined') ||
        (typeof options.env === 'object' && !options.env) ||
        Array.isArray(options.env)
    ) {
        throw new Error('Invalid "env" option - must be a keyed object')
    }

    if (typeof options.rootDir !== 'string' && typeof options.rootDir !== 'undefined') {
        throw new Error('Invalid "rootDir" options - must be a string')
    } else if (!options.rootDir && typeof options.rootDir !== 'undefined') {
        throw new Error('Invalid "rootDir" option - cannot be an empty string')
    }
}
