<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <span class="font-weight-black display-2 mr-2">Welcome to YGGDRASH Explorer</span>
        </v-flex>
        <v-flex mb-4>
          <v-layout mb-4>
            <v-flex sm4>
              <CountCard
                      title="Total Transactions"
                      count="21563"
                      link="/tx"
                      color="blue-grey darken-2"/>
            </v-flex>
            <v-flex sm4>
              <CountCard
                      title="Last block"
                      count="1181"
                      link="/blocks"
                      color="secondary"/>
            </v-flex>
            <v-flex sm4>
              <CountCard
                      title="BranchChain created"
                      count="3"
                      link="/branches"
                      color="blue-grey darken-2"/>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="mb-4">
          <h2 class="headline font-weight-medium mb-2">Recently updated branches</h2>
          <BranchCardList :branches="branches"/>
          <div class="text-xs-center mt-3">
            <v-btn to="/branches" color="secondary">See all branches</v-btn>
          </div>
        </v-flex>
        <v-flex mb-5>
          <h2 class="headline font-weight-medium mb-2">Recently Blocks</h2>
          <v-card>
            <v-data-table
                    :headers="headers"
                    :items="blocks"
                    :pagination.sync="pagination"
                    hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>
                  <router-link
                          to="/branches/a32e3fd320fc1174590d8774604a422ca45a9fd6a5801784942aaf341d2ef723">
                    <v-layout>
                      <v-flex><img src="@/assets/images/yeed.png"
                                   style="height: 30px; display: inline-block"></v-flex>
                      <v-flex style="padding-top: 7px; padding-left: 3px">
                        <strong>YEED</strong>
                        <span class="grey--text">(a32e3fd3)</span>
                      </v-flex>
                    </v-layout>
                  </router-link>
                </td>
                <td>
                  <router-link :to="'blocks/' + props.item.index">
                    {{ props.item.index }}
                  </router-link>
                </td>
                <td>
                  <router-link :to="'blocks/' + props.item.hash">
                    {{ props.item.hash | shortHash }}
                  </router-link>
                </td>
                <td>{{ props.item.dataSize }}</td>
                <td>{{ props.item.timestamp }}</td>
                <td>{{ props.item.body.length }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import { mapState } from 'vuex'
  import CountCard from '../components/CountCard'
  import BranchCardList from '../components/BranchCardList'

  export default {
    components: {
      CountCard,
      BranchCardList,
    },

    data () {
      return {
        headers: [
          { text: 'Branch', sortable: false },
          { text: 'Block #', sortable: false },
          { text: 'Block Hash', sortable: false },
          { text: 'Size', sortable: false },
          { text: 'Date', sortable: false },
          { text: 'Block # of TXs', sortable: false }
        ],

        pagination: {
          rowsPerPage: 7
        }
      }
    },

    computed: {
      ...mapState([
        'blocks', 'branches'
      ]),
    }
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
