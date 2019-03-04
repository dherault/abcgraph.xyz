import { applyMiddleware, compose, combineReducers, createStore } from 'redux'

import { loadState, saveState } from './persist'
import { throttle } from '../utils'

import nodes from './reducers/nodes'
import edges from './reducers/edges'
import selectedEdges from './reducers/selectedEdges'
import selectedNodes from './reducers/selectedNodes'

const reducer = combineReducers({
  nodes,
  edges,
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

const initialState = loadState()

const store = createStore(reducer, initialState, enhancer)

store.subscribe(throttle(() => saveState(store.getState()), 1000))

export default store
