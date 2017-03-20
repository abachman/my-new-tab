import { createStore, applyMiddleware } from 'redux';

import reduxCatch from 'redux-catch';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger({collapsed: () => true});
const errorHandler = (error, getState) => { console.error(error) }

import reducer, { DefaultState } from './reducers'

// http://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app
//
// I would recommend just doing it in a subscriber:
//
//   store.subscribe(() => {
//     // persist your state
//   })
//
// Before creating the store, read those persisted parts:
//
//   const persistedState = // ...
//   const store = createStore(reducer, persistedState)
//
// If you use combineReducers() you’ll notice that reducers that haven’t
// received the state will “boot up” as normal using their default state
// argument value. This can be pretty handy.

import { persist, hydrate } from './lib/storage'

export function initStore(cb) {
  hydrate(DefaultState, (initialState) => {
    const store = createStore(
      reducer,
      initialState,
      applyMiddleware(
        reduxCatch(errorHandler),
        thunkMiddleware,
        loggerMiddleware
      )
    )

    store.subscribe(() => {
      persist(store.getState())
    })

    store.dispatch({type: 'INITIALIZE_EVERYTHING'})

    cb(store)
  })
}
