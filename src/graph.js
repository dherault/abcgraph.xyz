import vis from 'vis'
import store from './state/store'

function registerGraph(container) {

  const { nodes, edges, selectedNodes, selectedEdges } = store.getState()

  // create a network
  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  }

  const options = {
    interaction: {
      multiselect: true,
    },
    nodes: {
      color: {
        border: '#ebebeb',
        background: 'white',
        highlight: {
          border: '#2B7CE9',
          background: '#D2E5FF',
        },
      },
      shape: 'circle',
    },
    edges: {
      color: {
        color: '#ebebeb',
        highlight: '#2B7CE9',
      },
      hoverWidth: 0.2,
      selectionWidth: 0.2,
    },
  }

  console.log('creating network')
  
  const network = new vis.Network(container, data, options)

  network.setSelection({
    nodes: selectedNodes,
    edges: selectedEdges,
  })

  store.subscribe(() => {
    const { nodes, edges, selectedNodes, selectedEdges } = store.getState()
    
    data.nodes.update(nodes)
    data.edges.update(edges)
    network.setSelection({
      nodes: selectedNodes,
      edges: selectedEdges,
    })
  })

  window.canvas = container.firstChild.firstChild
  window.network = network
  window.data = data

  network.once('afterDrawing', () => {
    container.style.height = '100vh'
  })

  const selectEventHandler = event => {
    store.dispatch({
      type: 'SELECT_NODES',
      payload: event.nodes,
    })

    store.dispatch({
      type: 'SELECT_EDGES',
      payload: event.edges,
    })
  }

  network.on('selectNode', selectEventHandler)
  network.on('selectEdge', selectEventHandler)
  network.on('deselectNode', selectEventHandler)
  network.on('deselectEdge', selectEventHandler)
  network.on('click', () => window.canvas.focus())
}

export default registerGraph
