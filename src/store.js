import Vue from 'vue'
import Vuex from 'vuex'
// import request from 'axios'

import * as request from './request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: [],
    branches: [],
    currentBranch: {}
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
    }
  },
  actions: {
    getBlocks ({ commit }) {
      // request.get('http://localhost:8080/blocks').then(res => {
      //   console.log(res)
      //   commit('setBlocks', res.data)
      // })
      commit('setBlocks', request.getBlocks())
    },

    getBranches ({ commit }) {
      commit('setBranches', request.getBranches())
    },

    changeBranch ({ commit }, item) {
      commit('setCurrentBranch', item)
    }
  }
})
