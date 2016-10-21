import { handleActions } from 'redux-actions'

export default handleActions({
  INCREMENT(state) {
    const counter = state.counter + 1
    return Object.assign({}, state, { counter })
  }
}, { counter: 0 })
