import request from 'axios'

export function getStates (branchId) {
  return request.get(`${API_HOST}/branches/${branchId}/states`)
}

export function getTx (branchId, txHash) {
  return request.get(`${API_HOST}/branches/${branchId}/txs/${txHash}`)
}

export function getBlock (branchId, blockId) {
  return request.get(`${API_HOST}/branches/${branchId}/blocks/${blockId}`)
}

export function getTxs (branchId) {
  return request.get(`${API_HOST}/branches/${branchId}/txs`)
}

export function getBranches () {
  return request.get(`${API_HOST}/stem/states`)
}

export function getBlocks (branchId, offset) {
  if (offset) {
    return request.get(`${API_HOST}/branches/${branchId}/blocks?offset=${offset}`);
  } else {
    return request.get(`${API_HOST}/branches/${branchId}/blocks`);
  }
}

const API_HOST = '/api'
