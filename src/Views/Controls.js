import React from 'react'
import { connect } from 'react-redux'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Dropdown from 'react-bootstrap/lib/Dropdown'

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
        <MenuItem onClick={() => onCreate('bookmarks')}>Bookmarks</MenuItem>
        <MenuItem onClick={() => onCreate('feed')}>News Feed</MenuItem>
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
    return (
      <div className='row controls'>
        <div className='col-md-12'>
          <CreateMenu onCreate={type => this.props.add(type)} />
          <a onClick={this.toggleEditing.bind(this)} className='btn btn-info edit-items-js' title='Edit'><span className='glyphicon glyphicon-pencil'></span></a>
          <a onClick={this.props.editSettings} className='btn btn-default edit-settings-js' title='Settings'><span className='glyphicon glyphicon-wrench'></span></a>
          <a onClick={this.props.download} className='btn btn-default export-items-js' title='Download'><span className='glyphicon glyphicon-download-alt'></span></a>
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
    return dispatch(Actions.toggleLinkEditor({
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
