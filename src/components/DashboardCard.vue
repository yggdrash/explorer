<template>
  <v-card flat small :to="`/${branchInfo.link}`">
    <v-card-title primary-title>
      <v-layout column>
        <v-flex class="headline font-weight-bold">{{ branchInfo.name }}</v-flex>
        <v-flex class="desc">{{ branchInfo.description }}</v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: [
        'branchInfo'
    ]
  }
</script>
<style lang="scss" scoped>
  .v-card {
    background-color: rgba( 66, 66, 66, 0.5 );
    margin: 15px;
    border-radius: 7px;
  }
  .v-card:hover {
    transform: scale(0.989);
  }
  .v-card__title {
    padding-left: 24px;
    padding-right: 24px;
    min-height: 138px;
    align-items: flex-start;

    .headline {
      color: #e6e6e6;
    }
    .desc {
      color: #cccccc;
    }
  }
</style>
