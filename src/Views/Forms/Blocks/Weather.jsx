import PropTypes from "prop-types"

const Weather = ({ refCb, form }) => (
  <form rel="form">
    <div className="form-group">
      <label htmlFor="location" className="control-label">
        Location:
      </label>
      <input
        ref={refCb}
        type="text"
        defaultValue={form.location}
        className="form-control"
        name="location"
      />
    </div>

    <div className="form-group">
      <label htmlFor="background_color" className="control-label">
        Color:
      </label>
      <input
        ref={refCb}
        type="color"
        defaultValue={form.background_color}
        className="form-control"
        name="background_color"
      />
    </div>
  </form>
)

Weather.propTypes = {
  form: PropTypes.object.isRequired,
  refCb: PropTypes.func.isRequired,
}

export default Weather
