import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css'
import 'flexpad/dist/flexpad.min.css'
import './index.css'

import store from './state/store'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
}
else {
  serviceWorker.unregister()
}
