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
                :to="`${linkBase}/blocks/${props.item.header.index}`">
          {{ props.item.header.index }}
        </router-link>
      </td>
      <td>
        <router-link
                :to="`${linkBase}/blocks/${props.item.blockId}`">
          {{ props.item.blockId | shortHash(16) }}...
        </router-link>
      </td>
      <td>{{ props.item.header.timestamp | moment('from') }}</td>
      <td>{{ props.item.header.bodyLength }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'blocks', 'linkBase' ],
    data: () => ({
      headers: [
        { text: 'Block #', sortable: false },
        { text: 'Block Hash', sortable: false },
        { text: 'Date', sortable: false },
        { text: '# of TXs', sortable: false }
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
