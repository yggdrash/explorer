<template>
  <div>
    <h2 class="display-1 font-weight-bold mb-2">States</h2>
    <v-card>
      <v-data-table
              :headers="headers"
              :items="statesOfBranch"
              :pagination.sync="pagination"
              :rows-per-page-items="[15]"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.value }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        headers: [
          { text: 'id', sortable: false },
          { text: 'value', sortable: false },
        ],

        pagination: {
          rowsPerPage: 15
        }
      }
    },

    computed: {
      ...mapState([
        'statesOfBranch'
      ]),
    },

    mounted() {
      // this.$store.dispatch(LOAD_STATES)
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
