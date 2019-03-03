import { applyMiddleware, compose, combineReducers, createStore } from 'redux'

import selectedEdges from './reducers/selectedEdges'
import selectedNodes from './reducers/selectedNodes'

const reducer = combineReducers({
  selectedEdges,
  selectedNodes,
})

function loggerMiddleware() {
  return next => action => {
    console.log('Action', action.type, action.payload)

    return next(action)
  }
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const middlewares = []

if (process.env.NODE_ENV !== 'production') middlewares.push(loggerMiddleware)

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const store = createStore(reducer, {}, enhancer)

export default store
