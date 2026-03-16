import PropTypes from "prop-types"

const Weather = ({ refCb, form }) => (
  <form rel="form">
    <div className="mb-3">
      <label htmlFor="location" className="form-label">
        Location:
      </label>
      <input
        ref={refCb}
        type="text"
        defaultValue={form.location}
        className="form-control"
        name="location"
        id="location"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="background_color" className="form-label">
        Color:
      </label>
      <input
        ref={refCb}
        type="color"
        defaultValue={form.background_color}
        className="form-control"
        name="background_color"
        id="background_color"
      />
    </div>
  </form>
)

Weather.propTypes = {
  form: PropTypes.object.isRequired,
  refCb: PropTypes.func.isRequired,
}

export default Weather
