import React, { Component } from 'react'
import { connect } from 'react-redux'

import './EdgePanel.css'

class EdgePanel extends Component {

  render() {
    const { edge, nodes } = this.props

    if (!edge) return null

    const from = nodes.find(node => node.id === edge.from)
    const to = nodes.find(node => node.id === edge.to)

    return (
      <div className="EdgePanel">
        <div>
          From: {from.label}
        </div>
        <div>
          To: {to.label}
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  nodes: s.nodes,
})

export default connect(mapStateToProps)(EdgePanel)
