<template>
  <v-layout row wrap>
    <v-flex sm6 xs12 v-for="b in listingBranches" :key="b.id">
      <DashboardCard :branch-info="b" />
    </v-flex>
  </v-layout>
</template>
<script>
  import DashboardCard from '../components/DashboardCard'

  export default {
    props: [
      'branches', 'max'
    ],
    components: {
        DashboardCard,
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

