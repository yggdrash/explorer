<template>
  <v-container>
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
      <v-layout row justify-center>
        <v-flex xs2 class="text-xs-center">
          <v-btn fab small color="secondary"
                 :to="`/blocks/${blockDetail.index - 1}`"
          >
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
          <h2 class="font-weight-black display-1 py-1">Block {{ blockDetail.index }}</h2>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
          <v-btn fab small color="secondary"
                 :to="`/blocks/${blockDetail.index + 1}`"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <div class="block-detail mt-5">
        <v-layout row v-for="(value, props) in blockDetail" :key="props" class="py-2">
          <v-flex xs2>{{ props }}</v-flex>
          <v-flex xs10>{{ value }}</v-flex>
        </v-layout>
      </div>
    </template>
  </v-container>
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
        })[0]
      }
      return this.blocks
    }
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
