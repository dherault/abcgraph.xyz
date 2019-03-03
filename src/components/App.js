import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortcut from 'piano-keys'

import './App.css'

import registerGraph from '../graph'
import EdgePanel from './EdgePanel'
import NodePanel from './NodePanel'

class App extends Component {

  componentDidMount() {
    const container = document.getElementById('container')

    registerGraph(container)

    shortcut(document.documentElement, 'n', this.handleNewNodeClick)
  }

  handleNewNodeClick = () => {
    const { dispatch } = this.props

    const nodeIds = window.data.nodes.add({ label: `Node ${window.data.nodes.length + 1}` })

    window.network.selectNodes(nodeIds)

    dispatch({
      type: 'SELECT_NODES',
      payload: nodeIds,
    })
  }

  handleNewEdgeClick = () => {
    const { selectedNodes, dispatch } = this.props

    const edgeIds = window.data.edges.add({ from: selectedNodes[0], to: selectedNodes[1] })

    window.network.selectEdges(edgeIds)

    dispatch({
      type: 'SELECT_EDGES',
      payload: edgeIds,
    })
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
