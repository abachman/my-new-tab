import { useSelector, useDispatch } from "react-redux"
import Glyphicon from "react-bootstrap/lib/Glyphicon"
import MenuItem from "react-bootstrap/lib/MenuItem"
import Dropdown from "react-bootstrap/lib/Dropdown"
import Button from "react-bootstrap/lib/Button"

import Tip from "../components/Tip"
import Actions from "../actions"

const CreateMenu = ({ onCreate }) => {
  return (
    <Dropdown id="add-block-menu">
      <Dropdown.Toggle bsStyle="success" data-testid="add-block">
        <Glyphicon glyph="plus" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="super-colors">
        <MenuItem onClick={() => onCreate("link")}>Link</MenuItem>
        <MenuItem onClick={() => onCreate("weather")}>Weather</MenuItem>
        <MenuItem onClick={() => onCreate("clock")}>Clock</MenuItem>
        <MenuItem onClick={() => onCreate("template")}>Template</MenuItem>
        {/* <MenuItem onClick={() => onCreate('bookmarks')}>Bookmarks</MenuItem> */}
        {/* <MenuItem onClick={() => onCreate('feed')}>News Feed</MenuItem> */}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const Controls = () => {
  const dispatch = useDispatch()
  const editing = useSelector((state) => state.layout.editing)
  const compacting = useSelector((state) => state.layout.compacting)

  const add = (type) =>
    dispatch(Actions.toggleBlockEditor({ visible: true, form: { type } }))

  const editSettings = () =>
    dispatch(Actions.toggleSettingsEditor({ visible: true }))

  const toggleEditing = () => dispatch(Actions.toggleEditing(!editing))

  const toggleCompacting = () => dispatch(Actions.toggleCompacting(!compacting))

  const compactingButton = () => {
    if (!editing) return null

    return (
      <Tip label="Toggle vertical compacting">
        <Button
          onClick={toggleCompacting}
          bsStyle={compacting ? "info" : "default"}
          title="Compact"
          active={compacting}
        >
          <Glyphicon glyph="eject" />
        </Button>
      </Tip>
    )
  }

  return (
    <div className="row controls">
      <div className="col-md-12">
        <CreateMenu onCreate={add} />

        <Tip label="Toggle editing mode">
          <Button
            onClick={toggleEditing}
            bsStyle="info"
            title="Edit"
            active={editing}
          >
            <Glyphicon glyph="pencil" />
          </Button>
        </Tip>

        {compactingButton()}

        <Tip label="Edit settings">
          <Button
            onClick={editSettings}
            bsStyle="default"
            title="Settings"
          >
            <Glyphicon glyph="wrench" />
          </Button>
        </Tip>
      </div>
    </div>
  )
}

export default Controls
