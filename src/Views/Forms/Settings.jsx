import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Modal from "react-bootstrap/lib/Modal"
import Button from "react-bootstrap/lib/Button"

import Actions from "../../actions"

class Settings extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    form: PropTypes.object,
  }

  save() {}

  render() {
    const { editing } = this.props

    if (!editing) {
      return <div />
    }

    return (
      <Modal show={editing} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>SETTINGS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Settings Editor Goes Here</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button onClick={this.save.bind(this)} bsStyle="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editing: state.forms.settings.visible,
    form: state.forms.settings.form,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close() {
      dispatch(
        Actions.toggleSettingsEditor({
          // hide and clear
          visible: false,
          form: {},
        })
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
