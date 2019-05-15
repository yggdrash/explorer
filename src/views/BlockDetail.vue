<template>
  <div style="color: #e6e6e6">
    <h2 class="font-weight-black display-1 py-2 mb-4" >BLOCK</h2>
    <span class="font-weight-black display-1 py-2 mb-4" style="color: #e6fff2" > #{{ block.index }}</span>
    <v-layout row wrap>
      <v-flex sm8 xs12 order-xs2 order-sm-1>
        <v-container class="block-sidebar-wrap">
          <h2>Overview</h2>
        </v-container>
        <div class="block-detail">
          <v-layout row
                    wrap
                    v-for="(value, props) in block" :key="props"
                    class="py-2"
                    v-show="props != 'type' & props != 'version'"
          >
            <v-flex xs12 sm2 >{{ props }}</v-flex>
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
      </v-flex>
      <v-flex sm4 xs12 order-xs1 order-sm2>
        <v-container class="validator-sidebar-wrap">
            <h2>Consensus</h2>
            comming up
        </v-container>
      </v-flex>
    </v-layout >
    <div class="text-xs-center mt-3">
      <v-btn flat color="primary"
             :to="`${linkBase}/blocks/${block.index - 1}`"
             :disabled="isLast"
      >
        <v-icon color="#ffd6cc">arrow_back</v-icon>
      </v-btn>
      <span class="pipe">&nbsp;</span>
      <v-btn flat color="primary"
             :to="`${linkBase}/blocks/${block.index + 1}`"
             :disabled="isFirst"
      >
        <v-icon color="#ffd6cc">arrow_forward</v-icon>
      </v-btn>
    </div>
    <div class="block-sidebar-wrap py-5">
      <h2 class="py-4">Transactions</h2>
        <v-card
                dark
                class="py-2"
        >
          <v-data-table
                  :headers="transactions"
                  :items="txsInBlock"
          >
            <template slot="items" slot-scope="props">
              <td>
                <router-link :to="`${linkBase}/txs/${props.item.txId}`">
                  {{ props.item.txId | shortHash(7)}}...{{ props.item.txId.slice(-5) }}
                </router-link>
              </td>
              <td>
                <router-link :to="`${linkBase}/txs/${props.item.txId}`">
                  {{ JSON.parse(props.item.body).contractVersion | shortHash(7) }}...
                  {{ JSON.parse(props.item.body).contractVersion.slice(-5) }}
                </router-link>
              </td>
              <td>
                <router-link :to="`${linkBase}/txs/${props.item.txId}`">
                  {{ props.item.issuer | shortHash(7)}}...{{ props.item.issuer.slice(-5) }}
                </router-link>
              </td>
                <td>
                    <v-icon>
                        trending_flat
                    </v-icon>
                </td>
              <td>
                <router-link :to="`${linkBase}/txs/${props.item.txId}`">
                  {{ JSON.parse(props.item.body).params.to | shortHash(7)}}...
                  {{ JSON.parse(props.item.body).params.to.slice(-5) }}
                </router-link>
              </td>
              <td>
                {{ JSON.parse(props.item.body).params.amount }}
              </td>
            </template>
          </v-data-table>
        </v-card>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import {
    LOAD_BLOCK
  } from '../store/action-types'

  export default {
    data () {
        return {
            transactions: [
                { text: 'TX ID', sortable: false },
                { text: 'Contract Version', sortable: false },
                { text: 'From', sortable: false },
                { text: '', sortable: false },
                { text: 'To', sortable: false },
                { text: 'Value', sortable: false },
            ]
        }
    },
    computed: {
      ...mapState([
        'latestBlock', 'selectedBlock', 'txsInBlock'
      ]),
      ...mapState({
        block: 'selectedBlock'
      }),

      ...mapGetters([
        'linkBase'
      ]),

      isFirst() {
        return this.latestBlock.index === this.block.index
      },

      isLast() {
        return this.block.index === 0
      }
    },

    methods: {
        lengthCheck(v) {
            if(v.length > 40) {
                return v.slice(0, 32) + "..." + v.slice(-16)
            } else {
                return v
            }
        }
    },
    mounted() {
      let blockId = this.$route.params.blockId
      this.$store.dispatch(LOAD_BLOCK, blockId)
    },

    watch: {
      '$route' (to) {
        this.$store.dispatch(LOAD_BLOCK, to.params.blockId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  h2 {
    display: inline-block;
  }
  .block-detail {
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

  .pipe {
    display: inline-block;
    margin: 15px 0;
    width: 2px;
    background-color: #e6e6e6;
  }

  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
      color: #e6e6e6;
    }
    > a:hover {
      color: #66ff99;
    }
  }
</style>
