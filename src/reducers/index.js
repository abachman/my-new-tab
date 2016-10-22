import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const DefaultState = {
  links: {},

  settings: {},

  layout: {
    coords: {},
    editing: false,
  },

  forms: {
    links: { visible: false, form: {} },
    settings: { visible: false, form: {} },
  }
}

const links = handleActions({
  CREATE_LINK(state, { payload }) {
    return Object.assign({}, state, {
      [payload.id]: payload
    })
  },

  UPDATE_LINK(state, { payload }) {
    return Object.assign({}, state, {
      [payload.id]: payload
    })
  },

  DESTROY_LINK(state, { payload }) {
    const nextLinks = {}

    Object.entries(state).forEach((kv) => {
      // leave out the deleted link
      if (kv[0] !== payload.id) {
        nextLinks[kv[0]] = kv[1]
      }
    })

    return nextLinks
  }
}, null)

const layout = handleActions({
  TOGGLE_EDITING(state, { payload }) {
    return Object.assign({}, state, {
      editing: payload
    })
  },
}, null)

const settings = handleActions({
  UPDATE_SETTINGS(state, { payload }) {
    return payload
  }
}, null)

const forms = handleActions({
  TOGGLE_LINK_EDITOR(state, { payload }) {
    return Object.assign({}, state, {
      links: Object.assign({}, state.links, payload)
    })
  },

  TOGGLE_SETTINGS_EDITOR(state, { payload }) {
    return Object.assign({}, state, {
      settings: Object.assign({}, state.settings, payload)
    })
  }
}, null)

export default combineReducers({
  links,
  layout,
  settings,
  forms
})

export { DefaultState }


