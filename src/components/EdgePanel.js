import React, { Component } from 'react'
import { connect } from 'react-redux'

import './EdgePanel.css'

class EdgePanel extends Component {

  handleLabelChange = e => {
    const { edge, dispatch } = this.props

    dispatch({
      type: 'UPDATE_EDGE',
      payload: {
        ...edge,
        label: e.target.value || ' ',
      },
    })
  }

  render() {
    const { edge, nodes } = this.props

    if (!edge) return null

    const from = nodes.find(node => node.id === edge.from)
    const to = nodes.find(node => node.id === edge.to)
    const label = edge.label === ' ' ? '' : edge.label

    return (
      <div className="EdgePanel">
        <div>
          From: {from.label}
        </div>
        <div>
          To: {to.label}
        </div>
        <div>
          <textarea 
            className="EdgePanel-textarea"
            value={label} 
            onChange={this.handleLabelChange} 
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  nodes: s.nodes,
})

export default connect(mapStateToProps)(EdgePanel)
