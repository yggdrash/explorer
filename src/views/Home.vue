<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <h1>Welcome to YGGDRASH Explorer</h1>
        </v-flex>
        <v-flex>
          <v-layout mb-4>
            <v-flex sm4>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Total transactions</div>
                  <div>Listen to your favorite artists and albums whenever and wherever, online and
                    offline.
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat dark>View All</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex sm4>
              <v-card color="secondary" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Last block</div>
                  <div>Listen to your favorite artists and albums whenever and wherever, online and
                    offline.
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat dark>View All</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex sm4>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Wallet addresses created</div>
                  <div>Listen to your favorite artists and albums whenever and wherever, online and
                    offline.
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat dark>View All</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex mb-5>
          <h2>Last 5 Blocks</h2>
          <v-data-table
                  :headers="headers"
                  :items="blocks"
                  :pagination.sync="pagination"
                  hide-actions
          >
            <template slot="items" slot-scope="props">
              <td>
                <router-link :to="'blocks/' + props.item.index">
                  {{ props.item.index }}
                </router-link>
              </td>
              <td>
                <router-link :to="'blocks/' + props.item.hash">
                  {{ props.item.hash }}
                </router-link>
              </td>
              <td>{{ props.item.author }}</td>
              <td>{{ props.item.dataSize }}</td>
              <td>{{ props.item.timestamp }}</td>
              <td>{{ props.item.body.length }}</td>
            </template>
          </v-data-table>
          <div class="text-xs-center mt-3">
            <v-btn to="/blocks" color="secondary">See all blocks</v-btn>
          </div>
        </v-flex>
        <v-flex mb-5>
          <h2>Last 5 Transactions</h2>
          <v-data-table
                  :headers="headers"
                  :items="blocks"
                  :pagination.sync="pagination"
                  hide-actions=""
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
          <div class="text-xs-center mt-3">
            <v-btn to="/txs" color="secondary">See all transactions</v-btn>
          </div>
        </v-flex>
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
  },

  created () {
    this.$store.dispatch('getBlocks');
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
