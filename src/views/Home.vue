<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-5 class="text-xs-center">
          <span class="display-2 mr-2" style="color: #e6e6e6;">YGGDRASH Blockchain Explorer</span>
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
          <DashboardCardList :branches="branchesExcludeStem" max="2"/>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import { mapState, mapGetters } from 'vuex'
  import DashboardCardList from '../components/DashboardCardList'
  import IntegratedBlockWidget from '../components/IntegratedBlockWidget'
  import {
    SET_CURRENT_BRANCHE
  } from '../store/mutation-types'
  import {
    LOAD_MERGED_BLOCKS
  } from '../store/action-types'

  export default {
    components: {
      DashboardCardList,
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
