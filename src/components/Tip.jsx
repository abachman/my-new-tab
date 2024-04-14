import React from "react"
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger"
import Tooltip from "react-bootstrap/lib/Tooltip"

let count = 0

export default ({ children, label }) => {
  const id = `control-${label.toLowerCase().replace(/[^a-z]/gi, "-")}-${count++}`

  const tip = <Tooltip id={id}>{label}</Tooltip>
  return (
    <OverlayTrigger placement="bottom" overlay={tip}>
      {children}
    </OverlayTrigger>
  )
}
