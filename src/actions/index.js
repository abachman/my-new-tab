import { createActions } from 'redux-actions'

function S4() { return (((1+Math.random())*0x10000)|0).toString(16).substring(1) }

// a unique enough ID. Almost, but not quite a UUID
function _newID() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4()).toLowerCase();
}

const Actions = createActions({ },
  'INCREMENT',
  'EDIT_LINK',
  'DESTROY_LINK',
  'ADD_LINK',
  'TOGGLE_EDITING',
  'TOGGLE_LINK_EDITOR',
  'TOGGLE_SETTINGS_EDITOR',
)

Actions.updateLink = (id, attrs) => {
  return (dispatch, getState) => {
    const state = getState()
    const link = state.links[id]

    if (link) {
      dispatch({
        type: 'UPDATE_LINK',
        payload: { ...link, ...attrs }
      })
    } else {
      dispatch({ type: 'UPDATE_LINK_FAILED' })
    }
  }
}

Actions.createLink = (link) => {
  return {
    type: 'CREATE_LINK',
    payload: { id: _newID(), ...link }
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

export default Actions
