import request from 'axios'
const API_HOST = '/api'
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
