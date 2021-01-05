import React from 'react'
import PropTypes from 'prop-types'
import { Liquid } from 'liquidjs'
import { connect } from 'react-redux'

import { GridBlockWrapper } from './Base'
import Actions from 'actions'

const engine = new Liquid()

class Template extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args)

    this.state = {
      data: {},
      html: '',
    }
  }

  log(...message) {
    // const tag = `[Block ${this.props.block.id}]`
    // console.log.apply(console, [tag].concat(message))
  }

  componentDidMount() {
    if (this.useCache()) {
      this.log('using cached html', this.props.cache.html)
      this.setState({ html: this.props.cache.html })
      return
    }

    const getData = this.props.block.url
      ? fetch(this.props.block.url)
      : Promise.resolve({ json: () => Promise.resolve({}) })
    getData
      .then((data) => {
        this.log('with URL', this.props.block.url)
        return data.json()
      })
      .then((json) => {
        if (JSON.stringify(json)[0] !== '{') {
          json = { data: json }
        }

        engine.parseAndRender(this.props.block.template, json).then((html) => {
          this.setState({ html })

          // store permanently
          this.props.dispatch(
            Actions.cacheUserscript(this.props.block, html, json)
          )
        })
      })
  }

  // check if cached block HTML is newer than cache_timeout
  useCache() {
    // this.log("check cache timeout", this.props.block, this.props.cache)
    const timeout = this.props.block.cache_timeout
    if (!timeout) return false

    if (!this.props.cache) return false

    const last_update_at = this.props.cache.at
    if (!last_update_at) return false

    const now = new Date().getTime()
    const update_after = parseInt(last_update_at, 10) + parseInt(timeout, 10)

    // this.log("CHECK NOW", new Date(now), "<", new Date(update_after))
    return now < update_after
  }

  render() {
    return (
      <div
        className="template-content"
        dangerouslySetInnerHTML={{ __html: this.state.html }}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!(state.block_cache && state.block_state)) {
    return {}
  }

  return {
    cache: state.block_cache[ownProps.block.id],
    block_state: state.block_state[ownProps.block.id],
  }
}

export default GridBlockWrapper(connect(mapStateToProps)(Template))
