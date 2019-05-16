<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2">Transactions</h2>
    <v-card>
      <v-data-table
              :headers="headers"
              :items="txs"
              :pagination.sync="pagination"
              :rows-per-page-items="[15]"
      >
        <template slot="items" slot-scope="props">
          <td>
            <router-link :to="'blocks/' + props.item.blockIndex">
              {{ props.item.blockIndex }}
            </router-link>
          </td>
          <td>
            <router-link :to="'txs/' + props.item.txId">
              {{ props.item.txId | shortHash(5) }}...{{ props.item.txId.slice(-4) }}
            </router-link>
          </td>
          <td>
            <router-link :to="'txs/' + props.item.txId">
              {{ JSON.parse(props.item.body).contractVersion | shortHash(5) }}...
              {{ JSON.parse(props.item.body).contractVersion.slice(-4) }}
            </router-link>
          </td>
          <td>
            <router-link :to="'account/' + props.item.author">
              {{ props.item.author | shortHash(5)}}...
              {{ props.item.author.slice(-4)}}
            </router-link>
          </td>
          <td>
            <router-link :to="'account/' + JSON.parse(props.item.body).params.to">
              {{ JSON.parse(props.item.body).params.to | shortHash(5)}}...
              {{ JSON.parse(props.item.body).params.to.slice(-4)}}
            </router-link>
          </td>
          <td>{{ props.item.timestamp | moment('from') }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import {
    LOAD_TXS
  } from '../store/action-types'

  export default {
    data () {
      return {
        headers: [
          { text: 'Block #', sortable: false },
          { text: 'TX ID', sortable: false },
          { text: 'Contract Version', sortable: false },
          { text: 'From', sortable: false },
          { text: 'To', sortable: false },
          { text: 'Date', sortable: false },
        ],
        pagination: {
          rowsPerPage: 15
        }
      }
    },

    computed: {
      ...mapState([
        'txs'
      ]),
    },

    mounted() {
      this.$store.dispatch(LOAD_TXS)
    },
  }
</script>
<style lang="scss" scoped>
  .block-detail {
    .row {
      font-family: 'Roboto Mono', monospace;
      border-bottom: #CCC 1px solid;
    }
  }
  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
    }
    > a:hover {
      color: #66ff99;
    }
  }
</style>
