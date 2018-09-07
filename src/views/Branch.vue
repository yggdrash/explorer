<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <span class="font-weight-black display-2 mr-2">{{ currentBranch.name }}</span>
          <span class="font-italic grey--text">
            <strong>{{ currentBranch.id.slice(0, 16) }}</strong>{{ currentBranch.id.slice(16) }}
          </span>
          <div>
            <v-chip color="green" text-color="white" small v-if="currentBranch.name === 'STEM'">
              <v-avatar>
                <v-icon>cloud_done</v-icon>
              </v-avatar>
              Active
            </v-chip>
            <v-chip color="orange" text-color="white" small v-else>
              <v-avatar>
                <v-icon>wb_incandescent</v-icon>
              </v-avatar>
              Concept
            </v-chip>
            <v-chip color="indigo" text-color="white" small v-if="currentBranch.name === 'YEED'">
              <v-avatar>
                <v-icon>flash_on</v-icon>
              </v-avatar>
              Developing
            </v-chip>
          </div>
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
