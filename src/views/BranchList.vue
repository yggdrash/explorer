<template>
  <v-container fluid>
    <div class="font-weight-black display-2 mb-2">YGGDRASH Branches</div>
    <BranchCardList :branches="branchesExcludeStem"/>
  </v-container>
</template>
<script>
  import { mapGetters } from 'vuex'
  import BranchCardList from '../components/BranchCardList'

  export default {
    components: {
      BranchCardList,
    },

    computed: {
      ...mapGetters([
        'branchesExcludeStem'
      ])
    }
  }
</script>
