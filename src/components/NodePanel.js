import React, { Component } from 'react'
import { connect } from 'react-redux'

import './NodePanel.css'

class NodePanel extends Component {

  handleLabelChange = e => {
    const { node, dispatch } = this.props

    console.log('node', node)
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
        <textarea 
          className="NodePanel-textarea" 
          value={label} 
          onChange={this.handleLabelChange} 
        />
      </div>
    )
  }
}

export default connect()(NodePanel)
