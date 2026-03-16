import PropTypes from "prop-types"

const fontFamilyOptions = () =>
  [
    ["Monospace", 'monaco, Consolas, "Lucida Console", monospace'],
    ["Sans", '"Helvetica Neue", Helvetica, Arial, sans-serif'],
    [
      "Serif",
      '"Hoefler Text", "Baskerville Old Face", Garamond, "Times New Roman", serif',
    ],
  ].map(([l, v]) => (
    <option value={v} key={l}>
      {l}
    </option>
  ))

const Clock = ({ refCb, form }) => (
  <form rel="form">
    <div className="mb-3">
      <label htmlFor="fontFamily" className="form-label">
        Font Family:
      </label>
      <select
        ref={refCb}
        className="form-control"
        name="fontFamily"
        id="fontFamily"
        defaultValue={form.fontFamily}
      >
        {fontFamilyOptions()}
      </select>
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

Clock.propTypes = {
  form: PropTypes.object.isRequired,
  refCb: PropTypes.func.isRequired,
}

export default Clock
