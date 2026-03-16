import { useState } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Button, Alert } from "react-bootstrap"

import Actions from "../../actions"
import {
  readFileAsJSON,
  validateImportData,
} from "../../lib/storage/exportImport"

const Settings = () => {
  const dispatch = useDispatch()
  const editing = useSelector((state) => state.forms.settings.visible)
  const colorScheme = useSelector((s) => s.settings.colorScheme || 'system')

  const [importError, setImportError] = useState(null)
  const [importSuccess, setImportSuccess] = useState(false)
  const [pendingImport, setPendingImport] = useState(null)

  const resetState = () => {
    setImportError(null)
    setImportSuccess(false)
    setPendingImport(null)
  }

  const handleClose = () => {
    resetState()
    dispatch(
      Actions.toggleSettingsEditor({
        visible: false,
        form: {},
      })
    )
  }

  const handleExport = () => dispatch(Actions.exportData())

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    resetState()

    try {
      const data = await readFileAsJSON(file)
      const validation = validateImportData(data)

      if (!validation.valid) {
        setImportError(validation.error)
        return
      }

      setPendingImport(validation.data)
    } catch (error) {
      setImportError(error.message)
    }

    event.target.value = ""
  }

  const handleConfirmImport = () => {
    if (pendingImport) {
      dispatch(Actions.importData(pendingImport))
      setPendingImport(null)
      setImportSuccess(true)
    }
  }

  const handleCancelImport = () => setPendingImport(null)

  if (!editing) {
    return <div />
  }

  return (
    <Modal show={editing} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Appearance</h4>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="color-scheme-select">Color Scheme</label>
          <select
            id="color-scheme-select"
            className="form-control"
            value={colorScheme}
            onChange={(e) => dispatch(Actions.updateSettings({ colorScheme: e.target.value }))}
            style={{ marginTop: "6px" }}
          >
            <option value="system">System (default)</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <h4>Backup &amp; Restore</h4>

        {importError && (
          <Alert variant="danger">
            <strong>Import Error:</strong> {importError}
          </Alert>
        )}

        {importSuccess && (
          <Alert variant="success">
            <strong>Success!</strong> Your data has been imported.
          </Alert>
        )}

        {pendingImport && (
          <Alert variant="warning">
            <strong>Confirm Import</strong>
            <p>
              This will replace all your current blocks, layouts, and
              settings. This action cannot be undone.
            </p>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="danger"
                onClick={handleConfirmImport}
                style={{ marginRight: "10px" }}
              >
                Replace My Data
              </Button>
              <Button onClick={handleCancelImport}>Cancel</Button>
            </div>
          </Alert>
        )}

        <div style={{ marginBottom: "20px" }}>
          <h5>Export</h5>
          <p>Download a backup of all your blocks, layouts, and settings.</p>
          <Button variant="primary" onClick={handleExport}>
            Export Backup
          </Button>
        </div>

        <div>
          <h5>Import</h5>
          <p>Restore from a previously exported backup file.</p>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            style={{ display: "block", marginTop: "10px" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

Settings.propTypes = {
  editing: PropTypes.bool,
  form: PropTypes.object,
}

export default Settings
