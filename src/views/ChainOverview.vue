<template>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <!--<v-flex mb-4>-->
          <!--<CountCardList :items="countItems"></CountCardList>-->
        <!--</v-flex>-->
        <v-flex>
          <v-layout row wrap >
            <v-flex sm6 xs12 order-xs2 order-sm-1 style="color: #e6e6e6" pa-1>
              <v-flex mb-4 >
                <h2 class="headline font-weight-medium mb-2">Blocks</h2>
                <v-card
                    dark
                    tile
                >
                  <RecentBlockWidget :blocks="blocks" :linkBase="linkBase"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn flat :to="`${linkBase}/blocks`" style="text-decoration: underline; color: #e6e6e6">
                    See all blocks</v-btn>
                </div>
              </v-flex>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2" style="color: #e6e6e6">Validators</h2>
                <v-card
                        dark
                >
                  <RecentValidatorWidget :txs="txs" :linkBase="linkBase"/>
                </v-card>
              </v-flex>
              <v-container class="Validators-sidebar-wrap">
                <div>
                </div>
              </v-container>
            </v-flex>
            <v-flex sm6 xs12 order-xs1 order-sm2 pa-1>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2" style="color: #e6e6e6">Transactions</h2>
                <v-card
                        dark
                >
                  <RecentTxWidget :txs="txs" :linkBase="linkBase"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn flat :to="`${linkBase}/txs`" style="text-decoration: underline; color: #e6e6e6">
                    See all transactions</v-btn>
                </div>
              </v-flex>
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
import RecentValidatorWidget from '../components/RecentValidatorWidget'
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
    RecentValidatorWidget,
    BranchSidebar,
  },
  computed: {
    ...mapState([
      'blocks',
      'currentBranch',
      'branches',
      'latestBlock',
      'txs',
      'countOfTxs',
      'statesOfBranch',
    ]),

    ...mapGetters([
      'linkBase', 'isStem', 'countOfBranches', 'branchesExcludeStem'
    ]),

    countItems() {
      let defaultItems = [
          {
            title:'total transaction',
            count: this.countOfTxs,
            link: `${this.linkBase}/txs`
          }
        ]

      if(this.latestBlock.header) {
        let blockCount = {
            title:'last block',
            count: this.latestBlock.header.index,
            link: `${this.linkBase}/blocks`
          }
          defaultItems = [...defaultItems, blockCount]
      }

      if(this.isStem) {
        let branchCount = {
          title:'branch created',
          count: this.branchesExcludeStem.length,
          link: `/branches`
        }
        return [...defaultItems, branchCount]
      } else {
        let accountCount = {
          title:'states created',
          count: this.statesOfBranch.length,
          link: `${this.linkBase}/states`
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

  kbd {
    padding: 5px;
    width: 100%;
  }

  .branch-sidebar-wrap {
    padding: 16px 0 0 16px;
  }

  @media only screen and (max-width: 959px) {
    .branch-sidebar-wrap {
      padding: 16px 0 26px 0;
    }
  }
</style>
