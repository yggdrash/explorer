<template>
  <v-layout row wrap>
    <v-flex sm4 xs12 v-for="(item, index) in listingItems" :key="index">
      <CountCard :item="item" :color="colors[index % colors.length]"></CountCard>
    </v-flex>
  </v-layout>
</template>
<script>
  import CountCard from '../components/CountCard'

  export default {
    props: [
      'items', 'max'
    ],
    components: {
      CountCard,
    },
    data: () => ({
      colors: [ 'grey lighten-4', 'white']
    }),
    computed: {
      listingItems() {
        if(this.max) {
          return this.items.slice(0, Number(this.max))
        }
        return this.items
      }
    }
  }
</script>
