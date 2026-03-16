import PropTypes from "prop-types"

import { GridBlockWrapper } from "./Base"

const Bookmarks = ({ size, block }) => {
  const { fontFamily } = block

  return (
    <div
      className="listing item-container"
      style={{ fontFamily: fontFamily }}
    >
      <p>
        Bookmarks go here. <span>{JSON.stringify(size)}</span>
      </p>
    </div>
  )
}

Bookmarks.propTypes = {
  size: PropTypes.object,
  block: PropTypes.object,
}

export default GridBlockWrapper(Bookmarks)
