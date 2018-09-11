import request from 'axios'
console.log('API_HOST', process.env.VUE_APP_API_HOST)
const API_HOST = process.env.VUE_APP_API_HOST

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
