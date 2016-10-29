import React, { PropTypes } from 'react'

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
          <label htmlFor="label" className="control-label">Label:</label>
          <input ref={ref} type="text" defaultValue={form.label} className="form-control" name="label"/>
        </div>
        <div className="form-group">
          <label htmlFor="background_color" className="control-label">Color:</label>
          <input ref={ref} type="color" defaultValue={form.background_color} className="form-control" name="background_color"/>
        </div>
        <div className="checkbox">
          <label>
            <input ref={ref} type="checkbox" defaultChecked={form.transparent_background === '1'} name="transparent_background" value='1' />
            Transparent background
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="url" className="control-label">URL:</label>
          <input ref={ref} type="url" defaultValue={form.url} className="form-control" name="url"/>
        </div>
        <div className="form-group">
          <label htmlFor="image_upload">File input</label>
          <input ref={ref} type="file" id="image_upload"  name="image_upload"/>
          <p className="help-block">Upload a background image.</p>
        </div>
        <div className="checkbox">
          <label>
            <input ref={ref} type="checkbox" defaultChecked={form.hide_label === '1'} name="hide_label" value='1'/>
            Hide label
          </label>
        </div>
      </form>
    )
  }
}
