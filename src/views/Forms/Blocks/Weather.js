import React from 'react'
import PropTypes from 'prop-types'

// Block editing form wrapper
export default class Link extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    refCb: PropTypes.func.isRequired
  }

  render() {
    const { refCb, form } = this.props
    const ref = refCb

    return (
      <form rel='form'>
        <div className="form-group">
          <label htmlFor="location" className="control-label">Location:</label>
          <input ref={ref} type="text" defaultValue={form.location} className="form-control" name="location"/>
        </div>

        <div className="form-group">
          <label htmlFor="background_color" className="control-label">Color:</label>
          <input ref={ref} type="color" defaultValue={form.background_color} className="form-control" name="background_color"/>
        </div>
      </form>
    )
  }
}

