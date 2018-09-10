<template>
  <v-container>
    <template>
      <v-data-table
              :headers="headers"
              :items="txs"
              :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td><router-link :to="'txs/' + props.item.txHash">
            {{ props.item.txHash }}</router-link></td>
          <td>{{ props.item.timestamp | moment('from')}}</td>
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        headers: [
          { text: 'Transaction Id', sortable: false},
          { text: 'Date', sortable: false},
        ],

        pagination: {
          rowsPerPage: 25
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
