function edges(state = [], action) {
  if (action.type === 'ADD_EDGE') {
    return [...state, action.payload]
  }

  if (action.type === 'EDIT_EDGE') {
    const nextState = state.slice()
    const edgeIndex = nextState.findIndex(edge => edge.id === action.payload.id)

    nextState[edgeIndex] = {
      ...nextState[edgeIndex],
      ...action.payload.id,
    }

    return nextState
  }

  return state
}

export default edges
