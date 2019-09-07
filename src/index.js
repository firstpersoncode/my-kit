const configureStore = require('./store')
const createHistory = require('./store/history')
const createReducers = require('./store/reducers')
const serveApp = require('./serveApp')

module.exports = {
    createHistory,
    createReducers,
    configureStore,
    serveApp,
}
