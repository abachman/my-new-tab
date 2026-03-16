import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Liquid } from "liquidjs"
import { useSelector, useDispatch } from "react-redux"

import { GridBlockWrapper } from "./Base"
import Actions from "actions"

const engine = new Liquid()

const Template = ({ block }) => {
  const dispatch = useDispatch()
  const cache = useSelector((state) =>
    state.block_cache && state.block_cache[block.id]
      ? state.block_cache[block.id]
      : null
  )
  const [html, setHtml] = useState("")

  const useCache = () => {
    const timeout = block.cache_timeout
    if (!timeout) return false
    if (!cache) return false
    const last_update_at = cache.at
    if (!last_update_at) return false
    const now = new Date().getTime()
    const update_after = parseInt(last_update_at, 10) + parseInt(timeout, 10)
    return now < update_after
  }

  useEffect(() => {
    if (useCache()) {
      setHtml(cache.html)
      return
    }

    const getData = block.url
      ? fetch(block.url)
      : Promise.resolve({ json: () => Promise.resolve({}) })

    getData
      .then((data) => data.json())
      .then((json) => {
        if (JSON.stringify(json)[0] !== "{") {
          json = { data: json }
        }

        engine.parseAndRender(block.template, json).then((rendered) => {
          setHtml(rendered)
          dispatch(Actions.cacheUserscript(block, rendered, json))
        })
      })
  }, [block])

  return (
    <div
      className="template-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

Template.propTypes = {
  block: PropTypes.object.isRequired,
}

export default GridBlockWrapper(Template)
