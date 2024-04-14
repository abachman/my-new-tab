import React from "react"
import PropTypes from "prop-types"

import { GridBlockWrapper } from "./Base"

class Bare extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
  }

  render() {
    return <div className="item-container" />
  }
}

export default GridBlockWrapper(Bare)
