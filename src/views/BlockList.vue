<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2">Blocks</h2>
    <v-card>
      <template>
        <v-data-table
                :headers="headers"
                :items="blocks"
                :pagination.sync="pagination"
        >
          <template slot="items" slot-scope="props">
            <td>
              <router-link :to="'blocks/' + props.item.index">
                {{ props.item.index }}
              </router-link>
            </td>
            <td>
              <router-link :to="'blocks/' + props.item.hash">
                {{ props.item.hash | shortHash(16)}}...
              </router-link>
            </td>
            <td>{{ props.item.author}}</td>
            <td>{{ props.item.bodyLength }}</td>
            <td>{{ props.item.timestamp | moment('from')}}</td>
            <td>{{ props.item.body.length }}</td>
          </template>
        </v-data-table>
      </template>
    </v-card>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        headers: [
          { text: 'Block #', sortable: false },
          { text: 'Block Hash', sortable: false },
          { text: 'Author', sortable: false },
          { text: 'Size', sortable: false },
          { text: 'Date', sortable: false },
          { text: 'Block # of TXs', sortable: false }
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
  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
    }
  }
</style>
