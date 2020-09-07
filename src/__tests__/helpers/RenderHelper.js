import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender} from '@testing-library/react'
import reducer, { DefaultState } from 'reducers'

export const render = (
  ui,
  {
    initialState = DefaultState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
