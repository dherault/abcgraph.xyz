export function createId() {
  return Math.random().toString().slice(2)
}

export function throttle(fn, delay) {
  let timeoutId
  
  return () => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(fn, delay)
  }
}
