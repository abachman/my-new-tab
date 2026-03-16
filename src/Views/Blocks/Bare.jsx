import PropTypes from "prop-types"

import { GridBlockWrapper } from "./Base"

const Bare = ({ block }) => <div className="item-container" />

Bare.propTypes = {
  block: PropTypes.object.isRequired,
}

export default GridBlockWrapper(Bare)
