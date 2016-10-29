import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Responsive, WidthProvider, utils } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Actions from '../actions'

import Link from './Blocks/Link'
import Weather from './Blocks/Weather'
import Clock from './Blocks/Clock'
import Bookmarks from './Blocks/Bookmarks'

// lib
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'

// custom
import '../stylesheets/Grid.css'
import '../stylesheets/Blocks.css'


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
      ready: false
    }
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

  onDragStop(layout, oldItem, newItem) {
    this.updateBlockItem(newItem)
  }

  onResizeStop(layout, oldItem, newItem) {
    this.updateBlockItem(newItem)
  }

  render() {
    const blocks = Object.entries(this.props.blocks).map((kv, idx) => {
      const id = kv[0],
            block = kv[1];

      let { coords } = block

      if (typeof coords === 'undefined') {
        coords = {
          x: null,
          y: null,
          w: 1,
          h: 2
        }
      }

      // modify coords if this is a new item
      if (coords.x === null) {
        coords.x = 0

        if (this.state.layout) {
          coords.y = utils.bottom(this.state.layout)
        } else {
          coords.y = Infinity
        }
      }

      let blockView = null
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
        default:
          blockView = <Link block={block} />
          break;
      }

      return (
        <div key={id} data-grid={coords}>
          { blockView }
        </div>
      )
    })

    const { editing } = this.props

    const className = 'grid-layout ' + (this.state.ready ? 'ready' : 'unready')

    return (
      <ResponsiveReactGridLayout
        className={className}
        measureBeforeMount={true}
        isDraggable={editing}
        isResizable={editing}

        // element changes
        onDragStop={this.onDragStop.bind(this)}
        onResizeStop={this.onResizeStop.bind(this)}

        breakpoints={BREAKPOINTS}
        cols={COLS}
        containerPadding={[0,0]}

        verticalCompact={true}
        rowHeight={STEP / 2}>

        {blocks}

      </ResponsiveReactGridLayout>
    )

  }
}

const mapStateToProps = state => {
  return {
    blocks: state.blocks,
    editing: state.layout.editing
  }
}

export default connect(mapStateToProps)(BlocksGrid)
