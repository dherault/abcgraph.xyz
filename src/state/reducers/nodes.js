function nodes(state = [], action) {
  if (action.type === 'ADD_NODE') {
    return [...state, action.payload]
  }

  if (action.type === 'UPDATE_NODE') {
    const nextState = state.slice()
    const nodeIndex = nextState.findIndex(node => node.id === action.payload.id)

    nextState[nodeIndex] = {
      ...nextState[nodeIndex],
      ...action.payload,
    }

    return nextState
  }

  if (action.type === 'DELETE_NODES_AND_EDGES') {
    const nextState = state.slice()

    action.payload.nodes.forEach(nodeId => {
      const nodeIndex = nextState.findIndex(node => node.id === nodeId)

      nextState.splice(nodeIndex, 1)
    })

    return nextState
  }

  return state
}

export default nodes
