import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'

import Actions from 'actions'

import Link from './Blocks/Link'
import Weather from './Blocks/Weather'
import Clock from './Blocks/Clock'
import Bookmarks from './Blocks/Bookmarks'
import Userscript from './Blocks/Userscript'
import log from '../utils/logger'

// lib
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'

// custom
import 'stylesheets/Grid.css'
import 'stylesheets/Blocks.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

// Dynamic Column Allocation

const STEP = 80
const COLS = {}
const BREAKPOINTS = {}
for (let i = 1; i < 16; i += 2) {
  const lbl = 'col_' + i
  COLS[lbl] = i
  BREAKPOINTS[lbl] = i * STEP
}

class BlocksGrid extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      layout: {},
      breakpoint: null,
      ready: false
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ready: true })
    }, 1000)
  }

  updateBlockItem(item) {
    const id = item.i

    this.props.dispatch(Actions.updateBlock(id, {
      coords: { ...item }
    }))
  }

  onLayoutChange(layout, layouts) {
    log("onLayoutChange", layout, layouts)
    this.props.dispatch(Actions.updateLayouts(layouts))
  }

  onBreakpointChange(breakpoint) {
    log('onBreakpointChange', breakpoint)
    this.props.dispatch(Actions.setBreakpoint(breakpoint))
  }

  selectView(block) {
    let blockView
    switch (block.type) {
      case 'clock':
        blockView = <Clock block={block} />
        break;
      case 'weather':
        blockView = <Weather block={block} />
        break;
      case 'bookmarks':
        blockView = <Bookmarks block={block} />
        break;
      case 'feed':
      case 'link':
        blockView = <Link block={block} />
        break;
      case 'userscript':
        blockView = <Userscript block={block} />
        break;
      default:
        blockView = <Link block={block} />
        break;
    }
    return blockView
  }

  renderBlocks() {
    return Object.entries(this.props.blocks).map((kv, idx) => {
      const id = kv[0],
            block = kv[1];
      return (
        <div key={id}>
          { this.selectView(block) }
        </div>
      )
    })
  }

  render() {
    const { editing } = this.props
    const className = 'grid-layout ' + (this.state.ready ? 'ready' : 'unready')

    return (
      <ResponsiveReactGridLayout
        className={className}

        autoSize={true}
        measureBeforeMount={true}
        isDraggable={editing}
        isResizable={editing}

        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}

        layouts={this.props.layouts}
        containerPadding={[0,0]}

        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}

        compactType={this.props.compacting ? "vertical" : null}
        rowHeight={80}>

        {this.renderBlocks()}
      </ResponsiveReactGridLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    blocks: state.blocks,
    layouts: state.layouts,
    editing: state.layout.editing,
    compacting: state.layout.compacting
  }
}

export default connect(mapStateToProps)(BlocksGrid)
