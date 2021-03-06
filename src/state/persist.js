// Loads the state from localStorage
export function loadState() {
  try {
    const serializedState = localStorage.getItem('state-abcgraph')
    if (serializedState) return JSON.parse(serializedState)
  }
  catch (error) {
    console.error(error)
  }
}

// Saves the state into localStorage
export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state-abcgraph', serializedState)
  }
  catch (error) {
    console.error(error)
  }
}

// A utility to call from the browser's console when everything seems to fall apart
window.reset = () => {
  localStorage.removeItem('state-abcgraph')
  window.location = '/'
}
