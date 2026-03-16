import React from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

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
