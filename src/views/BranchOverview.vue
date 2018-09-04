<template>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <v-layout mb-4>
            <v-flex sm4>
              <CountCard
                      title="Total Transactions"
                      count="21,563"
                      link="/tx"
                      color="blue-grey darken-2" />
            </v-flex>
            <v-flex sm4>
              <CountCard
                      title="Last block"
                      count="1,181"
                      link="/blocks"
                      color="secondary" />
            </v-flex>
            <v-flex sm4>
              <CountCard
                      title="Account created"
                      count="3"
                      link="/account"
                      color="blue-grey darken-2" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex mb-5>
          <h2 class="headline font-weight-medium mb-2">Last 5 Blocks</h2>
          <v-data-table
                  :headers="headers"
                  :items="blocks"
                  :pagination.sync="pagination"
                  hide-actions
          >
            <template slot="items" slot-scope="props">
              <td>
                <router-link :to="'/blocks/' + props.item.index">
                  {{ props.item.index }}
                </router-link>
              </td>
              <td>
                <router-link :to="'blocks/' + props.item.hash">
                  {{ props.item.hash }}
                </router-link>
              </td>
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
          <h2 class="headline font-weight-medium mb-2">Last 5 Transactions</h2>
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
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import { mapState } from 'vuex'
import CountCard from '../components/CountCard'

export default {
  components: {
    CountCard
  },
  data () {
    return {
      headers: [
        { text: 'Block #', sortable: false},
        { text: 'Block Hash', sortable: false},
        { text: 'Size', sortable: false},
        { text: 'Date', sortable: false},
        { text: 'Block # of TXs', sortable: false}
      ],

      pagination: {
        rowsPerPage: 5
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
<style lang="scss" scoped>
  td {
    font-family: 'Roboto Mono', monospace;
  }
</style>
