/* eslint no-eval: 0 */

import React, { PropTypes } from 'react'

import { GridBlockWrapper }  from './Base'

class Userscript extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired
  }

  log(...message) {
    const tag = `[Block ${this.props.block.id}]`
    console.log.apply(
      console, [tag].concat(message)
    )
  }

  constructor(...args) {
    super(...args)

    this.state = {
      content: null
    }

    this.handleMessage = this.handleMessage.bind(this)
  }

  handleMessage(event) {
    this.log("GOT EVENT", event)

    if (event.data.sender && this.props.block.id === event.data.sender) {
      if (event.data.html) {
        this.log("with data.html", event.data.html)
        this.setState({ content: event.data.html })
      }
    }
  }

  componentDidMount() {
    try {
      this.log("sending code to iframe...")

      const iframe = document.getElementById('usFrame');
      const message = {
        sender: this.props.block.id,
        domId: 'id-' + this.props.block.id,
        code: this.props.block.code,
        size: this.props.size
      };
      iframe.contentWindow.postMessage(message, '*');

      this.log('attaching window message event listener')
      window.addEventListener('message', this.handleMessage)
    } catch (ex) {
      console.error('failed to execute', ex)
    }
  }

  componentWillUnmount() {
    this.log('detaching window message event listener')
    window.removeEventListener('message', this.handleMessage)
  }

  render() {
    const { block, size } = this.props

    return (
      <div className='script-block'
        dangerouslySetInnerHTML={{ __html: this.state.content }} />
    )
  }
}

export default GridBlockWrapper(Userscript)
