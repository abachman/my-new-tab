import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import sized from '../components/sized'
import Color from '../lib/Color'

class LinkImage extends React.Component {
  componentDidMount() {
    // render image data URL into canvas
  }

  render() {
    return (
      <canvas className='item-image'></canvas>
    )
  }
}

const DragLayer = ({editing}) => {
  if (!editing) return null

  return (
    <div key='drag' className='drag-layer'/>
  )
}

class Link extends React.Component {
  static propTypes = {
    link: PropTypes.object.isRequired
  }

  editButtons() {
    const { editing, edit, destroy, link } = this.props
    if (!editing) return null;

    return (
      <div className='item-controls'>
        <a onClick={() => { edit(link) }} className='edit-button edit-item-js'>edit</a>
        <a onClick={() => { destroy(link) }} className='remove-button remove-item-js text-danger'>remove</a>
      </div>
    )
  }

  render() {
    const { size, editing } = this.props
    const { label, url, image, background_color, hide_label, transparent_background } = this.props.link

    let background = background_color
    if (transparent_background === '1' || !background) {
      background = 'transparent'
    }

    const labelClass = 'item-label ' + (Color.hexIsLight(background) ? 'dark' : 'light')
    const labelTag = <span className={labelClass}>{label}</span>

    return (
      <div className='item link-item' style={{backgroundColor: background}}>
        {this.editButtons()}
        <DragLayer editing={editing} />

        <a className='link-link' href={url}>
          <div className='item-container'>
            <LinkImage imageData={image} size={size} />
            { hide_label === '1' ? '' : labelTag }
          </div>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  editing: state.layout.editing
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  edit(link) {
    return dispatch(Actions.toggleLinkEditor({
      visible: true,
      form: Object.assign({}, link)
    }))
  },

  destroy(link) {
    return dispatch(Actions.destroyLink(link))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(sized(Link))
