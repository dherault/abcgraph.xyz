function edges(state = [], action) {
  if (action.type === 'ADD_EDGE') {
    return [...state, action.payload]
  }

  if (action.type === 'UPDATE_EDGE') {
    const nextState = state.slice()
    const edgeIndex = nextState.findIndex(edge => edge.id === action.payload.id)

    nextState[edgeIndex] = {
      ...nextState[edgeIndex],
      ...action.payload,
    }

    return nextState
  }

  if (action.type === 'DELETE_NODES_AND_EDGES') {
    const nextState = state.slice()

    action.payload.edges.forEach(edgeId => {
      const edgeIndex = nextState.findIndex(edge => edge.id === edgeId)

      nextState.splice(edgeIndex, 1)
    })

    return nextState
  }

  return state
}

export default edges
