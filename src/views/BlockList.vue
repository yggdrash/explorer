<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2">Blocks</h2>
    <v-card>
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
              <router-link :to="'blocks/' + props.item.blockId">
                {{ props.item.blockId | shortHash(32)}}...
              </router-link>
            </td>
            <td>{{ props.item.signature | shortHash(24)}}...</td>
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
          { text: 'Signature', sortable: false },
          { text: 'Date', sortable: false },
          { text: 'Block # of TXs', sortable: false }
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
<style lang="scss">
  td {
    font-family: 'Roboto Mono', monospace;
    > a {
      text-decoration: none;
    }
  }
</style>
