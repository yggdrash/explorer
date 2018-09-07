<template>
  <v-data-table
          :headers="headers"
          :items="blocks"
          :pagination.sync="pagination"
          hide-actions
  >
    <template slot="items" slot-scope="props">
      <td>
        <router-link
                to="stem">
          <v-layout>
            <v-flex><img src="@/assets/images/yeed.png"
                         style="height: 30px; display: inline-block"></v-flex>
            <v-flex style="padding-top: 7px; padding-left: 3px">
              <strong>STEM</strong>
              <!--<span class="grey&#45;&#45;text">(a32e3fd3)</span>-->
            </v-flex>
          </v-layout>
        </router-link>
      </td>
      <td>
        <router-link
                :to="`${linkBase}/stem/blocks/${props.item.index}`">
          {{ props.item.index }}
        </router-link>
      </td>
      <td>
        <router-link
                :to="`${linkBase}/blocks/${props.item.hash}`">
          {{ props.item.hash | shortHash(16) }}...
        </router-link>
      </td>
      <td>{{ props.item.bodyLength }}</td>
      <td>{{ props.item.timestamp | moment('from') }}</td>
      <td>{{ props.item.body.length }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: [ 'blocks', 'linkBase' ],
    data: () => ({
      headers: [
        { text: 'Branch', sortable: false },
        { text: 'Block #', sortable: false },
        { text: 'Block Hash', sortable: false },
        { text: 'Size', sortable: false },
        { text: 'Date', sortable: false },
        { text: '# of TXs', sortable: false }
      ],
      pagination: {
        rowsPerPage: 5
      }
    }),
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
