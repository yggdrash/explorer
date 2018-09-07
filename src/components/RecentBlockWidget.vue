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
                :to="`/stem/blocks/${props.item.index}`">
          {{ props.item.index }}
        </router-link>
      </td>
      <td>
        <router-link
                :to="`/stem/blocks/${props.item.hash}`">
          {{ props.item.hash | shortHash }}
        </router-link>
      </td>
      <td>{{ props.item.bodyLength }}</td>
      <td>{{ props.item.timestamp | moment('from') }}</td>
      <td>{{ props.item.body.length }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'blocks' ],
    data: () => ({
      headers: [
        { text: 'Block #', sortable: false },
        { text: 'Block Hash', sortable: false },
        { text: 'Size', sortable: false },
        { text: 'Date', sortable: false },
        { text: 'Block # of TXs', sortable: false }
      ],
      pagination: {
        rowsPerPage: 5
      }
    }),
  }
</script>
