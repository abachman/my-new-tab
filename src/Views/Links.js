import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Responsive, WidthProvider, utils } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Actions from '../actions'
import Link from './Link'

// lib
import 'react-resizable/css/styles.css'
import 'react-grid-layout/css/styles.css'

// custom
import '../stylesheets/Grid.css'
import '../stylesheets/Links.css'


const BREAKPOINTS = {xl: 1800, lg: 1200, lmd: 1000, md: 800 , sm: 600 , xs: 400 , xxs: 0}
const COLS =        {xl: 9,    lg: 6   , lmd: 5   , md: 4   , sm: 6   , xs: 2   , xxs: 2}

// The GRID
class Links extends React.Component {
  static propTypes = {
    links: PropTypes.object.isRequired
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

  updateLinkItem(item) {
    const id = item.i

    this.props.dispatch(Actions.updateLink(id, {
      coords: { ...item }
    }))
  }

  onDragStop(layout, oldItem, newItem) {
    this.updateLinkItem(newItem)
  }

  onResizeStop(layout, oldItem, newItem) {
    this.updateLinkItem(newItem)
  }

  render() {
    const links = Object.entries(this.props.links).map((kv, idx) => {
      const id = kv[0],
            link = kv[1];

      let { coords } = link

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

      return (
        <div key={id} data-grid={coords}>
          <Link link={link} />
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
        rowHeight={100}>

        {links}

      </ResponsiveReactGridLayout>
    )

  }
}

const mapStateToProps = state => {
  return {
    links: state.links,
    editing: state.layout.editing
  }
}

export default connect(mapStateToProps)(Links)
