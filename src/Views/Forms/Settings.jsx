import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Modal from "react-bootstrap/lib/Modal"
import Button from "react-bootstrap/lib/Button"
import Alert from "react-bootstrap/lib/Alert"

import Actions from "../../actions"
import {
  readFileAsJSON,
  validateImportData,
} from "../../lib/storage/exportImport"

class Settings extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    form: PropTypes.object,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
    close: PropTypes.func,
  }

  state = {
    importError: null,
    importSuccess: false,
    pendingImport: null,
  }

  resetState() {
    this.setState({
      importError: null,
      importSuccess: false,
      pendingImport: null,
    })
  }

  handleExport = () => {
    this.props.onExport()
  }

  handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    this.resetState()

    try {
      const data = await readFileAsJSON(file)
      const validation = validateImportData(data)

      if (!validation.valid) {
        this.setState({ importError: validation.error })
        return
      }

      this.setState({ pendingImport: validation.data })
    } catch (error) {
      this.setState({ importError: error.message })
    }

    event.target.value = ""
  }

  handleConfirmImport = () => {
    const { pendingImport } = this.state
    if (pendingImport) {
      this.props.onImport(pendingImport)
      this.setState({
        pendingImport: null,
        importSuccess: true,
      })
    }
  }

  handleCancelImport = () => {
    this.setState({ pendingImport: null })
  }

  handleClose = () => {
    this.resetState()
    this.props.close()
  }

  render() {
    const { editing } = this.props
    const { importError, importSuccess, pendingImport } = this.state

    if (!editing) {
      return <div />
    }

    return (
      <Modal show={editing} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Backup &amp; Restore</h4>

          {importError && (
            <Alert bsStyle="danger">
              <strong>Import Error:</strong> {importError}
            </Alert>
          )}

          {importSuccess && (
            <Alert bsStyle="success">
              <strong>Success!</strong> Your data has been imported.
            </Alert>
          )}

          {pendingImport && (
            <Alert bsStyle="warning">
              <strong>Confirm Import</strong>
              <p>
                This will replace all your current blocks, layouts, and
                settings. This action cannot be undone.
              </p>
              <div style={{ marginTop: "10px" }}>
                <Button
                  bsStyle="danger"
                  onClick={this.handleConfirmImport}
                  style={{ marginRight: "10px" }}
                >
                  Replace My Data
                </Button>
                <Button onClick={this.handleCancelImport}>Cancel</Button>
              </div>
            </Alert>
          )}

          <div style={{ marginBottom: "20px" }}>
            <h5>Export</h5>
            <p>Download a backup of all your blocks, layouts, and settings.</p>
            <Button bsStyle="primary" onClick={this.handleExport}>
              Export Backup
            </Button>
          </div>

          <div>
            <h5>Import</h5>
            <p>Restore from a previously exported backup file.</p>
            <input
              type="file"
              accept=".json,application/json"
              onChange={this.handleFileSelect}
              style={{ display: "block", marginTop: "10px" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
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
          visible: false,
          form: {},
        })
      )
    },
    onExport() {
      dispatch(Actions.exportData())
    },
    onImport(data) {
      dispatch(Actions.importData(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
