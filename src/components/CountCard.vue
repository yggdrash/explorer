<template>
  <v-card :color="color">
    <v-card-title primary-title>
      <v-layout column>
        <v-flex class="title text-xs-center">{{ item.title.toUpperCase() }}</v-flex>
        <v-flex class="font-weight-bold display-3 text-xs-center mt-2">
          {{ showCount(item.count) }}
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions class="text-xs-center">
      <v-btn flat :to="item.link" style="text-decoration: underline">View All</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['item', 'color'],

  methods: {
    showCount(count) {
      if(count === 0 || isNaN(count)) return "N/A"

      return Number(count).toLocaleString()
    }
  }
}
</script>
<style lang="scss" scoped>
  .v-card.grey {
    .v-card__title {
      border-top: solid 3px #06b67b;
    }
  }

  .v-card.white {
    .v-card__title {
      border-top: solid 3px #ff6049;
    }
  }

  .v-card__actions .v-btn {
    margin: 0 auto;
  }
</style>
