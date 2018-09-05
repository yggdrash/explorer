<template>
  <v-container fluid
               grid-list-md>
    <div class="font-weight-black display-2 mb-2">YGGDRASH Branches</div>
    <v-layout row wrap>
      <v-flex xs4 v-for="(b, index) in branches" :key="b.id">
        <BranchCard :branch-info="b" :color="colors[index % colors.length]" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  import BranchCard from '../components/BranchCard'

  export default {
    components: {
      BranchCard,
    },

    data: () => ({
      colors: [ 'blue-grey darken-2', 'secondary', 'cyan darken-2', 'purple' ]
    }),

    computed: {
      ...mapState([
        'branches'
      ])
    }
  }
</script>
