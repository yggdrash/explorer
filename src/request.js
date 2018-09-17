import request from 'axios'

const STEM_ID = 'fe7b7c93dd23f78e12ad42650595bc0f874c88f7'
const YEED_ID = 'a08ee962cd8b2bd0edbfee989c1a9f7884d26532'

export function getStates (branchId) {
  branchId = changeBranchId(branchId)
  return request.get(`${API_HOST}/branches/${branchId}/states`)
}

export function getTx (branchId, txHash) {
  branchId = changeBranchId(branchId)
  return request.get(`${API_HOST}/branches/${branchId}/txs/${txHash}`)
}

export function getBlock (branchId, blockId) {
  branchId = changeBranchId(branchId)
  return request.get(`${API_HOST}/branches/${branchId}/blocks/${blockId}`)
}

export function getTxs (branchId) {
  branchId = changeBranchId(branchId)
  return request.get(`${API_HOST}/branches/${branchId}/txs`)
}

export function getBranches () {
  return request.get(`${API_HOST}/stem/branches`)
}

export function getBlocks (branchId, offset, limit) {
  branchId = changeBranchId(branchId)
  if (offset) {
    return request.get(`${API_HOST}/branches/${branchId}/blocks?offset=${offset}`);
  } else {
    return request.get(`${API_HOST}/branches/${branchId}/blocks`);
  }
}

function changeBranchId (branchId) {
  if(branchId !== STEM_ID && branchId !== YEED_ID) {
    return YEED_ID
  }

  return branchId
}
const API_HOST = '/api'
