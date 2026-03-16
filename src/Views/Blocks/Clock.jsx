import { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { GridBlockWrapper } from "./Base"
import formatDate from "../../lib/formatDate"

import "../../stylesheets/Clock.css"

const Clock = ({ size, block }) => {
  const [time, setTime] = useState(new Date())
  const { fontFamily } = block

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 2000)
    return () => clearInterval(tick)
  }, [])

  const bigFont = { fontSize: Math.floor(size.width / 6) + "px" }
  const smallFont = { fontSize: Math.floor(size.width / 14) + "px" }

  return (
    <div className="item-container">
      <div className="clock-time" style={{ fontFamily }}>
        <div className="time" style={bigFont}>
          {formatDate(time, "h:mm TT")}
        </div>
        <div className="date" style={smallFont}>
          {formatDate(time, "dddd, d MMM yyyy")}
        </div>
      </div>
    </div>
  )
}

Clock.propTypes = {
  block: PropTypes.object.isRequired,
}

export default GridBlockWrapper(Clock)
