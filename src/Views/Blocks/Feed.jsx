import { useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"

import Actions from "../../actions"
import { GridBlockWrapper } from "./Base"

const Feed = ({ size, block, styles }) => {
  const dispatch = useDispatch()
  const entries = useSelector((state) => state.feeds[block.id])
  const { label } = block

  useEffect(() => {
    dispatch(Actions.getFeed(block.id))
  }, [])

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

Feed.propTypes = {
  block: PropTypes.object.isRequired,
}

export default GridBlockWrapper(Feed)
