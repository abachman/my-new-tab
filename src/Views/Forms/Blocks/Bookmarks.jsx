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

const Bookmarks = ({ refCb, form }) => (
  <form rel="form">
    <div className="form-group">
      <label htmlFor="fontFamily" className="control-label">
        Font Family:
      </label>
      <select
        ref={refCb}
        className="form-control"
        name="fontFamily"
        defaultValue={form.fontFamily}
      >
        {fontFamilyOptions()}
      </select>
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

Bookmarks.propTypes = {
  form: PropTypes.object.isRequired,
  refCb: PropTypes.func.isRequired,
}

export default Bookmarks
