<template>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <CountCardList :items="countItems"></CountCardList>
        </v-flex>
        <v-flex>
          <v-layout>
            <v-flex xs8>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2">Last 5 Blocks</h2>
                <v-card>
                  <RecentBlockWidget :blocks="blocks" :linkBase="linkBase"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn flat :to="`${linkBase}/blocks`" style="text-decoration: underline">
                    See all blocks</v-btn>
                </div>
              </v-flex>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2">Last 5 Transactions</h2>
                <v-card>
                  <RecentTxWidget :txs="txs" :linkBase="linkBase"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn flat :to="`${linkBase}/txs`" style="text-decoration: underline">
                    See all transactions</v-btn>
                </div>
              </v-flex>
            </v-flex>
            <v-flex xs4>
              <v-container>
                <div>
                  <div style="">
                    <h3>install</h3>
                    <template v-if="isStem">
                      <kbd>Stem is installed by default.</kbd>
                    </template>
                    <template v-else>
                      <kbd> > ygg plant {{ currentBranch.id | shortHash(16)}}</kbd>
                    </template>
                    <BranchSidebar :info="currentBranchInfo"/>
                  </div>
                </div>
              </v-container>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import { mapState, mapGetters } from 'vuex'
import CountCardList from '../components/CountCardList'
import RecentBlockWidget from '../components/RecentBlockWidget'
import RecentTxWidget from '../components/RecentTxWidget'
import BranchSidebar from '../components/BranchSidebar'
import {
  LOAD_BLOCKS,
  LOAD_TXS,
  LOAD_STATES,
} from '../store/action-types'

export default {
  components: {
    CountCardList,
    RecentBlockWidget,
    RecentTxWidget,
    BranchSidebar,
  },
  computed: {
    ...mapState([
      'blocks', 'currentBranch', 'branches', 'latestBlock', 'txs', 'branchStates'
    ]),

    ...mapGetters([
      'linkBase', 'isStem', 'countOfBranches', 'branchesExcludeStem'
    ]),

    countItems() {
      let defaultItems = [
          {
            title:'total transaction',
            count: this.txs.length,
            link: `${this.linkBase}/txs`
          },
          {
            title:'last block',
            count: this.latestBlock.index,
            link: `${this.linkBase}/blocks`
          },
        ]

      if(this.isStem) {
        let branchCount = {
          title:'branch created',
          count: this.branchesExcludeStem.length,
          link: `/branches`
        }
        return [...defaultItems, branchCount]
      } else {
        let accountCount = {
          title:'account created',
          count: this.branchStates.length,
          link: `${this.linkBase}/account`
        }
        return [...defaultItems, accountCount]
      }
    },

    currentBranchInfo() {
      let foundBranch
      if(this.isStem) {
        foundBranch = this.branches.find(b => {
          return b.symbol === "STEM"
        })
      } else {
        foundBranch = this.branches.find(b => {
          return b.id === this.currentBranch.id
        })
      }
      return foundBranch
    }
  },

  mounted () {
    this.$store.dispatch(LOAD_BLOCKS)
    this.$store.dispatch(LOAD_TXS)
    this.$store.dispatch(LOAD_STATES)
  },

  watch: {
    currentBranch: function() {
      this.$store.dispatch(LOAD_BLOCKS)
      this.$store.dispatch(LOAD_TXS)
      this.$store.dispatch(LOAD_STATES)
    },
  },
}
</script>
<style lang="scss" scoped>
  td {
    font-family: 'Roboto Mono', monospace;
  }
</style>
