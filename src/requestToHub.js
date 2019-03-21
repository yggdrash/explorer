import request from 'axios'

// export function getStates (branchId) {
//   return request.get(`${API_HOST}/branches/${branchId}/states`)
// }

// export function getTx (branchId, txId) {
//   return request.get(`${API_HOST}/branches/${branchId}/txs/${txId}`)
// }

export async function getBlock (branchId, blockId) {
  let res = await request.get(`${API_HOST}/blocks/${blockId}`)
  // let txRes = await request.get(`${API_HOST}/blocks/${blockId}`)
  console.log(res)
  let data = res.data
  return {
    blockId: data.blockId,
    signature: data.signature,
    chain: data.header.chain,
    index: data.header.index,
    merkleRoot: data.header.merkleRoot,
    prevBlockHash: data.header.prevBlockHash,
    timestamp: data.header.timestamp,
    type: data.header.type,
    version: data.header.version
  }
}

export function getTxs (branchId) {
  return request.get(`${API_HOST}/txs`)
}

// export function getBranches () {
//   return request.get(`${API_HOST}/stem/states`)
// }

export function getBlocks (branchId, offset) {
  if (offset) {
    return request.get(`${API_HOST}/blocks?from=${offset}`);
  } else {
    return request.get(`${API_HOST}/blocks`);
  }
}

const API_HOST = '/hub'
