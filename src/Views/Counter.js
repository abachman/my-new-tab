import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Actions from '../actions'

class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  increment() {
    this.props.dispatch(Actions.increment())
  }

  render() {
    return (
      <div>
        <button onClick={this.increment.bind(this)}>UP</button>
        <strong>{this.props.count}</strong>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter
  }
}

export default connect(mapStateToProps)(Counter)
