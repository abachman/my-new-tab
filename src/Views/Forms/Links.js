import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

import Actions from '../../actions'

class Links extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    form: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.fields = {}
  }

  save() {
    const form = {}

    Object.entries(this.fields).forEach(kv => {
      const f = kv[1]

      if (f.type === 'checkbox') {
        form[f.name] = f.checked ? '1' : '0'
      } else {
        form[f.name] = f.value
      }
    })

    this.props.save(form)
  }

  register(input) {
    if (input)
      this.fields[input.name] = input
  }

  render() {
    const { editing, form } = this.props

    if (!editing) {
      return <div />
    }

    const ref = this.register.bind(this)

    return (
      <Modal show={true} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>LINKSLINKSLINKS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref='form'>
            <input ref={ref} value={form.id} type='hidden' name='id'/>
            <input ref={ref} value={form.type} type='hidden' name='type'/>
            <div className="form-group">
              <label htmlFor="link_label" className="control-label">Label:</label>
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
              <label htmlFor="link_url" className="control-label">URL:</label>
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

          <div ref='item_preview' className='row'>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button onClick={this.save.bind(this)} bsStyle='primary'>Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    editing: state.forms.links.visible,
    form:    state.forms.links.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    close() {
      dispatch(Actions.toggleLinkEditor({
        // hide and clear
        visible: false,
        form: {}
      }))
    },

    save(link) {
      if (link.id && link.id.length > 0) {
        dispatch(Actions.updateLink(link.id, { ...link }))
      } else {
        delete link['id']
        dispatch(Actions.createLink(link))
      }

      dispatch(Actions.toggleLinkEditor({
        visible: false,
        form: {}
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)
