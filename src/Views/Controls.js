import React from 'react'
import { connect } from 'react-redux'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import Button from 'react-bootstrap/lib/Button'

import Tip from '../components/Tip'
import Actions from '../actions'

const CreateMenu = ({ onCreate }) => {
  return (
    <Dropdown id='add-block-menu'>
      <Dropdown.Toggle bsStyle='success'>
        <Glyphicon glyph="plus" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="super-colors">
        <MenuItem onClick={() => onCreate('link')}>Link</MenuItem>
        <MenuItem onClick={() => onCreate('weather')}>Weather</MenuItem>
        <MenuItem onClick={() => onCreate('clock')}>Clock</MenuItem>
        {/* <MenuItem onClick={() => onCreate('bookmarks')}>Bookmarks</MenuItem> */}
        {/* <MenuItem onClick={() => onCreate('feed')}>News Feed</MenuItem> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

// The GRID
class Controls extends React.Component {
  toggleEditing() {
    const { editing } = this.props
    this.props.toggleEditing(!editing)
  }

  render() {
    const { editing } = this.props

    return (
      <div className='row controls'>
        <div className='col-md-12'>
          <CreateMenu onCreate={type => this.props.add(type)} />

          <Tip label='Toggle editing mode'>
            <Button onClick={this.toggleEditing.bind(this)} bsStyle='info' title='Edit' active={editing}><Glyphicon glyph='pencil'/></Button>
          </Tip>
          {/* <Tip label='Edit settings'>
            <Button onClick={this.props.editSettings}       bsStyle='default' title='Settings'><Glyphicon glyph='wrench'/></Button>
          </Tip> */}
          <Tip label='Download layout'>
            <Button onClick={this.props.download}           bsStyle='default' title='Download'><Glyphicon glyph='download-alt'/></Button>
          </Tip>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  editing: state.layout.editing
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  add(type) {
    return dispatch(Actions.toggleBlockEditor({
      visible: true,
      form: { type }
    }))
  },

  editSettings() {
    return dispatch(Actions.toggleSettingsEditor({
      visible: true
    }))
  },

  toggleEditing(toState) {
    return dispatch(Actions.toggleEditing(toState))
  },

  download() {
    return dispatch(Actions.download())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Controls)
