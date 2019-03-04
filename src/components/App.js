import React, { Component } from 'react'
import { connect } from 'react-redux'
import shortcut from 'piano-keys'

import './App.css'

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

    shortcut(canvas, 'n', this.handleNewNodeClick)
    shortcut(canvas, 'delete', this.handleDeleteClick)
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

    dispatch({
      type: 'SELECT_NODES',
      payload: [id],
    })

    window.canvas.focus()
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
    
    dispatch({
      type: 'SELECT_NODES',
      payload: [selectedNodes[0], selectedNodes[1]],
    })

    dispatch({
      type: 'SELECT_EDGES',
      payload: [id],
    })

    window.canvas.focus()
  }

  handleDeleteClick = () => {
    const { selectedNodes, selectedEdges, dispatch } = this.props

    dispatch({
      type: 'SELECT_NODES',
      payload: [],
    })

    dispatch({
      type: 'SELECT_EDGES',
      payload: [],
    })

    window.data.nodes.remove(selectedNodes)
    window.data.edges.remove(selectedEdges)

    dispatch({
      type: 'DELETE_NODES_AND_EDGES',
      payload: {
        nodes: selectedNodes,
        edges: selectedEdges,
      },
    })
  }

  render() {
    const { nodes, edges, selectedNodes, selectedEdges } = this.props

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
            <NodePanel key={nodeId} node={nodes.find(node => node.id === nodeId)} />
          ))}

          {selectedEdges.map(edgeId => (
            <EdgePanel key={edgeId} edge={edges.find(edge => edge.id === edgeId)} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  nodes: s.nodes,
  edges: s.edges,
  selectedEdges: s.selectedEdges,
  selectedNodes: s.selectedNodes,
})

export default connect(mapStateToProps)(App)
