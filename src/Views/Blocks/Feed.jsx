import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Actions from "../../actions"
import { GridBlockWrapper } from "./Base"
import Color from "../../lib/Color"

class Feed extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetch()
  }

  render() {
    const { size, block, styles } = this.props
    const { label } = block

    return (
      <a className="block-block" href={url}>
        <div className="item-container">
          <LinkImage
            imageData={image}
            block={block}
            width={size.width}
            height={size.height}
          />
          {hide_label === "1" ? "" : labelTag}
        </div>
      </a>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entries: state.feeds[ownProps.block.id],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: () => dispatch(Actions.getFeed(ownProps.block.id)),
  }
}

export default GridBlockWrapper(Feed)
