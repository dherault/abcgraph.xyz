import React, { Component } from 'react'
// import { connect } from 'react-redux'

import './EdgePanel.css'

class EdgePanel extends Component {

  render() {
    const { edgeId } = this.props

    if (!edgeId) return null

    const edge = window.data.edges.get(edgeId)
    const from = window.data.nodes.get(edge.from)
    const to = window.data.nodes.get(edge.to)

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

export default EdgePanel
