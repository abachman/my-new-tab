import React from 'react'
import PropTypes from 'prop-types'

// Block editing form wrapper
export default class Bookmarks extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    refCb: PropTypes.func.isRequired
  }

  fontFamilyOptions() {
    return [
      ['Monospace', 'monaco, Consolas, "Lucida Console", monospace'],
      ['Sans', '"Helvetica Neue", Helvetica, Arial, sans-serif'],
      ['Serif', '"Hoefler Text", "Baskerville Old Face", Garamond, "Times New Roman", serif']
    ].map(choice => {
      const l = choice[0],
            v = choice[1]
      return <option value={v} key={l}>{l}</option>
    })
  }

  render() {
    const { refCb, form } = this.props
    const ref = refCb

    return (
      <form rel='form'>
        <div className="form-group">
          <label htmlFor="fontFamily" className="control-label">Font Family:</label>
          <select ref={ref} className='form-control' name='fontFamily' defaultValue={form.fontFamily}>
            {this.fontFamilyOptions()}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="background_color" className="control-label">Color:</label>
          <input ref={ref} type="color" defaultValue={form.background_color} className="form-control" name="background_color"/>
        </div>
      </form>
    )
  }
}

