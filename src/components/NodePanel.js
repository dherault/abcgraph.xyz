import React, { Component } from 'react'
import { connect } from 'react-redux'

import './NodePanel.css'

class NodePanel extends Component {

  handleLabelChange = e => {
    const { node, dispatch } = this.props

    dispatch({
      type: 'UPDATE_NODE',
      payload: {
        ...node,
        label: e.target.value || ' ',
      },
    })
  }

  render() {
    const { node } = this.props

    if (!node) return null

    const label = node.label === ' ' ? '' : node.label

    return (
      <div className="NodePanel">
        <input type="text" value={label} onChange={this.handleLabelChange} />
      </div>
    )
  }
}

export default connect()(NodePanel)
