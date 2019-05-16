<template>
  <v-data-table
          :headers="headers"
          :items="blocks"
          :loading="loading"
          :pagination.sync="pagination"
          hide-actions
  >
    <template slot="items" slot-scope="props">
      <td>
        <router-link
                :to="`${linkBase}/blocks/${props.item.index}`">
          {{ props.item.index }}
        </router-link>
      </td>
      <td>
        <router-link
                :to="`${linkBase}/validator/${props.item.author}`">
          {{ props.item.author | shortHash(7) }}...{{ props.item.author.slice(-5) }}
        </router-link>
      </td>
      <td>{{ props.item.txSize }}</td>
      <td>{{ props.item.timestamp | moment('from') }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'blocks', 'linkBase' ],
    data: () => ({
        loading: false,
        headers: [
        { text: 'Block #', sortable: false },
        { text: 'Block Proposer', sortable: false },
        { text: '# of TXs', sortable: false },
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
    > a:hover { color: #66ff99; }
  }
</style>
