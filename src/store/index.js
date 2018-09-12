import Vue from 'vue'
import Vuex from 'vuex'

import * as request from '../request'
import * as mTypes from './mutation-types'
import * as aTypes from './action-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    txs: [],
    blocks: [],
    latestBlock: {},
    branches: [],
    currentBranch: { name: 'STEM', id: 'STEM'}
  },

  mutations: {
    [mTypes.SET_BLOCKS] (state, payload) {
      state.blocks = payload
    },

    [mTypes.SET_BRANCHES] (state, payload) {
      state.branches = payload
    },

    [mTypes.SET_CURRENT_BRANCHE] (state, payload) {
      state.currentBranch = payload
    },

    [mTypes.SET_LATEST_BLOCK] (state, payload) {
      state.latestBlock = payload
    },

    [mTypes.SET_TXS] (state, payload) {
      state.txs = payload;
    },

    [mTypes.ADD_BLOCK] (state, payload) {
      state.blocks.unshift(payload)
    }
  },

  actions: {
    async [aTypes.LOAD_TXS] ({ commit, state }) {
      const res = await request.getTxs(state.currentBranch.id)
      let payload = res.data
      commit(mTypes.SET_TXS, payload)
    },

    async [aTypes.LOAD_BLOCKS] ({ commit, state }) {
      const res = await request.getBlocks(state.currentBranch.id)
      let payload = res.data
      if (payload) {
        commit(mTypes.SET_BLOCKS, payload)
        commit(mTypes.SET_LATEST_BLOCK, payload[0])
      } else {
        commit(mTypes.SET_BLOCKS, [])
        commit(mTypes.SET_LATEST_BLOCK, {})
      }
    },

    async [aTypes.LOAD_BRANCHES] ({ commit }) {
      const res = await request.getBranches()
      let payload = res.data.map(d => {
        return JSON.parse(d)
      })
      commit(mTypes.SET_BRANCHES, payload)
    },
  },

  getters: {
    isStem(state) {
      return state.currentBranch.name === 'STEM'
    },

    linkBase(state, getters) {
      return getters.isStem ? '/stem' : `/branches/${state.currentBranch.id}`
    },

    countOfBranches(state) {
      return Object.keys(state.branches).length
    }
  }
})
