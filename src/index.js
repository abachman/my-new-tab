import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './views/App'
import './index.css'
import { initStore } from './store'

initStore((store) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})
