import { useRef, useEffect } from "react"
import PropTypes from "prop-types"

import { setImageOnCanvas } from "../../lib/images"
import { GridBlockWrapper } from "./Base"

const LinkImage = ({ imageData, size }) => {
  const canvasRef = useRef(null)
  const { width, height } = size
  const style = { width: width + "px", height: height + "px" }

  useEffect(() => {
    if (canvasRef.current) {
      setImageOnCanvas(canvasRef.current, imageData)
    }
  }, [imageData, width, height])

  return (
    <canvas
      ref={canvasRef}
      className="item-image"
      width={width}
      height={height}
      style={style}
    ></canvas>
  )
}

const Link = ({ size, block }) => {
  const { label, url, image_upload, hide_label } = block

  const labelTag =
    hide_label !== "1" ? <span className="item-label">{label}</span> : null

  const imageTag = image_upload ? (
    <LinkImage imageData={image_upload} block={block} size={size} />
  ) : null

  return (
    <a className="link-link" href={url}>
      <div className="item-container">
        {imageTag}
        {labelTag}
      </div>
    </a>
  )
}

Link.propTypes = {
  block: PropTypes.object.isRequired,
}

export default GridBlockWrapper(Link)
