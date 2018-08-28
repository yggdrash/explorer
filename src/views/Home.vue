<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h2>Recent Blocks</h2>
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
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        rowsPerPage: 10
      }
    }
  },

  computed: {
    ...mapState([
      'blocks'
    ])
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
