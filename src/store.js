import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: require("@/assets/sample/blocks.json")
  },
  mutations: {

  },
  actions: {

  }
})
