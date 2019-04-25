<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-5 class="text-xs-center">
          <span class="display-2 mr-2" style="color: #f2f2f2;">YGGDRASH Blockchain Explorer</span>
        </v-flex>
        <v-flex mb-5>
        <v-text-field
                flat
                dark
                counter="130"
                single-line
                hide-details
                placeholder="Block # / TX Hash / Account / Validator"
                prepend-inner-icon="search"
        ></v-text-field>
        </v-flex>
        <v-flex class="mb-5">
          <BranchCardList :branches="branchesExcludeStem" max="3"/>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import { mapState, mapGetters } from 'vuex'
  import BranchCardList from '../components/BranchCardList'
  import IntegratedBlockWidget from '../components/IntegratedBlockWidget'
  import {
    SET_CURRENT_BRANCHE
  } from '../store/mutation-types'
  import {
    LOAD_MERGED_BLOCKS
  } from '../store/action-types'

  export default {
    components: {
      BranchCardList,
      IntegratedBlockWidget,
    },

    computed: {
      ...mapState([
        'blocks', 'branches'
      ]),

      ...mapGetters([
        'branchesExcludeStem'
      ])
    },

    mounted() {
      this.$store.commit(SET_CURRENT_BRANCHE, {id: '', name: 'HOME'})
      this.$store.dispatch(LOAD_MERGED_BLOCKS)
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
