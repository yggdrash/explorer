<template>
  <v-slide-y-transition mode="out-in">
    <v-layout column>
      <v-flex mb-3>
        <v-layout mb-4>
          <v-flex sm4>
            <CountCard
                    title="Total Transactions"
                    :count="blocks.length * 15"
                    link="/tx"
                    color="blue-grey darken-2" />
          </v-flex>
          <v-flex sm4>
            <CountCard
                    title="Last block"
                    :count="blocks.length"
                    :link="`/stem/blocks`"
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
          <v-flex xs8>
            <v-flex mb-4>
              <h2 class="headline font-weight-medium mb-2">Last 5 Blocks</h2>
              <v-card>
                <RecentBlockWidget :blocks="blocks"/>
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
                  <p style="text-overflow: ellipsis; ">
                    <code style="width: 100%; overflow: hidden;">ygg plant {{ currentBranch.id
                      }}</code>
                  </p>
                </div>
                <v-layout wrap>
                  <v-flex v-for="(value, props) in require('@/assets/sample/view')"
                          :key="props" xs12 v-if="isLong(value)" class="py-3"
                          style="border-bottom: 1px solid #DDD;">
                    <div>
                      <v-layout column style="font-family: 'Roboto Mono'; font-size: 0.91em;">
                        <v-flex class="font-weight-bold grey--text subheading mb-1">{{props
                          }}</v-flex>
                        <v-flex>{{ value }}</v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                  <v-flex v-for="(value, props) in require('@/assets/sample/view')"
                          :key="props" xs6 v-if="!isLong(value)" class="py-3"
                          style="border-bottom: 1px solid #CCC;">
                    <div>
                      <v-layout column>
                        <v-flex class="font-weight-bold grey--text subheading">{{props}}</v-flex>
                        <v-flex>{{ value }}</v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
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
  import CountCard from '../../components/CountCard'
  import RecentBlockWidget from '../../components/RecentBlockWidget'

  export default {
    components: {
      CountCard,
      RecentBlockWidget,
    },
    data () {
      return {
      }
    },
    methods: {
      isLong(value) {
        return value.length > 20
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
