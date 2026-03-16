import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import Button from "react-bootstrap/lib/Button"
import Glyphicon from "react-bootstrap/lib/Glyphicon"
import ButtonGroup from "react-bootstrap/lib/ButtonGroup"

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
      Color.hexIsLight(style().background) ? "bg-light" : "bg-dark"

    const borderClass = () =>
      block.show_border === "1" ? "bordered" : ""

    const editButtons = () => {
      if (!editing) return null

      return (
        <ButtonGroup className="item-controls">
          <Tip label="Edit">
            <Button
              bsSize="small"
              onClick={() => edit(block)}
              title="Edit"
            >
              <Glyphicon glyph="pencil" />
            </Button>
          </Tip>
          <Tip label="Freeze">
            <Button
              bsSize="small"
              bsStyle="info"
              onClick={() => freeze(block)}
              title="Edit"
              active={block.static}
            >
              <Glyphicon glyph="pushpin" />
            </Button>
          </Tip>
          <Tip label="Remove">
            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={() => destroy(block)}
              title="Remove"
            >
              <Glyphicon glyph="remove" />
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
