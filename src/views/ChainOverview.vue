<template>
    <v-slide-y-transition mode="out-in">
      <v-layout column >
        <v-flex>
          <v-layout row wrap >
            <v-flex sm6 xs12 order-xs2 order-sm-1 pa-1>
              <v-flex mb-4 >
                <h2 class="headline font-weight-medium mb-2">Most Recent Blocks</h2>
                <v-card >
                  <RecentBlockWidget :blocks="blocks" :linkBase="linkBase"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn flat :to="`${linkBase}/blocks`" style="text-decoration: underline;">
                    View all blocks</v-btn>
                </div>
              </v-flex>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2" >Transaction History (Weekly) </h2>
                <v-card>
                  <div>
                    <ve-line :data="chartData"></ve-line>
                  </div>
                </v-card>
              </v-flex>
            </v-flex>
            <v-flex sm6 xs12 order-xs1 order-sm2 pa-1>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2" >Most Recent Transactions</h2>
                <v-card>
                  <RecentTxWidget :txs="txs" :linkBase="linkBase"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn flat :to="`${linkBase}/txs`" style="text-decoration: underline;">
                    View all transactions</v-btn>
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
import RecentContractWidget from '../components/RecentContractWidget'
import RecentValidatorWidget from '../components/RecentValidatorWidget'
import BranchSidebar from '../components/BranchSidebar'
import {
  LOAD_BLOCKS,
  LOAD_TXS,
} from '../store/action-types'
import VeLine from 'v-charts/lib/line.common'

export default {
  components: {
    CountCardList,
    RecentBlockWidget,
    RecentTxWidget,
    RecentContractWidget,
    RecentValidatorWidget,
    BranchSidebar,
    VeLine,
  },
    data () {
      //TODO: 현재 날짜에 -7 weekly data setting
        // tx timestamp query
        // this.time = `${new Date().getMonth() + 1} - ${new Date().getData()}`
        return {
            chartData: {
                columns: ['date', 'TX', 'CONTRACT'],
                rows: [
                    {'date': '05-11', 'TX': 1231, 'CONTRACT': 'YEED'},
                    {'date': '05-12', 'TX': 1231},
                    {'date': '05-13', 'TX': 1223},
                    {'date': '05-14', 'TX': 2123},
                    {'date': '05-15', 'TX': 4123},
                    {'date': '05-16', 'TX': 3123},
                    {'date': '05-17', 'TX': 8000}
                ]
            }
        }
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
  },

  watch: {
    currentBranch: function() {
      this.$store.dispatch(LOAD_BLOCKS)
      this.$store.dispatch(LOAD_TXS)
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
