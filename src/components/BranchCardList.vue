<template>
  <v-layout row wrap>
    <v-flex sm6 xs12 v-for="b in listingBranches" :key="b.id">
      <BranchCard :branch-info="b" />
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

<style lang="scss" scoped>

</style>
