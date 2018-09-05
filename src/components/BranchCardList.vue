<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="(b, index) in branches" :key="b.id">
      <BranchCard :branch-info="b" :color="colors[index % colors.length]" />
    </v-flex>
  </v-layout>
</template>
<script>
  import BranchCard from '../components/BranchCard'

  export default {
    props: [
      'branches'
    ],
    components: {
      BranchCard,
    },

    data: () => ({
      colors: [ 'purple', 'blue-grey darken-2', 'secondary', 'cyan darken-2']
    }),
  }
</script>
