function selectedEdges(state = [], action) {
  if (action.type === 'SELECT_EDGES') {
    return action.payload
  }

  return state
}

export default selectedEdges
