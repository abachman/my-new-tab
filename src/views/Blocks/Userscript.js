import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { GridBlockWrapper }  from './Base'
import Actions from 'actions'

class Userscript extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired
  }

  log(...message) {
    // const tag = `[Block ${this.props.block.id}]`
    // console.log.apply(
    //   console, [tag].concat(message)
    // )
  }

  constructor(...args) {
    super(...args)

    this.state = {
      content: null
    }

    this.handleMessage = this.handleMessage.bind(this)
  }

  setContent(html) {
    this.setState({ content: html })
  }

  handleMessage(event) {
    this.log("handleMessage got event", event)

    if (event.data.sender && this.props.block.id === event.data.sender) {
      if (event.data.html) {
        this.log("with data.html", event.data.html)
        this.setContent(event.data.html)
      }

      if (event.data.state) {
        this.log('with data.state', event.data.state)
      }

      // store permanently
      this.props.dispatch(
        Actions.cacheUserscript(this.props.block, event.data.html, event.data.state)
      )
    }
  }

  // check if cached block HTML is newer than cache_timeout
  useCache() {
    // this.log("check cache timeout", this.props.block, this.props.cache)
    const timeout = this.props.block.cache_timeout
    if (! timeout)
      return false

    if (! this.props.cache)
      return false

    const last_update_at = this.props.cache.at
    if (! last_update_at)
      return false

    const now = new Date().getTime()
    const update_after = (parseInt(last_update_at, 10) + parseInt(timeout, 10))

    // this.log("CHECK NOW", new Date(now), "<", new Date(update_after))

    return now < update_after
  }

  componentDidMount() {
    if (this.useCache()) {
      this.log('using cached html')
      this.setContent(this.props.cache.html)
      return
    }

    // attach event listener and execute userscript just after pageload, to ensure
    // userscript.html has loaded
    // setTimeout(() => {
      try {
        this.log('attaching window message event listener')
        window.addEventListener('message', this.handleMessage)

        this.log('sending code to iframe')
        const iframe = document.getElementById('usFrame');
        const message = {
          sender: this.props.block.id,
          domId: 'id-' + this.props.block.id,
          code: this.props.block.code,
          size: this.props.size,
          state: this.props.block_state
        };
        iframe.contentWindow.postMessage(message, '*');
      } catch (ex) {
        console.error('failed to execute', ex)
      }
    // }, 1000)
  }

  componentWillUnmount() {
    this.log('detaching window message event listener')
    window.removeEventListener('message', this.handleMessage)
  }

  render() {
    // const { block, size } = this.props
    return (
      <div className='script-block' dangerouslySetInnerHTML={{ __html: this.state.content }} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!(state.block_cache && state.block_state)){
    return {}
  }

  return {
    cache: state.block_cache[ownProps.block.id],
    block_state: state.block_state[ownProps.block.id]
  }
}

export default GridBlockWrapper(connect(mapStateToProps)(Userscript))
