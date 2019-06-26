import { createActions } from 'redux-actions'
import Weather from '../lib/weather'

function S4() { return (((1+Math.random())*0x10000)|0).toString(16).substring(1) }

// a unique enough ID. Almost, but not quite a UUID
function _newID() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4()).toLowerCase();
}

const Actions = createActions({ },
  'INCREMENT',
  'EDIT_BLOCK',
  'DESTROY_BLOCK',
  'ADD_BLOCK',
  'TOGGLE_EDITING',
  'TOGGLE_COMPACTING',
  'TOGGLE_BLOCK_EDITOR',
  'TOGGLE_SETTINGS_EDITOR',
)

Actions.updateBlock = (id, attrs) => {
  return (dispatch, getState) => {
    const state = getState()
    const block = state.blocks[id]

    if (block) {
      dispatch({
        type: 'UPDATE_BLOCK',
        payload: { ...block, ...attrs }
      })
    } else {
      dispatch({ type: 'UPDATE_BLOCK_FAILED' })
    }
  }
}

Actions.createBlock = (block) => {
  return {
    type: 'CREATE_BLOCK',
    payload: { id: _newID(), ...block }
  }
}

Actions.modifyBlockLayout = (block, options={}) => {
  return {
    type: 'MODIFY_BLOCK_LAYOUT',
    payload: { block, options }
  }
}

Actions.download = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'DOWNLOAD',
      payload: 'not yet'
    })
  }
}

Actions.updateLayouts = (layouts) => {
  return {
    type: 'UPDATE_LAYOUTS',
    payload: layouts
  }
}

Actions.setBreakpoint = (breakpoint) => {
  return {
    type: 'SET_BREAKPOINT',
    payload: breakpoint
  }
}

Actions.getWeather = (block) => {
  return (dispatch, getState) => {
    const { weathers } = getState()

    // keep weather results for 5 minutes
    const now = Date.now()
    const existing = weathers[block.id]
    const WAIT = 1000 * 60 * 5
    const doLoad = !existing || (existing.loadedAt && (now - existing.loadedAt) > WAIT)

    if (doLoad) {
      Weather(block.location, (content) => {
        dispatch({
          type: 'WEATHER_LOADED',
          payload: {
            content,
            id: block.id,
          }
        })
      }, (error) => {
        dispatch({
          type: 'WEATHER_LOAD_FAILED',
          payload: {
            error,
            id: block.id
          }
        })
      })
    }
  }
}

Actions.cacheUserscript = (block, html, state) => {
  return {
    type: "CACHE_USERSCRIPT_BLOCK",
    payload: {
      html: html,
      state: state,
      id: block.id,
      at: new Date().getTime(),
    }
  }
}

export default Actions
