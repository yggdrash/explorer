<template>
  <v-card :color="color" class="white--text">
    <v-card-title primary-title>
      <v-layout column>
        <v-flex class="headline">{{ title }}</v-flex>
        <v-flex class="font-weight-black display-1">
          {{ Number(count).toLocaleString() }}
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat dark :to="link">View All</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['title', 'count', 'link', 'color']
}
</script>
