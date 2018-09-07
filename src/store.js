import Vue from 'vue'
import Vuex from 'vuex'
// import request from 'axios'

import * as request from './request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: [],
    branches: [],
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
    }
  },
  actions: {
    getBlocks ({ commit }) {
      // request.get('http://localhost:8080/blocks').then(res => {
      //   console.log(res)
      //   commit('setBlocks', res.data)
      // })
      commit('setBlocks', request.getBlocks(this.state.currentBranch.id))
    },

    getBranches ({ commit }) {
      commit('setBranches', request.getBranches())
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
    }
  }
})
