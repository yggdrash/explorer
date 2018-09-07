<template>
  <v-slide-y-transition mode="out-in">
    <v-layout column>
      <v-flex>
        <v-layout mb-4>
          <v-flex sm4>
            <CountCard
                    title="Total Transactions"
                    :count="blocks.length * 15"
                    link="/stem/txs"
                    color="blue-grey darken-2" />
          </v-flex>
          <v-flex sm4>
            <CountCard
                    title="Last block"
                    :count="blocks.length"
                    link="/stem/blocks"
                    color="secondary" />
          </v-flex>
          <v-flex sm4>
            <CountCard
                    title="BranchChain created"
                    :count="branches.length"
                    link="/branches"
                    color="blue-grey darken-2"/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout>
          <v-flex xs8 class="mt-3">
            <v-flex mb-4>
              <h2 class="headline font-weight-medium mb-2">Last 5 Blocks</h2>
              <v-card>
                <RecentBlockWidget :blocks="blocks"/>
              </v-card>
              <div class="text-xs-center mt-3">
                <v-btn to="/stem/blocks" color="secondary">See all blocks</v-btn>
              </div>
            </v-flex>
            <v-flex mb-4>
              <h2 class="headline font-weight-medium mb-2">Last 5 Transactions</h2>
              <v-card>
                <RecentBlockWidget :blocks="blocks"/>
              </v-card>
              <div class="text-xs-center mt-3">
                <v-btn to="/stem/txs" color="secondary">See all transactions</v-btn>
              </div>
            </v-flex>
          </v-flex>
          <v-flex xs4>
            <v-container>
              <h3 class="font-weight-bold subheading grey--text mb-2">install</h3>
              <kbd>Stem is installed by default.</kbd>
              <BranchSidebar :info="require('@/assets/sample/view')"/>
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
  import CountCard from '../../components/CountCard'
  import RecentBlockWidget from '../../components/RecentBlockWidget'
  import BranchSidebar from '../../components/BranchSidebar'

  export default {
    components: {
      CountCard,
      RecentBlockWidget,
      BranchSidebar,
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'blocks', 'currentBranch', 'branches'
      ])
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
