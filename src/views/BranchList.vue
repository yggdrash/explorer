<template>
  <v-container fluid
               grid-list-md>
    <div class="font-weight-black display-2 mb-2">YGGDRASH Branches</div>
    <BranchCardList :branches="branches"/>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  import BranchCardList from '../components/BranchCardList'

  export default {
    components: {
      BranchCardList,
    },

    computed: {
      ...mapState([
        'branches'
      ])
    }
  }
</script>
