import React from "react"
import PropTypes from "prop-types"

// Block editing form wrapper
export default class Template extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    refCb: PropTypes.func.isRequired,
  }

  cacheOptions() {
    return [
      ["No Caching", 0],
      ["1 minute", 60 * 1000],
      ["5 minutes", 60 * 1000 * 5],
      ["30 minutes", 60 * 1000 * 30],
      ["1 hour", 60 * 1000 * 60],
      ["6 hours", 60 * 1000 * 60 * 6],
      ["24 hours", 60 * 1000 * 60 * 24],
    ].map((choice) => {
      const l = choice[0],
        v = choice[1]
      return (
        <option value={v.toString()} key={l}>
          {l}
        </option>
      )
    })
  }

  render() {
    const { refCb, form } = this.props
    const ref = refCb

    return (
      <form rel="form">
        <div className="form-group">
          <label htmlFor="url" className="control-label">
            URL:
          </label>
          <input
            name="url"
            ref={ref}
            type="text"
            placeholder="https://api.json"
            className="form-control"
            defaultValue={form.url}
          />
          <label htmlFor="template" className="control-label">
            Template:
          </label>
          <textarea
            style={{ fontFamily: "monospace", height: "175px" }}
            ref={ref}
            className="form-control"
            name="template"
            defaultValue={form.template}
          />
          <p className="help-block">
            Templates are HTML blocks in Liquid format. The URL given will be
            requested with fetch() and should return a JSON record which will be
            given to the template for rendering. If the API returns an array or
            any other non-JSON-curly-brace-object, it will be given to the
            template as the <code>data</code> property.
          </p>
          <p className="help-block">
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

        <div className="form-group">
          <label className="control-label" htmlFor="cache_timeout">
            Cache Results:
          </label>
          <select
            ref={ref}
            className="form-control"
            name="cache_timeout"
            defaultValue={form.cache_timeout || (60 * 1000 * 5).toString()}
          >
            {this.cacheOptions()}
          </select>
          <span className="help-block">
            Doing expensive / slow API calls? Cache the resulting HTML and avoid
            GETs on every new tab load.
          </span>
        </div>
      </form>
    )
  }
}
