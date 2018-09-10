import request from 'axios'
const API_HOST = "http://localhost:8080"

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
    return request.get(`${API_HOST}/blocks`);
  }
  return new Promise(resolve => {
    resolve({data: require('./assets/sample/blocks')[id]})
  })
}
