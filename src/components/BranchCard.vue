<template>
  <v-card :color="color" class="white--text">
    <v-card-title primary-title>
      <div class="headline">{{ branchInfo.name }}</div>
      <div style="word-break: break-word">{{ branchInfo.id }}</div>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat dark :to="`/branches/${branchInfo.id}`">
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
