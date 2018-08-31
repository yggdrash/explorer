import Vue from 'vue'
import Vuex from 'vuex'
import request from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: []
  },
  mutations: {
    setBlocks (state, payload) {
      state.blocks = payload
    }
  },
  actions: {
    getBlocks ({ commit }) {
      request.get('http://localhost:8080/blocks').then(res => {
        console.log(res)
        commit('setBlocks', res.data)
      })
    }
  }
})
