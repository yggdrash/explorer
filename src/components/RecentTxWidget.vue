<template>
  <v-data-table
          :headers="headers"
          :items="txs"
          :pagination.sync="pagination"
          hide-actions
  >
    <template slot="items" slot-scope="props">
      <td>
        <router-link
                :to="`${linkBase}/txs/${props.item.hash}`">
          {{ props.item.hash | shortHash(48) }}...
        </router-link>
      </td>
      <td>{{ props.item.timestamp | moment('from') }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'txs', 'linkBase' ],
    data: () => ({
      headers: [
        { text: 'Transaction Id', sortable: false },
        { text: 'Date', sortable: false },
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
    }
  }
</style>
