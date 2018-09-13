import request from 'axios'

export function getTx (branchId, txHash) {
  return request.get(`${API_HOST}/txs/${txHash}`)
}

export function getBlock (branchId, blockId) {
  return request.get(`${API_HOST}/blocks/${blockId}`)
}

export function getTxs (id) {
  return request.get(`${API_HOST}/txs`)
}

export function getLatestBlock () {
  return request.get(`${API_HOST}/blocks/latest`)
}

export function getBranches () {
  return request.get(`${API_HOST}/branches`)
}

export function getBlocks (id, offset, limit) {
  if (id === 'STEM') {
    if (offset) {
      return request.get(`${API_HOST}/blocks?offset=${offset}`);
    } else {
      return request.get(`${API_HOST}/blocks`);
    }

  }
  return new Promise(resolve => {
    resolve({data: require('./assets/sample/blocks')[id]})
  })
}

const API_HOST = '/api'
