<template>
  <div>
    <h2 class="font-weight-black display-1 py-2 mb-4">TRANSACTION</h2>
    <span class="title grey--text"> {{ selectedTx.txHash }}</span>
    <div class="tx-detail">
      <v-layout row wrap v-for="(value, props) in selectedTx" :key="props" class="py-2">
        <v-flex xs12 sm2 class="font-weight-bold">{{ props }}</v-flex>
        <v-flex xs12 sm10 class="value">{{ value }}</v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import {
    LOAD_TX
  } from '../store/action-types'

  export default {
    computed: {
      ...mapState([
        'selectedTx'
      ]),

      ...mapGetters([
        'linkBase'
      ]),
    },

    mounted() {
      let hash = this.$route.params.hash
      this.$store.dispatch(LOAD_TX, hash)
    },

    watch: {
      '$route' (to) {
        this.$store.dispatch(LOAD_TX, to.params.hash)
      }
    }
  }
</script>
<style lang="scss" scoped>
  h2 {
    display: inline-block;
  }
  .tx-detail {
    .row {
      &:nth-child(odd) {
        border-left: 3px solid #E0E0E0;
        background-color: white;
      }
      &:nth-child(even) {
        border-left: 3px solid #06b67b;
      }

      .flex {
        padding: 4px 1.5em;

        &.value {
          word-break: break-all;
          font-family: 'Roboto Mono', monospace;
        }
      }
    }
  }
</style>
