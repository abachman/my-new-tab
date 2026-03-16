import PropTypes from "prop-types"

import Color from "lib/Color"

const Link = ({ refCb, form }) => {
  const defaultColor = Color.valid(form.background_color)
    ? form.background_color
    : Color.random(0.4)

  return (
    <form rel="form">
      <div className="form-group">
        <label htmlFor="label" className="control-label">
          Label:
        </label>
        <input
          ref={refCb}
          type="text"
          defaultValue={form.label}
          className="form-control"
          name="label"
        />
      </div>
      <div className="form-group">
        <label htmlFor="background_color" className="control-label">
          Color:
        </label>
        <input
          ref={refCb}
          type="color"
          defaultValue={defaultColor}
          className="form-control"
          name="background_color"
        />
      </div>
      <div className="checkbox">
        <label>
          <input
            ref={refCb}
            type="checkbox"
            defaultChecked={form.transparent_background === "1"}
            name="transparent_background"
            value="1"
          />
          Transparent background
        </label>
      </div>
      <div className="checkbox">
        <label>
          <input
            ref={refCb}
            type="checkbox"
            defaultChecked={form.show_border === "1"}
            name="show_border"
            value="1"
          />
          Show border
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="url" className="control-label">
          URL:
        </label>
        <input
          ref={refCb}
          type="url"
          defaultValue={form.url}
          className="form-control"
          name="url"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image_upload">Icon image:</label>
        <input ref={refCb} type="file" id="image_upload" name="image_upload" />
        <p className="help-block">Upload a background image.</p>
      </div>
      <div className="checkbox">
        <label>
          <input
            ref={refCb}
            type="checkbox"
            defaultChecked={form.hide_label === "1"}
            name="hide_label"
            value="1"
          />
          Hide label
        </label>
      </div>
    </form>
  )
}

Link.propTypes = {
  form: PropTypes.object.isRequired,
  refCb: PropTypes.func.isRequired,
}

export default Link
