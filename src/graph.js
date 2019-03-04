import vis from 'vis'
import store from './state/store'

function registerGraph(container) {

  const { nodes, edges } = store.getState()

  console.log('nodes', nodes)
  console.log('edges', edges)
  
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
    },
  }

  console.log('creating network')
  
  const network = new vis.Network(container, data, options)

  window.network = network
  window.data = data

  network.once('afterDrawing', () => {
    container.style.height = '100vh'
  })

  network.on('selectNode', event => {
    store.dispatch({
      type: 'SELECT_NODES',
      payload: event.nodes,
    })

    store.dispatch({
      type: 'SELECT_EDGES',
      payload: event.edges,
    })
  })

  network.on('deselectNode', event => {
    store.dispatch({
      type: 'SELECT_NODES',
      payload: event.nodes,
    })

    store.dispatch({
      type: 'SELECT_EDGES',
      payload: event.edges,
    })
  })
}

export default registerGraph
