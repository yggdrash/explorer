<template>
  <v-container>
    <template>
      <v-data-table
              :headers="headers"
              :items="blocks"
              :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td><router-link :to="'blocks/' + props.item.index">
            {{ props.item.index }}</router-link></td>
          <td><router-link :to="'blocks/' + props.item.hash">
            {{ props.item.hash }}</router-link></td>
          <td>{{ props.item.author }}</td>
          <td>{{ props.item.dataSize }}</td>
          <td>{{ props.item.timestamp }}</td>
          <td>{{ props.item.body.length }}</td>
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
        { text: 'Block #', sortable: false},
        { text: 'Block Hash', sortable: false},
        { text: 'Author', sortable: false},
        { text: 'Size', sortable: false},
        { text: 'Date', sortable: false},
        { text: 'Block # of TXs', sortable: false}
      ],

      pagination: {
        rowsPerPage: 25
      }
    }
  },

  computed: {
    ...mapState([
      'blocks'
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
