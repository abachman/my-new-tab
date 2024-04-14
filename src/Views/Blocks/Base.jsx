import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
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
  class GBW extends React.Component {
    static propTypes = {
      block: PropTypes.object.isRequired,
    }

    constructor(...props) {
      super(...props)
      this.state = { data: null }
    }

    editButtons() {
      const { editing, edit, destroy, freeze, block } = this.props
      if (!editing) return null

      return (
        <ButtonGroup className="item-controls">
          <Tip label="Edit">
            <Button
              bsSize="small"
              onClick={() => {
                edit(block)
              }}
              title="Edit"
            >
              <Glyphicon glyph="pencil" />
            </Button>
          </Tip>
          <Tip label="Freeze">
            <Button
              bsSize="small"
              bsStyle="info"
              onClick={() => {
                freeze(block)
              }}
              title="Edit"
              active={this.props.block.static}
            >
              <Glyphicon glyph="pushpin" />
            </Button>
          </Tip>
          <Tip label="Remove">
            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={() => {
                destroy(block)
              }}
              title="Remove"
            >
              <Glyphicon glyph="remove" />
            </Button>
          </Tip>
        </ButtonGroup>
      )
    }

    componentDidMount() {
      this.setState({ data: "Hello" })
    }

    style() {
      const { background_color, transparent_background } = this.props.block

      let background = background_color

      if (transparent_background === "1" || !background) {
        background = "transparent"
      }

      return { background }
    }

    bgClass() {
      return Color.hexIsLight(this.style().background) ? "bg-light" : "bg-dark"
    }

    borderClass() {
      return this.props.block.show_border === "1" ? "bordered" : ""
    }

    render() {
      const className = `item block-item ${this.bgClass()} ${this.borderClass()} ${
        this.props.block.type
      }`
      return (
        <div className={className} style={this.style()}>
          {this.editButtons()}
          <DragLayer {...this.props} />
          <Subtype {...this.props} styles={this.style()} />
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    editing: state.layout.editing,
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    edit(block) {
      return dispatch(
        Actions.toggleBlockEditor({
          visible: true,
          form: Object.assign({}, block),
        })
      )
    },

    destroy(block) {
      return dispatch(Actions.destroyBlock(block))
    },

    freeze(block) {
      return dispatch(Actions.modifyBlockLayout(block, { static: true }))
    },
  })

  return connect(mapStateToProps, mapDispatchToProps)(sized(GBW))
}
