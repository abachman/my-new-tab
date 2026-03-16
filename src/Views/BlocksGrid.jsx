import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { Responsive, WidthProvider } from "react-grid-layout"

import Actions from "actions"

import Link from "./Blocks/Link"
import Weather from "./Blocks/Weather"
import Clock from "./Blocks/Clock"
import Bookmarks from "./Blocks/Bookmarks"
import Template from "./Blocks/Template"
import Bare from "./Blocks/Bare"
import log from "../utils/logger"

// lib
import "react-resizable/css/styles.css"
import "react-grid-layout/css/styles.css"

// custom
import "stylesheets/Grid.css"
import "stylesheets/Blocks.css"

const ResponsiveReactGridLayout = WidthProvider(Responsive)

// Dynamic Column Allocation
const STEP = 80
const COLS = {}
const BREAKPOINTS = {}
for (let i = 1; i < 16; i += 2) {
  const lbl = "col_" + i
  COLS[lbl] = i
  BREAKPOINTS[lbl] = i * STEP
}

const BlocksGrid = () => {
  const dispatch = useDispatch()
  const blocks = useSelector((state) => state.blocks)
  const layouts = useSelector((state) => state.layouts)
  const editing = useSelector((state) => state.layout.editing)
  const compacting = useSelector((state) => state.layout.compacting)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const onLayoutChange = (layout, layoutsMap) => {
    log("onLayoutChange", layout, layoutsMap)
    dispatch(Actions.updateLayouts(layoutsMap))
  }

  const onBreakpointChange = (breakpoint) => {
    log("onBreakpointChange", breakpoint)
    dispatch(Actions.setBreakpoint(breakpoint))
  }

  const selectView = (block) => {
    switch (block.type) {
      case "clock":
        return <Clock block={block} />
      case "weather":
        return <Weather block={block} />
      case "bookmarks":
        return <Bookmarks block={block} />
      case "feed":
      case "link":
        return <Link block={block} />
      case "userscript":
        return <Bare block={block} />
      case "template":
        return <Template block={block} />
      default:
        return <Link block={block} />
    }
  }

  const renderBlocks = () =>
    Object.entries(blocks).map((kv) => {
      const id = kv[0],
        block = kv[1]
      return <div key={id}>{selectView(block)}</div>
    })

  const className = "grid-layout " + (ready ? "ready" : "unready")

  return (
    <ResponsiveReactGridLayout
      className={className}
      autoSize={true}
      measureBeforeMount={true}
      isDraggable={editing}
      isResizable={editing}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      layouts={layouts}
      containerPadding={[0, 0]}
      onLayoutChange={onLayoutChange}
      onBreakpointChange={onBreakpointChange}
      compactType={compacting ? "vertical" : null}
      rowHeight={80}
    >
      {renderBlocks()}
    </ResponsiveReactGridLayout>
  )
}

BlocksGrid.propTypes = {
  blocks: PropTypes.object,
}

export default BlocksGrid
