import Vue from 'vue'
import Vuex from 'vuex'

import * as request from './request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    txs: [],
    blocks: [],
    latestBlock: {},
    branches: {},
    currentBranch: { name: 'STEM', id: 'STEM'}
  },
  mutations: {
    setBlocks (state, payload) {
      state.blocks = payload
    },
    setBranches (state, payload) {
      state.branches = payload
    },

    setCurrentBranch(state, payload) {
      state.currentBranch = payload
    },

    setLatestBlock(state, payload) {
      state.latestBlock = payload
    },

    setTxs(state, payload) {
      state.txs = payload;
    },
  },
  actions: {
    async getTxs ({ commit }) {
      const res = await request.getTxs(this.state.currentBranch.id)
      let payload = res.data
      commit('setTxs', payload)
    },

    async getBlocks ({ commit }) {
      const res = await request.getBlocks(this.state.currentBranch.id)
      let payload = res.data
      if (!payload) payload = []
      commit('setBlocks', payload)
    },

    async getLatestBlock ({ commit }) {
      const res = await request.getLatestBlock()
      let payload = res.data
      commit('setLatestBlock', payload)
    },

    async getBranches ({ commit }) {
      const res = await request.getBranches()
      let payload = res.data.map(d => {
        return JSON.parse(d)
      })
      commit('setBranches', payload)
    },

    changeBranch ({ commit }, item) {
      commit('setCurrentBranch', item)
    }
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
