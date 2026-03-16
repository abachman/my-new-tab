import PropTypes from "prop-types"

const cacheOptions = () =>
  [
    ["No Caching", 0],
    ["1 minute", 60 * 1000],
    ["5 minutes", 60 * 1000 * 5],
    ["30 minutes", 60 * 1000 * 30],
    ["1 hour", 60 * 1000 * 60],
    ["6 hours", 60 * 1000 * 60 * 6],
    ["24 hours", 60 * 1000 * 60 * 24],
  ].map(([l, v]) => (
    <option value={v.toString()} key={l}>
      {l}
    </option>
  ))

const Template = ({ refCb, form }) => (
  <form rel="form">
    <div className="mb-3">
      <label htmlFor="url" className="form-label">
        URL:
      </label>
      <input
        name="url"
        ref={refCb}
        type="text"
        placeholder="https://api.json"
        className="form-control"
        defaultValue={form.url}
      />
      <label htmlFor="template" className="form-label">
        Template:
      </label>
      <textarea
        style={{ fontFamily: "monospace", height: "175px" }}
        ref={refCb}
        className="form-control"
        name="template"
        defaultValue={form.template}
      />
      <p className="form-text text-muted">
        Templates are HTML blocks in Liquid format. The URL given will be
        requested with fetch() and should return a JSON record which will be
        given to the template for rendering. If the API returns an array or
        any other non-JSON-curly-brace-object, it will be given to the
        template as the <code>data</code> property.
      </p>
      <p className="form-text text-muted">
        Check out{" "}
        <a href="https://shopify.github.io/liquid/">
          the Liquid template language guide
        </a>{" "}
        for help writing html templates. Check out{" "}
        <a href="https://gist.github.com/abachman/f8d0fe95200912d037cbc70a1c3beb5f">
          some sample URLs and templates on GitHub.
        </a>
      </p>
    </div>

    <div className="mb-3">
      <label className="form-label" htmlFor="cache_timeout">
        Cache Results:
      </label>
      <select
        ref={refCb}
        className="form-control"
        name="cache_timeout"
        defaultValue={form.cache_timeout || (60 * 1000 * 5).toString()}
      >
        {cacheOptions()}
      </select>
      <span className="form-text text-muted">
        Doing expensive / slow API calls? Cache the resulting HTML and avoid
        GETs on every new tab load.
      </span>
    </div>
  </form>
)

Template.propTypes = {
  form: PropTypes.object.isRequired,
  refCb: PropTypes.func.isRequired,
}

export default Template
