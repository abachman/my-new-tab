import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './views/App';
import './index.css';
import { initStore } from './store'

// don't start app until userscript iframe has loaded
const launch = function () {
  initStore((store) => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  })
}

// make sure window can't pretend like iframe is loaded when it's not
if (window.usframeLoaded) {
  launch()
} else {
  document.getElementById('usFrame').onload = launch
}
