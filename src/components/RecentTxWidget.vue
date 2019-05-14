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
                :to="`${linkBase}/txs/${props.item.txId}`">
          {{ props.item.txId | shortHash(7) }}...{{ props.item.txId.slice(-5) }}
        </router-link>
      </td>
      <td>
        <router-link
                :to="`${linkBase}/txs/${props.item.txId}`">
          {{ JSON.parse(props.item.body).contractVersion | shortHash(7) }}...
          {{ JSON.parse(props.item.body).contractVersion.slice(-5) }}
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
        { text: 'TX ID', sortable: false },
        { text: 'Contract Version', sortable: false },
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
