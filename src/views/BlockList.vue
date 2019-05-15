<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2" style="color: #e6e6e6">Blocks</h2>
    <v-card
      dark
      class="member__account flexcard"
    >
      <template>
        <v-data-table
                :headers="headers"
                :items="listingBlocks"
                :pagination.sync="pagination"
                :total-items="totalBlocks"
                :loading="loading"
                :rows-per-page-items="[15]"
        >
          <template slot="items" slot-scope="props">
            <td>
              <router-link :to="'blocks/' + props.item.index">
                {{ props.item.index }}
              </router-link>
            </td>
            <td>
              <router-link :to="'blocks/' + props.item.index">
                {{ props.item.blockId | shortHash(5)}}...{{props.item.blockId.slice(-4)}}
              </router-link>
            </td>
            <td>
              <router-link :to="'validator/' + props.item.author">
                {{ props.item.author | shortHash(5)}}...{{ props.item.author.slice(-4)}}
              </router-link>
            </td>
            <td>{{ props.item.timestamp | moment('from')}}</td>
            <td>{{ props.item.txSize }}</td>
          </template>
        </v-data-table>
      </template>
    </v-card>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import {
    LOAD_MORE_BLOCKS,
    LOAD_BLOCKS,
  } from '../store/action-types'

  export default {
    data () {
      return {
        loading: false,
        pagination: {
          rowsPerPage: 15,
        },
        headers: [
          { text: 'Block #', sortable: false },
          { text: 'Block Hash', sortable: false },
          { text: 'Block Proposer', sortable: false },
          { text: 'Date', sortable: false },
          { text: '# of TXs', sortable: false }
        ],
      }
    },

    watch: {
      pagination: {
        async handler () {
          const { page, rowsPerPage } = this.pagination
          if(this.blocks.length < 2) {
            this.$store.dispatch(LOAD_BLOCKS)
          } else if((page + 1) * rowsPerPage > this.blocks.length) {
            let offset = this.blocks[this.blocks.length - 1].index - 1
            this.$store.dispatch(LOAD_MORE_BLOCKS, offset)
          }
        },
        deep: true
      },
    },

    computed: {
      ...mapState([
        'blocks', 'latestBlock'
      ]),

      listingBlocks() {
        const { page, rowsPerPage } = this.pagination
        return this.blocks.slice(0).slice((page - 1) * rowsPerPage, page * rowsPerPage)
      },

      totalBlocks() {
        return this.latestBlock.index + 1
      },
    },
  }
</script>
<style lang="scss" scoped>
  .v-card {
    /*background-color: white!important;*/
    /*opacity: 0.3;*/
    /*border-color: transparent!important;*/
    /*background-color: rgba( 66, 66, 66, 0.3 );*/
    /*border-radius: 7px;*/
  }

  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
      color: #e6e6e6;
    }
    > a:hover { color: #66ff99; }
  }
</style>
