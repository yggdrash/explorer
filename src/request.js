import request from 'axios'
const API_HOST = "http://localhost:8080"

export function getTxs (id) {
  console.log('getTxs', id)
  return request.get(`${API_HOST}/txs`)
}

export function getLatestBlock () {
  return request.get(`${API_HOST}/blocks/latest`)
}

export function getBranches () {
  return request.get(`${API_HOST}/branches`)
}

export function getBlocks (id, offset, limit) {
  console.log('getBlocks', offset, limit)
  if (id === 'STEM') {
    return request.get(`${API_HOST}/blocks`);
  }
  return new Promise(resolve => {
    resolve(require('./assets/sample/blocks')[id])
  })
}
