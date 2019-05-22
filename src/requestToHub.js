import request from 'axios'

// export function getStates (branchId) {
//   return request.get(`${API_HOST}/branches/${branchId}/states`)
// }

export function getTx (txId) {
  return request.get(`${API_HOST}/txs/${txId}`)
}

export function getTxsCount () {
    return request.get(`${API_HOST}/txs/count`)
}

export async function getBlock (branchId, blockId) {
  let res = await request.get(`${API_HOST}/blocks/${blockId}`)
  return res.data
  // return {
  //   index: data.index,
  //   branchId: data.branchId,
  //   blockId: data.blockId,
  //   prevBlockHash: data.prevBlockHash,
  //   signature: data.signature,
  //   merkleRoot: data.merkleRoot,
  //   timestamp: data.timestamp,
  //   bodyLength: data.bodyLength,
  // }
}

export function getTxs () {
  return request.get(`${API_HOST}/txs`)
}

export async function getTxsByBlockId (blockId) {
  let res = await request.get(`${API_HOST}/blocks/${blockId}/txs`)
  // let data = res.data
  //
  // let convertedData = data.map(d => {
  //     return {
  //       blockId: d.blockId,
  //       body: d.body,
  //       signature: d.signature,
  //       txId: d.txId,
  //       bodyHash: d.bodyHash,
  //       bodyLength: d.bodyLength,
  //       branchId: d.branchId,
  //       timestamp: d.timestamp,
  //       issuer: d.author,
  //     }
  // })
  // return convertedData
    return res.data
}

// export function getBranches () {
//   return request.get(`${API_HOST}/stem/states`)
// }

export function getBlocks (branchId, offset) {
  if (offset) {
    return request.get(`${API_HOST}/blocks?index=${offset}`);
  } else {
    return request.get(`${API_HOST}/blocks`);
  }
}

const API_HOST = '/hub'
