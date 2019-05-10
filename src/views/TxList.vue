<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2" style="color: #e6e6e6">Transactions</h2>
    <v-card
      dark
    >
      <v-data-table
              :headers="headers"
              :items="txs"
              :pagination.sync="pagination"
              :rows-per-page-items="[20]"
      >
        <template slot="items" slot-scope="props">
          <td>
            <router-link :to="'txs/' + props.item.txId">
              {{ props.item.txId }}
            </router-link>
          </td>
          <td>{{ props.item.author | shortHash(32)}}...</td>
          <td>{{ props.item.timestamp | moment('from')}}</td>
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
          { text: 'Transaction Id', sortable: false },
          { text: 'Author', sortable: false },
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
<style lang="scss">
  .transparent {
    background-color: white!important;
    opacity: 0.65;
    border-color: transparent!important;
  }

  .block-detail {
    .row {
      font-family: 'Roboto Mono', monospace;
      border-bottom: #CCC 1px solid;
    }
  }
</style>
