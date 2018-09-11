<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2">Blocks</h2>
    <v-card>
      <template>
        <v-data-table
                :headers="headers"
                :items="blocks"
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
  import axios from 'axios'

  export default {
    data () {
      return {
        blocks: [],
        totalBlocks: 0,
        loading: true,
        pagination: {
          rowsPerPage: 15,
          rowsPerPageItems: [15, 20]
        },
        headers: [
          { text: 'Block #', sortable: false },
          { text: 'Block Hash', sortable: false },
          { text: 'Author', sortable: false },
          { text: 'Size', sortable: false },
          { text: 'Date', sortable: false },
          { text: 'Block # of TXs', sortable: false }
        ],
      }
    },

    watch: {
      pagination: {
        async handler () {
          let data = await this.getDataFromApi()
          this.blocks = data.items
          this.totalBlocks = data.total
          this.loading = false
        },
        deep: true
      }
    },

    methods: {
      async getDataFromApi () {
        this.loading = true;
        const { page, rowsPerPage } = this.pagination

        let latestBlocks = await axios.get('http://localhost:8080/blocks/latest')
        let lastIndex = latestBlocks.data.index
        let offset = lastIndex - ((page - 1) * rowsPerPage)
        let items = await
          axios.get(`http://localhost:8080/blocks?offset=${offset}&limit=${rowsPerPage}`)
        return {
          items: items.data,
          total: latestBlocks.data.index + 1
        }
      }
    },

    computed: {
      ...mapState([
      ]),
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
