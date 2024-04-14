import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Actions from "../../actions"
import { GridBlockWrapper } from "./Base"

import "../../stylesheets/Weather.css"

class Weather extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    weather: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetch()
  }

  render() {
    const { weather, block } = this.props

    if (weather && weather.item) {
      return (
        <div className="item-container">
          <div className="top-right">
            <div className="weather-title">{block.location}</div>
            <div className="weather-date">{weather.item.forecast.date}</div>
          </div>

          <table className="temperatures">
            <tbody>
              <tr>
                <td rowSpan="2">
                  <div className="current-temp">
                    {weather.item.condition.temp}
                  </div>
                </td>
                <td>
                  <div>
                    &#x25b2;{" "}
                    <span className="high-temp">
                      {weather.item.forecast.high}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    &#x25bc;{" "}
                    <span className="low-temp">
                      {weather.item.forecast.low}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="bottom-left">
            <div className="conditions">{weather.item.forecast.text}</div>
            <div className="sunset">
              Sunset at{" "}
              <span className="sunset-text">{weather.astronomy.sunset}</span>
            </div>
          </div>

          <a
            href="https://www.yahoo.com/?ilc=401"
            target="_blank"
            rel="noopener noreferrer"
            className="weather-logo"
          >
            <img
              src="https://poweredby.yahoo.com/purple.png"
              width="134"
              height="29"
              alt="powered by Yahoo"
            />
          </a>
        </div>
      )
    } else {
      return (
        <div className="item-container">
          <div className="weather-title">{block.location}</div>
          <div className="weather-date">Loading...</div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    weather: state.weathers[ownProps.block.id],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: () => {
      dispatch(Actions.getWeather(ownProps.block))
    },
  }
}

export default GridBlockWrapper(
  connect(mapStateToProps, mapDispatchToProps)(Weather)
)
