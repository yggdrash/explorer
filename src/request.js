export function getBranches () {
  return require('./assets/sample/branches')
}

export function getBlocks (id) {
  return require('./assets/sample/blocks')[id]
}
