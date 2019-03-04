import React, { Component } from 'react'
import { connect } from 'react-redux'
import vis from 'vis'
import shortcut from 'piano-keys'

import './App.css'

import store from '../state/store'
import registerGraph from '../graph'
import { createId } from '../utils'

import EdgePanel from './EdgePanel'
import NodePanel from './NodePanel'

class App extends Component {

  componentDidMount() {
    const container = document.getElementById('container')
    
    registerGraph(container)

    const canvas = container.firstChild.firstChild

    canvas.tabIndex = 0
    canvas.focus()

    store.subscribe(() => {
      const { nodes, edges } = store.getState()

      window.data.nodes.update(nodes)
      window.data.edges.update(edges)
    })

    shortcut(canvas, 'n', this.handleNewNodeClick)
  }

  handleNewNodeClick = () => {
    const { dispatch } = this.props

    const id = createId()

    dispatch({
      type: 'ADD_NODE',
      payload: { 
        id,
        label: `Node ${window.data.nodes.length + 1}`,
      },
    })

    window.network.selectNodes([id])
  }

  handleNewEdgeClick = () => {
    const { selectedNodes, dispatch } = this.props
    const id = createId()

    dispatch({
      type: 'ADD_EDGE',
      payload: { 
        id,
        from: selectedNodes[0], 
        to: selectedNodes[1],
      },
    })
    
    // window.network.selectEdges(id)
  }

  render() {
    const { selectedNodes, selectedEdges } = this.props

    return (
      <div className="App relative">
        <div id="container" className="App-container" />

        <div className="App-side y9">
          <div className="x4">
            <button type="button" className="App-button x5" onClick={this.handleNewNodeClick}>
              New node
            </button>

            {selectedNodes.length === 2 && (
              <button type="button" className="App-button x5" onClick={this.handleNewEdgeClick}>
                New edge
              </button>
            )}
          </div>

          {selectedNodes.map(nodeId => (
            <NodePanel key={nodeId} nodeId={nodeId} />
          ))}

          {selectedEdges.map(edgeId => (
            <EdgePanel key={edgeId} edgeId={edgeId} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  selectedEdges: s.selectedEdges,
  selectedNodes: s.selectedNodes,
})

export default connect(mapStateToProps)(App)
