const thunk = require('redux-thunk').default
const redux = require('redux')
const createReducers = require('./reducers')

const { createStore, applyMiddleware, compose } = redux

module.exports = ({ initialState, middleware = [], reducers = createReducers({}) }) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })

    const composeEnhancers = devtools || compose

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
    )

    return store
}
