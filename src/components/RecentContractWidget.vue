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
        { text: 'Branch', sortable: false },
        { text: 'Symbol', sortable: false },
        { text: 'ContractVersion', sortable: false },
      ],
      pagination: {
        rowsPerPage: 5
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
