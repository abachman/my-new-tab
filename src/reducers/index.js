import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const DefaultState = {
  blocks: {},

  settings: {},

  layout: {
    coords: {},
    editing: false,
  },

  feeds: {},
  weathers: {},
  bookmarks: {},

  forms: {
    blocks: { visible: false, form: {} },
    settings: { visible: false, form: {} },
  }
}

const blocks = handleActions({
  CREATE_BLOCK(state, { payload }) {
    return Object.assign({}, state, {
      [payload.id]: payload
    })
  },

  UPDATE_BLOCK(state, { payload }) {
    return Object.assign({}, state, {
      [payload.id]: payload
    })
  },

  DESTROY_BLOCK(state, { payload }) {
    const nextBlocks = {}

    Object.entries(state).forEach((kv) => {
      // leave out the deleted block
      if (kv[0] !== payload.id) {
        nextBlocks[kv[0]] = kv[1]
      }
    })

    return nextBlocks
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
  TOGGLE_BLOCK_EDITOR(state, { payload }) {
    return Object.assign({}, state, {
      blocks: Object.assign({}, state.blocks, payload)
    })
  },

  TOGGLE_SETTINGS_EDITOR(state, { payload }) {
    return Object.assign({}, state, {
      settings: Object.assign({}, state.settings, payload)
    })
  }
}, null)

const weathers = handleActions({
  // INITIALIZE_EVERYTHING(state, { payload }) {
  //   return {}
  // },

  WEATHER_LOADED(state, { payload }) {
    return Object.assign({}, state, {
      [ payload.id ]: {
        loadedAt: Date.now(),
        ...payload.content
      }
    })
  },
}, null)

const bookmarks = handleActions({ }, null)

const feeds = handleActions({ }, null)

export default combineReducers({
  blocks,
  layout,
  settings,
  weathers,
  bookmarks,
  feeds,
  forms
})

export { DefaultState }


