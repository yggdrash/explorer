import request from 'axios'

// export function getStates (branchId) {
//   return request.get(`${API_HOST}/branches/${branchId}/states`)
// }

// export function getTx (branchId, txId) {
//   return request.get(`${API_HOST}/branches/${branchId}/txs/${txId}`)
// }

export async function getBlock (branchId, blockId) {
  let res = await request.get(`${API_HOST}/blocks/${blockId}`)
  let data = res.data
  return {
    blockId: data.blockId,
    signature: data.signature,
    chain: data.chain,
    index: data.index,
    merkleRoot: data.merkleRoot,
    prevBlockHash: data.prevBlockHash,
    timestamp: data.timestamp,
    type: data.type,
    version: data.version,
    bodyLength: data.bodyLength,
  }
}

export function getTxs (branchId) {
  console.log(branchId)
  return request.get(`${API_HOST}/txs`)
}

export async function getTxsByBlockId (blockId) {
  let res = await request.get(`${API_HOST}/blocks/${blockId}/txs`)
  let data = res.data
  
  let convertedData = data.map(d => {
      return {
        blockId: d.blockId,
        signature: d.signature,
        body: d.body,
        txId: d.txId,
        bodyHash: d.bodyHash,
        bodyLength: d.bodyLength,
        branchId: d.branchId,
        timestamp: d.timestamp,
        type: d.type,
        version: d.version,
        issuer: d.author,
      }
  })
  return convertedData
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
