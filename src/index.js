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

launch()

// let continueChecking = true
// let checkTimeout = null
//
// function starter(evt) {
//   console.log('got ready message with event data', evt.data)
//   if (evt.data.source === 'userscripts') {
//     continueChecking = false
//     clearTimeout(checkTimeout)
//     launch()
//     console.log("remove window listener")
//     window.removeEventListener('message', starter)
//   }
// }
// console.log("attach window listener")
// window.addEventListener('message', starter)

// function checker() {
//   const iframe = document.getElementById('usFrame')
//   if (iframe && iframe.contentWindow) {
//     console.log("publish docheck message")
//     try {
//       iframe.contentWindow.postMessage({ docheck: true })
//     } catch (ex) {
//       console.error("failed to publish to iframe", ex)
//     }
//   }
//
//   if (continueChecking) {
//     checkTimeout = setTimeout(checker, 500)
//   }
// }
//
// checker()

// document.getElementById('usFrame').onload = launch

// // make sure window can't pretend like iframe is loaded when it's not
// if (window.usframeLoaded) {
//   launch()
// } else {
// }
