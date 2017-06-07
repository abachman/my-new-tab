import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

import { uploadImage } from '../../../lib/images'
import Link from './Link'
import Weather from './Weather'
import Clock from './Clock'
import Userscript from './Userscript'

import Actions from '../../../actions'

// Block editing form wrapper
class Blocks extends React.Component {
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
    let imageField = null

    Object.entries(this.fields).forEach(kv => {
      const f = kv[1]

      if (f.type === 'checkbox') {
        form[f.name] = f.checked ? '1' : '0'
      } else if (f.type === 'file') {
        if (f.files && f.files[0]) {
          imageField = f
        }
      } else {
        form[f.name] = f.value
      }
    })

    const finish = (fm) => {
      this.props.save(fm)
      // console.log("RESET FORM")
      this.fields = {}
      this.props.close()
    }

    if (imageField) {
      // don't save until image is uploaded
      uploadImage(imageField, function (dataUrl) {
        form[imageField.name] = dataUrl
        finish(form)
      });
    } else {
      finish(form)
    }
  }

  register(input) {
    if (input)
      this.fields[input.name] = input
  }

  form() {
    const { form } = this.props
    switch (form.type) {
      case 'clock':
        return <Clock refCb={this.register.bind(this)} form={form} />
      case 'weather':
        return <Weather refCb={this.register.bind(this)} form={form} />
      case 'link':
        return <Link refCb={this.register.bind(this)} form={form} />
      case 'userscript':
        return <Userscript refCb={this.register.bind(this)} form={form} />
      default:
        return <Link refCb={this.register.bind(this)} form={form} />
    }
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
          <Modal.Title>{form.type.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={ref} value={form.id} type='hidden' name='id'/>
          <input ref={ref} value={form.type} type='hidden' name='type'/>

          { this.form() }

          <div ref='item_preview' className='row'></div>
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
    editing: state.forms.blocks.visible,
    form:    state.forms.blocks.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    close() {
      dispatch(Actions.toggleBlockEditor({
        // hide and clear
        visible: false,
        form: {}
      }))
    },

    save(block) {
      if (block.id && block.id.length > 0) {
        dispatch(Actions.updateBlock(block.id, { ...block }))
      } else {
        delete block['id']
        dispatch(Actions.createBlock(block))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks)
