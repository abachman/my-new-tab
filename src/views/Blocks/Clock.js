import React from 'react'
import PropTypes from 'prop-types'

import { GridBlockWrapper }  from './Base'
import formatDate from '../../lib/formatDate'

import '../../stylesheets/Clock.css'

class Clock extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired
  }

  state = {
    time: new Date()
  }

  componentDidMount() {
    this._tick = setInterval(() => {
      this.setState({time: new Date()})
    }, 2000)
  }

  componentWillUnmount() {
    if (this._tick)
      clearInterval(this._tick)
  }

  formattedTime() {
    const { size, block } = this.props
    const { fontFamily } = block

    const now = this.state.time,
          bigFont   = {fontSize: Math.floor(size.width / 6) + 'px'},
          smallFont = {fontSize: Math.floor(size.width / 14) + 'px'}

    return (
      <div className='clock-time' style={{fontFamily: fontFamily}}>
        <div className='time' style={bigFont}>{formatDate(now, 'h:mm TT')}</div>
        <div className='date' style={smallFont}>{formatDate(now, 'dddd, d MMM yyyy')}</div>
      </div>
    )
  }

  render() {

    return (
      <div className='item-container'>
        {this.formattedTime()}
      </div>
    )
  }
}

export default GridBlockWrapper(Clock)
