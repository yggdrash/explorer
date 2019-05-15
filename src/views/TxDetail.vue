<template>
  <div style="color: #e6e6e6">
    <h2 class="font-weight-black display-1 py-2 mb-4">TRANSACTION</h2>
    <v-chip color="#e6fff2" text-color="black" small>
      {{ selectedTx.txId }}
    </v-chip>
    <v-container class="block-sidebar-wrap">
      <h2>Overview</h2>
      <v-chip color="#e6fff2" text-color="black" small>
        TYPE - Coin
      </v-chip>
    </v-container>
    <div class="tx-detail">
      <v-layout row
                wrap
                v-for="(value, props) in selectedTx" :key="props"
                class="py-2"
                v-show="props != 'body' & props != 'type' & props != 'version'">
        <v-flex xs12 sm2>
          {{ props }}
        </v-flex>
        <v-flex xs12 sm10 class="font-weight-bold value"
                v-if="props == 'timestamp'"
        >
          {{ lengthCheck(value) | moment('from') }}
        </v-flex>
        <v-flex xs12 sm10 class="font-weight-bold value"
                v-else
        >
          {{ lengthCheck(value) }}
        </v-flex>
      </v-layout>
    </div>
    <v-container class="block-sidebar-wrap py-4">
      <h2>Receipt</h2>
        <v-chip color="#e6fff2" text-color="black" small>
            SUCCESS
        </v-chip>
    </v-container>
    <v-card
            dark
            class="py-2"
    >
      <v-data-table
            :headers="receipt"
            hide-actions
            :items="test(selectedTx)"
      >
        <template slot="items" slot-scope="props">
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import {
    LOAD_TX
  } from '../store/action-types'

  export default {
    data () {
        return {
            receipt: [
                { text: 'ContractVersion', sortable: false },
                { text: 'From', sortable: false },
                { text: 'To', sortable: false },
                { text: 'Value', sortable: false },
            ],
            body: []
        }
    },
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
    methods: {
        lengthCheck(v) {
            if(v.length > 40) {
                return v.slice(0, 32) + "..." + v.slice(-16)
            } else {
                return v
            }
        },
        test(tx) {
            console.log(tx)
            // console.log(JSON.parse(tx.body).contractVersion)
            // this.body.push(JSON.parse(tx.body).contractVersion)
            // this.body.push(tx)
            // console.log(this.body)
        }
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

  .v-chip--small {
    height: 18px;
  }
</style>
