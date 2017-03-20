import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { setImageOnCanvas } from '../../lib/images'
import { GridBlockWrapper }  from './Base'

class LinkImage extends React.Component {
  componentDidUpdate() {
    this.renderImage()
  }

  renderImage() {
    const canvas = ReactDOM.findDOMNode(this)
    setImageOnCanvas( canvas, this.props.imageData )
  }

  render() {
    const { width, height } = this.props.size
    const style = {width: width + 'px', height: height + 'px'}

    return (
      <canvas className='item-image' width={width} height={height} style={style}></canvas>
    )
  }
}

class Link extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired
  }

  render() {
    const { size, block } = this.props
    const { label, url, image_upload, hide_label } = block

    const labelTag = hide_label !== '1' ?
      <span className='item-label'>{label}</span> :
      null

    const imageTag = image_upload ?
      <LinkImage imageData={image_upload} block={block} size={size} /> :
      null

    return (
      <a className='link-link' href={url}>
        <div className='item-container'>
          { imageTag }
          { labelTag }
        </div>
      </a>
    )
  }
}

export default GridBlockWrapper(Link)
