<template>
  <v-card :color="color">
    <v-card-title primary-title>
      <v-layout column>
        <v-flex class="headline font-weight-bold">{{ branchInfo.name }}</v-flex>
        <v-flex class="desc">{{ branchInfo.description }}</v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <v-btn flat small :to="`/${branchInfo.link}`">
        EXPLORE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: [
      'color', 'branchInfo'
    ]
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

  .v-card__title {
    padding-left: 24px;
    padding-right: 24px;
    min-height: 138px;
    align-items: flex-start;

    .desc {
      color: gray;
    }
  }
</style>
