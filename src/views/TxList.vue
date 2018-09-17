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
            <router-link :to="'txs/' + props.item.hash">
              {{ props.item.hash }}
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
    }
  }
</script>
<style lang="scss">
  .block-detail {
    .row {
      font-family: 'Roboto Mono', monospace;
      border-bottom: #CCC 1px solid;
    }
  }
</style>
