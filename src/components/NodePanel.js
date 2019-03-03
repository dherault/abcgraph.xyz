import React, { Component } from 'react'
// import { connect } from 'react-redux'

import './NodePanel.css'

class NodePanel extends Component {

  handleLabelChange = e => {
    const { nodeId } = this.props

    window.data.nodes.update({
      id: nodeId,
      label: e.target.value || ' ',
    })

    this.forceUpdate()
  }

  render() {
    const { nodeId } = this.props

    if (!nodeId) return null

    const node = window.data.nodes.get(nodeId)
    const label = node.label === ' ' ? '' : node.label

    return (
      <div className="NodePanel">
        <input type="text" value={label} onChange={this.handleLabelChange} />
      </div>
    )
  }
}

export default NodePanel
