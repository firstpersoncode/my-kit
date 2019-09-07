const { createMemoryHistory, createBrowserHistory } = require('history')

module.exports = ({ initialEntries = [] }) => {
    if (__BROWSER__) {
        const history = window.browserHistory || createBrowserHistory()
        if (process.env.NODE_ENV === 'development' && !window.browserHistory) {
            window.browserHistory = history
        }
        return history
    }
    return createMemoryHistory({ initialEntries })
}
