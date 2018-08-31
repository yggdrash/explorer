<template>
  <div>
    <template v-if="$route.params.id == undefined">
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
    <template v-else>
      <pre>
      {{ blockDetail }}
      </pre>
    </template>
  </div>
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

    blockDetail () {
      if(this.$route.params.id) {
        return this.blocks.filter(b => {
          if (isNaN(this.$route.params.id)) {
            return b.hash === this.$route.params.id
          }
          return String(b.index) === this.$route.params.id
        })
      }
      return this.blocks
    }
  }
}
</script>
