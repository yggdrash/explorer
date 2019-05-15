<template>
  <v-data-table
          :headers="headers"
          :items="blocks"
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
      <td>{{ props.item.timestamp | moment('from') }}</td>
      <td>{{ props.item.txSize }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'blocks', 'linkBase' ],
    data: () => ({
      headers: [
        { text: 'Block #', sortable: false },
        { text: 'Block Proposer', sortable: false },
        { text: 'Date', sortable: false },
        { text: '# of TXs', sortable: false }
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
    /*color: white;*/
    > a {
      text-decoration: none;
      color: #e6e6e6;
    }
    > a:hover { color: #66ff99; }
  }
</style>
