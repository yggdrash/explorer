<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <span class="font-weight-black display-2 mr-2">Welcome to YGGDRASH Explorer</span>
        </v-flex>
        <v-flex class="mb-4">
          <h2 class="headline font-weight-medium mb-2">Recently Updated Branches</h2>
          <BranchCardList :branches="branches" max="3"/>
          <div class="text-xs-center mt-3">
            <v-btn large dark to="/branches">See all branches</v-btn>
          </div>
        </v-flex>
        <v-flex mb-5>
          <h2 class="headline font-weight-medium mb-2">Recently Blocks</h2>
          <v-card>
            <IntegratedBlockWidget :blocks="blocks"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import { mapState } from 'vuex'
  import CountCard from '../components/CountCard'
  import BranchCardList from '../components/BranchCardList'
  import IntegratedBlockWidget from '../components/IntegratedBlockWidget'

  export default {
    components: {
      CountCard,
      BranchCardList,
      IntegratedBlockWidget,
    },

    data () {
      return {
        headers: [
          { text: 'Branch', sortable: false },
          { text: 'Block #', sortable: false },
          { text: 'Block Hash', sortable: false },
          { text: 'Size', sortable: false },
          { text: 'Date', sortable: false },
          { text: 'Block # of TXs', sortable: false }
        ],

        pagination: {
          rowsPerPage: 7
        }
      }
    },

    computed: {
      ...mapState([
        'blocks', 'branches'
      ]),
    }
  }
</script>
<style lang="scss" scoped>
  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
    }
  }
</style>
