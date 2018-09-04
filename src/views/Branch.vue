<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <span class="font-weight-black display-2 mr-2">{{ currentBranch.name }}</span>
          <span class="font-italic grey--text">
            {{ currentBranch.branchId }}
          </span>
        </v-flex>
        <router-view></router-view>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'currentBranch'
      ])
    }
  }
</script>
