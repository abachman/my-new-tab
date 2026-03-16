import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { Button, ButtonGroup } from "react-bootstrap"

import Color from "lib/Color"
import Actions from "actions"
import sized from "components/sized"
import Tip from "components/Tip"

const DragLayer = ({ editing }) => {
  if (!editing) return null
  else return <div key="drag" className="drag-layer" />
}

export const GridBlockWrapper = (Subtype) => {
  const GBW = (props) => {
    const dispatch = useDispatch()
    const editing = useSelector((state) => state.layout.editing)
    const { block } = props

    const edit = (b) =>
      dispatch(
        Actions.toggleBlockEditor({
          visible: true,
          form: Object.assign({}, b),
        })
      )

    const destroy = (b) => dispatch(Actions.destroyBlock(b))

    const freeze = (b) =>
      dispatch(Actions.modifyBlockLayout(b, { static: true }))

    const style = () => {
      const { background_color, transparent_background } = block
      let background = background_color
      if (transparent_background === "1" || !background) {
        background = "transparent"
      }
      return { background }
    }

    const bgClass = () =>
      Color.hexIsLight(style().background) ? "bg-is-light" : "bg-is-dark"

    const borderClass = () => (block.show_border === "1" ? "bordered" : "")

    const editButtons = () => {
      if (!editing) return null

      return (
        <ButtonGroup className="item-controls">
          <Tip label="Edit">
            <Button size="sm" onClick={() => edit(block)} title="Edit">
              <i className="bi bi-pencil" />
            </Button>
          </Tip>
          <Tip label="Freeze">
            <Button
              size="sm"
              variant="info"
              onClick={() => freeze(block)}
              title="Edit"
              active={block.static}
            >
              <i className="bi bi-pin-angle" />
            </Button>
          </Tip>
          <Tip label="Remove">
            <Button
              size="sm"
              variant="danger"
              onClick={() => destroy(block)}
              title="Remove"
            >
              <i className="bi bi-x" />
            </Button>
          </Tip>
        </ButtonGroup>
      )
    }

    const blockStyle = style()
    const className = `item block-item ${bgClass()} ${borderClass()} ${block.type}`

    return (
      <div className={className} style={blockStyle}>
        {editButtons()}
        <DragLayer editing={editing} />
        <Subtype {...props} editing={editing} styles={blockStyle} />
      </div>
    )
  }

  GBW.propTypes = {
    block: PropTypes.object.isRequired,
  }

  return sized(GBW)
}
