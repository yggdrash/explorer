import Vue from 'vue'
import Vuex from 'vuex'

import * as request from '../request'
import * as mTypes from './mutation-types'
import * as aTypes from './action-types'

import createWsPlugin from './plugin/createWebSocketPlugin'
const wsPlugin = createWsPlugin("/api/yggdrash-websocket")

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statesOfBranch: [],
    selectedTx: {},
    txs: [],
    selectedBlock: {},
    blocks: [],
    latestBlock: {},
    branches: [],
    branchesObject: {},
    currentBranch: { name: 'STEM', id: 'STEM'},
    isConnected: false,
  },

  mutations: {
    [mTypes.SET_STATES] (state, payload) {
      state.statesOfBranch = payload
    },

    [mTypes.SET_BLOCKS] (state, payload) {
      state.blocks = payload
    },

    [mTypes.SET_BRANCHES] (state, payload) {
      state.branches = payload.array
      state.branchesObject = payload.obj
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

    [mTypes.ADD_TX] (state, payload) {
      state.txs.unshift(payload)
    },

    [mTypes.ADD_BLOCK] (state, payload) {
      state.blocks.unshift(payload)
      state.latestBlock = payload
    },

    [mTypes.SET_IS_CONNECTED] (state, payload) {
      state.isConnected = payload
    },

    [mTypes.SELECT_BLOCK] (state, payload) {
      state.selectedBlock = payload
    },

    [mTypes.SELECT_TX] (state, payload) {
      state.selectedTx = payload
    }
  },

  actions: {
    async [aTypes.LOAD_STATES] ({ commit, state }) {
      const res = await request.getStates(state.currentBranch.id)
      let payload = res.data.map(d => {
        return JSON.parse(d)
      })
      commit(mTypes.SET_STATES, payload)
    },

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

    async [aTypes.LOAD_MORE_BLOCKS] ({ commit, state }, offset) {
      const res = await request.getBlocks(state.currentBranch.id, offset, 30)
      let payload = res.data
      commit(mTypes.SET_BLOCKS, [...state.blocks, ...payload])
    },

    async [aTypes.LOAD_BRANCHES] ({ commit }) {
      const res = await request.getBranches()
      let array = res.data.map(d => {
        return JSON.parse(d)
      })
      let obj = {}
      array.forEach(item => {
        obj[item.id] = item
      })
      commit(mTypes.SET_BRANCHES, { array, obj })
    },

    async [aTypes.LOAD_BLOCK] ({ commit, state }, id) {
      let foundBlock
      if(state.blocks) {
        foundBlock = await state.blocks.find(b => {
          return Number(id) === b.index || id === b.hash
        })
      }

      if(foundBlock) {
        commit(mTypes.SELECT_BLOCK, foundBlock)
        return;
      }

      const res = await request.getBlock(state.currentBranch.id, id)
      foundBlock = res.data
      commit(mTypes.SELECT_BLOCK, foundBlock)
    },

    async [aTypes.LOAD_TX] ({ commit, state}, id) {
      let foundTx
      if(state.txs) {
        foundTx = await state.txs.find(tx => {
          return id === tx.txHash
        })
      }

      if(foundTx) {
        commit(mTypes.SELECT_TX, foundTx)
        return
      }

      const res = await request.getTx(state.currentBranch.id, id)
      foundTx = res.data
      commit(mTypes.SELECT_TX, foundTx)
    },

    async [aTypes.LOAD_MERGED_BLOCKS] ({ commit, state }) {
      const STEM_ID = 'fe7b7c93dd23f78e12ad42650595bc0f874c88f7'
      const YEED_ID = 'a08ee962cd8b2bd0edbfee989c1a9f7884d26532'
      const resOfStem = await request.getBlocks(STEM_ID);
      const resOfYeed = await request.getBlocks(YEED_ID);
      let mergedBlocks = [
        ...resOfStem.data, ...resOfYeed.data
      ]
      mergedBlocks.sort((a, b) => {
        return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
      })

      commit(mTypes.SET_BLOCKS, mergedBlocks)
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
    },

    branchesExcludeStem(state) {
      return state.branches.filter(b => {
        return b.name !== "STEM"
      })
    }
  },
  plugins: [wsPlugin]
})
