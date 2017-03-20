import React, { PropTypes } from 'react'
// import ReactDOM from 'react-dom'

// import { setImageOnCanvas } from '../../lib/images'
import { GridBlockWrapper }  from './Base'
// echo 'ping'

class Bookmarks extends React.Component {
  static propTypes = {
    size: PropTypes.object,
    block: PropTypes.object
  }

  render() {
    const { size, block } = this.props
    const { fontFamily } = block

    return (
      <div className='listing item-container' style={{fontFamily: fontFamily}}>
        <p>
          Bookmarks go here. <span>{JSON.stringify(size)}</span>
        </p>
      </div>
    )
  }
}

export default GridBlockWrapper(Bookmarks)
