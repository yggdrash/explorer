<template>
  <v-container>
    <div class="block-detail mt-5">
      <v-layout row v-for="(value, props) in tx" :key="props" class="py-2">
        <v-flex xs2>{{ props }}</v-flex>
        <v-flex xs10>{{ value }}</v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapState([
        'txs'
      ]),

      ...mapGetters([
        'linkBase'
      ]),

      tx () {
        if (this.$route.params.hash) {
          return this.txs.filter(tx => {
            return tx.txHash === this.$route.params.hash
          })[0]
        }
      }
    }
  }
</script>
