function selectedNodes(state = [], action) {
  if (action.type === 'SELECT_NODES') {
    return action.payload
  }

  return state
}

export default selectedNodes
