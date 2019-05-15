<template>
  <v-data-table
          :headers="headers"
          :items="txs"
          :pagination.sync="pagination"
          hide-actions
  >
    <template slot="items" slot-scope="props">

    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'txs', 'linkBase' ],
    data: () => ({
      headers: [
        { text: 'Validator', sortable: false },
        { text: 'Consensus', sortable: false },
        { text: 'Date', sortable: false },
      ],
      pagination: {
        rowsPerPage: 7
      }
    }),
  }
</script>
<style lang="scss" scoped>
  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
      color: #e6e6e6;
    }
    > a:hover { color: #66ff99; }
  }
</style>
