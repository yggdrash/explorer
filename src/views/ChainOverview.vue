<template>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-3>
          <v-layout mb-4>
            <v-flex sm4>
              <CountCard
                      title="Total Transactions"
                      :count="blocks.length * 15"
                      :link="`${linkBase}/txs`"
                      color="blue-grey darken-2" />
            </v-flex>
            <v-flex sm4>
              <CountCard
                      title="Last block"
                      :count="blocks.length"
                      :link="`${linkBase}/blocks`"
                      color="secondary" />
            </v-flex>
            <v-flex sm4>
              <template v-if="isStem">
                  <CountCard
                          title="BranchChain created"
                          :count="branches.length"
                          link="/branches"
                          color="blue-grey darken-2"/>
              </template>
              <template v-else>
                <CountCard
                        title="Account created"
                        :count="parseInt(blocks.length / 10) + 1"
                        link="/account"
                        color="blue-grey darken-2" />
              </template>
            </v-flex>
          </v-layout>
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
                  <v-btn to="/blocks" color="secondary">See all blocks</v-btn>
                </div>
              </v-flex>
              <v-flex mb-4>
                <h2 class="headline font-weight-medium mb-2">Last 5 Transactions</h2>
                <v-card>
                  <RecentBlockWidget :blocks="blocks"/>
                </v-card>
                <div class="text-xs-center mt-3">
                  <v-btn to="/txs" color="secondary">See all transactions</v-btn>
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
                    <BranchSidebar :info="require('@/assets/sample/view')"/>
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
import { mapState } from 'vuex'
import CountCard from '../components/CountCard'
import RecentBlockWidget from '../components/RecentBlockWidget'
import BranchSidebar from '../components/BranchSidebar'

export default {
  components: {
    CountCard,
    RecentBlockWidget,
    BranchSidebar,
  },
  computed: {
    ...mapState([
      'blocks', 'currentBranch', 'branches'
    ]),

    isStem() {
      return this.currentBranch.name === 'STEM'
    },

    linkBase() {
      return this.isStem ? '/stem' : `/branches/${this.currentBranch.id}`
    }
  },

  watch: {
    currentBranch: function() {
      this.$store.dispatch('getBlocks');
    }
  },

  created () {
    this.$store.dispatch('getBlocks');
  }
}
</script>
<style lang="scss" scoped>
  td {
    font-family: 'Roboto Mono', monospace;
  }
</style>
