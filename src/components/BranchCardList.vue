<template>
  <v-layout row wrap>
    <v-flex sm4 xs12 v-for="(b, index) in listingBranches" :key="b.id">
      <BranchCard :branch-info="b" :color="colors[index % colors.length]" />
    </v-flex>
  </v-layout>
</template>
<script>
  import BranchCard from '../components/BranchCard'

  export default {
    props: [
      'branches', 'max'
    ],
    components: {
      BranchCard,
    },
    data: () => ({
      colors: [ 'grey lighten-5', 'white']
    }),
    computed: {
      listingBranches() {
        if(this.max) {
          return this.branches.slice(0, Number(this.max))
        }
        return this.branches
      }
    }
  }
</script>
