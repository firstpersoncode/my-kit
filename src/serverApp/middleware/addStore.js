module.exports = (store) => (_req, res, next) => {
    res.locals.store = store
    next()
}
