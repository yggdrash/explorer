export function getBranches () {
  return require('./assets/sample/branches')
}

export function getBlocks (id) {
  if (id === 'STEM') {
    return require('./assets/sample/stem-blocks')
  }
  return require('./assets/sample/blocks')[id]
}
