import Vue from 'vue'
import Vuex from 'vuex'

import * as request from '../request'
import * as requestEs from '../requestToHub'
import * as mTypes from './mutation-types'
import * as aTypes from './action-types'

// import createWsPlugin from './plugin/createWebSocketPlugin'
// const wsPlugin = createWsPlugin("/ws/yggdrash-websocket")

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    drawer: null,
    statesOfBranch: [],
    selectedTx: {},
    txs: [],
    countOfTxs: 0,
    txsInBlock: [],
    selectedBlock: {},
    blocks: [],
    latestBlock: {},
    branches: [
      {
        name: 'Blocks',
        description: '',
        link: 'yggdrash/blocks'
      },
      {
        name: 'Transactions',
        description: '',
        link: 'yggdrash/txs'
      }
    ],
    currentBranch: { name: '', id: ''},
    isConnected: false,
  },

  mutations: {
    [mTypes.TOGGLE_DRAWER] (state) {
      state.drawer = !state.drawer
    },

    [mTypes.SET_STATES] (state, payload) {
      state.statesOfBranch = payload
    },

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
      state.countOfTxs = payload.length;
    },

    [mTypes.SET_TXS_IN_BLOCK] (state, payload) {
      state.txsInBlock = payload
    },

    [mTypes.ADD_TXS] (state, payload) {
      state.txs = payload.concat(state.txs)
      state.countOfTxs += payload.length
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
    },

    [mTypes.LOADING] (state, payload) {
      if(payload) {
        state.loading = payload
      } else {
        setInterval(() => {
          state.loading = payload
        }, 1000)
      }
    },
  },

  actions: {
    async [aTypes.LOAD_STATES] ({ commit, state }) {
      // if(!state.currentBranch.active) {
      //   commit(mTypes.SET_STATES, [])
      //   return
      // }
      const res = await request.getStates(state.currentBranch.id)
      let payload = res.data
      commit(mTypes.SET_STATES, payload)
    },

    async [aTypes.LOAD_TXS] ({ commit, state }) {
      // if(!state.currentBranch.active) {
      //   commit(mTypes.SET_TXS, [])
      //   return
      // }

      const res = await requestEs.getTxs(state.currentBranch.id)
      let payload = res.data
      commit(mTypes.SET_TXS, payload)
    },

    async [aTypes.LOAD_BLOCKS] ({ commit, state }) {
      // if(!state.currentBranch.active) {
      //   commit(mTypes.SET_BLOCKS, [])
      //   commit(mTypes.SET_LATEST_BLOCK, {})
      //   return
      // }

      const res = await requestEs.getBlocks(state.currentBranch.id)
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
      if (offset === 0) return
      const res = await requestEs.getBlocks(state.currentBranch.id, offset, 5)
      let payload = res.data
      commit(mTypes.SET_BLOCKS, [...state.blocks, ...payload])
    },

    async [aTypes.LOAD_BRANCHES] ({ commit, state }) {
      commit(mTypes.LOADING, true)
      const res = await requestEs.getBlocks(state.currentBranch.id)
      let payload = res.data.map(item => {
        if(item.symbol === 'STEM' || item.symbol === 'YEED') {
          item['active'] = true
        }
        return item
      })
      commit(mTypes.SET_BRANCHES, payload)
      commit(mTypes.LOADING, false)
    },

    async [aTypes.LOAD_BLOCK] ({ commit, state }, id) {
      let foundBlock
      if(state.blocks) {
        foundBlock = await state.blocks.find(b => {
          return Number(id) === b.index || id === b.hash
        })
      }

      if(!foundBlock) {
        foundBlock = await requestEs.getBlock(state.currentBranch.id, id)
      }

      let foundTxs = await requestEs.getTxsByBlockId(foundBlock.blockId)
      commit(mTypes.SELECT_BLOCK, foundBlock)
      commit(mTypes.SET_TXS_IN_BLOCK, foundTxs)
    },

    async [aTypes.LOAD_TX] ({ commit, state}, id) {
      let foundTx

      if(state.txs) {
        foundTx = await state.txs.find(tx => {
          return id === tx.txId
        })
      }

      if(foundTx) {
        commit(mTypes.SELECT_TX, foundTx)
        return
      }

      // const res = await request.getTx(state.currentBranch.id, id)
      const res = await requestEs.getTxsByBlockId(id)
      foundTx = res.data

      commit(mTypes.SELECT_TX, foundTx)
    },

    async [aTypes.LOAD_MERGED_BLOCKS] ({ commit, state }) {
      //TODO MUST REFACTORING!
      let activeBrancheIds = state.branches.filter(b => b.active).map(b => b.id)
      let firstRes = []
      let secondRes = []
      let mergedBlocks = []
      if(activeBrancheIds.length > 0) {
        firstRes = await requestEs.getBlocks(activeBrancheIds[0]);
        mergedBlocks = [
          ...mergedBlocks,
          ...firstRes.data,
        ]
      }

      if(activeBrancheIds.length > 1) {
        secondRes = await requestEs.getBlocks(activeBrancheIds[1]);
        mergedBlocks = [
          ...mergedBlocks,
          ...secondRes.data,
        ]
      }

      mergedBlocks.sort((a, b) => {
        return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
      })

      commit(mTypes.SET_BLOCKS, mergedBlocks)
    }
  },

  getters: {
    loading(state) {
      return state.loading
    },

    isStem(state) {
      return state.currentBranch.name === 'STEM'
    },

    linkBase() {
      return `/yggdrash`
    },

    countOfBranches(state) {
      return Object.keys(state.branches).length
    },

    branchesExcludeStem(state) {
      return state.branches.filter(b => {
        return b.name !== "STEM"
      })
    },
  },
  // plugins: [wsPlugin]
})
