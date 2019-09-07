const thunk = require('redux-thunk')
const { createStore, applyMiddleware, compose } = require('redux')
const createReducers = require('./reducers')

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

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () =>
                store.replaceReducer(require('./reducers').default)
            )
        }
    }

    return store
}
