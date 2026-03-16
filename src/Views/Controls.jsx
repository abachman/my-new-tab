import { useSelector, useDispatch } from "react-redux"
import { Dropdown, Button } from "react-bootstrap"

import Tip from "../components/Tip"
import Actions from "../actions"
import { useColorScheme } from "hooks/useColorScheme"

const CreateMenu = ({ onCreate }) => {
  return (
    <Dropdown id="add-block-menu">
      <Dropdown.Toggle variant="success" data-testid="add-block">
        <i className="bi bi-plus" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onCreate("link")}>Link</Dropdown.Item>
        <Dropdown.Item onClick={() => onCreate("weather")}>
          Weather
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onCreate("clock")}>Clock</Dropdown.Item>
        <Dropdown.Item onClick={() => onCreate("template")}>
          Template
        </Dropdown.Item>
        {/* <Dropdown.Item onClick={() => onCreate('bookmarks')}>Bookmarks</Dropdown.Item> */}
        {/* <Dropdown.Item onClick={() => onCreate('feed')}>News Feed</Dropdown.Item> */}
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
          variant={compacting ? "info" : "secondary"}
          title="Compact"
          active={compacting}
        >
          <i className="bi bi-eject" />
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
            variant="info"
            title="Edit"
            active={editing}
          >
            <i className="bi bi-pencil" />
          </Button>
        </Tip>

        {compactingButton()}

        <Tip label="Edit settings">
          <Button onClick={editSettings} variant="secondary" title="Settings">
            <i className="bi bi-wrench" />
          </Button>
        </Tip>
      </div>
    </div>
  )
}

export default Controls
