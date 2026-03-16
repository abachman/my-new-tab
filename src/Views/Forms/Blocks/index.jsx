import { useRef } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Button } from "react-bootstrap"

import { uploadImage } from "../../../lib/images"
import Link from "./Link"
import Weather from "./Weather"
import Clock from "./Clock"
import Template from "./Template"

import Actions from "../../../actions"

const Blocks = () => {
  const dispatch = useDispatch()
  const editing = useSelector((state) => state.forms.blocks.visible)
  const form = useSelector((state) => state.forms.blocks.form)
  const fieldsRef = useRef({})
  const previewRef = useRef(null)

  const close = () => {
    dispatch(
      Actions.toggleBlockEditor({
        visible: false,
        form: {},
      })
    )
  }

  const save = () => {
    const formData = {}
    let imageField = null

    Object.entries(fieldsRef.current).forEach((kv) => {
      const f = kv[1]

      if (f.type === "checkbox") {
        formData[f.name] = f.checked ? "1" : "0"
      } else if (f.type === "file") {
        if (f.files && f.files[0]) {
          imageField = f
        }
      } else {
        formData[f.name] = f.value
      }
    })

    const finish = (fm) => {
      if (fm.id && fm.id.length > 0) {
        dispatch(Actions.updateBlock(fm.id, { ...fm }))
      } else {
        delete fm["id"]
        dispatch(Actions.createBlock(fm))
      }
      fieldsRef.current = {}
      close()
    }

    if (imageField) {
      uploadImage(imageField, function (dataUrl) {
        formData[imageField.name] = dataUrl
        finish(formData)
      })
    } else {
      finish(formData)
    }
  }

  const register = (input) => {
    if (input) fieldsRef.current[input.name] = input
  }

  const renderForm = () => {
    switch (form.type) {
      case "clock":
        return <Clock refCb={register} form={form} />
      case "weather":
        return <Weather refCb={register} form={form} />
      case "link":
        return <Link refCb={register} form={form} />
      case "template":
        return <Template refCb={register} form={form} />
      default:
        return <Link refCb={register} form={form} />
    }
  }

  if (!editing) {
    return <div />
  }

  return (
    <Modal show={true} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{form.type.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input ref={register} value={form.id} type="hidden" name="id" readOnly />
        <input ref={register} value={form.type} type="hidden" name="type" readOnly />

        {renderForm()}

        <div ref={previewRef} className="row"></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={save} variant="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

Blocks.propTypes = {
  editing: PropTypes.bool,
  form: PropTypes.object,
}

export default Blocks
