export function getBranches () {
  return require('./assets/sample/branches')
}

export function getBlocks (id) {
  console.log(`Loading... ${id} branch.`)
  return require('./assets/sample/blocks')[id]
}
