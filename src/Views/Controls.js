import React from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'

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
          <a onClick={this.props.add} className='btn btn-success add-item-js' title='Add'><span className='glyphicon glyphicon-plus'></span></a>
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
  add() {
    // normally we'd start the creation process, for now, fire off a creation action
    // return dispatch(Actions.createLink({
    //   label: 'A Link ' + (Math.random() * 100).toFixed(2),
    //   url: 'https://google.com'
    // }))
    return dispatch(Actions.toggleLinkEditor({
      visible: true
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
