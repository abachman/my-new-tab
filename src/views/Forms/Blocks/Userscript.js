import React, { PropTypes } from 'react'

// Block editing form wrapper
export default class Userscript extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    refCb: PropTypes.func.isRequired
  }

  render() {
    const { refCb, form } = this.props
    const ref = refCb

    const defaultCode = form.code || "function (callback, id, size) {\n  callback('<strong>hello world</strong>');\n}"

    return (
      <form rel='form'>
        <div className="form-group">
          <label htmlFor="code" className="control-label">Code:</label>
          <textarea style={{fontFamily: 'monospace', height: '175px'}} ref={ref} type="color" defaultValue={defaultCode} className="form-control" name="code"/>
          <span className="help-block">
            Your code must be a single callable function that receives callback, id,
            and size arguments. <code>callback</code> is a function that accepts
            a single argument containing the HTML you'd like to render,
            <code>id</code> is an HTML and CSS safe unique ID you can use to style
            your HTML, and <code>size</code> is the size of the element it will
            be rendered into.
          </span>
          <span className="help-block">
            Check out <a href='https://github.com/oneuijs/You-Dont-Need-jQuery'>You Don't Need jQuery</a>
            for help writing vanilla javascript and check out some <a href='https://gist.github.com/abachman/bd5b5acfd6b51352c0e42b742e039644'>sample userscripts on GitHub.</a>
          </span>
        </div>
      </form>
    )
  }
}
